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
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { DropManagerS } from "./DropResouce";
import { PetSimulatorPlayerModuleData } from "../Player/PlayerModuleData";
import { PetBagModuleS } from "../PetBag/PetBagModuleS";
import ModuleService = mwext.ModuleService;
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Gtk from "../../util/GToolkit";
import AchievementModuleS from "../AchievementModule/AchievementModuleS";
import { memorizePointIdToLocation, ResourceModuleS } from "./ResourceModule";
import { EnergyModuleS } from "../Energy/EnergyModule";
import GameServiceConfig from "../../const/GameServiceConfig";
import Enumerable from "linq";

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
        let res = await SpawnManager.modifyPoolAsyncSpawn(info.Guid, GameObjPoolSourceType.Prefab);
        if (info.meshArr && info.meshArr.length > 0) {

            info.meshArr.forEach((item, index) => {
                let name = index + 1;
                let obj = res.getChildByName(name.toString());
                if (obj) {
                    let mesh = obj as mw.Model;
                    mesh.setMaterial(item);
                } else {
                    console.error(`lwj 未找到资源cfg${cfgId}的indedx${index}}`);
                }
            });
        }
        return res;
    }

    public returnResource(res: mw.GameObject) {
        GameObjPool.despawn(res);
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
    private scenePointId: string = "";

    public get isBigBox(): boolean {
        return (this.cfg?.resType > 8) ?? false;
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
        this.scenePointId = cfgId + "_" + pointId + "_" + this._rate;
        let unitInfo = GameConfig.SceneUnit.getElement(cfgId);
        this.curHp = unitInfo.HP;
        this.cfg = unitInfo;
        this.onDead.clear();

        this._cfgIdInServer = cfgId;
    }

    @RemoteFunction(mw.Server)
    private net_injured(playerID: number, key: number) {
        Log4Ts.log(Resource, `net_injured playerID:${playerID}, key:${key}`);
        if (!ModuleService.getModule(EnergyModuleS).isAfford(playerID, GameServiceConfig.STAMINA_COST_PET_ATTACK)) {
            Log4Ts.log(Resource, `Stamina is not enough. playerID:${playerID}`);
            return;
        }
        ModuleService.getModule(EnergyModuleS).consume(playerID, GameServiceConfig.STAMINA_COST_PET_ATTACK);
        //不用这个damage了，自己算
        //GlobalData.LevelUp.petDamage 去存档里取
        //力量对应升级表的id：3
        // let petDamage = GameConfig.Upgrade.getElement(3)
        //         .Upgradenum[DataCenterS.getData(playerID, PetSimulatorPlayerModuleData).getLevelData(3) ]
        //     ?? 1;
        //在存档里是下标从0开始
        let level = DataCenterS.getData(playerID, PetSimulatorPlayerModuleData).getLevelData(2);
        //在表里是下标从1开始
        let info = GameConfig.Upgrade.getElement(3);
        let upgrade = info.Upgradenum[level - 1];
        if (upgrade == null) upgrade = 0;
        let petDamage = upgrade + 1;
        // damage = this.attackDamage * GlobalData.LevelUp.petDamage * (1 + EnchantBuff.getPetBuff(this.key).damageAdd / 100);
        //this.attackDamage 得取对应的宠物
        //校验一下key在不在背包里
        let res = ModuleService.getModule(PetBagModuleS).getPet(playerID, key);
        if (!res) {
            Log4Ts.error(ResourceScript, `pet not exist. playerID:${playerID}, key:${key}`);
            return;
        }
        let damage = res.p.a * petDamage * (1 + EnchantBuff.getPetBuff(playerID, key).damageAdd / 100);
        if (isNaN(damage))
            damage = 0;
        if (this._cfgIdInServer == 0) return;
        if (this.isBigBox) {
            damage *= GlobalData.Buff.damageBuff(playerID) * (1 + EnchantBuff.getPetBuff(playerID, key).boxDamageAdd / 100);
        } else
            damage *= GlobalData.Buff.damageBuff(playerID);
        this.getRewardByAttack(playerID, damage, key);

        let allHp = GameConfig.SceneUnit.getElement(this.cfgId).HP;
        if (damage > allHp / 3) {
            damage = allHp / 3;
        }
        let rateHp = allHp * 2 / 3 + damage * GlobalData.SceneResource.critRate(playerID);
        if (this.curHp <= rateHp && rateHp < allHp && this.curHp > allHp * 2 / 3) {
            damage = allHp * 2 / 3 + damage * GlobalData.SceneResource.critRate(playerID) - allHp * 2 / 3;
        }
        //------------------------

        let damageInfoIndex = this.damageArr.findIndex((item) => {
            return item.playerId == playerID;
        });
        if (damageInfoIndex == -1) {
            this.damageArr.push(new DamageRecord(playerID, damage));
        } else {
            this.damageArr[damageInfoIndex] = new DamageRecord(
                playerID,
                this.damageArr[damageInfoIndex].damage + damage,
            );
        }
        if (this.curHp <= 0) return;
        this.curHp -= damage;
        if (this.curHp <= 0) {
            // this.curHp = 0;
            this.net_dead(playerID);

            let player: mw.Player = null;

            let totalDamage = this
                .damageArr
                ?.reduce((previousValue, currentValue) => {
                    return previousValue + currentValue.damage;
                }, 0) ?? 0;
            for (let i = 0; i < this.damageArr.length; i++) {
                player = mw.Player.getPlayer(this.damageArr[i].playerId);
                this.checkHpStage(player.playerId, this.damageArr[i].damage / totalDamage);
                this.overGetReward(player);
            }
            Log4Ts.log(Resource, `treasure destroy playerID:${playerID}, totalDamage:${totalDamage}, curHp:${this.curHp}`);
            return;
        } else {
            let player = mw.Player.getPlayer(playerID);

            if (this.noDamageCheckTimer.has(playerID)) {
                clearTimeout(this.noDamageCheckTimer.get(playerID));
                this.noDamageCheckTimer.delete(playerID);
            }
            this.noDamageCheckTimer.set(playerID, setTimeout(() => {
                this.stopGuaSha(playerID);
            }, 2000));

            this.checkHpStage(playerID);
            this.client_injured(player, this.curHp, this._rate);
            Log4Ts.log(Resource, `treasure injured playerID:${playerID}, curHp:${this.curHp}`);
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
        this.scenePointId = "";
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

    /**是否暴击 */
    private isCrit: boolean = false;
    /**上一次伤害 */
    private lastDamage: Map<number, number> = new Map;
    /**金币砖石奖励 */
    private rewardGold: number = 0;
    private rewardGem: number = 0;

    /**刮痧奖励金币钻石 */
    private guaShaRewardGold: number = 0;
    private guaShaRewardGem: number = 0;

    public onGuaSha: mw.Action = new mw.Action();

    /**当前坐标id */
    public pointId: number = 0;

    public get cfgId(): number {
        return this._cfgId;
    }

    public get Obj() {
        return this.resObj;
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

            let goldVal = Math.ceil((this.rewardGold * rate) / 3 - this.guaShaRewardGold);
            this.guaShaRewardGold += goldVal;
            this.playReward(playerId, GlobalEnum.ResourceAttackStage.GuaSha, goldVal, 0);
            let gemVal = Math.ceil((this.rewardGem * rate) / 3 - this.guaShaRewardGem);
            this.guaShaRewardGem += gemVal;
            this.playReward(playerId, GlobalEnum.ResourceAttackStage.GuaSha, 0, gemVal);

            Log4Ts.log(Resource, `play guaSha playerId:${playerId}, goldVal:${goldVal}, gemVal:${gemVal}`);
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

            this.playCritEffectByLast();
            this.playReward(
                playerId,
                GlobalEnum.ResourceAttackStage.Destroy,
                (this.rewardGold - this.guaShaRewardGold) * ratio,
                (this.rewardGem - this.guaShaRewardGem) * ratio);
            this.stopGuaSha(playerId);
            ModuleService.getModule(AchievementModuleS)
                .broadcastAchievement_destroy(playerId, this.resourceType);
            this.guaShaRewardGem = 0;
            this.guaShaRewardGold = 0;
        }
    }

    /**
     * 奖励掉落物
     * @param playerId 指定玩家.
     * @param state 攻击阶段
     * @param goldVal 金币价值
     * @param gemVal 钻石价值
     */
    private playReward(
        playerId: number,
        state: GlobalEnum.ResourceAttackStage,
        goldVal: number,
        gemVal: number) {
        let rewardArr = this.getDropCountByStage(state);
        goldVal = Math.ceil(goldVal);
        gemVal = Math.ceil(gemVal);
        let goldCount = Math.min(Math.ceil(rewardArr[0]), goldVal);
        let gemCount = Math.min(Math.ceil(rewardArr[1]), gemVal);
        if (goldCount > 0) {
            ModuleService
                .getModule(DropManagerS)
                .createDrop(
                    playerId,
                    this.curPos,
                    this.judgeGold(),
                    goldVal,
                    goldCount,
                    this.isBigBox);
        }
        if (gemCount > 0) {
            ModuleService
                .getModule(DropManagerS)
                .createDrop(
                    playerId,
                    this.curPos,
                    GlobalEnum.CoinType.Diamond,
                    gemVal,
                    gemCount,
                    this.isBigBox);
        }
        Log4Ts.log(Resource, `playReward playerId:${playerId}, scenePointId: ${this.scenePointId}, treasure Pos:${this.curPos}, state:${state}, goldVal:${goldVal}, gemVal:${gemVal}, goldCount:${goldCount}, gemCount:${gemCount}`);
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
    private getDropCountByStage(
        state: GlobalEnum.ResourceAttackStage): number[] {
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
        if (this.rate <= 3) {
            allRate = cfg.Stagetimes[0];
        } else if (this.rate <= 5) {
            allRate = cfg.Stagetimes[1];
        } else if (this.rate <= 25) {
            allRate = cfg.Stagetimes[2];
        } else if (this.rate <= 100) {
            allRate = cfg.Stagetimes[3];
        }

        let goldcount: number = 0;
        let gemcount: number = 0;
        switch (state) {
            case GlobalEnum.ResourceAttackStage.GuaSha:
                if (cfgID == 7 || cfgID == 8)
                    gemcount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]) * allRate;
                else if (cfgID < 7)
                    goldcount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]) * allRate;
                else if (cfgID == 9) {
                    goldcount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]) * allRate;
                    gemcount = utils.GetRandomNum(cfg.Lowattacknum[0], cfg.Lowattacknum[1]) * allRate;
                }
                break;
            case GlobalEnum.ResourceAttackStage.OneThird:
                goldcount = cfg.Stepcoin * allRate;
                gemcount = cfg.Stepdiamond * allRate;
                break;
            case GlobalEnum.ResourceAttackStage.Destroy:
                if (this.isCrit) {
                    goldcount = cfg.Lastcoin * cfg.Crittimes * allRate;
                    gemcount = cfg.Lastdaimond * cfg.Crittimes * allRate;
                } else {
                    goldcount = cfg.Lastcoin * allRate;
                    gemcount = cfg.Lastdaimond * allRate;
                }
                break;
            default:
                break;
        }
        return [goldcount, gemcount];
    }

    private onSceneChanged() {
        if (this.scenePointId == "") return;

        let arr = this.scenePointId.split("_");
        this._cfgId = Number(arr[0]);
        this.pointId = Number(arr[1]);
        this._rate = Number(arr[2]);
        this.guaShaRewardGem = 0;
        this.guaShaRewardGold = 0;
        this.onGuaSha.clear();
        this.cfg = GameConfig.SceneUnit.getElement(this._cfgId);

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
        if (!this.cfg || this.isStart || this.resObj != null) {
            return false;
        }
        this.isStart = true;
        this.resObj = await Resource.instance.getResource(this.cfgId);

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
     * @param damage 伤害
     * @param key 宠物key
     */
    public injured(playerId: number, damage: number, key: number): boolean {
        if (this.curHp <= 0) return true;
        if (isNaN(damage))
            damage = 0;
        if (this.cfgId == 0) return true;
        if (this.isBigBox) {
            damage *= GlobalData.Buff.damageBuff(playerId) * (1 + EnchantBuff.getPetBuff(playerId, key).boxDamageAdd / 100);
        } else
            damage *= GlobalData.Buff.damageBuff(playerId);
        this.getRewardByAttack(playerId, damage, key);

        let allHp = GameConfig.SceneUnit.getElement(this.cfgId).HP;
        if (damage > allHp / 3) {
            damage = allHp / 3;
        }
        let rateHp = allHp * 2 / 3 + damage * GlobalData.SceneResource.critRate(playerId);
        if (this.curHp <= rateHp && rateHp < allHp && this.curHp > allHp * 2 / 3) {
            damage = allHp * 2 / 3 + damage * GlobalData.SceneResource.critRate(playerId) - allHp * 2 / 3;
        }
        if (playerId === Player.localPlayer.playerId) {
            this.net_injured(playerId, key);
        }
        SoundManager.instance.playAtkSound(
            GlobalData.Music.resourceDestroy,
            this.curPos);

        // if (this.curHp - damage <= 0) return true;
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
        Player.asyncGetLocalPlayer().then(player => {
            this.critByCreate(player.playerId);
        });
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
        return this.cfg ? 3 : this.cfg.resType;
    }

    /**生成是否暴击 */
    private critByCreate(playerId: number) {
        let random = MathUtil.randomInt(0, 100);
        let critRate = GlobalData.SceneResource.critWeight(playerId);
        if (random <= critRate) {
            this.isCrit = true;
        } else {
            this.isCrit = false;
        }
    }

    /**根据攻击力计算总价值 */
    private getRewardByAttack(playerId: number, attack: number, key: number): number {
        if (Gtk.tryGet(this.lastDamage, playerId, 0) >= attack) return;
        this.lastDamage.set(playerId, attack);
        //需要根据playerId 设置是否暴击，如果创建过，就不再创建
        let isCrit = GlobalData.SceneResource.isCrit(playerId);
        //指数
        let pow = 0;

        if (this.cfg.AreaID < 2000) {
            pow = 0.28;
        } else if (this.cfg.AreaID > 2000) {
            pow = 0.23;
        }

        let temp = utils.GetRandomNum(0, 10) % 2 == 0 ? 1 : -1;

        this.cfg.Type.forEach((item, index) => {

            let crit: number = 0;

            if (isCrit) {
                crit = this.cfg.Critreward;
            } else {
                crit = 1;
            }

            if (item != 2) {
                let temp2 = this.cfg.WaveValue[index] + Math.log(attack);
                let random = utils.GetRandomNum(0, temp2);

                if (this.rate == 1) {
                    this.rewardGold = (50 * this.cfg.Iconreward * Math.pow(attack, pow) + (random) * temp) * this.rate * crit
                        * (1 + EnchantBuff.getPetBuff(playerId, key).goldAdd / 100);
                } else {
                    this.rewardGold = (50 * this.cfg.Iconreward * Math.pow(attack, pow) + (random) * temp) * this.rate * crit
                        * (1 + EnchantBuff.getPetBuff(playerId, key).goldAdd / 100)
                        * (1 + EnchantBuff.getPetBuff(playerId, key).rateGoldAdd / 100);
                }
                this.rewardGold = Number(this.rewardGold.toFixed(1));
            } else {
                //  let random = utils.GetRandomNum(0, this.cfg.WaveValue[index])
                this.rewardGem = Number((this.cfg.DiamondReward * crit * this.rate).toFixed(1));
            }
        });
        if (this.resourceType == GlobalEnum.DestructorType.Gold4) {
            this.rewardGold *= (1 + EnchantBuff.getPetBuff(playerId, key).fourGoldAdd / 100);
            this.rewardGem *= (1 + EnchantBuff.getPetBuff(playerId, key).fourGoldAdd / 100);
        }

        //oTraceError('lwj 奖励 ' + this.rewardGem + " " + this.rewardGold);

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
    private playCritEffectByLast() {
        if (!this.isCrit) return;
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
        let arr = SceneResourceMap.get(areaID);
        if (!arr) return;
        let index = arr.findIndex((item) => {
            return item == resourceScript;
        });
        if (index != -1) {
            arr.splice(index, 1);
        }
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
                await TimeUtil.delaySecond(3);
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
    }

    protected onDestroy(): void {

    }

    protected onUpdate(dt: number): void {

    }

}