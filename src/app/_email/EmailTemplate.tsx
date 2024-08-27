import { Button, Html } from "@react-email/components";
import * as React from "react";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  verificationLink: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  verificationLink,
}) => (
  <Html lang="en">
    <Button href={verificationLink}>Click me</Button>
  </Html>
);
