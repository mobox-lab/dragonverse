/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-20 16:43:56
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-21 13:46:28
 * @FilePath: \DragonVerse\JavaScripts\ui\map\MapPanel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MapPanel_Generate from "../../ui-generate/map/MapPanel_generate";
import GameServiceConfig from "../../const/GameServiceConfig";
import MainCurtainPanel from "../main/MainCurtainPanel";
import GToolkit from "../../util/GToolkit";
import { KeyboardManager } from "../../controller/KeyboardManager";

/**
 * 小地图 Panel.
 */
export class MapPanel extends MapPanel_Generate {

    private _sceneSize: mw.Vector2 = mw.Vector2.zero;

    private _character: mw.Character;

    /**
     * 玩家当前位置
     */
    private _curPos: mw.Vector = mw.Vector.zero;

    private _smallMapPos: mw.Vector2 = mw.Vector2.zero;

    private _iconSize: mw.Vector2;

    private _cnvOffsetSize: mw.Vector2 = mw.Vector2.zero;

    private _oriMiniMapSize: mw.Vector2;

    private _positionInMap: mw.Vector2 = mw.Vector2.zero;

    protected onAwake(): void {
        super.onAwake();
        this._sceneSize =
            new Vector2(
                GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.x - GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS.x,
                GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS.y - GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.y);

        this._iconSize = this.mSmallMineCanvas.size;
        this._oriMiniMapSize = this.mSmallMapCanvas.size;

        let cnvSize = this.mSmallCanvas.size;
        this._cnvOffsetSize.set(
            (cnvSize.x - this._iconSize.x) / 2,
            (cnvSize.y - this._iconSize.y) / 2,
        );

        this
            .btnMiniMap
            .onClicked
            .add(() => {
                Event.dispatchToLocal(
                    MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME,
                    () => {
                        this.showBigMap();
                        Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
                    });
            });

        this.btnMapClose
            .onClicked
            .add(() => Event.dispatchToLocal(
                MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME,
                () => {
                    this.showMiniMap();
                    Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
                }));
    }

    onShow() {
        this._character = Player.localPlayer.character;
        this.canUpdate = true;
    }

    onUpdate() {
        if (!this._character) return;
        this._curPos.set(this._character.worldTransform.position);
        this.calculatePositionRatioInMap();
        this.calculateMapPos();
    }

    public showBigMap() {
        GToolkit.trySetVisibility(this.cnvMap, true);
        GToolkit.trySetVisibility(this.cnvMiniMap, false);
    }

    public showMiniMap() {
        GToolkit.trySetVisibility(this.cnvMap, false);
        GToolkit.trySetVisibility(this.cnvMiniMap, true);
    }

    private calculateMapPos() {
        this._smallMapPos.set(
            -this._positionInMap.x * this._oriMiniMapSize.x + this.mSmallCanvas.size.x / 2,
            (this._positionInMap.y - 1) * this._oriMiniMapSize.y + this.mSmallCanvas.size.y / 2,
        );
        this.mSmallMapCanvas.position = this._smallMapPos;
        this.mSmallMineCanvas.renderTransformAngle = Player.getControllerRotation().z - 90;
    }

    private calculatePositionRatioInMap() {
        this._positionInMap.set(
            (GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.x - this._curPos.x) / this._sceneSize.x,
            (this._curPos.y - GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.y) / this._sceneSize.y,
        );
    }
}