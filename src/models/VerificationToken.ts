import mongoose, { Schema } from "mongoose";

const verificationTokenSchema = new Schema({
    identifier: { type: String, required: true },
    token: { type: String, required: true },
    expires: { type: Date, required: true },
  }, {
    timestamps: true,
    collection: 'verificationtokens',
  });
  
  verificationTokenSchema.index({ identifier: 1, token: 1 }, { unique: true });
  
 export const VerificationToken = mongoose.models.VerificationToken || mongoose.model('VerificationToken', verificationTokenSchema);
  