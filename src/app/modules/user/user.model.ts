/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from 'mongoose';
import { TUser, UserModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
const userSchema = new Schema<TUser, UserModel>(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],

    },
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    password: {
      type: String,

    },
    passwordChangeAt: {
      type: Date,
      default: new Date(),
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['super_admin', 'user', 'admin', 'student', 'teacher', 'super_visor', 'class_teacher', 'accountant'],
      default: 'user',
    },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  const user = this; 
  user.password = await bcrypt.hash(user.password, Number(config.default_pass));
  next();
});

// set '' after saving password
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

userSchema.statics.isUserExistsByCustomId = async function (email: string) {
  const isUserExists = await User.findOne({ email }).select('+password');
  return isUserExists;
};

userSchema.statics.isPasswordMatched = async function (
  plaingTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plaingTextPassword, hashedPassword);
};

userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimestamp: Date,
  jwtIssuedTimestamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
  return passwordChangedTime > jwtIssuedTimestamp;
};

export const User = model<TUser, UserModel>('User', userSchema);
