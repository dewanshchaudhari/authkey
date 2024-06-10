import { env } from "@/env.mjs";
import axios from "axios";
export type smsResponseType = {
  return: boolean;
  request_id: string;
  message: string[];
};
export const sendSms = async (otp: string, phone: string) => {
  return axios.get(
    `https://www.fast2sms.com/dev/bulkV2?authorization=${env.FAST2SMS_API_KEY}&variables_values=${otp}&route=otp&numbers=${phone}`
  );
};
