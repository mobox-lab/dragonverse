import { EventDefine } from "../../const/EventDefine";
import PlayerInteractNpcEventArgs from "./trigger/PlayerInteractNpcEventArgs";
import { INpcElement, NpcConfig } from "../../config/Npc";
import DialogueManager, {
    isDialogueContentNodeHasNextId,
    validDialogueContentNodeId,
} from "../../gameplay/dialogue/DialogueManager";
import { GameConfig } from "../../config/GameConfig";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import GToolkit from "../../util/GToolkit";

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
    //#region Member
    private _eventListeners: EventListener[] = [];

    private _config: INpcElement;

    private _communicable: boolean = false;

    private _dialogueManager: DialogueManager;

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

    private _oriPos: Vector;
    private _oriRot: Rotation;

    private get dm() {
        if (!this._dialogueManager) {
            this._dialogueManager = DialogueManager.getInstance();
        }
        return this._dialogueManager;
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
        this._eventListeners.push(Event.addLocalListener(EventDefine.EnterNpcInteractRange, this.onEnterNpcInteractRange));
        this._eventListeners.push(Event.addLocalListener(EventDefine.LeaveNpcInteractRange, this.onLeaveNpcInteractRange));
        this._eventListeners.push(Event.addLocalListener(EventDefine.ShowNpcAction, this.showNpcAction.bind(this)));
        //#endregion ------------------------------------------------------------------------------------------

        this._npcCharacter = this.gameObject.getChildByName("mesh") as Character;
        this._oriPos = this._npcCharacter.worldTransform.position;
        this._oriRot = this._npcCharacter.worldTransform.rotation;
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();

        //#region Event Unsubscribe
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    //#endregion

    //#region Init
    public init(config: INpcElement): this {
        this._config = config;
        this._communicable = validDialogueContentNodeId(config.greetNodeId);

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
        const contentNodeConfig = GameConfig.DialogueContentNode.getElement(this._config.greetNodeId);
        if (!contentNodeConfig) {
            Log4Ts.error(NpcBehavior, `can not find content node config. id: ${this._config.greetNodeId}`);
            return;
        }

        const content = contentNodeConfig.content;
        const hasNextId: boolean = isDialogueContentNodeHasNextId(contentNodeConfig);
        const hasContent = !GToolkit.isNullOrEmpty(content);

        //#region 条件项 000 100 101
        if (!hasContent &&
            (hasNextId || !hasNextId && GToolkit.isNullOrEmpty(contentNodeConfig.interactNodeIds))
        ) {
            Log4Ts.error(NpcBehavior, `配置了一行无意义的 DialogueContentNode. id: ${contentNodeConfig.id}`);
            return;
        }
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
        //#region 条件项 001 010 011 110 111
        this.dm.chat(
            contentNodeConfig,
            !hasContent,
        );
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    };

    public onLeaveNpcInteractRange = (args: PlayerInteractNpcEventArgs) => {
        if (this._config.id !== args.id) return;
        if (!this._communicable) return;

        this.dm.exit(this._config.greetNodeId);


        if (this._currentAni) this._currentAni.stop();
    };

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

    public showNpcAction(actionId: number, npcId: number) {
        this.stopNpcAction();
        if (this._config.id === npcId) {
            let config = GameConfig.NPCAction.getElement(actionId);
            if (config.type === 1) {
                this._currentAni = this._npcCharacter.loadAnimation(config.ActionGuid);
                this._currentAni.loop = config.circulate ? 0 : 1;
                this._currentAni.play();
            } else if (config.type === 2) {
                this._currentStance = this._npcCharacter.loadSubStance(config.ActionGuid);
                this._currentStance.play();
            } else if (config.type === 3) {
                this._npcCharacter.collisionWithOtherCharacterEnabled = false;
                Player.localPlayer.character.movementEnabled = false;
                Player.localPlayer.character.jumpEnabled = false;

                this._npcCharacter.worldTransform.position = Player.localPlayer.character.worldTransform.position.add(Player.localPlayer.character.worldTransform.getForwardVector().multiply(config.v.z));
                let r = mw.Rotation.zero;
                mw.Rotation.add(Player.localPlayer.character.worldTransform.rotation, new mw.Rotation(config.r), r);
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
