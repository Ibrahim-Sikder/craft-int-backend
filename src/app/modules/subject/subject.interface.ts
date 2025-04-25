export type TSubject = {
    name: string;
    code: string;
    image?: string;
    paper?: string;
    lessons?: {
      lessonNo: number;
      lessonName: string;
    }[];
    classId: string;
    teacherId?: string;
    isOptional?: boolean;
  };
  