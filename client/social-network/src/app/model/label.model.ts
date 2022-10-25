export class Label implements LabelInterface{

    public id: number;
    public name: string;

    constructor(labelCfg: LabelInterface)
    {
        this.id = labelCfg.id;
        this.name = labelCfg.name;
    }
}

interface LabelInterface{
    id: number;
    name: string
}
