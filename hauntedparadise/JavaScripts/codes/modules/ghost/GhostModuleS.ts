import { Behavior3Map } from "../../../behavior3Data/BehaviorMap";
import { GameConfig } from "../../../config/GameConfig";
import { IGhostInstanceElement } from "../../../config/GhostInstance";
import { CeHuaDefines } from "../../CehuaDefines";
import { LoadMgr } from "../../GamePlay/Framework/Tools/LoadManager";
import GameStart, { EGameTheme } from "../../GameStart";
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { CommonUtils } from "../../utils/CommonUtils";
import { ImpluseUpdater } from "../../utils/ImpuluseLimiter";
import ArchiveModuleS from "../archive/ArchiveModuleS";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";
import TimeModuleS from "../time/TimeModuleS";
import GhostBehavoirInst from "./GhostBehavoir";
import { GhostSettings, GhostEvents } from "./GhostDefine";
import GhostInst from "./GhostInst";
import { GhostModuleC } from "./GhostModuleC";
import { GhostPatrol } from "./GhostPatrol";

export class GhostModuleS extends ModuleS<GhostModuleC, null> {

    /** 所有鬼的集合 */
    private ghostMap: Map<string, GhostInst | GhostBehavoirInst> = new Map();

    /** 是否已经正常初始化过鬼了 */
    private ghostStarted: boolean = false;

    /** 击杀列表 */
    private killMap: Map<number, number> = new Map();

    private _ghostPlayerMap: Map<number, GhostBehavoirInst[]> = new Map();

    /** 每个鬼的实例的生成次数 */
    private _insCountMap: Map<number, number> = new Map();

    private _maxDay: number = 0;

    private _patrolArr: Vector[] = [];

    private _unUnsedChars: GhostBehavoirInst[] = [];

    private _patrolStartTime: number = -100;

    protected onStart(): void {
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            const allCfgs = GameConfig.GhostDay.getAllElement()
            this._maxDay = allCfgs[allCfgs.length - 1].id;
            setTimeout(() => {
                const timeModule = ModuleService.getModule(TimeModuleS)
                timeModule.nightAction.add(() => {
                    let curtime = TimeUtil.elapsedTime();
                    this._patrolStartTime = curtime;
                    this.getAllClient().net_spawnBigPatrol(curtime - this._patrolStartTime);
                    setTimeout(() => {
                        Player.getAllPlayers().forEach(e => {
                            this.playGhostSpawn(e);
                        });
                    }, CeHuaDefines.GhostPatrolStartTime * 1000);

                })
                timeModule.dayAction.add(() => {
                    this.ghostMap.forEach((e: GhostBehavoirInst) => {
                        if (e.enableKill) {
                            e.enable = false;
                            e.enableKill = false;
                            Navigation.stopNavigateTo(e.ghostChar);
                            Navigation.navigateTo(e.ghostChar, e.startPos);
                            setTimeout(() => {
                                this.despawnGhost(e);
                            }, 4000);
                        }
                    })
                    this.ghostMap.clear();
                    this._ghostPlayerMap.clear();
                })
            }, 20);
            setInterval(() => {
                if (this._patrolArr.length != 0) {
                    this.spawnPatrols();
                }
            }, 500)
        }
        GameConfig.GhostInstance.getAllElement().forEach(e => {
            if (e.treeName) {
                e.treeName = e.treeName.trim();
            }
        })
    }

    public net_syncPatrol() {
        let curtime = TimeUtil.elapsedTime();
        let diffTime = curtime - this._patrolStartTime;
        return diffTime;
    }

    protected onPlayerEnterGame(player: mw.Player): void {
        try {
            if (GameStart.GameTheme != EGameTheme.Graveyard) {
                this.startGame();
            }
        } catch (error) {
            console.error(error);
        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            if (this.killMap.has(player.playerId)) {
                this.killMap.delete(player.playerId);
            }
            if (this._ghostPlayerMap.has(player.playerId)) {
                this._ghostPlayerMap.get(player.playerId).forEach(e => {
                    this.despawnGhost(e);
                })
                this._ghostPlayerMap.delete(player.playerId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    /**
     * 玩家进入游戏
     */
    net_enterGame() {
        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            try {
                const timeModule = ModuleService.getModule(TimeModuleS);
                if (timeModule.isInNight) {
                    console.log("newplayerenter,spawnGhosts")
                    this.playGhostSpawn(this.currentPlayer);
                }
            } catch (error) {
                console.error(error);
            }
        }
    }

    private spawnPatrols() {
        this.getAllClient().net_spawnPatrol(CeHuaDefines.GhostDisEffect, this._patrolArr);
        this._patrolArr.length = 0;
    }

    private async playGhostSpawn(player: Player) {
        let day = await this.getCurDay(player.userId);
        let arr = [];
        if (day == -1) {
            console.log("当前玩家还没有day")
            return
        }
        for (let i = 0; i < GhostSettings.spawnGhostInsIds.length; i++) {
            let eleId = GhostSettings.spawnGhostInsIds[i];
            let insCfg = GameConfig.GhostInstance.getElement(eleId);
            if (!insCfg) {
                continue;
            }
            if (insCfg["treeName"] && Behavior3Map.has(insCfg["treeName"])) {
                this.spawnPlayerGhost(player, day, insCfg);
            }
        }
    }

    async spawnPlayerGhost(player: Player, day: number, insCfg: IGhostInstanceElement) {
        let playerId = player.playerId
        if (!this._ghostPlayerMap.has(playerId)) {
            this._ghostPlayerMap.set(playerId, []);
        }
        let ghostList = this._ghostPlayerMap.get(playerId);
        let ghost = await this.spawnGhost(insCfg) as GhostBehavoirInst;
        ghost.bindPlayerId = playerId;
        ghost.server_initGhost(insCfg.id, day);

        if (GameStart.GameTheme == EGameTheme.Graveyard) {
            let index = this._insCountMap.get(insCfg.id) || 0;
            index = index >= insCfg.patrols.length ? 0 : index;
            ghost.ghostChar.worldTransform.position = insCfg.patrols[index];
            this._insCountMap.set(insCfg.id, index + 1);
            ghost.reset(insCfg.patrols[index]);
        }
        else {
            ghost.reset(insCfg.patrols[0]);
        }

        ghostList.push(ghost);
        this.ghostMap.set(ghost.id, ghost);
        return ghost;
    }

    /**
     * 获得当前是第几天
     * @param userId 朋友的id
     * @returns 默认返回第一天。
     */
    private async getCurDay(userId: string) {
        const procedureScript = ProcedureModuleS.getScriptByUserID(userId);
        let archiveId = procedureScript.archiveID;
        if (archiveId === -1) {
            console.log("未注册存档")
            return -1;
        }
        let data = await ModuleService.getModule(ArchiveModuleS).net_reqArchiveData(userId, archiveId);
        let day = (data.aliveDay || 0) + 1;
        if (day > this._maxDay) {
            day = this._maxDay;
        }
        return day
    }

    despawnGhost(behavoir: GhostBehavoirInst) {
        if (!behavoir.ghostChar || !behavoir.ghostChar.worldTransform) {
            console.error("回收错误，鬼烂了")
            return;
        }
        this._patrolArr.push(behavoir.ghostChar.worldTransform.position);
        if (this._unUnsedChars.findIndex(e => {
            return e.ghostChar.gameObjectId == behavoir.ghostChar.gameObjectId
        }) != -1) {
            return;
        }
        this._unUnsedChars.push(behavoir);
        behavoir.ghostChar.setVisibility(PropertyStatus.Off);
        behavoir.bindPlayerId = 0;
        behavoir.enable = false;
        behavoir.targetId = 0;
        behavoir.enableKill = false;
        behavoir.enableTree = false;
        behavoir.ghostChar.complexMovementEnabled = false;
        behavoir.ghostChar.worldTransform.position = new Vector(7534, -6046, 400)
        behavoir.ghostChar.collisionWithOtherCharacterEnabled = false;
        this.ghostMap.delete(behavoir.ghostChar.gameObjectId);
    }

    /**
     * 游戏开始
     * @param difficulty 难度
     */
    async startGame() {
        if (this.ghostStarted) {
            console.log("鬼已经开始了");
            return;
        }
        this.ghostStarted = true;
        for (let i = 0; i < GhostSettings.spawnGhostInsIds.length; i++) {
            let eleId = GhostSettings.spawnGhostInsIds[i];
            let insCfg = GameConfig.GhostInstance.getElement(eleId);
            if (!insCfg) {
                continue;
            }
            if (insCfg["treeName"] && Behavior3Map.has(insCfg["treeName"])) {
                const ins = await this.spawnGhost(insCfg);
                ins.server_initGhost(eleId, 1);
                this.ghostMap.set(ins.id, ins);
            }
            else {
                const ghostInst = await this.spawnGhost();
                ghostInst.server_initGhost(eleId, 1);
                this.ghostMap.set(ghostInst.id, ghostInst);
            }
        }
    }

    /**
     * 生成鬼
     * @returns 
     */
    async spawnGhost(cfg?: IGhostInstanceElement) {
        if (this._unUnsedChars.length != 0 && cfg) {
            let ghost = this._unUnsedChars.pop();
            ghost.ghostChar.setVisibility(PropertyStatus.On, false);
            ghost.ghostChar.complexMovementEnabled = true;
            ghost.ghostChar.collisionWithOtherCharacterEnabled = true;
            ghost.enable = true;
            ghost.enableKill = true;
            ghost.enableTree = true;
            return ghost;
        }

        const npc = await LoadMgr.asyncSpawn("Character") as mw.Character;
        await npc.asyncReady();
        npc.displayName = "";
        const trigger = await LoadMgr.asyncSpawn("Trigger", { replicates: false }) as mw.Trigger;
        npc.attachToSlot(trigger, mw.HumanoidSlotType.Root);
        trigger.localTransform.position = (Vector.zero);
        trigger.localTransform.rotation = (Rotation.zero);
        trigger.worldTransform.scale = new Vector(1, 1, 1);
        if (cfg) {
            console.log("生成行为树鬼");
            const ghostInst = await mw.Script.spawnScript(GhostBehavoirInst, true, npc);
            ghostInst.id = npc.gameObjectId;
            ghostInst.ghostChar = npc;
            ghostInst._trigger = trigger;
            return ghostInst;
        }
        else {
            console.log("生成状态机鬼");
            const ghostInst = await mw.Script.spawnScript(GhostInst, true, npc);
            ghostInst.id = npc.gameObjectId;
            ghostInst.ghostChar = npc;
            ghostInst._trigger = trigger;
            return ghostInst;
        }


    }

    public checkCanKill(playerId: number) {
        let killTime = this.killMap.get(playerId) || 0
        if (killTime == 0) {
            return true;
        }
        if (killTime == -1) {
            return false;
        }
        return TimeUtil.elapsedTime() - killTime > 10;
    }

    public setPlayerCd(player: Player, cd: number = 0) {
        this.killMap.set(player.playerId, TimeUtil.elapsedTime() + cd);
    }

    net_protectedPlayer(isProtec: boolean) {
        this.protectedPlayer(this.currentPlayerId, isProtec);
    }

    public protectedPlayer(playerid: number, isProtec: boolean) {
        if (isProtec) {
            this.killMap.set(playerid, -1);
        }
        else {
            this.killMap.set(playerid, 0);
        }
    }

    public net_damageGhost(ghostGuid: string, damage: number, aniGuid: string, force: Vector) {
        if (!this.ghostMap.has(ghostGuid)) {
            return;
        }
        let targetId = this.currentPlayerId;
        let ins = this.ghostMap.get(ghostGuid) as GhostBehavoirInst;
        if (!ins.enableTree || !ins.enable) {
            return;
        }
        ins.takeDmg(damage, targetId);
        if (ins.checkHitAni()) {
            ins.playAni2(aniGuid, AnimSlot.Upper);
        }
        ImpluseUpdater.instance.addImpluse(ins.ghostChar, force);
    }

    public stopMov(char: Character) {
        if (!this.ghostMap.has(char.gameObjectId)) {
            return;
        }
        let ins = this.ghostMap.get(char.gameObjectId);
        ins.bindDir = null;
    }

    public net_setCd(cd: number) {
        this.setPlayerCd(this.currentPlayer, cd);
    }

    @Decorator.noReply()
    public net_clearGhost() {
        let playerId = this.currentPlayerId
        if (this._ghostPlayerMap.has(playerId)) {
            this._ghostPlayerMap.get(playerId).forEach(e => {
                this.despawnGhost(e);
            })
            this._ghostPlayerMap.delete(playerId);
        }
    }
}