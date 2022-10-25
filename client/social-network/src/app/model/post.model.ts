import { User } from "./user.model";

export class Post implements PostInterface{

    public id: number;
    public user: User | null;
    public time: Date;
    public content: String;

    constructor(postCfg: PostInterface)
    {
        this.id = postCfg.id;
        this.user = postCfg.user;
        this.time = postCfg.time;
        this.content = postCfg.content;
    }

}

interface PostInterface{
    id: number;
    user: User | null;
    time: Date;
    content: String;
}