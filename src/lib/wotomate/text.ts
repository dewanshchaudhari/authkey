import axios from "axios";
import { encodeObject } from "@/utils";
export type responseType = {
  msg: string;
  success: boolean;
};
export const send = async (
  phone: string,
  message: string,
  uid: string,
  instanceId: string
) => {
  return axios.post(`https://wotomate.com/api/send-message/custom-api/send`, {
    content: {
      text: message,
    },
    mobile: phone,
    client_id: encodeObject({ uid, client_id: instanceId }),
  });
};
