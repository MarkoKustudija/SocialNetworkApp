import { User } from "./user.model";
import { Post } from "./post.model";


export interface Comment {

    id? : number | any;
    commentId: string;
    content: string;
    post : Post;
    user : User;

}