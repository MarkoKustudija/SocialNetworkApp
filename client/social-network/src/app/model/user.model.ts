export class User implements UserInterface{

    public id: number;
    public firstName: string;
    public lastName: string;
    public username: string;

    constructor(userCfg: UserInterface)
    {
        this.id = userCfg.id;
        this.firstName = userCfg.firstName;
        this.lastName = userCfg.lastName;
        this.username = userCfg.username;
    }
}

interface UserInterface{
    id: number;
    firstName: string;
    lastName: string;
    username: string;
}
