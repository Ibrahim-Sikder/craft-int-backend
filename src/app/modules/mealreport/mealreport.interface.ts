// interfaces/mealReport.interface.ts
import { Document, Types } from 'mongoose';

export enum MealType {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
}



export interface IMealReport extends Document {
  date: Date;
  mealType: MealType;
  students: Types.ObjectId[]; 
  createdAt?: Date;
  updatedAt?: Date;
}
