import { ISignInDto } from "./signIn.dto";

export interface ISignUpDto extends ISignInDto{
    name:string;
    avatar:string;
}