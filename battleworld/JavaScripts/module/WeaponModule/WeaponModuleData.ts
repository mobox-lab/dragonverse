export class WeaponModuleData extends Subdata {

    /**玩家默认武器 */
    @Decorator.persistence()
    private weaponId: number = 1;


    /**玩家拥有的武器id数组 */
    @Decorator.persistence()
    private ownWeaponIds: number[] = [];

    /**
     * 赠品.
     * @type {number[]}
     * @private
     */
    @Decorator.persistence()
    private giftIds: number[] = [];


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

    /**
     * 获取赠品.
     * @param {number} weaponId
     */
    public addGift(weaponId: number) {
        if (this.ownWeaponIds.includes(weaponId)) return;

        this.ownWeaponIds.push(weaponId);
        this.giftIds.push(weaponId);
    }

    /**
     * 清除赠品.
     */
    public clearGift() {
        for (const giftId of this.giftIds) if (this.ownWeaponIds.includes(giftId)) this.ownWeaponIds.splice(this.ownWeaponIds.indexOf(giftId), 1);
        this.giftIds.length = 0;
    }

    /**
     * 真实获得 取消注册赠品.
     * @param {number} weaponId
     */
    public realGet(weaponId: number) {
        const index = this.giftIds.indexOf(weaponId);
        if (index >= 0) this.ownWeaponIds.splice(index, 1);
        this.save(false);
    }

    /**获取拥有的武器id数组 */
    public getOwnWeaponIds() {
        return this.ownWeaponIds;
    }

}

