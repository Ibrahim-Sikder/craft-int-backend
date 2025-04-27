export interface ITimeSlot {
    title?: string;
    day: 'Saturday' | 'Sunday' | 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
    startTime: string;
    endTime: string;  
    isActive?: boolean;
  }
  