import GToolkit from "../../util/GToolkit";
import { Quest } from "./Quest";
import Enumerable from "linq";
import FirePuzzleBlock, { FirePuzzleBlockTypes } from "../tiny-game-fire/FirePuzzleBlock";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { RoleModuleC } from "../../module/role/RoleModule";
import GameObject = mw.GameObject;
import { EventDefine } from "../../const/EventDefine";
import { QuestModuleC } from "../../module/quest/QuestModuleC";

interface FireBlockCompleteInfo {
    guid: string;

    complete: boolean;
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

    @FireDragonQuest.required
    private _cacheInfo: FireBlockCompleteInfo[];

    protected get progress(): number {
        return Enumerable
            .from(this._cacheInfo)
            .count(info => info.complete);
    }

    private _eventListeners: EventListener[] = [];

    private _blockMap: Map<string, FirePuzzleBlock> = new Map<string, FirePuzzleBlock>();
    private _roleModule: RoleModuleC = null;

    private get roleModule(): RoleModuleC | null {
        if (!this._roleModule) this._roleModule = ModuleService.getModule(RoleModuleC) ?? null;

        return this._roleModule;
    }

    protected onSerializeCustomData(customData: string) {
        if (customData) {
            this._cacheInfo = JSON.parse(customData);
        } else {
            this._cacheInfo = Enumerable
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
                .toArray();
        }
    }

    protected onInitialize(): void {
        super.onInitialize();

        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerEnterFirePuzzleBlock, this.onPlayerEnterFirePuzzleBlock));
        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerLeaveFirePuzzleBlock, this.onPlayerLeaveFirePuzzleBlock));
        this._eventListeners.push(Event.addServerListener(EventDefine.PlayerDestroyMagma, this.onPlayerDestroyMagma));

        Enumerable
            .from(this._cacheInfo)
            .forEach((info: FireBlockCompleteInfo) => {
                const script: FirePuzzleBlock = GToolkit.getFirstScript(GameObject.findGameObjectById(info.guid), FirePuzzleBlock);
                if (!script) {
                    Log4Ts.error(FireDragonQuest, `the FireBlockCompleteInfo in config has a wrong guid.`);
                    return;
                }
                if (info.complete) script.switchType(FirePuzzleBlockTypes.Water);
                this._blockMap.set(info.guid, script);
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
        const completeInfo = this._cacheInfo.find((value) => value.guid === guid);
        if (!completeInfo) {
            Log4Ts.error(FireDragonQuest, `complete info not found. guid: ${guid}`);
            return null;
        }
        return completeInfo;
    }

    private isWater(block: FirePuzzleBlock, completeInfo: FireBlockCompleteInfo): boolean {
        return block.originBlockType === FirePuzzleBlockTypes.Water ? true : completeInfo.complete;
    }

//#region Event Callback
    public onPlayerEnterFirePuzzleBlock = (guid: string, force: number) => {
        if (!this.checkRoleModuleValid()) return;
        const block = this.tryGetBlock(guid);
        if (!block) return;
        const completeInfo = this.tryGetCompleteInfo(guid);
        if (!completeInfo) return;
        if (this.isWater(block, completeInfo)) return;

        this.roleModule
            .controller
            ?.touchMagma(
                force,
                block.gameObject.worldTransform.position,
                guid);

    };

    public onPlayerLeaveFirePuzzleBlock = (guid: string, wetBuffDuration: number) => {
        if (!this.checkRoleModuleValid()) return;
        const block = this.tryGetBlock(guid);
        if (!block) return;
        const completeInfo = this.tryGetCompleteInfo(guid);
        if (!completeInfo) return;
        if (!this.isWater(block, completeInfo)) return;

        this.roleModule
            .controller
            ?.addWetBuff(wetBuffDuration * 1e3);
    };

    public onPlayerDestroyMagma = (guid: string) => {
        const block = this.tryGetBlock(guid);
        if (!block) return;

        Log4Ts.log(FirePuzzleBlock,
            `player touch magma. player id: ${Player.localPlayer.playerId}`,
            `player has wet buff.`);

        const info = this._cacheInfo.find(item => item.guid === guid);
        if (info) {
            info.complete = true;
            block.switchType(FirePuzzleBlockTypes.Water);
        } else {
            Log4Ts.log(FireDragonQuest, `cache info not found. guid: ${guid}`);
        }

        this.updateTaskProgress(JSON.stringify(this._cacheInfo));
    };

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}