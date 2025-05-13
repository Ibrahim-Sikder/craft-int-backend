import { Schema, model } from 'mongoose';
import { TClass } from './class.interface';

const classSchema = new Schema<TClass>(
  {
    className: {
      type: String,
      required: true,
    },
    sections: {
        type: Schema.Types.ObjectId,
    required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Class = model<TClass>('Class', classSchema);
