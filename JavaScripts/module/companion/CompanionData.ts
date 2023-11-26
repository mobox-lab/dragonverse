import GToolkit from "../../util/GToolkit";


export class CompanionInfo {


    /** 每只宠物的唯一id */
    companionSign: string

    /** 宠物的表格配置id */
    companionId: number

    /**
     * 捕捉到的时间
     */
    createTime: number;

}

export class CompanionData extends mwext.Subdata {



    @Decorator.persistence()
    allCompanion: CompanionInfo[] = [];


    @Decorator.persistence()
    carriedCompanion: string[] = [];



    protected initDefaultData(): void {
        this.allCompanion = [];
        this.carriedCompanion = [];
    }


    /**
     * 用户添加一个伙伴龙
     * @param companionInfo 
     */
    public addCompanion(companionInfo: CompanionInfo) {

        this.allCompanion.push(companionInfo);
    }





}


export class CompanionDataHelper {

    public static createSingleCompanionInfo(createTime: number, companionId: number): CompanionInfo {

        let ret = new CompanionInfo();
        ret.createTime = createTime
        ret.companionId = companionId;
        ret.companionSign = GToolkit.generateUUID();
        return ret;
    }
}