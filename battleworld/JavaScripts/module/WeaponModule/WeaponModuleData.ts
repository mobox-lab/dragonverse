
export class WeaponModuleData extends Subdata {

    /**玩家默认武器 */
    @Decorator.persistence()
    private weaponId: number = 1;


    /**玩家拥有的武器id数组 */
    @Decorator.persistence()
    private ownWeaponIds: number[] = [];


    public get dataName() {
        return "WeaponModuleData";
    }

    //当前最新的版本号(默认是1，升级数据需要重写)
    protected override get version() {
        return 1;
    }

    /**获取当前装备的武器id */
    public getEquipWeaponId() {
        return this.weaponId;
    }

    /**
     * 修改玩家装备的武器id
     * @param weaponId 武器id
     */
    public changeWeaponId(weaponId: number, save: boolean = false, syncClient: boolean = false) {
        this.weaponId = weaponId;
        if (SystemUtil.isClient()) {
            return;
        }
        if (save == false) {
            return;
        }
        this.save(syncClient);
    }

    /**添加购买的武器id */
    public addWeaponId(weaponId: number, save: boolean = false, syncClient: boolean = false) {
        if (this.ownWeaponIds.includes(weaponId)) {
            return;
        }
        this.ownWeaponIds.push(weaponId);
        if (SystemUtil.isClient()) {
            return;
        }
        if (save == false) {
            return;
        }
        this.save(syncClient);
    }

    /**获取拥有的武器id数组 */
    public getOwnWeaponIds() {
        return this.ownWeaponIds;
    }

}

