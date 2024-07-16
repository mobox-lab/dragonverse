import { GameConfig } from "../../config/GameConfig";
import { EModule_Events, EPickUpCreType, EPickUpType, EPlayerEvents_S, ESkillEvent_S } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { util } from "../../tool/Utils";
import { PlayerModuleS } from "../PlayerModule/PlayerModuleS";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import TriggerLand from "./Land/TriggerLand";
import MoveLand from "./Land/MoveLand";
import ShowHiddenLand from "./Land/ShowHiddenLand";
import { LandModuleC } from "./LandModuleC";
import PickUp from "./PickUp/PickUp";
import { EventManager } from "../../tool/EventManager";
import { IPropDropElement } from "../../config/PropDrop";
import RP_Destroy_Physics, { RP_Destroy_Physics_S } from "../../rptool/GM/RP_Destroy_Physics";
import IPickUpInfo from "./PickUp/IPickUpInfo";
import { PillInfo } from "./PickUp/PickUpPill";
import { DressUpInfo } from "./PickUp/PickUpDressUp";
import { PickManagerS } from "./PickManagerS";
import { LandManagerS } from "./Land/LandManagerS";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Gtk from "gtoolkit";

export type LandParce = {
    cfgId: number, obj: GameObject, BloodSwitch: boolean, SkillSwitch: boolean, GoldSwitch: boolean,
    RunSwitch: boolean, BuffSwitch: boolean, PortalSwitch: boolean, LowPillSwitch: boolean, Destroy: boolean,
    Trans: boolean
};

/**
 * 关卡模块 S
 * 1.拾取物 pickup （属性同步脚本，同步流程，同步随机技能球6个，血包3个，金钱3个）
 * 2.地形运动 && buff
 */
export class LandModuleS extends ModuleS<LandModuleC, null> {

    /**玩家模块*/
    private playerModules: PlayerModuleS = null;

    /**地形*/
    public landParcess: LandParce[] = [];

    /**回收key */
    private recyclePickUpkey: any = null;

    /**检测技能球数量计时 */
    private _skillTime: number = 0;

    protected onStart(): void {
        Log4Ts.log(LandModuleS, `start`);
        this.Init();
    }

    protected onUpdate(dt: number): void {
        if (this.landParcessBuffs && this.landParcessBuffs.length > 0) {
            for (let index = 0; index < this.landParcessBuffs.length; index++) {
                const element = this.landParcessBuffs[index];
                element.onUpdate(dt);
            }
        }
        this.calculatePillDuration(dt);
        this.checkCreSkill(dt);
    }

    private async Init(): Promise<void> {
        this.playerModules = ModuleService.getModule(PlayerModuleS);

        EventManager.instance.add(EPlayerEvents_S.player_deadState_s, this.listen_player_deadState, this);

        await this.initLandParces();

        this.randomPickup();

        this.startRefashPlckup();

        this.creatParces();

        this.startMoveParces();

        this.createDestructible();

        // 初始化显示隐藏的管理类
        LandManagerS.instance.init();
    }

    /**
     * 拾取物刷新
     */
    private startRefashPlckup() {
        this.recyclePickUpkey = setTimeout(() => {
            this.recycleAllPickUp();
            setTimeout(() => {
                this.randomPickup();
                this.startRefashPlckup();
            }, 3000);
        }, Globaldata.land_refash_pickup_time * 1000);

        setTimeout(() => {
            this.showTips(1);
        }, (Globaldata.land_refash_pickup_time - Globaldata.land_refash_pickup_tip_time) * 1000);
    }

    /**
     * 初始化地形
     */
    private async initLandParces() {

        let cfgs = GameConfig.LandParcel.getAllElement();

        for (let index = 0; index < cfgs.length; index++) {
            const element = cfgs[index];
            let obj = await GameObject.asyncFindGameObjectById(element.Guid);
            if (obj == null) {
                console.error("initLandParces go == null");
                return;
            }
            this.landParcess.push({
                cfgId: element.Id, obj: obj,
                BloodSwitch: element.BloodSwitch == 1,
                SkillSwitch: element.SkillSwitch == 1,
                GoldSwitch: element.GoldSwitch == 1,
                RunSwitch: element.RunSwitch == 1,
                BuffSwitch: element.BuffSwitch == 1,
                PortalSwitch: element.PortalSwitch == 1,
                LowPillSwitch: element.LowPillSwitch == 1,
                Destroy: element.Destroy == 1,
                Trans: element.Trans == 1,
            });
        }
    }

    /**
     * 刷新提示
     */
    private showTips(tipType: number) {
        let players = Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const element = players[index];
            if (element) {
                this.getClient(element).net_showTips(tipType); //EventManager.instance.call(ENotice_Events_S.NoticeEvent_TipMsg_S, element.playerId,2670);
            }
        }
    }

    /**
     * 获取玩家在地块上的一个随机位置
     * @param player 玩家
     * @returns 随机位置
     */
    public getRandomPosition(player: Player): Vector {
        let cfgs = GameConfig.LandParcel.getAllElement().filter((value) => {
            return value.PortalSwitch == 1;
        });
        //透明 && buff 不传送
        let cfgids: number[] = cfgs.map((value) => {
            return value.Id;
        })
            .filter((value) => {
                return !TriggerLand.landIds.includes(value);
            })
            .filter((value) => {
                return !ShowHiddenLand.landIds.includes(value);
            });

        let randomIndex = MathUtil.randomInt(0, cfgids.length);
        if (cfgids.length <= 0) {
            randomIndex = 1;
        }

        let guid = GameConfig.LandParcel.getElement(cfgids[randomIndex]).Guid;
        let objfind: GameObject = this.landParcess.find((value) => {
            return value?.obj?.gameObjectId == guid;
        })?.obj;
        if (!objfind) {
            objfind = GameObject.findGameObjectById(guid);
        }

        return objfind.worldTransform.position.clone().add(new Vector(0, 0, objfind.getBoundingBoxExtent().z))
            .add(new Vector(0, 0, player.character.collisionExtent.z));
    }

    //******************************************************拾取物*************************************************************** */

    /** 丹药的map，<玩家id, <加成属性, 加成的值>> */
    private _playerPillMap: Map<number, Map<number, number>> = new Map();
    /** 丹药持续时间，<玩家id, [{加成属性, 加成值, 剩余时间},...]> */
    private _pillDurationMap: Map<number, Array<{ attributeID: number, value: number, duration: number }>> = new Map();
    /** 临时map */
    private _tempMap: Map<number, Array<{ attributeID: number, value: number, duration: number }>> = new Map();
    /** 用于计时 */
    private _pillTime: number = 0;

    protected onPlayerLeft(player: mw.Player): void {
        this._playerPillMap.delete(player.playerId);
        this._pillDurationMap.delete(player.playerId);
        this._tempMap.delete(player.playerId);
    }

    /**
     * 随机拾取物
     */
    private async randomPickup() {
        await this.randomPickupType(EPickUpType.skill);
        await this.randomPickupType(EPickUpType.hp);
        await this.randomPickupType(EPickUpType.money);
        await this.randomPickupType(EPickUpType.attribute);
        await this.randomPickupType(EPickUpType.dressUp);
    }

    private checkCreSkill(dt: number) {
        this._skillTime += dt;
        if (this._skillTime >= Globaldata.land_creSkill_time) {
            this._skillTime = 0;
            if (PickManagerS.instance.skillNum < Globaldata.land_pickup_skll_count) {
                this.randomPickupType(EPickUpType.skill);
            }
        }
    }

    /**
     * 随机拾取物一种
     */
    private async randomPickupType(pickUpType: EPickUpType) {
        let lands: number[] = [];
        let count = 0;
        switch (pickUpType) {
            case EPickUpType.skill: {
                lands = this.landParcess.filter((value) => {
                    return value.SkillSwitch && !PickManagerS.instance.hasLandPick(value.cfgId);
                }).map((item) => {
                    return item.cfgId;
                });
                count = Globaldata.land_pickup_skll_count - PickManagerS.instance.skillNum;
            }
                break;
            case EPickUpType.hp: {
                lands = this.landParcess.filter((value) => {
                    return value.BloodSwitch;
                }).map((item) => {
                    return item.cfgId;
                });
                count = Globaldata.land_pickup_hp_count;
            }
                break;
            case EPickUpType.money: {
                lands = this.landParcess.filter((value) => {
                    return value.GoldSwitch;
                }).map((item) => {
                    return item.cfgId;
                });
                count = Globaldata.land_pickup_money_count;
            }
                break;
            case EPickUpType.attribute: {
                lands = this.landParcess.filter((value) => {
                    return value.LowPillSwitch;
                }).map((item) => {
                    return item.cfgId;
                });
                count = Globaldata.land_pickup_primary_pill_count;
            }
                break;
            case EPickUpType.dressUp: {
                lands = this.landParcess.filter((value) => {
                    return value.Trans;
                }).map((item) => {
                    return item.cfgId;
                });
                count = Globaldata.land_dressup_count;
            }
                break;
            default:
                break;
        }

        if (lands.length < count) {
            console.error("随机拾取物数量超过配置数量", pickUpType);
            return;
        }

        let landRandoms = util.getRandomCountArrayFormArray(lands, count);
        for (let index = 0; index < landRandoms.length; index++) {
            const element = landRandoms[index];
            await PickManagerS.instance.creatPickUp(element, pickUpType);
        }

    }

    /**
     * 拾取技能
     * @param value  技能id
     */
    @Decorator.noReply()
    public net_pickUp(onlyGuid: string, pickType: EPickUpType,
        value: number, pickUpInfo: IPickUpInfo) {

        // 校验避免重复拾取
        let isHasPickUp = PickManagerS.instance.isHasPickUp(onlyGuid);
        if (!isHasPickUp) return;
        const pickUpGuid = PickManagerS.instance.getPickupPrefab(onlyGuid);

        switch (pickType) {
            case EPickUpType.skill: {
                // 拾取技能球
                EventManager.instance.call(ESkillEvent_S.SkillEvent_PickUpSkillBall_S, this.currentPlayerId);
            }
                break;
            case EPickUpType.hp: {
                // 使用预制体的 guid 获取 excel 配置
                const config = GameConfig.PropDrop.findElement("dropGuid", pickUpGuid);
                if (!config) return;
                const hp = JSON.parse(config.extends);
                // 校验输入和配置是否一致
                if (hp.value !== value) return;

                let addvalue = 0;
                let maxHp = this.playerModules.getPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.maxHp);
                addvalue = maxHp * value * 0.01;
                this.playerModules.addPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.hp, addvalue);
            }
                break;
            case EPickUpType.money: {
                // 使用预制体的 guid 获取 excel 配置
                const config = GameConfig.PropDrop.findElement("dropGuid", pickUpGuid);
                if (!config) return;
                const money = JSON.parse(config.extends);
                // 校验输入和配置是否一致
                if (money.value !== value) return;

                this.playerModules.addPlayerAttr(this.currentPlayerId, Attribute.EnumAttributeType.money, value);
            }
                break;
            case EPickUpType.attribute: {
                // 使用预制体的 guid 获取 excel 配置
                const config = GameConfig.PropDrop.findElement("dropGuid", pickUpGuid);
                if (!config) return;
                const attr: PillInfo = JSON.parse(config.extends);
                const pillInfo = pickUpInfo as PillInfo;
                // 校验输入和配置是否一致
                if (attr.attributeID !== pillInfo.attributeID || attr.attributeValue !== pillInfo.attributeValue || attr.duration !== pillInfo.duration) return;

                //计数，一个属性最多只能加5次
                // let currentAdd = this._pillDurationMap.get(this.currentPlayerId)?.filter(element => element.attributeID === pillInfo.attributeID);
                // if (currentAdd && currentAdd.length >= 5) return;

                //改为不叠加
                let currentAdd = this._pillDurationMap.get(this.currentPlayerId)?.find(element => element.attributeID === pillInfo.attributeID);
                if (!currentAdd) {
                    //给对应的加成类型加数据
                    Log4Ts.log(LandModuleS, `add player ${this.currentPlayerId} attr ${pillInfo.attributeID} value ${pillInfo.attributeValue}`);
                    this.playerModules.addPlayerAttr(this.currentPlayerId, pillInfo.attributeID, pillInfo.attributeValue);
                    let info = this._playerPillMap.get(this.currentPlayerId);
                    if (!info) {
                        info = new Map();
                        this._playerPillMap.set(this.currentPlayerId, info);
                    }
                    //计算一下丹药给到的加成
                    let addValue = info.get(pillInfo.attributeID);
                    if (!addValue == null) addValue = 0;
                    addValue += pillInfo.attributeValue;
                    info.set(pillInfo.attributeID, addValue);
                };


                //加入计时
                let durationArray = this._pillDurationMap.get(this.currentPlayerId);
                if (!durationArray) {
                    durationArray = [];
                    this._pillDurationMap.set(this.currentPlayerId, durationArray);
                }
                durationArray.push({
                    attributeID: pillInfo.attributeID,
                    value: pillInfo.attributeValue,
                    duration: pillInfo.duration,
                });
            }
                break;
            case EPickUpType.dressUp: {
                const dressUpInfo = pickUpInfo as DressUpInfo;
                EventManager.instance.call(EModule_Events.land_pickUp_dressUp, this.currentPlayerId, dressUpInfo);
            }
                break;
            default:
                break;
        }

        // 回收
        PickManagerS.instance.recyclePickUp(onlyGuid);

    }

    /**
     * 回收所有拾取物
     */
    private recycleAllPickUp() {
        PickManagerS.instance.recycleAllLandPick();
    }

    /**
     * 玩家死亡，清除丹药加成的属性
     * @param playerID 玩家id
     * @param sceneID
     */
    private listen_player_deadState(playerID: number, sceneID: number) {
        //玩家死亡后，需要清除丹药给到的加成
        this.clearAddValue(playerID, this._playerPillMap);
        //不计时这个玩家
        const durationArray = this._pillDurationMap.get(playerID);
        if (durationArray) {
            durationArray.length = 0;
        }
    }

    /**
     * 清除指定玩家增益的map记录属性
     * @param playerID 玩家id
     * @param addAttrMap 需要清除的map
     */
    private clearAddValue(playerID: number, addAttrMap: Map<number, Map<number, number>>) {
        const info = addAttrMap.get(playerID);
        if (info) {
            for (let [attributeID, addSumValue] of info) {
                this.playerModules.reducePlayerAttr(playerID, attributeID, addSumValue);
                info.set(attributeID, 0);
            }
        }
    }

    /**
     * 计算剩余时间
     * @param dt 帧间隔
     */
    private calculatePillDuration(dt: number) {
        this._pillTime += dt;
        if (this._pillTime >= 1) {
            //算一次时间
            this._tempMap.clear();
            for (let [playerID, durationArray] of this._pillDurationMap) {
                if (durationArray && durationArray.length > 0) {
                    //时间截止的索引
                    let deleted = [];
                    for (let i = 0; i < durationArray.length; i++) {
                        durationArray[i].duration -= 1;
                        if (durationArray[i].duration <= 0) {
                            //加入到需要删除的数组中
                            deleted.push(i);
                        }
                    }
                    if (deleted.length > 0) {
                        //过滤一遍
                        const newDurationArray = durationArray.filter((v, i) => {
                            const include = deleted.includes(i);
                            if (include) {
                                //需要删除的属性
                                //加入到需要删除的数组中
                                if (!durationArray.find(v => v.attributeID == durationArray[i].attributeID && v !== durationArray[i])) {
                                    //没有重复的属性，就扣属性
                                    this.attributeExpired(playerID, v);
                                }

                            }
                            return !include;
                        });
                        this._tempMap.set(playerID, newDurationArray);
                    }
                }
            }
            //更新map
            if (this._tempMap.size > 0) {
                for (let [playerID, durationArray] of this._tempMap) {
                    this._pillDurationMap.set(playerID, durationArray);
                }
            }
            this._pillTime = 0;
        }
    }

    /**
     * 属性过期，移除
     * @param playerID 玩家id
     * @param attribute 需要删除的属性
     */
    private attributeExpired(playerID: number, attribute: { attributeID: number, value: number, duration: number }) {
        if (!attribute) return;
        // console.error(`rkc--------------playerid:${playerID}  ${attribute.attributeID}过期`);
        const att = this._playerPillMap.get(playerID);
        if (att) {
            const attSumVal = att.get(attribute.attributeID);
            if (attSumVal < attribute.value) {
                att.set(attribute.attributeID, 0);
            } else {
                att.set(attribute.attributeID, attSumVal - attribute.value);
            }
            //扣属性
            Log4Ts.log(LandModuleS, `reduce player ${playerID} attr ${attribute.attributeID} value ${attribute.value}`);
            this.playerModules.reducePlayerAttr(playerID, attribute.attributeID, attribute.value);
            //让客户端修改表现
            this.getClient(playerID)?.net_pillExipred(attribute.attributeID);
        }
    }

    //******************************************************地形 移动&&显隐*************************************************************** */

    /**地形 移动*/
    public moveLands: MoveLand[] = [];
    /**地形 显隐*/
    public showhiddens: ShowHiddenLand[] = [];
    /**地形池 显隐*/
    public showhiddensCatch: ShowHiddenLand[] = [];
    /**回收key */
    private recycleParceskey: any = null;

    /**
     * 地形刷新
     */
    private startMoveParces() {
        this.recycleParceskey = setTimeout(() => {
            this.recycleAllLand();
            this.recycleAllShowHidden();
            this.recycleAllLandBuff();
            this.recycleAllDestructible();
            setTimeout(() => {
                this.creatParces();
                this.startMoveParces();
                if (MathUtil.randomInt(0, 100) % 2 == 0) {
                    //随机决定这一轮是否需要刷新
                    this.createDestructible();
                }
            }, 3000);
        }, Globaldata.land_Parcess_refash_time * 1000);

        setTimeout(() => {
            this.showTips(2);
        }, (Globaldata.land_Parcess_refash_time - Globaldata.land_Parcess_refash__tip_time) * 1000);
    }

    /**
     * 随机地形
     *
     */
    private async creatParces() {
        //地块运动和显隐
        let runCfgArr = GameConfig.LandRun.getAllElement();
        let cfg = runCfgArr[MathUtil.randomInt(0, runCfgArr.length)];

        let landParcess = this.landParcess.filter((value) => {
            return value.RunSwitch == true;
        }).map((item) => {
            return item.cfgId;
        });
        let landParcessRandomIds = util.getRandomCountArrayFormArray(landParcess, Globaldata.land_Parcess_count);

        for (let index = 0; index < cfg.landId.length; index++) {
            const id = cfg.landId[index];

            let parent: GameObject = this.landParcess.find((value) => {
                return value.cfgId == id;
            }).obj;

            if (cfg.runtype == 2) {
                //平移

                let random: number[] = [];
                if (cfg.XRun1 == 1) {
                    random.push(1);
                }
                if (cfg.XRun2 == 1) {
                    random.push(2);
                }
                if (cfg.YRun1 == 1) {
                    random.push(3);
                }
                if (cfg.YRun2 == 1) {
                    random.push(4);
                }
                if (cfg.ZRun1 == 1) {
                    random.push(5);
                }
                if (cfg.ZRun2 == 1) {
                    random.push(6);
                }

                let index = MathUtil.randomInt(0, random.length);
                let dir = random[index];
                let speedValue = Globaldata.land_Parcess_speed;
                let speed: Vector = null;

                if (dir == 1) {
                    speed = new Vector(speedValue, 0, 0);
                }
                if (dir == 2) {
                    speed = new Vector(-speedValue, 0, 0);
                }
                if (dir == 3) {
                    speed = new Vector(0, speedValue, 0);
                }
                if (dir == 4) {
                    speed = new Vector(0, -speedValue, 0);
                }
                if (dir == 5) {
                    speed = new Vector(0, 0, speedValue);
                }
                if (dir == 6) {
                    speed = new Vector(0, 0, -speedValue);
                }

                let randomdisIndex = MathUtil.randomInt(0, Globaldata.land_Parcess_maxDistances.length);
                let distance = Globaldata.land_Parcess_maxDistances[randomdisIndex];
                let time = Math.abs(distance / speedValue);

                let land: MoveLand = new MoveLand();
                land.creat(parent, speed, time);
                this.moveLands.push(land);
            } else {
                //显隐
                let script = null;
                if (this.showhiddensCatch.length > 0) {
                    script = this.showhiddensCatch.pop();
                }
                let showHidden: ShowHiddenLand = script == null ? await mw.Script.spawnScript(ShowHiddenLand, true) as ShowHiddenLand : script;
                showHidden.creat(id);
                this.showhiddens.push(showHidden);
            }

        }

        this.creatLandBuff(landParcessRandomIds);
    }

    /**
     * 随机无运动逻辑的地块位置
     */
    public noRunRandom(num: number): mw.Vector[] | undefined {
        let landParcess = this.landParcess?.filter((value) => {
            return !value.RunSwitch && value.cfgId <= 100;
        });
        if (Gtk.isNullOrEmpty(landParcess)) return undefined;
        let result: Vector[] = [];
        while (num--) {
            let index = MathUtil.randomInt(0, landParcess.length);
            let pos = landParcess[index].obj.worldTransform.position.add(new Vector(0, 0, 2300));
            result.push(pos);
        }
        return result;
    }

    /**
     * 回收所有地形 移动
     */

    private recycleAllLand() {
        for (let index = 0; index < this.moveLands.length; index++) {
            const element = this.moveLands[index];
            element.recycle();
        }
        this.moveLands = [];
    }

    /**
     * 回收所有地形 显隐
     */
    private recycleAllShowHidden() {
        for (let index = 0; index < this.showhiddens.length; index++) {
            const element = this.showhiddens[index];
            element.recycle();
            this.showhiddensCatch.push(element);
        }
        this.showhiddens = [];
    }

    //*********************************************************可破坏物************************************************************ */

    /** 可破坏物 */
    public destructibleObjs: GameObject[] = [];
    /** 对应的服务端脚本 */
    public destroyPhysics: RP_Destroy_Physics_S[] = [];

    /**
     * 重新创建新的破坏物
     */
    private async createDestructible() {
        let landParcessIds = this.landParcess.filter((value) => {
            return value.Destroy == true;
        }).map((item) => {
            return item.cfgId;
        });
        let landParcessRandomIds = util.getRandomCountArrayFormArray(landParcessIds, Globaldata.land_destroy_count);
        for (let i = 0; i < landParcessRandomIds.length; i++) {
            const prefab = await GameObjPool.asyncSpawn("987B143C437B3C52A6A3E7AF24399447", GameObjPoolSourceType.Prefab);
            this.destructibleObjs.push(prefab);
        }
        //要延迟一会才能拿到脚本
        setTimeout(() => {
            for (let i = 0; i < this.destructibleObjs.length; i++) {
                const script = (((this.destructibleObjs[i].getChildren()[0].getScriptByName("RP_Destroy_Physics") as RP_Destroy_Physics).objLogicS) as RP_Destroy_Physics_S);
                //用这个地块去初始化
                script.reset(this.landParcess[landParcessRandomIds[i]].obj);
                this.destroyPhysics.push(script);
            }
        }, 50);
    }

    /**
     * 回收可破坏物
     */
    private recycleAllDestructible() {
        for (let i = 0; i < this.destructibleObjs.length; i++) {
            const element = this.destructibleObjs[i];
            GameObjPool.despawn(element);
            this.destroyPhysics[i].recycle();
        }
        this.destructibleObjs.length = 0;
        this.destroyPhysics.length = 0;
    }

    //*********************************************************地形buff************************************************************ */

    /**地形buff*/
    private landParcessCatchBuffs: TriggerLand[] = [];

    /**地形buff*/
    private landParcessBuffs: TriggerLand[] = [];

    /**
     * 创建地形BUFF
     * @param landParcessRandomIds
     */
    private async creatLandBuff(landParcessRandomIds: number[]) {
        let landParcessBuff = this.landParcess.filter((value) => {
            return value.BuffSwitch == true;
        }).map((item) => {
            return item.cfgId;
        });
        landParcessBuff = landParcessBuff.filter((value) => {
            return !landParcessRandomIds.includes(value);
        });
        let landParcessBuffRandomIds = util.getRandomCountArrayFormArray(landParcessBuff, Globaldata.land_Parcess_Buffcount);

        let buffIds = GameConfig.LandBuff.getAllElement().map((item) => {
            return item.Id;
        });// let buffRandomIds = util.getRandomCountArrayFormArray(buffIds, Globaldata.land_Parcess_Buffcount);
        for (let index = 0; index < landParcessBuffRandomIds.length; index++) {
            const element = landParcessBuffRandomIds[index];
            let t_index = MathUtil.randomInt(0, buffIds.length);   // let id = buffRandomIds[index];
            let id = buffIds[t_index];
            let script = null;
            if (this.landParcessCatchBuffs.length > 0) {
                script = this.landParcessCatchBuffs.pop();
            }
            let landBuff: TriggerLand = script == null ? await mw.Script.spawnScript(TriggerLand, true) as TriggerLand : script;
            landBuff.creat(element, id);
            this.landParcessBuffs.push(landBuff);
        }
    }

    /**
     * 回收地形BUFF
     */
    private recycleAllLandBuff() {
        for (let index = 0; index < this.landParcessBuffs.length; index++) {
            const element = this.landParcessBuffs[index];
            element.recycle();
            this.landParcessCatchBuffs.push(element);
        }
        this.landParcessBuffs = [];
    }

    //*********************************************************测试gm************************************************************ */

    private land: PickUp | MoveLand | ShowHiddenLand | TriggerLand = null;

    /**
     *  gm 创建拾取物
     * @param pickType 拾取物类型
     */
    public async gm_pickUp(pickType: number, landId: number) {

        if (this.land) {
            this.land.recycle();
        }

        await TimeUtil.delaySecond(2);
        if (this.land) {
            this.land.destroy();
        }

        switch (pickType) {
            case 1: {
                this.land = await mw.Script.spawnScript(PickUp, true) as PickUp;
                this.land.creat(landId, EPickUpType.hp);
            }
                break;
            case 2: {
                this.land = await mw.Script.spawnScript(PickUp, true) as PickUp;
                this.land.creat(landId, EPickUpType.money);
            }
                break;
            case 3: {
                this.land = await mw.Script.spawnScript(PickUp, true) as PickUp;
                this.land.creat(landId, EPickUpType.skill);
            }
                break;
            default:
                break;
        }
    }

    /**
     * gm 创建地形移动显隐
     */
    public async gm_land(gmtype: number, landId: number, x: number, y: number, z: number, time: number) {

        let go: GameObject = this.landParcess.find((value) => {
            return value.cfgId == landId;
        }).obj;

        if (this.land) {
            this.land.recycle();
        }
        await TimeUtil.delaySecond(2);
        if (this.land) {
            this.land.destroy();
        }

        switch (gmtype) {
            case 1: {
                this.land = new MoveLand();
                this.land.creat(go, new Vector(x, y, z), time);
            }
                break;
            case 2: {
                this.land = await mw.Script.spawnScript(ShowHiddenLand, true) as ShowHiddenLand;
                this.land.creat(landId);
            }
                break;
            default:
                break;
        }
    }

    /**
     * gm 创建地形BUFF
     */
    public async gm_landBuff(cfgId: number, landId: number = 67) {
        if (this.land) {
            this.land.recycle();
        }
        await TimeUtil.delaySecond(2);
        if (this.land) {
            this.land.destroy();
        }

        this.land = await mw.Script.spawnScript(TriggerLand, true) as TriggerLand;
        this.land.creat(landId, cfgId);
    }

    /**
     * gm 回收所有地形效果
     */
    public gm_recycle() {
        this.recycleAllPickUp();
        this.recycleAllLand();
        this.recycleAllShowHidden();
        this.recycleAllLandBuff();

        if (this.land) {
            this.land.recycle();
        }

        if (this.recycleParceskey) {
            clearTimeout(this.recycleParceskey);
            this.recycleParceskey = null;
        }

        if (this.recyclePickUpkey) {
            clearTimeout(this.recyclePickUpkey);
            this.recyclePickUpkey = null;
        }
    }

    /**
     * gm 重启地形效果
     */
    public gm_reStart() {

        this.gm_recycle();

        setTimeout(() => {
            this.randomPickup();
            this.creatParces();
        }, 2000);
    }

    /**
     * 编辑器BUG:
     * 父类有旋转，子节点服务器调用物体坐标时候，物体会抖动一下产生偏移
     */
    public gm_loglandPos(id: number) {
        let guid = GameConfig.LandParcel.getElement(id).Guid;
        let obj = GameObject.findGameObjectById(guid);
        console.log("gm_loglandPos=======S", obj.worldTransform.position.clone());
    }
}