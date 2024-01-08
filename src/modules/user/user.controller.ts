import { HttpsStatusCode } from "../../utils/utils.interfaces";
import { TokenService } from "../token/toke.service";
import { Request, Response } from 'express';
import { UserService } from "./user.service";

export const followUser = async (req: Request, res: Response) => {
    try{
        const request = req.body, tokenService = new TokenService(), userService = new UserService();
        const tokenUser = await tokenService.verifyToken(request.token);
        if(!tokenUser){
            res.status(HttpsStatusCode.VALIDATION_FAILED).send({ error: "Invalid Token!" });
            return {
                status: HttpsStatusCode.VALIDATION_FAILED,
                error: "Invalid Token!"
            }
        }
        console.log(req.body)
        const followUserResponse = await userService.followUser(req.body,tokenUser.user);
        if(followUserResponse.error){
            res.status(followUserResponse.status).send(followUserResponse.error);
            return followUserResponse;
        }
        res.status(HttpsStatusCode.SUCCESS).send({ ...followUserResponse });
    }
    catch(err){
        console.error("Error in followUser",err)
        res.status(HttpsStatusCode.SOMETHING_WENT_WRONG).send({
            status: HttpsStatusCode.SOMETHING_WENT_WRONG,
            error: Object.keys(err).length > 0 ? err : (JSON.stringify(err) || 'Something Went Wrong, Please Try Again Later.')
        });
    }
  };