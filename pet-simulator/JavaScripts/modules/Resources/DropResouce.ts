import { SpawnManager, SpawnInfo } from "../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { ObjectPoolServices } from "../../Tools/ObjectPool";
import { oTraceError } from "../../util/LogManager";
import { cubicBezier, getPos, setPos } from "../../util/MoveUtil";
import { SoundManager } from "../../util/SoundManager";
import { RewardTipsManager } from "../UI/RewardTips";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { PlayerModuleS } from "../Player/PlayerModuleS";

export class DropManagerC extends ModuleC<DropManagerS, null> {

}

export class DropManagerS extends ModuleS<DropManagerC, null> {
    // private static _instance: DropManagerS = null;

    // public static getInstance(): DropManagerS {
    //     if (this._instance == null) {
    //         this._instance = new DropManagerS();
    //         this._instance.init();
    //     }
    //     return this._instance;
    // }

    private typeValue: Map<GlobalEnum.CoinType, number> = new Map();
    private _drops: Set<Drop> = new Set();
    private playerMS: PlayerModuleS = null;

    public get dropSize() {
        return this._drops.size;
    }

    protected onStart(): void {
        this.playerMS = ModuleService.getModule(PlayerModuleS);
        this.init();
    }

    public start() {
        TimeUtil.setInterval(() => {
            this.comparePlayerDis(this.currentPlayer);
            this.compareDis();
        }, 3);
    }

    init(): void {
        this.resetValue();
    }

    /**在当前坐标一圈为方向创建掉落
     * @param pos 当前坐标
     * @param type 掉落类型
     * @param value 掉落总值
     * @param count 掉落数量
     */
    @Decorator.noReply()
    public net_createDrop(pos: mw.Vector, type: GlobalEnum.CoinType, allValue: number, count: number, isBox: boolean = false): void {
        if (count <= 0 || allValue <= 0) return;
        let val = Math.ceil(allValue / count);
        let needCount = GlobalData.DropAni.frameNum;
        let interval = TimeUtil.setInterval(() => {
            this.needCount(needCount);
            for (let i = 0; i < needCount; i++) {
                let drop = ObjectPoolServices.getPool(Drop).spawn();
                drop.poolInit(pos.clone(), type, val, isBox);
                this._drops.add(drop);
                count--;
                if (count <= 0) {
                    TimeUtil.clearInterval(interval);
                    return;
                }
            }
        }, 0.01);
    }

    /**需要金币数量 */
    private needCount(count: number): void {
        let currentSize = this._drops.size;
        let targetSize = currentSize + count;
        if (targetSize > this._maxGold) {

            let need = targetSize - this._maxGold;
            let addGoldValue = 0;
            let addDiamondValue = 0;
            let arr = Array.from(this._drops);
            for (let i = 0; i <= need; i++) {
                let drop = arr[i];
                if (drop) {
                    if (i == need) {
                        drop.gold += addGoldValue;
                        drop.diamond += addDiamondValue;
                        break;
                    }
                    addDiamondValue += drop.diamond;
                    addGoldValue += drop.gold;
                    drop.destroy();
                    this._drops.delete(drop);
                    ObjectPoolServices.getPool(Drop).return(drop);
                }
            }
        }
    }

    /**吸收增加金币间隔 */
    private _absorbInterval: number = 0.8;
    /**吸收增加金币时间 */
    private _absorbTime: number = 0;
    /**当前是否开始吸收金币 */
    private _isStartAbsorb: boolean = false;
    /**金币同时存在上限 */
    private _maxGold: number = GlobalData.SceneResource.goldMax;

    /**轮询 */
    public onResourceUpdate(dt: number): void {
        this.absorbUpdate(dt);
        this._drops.forEach((drop: Drop) => {
            if (drop.isDestroy) {
                this._drops.delete(drop);
                ObjectPoolServices.getPool(Drop).return(drop);
                return;
            }
            drop.update(dt, this.currentPlayer);
        });
    }

    /**吸收金币轮询 */
    private absorbUpdate(dt: number): void {
        if (!this._isStartAbsorb) return;
        this._absorbTime += dt;
        if (this._absorbTime >= this._absorbInterval) {
            this._absorbTime = 0;
            this._isStartAbsorb = false;
            let gold1 = this.typeValue.get(GlobalEnum.CoinType.FirstWorldGold);
            let gold2 = this.typeValue.get(GlobalEnum.CoinType.SecondWorldGold);
            let gold3 = this.typeValue.get(GlobalEnum.CoinType.ThirdWorldGold);
            let diamond = this.typeValue.get(GlobalEnum.CoinType.Diamond);
            this.playerMS.absorbAll(gold1, gold2, gold3, diamond);
            this.resetValue();
        }
    }

    /**重置金币钻石值 */
    private resetValue(): void {
        this.typeValue.set(GlobalEnum.CoinType.FirstWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.SecondWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.ThirdWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.Diamond, 0);
    }

    /**比较与玩家的距离 */
    private comparePlayerDis(playerBe?: mw.Player): void {
        if (this._drops.size <= 0) return;
        if (!playerBe) return;
        const playerPos = playerBe.character.worldTransform.position;
        this._drops.forEach((element: Drop) => {
            let dis = mw.Vector.squaredDistance(playerPos, getPos(element.model));
            if (dis >= GlobalData.DropAni.playerDistance * GlobalData.DropAni.playerDistance) {
                element.destroy();
            }
        });
    }

    /**比较所有掉落物之间的距离看是否有平方距离低于20 */
    public compareDis(): void {
        let arr = Array.from(this._drops);
        for (let i = 0; i < arr.length; i++) {
            let drop = arr[i];
            if (!drop.isLand) continue;
            for (let j = i + 1; j < arr.length; j++) {
                let drop2 = arr[j];
                if (!drop2.isLand) continue;
                let dis = mw.Vector.squaredDistance(getPos(drop.model), getPos(drop2.model));
                if (dis <= GlobalData.DropAni.dropDistance * GlobalData.DropAni.dropDistance) {

                    if (drop.type == drop2.type && drop.type == GlobalEnum.CoinType.Diamond)
                        drop.diamond += drop2.diamond;
                    if (drop.type == drop2.type && (drop.type == GlobalEnum.CoinType.FirstWorldGold || drop.type == GlobalEnum.CoinType.SecondWorldGold || drop.type == GlobalEnum.CoinType.ThirdWorldGold))
                        drop.gold += drop2.gold;
                    drop2.destroy();
                }
            }
        }
    }

    /**增加金币 */
    public addGold(value: number, coinType: GlobalEnum.CoinType): void {
        let gold = this.typeValue.get(coinType);
        if (gold == null) {
            oTraceError("金币类型错误");
            return;
        } else {
            this.typeValue.set(coinType, gold + value);
            this._isStartAbsorb = true;
        }
    }

    /**增加钻石 */
    public addDiamond(value: number): void {
        if (value <= 0) return;
        let diamond = this.typeValue.get(GlobalEnum.CoinType.Diamond);
        if (diamond == null) {
            oTraceError("钻石类型错误");
            return;
        } else {
            this.typeValue.set(GlobalEnum.CoinType.Diamond, diamond + value);
            this._isStartAbsorb = true;
        }
    }

}

class Drop {

    /**金币值 */
    private _gold: number = 0;
    public get gold(): number {
        return this._gold;
    }

    public set gold(val: number) {
        this._gold = val;
    }

    /**钻石值 */
    private _diamond: number = 0;
    public get diamond(): number {
        return this._diamond;
    }

    public set diamond(val: number) {
        this._diamond = val;
    }

    public get type(): GlobalEnum.CoinType {
        return this._type;
    }

    private _type: GlobalEnum.CoinType;

    /**当前模型 */
    public model: mw.Effect = null;

    private get _maxDis(): number {
        return GlobalData.DropAni.resourceToPlayer * GlobalData.LevelUp.levelRange;
    }

    private canUpdate: boolean = false;
    public isDestroy: boolean = false;

    /**是否已落地 */
    private _isLand: boolean = false;
    public get isLand(): boolean {
        return this._isLand;
    }

    /**模拟物理贝塞尔 */
    private _physicsBezier: number[] = GlobalData.DropAni.physicsBezier;
    /**是否开始弹跳 */
    private _isStartJump: boolean = false;

    private targetPos: mw.Vector;

    public async poolInit(targetPos: mw.Vector, type: GlobalEnum.CoinType, value: number, isBox: boolean = false) {
        this.isDestroy = false;
        this._isStartJump = false;
        this._bonceTime = 0;
        this._landTime = 0;
        this.targetPos = targetPos;
        this._type = type;
        this._isLand = false;
        if (type == GlobalEnum.CoinType.FirstWorldGold) {
            let guid = GameConfig.Coins.getElement(1).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
            this._gold = value;
            this.diamond = 0;
        } else if (type == GlobalEnum.CoinType.SecondWorldGold) {
            let guid = GameConfig.Coins.getElement(3).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
            this._gold = value;
            this.diamond = 0;
        } else if (type == GlobalEnum.CoinType.ThirdWorldGold) {
            let guid = GameConfig.Coins.getElement(4).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
            this._gold = value;
            this.diamond = 0;
        } else if (type == GlobalEnum.CoinType.Diamond) {
            let guid = GameConfig.Coins.getElement(2).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
            this._diamond = value;
            this.gold = 0;
        }
        setPos(this.model, targetPos);
        this.model.play();
        this.model.loop = true;
        this.init(isBox);
    }

    /**移动tween */
    private _moveToTween: mw.Tween<mw.Vector> = null;

    private init(isBox: boolean = false): void {
        let radiusarr = isBox ? GlobalData.DropAni.randomRadiusBig : GlobalData.DropAni.randomRadius;
        let radius = MathUtil.randomFloat(radiusarr[0], radiusarr[1]);  //半径
        const angle = Math.random() * Math.PI * 2; // 随机生成一个角度
        const x = radius * Math.cos(angle); // 计算x坐标
        const y = radius * Math.sin(angle); // 计算y坐标
        let startLoc = getPos(this.model);
        let hights = GlobalData.DropAni.heightRandoms;
        let hight = MathUtil.randomFloat(hights[0], hights[1]);
        let up: number;
        this.targetPos.z = Math.ceil(this.targetPos.z);
        up = this.targetPos.z + GlobalData.DropAni.resourceY;
        const endPoint = new mw.Vector(startLoc.x + x, startLoc.y + y, up); //地面高度
        let dir = mw.Vector.subtract(endPoint, startLoc).normalized;
        const controlPoint = new mw.Vector((endPoint.x - startLoc.x) * 1 / 4 + startLoc.x,
            (endPoint.y - startLoc.y) * 1 / 4 + startLoc.y, startLoc.z + hight); //飞行高度

        this._moveToTween = new mw.Tween(startLoc).to({
            x: [
                controlPoint.x,
                endPoint.x,
            ],
            y: [
                controlPoint.y,
                endPoint.y,
            ],
            z: [
                controlPoint.z,
                endPoint.z,
            ],
        }, GlobalData.DropAni.dropTime).interpolation(TweenUtil.Interpolation.Bezier)
            .onUpdate((value: mw.Vector) => {
                if (value.z >= hight) {
                    this.canUpdate = true;
                }
                setPos(this.model, value);
            }).onComplete(() => {
                setPos(this.model, endPoint);
                this.canUpdate = true;
                this.rollToTarget(dir);
            }).start().easing(cubicBezier(this._physicsBezier[0], this._physicsBezier[1], this._physicsBezier[2], this._physicsBezier[3]));
    }

    /**朝目标方向滚动 */
    private rollToTarget(dir: mw.Vector): void {
        let isRoll = Math.random() < GlobalData.DropAni.rollProbability;
        if (!isRoll) {
            this.bonce();
            return;
        }
        let disRandoms = GlobalData.DropAni.rollDistanceRandoms;
        let dis = MathUtil.randomFloat(disRandoms[0], disRandoms[1]);
        let time = MathUtil.randomFloat(GlobalData.DropAni.rollTime[0], GlobalData.DropAni.rollTime[1]);
        let startLoc = getPos(this.model);
        let endLoc = mw.Vector.add(startLoc, mw.Vector.multiply(dir, dis));
        this._moveToTween.stop();
        this._moveToTween = new mw.Tween(startLoc).to({x: endLoc.x, y: endLoc.y}, time)
            .onUpdate((value: mw.Vector) => {
                setPos(this.model, value);
            }).onComplete(() => {
                setPos(this.model, endLoc);
                this.bonce();
            }).start();
    }

    /**开始进入弹跳 */
    private bonce(): void {
        this._isLand = true;
        this._isStartJump = false;
        let idBonce = Math.random() < GlobalData.DropAni.bonceProbability;
        if (!idBonce) {
            this._isStartJump = true;
            return;
        }
        this._moveToTween?.stop();
        let height = MathUtil.randomFloat(GlobalData.DropAni.bonceHeight[0], GlobalData.DropAni.bonceHeight[1]);
        let startPos = getPos(this.model).clone();

        startPos.z = this.targetPos.z + GlobalData.DropAni.resourceY;

        this._moveToTween = new mw.Tween(startPos).to({z: startPos.z + height}, GlobalData.DropAni.bonceUpTime)
            .onUpdate((value: mw.Vector) => {
                setPos(this.model, value);
            }).onComplete((obj) => {
                this._moveToTween = new mw.Tween(obj).to({z: this.targetPos.z + GlobalData.DropAni.resourceY}, GlobalData.DropAni.bonceDownTime)
                    .onUpdate((value: mw.Vector) => {
                        setPos(this.model, value);
                    }).onComplete(() => {
                        this._isStartJump = true;
                    }).start().easing(TweenUtil.Easing.Bounce.Out);
            }).start().easing(TweenUtil.Easing.Quadratic.Out);
    }

    /**弹跳计时 */
    private _bonceTime: number = 0;

    /**弹跳轮询 */
    private bonceUpdate(dt: number): void {
        this._bonceTime += dt;
        if (this._bonceTime >= GlobalData.DropAni.bonceTime) {
            this._bonceTime = 0;
            this._isStartJump = false;
            this.bonce();
        }
    }

    /**更新 */
    async update(dt: number, player?: mw.Player) {
        if (!this.canUpdate) return;
        this.judgeDestroy(dt);
        if (this._isStartJump) {
            this.bonceUpdate(dt);
        }
        await this.petAbsorb(player);
        if (!player) return;
        const ownerPos = player.character.worldTransform.position;
        this.distanceAbsorb(ownerPos, player);
    }

    /**当前落地后时间 */
    private _landTime: number = 0;

    /**判断超出最大时间销毁 */
    private judgeDestroy(dt: number): void {
        if (!this._isLand) return;
        this._landTime += dt;
        if (this._landTime >= GlobalData.DropAni.destroyTime) {
            this.destroy();
        }
    }

    /**判断距离吸收 */
    private distanceAbsorb(loc: mw.Vector, player: mw.Player): void {
        let targetPos = getPos(this.model);
        let dis = mw.Vector.distance(loc, targetPos);
        if (dis <= this._maxDis) {
            this.flyToPlayer(dis, targetPos, loc, player);
        }
    }

    /**宠物吸收 */
    private petAbsorb(player: mw.Player) {
        let arr = GlobalData.Enchant.petAutoBuffKeys.get(player.playerId);
        if (arr.length <= 0) return;
        // let curPetArr = PlayerModuleC.curPlayer.PetArr; // TODO: Check all PlayerModuleC.curPlayer
        const curPetArr = ModuleService.getModule(PlayerModuleS).getPetArr(player);
        if (!curPetArr?.length) return;
        arr.forEach((key) => {
            let pet = curPetArr.find((value) => {
                return value.key == key;
            });
            if (pet) {
                this.distanceAbsorb(pet.PetGameObj?.tempLocation, player);
            }
        });
    }

    /**飞往tween贝塞尔 */
    private _flyToTweenBezier: number[] = GlobalData.DropAni.flyToPlayerBezier;
    /**飞往玩家的时间 */
    private _flyToPlayerTime: number = GlobalData.DropAni.flyToPlayerTime;

    /**飞向玩家 */
    public flyToPlayer(dis: number, targetPos: mw.Vector, ownerPos: mw.Vector, player: mw.Player): void {
        this.canUpdate = false;
        this._isLand = false;
        this._moveToTween.stop();
        if (this._gold > 0) {
            const val = Math.round(this._gold * GlobalData.Buff.goldBuff);
            Log4Ts.log(Drop, `add gold count ${val}  type ${this.type}`);
            ModuleService.getModule(DropManagerS).addGold(val, this.type);
            // RewardTipsManager.instance.getUI(this.type, val); // TODO: Check UI
            mw.Event.dispatchToClient(player, RewardTipsManager.EVENT_NAME_REWARD_TIPS_GET_UI, this.type, val);
        }
        if (this._diamond > 0) {
            const val = Math.round(this._diamond * GlobalData.Buff.goldBuff * GlobalData.LevelUp.moreDiamond);
            Log4Ts.log(Drop, `add diamond count ${val}`);
            ModuleService.getModule(DropManagerS).addDiamond(val);
            // RewardTipsManager.instance.getUI(this.type, val); // TODO: Check UI
            mw.Event.dispatchToClient(player, RewardTipsManager.EVENT_NAME_REWARD_TIPS_GET_UI, this.type, val);

        }
        this._moveToTween = new mw.Tween(targetPos).to(ownerPos, this._flyToPlayerTime)
            .onUpdate((value: mw.Vector) => {
                setPos(this.model, value);
            }).onComplete(() => {
                this.destroy();
                SoundManager.instance.play3DSound(GlobalData.Music.resourceEnterPlayer, getPos(this.model));
            }).start().easing(cubicBezier(this._flyToTweenBezier[0], this._flyToTweenBezier[1], this._flyToTweenBezier[2], this._flyToTweenBezier[3]));
    }

    public destroy() {
        this._isLand = false;
        this.canUpdate = false;
        this.isDestroy = true;
        this._landTime = 0;
        this.model.stop();
        this._gold = 0;
        this._diamond = 0;
        GameObjPool.despawn(this.model);
    }

}