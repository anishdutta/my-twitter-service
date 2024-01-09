import Joi from "joi";
import { IFollowUserRequest } from "./user.interfaces";

const followUser: Record<keyof IFollowUserRequest, any> = {
  followedUserId: Joi.string().required(),
  token: Joi.string().required(),
};

export const followedUser = {
  body: Joi.object().keys(followUser),
};
