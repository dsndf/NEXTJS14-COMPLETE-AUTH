import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import SignupButton from "./SignupButton";

export default function AppBar() {
  return (
    <Navbar isBordered>
      <NavbarBrand>
        <p className="font-bold text-inherit">ACME</p>
      </NavbarBrand>
      <SignupButton></SignupButton>
    </Navbar>
  );
}
