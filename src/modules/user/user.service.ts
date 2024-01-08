import { ApiHelper, HttpsStatusCode } from "../../utils/utils.interfaces";
import {  IFollowUserRequest, IRegisterUserRequest, IUserDoc } from "./user.interfaces";
import User from "./user.model";

export class UserService{



    async getUserByEmail(email:string):Promise<ApiHelper<IUserDoc>>{
        const user = await User.findOne({
            email
        });
        if(!user){
            return {
                error: "User not found",
                status: HttpsStatusCode.VALIDATION_FAILED
            };
        }
        // const isPasswordMatch = await bcrypt.compare(password, user?.password);
        console.log(user,user?.toJSON);
        return {response:user, status:HttpsStatusCode.SUCCESS};
    }

    async createUser(createUserRequest: IRegisterUserRequest):Promise<ApiHelper<IUserDoc>>{
        return await User.isEmailTaken(createUserRequest.email) ? {
            status: HttpsStatusCode.VALIDATION_FAILED,
            error: "Email Already Taken!"
        } : {
            status: HttpsStatusCode.SUCCESS,
            response: await User.create(createUserRequest)
        };
    }

    async followUser(followUserRequest:IFollowUserRequest, userId: string):Promise<ApiHelper<{success:boolean}>>{

        const [followingUser, followedUser] = await Promise.all([
                 User.findById(userId),
                 User.findById(followUserRequest.followedUserId)
        ]);
        if(!followedUser?._id){
            return {
                error: `User with ID ${followUserRequest.followedUserId} not found`,
                status: HttpsStatusCode.VALIDATION_FAILED
            }
        }
        followedUser.followers.push(followingUser._id);
        followingUser.followings.push(followedUser._id);
        await Promise.all(
            [
                followedUser.save(),
                followingUser.save()
            ]
        );
        return {
            status: HttpsStatusCode.SUCCESS,
            response: {
                success: true
            }
        }
    }
}