/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-19 16:50:15
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-18 19:03:14
 * @FilePath     : \nevergiveup\JavaScripts\Modules\PlayerModule\PlayerScript.ts
 * @Description  : 修改描述
 */

import { PlayerActions, StageActions } from "../../Actions";
import { GameManager } from "../../GameManager";
import Utils from "../../Utils";
import { ILevelElement } from "../../config/Level";
import PlayerHeadUI_Generate from "../../ui-generate/Sundry/PlayerHeadUI_generate";
import { PlayerModuleS } from "./PlayerModuleS";
import { PlayerUtil } from "./PlayerUtil";
class HeadUI {
    /** 配置表中的数据 */
    config: ILevelElement;

    constructor(
        public uiWidget: mw.UIWidget,
        public ui: PlayerHeadUI_Generate,
        public playerId: number,
        public _playerName: string
    ) {}

    set playerName(name: string) {
        this._playerName = name;
        this.ui.playerName.text = name;
    }

    set title(title: string) {
        if (!this.ui) return;
        this.ui.title.text = title;
    }

    /**
     * 统一销毁ui和UIWidget
     */
    destroy() {
        this.ui.destroy();
        this.uiWidget.destroy();
        this.ui = null;
        this.uiWidget = null;
    }

    set visible(visible: boolean) {
        if (!this.uiWidget) return;
        this.uiWidget.setVisibility(visible ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
    }
}

@Component
export default class PlayerScript extends Script {
    @mw.Property({ replicated: true, onChanged: "onIdChanged", hideInEditor: true })
    public id: number = -1;

    @mw.Property({ replicated: true, onChanged: "onPlayerNameChanged", hideInEditor: true })
    public playerName: string = "default";

    @mw.Property({ replicated: true, onChanged: "onLevelChanged", hideInEditor: true })
    public level: number = 0;

    headUI: HeadUI;
    isDestroyed: boolean = false;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        this.init();
    }

    async init() {
        if (SystemUtil.isClient()) {
            StageActions.onStageCreated.add((id: number) => {
                this.onIdChanged();
            });

            StageActions.onStageEndClient.add((id: number) => {
                this.onIdChanged();
            });

            await this.playerReady();

            this.onIdChanged();
            let char = this.gameObject as Character;
            char.displayName = "";
            char.asyncReady().then(() => {
                if (
                    char &&
                    Player.localPlayer &&
                    Player.localPlayer.character &&
                    char.gameObjectId == Player.localPlayer.character.gameObjectId
                ) {
                    let name = mw.AccountService.getNickName()
                        ? mw.AccountService.getNickName()
                        : "PIE_" + Player.localPlayer.playerId;
                    this.setName(name);
                    GameManager.playerName = name;
                }
                char.displayName = "";
            });

            if (char && char.player && char.player.playerId != null) {
                PlayerUtil.setPlayerScript(char.player.playerId, this);
            }
        }
    }

    async playerReady() {
        while (this.gameObject == null || !(this.gameObject as Character).player) {
            await new Promise((resolve) => setTimeout(resolve, 100)); // 等待 0.1 秒
        }
        return true;
    }

    @mw.RemoteFunction(mw.Server)
    setName(name: string) {
        this.playerName = name;
        let player = (this.gameObject as Character).player;
        ModuleService.getModule(PlayerModuleS).changeExp(player, 0);
        ModuleService.getModule(PlayerModuleS).changeGold(player, 0);
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {}

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        console.log("onDestory");
        // if (this.headUI) {
        //     this.headUI.destroy();
        //     this.headUI = null;
        // }

        if (SystemUtil.isClient()) {
            let char = this.gameObject as Character;
            if (char.player) {
                PlayerUtil.deletePlayerScript(char.player.playerId);
            }
        }
    }

    async onIdChanged() {
        await this.playerReady();
        let char = this.gameObject as Character;
        if (char) {
            await char.asyncReady();
            if (
                Player.localPlayer &&
                Player.localPlayer.character &&
                char.gameObjectId == Player.localPlayer.character.gameObjectId
            )
                return;
            let stage = GameManager.getStageClient();
            let visible = false;
            if (this.id == -1) {
                visible = true;
            } else if (stage && stage.id == this.id) {
                visible = true;
            } else if (stage && stage.id != this.id) {
                visible = false;
            } else {
                visible = true;
            }
            TimeUtil.delayExecute(() => {
                if (this.headUI) {
                    this.headUI.visible = visible;
                }
                char.setVisibility(visible ? PropertyStatus.On : PropertyStatus.Off, true);
            }, 30);
        }
    }

    onPlayerNameChanged() {
        this.playerReady().then(() => {
            if (!this.headUI) {
                const ui = GameObject.spawn("UIWidget") as mw.UIWidget;
                const myUI = mw.UIService.create(PlayerHeadUI_Generate);
                ui.setTargetUIWidget(myUI.uiWidgetBase);
                ui.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
                let character = this.gameObject as Character;
                character.attachToSlot(ui, mw.HumanoidSlotType.Nameplate);
                ui.scaledByDistanceEnable = false;
                ui.hideByDistanceEnable = true;
                ui.headUIMaxVisibleDistance = 9000;
                ui.occlusionEnable = true;
                ui.drawSize = Utils.TEMP_VECTOR2.set(264, 110);
                ui.localTransform.position = Utils.TEMP_VECTOR.set(0, 0, -10);
                ui.setVisibility(mw.PropertyStatus.FromParent);
                myUI.playerName.text = this.playerName;
                this.headUI = new HeadUI(ui, myUI, character.player?.playerId, this.playerName);
            }

            this.headUI.playerName = this.playerName;
            this.onLevelChanged();
            this.onIdChanged();
            let char = this.gameObject as Character;
            if (char) {
                char.displayName = "";
            }
            PlayerActions.onPlayerNameChanged.call((this.gameObject as Character).player, this.playerName);
        });
    }

    onLevelChanged() {
        this.playerReady().then(() => {
            if (this.headUI) {
                this.headUI.title = `Lv.${this.level != undefined ? this.level : ""}`;
            }
            let char = this.gameObject as Character;

            if (char?.player?.playerId == Player.localPlayer?.playerId) {
                PlayerActions.onPlayerLevelChangedClient.call(this.level);
                PlayerActions.onPlayerLevelChangedClient2.call(this.level);
            }
        });
    }

    // onPlayerIdChanged() {
    //     let player = Player.getPlayer(this.playerId);
    //     this.gameObject = player.character;
    //     this.init();
    // }
}
