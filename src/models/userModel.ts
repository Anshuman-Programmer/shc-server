import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  phoneNumber: string;
  verificationCode: string;
  status: "Pending" | "Verified";
  codeExpiresAt: Date;
}

const userSchema: Schema = new Schema({
  phoneNumber: { type: String, required: true, unique: true },
  verificationCode: { type: String, required: true },
  status: { type: String, enum: ["Pending", "Verified"], default: "Pending" },
  codeExpiresAt: { type: Date, required: true },
});

export default mongoose.model<IUser>("User", userSchema);
