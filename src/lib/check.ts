import axios from "axios";
export type checkResponseType =
  | { status: false; message: string }
  | {
      status: true;
      message: [
        {
          exists: true;
          jid: string;
        }
      ];
    }
  | { status: string; message: string };
export const checkNumber = async (
  phone: string,
  instanceId: string,
  accessToken: string
) => {
  return axios.get(
    `https://wotcrm.com/api/number_verify?number=${phone}&instance_id=${instanceId}&access_token=${accessToken}`
  );
};
