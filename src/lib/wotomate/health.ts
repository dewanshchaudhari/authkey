import { encodeObject } from "@/utils";
import axios from "axios";

export const checkInstanceStatus = async (
  uid: string,
  instanceId: string,
  token: string
) => {
  const {
    data: health,
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
      uid,
      client_id: instanceId,
    })}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return health.success;
};
