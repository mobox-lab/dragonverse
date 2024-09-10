import { GeneralManager } from "../../Modified027Editor/ModifiedStaticAPI";
import { IEffectElement } from "../../config/Effect";
import { GameConfig } from "../../config/GameConfig";
import { ISceneUnitElement } from "../../config/SceneUnit";
import { GlobalEnum } from "../../const/Enum";
import { cubicBezier } from "../../util/MoveUtil";
import { SoundManager } from "../../util/SoundManager";
import { utils } from "../../util/uitls";
import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";
import { EnchantBuff } from "../PetBag/EnchantBuff";
import { BonusUI, ResourceUIPool } from "./scenceUnitUI";
import { GlobalData } from "../../const/GlobalData";
import { DropManagerS } from "./DropResouce";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import ModuleService = mwext.ModuleService;
import Log4Ts from "mw-log4ts";
import Gtk from "gtoolkit";
import AchievementModuleS from "../AchievementModule/AchievementModuleS";
import { comeDown, memorizePointIdToLocation, ResourceModuleS } from "./ResourceModule";
import { EnergyModuleS } from "../Energy/EnergyModule";
import GameServiceConfig from "../../const/GameServiceConfig";

export class Resource {

    private static _instance: Resource;
    public static get instance(): Resource {
        if (!this._instance) {
            this._instance = new Resource();
        }
        return this._instance;
    }

    public async getResource(cfgId: number): Promise<mw.GameObject> {
        let info = GameConfig.SceneUnit.getElement(cfgId);
        let res = await GameObject.asyncSpawn(info.Guid);
        // if (info.meshArr && info.meshArr.length > 0) {

        //     info.meshArr.forEach((item, index) => {
        //         let name = index + 1;
        //         let obj = res.getChildByName(name.toString());
        //         if (obj) {
        //             let mesh = obj as mw.Model;
        //             mesh.setMaterial(item);
        //         } else {
        //             console.error(`lwj 未找到资源cfg${cfgId}的indedx${index}}`);
        //         }
        //     });
        // }
        return res;
    }

    public returnResource(res: mw.GameObject) {
        res.destroy();
    }

}

class DamageRecord {
    constructor(public playerId: number, public damage: number) {
    }
}

/**场景资源Arr */
export const SceneResourceMap: Map<number, ResourceScript[]> = new Map<number, ResourceScript[]>();

@Component
export default class ResourceScript extends mw.Script {

    @mw.Property({replicated: true, onChanged: "onHpChanged"})
    public curHp: number = 0;
    @mw.Property({replicated: true, onChanged: "onSceneChanged"})
    public scenePointId: string = "";

    // 是否为 巨大宝箱
    public get isBigBox(): boolean {
        return (this.cfg?.resType > 8) ?? false;
    }

    // 是否为 普通宝箱 或者 巨大宝箱
    public get isBox(): boolean {
        return (this.cfg?.resType >= 7) ?? false;
    }

    /**伤害记录 */
    @mw.Property({replicated: true})
    private damageArr: DamageRecord[] = [];

    private _rate: number = 1;
    private rateEff: number;
    /**
     * 服务端config id
     * @type {number}
     * @private
     */
    private _cfgIdInServer: number = 0;

    public get rate(): number {
        return this._rate;
    }

    //----------------------------server-----------------------------------

    /**死亡回调 */
    public onDead: mw.Action = new mw.Action();

    public initServer(pointId: number, cfgId: number) {
        this.randomRate(cfgId);
        this.damageArr.length = 0;

        this.pointId = pointId;
        this._cfgId = cfgId;

        if (this.scenePointId === "") {
            //初始情况
            this.scenePointId = cfgId + "_" + pointId + "_" + this._rate + "0";
        } else if (this.scenePointId.slice(0, -1) !== cfgId + "_" + pointId + "_" + this._rate) {
            //不为空时判断是否和上一次的一样，不一样就初始加个0
            this.scenePointId = cfgId + "_" + pointId + "_" + this._rate + "0";
        } else {
            //一样就取反
            this.scenePointId = cfgId + "_" + pointId + "_" + this._rate + (this.scenePointId.charAt(this.scenePointId.length - 1) === "0" ? "1" : "0");
        }

        Log4Ts.log(Resource, `initServer scenePointId:${this.scenePointId}, ${this.guid}`);
        let unitInfo = GameConfig.SceneUnit.getElement(cfgId);
        this.curHp = unitInfo.HP;
        this.cfg = unitInfo;
        this.onDead.clear();

        this._cfgIdInServer = cfgId;

        this.lastDamage.clear();
    }

    @RemoteFunction(mw.Server)
    private net_injured(playerId: number, key: number) {
        if (this._cfgIdInServer == 0) return;

        Log4Ts.log(Resource, `net_injured playerID:${playerId}, key:${key}`);
        if (!ModuleService.getModule(EnergyModuleS).isAfford(playerId, GameServiceConfig.STAMINA_COST_PET_ATTACK)) {
            Log4Ts.log(Resource, `Stamina is not enough. playerID:${playerId}`);
            return;
        }
        ModuleService.getModule(EnergyModuleS).consume(playerId, GameServiceConfig.STAMINA_COST_PET_ATTACK);

        let damage = calDamage(playerId,
            key,
            this.isBox);
        this.getRewardByAttack(playerId, damage, key);

        let allHp = GameConfig.SceneUnit.getElement(this.cfgId).HP;
        if (damage > allHp / 3) {
            damage = Math.ceil(allHp / 3);
        }

        let damageInfoIndex = this.damageArr.findIndex((item) => {
            return item.playerId == playerId;
        });
        if (damageInfoIndex == -1) {
            this.damageArr.push(new DamageRecord(playerId, damage));
        } else {
            this.damageArr[damageInfoIndex] = new DamageRecord(
                playerId,
                this.damageArr[damageInfoIndex].damage + damage,
            );
        }
        if (this.curHp <= 0) return;
        this.curHp -= damage;
        if (this.curHp <= 0) {
            // this.curHp = 0;
            this.net_dead(playerId);

            let player: mw.Player = null;

            let totalDamage = this
                .damageArr
                ?.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.damage;
                }, 0) ?? 0;
            for (let i = 0; i < this.damageArr.length; i++) {
                player = mw.Player.getPlayer(this.damageArr[i].playerId);
                if (!player) continue;
                this.checkHpStage(player.playerId, this.damageArr[i].damage / totalDamage);
                this.overGetReward(player);
            }
            Log4Ts.log(Resource, `treasure destroy playerID:${playerId}, totalDamage:${totalDamage}, curHp:${this.curHp}`);
            return;
        } else {
            let player = mw.Player.getPlayer(playerId);

            if (this.noDamageCheckTimer.has(playerId)) {
                clearTimeout(this.noDamageCheckTimer.get(playerId));
                this.noDamageCheckTimer.delete(playerId);
            }
            this.noDamageCheckTimer.set(playerId, setTimeout(() => {
                this.stopGuaSha(playerId);
            }, 2000));

            this.checkHpStage(playerId);
            this.client_injured(player, this.curHp, this._rate);
            // Log4Ts.log(Resource, `treasure injured playerID:${playerId}, curHp:${this.curHp}`);
        }
    }

    /**随机倍率 */
    private randomRate(cfgId: number): void {
        let sceneInfo = GameConfig.SceneUnit.getElement(cfgId);
        let brunsRate = sceneInfo.BrunsRate;//倍率出现概率
        if (brunsRate == null) return;
        let rates = sceneInfo.Rate;//出现概率
        let random = MathUtil.randomFloat(0, 100);
        for (let i = 0; i < brunsRate.length; i++) {
            let end = brunsRate[i + 1] || 0;
            if (random <= brunsRate[i] && random > end) {
                this._rate = rates[i];
                break;
            }
        }
    }

    private async net_dead(playerId: number) {
        await TimeUtil.delaySecond(3);
        if (this.isBigBox) {
            this.onDead.call(this.scenePointId, playerId);
        } else
            this.onDead.call(playerId);
        //设为空不会属性同步
        // this.scenePointId = "";
        this._rate = 1;

    }

    private noDamageCheckTimer: Map<number, number> = new Map();

    //----------------------------only client-----------------------------------

    /**该客户端玩家造成伤害 */
    @RemoteFunction(mw.Client)
    private client_injured(player: mw.Player, curHp: number, rate: number) {

        // if (this.attInterval) {
        //     clearTimeout(this.attInterval);
        //     this.attInterval = null;
        // }
        // this.attInterval = setTimeout(() => {
        //     this.stopGuaSha();
        // }, 2000);

        // this.getCurHpRateC(curHp);
        if (this.resObj == null || this._cfgId == 0) return;
        if (curHp <= 0) {
            ResourceUIPool.instance.recycleUI(this.resObj.gameObjectId);
        } else {
            ResourceUIPool.instance.getUI(this.resObj.gameObjectId, this._cfgId, curHp, rate);
        }
    }

    /**结算奖励 */
    @RemoteFunction(mw.Client)
    private overGetReward(player: mw.Player) {
        Event.dispatchToLocal(GlobalEnum.EventName.AttackDestroy);
    }

    //----------------------------client-----------------------------------
    private resObj: mw.GameObject = null;
    /**所有子物体 */
    private allChild: mw.GameObject[] = [];
    private isStart: boolean = false;
    /**当前坐标 */
    private _curPos: mw.Vector = undefined;

    public get curPos() {
        if (!this.pointId) return undefined;
        if (!this._curPos) {
            this._curPos = memorizePointIdToLocation(this.pointId)?.clone();
        }
        return this._curPos;
    }

    private _cfgId: number = 0;
    private cfg: ISceneUnitElement = null;

    /**上一次伤害 */
    private lastDamage: Map<number, number> = new Map();
    /**金币砖石奖励 */
    private rewardGold: Map<number, number> = new Map();
    private rewardGem: Map<number, number> = new Map();

    /**刮痧奖励金币钻石 */
    private guaShaRewardGold: Map<number, number> = new Map();
    private guaShaRewardGem: Map<number, number> = new Map();

    private getGuaShaRewardGold(playerId: number) {
        return Gtk.tryGet(this.guaShaRewardGold, playerId, 0);
    }

    private getGuaShaRewardGem(playerId: number) {
        return Gtk.tryGet(this.guaShaRewardGem, playerId, 0);
    }

    public onGuaSha: mw.Action = new mw.Action();

    /**当前坐标id */
    public pointId: number = 0;

    public get cfgId(): number {
        return this._cfgId;
    }

    public get Obj() {
        return this.resObj;
    }

    public getRewardGold(playerId: number) {
        return Gtk.tryGet(this.rewardGold, playerId, 0);
    }

    public getRewardGem(playerId: number) {
        return Gtk.tryGet(this.rewardGem, playerId, 0);
    }

    private async onHpChanged(): Promise<void> {
        // this.objState(this.curHp);
        if (this.curHp <= 0) {
            this.onGuaSha.call(false);
            this.curHp = 0;
            this.lastDamage.set(Player.localPlayer.playerId, 0);
            this._cfgId = 0;
            this.pointId = 0;
            if (this.cfg) {
                this.removeScenceResource(this.cfg.AreaID, this);
                this.cfg = null;
            }
            this.recycleResourceModel(true);
            return;
        }
        if (this.resObj == null && !this.isStart && this.cfg) {
            this.createPassiveObj();
        }
    }

    /**获取自己打的血量比 */
    public getDamageRate(playerId: number): number {
        if (this.cfg.HP === 0) return 0;
        return this
                .damageArr
                .reduce((previousValue,
                         currentValue) => {
                        return previousValue +
                            (currentValue.playerId === playerId ? currentValue.damage : 0);
                    },
                    0)
            / this.cfg.HP;
    }

    /**刮痧interval */
    /**
     * S端playerID和interval的映射
     * @type {Map<number, number>}
     * @private
     */
    private interval: Map<number, number> = new Map();

    /**开始刮痧计时 */
    public refreshGuaSha(playerId: number) {
        if (this.interval.has(playerId)) return;
        let interval = TimeUtil.setInterval(() => {
            let rate = this.getDamageRate(playerId);
            if (this.isBigBox) {
                ModuleService.getModule(ResourceModuleS).net_noticeGuaSha(this.cfgId, true);
            }

            let goldVal = Math.ceil((this.getRewardGold(playerId) * rate) / 3 - this.getGuaShaRewardGold(playerId));
            this.guaShaRewardGold.set(playerId, this.getGuaShaRewardGold(playerId) + goldVal);
            this.playReward(playerId, GlobalEnum.ResourceAttackStage.GuaSha, goldVal, 0);
            let gemVal = Math.ceil((this.getRewardGem(playerId) * rate) / 3 - this.getGuaShaRewardGem(playerId));
            this.guaShaRewardGem.set(playerId, this.getGuaShaRewardGem(playerId) + gemVal);
            this.playReward(playerId, GlobalEnum.ResourceAttackStage.GuaSha, 0, gemVal);

            // Log4Ts.log(Resource, `play guaSha playerId:${playerId}, goldVal:${goldVal}, gemVal:${gemVal}`);
        }, GlobalData.SceneResource.guaShaTime);

        this.interval.set(playerId, interval);
        return;
    }

    /**停止刮痧计时 */
    public stopGuaSha(playerId: number) {
        if (!this.interval.has(playerId)) return;
        TimeUtil.clearInterval(this.interval.get(playerId));
        this.interval.delete(playerId);
    }

    /**
     * 通过血量判断攻击阶段.
     * @param {number} playerId
     * @param ratio 倍率.
     */
    private checkHpStage(playerId: number, ratio: number = 1) {
        if (this._cfgId == 0 || !this.cfg) return;
        this.refreshGuaSha(playerId);

        let random = MathUtil.randomInt(0, 100);
        let critRate = GlobalData.SceneResource.normalWeight;
        if (random < critRate) {
            this.playProcessEffect();
        }

        if (this.curHp <= 0) {
            this.stopGuaSha(playerId);

            this.playCritEffectByLevel();

            let criticalRate = GlobalData.SceneResource.critWeight(playerId);
            const isCritical = MathUtil.randomInt(0, 100) <= criticalRate;
            if (isCritical) {
                this.playCritEffectByLast(Player.getPlayer(playerId));
            }
            const userId = Player.getPlayer(playerId).userId;
            Log4Ts.log(
                ResourceScript, 
                "checkHpStage" +
                " userId:" + userId +
                ` criticalRate:${criticalRate}% #resource` 
            );
            this.playReward(
                playerId,
                GlobalEnum.ResourceAttackStage.Destroy,
                (this.getRewardGold(playerId) - this.getGuaShaRewardGold(playerId)) * ratio,
                (this.getRewardGem(playerId) - this.getGuaShaRewardGem(playerId)) * ratio,
                isCritical);

            ModuleService.getModule(AchievementModuleS)
                .broadcastAchievement_destroy(playerId, this.resourceType);
            this.guaShaRewardGem.set(playerId, 0);
            this.guaShaRewardGold.set(playerId, 0);
        }
    }

    /**
     * 奖励掉落物
     * @param playerId 指定玩家.
     * @param state 攻击阶段
     * @param goldVal 金币价值
     * @param gemVal 钻石价值
     * @param isCritical 是否暴击.
     */
    private playReward(
        playerId: number,
        state: GlobalEnum.ResourceAttackStage,
        goldVal: number,
        gemVal: number,
        isCritical: boolean = false) {
        let rewardArr = this.getDropCountByStage(state);
        goldVal = Math.ceil(goldVal);
        gemVal = Math.ceil(gemVal);
        let criticalRatio = state === GlobalEnum.ResourceAttackStage.Destroy && isCritical ?
            this.cfg.Critreward : 1;
        let goldCount = Math.min(Math.ceil(rewardArr[0]), goldVal);
        let gemCount = Math.min(Math.ceil(rewardArr[1]), gemVal);
        let curPos = this.curPos.clone();
        if (Math.abs(curPos.x - GameConfig.DropPoint.getElement(this.pointId).areaPoints.x) > 1 ||
            Math.abs(curPos.y - GameConfig.DropPoint.getElement(this.pointId).areaPoints.y) > 1) {
            Log4Ts.error(memorizePointIdToLocation, `wrong point when get.`,
                `point id: ${this.pointId}`,
                `point location: ${GameConfig.DropPoint.getElement(this.pointId).areaPoints}`,
                `come down location: ${curPos}`);
            curPos = comeDown(this.pointId);
        }
        const userId = Player.getPlayer(playerId).userId;
        Log4Ts.log(
            ResourceScript, 
            "playReward" +
            " userId:" + userId +
            ` goldVal:${goldVal} gemVal:${gemVal} isCritical:${isCritical} criticalRatio:${criticalRatio} finalGoldValue:${goldVal * criticalRatio} finalGemValue:${gemVal * criticalRatio} #resource` 
        );
        if (goldCount > 0) {
            ModuleService
                .getModule(DropManagerS)
                .createDrop(
                    playerId,
                    curPos,
                    this.judgeGold(),
                    goldVal * criticalRatio,
                    goldCount,
                    this.isBigBox,
                    { areaId: this.cfg.AreaID, resType: this.resourceType }
                );
        }
        if (gemCount > 0) {
            ModuleService
                .getModule(DropManagerS)
                .createDrop(
                    playerId,
                    curPos,
                    GlobalEnum.CoinType.Diamond,
                    gemVal * criticalRatio,
                    gemCount,
                    this.isBigBox,
                    { areaId: this.cfg.AreaID, resType: this.resourceType }
                );
        }
        // Log4Ts.log(Resource,
        //     `playReward playerId:${playerId}`,
        //     `scenePointId: ${this.scenePointId}`,
        //     `treasure Pos:${this.curPos}`,
        //     `state:${state}`,
        //     `goldVal:${goldVal}`,
        //     `gemVal:${gemVal}`,
        //     `goldCount:${goldCount}`,
        //     `gemCount:${gemCount}`);
    }

    /**判断几世界的金币 */
    private judgeGold(): GlobalEnum.CoinType {
        let coinType = GlobalEnum.CoinType;

        let goldType = coinType.FirstWorldGold;

        if (this.cfg.AreaID < 2000) {
            goldType = coinType.FirstWorldGold;
        } else if (this.cfg.AreaID < 3000) {
            goldType = coinType.SecondWorldGold;
        } else if (this.cfg.AreaID < 4000) {
            goldType = coinType.ThirdWorldGold;
        }
        return goldType;
    }

    /**
     * 根据攻击阶段、类型返回掉落个数
     */
    private getDropCountByStage(state: GlobalEnum.ResourceAttackStage): [number, number] {
        let cfgID: number = 0;
        switch (this.resourceType) {
            case 1:
                cfgID = 7;
                break;
            case 2:
                cfgID = 8;
                break;
            case 3:
                cfgID = 1;
                break;
            case 4:
                cfgID = 2;
                break;
            case 5:
                cfgID = 3;
                break;
            case 6:
                cfgID = 4;
                break;
            case 7:
                cfgID = 5;
                break;
            case 8:
                cfgID = 6;
                break;
            default:
                cfgID = 9;
                break;
        }

        let cfg = GameConfig.Coindown.getElement(cfgID);

        let allRate: number = 1;
        if (this.rate <= 2) {
            allRate = cfg.Stagetimes[0];
        } else if (this.rate <= 3) {
            allRate = cfg.Stagetimes[1];
        } else if (this.rate <= 4) {
            allRate = cfg.Stagetimes[2];
        } else if (this.rate <= 5) {
            allRate = cfg.Stagetimes[3];
        }

        let goldCount: number = 0;
        let gemCount: number = 0;
        switch (state) {
            case GlobalEnum.ResourceAttackStage.GuaSha:
                goldCount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]);
                gemCount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]);
                break;
            case GlobalEnum.ResourceAttackStage.OneThird:
                goldCount = cfg.Stepcoin;
                gemCount = cfg.Stepdiamond;
                break;
            case GlobalEnum.ResourceAttackStage.Destroy:
                goldCount = cfg.Lastcoin;
                gemCount = cfg.Lastdaimond;
                break;
            default:
                break;
        }
        goldCount *= allRate;
        gemCount *= allRate;
        return [goldCount, gemCount];
    }

    private onSceneChanged() {
        Log4Ts.log(Resource, `onSceneChanged scenePointId:${this.scenePointId},${this.guid}`);
        if (this.scenePointId == "") return;

        let arr = this.scenePointId.split("_");
        this._cfgId = Number(arr[0]);
        this.pointId = Number(arr[1]);
        this._rate = Number(arr[2].slice(0, -1));

        this.onGuaSha.clear();
        this.cfg = GameConfig.SceneUnit.getElement(this._cfgId);
        this._curPos = undefined;

        //先存起来，等玩家进入范围后，再遍历 一点点得到出现
        this.addScenceResource(this.cfg.AreaID);
        if (this.isBigBox && GlobalData.Notice.bigBoxTips.includes(this.cfgId)) {
            this.onGuaSha.add((isLife: boolean) => {
                Event.dispatchToLocal(GlobalEnum.EventName.GuaShaNotice, this.cfgId, isLife);
            });
        }

        //一二世界  默认显示区域，与玩家当前位置进行判断 是否显示
        const ignoreAreaArr = GlobalData.SceneResource.ignoreAreaArr;
        let curAreaId = AreaDivideManager.instance.CurAreaId;
        if (ignoreAreaArr.includes(this.cfg.AreaID) && ignoreAreaArr.includes(curAreaId)) {
            this.createDefaultObj();
            return;
        }
        this.createObjANDStart();
    }

    /**创建默认资源*/
    public async createDefaultObj(): Promise<boolean> {
        if (!this.cfg || this.isStart || this.resObj != null || this.curHp <= 0) return false;
        this.isStart = true;
        this.resObj = await Resource.instance.getResource(this.cfgId);
        if(!this.resObj) {
            Log4Ts.warn(Resource, `createDefaultObj failed cfgId:${this.cfgId}, ${this.pointId},${this.rate}`);
            return false;
        }
        if (!this.isBigBox) {
            let randomZ = MathUtil.randomInt(0, 360);
            this.resObj.worldTransform.rotation = new mw.Rotation(0, 0, randomZ);
        } else
            this.resObj.worldTransform.position = this.curPos.clone();
        this.clientStart();
        this.endTween?.stop();
        this.order = 0;
        this.tweenInit();
        this.switchVisible(true);

        return true;
    }

    /**创建正常区域资源 */
    public async createObjANDStart(): Promise<boolean> {
        if (this.cfg?.AreaID != AreaDivideManager.instance.CurAreaId) {
            return false;
        }
        return await this.createDefaultObj();
    }

    /**被动显示的资源 */
    public createPassiveObj(): void {
        let curAreaId = AreaDivideManager.instance.CurAreaId;
        if (this.cfg.AreaID == curAreaId || this.cfg.AreaID == curAreaId - 1 || this.cfg.AreaID == curAreaId + 1) {
            this.createDefaultObj();
        }
    }

    private order: number = 0;
    private endTween: mw.Tween<{ z: number }> = null;

    private tweenInit(): void {
        if (utils.frameCount < 20) {
            this.tweenEnd();
            return;
        }
        const endInfos = GlobalData.ResourceAni.dropTween;
        const bezier = GlobalData.ResourceAni.dropTweenBezier[this.order];
        const time = GlobalData.ResourceAni.dropTweenTime[this.order];
        let start = endInfos[this.order];
        let end = endInfos[this.order + 1];
        this.endTween = new mw.Tween({z: start}).to({z: end}, time).onUpdate((obj) => {
            this.resObj.worldTransform.position = new mw.Vector(this.curPos.x, this.curPos.y, this.curPos.z + obj.z);
        }).onComplete(() => {
            this.order++;
            if (this.order >= endInfos.length - 1) {
                this.tweenEnd();
                return;
            }
            this.tweenInit();
        }).start().easing(cubicBezier(bezier[0], bezier[1], bezier[2], bezier[3]));
    }

    private tweenEnd(): void {
        this.order = 0;
        this.endTween = null;
        this.resObj.worldTransform.position = this.curPos.clone();
        this.switchCollider(true);
        setTimeout(() => {
            if (this.resObj == null) return;
            let dis = mw.Vector.squaredDistance(this.curPos, this.Obj.worldTransform.position);
            if (dis > 90000) {
                this.Obj.worldTransform.position = this.curPos.clone();
            }
        }, 2000);
    }

    /**攻击
     * @param playerId 玩家id
     * @param key 宠物key
     */
    public injured(playerId: number, key: number): boolean {
        if (this.curHp <= 0) return true;

        if (playerId === Player.localPlayer.playerId) {
            this.net_injured(playerId, key);
        }
        SoundManager.instance.playAtkSound(
            GlobalData.Music.resourceDestroy,
            this.curPos);

        return false;
    }

    /**显示模型状态 */
    private objState(curHp: number) {
        if (!this.cfg && this._cfgId)
            this.cfg = GameConfig.SceneUnit.getElement(this._cfgId);
        if (!this.cfg) return;

        if (curHp < this.cfg.HP && curHp > this.cfg.HP / 3) {
            this.resObj.getChildByName("1")?.setVisibility(mw.PropertyStatus.Off);
        }
        if (curHp <= this.cfg.HP / 3) {
            this.resObj.getChildByName("1")?.setVisibility(mw.PropertyStatus.Off);
            this.resObj.getChildByName("2")?.setVisibility(mw.PropertyStatus.Off);
        }
        if (curHp <= 0) {
            this.resObj.getChildByName("2")?.setVisibility(mw.PropertyStatus.Off);
        }
    }

    protected clientStart(): void {
        //if (this.isStart) return;
        this.allChild = this.resObj.getChildren();
        this.switchCollider(false);
        this.switchVisible(false);
        this.isStart = true;
        this.playEffect();
    }

    /**开关子物体所有碰撞 */
    private switchCollider(isOpen: boolean) {
        if (this.allChild.length == 0) {
            this.allChild = this.resObj.getChildren();
        }
        for (let i = 0; i < this.allChild.length; i++) {
            const element = this.allChild[i];
            element.setCollision(isOpen ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        }
    }

    /**开关子物体所有显影 */
    private switchVisible(isOpen: boolean) {
        if (this.allChild.length == 0) {
            this.allChild = this.resObj?.getChildren();
        }
        for (let i = 0; i < this.allChild.length; i++) {
            const element = this.allChild[i];
            element.setVisibility(isOpen ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        }
    }

    /**判断资源类型 C&S */
    public get resourceType(): number {
        return this.cfg ? this.cfg.resType : 3;
    }

    /**根据攻击力计算总价值 */
    private getRewardByAttack(playerId: number, attack: number, key: number): number {
        if (Gtk.tryGet(this.lastDamage, playerId, 0) >= attack) return;
        this.lastDamage.set(playerId, attack);
        const player = Player.getPlayer(playerId);
        const userId = player?.userId ?? "";
        //指数
        let pow = 0;

        if (this.cfg.AreaID < 2000) {
            pow = 0.28;
        } else if (this.cfg.AreaID > 2000) {
            pow = 0.23;
        }

        let temp = utils.GetRandomNum(0, 10) % 2 == 0 ? 1 : -1;
        Log4Ts.log(EnchantBuff, "getRewardByAttack" +
            " userId:" + userId +
            " getPetBuff key:" + key +
            " petBuff:" + JSON.stringify(EnchantBuff.getPetBuff(playerId, key)));
        this.cfg.Type.forEach((item, index) => {
            if (item != GlobalEnum.DropResourceType.Diamond) {
                let temp2 = this.cfg.WaveValue[index] + Math.log(attack);
                let random = utils.GetRandomNum(0, temp2);
                if (this.rate == 1) {
                    const goldBuff = 1 + EnchantBuff.getPetBuff(playerId, key).goldAdd / 100;
                    const worldGoldBuff = EnchantBuff.getWorldGoldBuff(playerId, key, this.judgeGold());
                    const rewardGold =
                        (50 * this.cfg.Iconreward * Math.pow(attack, pow) +
                            random * temp) *
                        this.rate *
                        goldBuff *
                        worldGoldBuff;
                    this.rewardGold.set(playerId, rewardGold);

                    Log4Ts.log(
                        ResourceScript, 
                        "getRewardByAttack" +
                        " userId:" + userId +
                        ` finalRewardGold:${rewardGold}` +
                        ` goldBuff:${goldBuff}` +
                        ` worldGoldBuff:${worldGoldBuff}` +
                        ` judgeGold:${this.judgeGold()}` +
                        ` cfg.Iconreward:${this.cfg.Iconreward}` +
                        ` rate:${this.rate}` +
                        ` attack:${attack}` +
                        ` pow:${pow}` +
                        ` random:${random * temp}` +
                        ` SceneUnitID:${this.cfg.ID}` +
                        ` areaId:${this.cfg.AreaID} #resource`,
                    );
                } else {
                    const goldBuff = 1 + EnchantBuff.getPetBuff(playerId, key).goldAdd / 100;
                    const rateGoldBuff = 1 + EnchantBuff.getPetBuff(playerId, key).rateGoldAdd / 100;
                    const worldGoldBuff = EnchantBuff.getWorldGoldBuff(playerId, key, this.judgeGold());
                    const rewardGold =
                        (50 * this.cfg.Iconreward * Math.pow(attack, pow) +
                            random * temp) *
                        this.rate *
                        goldBuff *
                        rateGoldBuff *
                        worldGoldBuff;
                    this.rewardGold.set(playerId, rewardGold);

                    Log4Ts.log(
                        ResourceScript,
                        "getRewardByAttack" +
                        " userId:" + userId +
                        ` finalRewardGold:${rewardGold}` +
                        ` goldBuff:${goldBuff}` +
                        ` worldGoldBuff:${worldGoldBuff}` +
                        ` judgeGold:${this.judgeGold()}` +
                        ` cfg.Iconreward:${this.cfg.Iconreward}` +
                        ` rate:${this.rate}` +
                        ` attack:${attack}` +
                        ` pow:${pow}` +
                        ` random:${random * temp}` +
                        ` SceneUnitID:${this.cfg.ID}` +
                        ` areaId:${this.cfg.AreaID} #resource`,
                    );
                }

                this.rewardGold.set(playerId, Number(this.getRewardGold(playerId).toFixed(1)));
            } else {
                const diamondBuff = (1 + EnchantBuff.getPetBuff(playerId, key).diamondAdd / 100); // 乘算
                const diamondReward = this.cfg.DiamondReward * this.rate * diamondBuff;
                Log4Ts.log(ResourceScript,
                    "getRewardByAttack" +
                    " userId:" + userId +
                    ` finalRewardDiamond:${diamondReward}` +
                    ` diamondBuff:${diamondBuff}` +
                    ` cfg.DiamondReward:${this.cfg.DiamondReward}` +
                    ` rate:${this.rate}` +
                    ` moreDiamond:${GlobalData.LevelUp.moreDiamond(playerId)}` +
                    ` SceneUnitID:${this.cfg.ID}` +
                    ` areaId:${this.cfg.AreaID} #resource`,
                );
                this.rewardGem.set(playerId, Number(diamondReward.toFixed(1)));
            }
        });
        if (this.resourceType == GlobalEnum.DestructorType.Gold4) {
            this.rewardGold.set(playerId, this.getRewardGold(playerId) * (1 + EnchantBuff.getPetBuff(playerId, key).fourGoldAdd / 100));
            this.rewardGem.set(playerId, this.getRewardGem(playerId) * (1 + EnchantBuff.getPetBuff(playerId, key).fourGoldAdd / 100));
        }
    }

    /**播放资源倍率特效 */
    private playEffect() {
        if (this._rate == 1) return;

        let cfg: IEffectElement = null;
        if (this.resourceType == 1 || this.resourceType == 2) {
            cfg = GameConfig.Effect.getElement(3);
        } else {
            cfg = GameConfig.Effect.getElement(2);
        }
        this.rateEff = GeneralManager.rpcPlayEffectAtLocation(cfg.EffectID, this.curPos, cfg.EffectTime, cfg.EffectRotate.toRotation(), cfg.EffectLarge);

    }

    /**击打过程中特效 */
    @RemoteFunction(mw.Client)
    private playProcessEffect() {
        let cfg = GameConfig.Effect.getElement(1);
        GeneralManager.rpcPlayEffectOnGameObject(cfg.EffectID, this.resObj, cfg.EffectTime, cfg.EffectLocation, cfg.EffectRotate.toRotation(), cfg.EffectLarge);
    }

    /**阶段特效 */
    @RemoteFunction(mw.Client)
    private playCritEffectByLevel() {
        let cfg = GameConfig.Effect.getElement(13);
        GeneralManager.rpcPlayEffectOnGameObject(cfg.EffectID, this.resObj, cfg.EffectTime, cfg.EffectLocation, cfg.EffectRotate.toRotation(), cfg.EffectLarge);
        if (this.resourceType > 2) {
            cfg = GameConfig.Effect.getElement(9);
            GeneralManager.rpcPlayEffectOnGameObject(cfg.EffectID, this.resObj, cfg.EffectTime, cfg.EffectLocation, cfg.EffectRotate.toRotation(), cfg.EffectLarge);
        }
    }

    /**最后一击暴击特效 */
    @RemoteFunction(mw.Client)
    private playCritEffectByLast(player: Player) {

        BonusUI.instance.showBonusUI(this);
        let cfg = GameConfig.Effect.getElement(10);
        GeneralManager.rpcPlayEffectAtLocation(cfg.EffectID, this.resObj.worldTransform.position, cfg.EffectTime, cfg.EffectRotate.toRotation(), cfg.EffectLarge);

    }

    /**添加场景资源 */
    private addScenceResource(areaID: number) {
        if (areaID == 0) return;
        let arr = SceneResourceMap.get(areaID);
        if (!arr) {
            arr = [];
            SceneResourceMap.set(areaID, arr);
        }
        if (arr.includes(this)) {
            return;
        }
        arr.push(this);
    }

    /**移除场景资源 */
    private removeScenceResource(areaID: number, resourceScript: ResourceScript) {
        const resources = SceneResourceMap.get(areaID);
        const leftResources = resources.filter(item => item !== resourceScript);
        SceneResourceMap.set(areaID, leftResources);
    }

    /**回收破坏物模型 */
    public async recycleResourceModel(isAwait: boolean = false) {
        if (this.endTween) {
            console.error("lwj tween is playing");
            this.endTween.stop();
            this.endTween = null;
        }
        if (this.resObj) {
            this.switchVisible(false);
            this.switchCollider(false);
            this.isStart = false;
            if (isAwait) {
                // await TimeUtil.delaySecond(3);
                Resource.instance.returnResource(this.resObj);
            } else
                Resource.instance.returnResource(this.resObj);
            this.resObj = null;
        }

        if (this.rateEff) {
            EffectService.stop(this.rateEff);
            this.rateEff = null;
        }
    }

    //----------------------------life cycle-----------------------------------

    protected onStart(): void {
        //if (SystemUtil.isClient()) this.clientStart();
        if (SystemUtil.isClient()) {
            Log4Ts.log(Resource, `onStartClient scenePointId:${this.scenePointId},${this.guid}`);
        } else {
            Log4Ts.log(Resource, `onStartServer scenePointId:${this.scenePointId},${this.guid}`);
        }
    }

    protected onDestroy(): void {

    }

    protected onUpdate(dt: number): void {

    }

}

export function calDamage(playerId: number,
                          key: number,
                          isBox: boolean): number {
    let upgrade = GlobalData.LevelUp.petDamage(playerId);

    let petData = ModuleService.getModule(PetBagModuleS).getPet(playerId, key);
    if (!petData) {
        Log4Ts.error(ResourceScript, `pet not exist. playerId:${playerId}, key:${key}`);
        return 0;
    }
    let damage = petData.p.a
        * upgrade
        * (1 + EnchantBuff.getPetBuff(playerId, key).damageAdd / 100);

    if (isNaN(damage)) return 0;

    damage *=
        GlobalData.Buff.damageBuff(playerId) *
        (1 + (isBox ? EnchantBuff.getPetBuff(playerId, key).boxDamageAdd / 100 : 0)) *
        EnchantBuff.getTeamDamageAddBuff(playerId, key);
    const userId = Player.getPlayer(playerId)?.userId ?? "";
    Log4Ts.log(
        ResourceScript,
        "calDamage" +
        " userId:" + userId +
        " damage:" + damage +
        " petKey:" + key +
        " atk:" + petData.p.a +
        " upgrade:" + upgrade +
        " damageAddBuff:" +
        (1 + EnchantBuff.getPetBuff(playerId, key).damageAdd / 100) +
        " GlobalData.Buff.damageBuff:" +
        GlobalData.Buff.damageBuff(playerId) +
        " isBox:" +
        isBox +
        " boxDamageAdd:" +
        (1 + EnchantBuff.getPetBuff(playerId, key).boxDamageAdd / 100) +
        " teamDamageAddBuff:" +
        EnchantBuff.getTeamDamageAddBuff(playerId, key) +
        ' #resource'
    );
    return damage;
}