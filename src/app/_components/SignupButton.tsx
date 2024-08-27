"use client";
import React from "react";
import { signIn, useSession } from "next-auth/react";
import {
  Button,
  Checkbox,
  Input,
  Link,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";

const SignupButton = () => {
  const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      {!session?.user ? (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link className="cursor-pointer" onPress={() => signIn()}>Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link}  color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      ) : (
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <p>{session?.user?.email}</p>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              href="/api/auth/signout"
              variant="flat"
            >
              Logout
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </div>
  );
};

export default SignupButton;
