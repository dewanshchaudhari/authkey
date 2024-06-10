import { encodeObject } from "@/utils";
import axios from "axios";
import FormData from "form-data";
const form = new FormData();
export type mediaResponseType = {
  msg: string;
  success: boolean;
};
export const sendMedia = async (
  phone: string,
  message: string,
  uid: string,
  instanceId: string,
  token: string,
  mediaUrl: string
) => {
  const fileResponse = await axios.get(mediaUrl, {
    responseType: "stream",
  });
  if (fileResponse.status !== 200)
    throw new Error("Unable to access the file.");
  form.append("client_id", encodeObject({ uid, client_id: instanceId }));
  form.append("mobile", phone);
  form.append("fromTemplet", "false");
  form.append("type", "media");
  if (message) form.append("message", message);
  form.append("file", fileResponse.data);
  return axios.post(
    `https://wotomate.com/api/send-message/custom-api/send-media`,
    form,
    { headers: { Authorization: `Bearer ${token}` } }
  );
};
