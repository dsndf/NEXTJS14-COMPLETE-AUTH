import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    sessionToken: { type: String, unique: true, required: true },
    userId: { type: String, required: true },
    expires: { type: Date, required: true },
  },
  {
    timestamps: true,
    collection: "sessions",
  }
);

export const Session =
  mongoose.models.Session || mongoose.model("Session", sessionSchema);
