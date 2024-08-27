"use client";
import { EnvelopeIcon, KeyIcon } from "@heroicons/react/16/solid";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

type Props = {
  callbackUrl?: string;
};
const FormSchema = z.object({
  email: z.string().email("Please enter valid email address"),
  password: z.string(),
});
type InputType = z.infer<typeof FormSchema>;
// Source Code Pro Medium

const SinginForm = ({ callbackUrl }: Props) => {
  const router = useRouter();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });
  const signinHandler: SubmitHandler<InputType> = async (data) => {
    console.log({ data });
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });
    if (!result?.ok) toast.error(result?.error!);
    else {
      toast.success("Signed in successfully");
      router.push(callbackUrl || "/");
    }
    return data;
  };

  return (
    <form
      onSubmit={handleSubmit(signinHandler)}
      className="w-full grid grid-cols-1 gap-3  border-gray-700 rounded-md p-2"
    >
      <Input
        label="Email"
        startContent={<EnvelopeIcon className="w-4" />}
        {...register("email")}
        isInvalid={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <Input
        label="Password"
        startContent={<KeyIcon className="w-4" />}
        {...register("password")}
        isInvalid={!!errors.password}
        errorMessage={errors.password?.message}
      />
      <Button
        isLoading={isSubmitting}
        type="submit"
        color="primary"
        className="mt-2"
      >
        Sign In
      </Button>
    </form>
  );
};

export default SinginForm;
