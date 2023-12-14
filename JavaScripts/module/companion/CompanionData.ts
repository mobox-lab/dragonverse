import GToolkit from "../../util/GToolkit";
import UUID from "pure-uuid";


export class CompanionEvents {

    /** 玩家获得了新的宠物龙 */
    public static PlayerCompanionAdded = "PlayerCompanionAdded";
}

export class CompanionInfo {


    /** 每只宠物的唯一id */
    companionSign: string = ''

    /** 宠物的表格配置id */
    companionId: number = 0

    /**
     * 捕捉到的时间
     */
    createTime: number = 0

    /**
     * 是否出战
     */
    isShowUp: boolean = false;

}

export class CompanionData extends mwext.Subdata {



    @Decorator.persistence()
    allCompanion: CompanionInfo[] = [];



    private _idList: string[] = [];


    protected onDataInit(): void {
        this._idList = [];
        for (let companion of this.allCompanion) {
            this._idList.push(companion.companionSign);
        }
    }


    protected initDefaultData(): void {
        this.allCompanion = [];
    }


    /**
     * 用户添加一个伙伴龙
     * @param companionInfo
     */
    public addCompanion(companionInfo: CompanionInfo) {

        this.allCompanion.push(companionInfo);
        this._idList.push(companionInfo.companionSign);
    }



    public getCompanionIdList(): readonly string[] {

        return this._idList;
    }


    public foreachCompanion(callback: (companion: CompanionInfo) => void) {
        for (let companion of this.allCompanion) {
            callback(companion);
        }
    }

    /**
     * 通过id获取伙伴详细信息
     * @param companionSign 指定id
     * @returns
     */
    public getCompanion(companionSign: string) {

        for (let companion of this.allCompanion) {
            if (companion.companionSign == companionSign) {
                return companion;
            }
        }

        return null;

    }


    public getCompanionWhoShowUp() {

        for (let companion of this.allCompanion) {
            if (companion.isShowUp) {
                return companion;
            }
        }

        return null;

    }




}


export class CompanionDataHelper {

    /**
     * 创建一个伙伴信息
     * @param createTime 创建时间
     * @param companionId 配置id
     * @returns
     */
    public static createSingleCompanionInfo(createTime: number, companionId: number): CompanionInfo {

        let ret = new CompanionInfo();
        ret.createTime = createTime
        ret.companionId = companionId;
        ret.companionSign = new UUID(4).toString();
        ret.isShowUp = false;
        return ret;
    }
}