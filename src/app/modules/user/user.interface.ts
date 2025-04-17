import { Model, ObjectId } from 'mongoose';
import { USER_ROLE } from './user.constant';

export interface TUser {
  _id: ObjectId;
  name:string,
  email: string;
  password: string;
  needPasswordChange: boolean;
  role: 'admin' | 'user' | 'super_admin';
  isDeleted: boolean;
  status: 'active' | 'inactive';
  passwordChangeAt?: Date;
}

export interface UserModel extends Model<TUser> {
  isUserExistsByCustomId(name: string): Promise<TUser>;
  isPasswordMatched(
    plaingTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
