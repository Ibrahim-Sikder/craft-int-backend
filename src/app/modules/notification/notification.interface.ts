export type TPriority = 'low' | 'medium' | 'high';
export type TCategory = 'Academic' | 'Events' | 'General';

export interface INotification {
  id: number;
  type: 'assignment' | 'event' | 'announcement';
  title: string;
  message: string;
  sender: string;
  senderAvatar?: string;
  timestamp: string;
  isRead: boolean;
  isStarred: boolean;
  priority: TPriority;
  category: TCategory;
}
