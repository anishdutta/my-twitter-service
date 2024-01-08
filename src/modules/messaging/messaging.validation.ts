import Joi from 'joi';
import { IFetchAllMessagesRequest, IPostMessageRequest } from './messaging.interfaces';

const registerBody: Record<keyof IPostMessageRequest, any> = {
  message: Joi.string().required(),
  attachmentType: Joi.string().optional(),
  attachmentUrl: Joi.string().optional(),
  token: Joi.string().required()
};

const getAllMessages: Record<keyof IFetchAllMessagesRequest, any> = {
  userId: Joi.string().required(),
  token: Joi.string().required()
};




export const postMessage = {
  body: Joi.object().keys(registerBody),
};

export const getAllMessagesRequest = {
  body: Joi.object().keys(getAllMessages),
};