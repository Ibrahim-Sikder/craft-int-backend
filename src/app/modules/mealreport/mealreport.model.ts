// models/mealReport.model.ts
import { Schema, model,  } from 'mongoose';
import { IMealReport, MealType } from './mealreport.interface';

const mealReportSchema = new Schema<IMealReport>(
  {
    date: {
      type: Date,
      required: true,
      index: true,
    },
    mealType: {
      type: String,
      enum: Object.values(MealType),
      required: true,
    },
    students: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
      },
    ],
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Student', 
        required: true,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const MealReport = model<IMealReport>('MealReport', mealReportSchema);
export default MealReport;
