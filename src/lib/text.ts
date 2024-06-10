import { env } from "@/env.mjs";
import axios from "axios";
export type responseType =
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
          extendedTextMessage: {
            text: string;
          };
        };
        messageTimestamp: string;
      };
    }
  | { status: string; message: string };
export const send = (
  phone: string,
  message: string,
  instanceId: string,
  accessToken: string
) => {
  return axios.get(
    `https://wotcrm.com/api/send?number=${phone}&type=text&message=${message}&instance_id=${instanceId}&access_token=${accessToken}`
  );
};
export type officialResponseType = {
  messaging_product: "whatsapp";
  contacts: [
    {
      input: string;
      wa_id: string;
    }
  ];
  messages: [
    {
      id: string;
    }
  ];
  error?: {
    message: string;
    type: string;
    code: number;
    error_subcode: number;
    fbtrace_id: string;
  };
};
export const sendOfficial = (phone: string) => {
  return axios.post(
    "https://graph.facebook.com/v17.0/120197797844170/messages",
    {
      messaging_product: "whatsapp",
      to: phone,
      type: "template",
      template: { name: "hello_world", language: { code: "en_US" } },
    },
    {
      headers: {
        Authorization: `Bearer ${env.FACEBOOK_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
};
