import mongoose from 'mongoose';
import { IMessagingDoc, IMessagingModel } from './messaging.interfaces';

const messagingSchema = new mongoose.Schema<IMessagingDoc, IMessagingModel>(
  {
    message: {
      type: String,
      required: true,
      trim: true,
      validate(value:string){
        if(value.length > 102400){
            throw new Error("Message size more than 102400 characters are not allowed");
        }
      }
    },
    userId: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    attachmentType: {
      type: String,
      trim: true,
    },
    attachmentUrl: {
      type: String,
      trim: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Messaging = mongoose.model<IMessagingDoc, IMessagingModel>('Messaging', messagingSchema);

export default Messaging;