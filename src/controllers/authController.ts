import { Request, Response } from "express";
import User, { IUser } from "../models/userModel";
import { Twilio } from "twilio";

console.log("TWILIO_SID", process.env.TWILIO_SID);
console.log("TWILIO_AUTH_TOKEN", process.env.TWILIO_AUTH_TOKEN);

const client = new Twilio(
  process.env.TWILIO_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export const sendVerificationCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phoneNumber } = req.body;

  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  const expiration = new Date(new Date().getTime() + 2 * 60000); // 2-minute expiration

  const user: IUser | null = await User.findOneAndUpdate(
    { phoneNumber },
    { verificationCode: code, codeExpiresAt: expiration, status: "Pending" },
    { new: true, upsert: true }
  );

  try {
    await client.messages.create({
      body: `Your verification code is ${code}`,
      from: "+19093521826",
      to: phoneNumber,
    });

    await user?.save();

    res.status(200).json({ message: "Verification code sent" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed 2 to send verification code" });
  }
};

export const verifyCode = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { phoneNumber, code } = req.body;
  const user = await User.findOne({ phoneNumber });

  if (!user) {
    return res.status(404).json({ message: "User not found" }) as any;
  }

  console.log(
    "user",
    user,
    code,
    new Date(user?.codeExpiresAt).getTime() > new Date().getTime()
  );

  if (user.verificationCode === code && user?.codeExpiresAt > new Date()) {
    user.status = "Verified";
    await user.save();
    res.status(200).json({ message: "Phone number verified" });
  } else {
    res.status(400).json({ message: "Invalid or expired verification code" });
  }
};
