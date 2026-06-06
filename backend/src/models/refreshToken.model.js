import mongoose from "mongoose";

const tokenSchema = new mongoose.Schema({
  userId: ObjectId,

  token: String,

  expiresAt: Date,
});

const Token = mongoose.model("Token", tokenSchema);

export default Token;
