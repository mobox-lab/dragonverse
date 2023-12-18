import GToolkit from "../../util/GToolkit";
import { Quest } from "./Quest";
import Enumerable from "linq";
import FirePuzzleBlock, { FirePuzzleBlockTypes } from "../fire-game/FirePuzzleBlock";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { RoleModuleC } from "../../module/role/RoleModule";
import { EventDefine } from "../../const/EventDefine";
import FireRewardPuzzle from "../fire-game/FireRewardPuzzle";
import { QuestStateEnum } from "../../module/quest/Config";
import GameObject = mw.GameObject;
import { GameConfig } from "../../config/GameConfig";
import AudioController from "../../controller/audio/AudioController";

interface FireBlockCompleteInfo {
    guid: string;

    complete: boolean;
}

interface FireDragonTaskInfo {
    blockTasks: FireBlockCompleteInfo[];

    reward: boolean;
}

@mw.Serializable
export class FirePuzzleBlockInfo {
    @mw.Property({displayName: "Puzzle Block Guid"})
    public guid: string = "";
}

@mw.Component
export default class FireDragonQuest extends Quest {
    @mw.Property({displayName: "Blocks", group: "Puzzle", tooltip: "谜题方块 Guid 列表"})
    private _blockInfos: FirePuzzleBlockInfo[] = [new FirePuzzleBlockInfo()];

    @mw.Property({displayName: "Reward Puzzle", group: "Puzzle", tooltip: "奖励点 Guid"})
    private _rewardPuzzleGuid: string = "";

    @mw.Property({displayName: "Magma explode", group: "Sound", tooltip: "岩浆爆炸 音效 Id"})
    private _explodeSoundId: number = 0;

    @mw.Property({displayName: "Magma destroy", group: "Sound", tooltip: "岩浆净化 音效 Id"})
    private _destroyMagmaSoundId: number = 0;

    @mw.Property({displayName: "Puzzle unlock", group: "Sound", tooltip: "谜题解锁 音效 Id"})
    private _unlockSoundId: number = 0;

    @FireDragonQuest.required
    private _cacheInfo: FireDragonTaskInfo;

    protected get progress(): number {
        return Enumerable
                .from(this._cacheInfo.blockTasks)
                .count(info => info.complete)
            + (this._cacheInfo.reward ? 1 : 0);
    }

    private _eventListeners: EventListener[] = [];

    private _blockMap: Map<string, FirePuzzleBlock> = new Map<string, FirePuzzleBlock>();

    private _rewardPuzzle: FireRewardPuzzle;

    private _roleModule: RoleModuleC = null;

    private get roleModule(): RoleModuleC | null {
        if (!this._roleModule) this._roleModule = ModuleService.getModule(RoleModuleC) ?? null;

        return this._roleModule;
    }

    protected onSerializeCustomData(customData: string) {
        if (customData) {
            this._cacheInfo = JSON.parse(customData);
        } else {
            this._cacheInfo = {
                reward: false,
                blockTasks: Enumerable
                    .from(this._blockInfos)
                    .where(info => !GToolkit.isNullOrEmpty(info.guid))
                    .selectMany(info => info.guid.split(","))
                    .distinct()
                    .select(guid => ({guid: guid, obj: GameObject.findGameObjectById(guid)}))
                    .where(info => {
                        if (!info.obj) {
                            Log4Ts.warn(FireDragonQuest, `FirePuzzleBlock object in scene not found. config guid: ${info.guid}`);
                            return false;
                        }
                        return true;
                    })
                    .select(info => {
                        const script = GToolkit.getFirstScript(info.obj, FirePuzzleBlock);
                        if (!script) {
                            Log4Ts.warn(FireDragonQuest, `FirePuzzleBlock in object not found. guid: ${info.guid}`);
                            return {
                                guid: info.guid,
                                complete: true,
                            };
                        }
                        return {
                            guid: info.guid,
                            complete: script.originBlockType === FirePuzzleBlockTypes.Water ? null : false,
                        };
                    })
                    .toArray(),
            };
        }
    }

    protected onInitialize(): void {
        super.onInitialize();

        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerEnterFirePuzzleBlock, this.onPlayerEnterFirePuzzleBlock));
        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerLeaveFirePuzzleBlock, this.onPlayerLeaveFirePuzzleBlock));
        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerDestroyMagma, this.onPlayerDestroyMagma));
        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerHurtByMagma, this.onPlayerHurtByMagma));

        Enumerable
            .from(this._cacheInfo.blockTasks)
            .forEach((info: FireBlockCompleteInfo) => {
                const script: FirePuzzleBlock = GToolkit.getFirstScript(GameObject.findGameObjectById(info.guid), FirePuzzleBlock);
                if (!script) {
                    Log4Ts.error(FireDragonQuest, `the FireBlockCompleteInfo in config has a wrong guid.`);
                    return;
                }
                if (info.complete) script.switchType(FirePuzzleBlockTypes.Water);
                this._blockMap.set(info.guid, script);
            });

        this._rewardPuzzle = GToolkit.getFirstScript(GameObject.findGameObjectById(this._rewardPuzzleGuid), FireRewardPuzzle);
        if (!this._rewardPuzzle) {
            Log4Ts.warn(FireDragonQuest, `there is no reward puzzle in scene.`);
            return;
        }

        this._rewardPuzzle.setup(
            this.status !== QuestStateEnum.Complete,
            Enumerable
                .from(this._cacheInfo.blockTasks)
                .count(info => info.complete)
            >= GameConfig.Task.getElement(this.taskId).count - 1,
        );
        this._rewardPuzzle.initSound(this._unlockSoundId);
        this._rewardPuzzle.onPlayerGetReward.add((param) => {
            this._cacheInfo.reward = true;
            this._rewardPuzzle.isOpened = false;
            this._rewardPuzzle.locked = false;
            this.updateTaskProgress(JSON.stringify(this._cacheInfo));
        });
    }

    onActivated(): void {
    }

    onComplete(): void {
    }

    public destroy(): void {
        super.destroy();

        this._eventListeners.forEach(value => value.disconnect());
    }

    private checkRoleModuleValid(): boolean {
        if (!this.roleModule) {
            Log4Ts.warn(FirePuzzleBlock, `role module is not ready.`);
            return false;
        }
        return true;
    }

    private tryGetBlock(guid: string): FirePuzzleBlock | null {
        const block = this._blockMap.get(guid);
        if (!block) {
            Log4Ts.error(FireDragonQuest, `block not found. guid: ${guid}`);
            return null;
        }
        return block;
    }

    private tryGetCompleteInfo(guid: string): FireBlockCompleteInfo | null {
        const completeInfo = this._cacheInfo.blockTasks.find((value) => value.guid === guid);
        if (!completeInfo) {
            Log4Ts.error(FireDragonQuest, `complete info not found. guid: ${guid}`);
            return null;
        }
        return completeInfo;
    }

    private isWater(block: FirePuzzleBlock, completeInfo: FireBlockCompleteInfo): boolean {
        return block.originBlockType === FirePuzzleBlockTypes.Water ? true : completeInfo.complete;
    }

    private addWetBuff(duration: number) {
        this.roleModule
            .controller
            ?.addWetBuff(duration * 1e3);
    }

//#region Event Callback
    public onPlayerEnterFirePuzzleBlock = (guid: string, force: number, wetBuffDuration: number) => {
        if (!this.checkRoleModuleValid()) return;
        const block = this.tryGetBlock(guid);
        if (!block) return;
        const completeInfo = this.tryGetCompleteInfo(guid);
        if (!completeInfo) return;
        if (this.isWater(block, completeInfo)) {
            this.addWetBuff(wetBuffDuration);
        } else {
            this.roleModule
                .controller
                ?.touchMagma(
                    force,
                    block.gameObject.worldTransform.position,
                    guid);
        }
    };

    public onPlayerLeaveFirePuzzleBlock = (guid: string, wetBuffDuration: number) => {
        if (!this.checkRoleModuleValid()) return;
        const block = this.tryGetBlock(guid);
        if (!block) return;
        const completeInfo = this.tryGetCompleteInfo(guid);
        if (!completeInfo) return;
        if (!this.isWater(block, completeInfo)) return;

        this.addWetBuff(wetBuffDuration);
    };

    public onPlayerDestroyMagma = (guid: string) => {
        const block = this.tryGetBlock(guid);
        if (!block) return;

        Log4Ts.log(FirePuzzleBlock,
            `player touch magma. player id: ${Player.localPlayer.playerId}`,
            `player has wet buff.`);

        const info = this._cacheInfo.blockTasks.find(item => item.guid === guid);
        if (info) {
            info.complete = true;
            block.switchType(FirePuzzleBlockTypes.Water);
            AudioController.getInstance().play(this._destroyMagmaSoundId);
        } else {
            Log4Ts.log(FireDragonQuest, `cache info not found. guid: ${guid}`);
        }

        this._rewardPuzzle.updateProgress(
            this.taskId,
            Enumerable
                .from(this._cacheInfo.blockTasks)
                .count(info => info.complete));
        this.updateTaskProgress(JSON.stringify(this._cacheInfo));
    };

    public onPlayerHurtByMagma = (guid: string) => {
        AudioController.getInstance().play(this._explodeSoundId);
    };

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}