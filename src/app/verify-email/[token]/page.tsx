import { emailVerification } from "@/lib/actions/authActions";
import { Button } from "@nextui-org/react";

type Props = {
  params: {
    token: string;
  };
};

const VerifyEmailPage = async ({ params: { token } }: Props) => {
  const message = await emailVerification(token);
  return (
    <div className="flex flex-col justify-center items-center gap-3 p-20">
      <p className="text-green-700">Email {message}</p>
      <Button variant="light" color="primary">
        Go to Login
      </Button>
    </div>
  );
};

export default VerifyEmailPage;
