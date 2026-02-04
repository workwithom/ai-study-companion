import mongoose, { Schema, Document } from "mongoose";

export interface IStudySession extends Document {
  userId: mongoose.Types.ObjectId;
  mode: "summary" | "explain" | "questions";
  content: string;
  answer: string;
  createdAt: Date;
}

const StudySessionSchema = new Schema<IStudySession>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    mode: {
      type: String,
      enum: ["summary", "explain", "questions"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<IStudySession>(
  "StudySession",
  StudySessionSchema
);
