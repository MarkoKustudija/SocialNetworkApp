import { Post } from "./post.model";
import { User } from "./user.model";

export class Comment implements CommentInterface{

    public id: number;
    public user: User | null;
    public post: Post | null;
    public time: Date;
    public content: String;

    constructor(commentCfg: CommentInterface)
    {
        this.id = commentCfg.id;
        this.user = commentCfg.user;
        this.post = commentCfg.post;
        this.time = commentCfg.time;
        this.content = commentCfg.content;
    }
}

interface CommentInterface{
    id: number;
    user: User | null;
    post: Post | null;
    time: Date;
    content: String;
}
