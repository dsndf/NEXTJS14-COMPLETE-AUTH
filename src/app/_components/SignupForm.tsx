"use client";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  KeyIcon,
  PhoneIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import { toast } from "react-hot-toast";
import { Button, Checkbox, Input, Link } from "@nextui-org/react";
import { useState } from "react";
import z from "zod";
import validator from "validator";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/lib/actions/authActions";
import { sendMailFunc } from "@/lib/mail";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters are allowed!"),
    lastName: z
      .string()
      .min(2, "First name must be atleast 2 characters")
      .max(45, "First name must be less than 45 characters")
      .regex(new RegExp("^[a-zA-Z]+$"), "No special characters are allowed!"),
    email: z.string().email("Please enter the valid email address"),
    phone: z
      .string()
      .refine(validator.isMobilePhone, "Please enter valid phone number"),
    password: z
      .string()
      .min(6, "Password must be 6 characters")
      .max(50, "Password must be less than 50 characters"),
    confirmPassword: z
      .string()
      .min(6, "Password must be 6 characters")
      .max(50, "Password must be less than 50 characters"),
    accepted: z.literal(true, {
      errorMap: () => {
        return { message: "Please accept the terms" };
      },
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password ans confirm password doesn't match",
    path: ["confirmPassword"],
  });

type InputType = z.infer<typeof FormSchema>;

export const SignupForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const saveUser: SubmitHandler<InputType> = async (data) => {
    try {
      console.log({ data });
      const { accepted, confirmPassword, ...user } = data;
      await registerUser(user);
      await sendMailFunc(user.email);
      toast.success("Verification link sent to " + user.email);
      router.replace("/login");
      return data;
    } catch (error) {
      console.log(error);
      if (error instanceof Error) toast.error(error.message);
      else toast.error("Something Went Wrong");
    }
  };

  const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
  // toast.success("Success")
  return (
    <form
      onSubmit={handleSubmit(saveUser)}
      className="p-2 grid grid-cols-2 gap-3  border-gray-600 shadow rounded-md"
    >
      <Input
        label="First Name"
        startContent={<UserIcon className="w-4" />}
        {...register("firstName")}
        errorMessage={errors?.firstName?.message}
        isInvalid={!!errors?.firstName}
      />
      <Input
        label="Last Name"
        startContent={<UserIcon className="w-4" />}
        {...register("lastName")}
        errorMessage={errors?.lastName?.message}
        isInvalid={!!errors?.lastName}
      />
      <Input
        label="Email"
        className="col-span-2"
        startContent={<EnvelopeIcon className="w-4" />}
        {...register("email")}
        errorMessage={errors?.email?.message}
        isInvalid={!!errors?.email}
      />
      <Input
        label="Phone"
        className="col-span-2"
        startContent={<PhoneIcon className="w-4" />}
        {...register("phone")}
        errorMessage={errors?.phone?.message}
        isInvalid={!!errors?.phone}
      />
      <Input
        label="Password"
        type={isPassVisible ? "text" : "password"}
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
        endContent={
          !isPassVisible ? (
            <EyeIcon
              onClick={() => setIsPassVisible(true)}
              className=" w-4 cursor-pointer"
            />
          ) : (
            <EyeSlashIcon
              onClick={() => setIsPassVisible(false)}
              className=" w-4 cursor-pointer"
            />
          )
        }
        {...register("password")}
        errorMessage={errors?.password?.message}
        isInvalid={!!errors?.password}
      />
      <Input
        label="Confirm Password"
        type="password"
        className="col-span-2"
        startContent={<KeyIcon className="w-4" />}
        {...register("confirmPassword")}
        errorMessage={errors?.confirmPassword?.message}
        isInvalid={!!errors?.confirmPassword}
      />
      <Controller
        control={control}
        name="accepted"
        render={({ field }) => (
          <>
            <Checkbox
              onChange={field.onChange}
              onBlur={field.onBlur}
              className="col-span-2 text-[15px]"
            >
              I Accept The <Link href="/terms">Terms</Link> & Conditions
            </Checkbox>
            {errors.accepted && (
              <p className="text-red-600 text-[14px]">
                {errors?.accepted?.message}
              </p>
            )}
          </>
        )}
      ></Controller>

      <div className="col-span-2">
        {" "}
        <Button
          isLoading={isSubmitting}
          type="submit"
          color="primary"
          className="w-full"
        >
          Submit
        </Button>
      </div>
    </form>
  );
};
