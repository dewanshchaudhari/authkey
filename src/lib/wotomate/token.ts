import axios from "axios";
export const getLoginToken = async (id: string) => {
  const email = id + "@wotomate.com";
  const password = id + "@wotomate.com";
  return await axios.post("https://wotomate.com/api/user/custom-api/login", {
    email,
    password,
  });
};
