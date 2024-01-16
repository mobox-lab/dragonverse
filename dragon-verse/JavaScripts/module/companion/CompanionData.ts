

export class CompanionEvents {

    /** 玩家获得了新的宠物龙 */
    public static PlayerCompanionAdded = "PlayerCompanionAdded";
}


export class CompanionData extends mwext.Subdata {



    @Decorator.persistence()
    currentShowupBagId: number = 0;



    protected onDataInit(): void {
    }


    protected initDefaultData(): void {
        this.currentShowupBagId = 0;
    }




    public setCompanionShowup(bagId: number) {
        this.currentShowupBagId = bagId;
        this.save(false);
    }




    public getCurrentShowup() {

        return this.currentShowupBagId;

    }




}


