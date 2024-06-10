import { encodeObject } from "@/utils";
import axios from "axios";
export type checkResponseType = {
  msg: string;
  success: boolean;
};
export const checkNumber = async (
  phone: string,
  uid: string,
  instanceId: string,
  token: string
) => {
  return axios.post(
    `https://wotomate.com/api/send-message/custom-api/send`,
    {
      content: {
        text: phone,
      },
      mobile: phone,
      client_id: encodeObject({ uid, client_id: instanceId }),
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
