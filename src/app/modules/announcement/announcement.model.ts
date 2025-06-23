import { model, Schema } from "mongoose";
import { IAnnouncement } from "./announcement.interface";

const announcementSchema = new Schema<IAnnouncement>(
  {
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, required: true },
    authorAvatar: { type: String },
    publishDate: { type: Date, required: true },
    isPinned: { type: Boolean, default: false },
    isStarred: { type: Boolean, default: false },
    views: { type: Number, default: 0 },
    attachments: [{ type: String }],
    image: { type: String },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

export const Announcement = model("Announcement", announcementSchema);
