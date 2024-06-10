import { createId } from "@paralleldrive/cuid2";

export const generateOtp = () => {
  const buf = new Uint32Array(1);
  const otp = crypto.getRandomValues(buf)[0]?.toString().slice(0, 6);
  return otp;
};
export const generateApiKey = () => {
  return `authkey_${createId()}`;
};
export const encodeObject = (obj: { uid: string; client_id: string }) => {
  const jsonString = JSON.stringify(obj);
  const base64String = Buffer.from(jsonString).toString("base64");
  return base64String;
};
