import { Schema, model } from "mongoose"
import { type IMealReport, MealType } from "./mealreport.interface"

// Schema for a person's meal selection
const mealParticipantSchema = new Schema({
  personId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  mealTypes: [
    {
      type: String,
      enum: Object.values(MealType),
      required: true,
    },
  ],
  mealCount: {
    type: Number,
    required: true,
    min: 1,
    max: 3,
  },
})

const mealReportSchema = new Schema<IMealReport>(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    students: [mealParticipantSchema],
    teachers: [mealParticipantSchema],
  },
  {
    timestamps: true,
  },
)

const MealReport = model<IMealReport>("MealReport", mealReportSchema)
export default MealReport
