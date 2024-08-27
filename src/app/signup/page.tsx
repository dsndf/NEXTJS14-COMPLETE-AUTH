import React from "react";
import { SignupForm } from "../_components/SignupForm";

const SignupPage = () => {
  return (
    <div className="py-2 px-12 flex justify-between items-center w-full">
      <div>
        <h3 className="my-2">Signup Form</h3>
        <SignupForm/>
      </div>
    </div>
  );
};

export default SignupPage;
