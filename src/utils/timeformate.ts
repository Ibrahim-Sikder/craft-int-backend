import { format } from 'date-fns';

export const formatTimeSlot = (startTime: string, endTime: string): string => {
  const start = new Date(startTime);
  const end = new Date(endTime);

  const formattedStart = format(start, 'hh:mm a');
  const formattedEnd = format(end, 'hh:mm a');

  return `${formattedStart} - ${formattedEnd}`;
};
