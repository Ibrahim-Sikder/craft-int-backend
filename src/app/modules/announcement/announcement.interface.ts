export interface IAnnouncement {
  id: number;
  title: string;
  content: string;
  category: string;
  author: string;
  authorAvatar?: string;
  publishDate: Date;
  isPinned: boolean;
  isStarred: boolean;
  views: number;
  attachments?: string[];
  image?: string;
  priority: "low" | "medium" | "high";
}
