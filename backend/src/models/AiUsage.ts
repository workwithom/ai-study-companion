import mongoose, { Schema, Document } from "mongoose";

export interface IAiUsage extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // YYYY-MM-DD
  count: number;
}

const AiUsageSchema = new Schema<IAiUsage>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    count: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

AiUsageSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IAiUsage>("AiUsage", AiUsageSchema);
