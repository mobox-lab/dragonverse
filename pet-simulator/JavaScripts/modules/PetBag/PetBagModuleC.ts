import { GameConfig } from "../../config/GameConfig";
import { oTraceError } from "../../util/LogManager";
import { numberArrToString, stringToNumberArr, utils } from "../../util/uitls";
import { AnalyticsTool } from "../Analytics/AnalyticsTool";
import { P_HudPetGift } from "../OnlineModule.ts/P_HudPetGift";
import { P_Bag } from "./P_Bag";
import { PetBagModuleData, petItemDataNew, petTrain } from "./PetBagModuleData";
import { PetBagModuleS } from "./PetBagModuleS";
import { GlobalData } from "../../const/GlobalData";
import { P_Pet_Dev } from "./P_Pet_Dev";
import { P_FusePanel } from "./P_FusePanel";
import MessageBox from "../../util/MessageBox";
import { P_Enchants } from "./P_Enchants";
import AchievementModuleC from "../AchievementModule/AchievementModuleC";
import { GlobalEnum } from "../../const/Enum";
import { EnchantBuff } from "./EnchantBuff";
import { PlayerNameManager } from "../Trading/PlayerNameManager";
import { P_GlobalTips } from "../UI/P_GlobalTips";
import Gtk from "../../util/GToolkit";
import { P_HudPet2 } from "../Hud/P_HudPet2";

export class PetBagModuleC extends ModuleC<PetBagModuleS, PetBagModuleData> {
    private achievementModuleC: AchievementModuleC = null;
    private bagUI: P_Bag;
    private devUI: P_Pet_Dev;
    private fuseUI: P_FusePanel;
    private enchantUI: P_Enchants;

    /**训练中的宠物 */
    private trainArr: petTrain[] = [];
    private hudPetUI: P_HudPetGift;

    //特效旋转
    private canUpdate: boolean = false;
    private effect: mw.Effect;
    private eggRotate: number = 0;

    protected onStart(): void {
        this.initData();
        this.initUI();
        this.initEvent();
        this.trainChange();
        this.devInit();
        this.enchantBuffInit();
    }

    private initData() {
        GameObject.asyncFindGameObjectById(GlobalData.Enchant.effectGuid).then((eff) => {
            this.effect = eff as mw.Effect;
        });
        this.achievementModuleC = ModuleService.getModule(AchievementModuleC);
    }

    protected onEnterScene(sceneType: number): void {
        this.calcBuff();
    }

    private initUI() {
        this.bagUI = mw.UIService.getUI(P_Bag);
        this.devUI = mw.UIService.getUI(P_Pet_Dev);
        this.fuseUI = mw.UIService.getUI(P_FusePanel);
        this.enchantUI = mw.UIService.getUI(P_Enchants);
        this.hudPetUI = mw.UIService.getUI(P_HudPetGift);
        this.bagUI.onEquipAC.add(this.equipEvent.bind(this));
        this.bagUI.onReNameAC.add(this.reNameEvent.bind(this));
        this.bagUI.onDelAC.add(this.delEvent.bind(this));
        this.bagUI.hideAC.add(() => {
            this.hudPetUI.clearRedPoint();
        });
        this.fuseUI.onShowAC.add(this.enterFuseTrigger.bind(this));
        this.hudPetUI.setBagText(this.data.CurFollowPets.length, this.data.MaxFollowCount);

        let ids = this.data.CurFollowPets.map((key) => this.data.bagItemsByKey(key).I);
        UIService.getUI(P_HudPetGift)?.setBattlePets(this.data.CurFollowPets, ids);

        this.enchantUI.enchantAc.add(this.addEnchant.bind(this));
        this.enchantUI.onUpdateAc.add((canUpdate: boolean) => {
            this.canUpdate = canUpdate;
        });

    }

    /**词条buff初始化 */
    private enchantBuffInit() {
        let keys = this.data.CurFollowPets;
        for (let id = 0; id < keys.length; id++) {
            EnchantBuff.equipUnPet(Player.localPlayer.playerId, keys[id], true);
        }
    }

    private calcBuff() {
        this.server.net_bestFriendBuff();
        this.server.net_passBuff();
    }

    private devInit(): void {
        utils.triInit(GlobalData.Dev.goldTriggerGuid, this.enterGoldTrigger.bind(this), this.leaveTrigger.bind(this));
        utils.triInit(GlobalData.Dev.rainbowTriggerGuid, this.enterBossTrigger.bind(this), this.leaveTrigger.bind(this));
        utils.triInit(GlobalData.Fuse.triggerGuid, this.enterFuseTrigger.bind(this), this.leaveFuseTrigger.bind(this));
        utils.triInit(GlobalData.Enchant.triggerGuid, this.enterEnchantTrigger.bind(this), this.leaveEnchantTrigger.bind(this));
    }

    /**进入合成触发器 */
    private enterFuseTrigger() {
        let petItems = this.data.sortBag();
        mw.UIService.getUI(P_FusePanel).show(petItems);
    }

    /**离开合成触发器 */
    private leaveFuseTrigger() {
        // if (mw.UIService.getUI(P_FusePanel).visible)
        //     mw.UIService.getUI(P_FusePanel).hide();
    }

    /**进入黄金化触发器 */
    private enterGoldTrigger() {
        let petItems = this.data.sortBag();
        mw.UIService.getUI(P_Pet_Dev).show(petItems, true);
    }

    /**进入彩虹化触发器 */
    private enterBossTrigger() {
        let petItems = this.data.sortBag();
        mw.UIService.getUI(P_Pet_Dev).show(petItems, false);
    }

    private enterEnchantTrigger() {
        let petItems = this.data.sortBag();
        this.enchantUI.showPanel(petItems);
    }

    private leaveEnchantTrigger() {
        // if (this.enchantUI.visible)
        //     this.enchantUI.hide();
    }

    /**离开触发器 */
    private leaveTrigger() {
        // if (mw.UIService.getUI(P_Pet_Dev).visible)
        //     mw.UIService.getUI(P_Pet_Dev).hide();
    }

    private initEvent() {
        this.bagUI.setEquipNum(this.data.MaxFollowCount);
        this.data.BagItemChangeAC.add(this.itemChange.bind(this));
        this.data.PetTrainChangeAC.add(this.trainChange.bind(this));
        this.data.PetEquipChangeAC.add(this.equipChange.bind(this));
        this.data.PetEnchantChangeAC.add(this.enchantSuccess.bind(this));
        this.data.PetFollowCountChangeAC.add(() => {
            this.bagUI.setEquipNum(this.data.MaxFollowCount);
            mw.UIService.getUI(P_HudPetGift).setBagText(this.data.CurFollowPets.length, this.data.MaxFollowCount);
        });
    }

    /**背包添加完毕 */
    private itemChange(isEquip: boolean, id: number, key: number) {
        this.calcBuff();
        if (!isEquip) return;

        let arrId: number[] = [];
        if (this.data.CurFollowPets.length < this.data.MaxFollowCount && this.data.CurBagCapacity > 0) {

            let arr = this.data.sortBag();
            for (let i = 0; i < arr.length; i++) {
                const element = arr[i];

                let index = this.data.CurFollowPets.findIndex((value) => {
                    return value == element.k;
                });
                if (index == -1) {
                    arrId.push(element.k);
                    if (arrId.length + this.data.CurFollowPets.length >= this.data.MaxFollowCount)
                        break;
                }
            }
            this.equipEvent(true, arrId);

        }
        this.hudPetUI.onRedPointAC.call(key);
        AnalyticsTool.action_get_item(id, this.getCurPetNum());

        let name = this.data.bagItemsByKey(key)?.p?.n ?? undefined;
        if (Gtk.isNullOrEmpty(name)) {
            let nameId = utils.GetRandomNum(1, 200);
            let name = utils.GetUIText(nameId);
            this.reNameEvent(key, name);
        }
    }

    private trainChange() {
        this.trainArr = this.data.trainPet;
    }

    /**增加背包容量 */
    public addBagCapacity(count: number) {
        this.server.net_addBagCapacity(count);
    }

    /**获取当前已经装备宠物数组 */
    public getCurEquipPets(): petItemDataNew[] {
        let arr: petItemDataNew[] = [];
        for (let i = 0; i < this.data.CurFollowPets.length; i++) {
            let data = this.data.bagItemsByKey(this.data.CurFollowPets[i]);
            if (data)
                arr.push(data);
        }
        return arr;
    }

    /**添加宠物
     * @param id 宠物id
     */
    public async addPet(id: number, type?: GlobalEnum.PetGetType, addTime?: number) {
        await this.server.net_addPetWithMissingInfo(Player.localPlayer.playerId, id, type, addTime);
    }

    /**宠物公告 */
    public async net_petNotice(playerId: number, petId: number, type: GlobalEnum.PetNoticeTips) {
        let cfg = GameConfig.PetARR.getElement(petId);
        let name = await PlayerNameManager.instance.getPlayerNameAsync(playerId);
        let str = "";
        switch (type) {
            case GlobalEnum.PetNoticeTips.Huge:
                str = GameConfig.Language.World_Tips_5.Value;
                break;
            case GlobalEnum.PetNoticeTips.Legend:
                str = GameConfig.Language.World_Tips_1.Value;
                break;
            case GlobalEnum.PetNoticeTips.Myth:
                str = GameConfig.Language.World_Tips_2.Value;
                break;
            case GlobalEnum.PetNoticeTips.Summer:
                str = GameConfig.Language.World_Tips_3.Value;
                break;
            case GlobalEnum.PetNoticeTips.Task:
                str = GameConfig.Language.World_Tips_4.Value;
                break;
            default:
                break;
        }
        str = name + " " + str + " " + cfg.petName;
        mw.UIService.getUI(P_GlobalTips).showTips(str);
    }

    public async net_enchantNotice(playerId: number, enchantIds: number[]) {
        const ids = GlobalData.Notice.enchantBuff;
        let name = await PlayerNameManager.instance.getPlayerNameAsync(playerId);
        let str = "";
        enchantIds.forEach((id) => {
            if (id == ids[0])
                str = GameConfig.Language.World_Tips_14.Value;
            if (id == ids[1])
                str = GameConfig.Language.World_Tips_15.Value;
            if (id == ids[2])
                str = GameConfig.Language.World_Tips_16.Value;
        });
        str = name + " " + str;
        mw.UIService.getUI(P_GlobalTips).showTips(str);
    }

    //************** 宠物背包*************/

    /**需要提示的item Key */
    public showBag(arr: number[] = []) {
        this.bagUI.setCanvasItem(this.data.sortBag(), this.data.CurFollowPets, arr);
        this.bagUI.show();
    }

    //装备事件
    private equipEvent(isEquip: boolean, keys: number[]) {
        console.warn(`lwj 装备宠物 ${isEquip}    key ${keys}`);
        if (isEquip) {
            this.server.net_equipPet(numberArrToString(keys));
        } else {
            this.server.net_unEquipPet(numberArrToString(keys));
        }
    }

    private reNameEvent(key: number, name: string) {
        this.server.net_petRename(key, name);
    }

    /**是否可删除 */
    public async delEvent(keys: number[]) {
        if (keys.length == this.getCurPetNum() && keys.length == 1) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_11.Value);
            return false;
        }
        if (keys.length == this.getCurPetNum()) {
            keys = this.delPet(keys);
        }
        this.hudPetUI.removeRedPoint(keys);
        // 设置数据
        await this.server.net_deletePet(keys);
        // 重新设置背包
        // this.bagUI.setCanvasItem(this.data.sortBag(), this.data.CurFollowPets);
        // this.bagUI.cancelDel();
        return true;
    }

    /**是否可融合强化 */
    public checkFuseAble(keys: number[]) {
        if (keys.length === this.getCurPetNum()) {
            return false;
        }
        this.hudPetUI.removeRedPoint(keys);
        return true;
    }

    /**返回可删除宠物数组 */
    public delPet(keys: number[]): number[] {
        let arr: petItemDataNew[] = [];
        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            let data = this.data.bagItemsByKey(element);
            if (data) {
                arr.push(data);
            }
        }
        arr.sort((a, b) => {
            let atk = b.p.a - a.p.a;
            return atk;
        });
        let result: number[] = [];
        for (let i = 1; i < arr.length; i++) {
            result.push(arr[i].k);
        }
        return result;
    }

    private equipChange(isEquip: boolean, keys: number[]) {
        console.warn(`lwj S段事件 变  ${isEquip}    key ${keys}`);
        mw.UIService.getUI(P_HudPetGift).setBagText(this.data.CurFollowPets.length, this.data.MaxFollowCount);
        this.bagUI.setCanvasItem(this.data.sortBag(), this.data.CurFollowPets);

        let ids = this.data.CurFollowPets.map((key) => this.data.bagItemsByKey(key).I);
        UIService.getUI(P_HudPetGift)?.setBattlePets(this.data.CurFollowPets, ids);

        let arr = keys.concat();
        for (let id = 0; id < arr.length; id++) {
            const element = arr[id];
            EnchantBuff.equipUnPet(Player.localPlayer.playerId, element, isEquip);
        }
    }

    /**获取当前宠物数量 */
    public getCurPetNum(): number {
        return this.data.CurBagCapacity;
    }

    /**获取背包容量 */
    public getBagCapacity(): number {
        return this.data.BagCapacity;
    }

    /** 原 P_FusePanel.fusePet 合成宠物 */
    public async fusePet(curSelectPets: number[], earliestObtainTime: number): Promise<boolean> {
        return this.server.net_fusePet(curSelectPets, earliestObtainTime);	// 原 fusePet
    }

    /** 原 P_Pet_Dev.startDev 调用 */
    public async fuseDevPet(curSelectKeys: number[], curPetId: number, isGold: boolean, curRate: number, curCost: number): Promise<boolean> {
        return this.server.net_fuseDevPet(curSelectKeys, curPetId, isGold, curRate, curCost);
    }

    /****************附魔***********/

    /**
     * 添加词条
     * @param key 宠物key
     * @param id 词条id
     */
    private addEnchant(keys: number[], ids: string[]) {
        this.server.net_addEnchant(numberArrToString(keys), ids);
    }

    /**附魔成功 */
    private enchantSuccess(key: number[], idstr: string[]) {
        this.achievementModuleC.onExecuteAchievementAction.call(GlobalEnum.AchievementType.PetEnchantNum, 1);//融合成功数

        for (let i = 0; i < idstr.length; i++) {
            const element = idstr[i];
            let ids = stringToNumberArr(element);
            ids.forEach((id) => {
                if (GlobalData.Enchant.specialEnchantId.includes(id)) {
                    oTraceError("宠物附魔独特的标签成功附魔成功");
                    this.achievementModuleC.onExecuteAchievementAction.call(GlobalEnum.AchievementType.PetEnchantUniqueTagSuccessNum, 1);//宠物附魔独特的标签成功
                }
            });
        }

    }

    async buyEgg(cfgId: number): Promise<number | null> {
        return await this.server.net_buyEgg(cfgId);
    }

    protected onUpdate(dt: number): void {
        if (!this.canUpdate) return;
        if (this.effect != null) {
            this.eggRotate += GlobalData.Enchant.effectRotate;
            this.eggRotate = this.eggRotate % 360;

            this.effect.worldTransform.rotation = (new mw.Rotation(0, 0, this.eggRotate));
        }
    }
}