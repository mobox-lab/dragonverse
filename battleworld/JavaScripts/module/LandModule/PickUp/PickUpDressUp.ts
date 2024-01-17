import { EPickUpType } from "../../../const/Enum";
import IPickUpInfo from "./IPickUpInfo";
import PickUpBase from "./PickUpBase";

@Serializable
export class DressUpAttributeParam {
    @Property({ displayName: "属性ID" })
    public attributeID: number = 0;
    @Property({ displayName: "数值" })
    public attributeValue: number = 0;

    constructor(attributeID: number, attributeValue: number) {
        this.attributeID = attributeID;
        this.attributeValue = attributeValue;
    }
}

@Component
export default class PickUpDressUp extends PickUpBase {

    @Property({ displayName: "外观GUID", arrayDefault: 0, group: "变身" })
    public descGuid: string = "";

    @Property({ displayName: "挂件ID", arrayDefault: 0, group: "变身" })
    public pendantId: number = 0;

    @Property({ displayName: "技能库ID", arrayDefault: 0, group: "变身" })
    public skillIds: number[] = [];

    @Property({ displayName: "变身后特殊音效", group: "变身" })
    public specialSound: string = "";

    @Property({ displayName: "属性变化参数", arrayDefault: new DressUpAttributeParam(0, 0), group: "变身" })
    public attributeParams: DressUpAttributeParam[] = [];

    protected async onStart(): Promise<void> {
        await super.onStart();
        this.pickUpType = EPickUpType.dressUp;
    }

    public getDressUpInfo(): DressUpInfo {
        return new DressUpInfo(this.descGuid, this.pendantId, this.skillIds, this.specialSound, this.attributeParams);
    }
}

export class DressUpInfo implements IPickUpInfo {
    public descGuid: string = "";
    public pendantId: number = 0;
    public skillIds: number[] = [];
    public specialSound: string = "";
    public attributeParams: DressUpAttributeParam[] = [];

    constructor(descGuid: string, pendantId: number, skillIds: number[], specialSound: string, attributeParams: DressUpAttributeParam[]) {
        this.descGuid = descGuid;
        this.pendantId = pendantId;
        this.skillIds = skillIds;
        this.specialSound = specialSound;
        this.attributeParams = attributeParams;
    }
}