import mongoose, { Schema } from "mongoose";


const accountSchema = new Schema({
  userId: { type: String, required: true },
  type: { type: String, required: true },
  provider: { type: String, required: true },
  providerAccountId: { type: String, required: true },
  refresh_token: { type: String, text: true },
  access_token: { type: String, text: true },
  expires_at: { type: Number },
  token_type: { type: String },
  scope: { type: String },
  id_token: { type: String, text: true },
  session_state: { type: String },
}, {
  timestamps: true,
  collection: 'accounts',
});

accountSchema.index({ provider: 1, providerAccountId: 1 }, { unique: true });

export const Account =  mongoose.models.Account || mongoose.model('Account', accountSchema) ;
