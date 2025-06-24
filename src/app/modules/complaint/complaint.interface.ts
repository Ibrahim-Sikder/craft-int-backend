export interface IComplaintUpdate {
  date: Date;
  message: string;
  author: string;
}

export type TComplaintStatus = 'pending' | 'under_review' | 'resolved' | 'rejected';
export type TComplaintPriority = 'low' | 'medium' | 'high';

export interface IComplaint {
  id: number;
  type: 'complaint' | 'suggestion';
  title: string;
  description: string;
  category: string;
  submitter: string;
  submitterAvatar?: string;
  submitterRole: string;
  submitDate: Date;
  status: TComplaintStatus;
  priority: TComplaintPriority;
  upvotes: number;
  downvotes: number;
  comments: number;
  rating: number;
  assignedTo: string;
  estimatedResolution?: string;
  attachments?: string[];
  updates?: IComplaintUpdate[];
}
