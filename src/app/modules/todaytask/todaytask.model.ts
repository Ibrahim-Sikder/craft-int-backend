import { Schema, model } from "mongoose";
import { ITodayTask } from "./todaytask.interface";

const todayTaskSchema = new Schema<ITodayTask>(
  {
    taskContent: {
      type: String,
      required: [true, "বাড়ির কাজের বিষয়বস্তু আবশ্যক!"],
      trim: true,
    },
    dueDate: {
      type: Date,
      required: [true, "জমা দেওয়ার তারিখ আবশ্যক!"],
    },
  },
  {
    timestamps: true,
  }
);

export const TodayTask = model("TodayTask", todayTaskSchema);
