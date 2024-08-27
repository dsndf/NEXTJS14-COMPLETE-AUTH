import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { Document } from "mongoose";
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: Date;
  password: string;
  phone: string;
}
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    emailVerified: { type: Date },
    password: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const userCollection: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);
