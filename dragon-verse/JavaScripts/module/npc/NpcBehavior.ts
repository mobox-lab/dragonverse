import { GameConfig } from "../../config/GameConfig";
import { INpcElement } from "../../config/Npc";
import { EventDefine } from "../../const/EventDefine";
import { HeadUIController, HeadUIType } from "../../controller/HeadUIController";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import i18n from "../../language/i18n";
import GToolkit from "../../util/GToolkit";
import PlayerInteractNpcEventArgs from "./trigger/PlayerInteractNpcEventArgs";
import GameServiceConfig from "../../const/GameServiceConfig";
import DialogifyManager from "../../depend/dialogify/DialogifyManager";
import {
    getInteractNodes,
    isDialogueContentNodeHasNextId,
    isValidDialogueContentNodeId,
} from "../../depend/dialogify/dialogify-config-reader/ADialogifyConfigReader";
import { MouseLockController } from "../../controller/MouseLockController";
import MainPanel from "../../ui/main/MainPanel";
import { CollectibleItemModuleC } from "../collectible-item/CollectibleItemModule";

/**
 * Npc.
 * Non Player Character.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
@Component
export default class NpcBehavior extends mw.Script {
    //#region Constant
    /**
     * 优先级比较器.
     * @param a
     * @param b
     * @return {number}
     */
    public static priorityCmp(a: NpcBehavior, b: NpcBehavior): number {
        if (!(a?.gameObject ?? null)) return 1;
        if (!(b?.gameObject ?? null)) return -1;
        const playerLocation = Player.localPlayer.character.worldTransform.position;
        return (
            a.gameObject.worldTransform.position.clone().subtract(playerLocation).sqrLength -
            b.gameObject.worldTransform.position.clone().subtract(playerLocation).sqrLength
        );
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Member
    private _eventListeners: EventListener[] = [];

    private _config: INpcElement;

    public get configId(): number {
        return this._config?.id ?? -1;
    }

    private _communicable: boolean = false;

    private _dialogifyManager: DialogifyManager;

    /**npc基础动画 */
    private _npcBasicAni: Animation;
    /**npc人物 */
    private _npcCharacter: Character;
    /**npc当前播的动画 */
    private _currentAni: Animation;
    /**npc当前的姿态 */
    private _currentStance: SubStance;
    /**玩家当前播放的动画 */
    private _currentPlayerAni: Animation;
    /**玩家当前的姿态 */
    private _currentPlayerStance: SubStance;
    /**npc初始位置 */
    private _oriPos: Vector;
    /**npc初始旋转 */
    private _oriRot: Rotation;
    /**翅膀特效 */
    private _wing: Effect;

    /**
     * 是否 正在交谈.
     * @type {boolean}
     */
    private _isTalking: boolean = false;

    private get dm() {
        if (!this._dialogifyManager) {
            this._dialogifyManager = DialogifyManager.getInstance();
        }
        return this._dialogifyManager;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onStart(): void {
        super.onStart();
        this.useUpdate = true;
        //#region Member init
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.EnterNpcInteractRange, this.onEnterNpcInteractRange),
        );
        this._eventListeners.push(
            Event.addLocalListener(EventDefine.LeaveNpcInteractRange, this.onLeaveNpcInteractRange),
        );
        this._eventListeners.push(Event.addLocalListener(EventDefine.ShowNpcAction, this.showNpcAction.bind(this)));
        this._eventListeners.push(
            Event.addLocalListener(DialogifyManager.LeaveDialogueEventName, () => {
                this._isTalking = false;
            }),
        );
        //#endregion ------------------------------------------------------------------------------------------

        this._npcCharacter = this.gameObject.getChildByName(GameServiceConfig.NPC_MESH_OBJECT_NAME) as Character;
        if (!this._npcCharacter) {
            Log4Ts.log(
                NpcBehavior,
                `there is no mesh object named ${GameServiceConfig.NPC_MESH_OBJECT_NAME} in prefab.`,
            );
            return;
        }
        GToolkit.safeSetDescription(this._npcCharacter, this._config.avatar);
        // 添加翅膀
        let wingGuid = this._config.wingGuid;
        let wingTransform = this._config.wingTransform;
        if (wingGuid && wingTransform) {
            mw.GameObject.asyncSpawn(wingGuid).then((go) => {
                this._wing = go as Effect;
                this._npcCharacter?.attachToSlot(this._wing, HumanoidSlotType.BackOrnamental);
                TimeUtil.delayExecute(() => {
                    this._wing.play();
                    this._wing.localTransform = new Transform(
                        new Vector(wingTransform[0][0], wingTransform[0][1], wingTransform[0][2]),
                        new Rotation(wingTransform[1][0], wingTransform[1][1], wingTransform[1][2]),
                        new Vector(wingTransform[2][0], wingTransform[2][1], wingTransform[2][2]),
                    );
                }, 10);
            });
        }

        this._oriPos = this._npcCharacter.worldTransform.position;
        this._oriRot = this._npcCharacter.worldTransform.rotation;
        // 随机放一个动作
        if (this._config) {
            let guids = this._config.basicActions;
            let random = MathUtil.randomInt(0, guids.length);
            this._npcBasicAni = this._npcCharacter.loadAnimation(guids[random]);
            this._npcBasicAni.loop = 0;
            this._npcBasicAni.play();
        }

        HeadUIController.getInstance().registerHeadUI(
            this._npcCharacter,
            HeadUIType.NPC,
            i18n.lan(GameConfig.RelateEntity.getElement(this._config.characterId)?.name ?? "null"),
            null,
            GameConfig.RelateEntity.getElement(this._config.characterId)?.name ?? "null",
        );
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();

        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    //#endregion

    //#region Init
    public init(config: INpcElement): this {
        this._config = config;
        this._communicable = isValidDialogueContentNodeId(config.greetNodeId);

        return this;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback

    /**
     * @privateRemarks 描述 对话内容节点的判定树.
     * @privateRemarks 条件桩 (nextId content interactNodeIds) 的空情况.
     */
    public onEnterNpcInteractRange = (args: PlayerInteractNpcEventArgs) => {
        if (this._config.id !== args.id) return;
        if (!this._communicable) return;

        this._npcBasicAni.stop();

        mw.UIService.getUI(MainPanel).enableNpc(this);
    };

    public onLeaveNpcInteractRange = (args: PlayerInteractNpcEventArgs) => {
        if (this._config.id !== args.id) return;
        if (!this._communicable) return;

        if (this._currentAni) this._currentAni.stop();
        this._npcBasicAni.play();

        mw.UIService.getUI(MainPanel).disableNpc(this);

        if (this._isTalking) {
            this.dm.exit();
            MouseLockController.getInstance().cancelMouseUnlock();
        }
    };

    public talkEnable() {
        return (getInteractNodes(GameConfig.DialogueContentNode.getElement(this._config.greetNodeId))?.length ?? 0) > 0;
    }

    public talkWith() {
        const talkId =
            getInteractNodes(GameConfig.DialogueContentNode.getElement(this._config.greetNodeId))?.[0] ?? null;
        // DV NPC 业务限制 招呼节点有且仅有一个交互节点
        if (isValidDialogueContentNodeId(talkId) === false) {
            Log4Ts.log(NpcBehavior, `npc could not be talked with. id: ${this._config.id}`);
            return;
        }

        const contentNodeConfig = GameConfig.DialogueContentNode.getElement(talkId);
        if (!contentNodeConfig) {
            Log4Ts.error(NpcBehavior, `can not find content node config. id: ${this._config.greetNodeId}`);
            return;
        }
        this._isTalking = true;

        const content = contentNodeConfig.content;
        const hasNextId: boolean = isDialogueContentNodeHasNextId(contentNodeConfig);
        const hasContent = !GToolkit.isNullOrEmpty(content);

        //#region 条件项 000 100 101
        if (
            !hasContent &&
            (hasNextId || (!hasNextId && GToolkit.isNullOrEmpty(contentNodeConfig.interactPredNodeIds)))
        ) {
            Log4Ts.error(NpcBehavior, `配置了一行无意义的 DialogueContentNode. id: ${contentNodeConfig.id}`);
            return;
        }
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        //#region 条件项 001 010 011 110 111
        this.dm.chat(contentNodeConfig, !hasContent);

        MouseLockController.getInstance().needMouseUnlock();
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    /**
     * @description: 结束npc交互动作
     */
    public stopNpcAction() {
        if (this._currentAni) {
            this._currentAni.stop();
            this._npcCharacter.worldTransform.position = this._oriPos;
            this._npcCharacter.worldTransform.rotation = this._oriRot;
            Player.localPlayer.character.movementEnabled = true;
            Player.localPlayer.character.jumpEnabled = true;
            this._npcCharacter.collisionWithOtherCharacterEnabled = true;
            this._currentAni = null;
        }
        if (this._currentStance) {
            this._currentStance.stop();
            this._currentStance = null;
        }
        if (this._currentPlayerAni) {
            this._currentPlayerAni.stop();
            this._currentPlayerAni = null;
        }
        if (this._currentPlayerStance) {
            this._currentPlayerStance.stop();
            this._currentPlayerStance = null;
        }
    }

    /**
     * @description: 开始npc交互动作
     * @param actionId 动作id
     * @param npcId npc id
     * @return
     */
    public showNpcAction(actionId: number, npcId: number) {
        this.stopNpcAction();
        if (this._config.characterId === npcId) {
            let config = GameConfig.NPCAction.getElement(actionId);
            if (config.type === 1) {
                this._currentAni = this._npcCharacter.loadAnimation(config.actionGuid);
                this._currentAni.loop = config.circulate ? 0 : 1;
                this._currentAni.play();
            } else if (config.type === 2) {
                this._currentStance = this._npcCharacter.loadSubStance(config.actionGuid);
                this._currentStance.play();
            } else if (config.type === 3) {
                this._npcCharacter.collisionWithOtherCharacterEnabled = false;
                Player.localPlayer.character.movementEnabled = false;
                Player.localPlayer.character.jumpEnabled = false;

                this._npcCharacter.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(
                    Player.localPlayer.character.worldTransform.getForwardVector().multiply(config.posOffset.z),
                );
                let r = mw.Rotation.zero;
                mw.Rotation.add(
                    Player.localPlayer.character.worldTransform.rotation,
                    new mw.Rotation(config.rotation),
                    r,
                );
                this._npcCharacter.worldTransform.rotation = r;
                this._currentAni = this._npcCharacter.loadAnimation(config.accectStance);
                this._currentAni.play();

                this._currentPlayerAni = Player.localPlayer.character.loadAnimation(config.sendStance);
                this._currentAni.onFinish.add(() => {
                    this._npcCharacter.worldTransform.position = this._oriPos;
                    this._npcCharacter.worldTransform.rotation = this._oriRot;
                    Player.localPlayer.character.movementEnabled = true;
                    Player.localPlayer.character.jumpEnabled = true;
                    // this._currentAni.stop();
                    this._npcCharacter.collisionWithOtherCharacterEnabled = true;
                });
                this._currentPlayerAni.play();
            } else if (config.type === 4) {
            }
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
