import React from "react";
import SinginForm from "../_components/SinginForm";

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

const LoginPage = ({ searchParams: { callbackUrl } }: Props) => {
  return (
    <div className="flex justify-between px-12 py-8">
      <div className="w-[400px] ">
        <h3 className="text-xl">Signin</h3>
        <SinginForm callbackUrl={callbackUrl} />
      </div>
    </div>
  );
};

export default LoginPage;
