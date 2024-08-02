import GToolkit from "gtoolkit";
import LinearColor = mw.LinearColor;
import BigMapPlayerArrow_Generate from "../../ui-generate/map/BigMapPlayerArrow_generate";
import { HeadUIController } from "../../controller/HeadUIController";
import { calculatePositionRatioInMap } from "../map/MapPanel";
import Log4Ts from "mw-log4ts";
import { AdvancedTweenTask } from "../../depend/waterween/tweenTask/AdvancedTweenTask";
import Waterween from "../../depend/waterween/Waterween";
import GameServiceConfig from "../../const/GameServiceConfig";
import Gtk from "gtoolkit";

export default class BigMapPlayerArrow extends BigMapPlayerArrow_Generate {
    //#region Member
    public holdId: number = null;

    private _character: mw.Character;

    private _mapPosCache: mw.Vector2 = mw.Vector2.zero;

    private _showDetailTask: AdvancedTweenTask<number>;
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld UI Event

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;

        //#region Member init
        this._showDetailTask = Waterween
            .to(() => this.cnvPlayerInfo.renderOpacity,
                (val) => this.cnvPlayerInfo.renderOpacity = val,
                1,
                GameServiceConfig.MAP_PLAYER_DETAIL_SHOWN_DURATION,
                0)
            .restart(true);
        this.btnPlayerPointArrow.onHovered.add(() => this.showDetail(true));
        this.btnPlayerPointArrow.onUnhovered.add(() => this.showDetail(false));
        //#endregion ------------------------------------------------------------------------------------------

        //#region Widget bind
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event subscribe
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate() {
    }

    protected onShow() {
    }

    protected onHide() {
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Init
    public init(playerId: number): this {
        this.holdId = playerId;
        this._character = Player.getPlayer(this.holdId).character;
        this.imgPlayerPointArrow.imageColor
            = LinearColor.colorHexToLinearColor(
                this.holdId === Player.localPlayer.playerId ?
                    "#FFFFFFFF" :
                    "#00FFE7FF");

        return this;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region UI Behavior
    public update(cnvMapMeshSize: Vector2, offset: Vector2): boolean {
        if (!this._character) return false;
        try {
            this.cnvPlayerPointArrow.renderTransformAngle =
                GToolkit.isSelfCharacter(this.holdId) ?
                    Player.getControllerRotation().z - 90 :
                    this._character.worldTransform.rotation.z - 90;
            const positionRatioInMap = calculatePositionRatioInMap(this._character.worldTransform.position);
            this._mapPosCache.set(
                offset.x + positionRatioInMap.x * cnvMapMeshSize.x,
                offset.y + (1 - positionRatioInMap.y) * cnvMapMeshSize.y,
            );
            this.rootCanvas.position = this._mapPosCache;
        } catch (error) {
            Log4Ts.error(BigMapPlayerArrow, `error`);
            return false;
        }

    }

    private showDetail(enable: boolean) {
        if (enable) {
            this._showDetailTask.forward();
            let name = HeadUIController.getInstance().getNickNameByPlayerId(this.holdId);
            if (Gtk.isNullOrEmpty(name)) return;
            this.txtPlayerName.text = name;
        } else {
            this._showDetailTask.backward();
        }
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Event Callback
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}