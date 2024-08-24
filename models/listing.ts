import mongoose, { Document, Model, Schema } from "mongoose";

interface IListing extends Document {
  title: string;
  description: string;
  price: number;
  photos: { url: string }[];
  seller: mongoose.Schema.Types.ObjectId;
  primaryColor?: string;
  secondaryColor?: string;
  yearProduced?: number;
  condition: "new" | "used";
  hasLabel: boolean;
  hasOriginalBox: boolean;
  createdAt?: Date;
}

const listingSchema: Schema<IListing> = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    photos: [
      {
        url: {
          type: String,
          required: true,
        },
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    primaryColor: {
      type: String,
      default: "none chosen",
    },
    secondaryColor: {
      type: String,
      default: "none chosen",
    },
    yearProduced: {
      type: Number,
      default: -1,
    },
    condition: {
      type: String,
      required: true,
      enum: ["new", "used"],
    },
    hasLabel: {
      type: Boolean,
      default: false,
    },
    hasOriginalBox: {
      type: Boolean,
      default: false,
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

const Listing: Model<IListing> =
  mongoose.models.Listing || mongoose.model<IListing>("Listing", listingSchema);

export default Listing;
