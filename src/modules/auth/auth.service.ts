import { ILoginUserRequest, IRegisterUserRequest, IUserDoc } from "../../modules/user/user.interfaces";
import { UserService } from "../../modules/user/user.service";
import { ApiHelper } from "../../utils/utils.interfaces";

export class AuthService{

    userService : UserService

    init(){
        this.userService = new UserService();
    }


    async login(loginRequest: ILoginUserRequest):Promise<ApiHelper<IUserDoc>>{
        this.init();
        const user = await this.userService.getUserByEmail(loginRequest.email);
        if(user.error){
            return user;
        }
        if (!user.response || !(await user.response.isPasswordMatch(loginRequest.password))) {
            return {
                status: 404,
                error: 'Incorrect email or password'
            }
          }
        return user;
    }

    async register(registerBody: IRegisterUserRequest):Promise<ApiHelper<IUserDoc>>{
        this.init();
        return await this.userService.createUser(registerBody); 
    }
}