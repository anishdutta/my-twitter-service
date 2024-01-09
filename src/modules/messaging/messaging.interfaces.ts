import { Model, Document } from "mongoose";

export type IMessaging = {
  userId: string;
  createdAt: Date;
  message: string;
  attachmentType?: AttachmentType;
  attachmentUrl?: string;
};

export interface IMessagingDoc extends IMessaging, Document {}

export interface IMessagingModel extends Model<IMessagingDoc> {}

export interface IFetchAllMessagesRequest {
  userId: string;
  token: string;
}

export type IPostMessageRequest = Omit<IMessaging, "createdAt" | "userId"> & {
  token: string;
};

export enum AttachmentType {
  IMAGE = "image",
  VIDEO = "video",
  GIF = "gif",
}
