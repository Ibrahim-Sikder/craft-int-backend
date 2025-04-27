import { Schema, model } from "mongoose";
import { TTodayLesson } from "./todaylesson.interface";

const TodayLessonSchema = new Schema<TTodayLesson>(
  {
    lessonContent: {
      type: String,
      required: [true, "Lesson content is required"],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const TodayLesson = model<TTodayLesson>("TodayLesson", TodayLessonSchema);
