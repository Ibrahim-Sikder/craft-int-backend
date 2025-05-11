import { Document } from 'mongoose';

export interface ISection extends Document {
  name: string;
}
