export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
}

// Interface for a person's meal selection
export interface MealParticipant {
  personId: string
  mealTypes: MealType[]
  mealCount: number // Number of meals the person is eating
}

// Main meal report interface
export interface IMealReport {
  date: Date
  students: MealParticipant[]
  teachers: MealParticipant[]
  createdAt?: Date
  updatedAt?: Date
}
