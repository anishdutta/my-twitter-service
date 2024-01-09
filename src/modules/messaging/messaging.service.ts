import { ObjectId } from "mongodb";
import { ApiHelper, HttpsStatusCode } from "../../utils/utils.interfaces";
import User from "../user/user.model";
import {
  IFetchAllMessagesRequest,
  IMessaging,
  IPostMessageRequest,
} from "./messaging.interfaces";
import Messaging from "./messaging.model";

export class MessagingService {
  userId: string;
  timestamp: number; //UNIX format timestamp

  constructor(userId: string) {
    this.userId = userId;
    this.timestamp = new Date().valueOf();
  }

  /**
   * Login User
   * @param {string} message
   * @param {Date} createdAt
   * @param {string} attachmentType
   * @param {string} attachmentUrl
   * @returns {Promise<IMessaging>}
   */
  async postMessage(
    request: IPostMessageRequest
  ): Promise<ApiHelper<IMessaging>> {
    const requestPayload = {
      ...request,
      createdAt: this.timestamp,
      userId: this.userId,
    };
    const message = await Messaging.create(requestPayload);
    return {
      status: HttpsStatusCode.SUCCESS,
      response: message,
    };
  }

  /**
   * Fetch All Messages
   * @param {string} userId
   * @returns {Promise<IMessaging[]>}
   */
  async getAllMessages(
    request: IFetchAllMessagesRequest
  ): Promise<ApiHelper<IMessaging[]>> {
    const pipeline: any[] = [
      { $match: { _id: new ObjectId(request.userId) } },
      {
        $lookup: {
          from: "messagings",
          let: { followings: "$followings" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    {
                      $in: [
                        "$userId",
                        {
                          $map: {
                            input: "$$followings",
                            as: "followingId",
                            in: { $toString: "$$followingId" },
                          },
                        },
                      ],
                    }, // Match messages of followed users
                  ],
                },
              },
            },
          ],
          as: "followedMessages",
        },
      },
      { $unwind: "$followedMessages" },
      { $sort: { "followedMessages.createdAt": -1 } },
      {
        $group: {
          _id: "$_id",
          allMessages: { $push: "$followedMessages" },
        },
      },
      { $unwind: "$allMessages" },
      { $replaceRoot: { newRoot: "$allMessages" } },
    ];

    const [result, userMessages] = await Promise.all([
      User.aggregate(pipeline),
      await Messaging.find({
        userId: request.userId,
      }),
    ]);

    console.log("Feed:", result);
    return {
      status: HttpsStatusCode.SUCCESS,
      response: [...userMessages, ...result].sort(
        (a, b) => a.createdAt - b.createdAt
      ), //Sorted in chronological order
    };
  }
}
