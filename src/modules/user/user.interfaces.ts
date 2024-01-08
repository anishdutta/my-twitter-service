import { Model, Document } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
  followers?: string[],
  followings?: string[]
}

export interface IUserDoc extends IUser, Document {};

export interface IUserModel extends Model<IUserDoc>{};


export interface IFollowUserRequest {
    followedUserId: string,
    token: string
}

export interface IUserDoc extends IUser, Document {
  isPasswordMatch(password: string): Promise<boolean>;
}

export interface IUserModel extends Model<IUserDoc> {
  isEmailTaken(email: string): Promise<boolean>;
}

export type UpdateUserBody = Partial<IUser>;


export type ILoginUserRequest  = Omit<IUser,| 'isEmailVerified' | 'name'>;

export type IRegisterUserRequest = Omit<IUser,| 'isEmailVerified' | 'followers' | 'followings'>;
