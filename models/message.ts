import mongoose, { Document, Model, Schema } from "mongoose";

interface IMessage extends Document {
  messageThreadId: string;
  message: string;
  createdAt?: Date;
  status: "approved" | "pending_review" | "active";
  sellerName: string;
  buyerName: string;
}

const messageSchema: Schema<IMessage> = new mongoose.Schema(
  {
    messageThreadId: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ["approved", "pending_review", "active"],
      default: "pending_review",
    },
    sellerName: {
      type: String,
      required: true,
      trim: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Message: Model<IMessage> =
  mongoose.models.Message || mongoose.model<IMessage>("Message", messageSchema);

export default Message;
