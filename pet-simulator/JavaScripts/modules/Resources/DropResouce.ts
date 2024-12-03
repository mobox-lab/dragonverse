import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../config/GameConfig";
import { GlobalEnum } from "../../const/Enum";
import { GlobalData } from "../../const/GlobalData";
import { oTraceError } from "../../util/LogManager";
import { cubicBezier, getPos, setPos } from "../../util/MoveUtil";
import { SoundManager } from "../../util/SoundManager";
import { RewardTipsManager } from "../UI/RewardTips";
import { PlayerModuleS } from "../Player/PlayerModuleS";
import Gtk, { GtkTypes, RandomGenerator } from "gtoolkit";
import ModuleService = mwext.ModuleService;
import Balancing from "../../depend/balancing/Balancing";
import Log4Ts from "mw-log4ts";

export class DropManagerC extends ModuleC<DropManagerS, null> {
    private _dropItems: DropInClient[] = [];

    public net_createDrop(params: DropGenerateParam[]) {

        const gun = Balancing.getInstance().tryGetGun("dropItemGeneration");
        let logged = false;

        for (const { startPos, endPos, type, value } of params) {
            gun.press(() => {
                let drop = new DropInClient();
                if (!logged) {
                    Log4Ts.log(DropManagerC,
                        `create drop at ${startPos} to ${endPos} with type ${type} and value ${value}.`,
                        `this is one of them.`);
                    logged = true;
                }
                drop.poolInit(startPos.clone(), endPos.clone(), type, value);
                this._dropItems.push(drop);
            });
        }

        gun.fire();
    }

    onUpdate(dt: number) {
        for (let i = this._dropItems.length - 1; i >= 0; --i) {
            const drop = this._dropItems[i];
            if (drop.timeout) {
                this._dropItems.splice(i, 1);
                drop.destroy();
            } else {
                drop.update(dt);
            }

        }
    }
}

export class DropManagerS extends ModuleS<DropManagerC, null> {
    private typeValue: Map<GlobalEnum.CoinType, number> = new Map();
    private _drops: Map<number, DropInServer[]> = new Map();

    private _clientDropCreateFunctionMap: Map<number, (params: DropGenerateParam[][]) => void> = new Map();

    protected onStart(): void {
        this.init();
    }

    init(): void {
        this.resetValue();
    }

    /**
     * 在当前坐标一圈为方向创建掉落
     * @param playerId
     * @param pos 当前坐标
     * @param type 掉落类型
     * @param allValue
     * @param count 掉落数量
     * @param isBigBox 是否是巨大宝箱
     */
    public createDrop(playerId: number,
        pos: mw.Vector,
        type: GlobalEnum.CoinType,
        allValue: number,
        count: number,
        isBigBox: boolean = false,
        logInfo?: { areaId: number, resType: number }): void {
        if (count <= 0 || allValue <= 0) return;
        let val = Math.ceil(allValue / count);
        let generates: DropInServer[] = [];
        let playerDrops: DropInServer[] = Gtk.tryGet(this._drops, playerId, () => []);
        let sameTypeDrops: DropInServer[] = undefined;
        let fullIndex = 0;
        while (allValue > 0) {
            let drop: DropInServer;
            if (playerDrops.length < GlobalData.SceneResource.dropItemMax) {
                drop = new DropInServer(playerId, 0, type);
                playerDrops.push(drop);
                generates.push(drop);
            } else {
                if (!sameTypeDrops) {
                    sameTypeDrops = playerDrops.filter(value => value.type == type);
                    let validLength = sameTypeDrops.length;
                    if (validLength < 0) {
                        drop = new DropInServer(playerId, allValue, type);
                        playerDrops.push(drop);
                        break;
                    } else {
                        val = Math.ceil(allValue / validLength);
                    }
                }

                drop = sameTypeDrops[fullIndex++];
            }
            let diff = Math.min(val, allValue);
            drop.value += diff;
            allValue -= diff;
        }
        const userId = Player.getPlayer(playerId)?.userId ?? '';
        Log4Ts.log(DropManagerS, `reward generate ${generates.length} drops for userid ${userId} at ${pos} with type ${type} and value ${val} areaid: ${logInfo?.areaId} resType: ${logInfo?.resType} #generate_drop`);
        let logged = false;

        Gtk.batchDo(
            generates.map(item => {
                let radiusSample = isBigBox ? GlobalData.DropAni.randomRadiusBig : GlobalData.DropAni.randomRadius;
                let radius = Gtk.random(radiusSample[0], radiusSample[1]);
                const angle = new RandomGenerator().randomCircle().handle(val => val * radius).toVector2();
                let startLoc = pos;
                const endLoc = new mw.Vector(startLoc.x + angle.x, startLoc.y + angle.y, pos.z + GlobalData.DropAni.resourceY); //地面高度
                if (!logged) {
                    Log4Ts.log(DropManagerS,
                        `create drop at ${startLoc} to ${endLoc} with type ${type} and value ${val}.`,
                        `this is one of them.`);
                    logged = true;
                }
                item.position = endLoc;

                return {
                    startPos: startLoc,
                    endPos: endLoc,
                    type,
                    value: item.value,
                };
            }),
            this._clientDropCreateFunctionMap.get(playerId),
            GtkTypes.Interval.Hz60,
            false,
        );
    }

    /**吸收增加金币间隔 */
    private _absorbInterval: number = 0.8;
    /**吸收增加金币时间 */
    private _absorbTime: number = 0;
    /**当前是否开始吸收金币 */
    private _isStartAbsorb: boolean = false;

    /**轮询 */
    public onUpdate(dt: number): void {
        Player.getAllPlayers().forEach((player) => {
            let drops: DropInServer[] = Gtk.tryGet(this._drops, player.playerId, () => []);

            for (let i = drops.length - 1; i >= 0; --i) {
                const drop = drops[i];
                if (drop.timeout || drop.update()) {
                    Gtk.remove(drops, drop, false);
                }
            }
        });

        for (const playerId of this._drops.keys()) {
            if (Gtk.isNullOrUndefined(Player.getPlayer(playerId))) {
                this._drops.delete(playerId);
            }
        }
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        super.onPlayerEnterGame(player);

        this._clientDropCreateFunctionMap.set(
            player.playerId,
            (params: DropGenerateParam[][]) => this
                .getClient(player.playerId)
                ?.net_createDrop(params.flat()));
    }

    protected onPlayerLeft(player: mw.Player): void {
        super.onPlayerLeft(player);
        this._clientDropCreateFunctionMap.delete(player.playerId);
    }

    /**重置金币钻石值 */
    private resetValue(): void {
        this.typeValue.set(GlobalEnum.CoinType.FirstWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.SecondWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.ThirdWorldGold, 0);
        this.typeValue.set(GlobalEnum.CoinType.Diamond, 0);
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

interface DropGenerateParam {
    startPos: mw.Vector,
    endPos: mw.Vector,
    type: GlobalEnum.CoinType,
    value: number
}

class DropItem {
    public autoDestroyTimer: number;

    public timeout: boolean = false;

    constructor() {
        this.autoDestroyTimer =
            mw.setTimeout(() => this.timeout = true, GtkTypes.Interval.PerMin * 10);
    }
}

/**
 * 服务端掉落物
 */
class DropInServer extends DropItem {
    public position: mw.Vector;

    constructor(public owner: number,
        public value: number,
        public type: GlobalEnum.CoinType) {
        super();
    }

    public update() {
        if (distanceAbsorb(
            this.owner,
            Player.getPlayer(this.owner).character,
            this.position,
        )) {
            const pms = ModuleService.getModule(PlayerModuleS);
            const userId = Player.getPlayer(this.owner).userId;
            let realValue = this.value;
            switch (this.type) {
                case GlobalEnum.CoinType.FirstWorldGold:
                case GlobalEnum.CoinType.SecondWorldGold:
                case GlobalEnum.CoinType.ThirdWorldGold:
                case GlobalEnum.CoinType.SummerGold:
                    pms.addGold(this.owner, realValue, this.type);
                    break;
                case GlobalEnum.CoinType.Diamond:
                    realValue *= GlobalData.LevelUp.moreDiamond(this.owner)
                    pms.addDiamond(this.owner, realValue);
                    break;
            }
            Log4Ts.log(DropInServer, 
                "absorbDropInServer" +
                " userId:" + userId +
                ` dropValue:${this.value}` +
                ` coinType:${GlobalEnum.CoinType[this.type]}` +
                ` moreDiamond:${GlobalData.LevelUp.moreDiamond(this.owner)}` +
                ` realAddValue:${realValue} #drop`
            );
            return true;
        }
        return false;
    }
}

/**
 * 客户端掉落物
 */
class DropInClient extends DropItem {
    constructor() {
        super();
    }

    public get type(): GlobalEnum.CoinType {
        return this._type;
    }

    private _type: GlobalEnum.CoinType;

    /**当前模型 */
    public model: mw.Effect = null;

    private maxDis(playerId: number): number {
        return GlobalData.DropAni.resourceToPlayer * GlobalData.LevelUp.levelRange(playerId);
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

    private _value: number;

    public async poolInit(targetPos: mw.Vector, endPos: mw.Vector, type: GlobalEnum.CoinType, value: number) {
        this.isDestroy = false;
        this._isStartJump = false;
        this._bonceTime = 0;
        this._landTime = 0;
        this.targetPos = targetPos;
        this._type = type;
        this._isLand = false;
        this._value = value;
        this.canUpdate = false;

        if (type == GlobalEnum.CoinType.FirstWorldGold) {
            let guid = GameConfig.Coins.getElement(1).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
        } else if (type == GlobalEnum.CoinType.SecondWorldGold) {
            let guid = GameConfig.Coins.getElement(3).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
        } else if (type == GlobalEnum.CoinType.ThirdWorldGold) {
            let guid = GameConfig.Coins.getElement(4).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
        } else if (type == GlobalEnum.CoinType.Diamond) {
            let guid = GameConfig.Coins.getElement(2).Effect;
            this.model = await SpawnManager.modifyPoolAsyncSpawn(guid, GameObjPoolSourceType.Asset);
        }
        setPos(this.model, targetPos);
        this.model.play();
        // this.model.loop = true;
        this.init(endPos);
        Log4Ts.log(DropInClient, `targetPos:${targetPos} endPos:${endPos} type:${type} value:${value}`);
    }

    /**移动tween */
    private _moveToTween: mw.Tween<mw.Vector> = null;

    private init(endPoint: mw.Vector): void {

        let heights = GlobalData.DropAni.heightRandoms;
        let height = MathUtil.randomFloat(heights[0], heights[1]);

        let dir = mw.Vector.subtract(endPoint, this.targetPos).normalized;

        const controlPoint = new mw.Vector((endPoint.x - this.targetPos.x) * 1 / 4 + this.targetPos.x,
            (endPoint.y - this.targetPos.y) * 1 / 4 + this.targetPos.y, this.targetPos.z + height); //飞行高度

        this._moveToTween = new mw.Tween(this.targetPos).to({
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
                if (value.z >= height) {
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
        this._moveToTween = new mw.Tween(startLoc).to({ x: endLoc.x, y: endLoc.y }, time)
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

        this._moveToTween = new mw.Tween(startPos).to({ z: startPos.z + height }, GlobalData.DropAni.bonceUpTime)
            .onUpdate((value: mw.Vector) => {
                setPos(this.model, value);
            }).onComplete((obj) => {
                this._moveToTween = new mw.Tween(obj).to({ z: this.targetPos.z + GlobalData.DropAni.resourceY }, GlobalData.DropAni.bonceDownTime)
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
    update(dt: number) {
        if (!this.canUpdate) return;
        // this.judgeDestroy(dt);
        if (this._isStartJump) {
            this.bonceUpdate(dt);
        }

        if (distanceAbsorb(
            Player.localPlayer.playerId,
            Player.localPlayer.character,
            getPos(this.model))) {
            this.flyToPlayer(getPos(this.model), Player.localPlayer.character.worldTransform.position);
            Log4Ts.log(DropInClient, `player ${Player.localPlayer.playerId} get ${this._value} ${this.type}`);
        }
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

    /**飞往tween贝塞尔 */
    private _flyToTweenBezier: number[] = GlobalData.DropAni.flyToPlayerBezier;
    /**飞往玩家的时间 */
    private _flyToPlayerTime: number = GlobalData.DropAni.flyToPlayerTime;

    /**飞向玩家 */
    public flyToPlayer(targetPos: mw.Vector, ownerPos: mw.Vector): void {
        this.canUpdate = false;
        this._isLand = false;
        this._moveToTween.stop();
        this._moveToTween = new mw.Tween(targetPos).to(ownerPos, this._flyToPlayerTime)
            .onUpdate((value: mw.Vector) => {
                setPos(this.model, value);
            }).onComplete(() => {
                if (this.type === GlobalEnum.CoinType.Diamond) {
                    RewardTipsManager.getInstance().getUI(this.type, this._value * GlobalData.LevelUp.moreDiamond(Player.localPlayer.playerId));
                } else if (this.type === GlobalEnum.CoinType.ThirdWorldGold
                    || this.type === GlobalEnum.CoinType.SecondWorldGold
                    || this.type === GlobalEnum.CoinType.FirstWorldGold
                    || this.type === GlobalEnum.CoinType.SummerGold) {
                    RewardTipsManager.getInstance().getUI(this.type, this._value * GlobalData.Buff.goldBuff);
                }
                ;
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
        // this._value = 0;
        // this._diamond = 0;
        // GameObjPool.despawn(this.model);
        this.model.destroy();
        clearTimeout(this.autoDestroyTimer);
        this.timeout = false;
    }

}

/**
 * 判断距离吸收.
 */
function distanceAbsorb(playerId: number, obj: GameObject, targetLoc: mw.Vector): boolean {
    let targetPos = obj.worldTransform.position;
    let dis = mw.Vector.distance(targetLoc, targetPos);
    // Log4Ts.log(distanceAbsorb, `distance with player ${playerId} is ${dis}`);
    return dis <=
        GlobalData.DropAni.resourceToPlayer
        * GlobalData.LevelUp.levelRange(playerId);
}