import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  clerkUserId: string;
  about?: string;
  emailReminders: boolean;
  address?: string;
  city?: string;
  postalCode?: string;
  country?: string;
  image?: {
    url?: string;
    alt?: string;
  };
  isStripeConnected: boolean;
  stripeAccountId?: string;
  createdAt?: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    clerkUserId: {
      type: String,
      required: true,
      unique: true,
    },
    about: {
      type: String,
      trim: true,
    },
    emailReminders: {
      type: Boolean,
      default: true,
    },
    address: {
      type: String,
      trim: true,
    },
    city: {
      type: String,
      trim: true,
    },
    postalCode: {
      type: String,
      trim: true,
    },
    country: {
      type: String,
      trim: true,
    },
    image: {
      url: {
        type: String,
        trim: true,
      },
      alt: {
        type: String,
        trim: true,
      },
    },
    isStripeConnected: {
      type: Boolean,
      default: false,
    },
    stripeAccountId: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
