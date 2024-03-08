import { BlackBoardModuleS } from "../../blackboard/BlackBoardModuleS";
import { CatHeadModuleS, CatHeadRunEvt, CatHeadStopEvt } from "../../catHead/CatHeadModule";
import { CatPlayerData } from "../../catHead/CatPlayerData";
import { PlayerInterModuleS } from "../../inter/PlayerInterModule";
import { GhostAniState, GhostLogicState } from "../GhostDefine";
import GhostInst from "../GhostInst";
import { GhostBananeEvt } from "./ClientGhostCheckCom";
import { GhostComDefine } from "./GhostComDefine";
import { BaseGhostCom } from "./base/IGhostCom";

/**
 * 基础巡逻组件
 */
export class GhostPoilotCom extends BaseGhostCom {
    private _prePos: Vector;

    private _cachePosArr: Vector[] = [];

    protected waitTimer: number = 0;

    /** 是否定时往玩家哪里走 */
    private isHang2Player: number = 0;

    public constructor(ctl: GhostInst) {
        super(ctl);
        Event.addLocalListener(GhostBananeEvt, (guid: string, targetPos: Vector) => {
            if (guid != this.ctl.ghostChar.gameObjectId) {
                return;
            }
            this.waitTimer = 0;
            this.ctl.stopAni();
            Navigation.stopNavigateTo(this.ctl.ghostChar);
            Navigation.navigateTo(this.ctl.ghostChar, targetPos, 40, () => {
                this.onReachPoint(true, true);
            }, () => {
                console.log("香蕉没被丢到寻路区域内，只能呆呆的看着它。" + targetPos)
                this.ctl.ghostChar.lookAt(targetPos);
                this.onReachPoint(true, true);
            });
            console.log("收到香蕉事件，要去寻找香蕉");
        })
        this.isHang2Player = this.ctl._cfg.isHang2Player;
    }

    onEnter() {
        this._prePos = null;
        let insCfg = this.ctl._insCfg;
        this._cachePosArr = insCfg.patrols.slice(0);
        this.waitTimer = 0;
        this.ctl.logicStateTimer = 9999;
        if (this._cachePosArr.length == 1) {
            this.waitTimer = 0.1;
        }
        else {
            this.onReachPoint(true, true);
        }
    }

    onExit(): void {
        Navigation.stopFollow(this.ctl.ghostChar);
        Navigation.stopNavigateTo(this.ctl.ghostChar);
    }

    protected findNext() {
        if (this.isHang2Player && Player.getAllPlayers().length > 0) {
            Navigation.stopFollow(this.ctl.ghostChar);
            let rd = MathUtil.randomInt(0, 100);
            if (rd < this.isHang2Player) {
                this.hang2Player();
                return;
            }
        }
        if (this._cachePosArr.length == 1) {
            Navigation.navigateTo(this.ctl.ghostChar, this._cachePosArr[0], 10, () => {

            }, () => {
                console.error("[GhostChar]不能移动到目标点位" + this.ctl.cfgId + ":" + this._cachePosArr[0])
                this.ctl.ghostChar.worldTransform.position = this._cachePosArr[0];
            });
            return;
        }
        let charPos = this.ctl.ghostChar.worldTransform.position;
        this._cachePosArr.forEach(e => {
            e["charDis"] = Vector.distance(e, charPos);
        })
        this._cachePosArr.sort((a, b) => {
            return a["charDis"] - b["charDis"];
        });
        let min = Math.min(15, this._cachePosArr.length);
        let rd = MathUtil.randomInt(0, min);
        if (this._prePos) {
            this._cachePosArr.push(this._prePos);
        }

        this._prePos = this._cachePosArr[rd];

        if (this._cachePosArr.length > 1) {
            this._cachePosArr.splice(rd, 1);
        }
        console.log("目前随机找了一个点去巡逻");
        Navigation.navigateTo(this.ctl.ghostChar, this._prePos, 50, () => {
            this.onReachPoint(true);
        }, () => {
            this.onNavFailed();
            this.waitTimer = 4;
            console.error("[GhostChar]不能移动到目标点位" + this.ctl.cfgId + ":" + this._prePos)
        });
    }

    hang2Player() {
        let players = Player.getAllPlayers();
        let rd = MathUtil.randomInt(0, players.length);
        let targetPlayer = players[rd];
        this.waitTimer = 4;
        Navigation.navigateTo(this.ctl.ghostChar, targetPlayer.character.worldTransform.position, 200)
        console.log("目前随机找了一个人跟随" + targetPlayer.playerId);
    }

    onUpdate(dt: number) {
        if (this.waitTimer > 0) {
            this.waitTimer -= dt;
            if (this.waitTimer <= 0) {
                this.findNext();
            }
        }
    }

    onNavFailed() {

    }

    onReachPoint(isPlayAni: boolean, isSurePlay: boolean = false) {
        let rd = isSurePlay ? 100 : MathUtil.randomInt(0, 100);
        if (isPlayAni && rd > 90) {
            Navigation.stopNavigateTo(this.ctl.ghostChar);
            this.waitTimer = 4;
            this.ctl.playAni("watchAni")
        }
        else {
            this.waitTimer = 0.1;
        }
        console.log("[GhostChar]移动任务完成" + this.ctl.cfgId)
    }
}

export class GhostCarHangCom extends GhostPoilotCom {
    private _handItem: GameObject;

    private _isHandItem: boolean = false;

    private _findDis: number = 0;

    private _isFinding: boolean = false;

    private _findCount: number = 0;

    onEnter(): void {
        this._findCount = 0;
        super.onEnter();
        if (!this._handItem) {
            GameObject.asyncSpawn(this.ctl._cfg.hangParams[1], { replicates: true }).then(this.catchItem.bind(this))
        }
        this._isFinding = false;
        this._findDis = Number(this.ctl._cfg.hangParams[0])
    }

    onExit(): void {
        super.onExit();
        if (this._isHandItem) {
            this._isHandItem = false;
            this._handItem.parent = null;
            console.log("放下物品")
        }
        this.ctl.moveAniGroup = GhostAniState.Normal;
        console.log("hangexit")
    }

    catchItem(go: GameObject) {
        this._handItem = go;
        this._isHandItem = true;
        this.ctl.ghostChar.attachToSlot(go, HumanoidSlotType.Root);
        go.localTransform.position = Vector.zero;
        go.localTransform.rotation = Rotation.zero;
        this.ctl.moveAniGroup = GhostAniState.PushCar;
        console.log("捡起来了垃圾桶")
    }



    onUpdate(dt: number): void {
        super.onUpdate(dt);
        if (this._findCount == 0) {
            return;
        }
        this.checkCycle();
    }

    private checkCycle() {
        if (this._isFinding) {
            return;
        }
        if (!this._isHandItem && this._handItem) {
            const dis = Vector.distance(this._handItem.worldTransform.position, this.ctl.ghostChar.worldTransform.position);
            if (dis < this._findDis) {
                this._isFinding = true;
                console.log("它要去寻找它丢失的垃圾桶")
                this.waitTimer = 0;
                Navigation.stopNavigateTo(this.ctl.ghostChar);
                Navigation.navigateTo(this.ctl.ghostChar, this._handItem.worldTransform.position, 100, () => {
                    this.onReachPoint(false);
                    this._isFinding = false;
                    this.catchItem(this._handItem);
                }, () => {
                    this.waitTimer = 4;
                    console.error("[GhostChar]不能移动到目标点位" + this.ctl.cfgId + ":" + this._handItem.worldTransform.position)
                });
            }
        }
    }

    protected findNext(): void {
        this._findCount++;
        super.findNext();
        this.checkCycle();
    }
}

/**
 * 闲逛完回家就消失的鬼
 */
export class GhostHangVisCom extends GhostPoilotCom {

    onEnter(): void {
        this.ctl.logicStateTimer = 9999;
        if (this.ctl.chaseArray.length != 0) {
            this.ctl.logicSM.switch(GhostLogicState.Chase);
        } else {
            this.ctl.setEnable(false);
            super.onEnter();
        }

    }

    onReachPoint(isPlayAni: boolean): void {
        this.ctl.setEnable(false);
        this.ctl.ghostChar.worldTransform.position = this.ctl._insCfg.patrols[0];
    }

    onNavFailed(): void {
        this.ctl.setEnable(false)
    }
}

/**
 * 猫猫头鬼
 */
export class GhostCatHeadHangCom extends GhostPoilotCom {

    private _chaseCheckTimer: number = 0;

    private _catData: CatPlayerData;

    public constructor(ctl: GhostInst) {
        super(ctl);
        Event.addLocalListener(CatHeadRunEvt, (ghostId: number, catData: CatPlayerData) => {
            if (ghostId != this.ctl.cfgId) {
                return;
            }
            this._catData = catData;
            this.ctl.setEnable(true);
        })
        Event.addLocalListener(CatHeadStopEvt, (ghostId: number) => {
            if (ghostId != this.ctl.cfgId) {
                return;
            }
            this.ctl.setEnable(false);
        })
    }
    onEnter(): void {
        if (!this._catData) {
            this.ctl.setEnable(false);
        }
    }

    onUpdate(dt: number): void {
        super.onUpdate(dt);
        this._chaseCheckTimer += dt;
        if (this._chaseCheckTimer <= 0.5) {
            return;
        }
        this._chaseCheckTimer = 0;
        let catModule = ModuleService.getModule(CatHeadModuleS);
        const playerArr: Player[] = [];
        const ghostPos = this.ctl.ghostChar.worldTransform.position;
        this._catData.entryPlayerIds.forEach(e => {
            let player = Player.getPlayer(e);
            if (!player) {
                return;
            }
            playerArr.push(player);
            player["ghostHangTempDis"] = Vector.distance(ghostPos, player.character.worldTransform.position);
        });

        playerArr.sort((a, b) => {
            return a["ghostHangTempDis"] - b["ghostHangTempDis"];
        })

        for (let index = 0; index < playerArr.length; index++) {
            const playerId = playerArr[index].playerId;
            let isSafe = catModule.getIsPlayerSafe(playerId);
            if (!isSafe) {
                let board = ModuleService.getModule(BlackBoardModuleS);
                this.ctl.server_startChase(playerId, board.reqGetBoardValue(board.reqGetBoardValue(playerId)))
                return;
            }
        }
    }
}

/**
 * 闪现巡逻组件
 */
export class GhostFlashCom extends BaseGhostCom {
    private _cacheIndex: number = 0;

    private _cachePosArr: Vector[] = [];

    protected waitTimer: number = 0;

    private _enterTrigger: Trigger;

    private _leaveTrigger: Trigger;

    private _enterPlayers: number[] = [];

    private _flashInterval: number = 0;

    public constructor(ctl: GhostInst) {
        super(ctl);
    }

    onEnter() {
        let insCfg = this.ctl._insCfg;
        this._cachePosArr = insCfg.patrols.slice(0);
        this.waitTimer = 0;
        this.ctl.ghostChar.maxWalkSpeed = 10000;
        this.ctl.ghostChar.maxAcceleration = 10000;
        this.ctl.logicStateTimer = 9999;
        this.onReachPoint();
        this.ctl.ghostChar.setCollision(PropertyStatus.On, true);
        let hangParams = this.ctl._cfg.hangParams;
        if (!this._enterTrigger) {
            this.initTrigger(hangParams);
            this._flashInterval = Number(hangParams[2]);
        }
    }

    private async initTrigger(params: string[]) {
        this._enterTrigger = await GameObject.asyncFindGameObjectById(params[0]) as Trigger;
        this._enterTrigger.onEnter.add((char: Character) => {
            if (!(char instanceof Character) || !char.player) {
                return;
            }
            let index = this._enterPlayers.indexOf(char.player.playerId)
            if (index == -1) {
                this._enterPlayers.push(char.player.playerId);
            }
            if (this._enterPlayers.length == 1) {
                this._cacheIndex = 0;
            }
            this.ctl.setEnable(true);
            this.findNext();
        })

        this._leaveTrigger = await GameObject.asyncFindGameObjectById(params[1]) as Trigger;
        this._leaveTrigger.onLeave.add((char: Character) => {
            if (!(char instanceof Character) || !char.player) {
                return;
            }
            let index = this._enterPlayers.indexOf(char.player.playerId)
            if (index != -1) {
                this._enterPlayers.splice(index, 1);
            }
        })

        Player.onPlayerLeave.add((player: Player) => {
            let index = this._enterPlayers.indexOf(player.playerId)
            if (index != -1) {
                this._enterPlayers.splice(index, 1);
            }
        })
    }

    onExit(): void {
        Navigation.stopNavigateTo(this.ctl.ghostChar);
    }

    protected findNext() {
        console.log(this._cachePosArr);
        if (this._cacheIndex >= this._cachePosArr.length) {
            this._cacheIndex = 0;
        }
        this.ctl.ghostChar.worldTransform.position = this._cachePosArr[this._cacheIndex];
        this._cacheIndex++;
        // this.ctl.ghostChar.addMovement(Vector.forward);
        this.onReachPoint();
        for (let index = 0; index < this._enterPlayers.length; index++) {
            const element = this._enterPlayers[index];
            let player = Player.getPlayer(element);
            if (!player) {
                continue;
            }
            this.ctl.ghostChar.lookAt(player.character.worldTransform.position);
        }
    }

    onUpdate(dt: number) {
        if (!this.ctl.enableKill) {
            return;
        }
        if (this.ctl.logicState == GhostLogicState.Killing) {
            return;
        }
        if (this._enterPlayers.length == 0) {
            this.ctl.setEnable(false);
        }
        if (this.waitTimer > 0) {
            this.waitTimer -= dt;
            if (this.waitTimer <= 0) {
                this.findNext();
            }
        }
    }

    onNavFailed() {

    }

    onReachPoint() {
        this.waitTimer = this._flashInterval;
        console.log("[GhostChar]移动任务完成" + this.ctl.cfgId);
    }
}

export class GhostRandomHang extends BaseGhostCom {
    protected waitTimer: number = 0;

    onEnter() {
        console.log("enter randomHang casual");
        this.ctl.setCasualConfigs();
        this.ctl.logicStateTimer = 9999;
        this.findNext();
    }

    onUpdate(dt: number) {
        if (this.waitTimer > 0) {
            this.waitTimer -= dt;
            if (this.waitTimer <= 0) {
                this.findNext();
            }
        }
    }


    private findNext() {
        Navigation.stopFollow(this.ctl.ghostChar);
        Navigation.stopNavigateTo(this.ctl.ghostChar);
        const rd = Math.random();
        if (rd > 0.5) {
            this.serverRandomHang();
        }
        else {
            this.hang2Player();
        }
    }

    hang2Player() {
        this.waitTimer = 4;
        let players = Player.getAllPlayers();
        let rd = MathUtil.randomInt(0, players.length);
        let targetPlayer = players[rd];
        Navigation.navigateTo(this.ctl.ghostChar, targetPlayer.character.worldTransform.position, 200)
        console.log("目前随机找了一个人跟随" + targetPlayer.playerId);
    }

    serverRandomHang() {
        const startPos = this.ctl.ghostChar.worldTransform.position;
        // 以点为圆心，在范围内随机生成一个点
        // 生成随机角度（弧度制）
        const randomAngle = Math.random() * 2 * Math.PI;

        // 生成随机距离（半径范围内,在500=1500内随机生成）

        const randomDistance = MathUtil.randomInt(500, 1500);

        // 计算点的坐标
        const x = startPos.x + randomDistance * Math.cos(randomAngle);
        const y = startPos.y + randomDistance * Math.sin(randomAngle);
        let targetPos = new Vector(x, y, startPos.z);
        let dir = Vector.subtract(targetPos, startPos);

        let hitResult = QueryUtil.lineTrace(startPos, targetPos, true);
        hitResult = hitResult.filter((hit) => {
            return !((hit.gameObject instanceof mw.Character) || (hit.gameObject instanceof mw.Trigger));
        })
        if (hitResult.length > 0) {
            targetPos = Vector.add(startPos, Vector.subtract(hitResult[0].impactPoint, startPos).multiply(0.8));
        }
        console.log("server random hang", targetPos);
        this.waitTimer = 15;
        Navigation.navigateTo(this.ctl.ghostChar, targetPos, 50, () => {
            console.log("random hang success")
            setTimeout(() => {
                this.serverRandomHang();
            }, 200);
        }, () => {
            console.log("random hang failed")
            setTimeout(() => {
                this.serverRandomHang();
            }, 200);
        });
    }

    onExit(): void {
        Navigation.stopFollow(this.ctl.ghostChar);
        Navigation.stopNavigateTo(this.ctl.ghostChar);
    }
}

GhostComDefine.serverGhostHangComMap.set(1, GhostPoilotCom);
GhostComDefine.serverGhostHangComMap.set(2, GhostCarHangCom);
GhostComDefine.serverGhostHangComMap.set(3, GhostHangVisCom);
GhostComDefine.serverGhostHangComMap.set(4, GhostCatHeadHangCom);
GhostComDefine.serverGhostHangComMap.set(5, GhostFlashCom);
GhostComDefine.serverGhostHangComMap.set(6, GhostRandomHang);