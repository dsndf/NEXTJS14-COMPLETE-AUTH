import axios from "axios";

type SendMail = (email: string) => Promise<void>;

export const sendMailFunc: SendMail = async (email: string) => {
  const { data } = await axios.post("http://localhost:3000/api/send", {
    email,
  });
};
