import { EPickUpType } from "../../../const/Enum";
import IPickUpInfo from "./IPickUpInfo";
import PickUpBase from "./PickUpBase";

@Component
export default class PickUpPill extends PickUpBase {

    @Property({ displayName: "属性ID", group: "属性" })
    public attributeID: number = 103;

    @Property({ displayName: "属性加成值", group: "属性" })
    public attributeValue: number = 10;

    @Property({ displayName: "持续时间(s)", group: "属性" })
    public duration: number = 10;

    protected async onStart(): Promise<void> {
        await super.onStart();
        this.pickUpType = EPickUpType.attribute;
    }

    public getPillInfo(): PillInfo {
        return new PillInfo(this.attributeID, this.attributeValue, this.duration);
    }
}

export class PillInfo implements IPickUpInfo {
    public attributeID: number;
    public attributeValue: number;
    public duration: number

    constructor(attributeID: number, attributeValue: number, duration: number) {
        this.attributeID = attributeID;
        this.attributeValue = attributeValue;
        this.duration = duration;
    }
}