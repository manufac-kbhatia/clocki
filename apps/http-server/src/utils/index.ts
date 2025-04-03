export const REFRESH_JWT_SECRET = "S3CR3T_R";
export const ACCESS_TOKEN_SECRET = "S3CRET_A";

import nodemailer, { SentMessageInfo } from "nodemailer";

type MailOptions = {
  to: string;
  subject: string;
  text?: string;
  html?: string;
};

export async function sendMail({ to, subject, text, html }: MailOptions): Promise<SentMessageInfo> {
  const transporter = nodemailer.createTransport({
    secure: true,
    host: "smtp.gmail.com",
    port: 465,
    auth: {
      user: process.env.EMAIL_USER as string,
      pass: process.env.EMAIL_PASS as string,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER as string,
    to,
    subject,
    text,
    html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}
