export type TFeedbackType = "complaint" | "idea" | "suggestion";
export type TPriority = "low" | "medium" | "high" | "urgent";

export interface TFeedbackForm {
  type: TFeedbackType;
  category: string;
  priority: TPriority;
  title: string;
  description: string;
  department?: string;
  attachments?: File[]; // if you want to handle file uploads
}
