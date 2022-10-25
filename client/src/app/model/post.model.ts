import { User } from "./user.model";

export interface Post {
    id? : number | any;
    postId: string;
    title : string;
    content: string;
    user? : User;

}