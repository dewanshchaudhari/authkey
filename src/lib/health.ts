import axios from "axios";

export const checkTokens = async (instanceId: string, accessToken: string) => {
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
    return false;
  }
  return true;
};
