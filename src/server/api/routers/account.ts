import { env } from "@/env.mjs";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { encodeObject } from "@/utils";
import { createId } from "@paralleldrive/cuid2";
import { type Prisma, type PrismaClient } from "@prisma/client";
import { type DefaultArgs } from "@prisma/client/runtime/library";
import { TRPCError } from "@trpc/server";
import axios from "axios";
import { load } from "cheerio";
import { z } from "zod";
const checkTokens = async (
  prisma: PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  instanceId: string | null,
  accessToken: string
) => {
  if (!instanceId) return false;
  const {
    data: qrcode,
  }: {
    data: {
      status: string;
      message: string;
      base64: string;
    };
  } = await axios.get(
    `https://wotcrm.com/api/get_qrcode?instance_id=${instanceId}&access_token=${accessToken}`
  );
  if (
    !(
      qrcode.status === "error" &&
      qrcode.message === "Instance ID has been used"
    )
  ) {
    await prisma.userTokens.update({
      where: {
        instanceId: instanceId,
      },
      data: {
        instanceId: null,
        connected: false,
      },
    });
    return false;
  }
  return true;
};
export const accountRouter = createTRPCRouter({
  getAccountByUserId: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.userTokens.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  createWotomateAccount: protectedProcedure.mutation(async ({ ctx, input }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const email = user.id + "@wotomate.com";
    const { data: signup }: { data: { msg: string; success: boolean } } =
      await axios.post("https://wotomate.com/api/user/custom-api/signup", {
        email,
        password: email,
        name: user.name,
      });
    if (signup.msg !== "Signup Success" || signup.success !== true) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Cannot Create account",
      });
    }
    const loginResponse = await axios.post(
      "https://wotomate.com/api/user/custom-api/login",
      {
        email,
        password: email,
      }
    );
    const { data: login } = loginResponse as {
      data: { success: boolean; token: string };
    };
    if (login.success !== true) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Login Failed",
      });
    }
    const {
      data: userInfo,
    }: {
      data: {
        success: boolean;
        data: {
          id: number;
          role: string;
          uid: string;
          name: string;
          email: string;
          password: string;
          plan: string;
          planexpire: string;
          status: number;
          msglimit: number;
          contactlimit: number;
          templetlimit: number;
          allow_multi_instance: number;
          allow_data_extract: number;
          api: string;
          createdAt: string;
          poll_status: null;
          webhook_url: null;
        };
      };
    } = await axios.get(
      "https://wotomate.com/api/user/custom-api/get-user-by-token",
      {
        headers: {
          Authorization: `Bearer ${login.token}`,
        },
      }
    );
    if (userInfo.success !== true) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "User Info Failed",
      });
    }
    const {
      data: updatePlan,
    }: {
      data: {
        msg: string;
        success: boolean;
      };
    } = await axios.post(
      "https://wotomate.com/api/admin/custom-api/update-user-plan",
      {
        plan: '{"id":21,"name":"Paid Unlimited ","instance":10,"price":2999,"msglimit":10000000,"contactlimit":10000000,"templetlimit":1000,"allowapi":1,"allowchatbot":1,"allowbulkmsg":1,"allowschedulemsg":1,"allow_data_extract":1,"allow_multi_instance":1,"planexpire":"27888","createdAt":"2023-08-24T09:22:40.000Z"}',
        uid: userInfo.data.uid,
      },
      {
        headers: {
          Authorization: `Bearer ${env.WOTOMATE_ADMIN_TOKEN}`,
        },
      }
    );
    if (updatePlan.msg !== "plan was updated" && updatePlan.success !== true) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Update plan Failed",
      });
    }
    return ctx.prisma.user.update({
      where: {
        id: ctx.session.user.id,
      },
      data: {
        uid: userInfo.data.uid,
        token: login.token,
        plan: 2,
      },
    });
  }),
  generateInstance: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    if (!user.uid) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Uid not generated.",
      });
    }
    const email = user.id + "@wotomate.com";
    // const loginResponse = await axios.post(
    //   "https://wotomate.com/api/user/custom-api/login",
    //   {
    //     email,
    //     password: email,
    //   }
    // );
    // const { data: login } = loginResponse as {
    //   data: { success: boolean; token: string };
    // };
    // if (login.success !== true) {
    //   throw new TRPCError({
    //     code: "INTERNAL_SERVER_ERROR",
    //     message: "Login Failed",
    //   });
    // }
    const instance_name = createId();
    const {
      data: instance,
    }: {
      data: {
        success: boolean;
        message: string;
        data: {
          qr: string;
        };
      };
    } = await axios.post(
      "https://wotomate.com/api/sessions/custom-api/add",
      {
        id: encodeObject({ uid: user.uid, client_id: instance_name }),
        name: "1",
        isLegacy: false,
      },
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    if (instance.success !== true) {
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Instance Id not generated.",
      });
    }
    // console.log({
    //   id: encodeObject({ uid: user.uid, client_id: instance_name }),
    //   uid: user.uid,
    //   instanceId: instance_name,
    //   qrcode: instance.data.qr,
    // });
    return {
      uid: user.uid,
      instanceId: instance_name,
      qrcode: instance.data.qr,
      token: user.token,
    };
  }),
  checkInstanceStatus: protectedProcedure
    .input(
      z.object({
        uid: z.string(),
        instanceId: z.string(),
        token: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const {
        data,
      }: {
        data: {
          success: boolean;
          message: string;
          data: {
            loginStatus: {
              id: string;
              name: string;
            };
          };
        };
      } = await axios.get(
        `https://wotomate.com/api/sessions/custom-api/status/${encodeObject({
          uid: input.uid,
          client_id: input.instanceId,
        })}`,
        {
          headers: {
            Authorization: `Bearer ${input.token}`,
          },
        }
      );
      if (data.success !== true) {
        return { status: false };
      }
      return { status: true };
    }),
  addAccount: protectedProcedure
    .input(z.object({ instaceId: z.string(), id: z.number() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.userTokens.update({
        where: {
          id: input.id,
        },
        data: {
          instanceId: input.instaceId,
          connected: true,
          userId: ctx.session.user.id,
        },
      });
    }),
  checkInstanceHealth: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      return new TRPCError({
        code: "UNAUTHORIZED",
      });
    }
    if (!user.uid) {
      return new TRPCError({
        code: "NOT_FOUND",
      });
    }
    const userTokens = await ctx.prisma.userTokens.findMany({
      where: {
        userId: user.id,
      },
    });
    return Promise.all(
      userTokens.map((token) =>
        checkTokens(ctx.prisma, token.instanceId, user.uid ?? "")
      )
    );
  }),
  deleteAccountById: protectedProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
      });
      if (!user) {
        return new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      if (!user.uid) {
        return new TRPCError({
          code: "UNAUTHORIZED",
        });
      }
      const whatomation = await ctx.prisma.userTokens.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!whatomation || whatomation?.instanceId === null) {
        return new TRPCError({
          code: "NOT_FOUND",
        });
      }
      const response = await axios.delete(
        `https://wotomate.com/api/sessions/custom-api/delete/${encodeObject({
          uid: user.uid,
          client_id: whatomation.instanceId,
        })}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      const deleteAccount = response.data as {
        success: boolean;
        message: string;
        data: {
          msg: string;
        };
      };
      if (deleteAccount.success === false) {
        return new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Unable to delete account.",
        });
      }
      return ctx.prisma.userTokens.update({
        where: {
          id: input.id,
        },
        data: {
          instanceId: null,
          connected: false,
        },
      });
    }),
});
