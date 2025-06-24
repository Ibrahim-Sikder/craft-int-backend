import mongoose, { Schema, Document } from "mongoose";

export interface IFeedback extends Document {
  type: "complaint" | "idea" | "suggestion";
  category: string;
  priority: "low" | "medium" | "high" | "urgent";
  title: string;
  description: string;
  department?: string;
  attachments?: string[]; 
  submittedAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  type: {
    type: String,
    enum: ["complaint", "idea", "suggestion"],
    required: true,
  },
  category: { type: String, required: true },
  priority: {
    type: String,
    enum: ["low", "medium", "high", "urgent"],
    required: true,
  },
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String },
  attachments: [{ type: String }],
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

export const Feedback = mongoose.model<IFeedback>("Feedback", FeedbackSchema);
