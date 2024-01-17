import { IEffectElement } from "../../../config/Effect";
import { GameConfig } from "../../../config/GameConfig";
import { EModule_Events, EPickUpCreType, EPickUpType } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import { util } from "../../../tool/Utils";
import { PickManagerS } from "../PickManagerS";
import PickUpBase from "./PickUpBase";

/**
 * 拾取物 属性同步脚本
 */
@Component
export default class PickUp extends Script {

    /**绑定物体id*/
    @mw.Property({ replicated: true })
    public landParcesid: number = -1; //fix:bug 设置为null 不会继续同步了？

    /**拾取物类型*/
    @mw.Property({ replicated: true, onChanged: "onChange_pickUpType" })
    public pickUpType: EPickUpType = EPickUpType.None; //设置为EPickUpType.None 不会继续同步了？

    /**需要生成的预制体 */
    @mw.Property({ replicated: true, onChanged: "onChange_pickUpPrefabInfo" })
    public pickUpPrefabInfo: string = "";
    /**随机掉落位置*/
    @mw.Property({ replicated: true })
    public endPos: Vector = new Vector(0, 0, 0);

    /**初始位置 */
    @mw.Property({ replicated: true })
    public startPos: Vector = new Vector(0, 0, 0);

    /**记录 绑定物体id*/
    public landParcesid_old_pickUpType: number = -1;
    /**记录 绑定物体id*/
    public landParcesid_old_pickUpPrefabInfo: string = "";

    /**预制体脚本 */
    private pickUp: PickUpBase = null;

    /** 生成类型 */
    @mw.Property({ replicated: true })
    public creatType: EPickUpCreType = EPickUpCreType.land;
    /** 掉落表现配置id */
    @mw.Property({ replicated: true })
    public dropId: number = 0;



    /**初级丹药的预制体guid，脚本 */
    private static pillPrefabGuidInfo: string[] = [
        "986105E84C483273F2A5E09ACDF2FA41",
        "A97431DE41AFDD8113C9B4BE2245036F",
        "77B3466B4299EEB7FAB627A6E8B7AA5E",
        "9C82E15B4D7AC08F2AE87690A4A738A5"
    ];

    private static scriptNameMap: Map<string, string> = new Map([
        ["5BA0F2F74122E218BA6564B648CF5704", "PickUpMoney"],
        ["147DCB9A4B7FDB75926F50B33104E415", "PickUpSkill"],
        ["8CF8131D4242A8BAB5BE31BE751E23B8", "PickUpHp"],
        ["7AB4F8694A94CEFB2FA21989A0E3E3D2", "PickUpHp"],
        ["8315C75149E8E4B5DE2E38ACADDC1967", "PickUpDressUp"],
        ["986105E84C483273F2A5E09ACDF2FA41", "PickUpPill"],
        ["A97431DE41AFDD8113C9B4BE2245036F", "PickUpPill"],
        ["77B3466B4299EEB7FAB627A6E8B7AA5E", "PickUpPill"],
        ["9C82E15B4D7AC08F2AE87690A4A738A5", "PickUpPill"]
    ]);

    protected onStart(): void {

    }

    private async onChange_pickUpType(): Promise<void> {
        if (this.pickUpType == EPickUpType.attribute) return;   //交给onChange_pickUpPrefabInfo处理
        if (this.creatType == EPickUpCreType.npc) return;   //交给onChange_pickUpPrefabInfo处理
        if (this.landParcesid_old_pickUpType == this.pickUpType) {
            return;
        }
        this.landParcesid_old_pickUpType = this.pickUpType;


        this.creatPickup();
    }

    private onChange_pickUpPrefabInfo() {

        if (this.landParcesid_old_pickUpPrefabInfo == this.pickUpPrefabInfo) {
            return;
        }
        this.landParcesid_old_pickUpPrefabInfo = this.pickUpPrefabInfo;

        this.createPrefabPickup();
    }



    /**
     * 创建预制体pickup
     * @param prefabGuid 预制体GUID
     * @param scritpName 脚本名
     */
    private async create(prefabGuid: string, scritpName: string) {
        let prefab: GameObject = await GameObjPool.asyncSpawn(prefabGuid, GameObjPoolSourceType.Prefab);
        this.pickUp = prefab.getScriptByName(scritpName) as PickUpBase;
        this.pickUp.dropId = this.dropId;
        if (this.pickUp == null) {
            console.error("creatPickUp script == null ")
            return;
        }
        if (this.creatType == EPickUpCreType.land) {
            let cfg = GameConfig.LandParcel.getElement(this.landParcesid);
            if (!cfg) return;
            let parcesobj = await GameObject.asyncFindGameObjectById(cfg.Guid);
            if (parcesobj == null) {
                console.error("onChange_parcesid go == null");
            }
            await this.pickUp.creat(parcesobj, this.pickUpType, this.landParcesid);
        }
        else {
            await this.pickUp.dropCreate(this.pickUpType, this.startPos, this.endPos, this.landParcesid);
        }

        this.pickUp.onEnterAction.add(this.listen_onEnter, this);
    }



    /**
     * 创建&&销毁拾取物  
     */
    private async creatPickup() {

        if (this.pickUpType == -1) {
            this.romvePickUp();
            return;
        }

        let pickUpType = this.pickUpType
        let prefabguid = "";
        let scritpName = "";
        switch (pickUpType) {
            case EPickUpType.skill:
                {
                    prefabguid = "147DCB9A4B7FDB75926F50B33104E415";
                    scritpName = "PickUpSkill";
                }
                break;
            case EPickUpType.hp:
                {
                    prefabguid = "8CF8131D4242A8BAB5BE31BE751E23B8";
                    scritpName = "PickUpHp";
                }
                break;
            case EPickUpType.money:
                {
                    prefabguid = "5BA0F2F74122E218BA6564B648CF5704";
                    scritpName = "PickUpMoney";
                }
                break;
            case EPickUpType.attribute:
                {
                    //随机创一个丹药
                    prefabguid = PickUp.pillPrefabGuidInfo[MathUtil.randomInt(0, PickUp.pillPrefabGuidInfo.length)];
                    scritpName = "PickUpPill";
                }
                break;
            case EPickUpType.dressUp:
                {
                    prefabguid = "8315C75149E8E4B5DE2E38ACADDC1967";
                    scritpName = "PickUpDressUp";
                }
                break;
            default:
                break;
        }

        this.romvePickUp();

        this.create(prefabguid, scritpName);

    }

    /**
     * 创建&&销毁指定预制体的拾取物  
     */
    private createPrefabPickup() {
        //销毁逻辑
        if (!this.pickUpPrefabInfo || this.pickUpPrefabInfo == "") {
            this.romvePickUp();
            return;
        }
        if (this.pickUpPrefabInfo && this.pickUpPrefabInfo != "") {
            const val = PickUp.scriptNameMap.get(this.pickUpPrefabInfo);
            if (val) {
                this.romvePickUp();
                this.create(this.pickUpPrefabInfo, val);
            }
        }
    }



    /**监听玩家进入触发器 */
    private listen_onEnter(pickUpType: EPickUpType, pickPos: mw.Vector) {

        if (this.pickUp == null) {
            return;
        }

        EventManager.instance.call(EModule_Events.land_pickUp, pickUpType, this.pickUp, this);

        if (this.pickUp.effectCfgId != -1) {
            let effectcfg: IEffectElement = GameConfig.Effect.getElement(this.pickUp.effectCfgId);
            if (effectcfg && effectcfg.EffectPoint) {
                if (effectcfg.EffectPoint == -1) {
                    let pos = mw.Vector.add(pickPos, effectcfg.EffectLocation);
                    util.playEffectAtLocation(this.pickUp.effectCfgId, pos);
                } else {
                    util.playEffectOnPlayer(mw.Player.localPlayer.playerId, this.pickUp.effectCfgId);
                }
            }
        }

        if (this.pickUp.suoundCfgId != -1) {
            util.playSoundByConfig(this.pickUp.suoundCfgId);
        }

        // this.pickUp = null;
    }


    /**
   * 拾取掉落物
   */
    private romvePickUp() {
        if (this.pickUp == null) {
            return;
        }
        this.pickUp.recycle();
        this.pickUp = null;
    }

    /**----------------------------服务器接口---------------------------------- */
    /**
     * 创建 （服务器调用）
     */
    public creat(landParcesid: number, pickUpType: EPickUpType) {
        this.landParcesid = landParcesid;
        this.pickUpType = pickUpType;
        if (pickUpType == EPickUpType.attribute) {
            //随机预制体
            this.pickUpPrefabInfo = PickUp.pillPrefabGuidInfo[MathUtil.randomInt(0, PickUp.pillPrefabGuidInfo.length)];
        }
        this.creatType = EPickUpCreType.land;
    }


    /**掉落物自动回收key */
    private autoRecycleKey: any = null;


    /**
     * npc掉落创建(服务器端调用)
     */
    public dropCreate(guid: string, startPos: Vector, endPos: Vector, landParcesid: number, dropType: EPickUpType, cfgId: number) {
        this.landParcesid = landParcesid;
        this.pickUpType = dropType;
        this.creatType = EPickUpCreType.npc;
        this.endPos = endPos;
        this.startPos = startPos;
        this.dropId = cfgId;

        this.pickUpPrefabInfo = guid;

        // 多少秒后回收
        let recycleTime = GameConfig.PropDrop.getElement(this.dropId).overTime;
        this.autoRecycleKey = setTimeout(() => {
            this.autoRecycleKey = null;
            PickManagerS.instance.recyclePickUp(this.guid);
        }, recycleTime * 1000);
    }

    /**清理延时key */
    private clear_autoRecycleKey() {
        if (this.autoRecycleKey) {
            clearTimeout(this.autoRecycleKey);
            this.autoRecycleKey = null;
        }
    }


    /**
     * 回收(服务器端调用)
     */
    public recycle() {

        this.clear_autoRecycleKey();

        this.landParcesid = -1;
        this.pickUpType = EPickUpType.None;
        this.creatType = EPickUpCreType.none;
        this.pickUpPrefabInfo = "";
    }

}