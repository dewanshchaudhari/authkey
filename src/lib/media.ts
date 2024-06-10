import axios from "axios";
export type mediaResponseType =
  | { status: false; message: string }
  | {
      status: true;
      message: {
        key: {
          remoteJid: string;
          fromMe: boolean;
          id: string;
        };
        message: {
          documentMessage: {
            url: string;
            mimetype: string;
            fileSha256: string;
            fileLength: string;
            mediaKey: string;
            fileName: string;
            fileEncSha256: string;
            directPath: string;
            mediaKeyTimestamp: string;
            caption: string;
          };
        };
        messageTimestamp: string;
      };
    }
  | { status: string; message: string };
export const sendMedia = (
  phone: string,
  message: string | null | undefined,
  instanceId: string,
  accessToken: string,
  mediaUrl: string,
  fileName: string
) => {
  return axios.get(
    `https://wotcrm.com/api/send?number=${phone}&type=media&message=${
      message ?? ""
    }&instance_id=${instanceId}&access_token=${accessToken}&media_url=${mediaUrl}&filename=${fileName}`
  );
};
