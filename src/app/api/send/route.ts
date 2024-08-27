import type { NextApiRequest, NextApiResponse } from "next";
import { EmailTemplate } from "@/app/_email/EmailTemplate";
import { Resend } from "resend";
import { NextResponse } from "next/server";
import { userCollection } from "@/models/User";
import { ErrorHandler } from "@/utils/errorHandler";
import { signJWT } from "@/lib/jwt";
import { BASE_URL } from "@/config/settings";
const resend = new Resend("re_28kMPcKm_MfhqjqDcpviCD9pdrDMNmEy5");

export async function POST(req: Request) {
  const { email } = await req.json();
  const user = await userCollection.findOne({ email });
  if (!user) throw new ErrorHandler("User doesn't exists", 404);
  if (user.emailVerified)
    throw new ErrorHandler("Email is already verified", 400);
  // signToken
  const token = signJWT(String(user._id));
  // create verification link
  console.log({ token });
  const verificationLink = BASE_URL+"verify-email/"+token;

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["delivered@resend.dev"],
    subject: "Verification Link",
    react: EmailTemplate({
      firstName: user.firstName,
      lastName: user.lastName,
      verificationLink,
    }),
  });

  if (error) {
    return NextResponse.json({ success: false, error }, { status: 500 });
  }
  return NextResponse.json({ success: true, data });
}
