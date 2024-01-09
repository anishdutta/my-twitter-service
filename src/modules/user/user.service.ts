import { ApiHelper, HttpsStatusCode } from "../../utils/utils.interfaces";
import {
  IFollowUserRequest,
  IRegisterUserRequest,
  IUserDoc,
} from "./user.interfaces";
import User from "./user.model";

export class UserService {
  /**
   * Get User By Email
   * @param {string} email
   * @returns {Promise<IUserDoc>}
   */
  async getUserByEmail(email: string): Promise<ApiHelper<IUserDoc>> {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return {
        error: "User not found",
        status: HttpsStatusCode.VALIDATION_FAILED,
      };
    }
    console.log(user, user?.toJSON);
    return { response: user, status: HttpsStatusCode.SUCCESS };
  }

  /**
   * Create User
   * @param {string} IRegisterUserRequest
   * @returns {Promise<IUserDoc>}
   */
  async createUser(
    createUserRequest: IRegisterUserRequest
  ): Promise<ApiHelper<IUserDoc>> {
    return (await User.isEmailTaken(createUserRequest.email))
      ? {
          status: HttpsStatusCode.VALIDATION_FAILED,
          error: "Email Already Taken!",
        }
      : {
          status: HttpsStatusCode.SUCCESS,
          response: await User.create(createUserRequest),
        };
  }

  /**
   * Follow User
   * @param {IFollowUserRequest} followUserRequest
   * @param {string} userId
   * @returns {Promise<{success: boolean}>}
   */
  async followUser(
    followUserRequest: IFollowUserRequest,
    userId: string
  ): Promise<ApiHelper<{ success: boolean }>> {
    const [followingUser, followedUser] = await Promise.all([
      User.findById(userId),
      User.findById(followUserRequest.followedUserId),
    ]);
    if (!followedUser?._id) {
      return {
        error: `User with ID ${followUserRequest.followedUserId} not found`,
        status: HttpsStatusCode.VALIDATION_FAILED,
      };
    }
    followedUser.followers.push(followingUser._id);
    followingUser.followings.push(followedUser._id);
    await Promise.all([followedUser.save(), followingUser.save()]);
    return {
      status: HttpsStatusCode.SUCCESS,
      response: {
        success: true,
      },
    };
  }
}
