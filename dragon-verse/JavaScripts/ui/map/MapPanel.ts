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
import BigMapPlayerArrow from "../main/BigMapPlayerArrowPanel";
import { FlowTweenTask } from "../../depend/waterween/tweenTask/FlowTweenTask";
import Waterween from "../../depend/waterween/Waterween";
import Easing, { CubicBezier, CubicBezierBase } from "../../depend/easing/Easing";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import MwBehaviorDelegate from "../../util/MwBehaviorDelegate";
import KeyOperationManager, { IKeyInteractive } from "../../controller/key-operation-manager/KeyOperationManager";
import { MouseLockController } from "../../controller/MouseLockController";
import tipLandMap_Generate from "../../ui-generate/map/tipLandMap_generate";
import { GameConfig } from "../../config/GameConfig";
import i18n from "../../language/i18n";
import Gtk from "../../util/GToolkit";

const sceneSize: mw.Vector2 = mw.Vector2.zero;

/**
 * 小地图 Panel.
 */
export class MapPanel extends MapPanel_Generate implements IKeyInteractive {

    private _character: mw.Character;

    /**
     * 玩家当前位置
     */
    private _curPos: mw.Vector = mw.Vector.zero;

    private _miniMapPosCache: mw.Vector2 = mw.Vector2.zero;

    private _oriMiniMapSize: mw.Vector2;

    private _arrowMap: Map<number, BigMapPlayerArrow> = new Map();

    private _mapScaleTask: FlowTweenTask<number>;

    private _mapScaleCache: mw.Vector2 = mw.Vector2.zero;

    private _mapPosTask: FlowTweenTask<{ x: number, y: number }>;

    private _mapPositionCache: mw.Vector2 = mw.Vector2.zero;

    private _updateDelegate: MwBehaviorDelegate;

    private _mapTips: tipLandMap_Generate[] = [];

    protected onAwake(): void {
        super.onAwake();
        this.canUpdate = true;
        sceneSize.set(
            GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.x - GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS.x,
            GameServiceConfig.MAP_SCENE_AS_MAP_RIGHT_TOP_POS.y - GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.y);

        this._oriMiniMapSize = this.mSmallMapCanvas.size;

        this._mapScaleTask = Waterween
            .flow(
                () => this.cnvMapMesh.renderScale.x,
                (val) => this.cnvMapMesh.renderScale = this._mapScaleCache.set(val, val),
                GameServiceConfig.MAP_ZOOM_DURATION,
                new CubicBezier(0.2, 0, 0.8, 1),
                undefined,
                true,
                true,
            );

        this._mapPosTask = Waterween
            .flow(
                () => ({ x: this.cnvMapMesh.position.x, y: this.cnvMapMesh.position.y }),
                (val) => this.cnvMapMesh.position = this._mapPositionCache.set(val.x, val.y),
                GameServiceConfig.MAP_ZOOM_DURATION,
                new CubicBezier(0.2, 0, 0.8, 1),
                undefined,
                true,
                true,
            );

        this
            .btnMiniMap
            .onClicked
            .add(() => {
                // Event.dispatchToLocal(
                //     MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME,
                //     () => {
                //         this.showBigMap();
                //         Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
                //     });
                this.showBigMap();
            });

        this.btnMapClose
            .onClicked
            .add(() => {
                // Event.dispatchToLocal(
                //     MainCurtainPanel.MAIN_SHOW_CURTAIN_EVENT_NAME,
                //     () => {
                //         this.showMiniMap();
                //         Event.dispatchToLocal(MainCurtainPanel.MAIN_HIDE_CURTAIN_EVENT_NAME);
                //     })
                this.showMiniMap();
            });

        this.showMiniMap();

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.W, () => {
            this.move(0, GameServiceConfig.MAP_MOVE_PER_DIST);
            Log4Ts.log(MapPanel, `w`);
        });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.A, () => {
            this.move(GameServiceConfig.MAP_MOVE_PER_DIST, 0);
            Log4Ts.log(MapPanel, `A`);
        });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.S, () => {
            this.move(0, -GameServiceConfig.MAP_MOVE_PER_DIST);
        });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.D, () => {
            this.move(-GameServiceConfig.MAP_MOVE_PER_DIST, 0);
        });

        KeyOperationManager.getInstance().onKeyPress(this, mw.Keys.W, () => { });
        KeyOperationManager.getInstance().onKeyPress(this, mw.Keys.A, () => { });
        KeyOperationManager.getInstance().onKeyPress(this, mw.Keys.S, () => { });
        KeyOperationManager.getInstance().onKeyPress(this, mw.Keys.D, () => { });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.R, () => {
            this.cnvMapMesh.renderTransformPivot = new Vector2(0, 0);
            this.cnvMapMesh.renderScale = new Vector2(1, 1);
            this.cnvMapMesh.position = new Vector2(0, 0);
        });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.MouseScrollUp, () => {
            this.zoom(this.cnvMapMesh.renderScale.x + GameServiceConfig.MAP_ZOOM_PER_DIST, mw.getMousePositionOnPlatform());
        });

        KeyOperationManager.getInstance().onKeyDown(this, mw.Keys.MouseScrollDown, () => {
            this.zoom(this.cnvMapMesh.renderScale.x - GameServiceConfig.MAP_ZOOM_PER_DIST, mw.getMousePositionOnPlatform());
        });

        this._updateDelegate = GToolkit.addRootScript(MwBehaviorDelegate);
        this._updateDelegate.delegate.add(() => {
            if (!this._character) return;
            this._curPos.set(this._character.worldTransform.position);
            this.calculateMiniMapPos();
            this.calculateMapPos();
        });
        this._updateDelegate.run();

        for (let i = 0; i < this.markCanvas.getChildrenCount(); i++) {
            this._imgs.push(this.markCanvas.getChildAt(i) as Image);
        }

        for (let i = 0; i < 3; i++) {
            let ui = UIService.create(tipLandMap_Generate);
            ui.uiObject.visibility = SlateVisibility.SelfHitTestInvisible;
            ui.uiObject.renderOpacity = 0;
            this._mapTips.push(ui);
            this.rootCanvas.addChild(ui.uiObject);
        }
    }

    onShow() {
        this._character = Player.localPlayer.character;
        this.canUpdate = true;
    }

    onHide() {

    }

    onUpdate() {
        // KeyOperationManager.getInstance()["_hoverController"].drawTree();
    }


    keyEnable(): boolean {
        return this.cnvMap.visible;
    }

    private _imgs: Image[] = [];

    public showBigMap() {
        GToolkit.trySetVisibility(this.cnvMap, true);
        GToolkit.trySetVisibility(this.cnvMiniMap, false);

        MouseLockController.getInstance().needMouseUnlock();

        this.btnMapClose.addKey(Keys.Escape);

        this._imgs.forEach(element => {
            let usedTipsUI: tipLandMap_Generate;
            if (GameConfig.LandMark.findElement("uiName", element.name) === undefined) return;
            KeyOperationManager.getInstance().onWidgetEnter(element, () => {
                for (let i = 0; i < 3; i++) {
                    let ui = this._mapTips[i];
                    if (ui.uiObject.renderOpacity > 0) continue;
                    usedTipsUI = ui;
                    //之前可能有渐隐动画停了
                    actions.tweens.stopAllByTarget(usedTipsUI.uiObject);
                    actions.tween(usedTipsUI.uiObject)
                        .set({ renderOpacity: 0 })
                        .to(GameServiceConfig.MAP_PLAYER_DETAIL_SHOWN_DURATION, { renderOpacity: 1 })
                        .union()
                        .start();
                    ui.uiObject.position = Gtk.getUiResolvedPosition(element).add(new Vector2(50, 0));
                    ui.textDescribe.text = i18n.lan(GameConfig.LandMark.findElement("uiName", element.name)?.description);
                    break;
                }
            });
            KeyOperationManager.getInstance().onWidgetLeave(element, () => {
                //先把之前的动画停了
                actions.tweens.stopAllByTarget(usedTipsUI.uiObject);
                actions.tween(usedTipsUI.uiObject)
                    .set({ renderOpacity: 1 })
                    .to(GameServiceConfig.MAP_PLAYER_DETAIL_SHOWN_DURATION, { renderOpacity: 0 })
                    .union()
                    .start();
            });
        });

    }


    public showMiniMap() {
        MouseLockController.getInstance().cancelMouseUnlock();

        GToolkit.trySetVisibility(this.cnvMap, false);
        GToolkit.trySetVisibility(this.cnvMiniMap, true);
        this._imgs.forEach(element => {
            KeyOperationManager.getInstance().unregisterMouse(element);
        });
    }

    private calculateMiniMapPos() {
        const positionRatioInMap = calculatePositionRatioInMap(this._character.worldTransform.position);
        this._miniMapPosCache.set(
            -positionRatioInMap.x * this._oriMiniMapSize.x + this.mSmallCanvas.size.x / 2,
            (positionRatioInMap.y - 1) * this._oriMiniMapSize.y + this.mSmallCanvas.size.y / 2,
        );
        this.mSmallMapCanvas.position = this._miniMapPosCache;
        this.mSmallMineCanvas.renderTransformAngle = Player.getControllerRotation().z - 90;
    }

    private calculateMapPos() {
        if (this.cnvMap.renderOpacity === 0) return;

        const allPlayers = Player.getAllPlayers();

        for (const player of allPlayers) {
            const id = player.playerId;
            let ui = this._arrowMap.get(id);
            if (!ui) {
                ui = UIService.create(BigMapPlayerArrow).init(id);
                this.cnvMapPlayerArrowContainer.addChild(ui.uiObject);
                this._arrowMap.set(id, ui);
            }
            if (ui.update(
                this.cnvMapMesh.size.multiply(this.cnvMapMesh.renderScale),
                this.cnvMapMesh.position,
            )) {
                this._arrowMap.delete(id);
            }
        }
        for (const key of this._arrowMap.keys()) {
            if (allPlayers.findIndex(item => item.playerId === key) < 0) {
                this._arrowMap.get(key).destroy();
                this._arrowMap.delete(key);
            }
        }
    }

    private move(offsetX: number, offsetY: number) {
        const currentPos = this.cnvMapMesh.position.clone();
        const target = currentPos.set(currentPos.x + offsetX, currentPos.y + offsetY);
        target.set(
            Easing.clamp(target.x, this.cnvMapMesh.size.x * (1 - this.cnvMapMesh.renderScale.x), 0),
            Easing.clamp(target.y, this.cnvMapMesh.size.y * (1 - this.cnvMapMesh.renderScale.x), 0),
        );
        this._mapPosTask.to(target);
    }

    private zoom(scale: number, mouseAbsPos: mw.Vector2) {
        if (!GToolkit.isPlatformAbsoluteInWidget(mouseAbsPos, this.cnvMapHolder)) return;
        scale = Easing.clamp(
            scale,
            GameServiceConfig.MAP_BIG_MAP_MIN_ZOOM,
            GameServiceConfig.MAP_BIG_MAP_MAX_ZOOM);
        if (this.cnvMapMesh.renderScale.x === scale) return;

        Log4Ts.log(MapPanel, `map zoom to ${scale}, current: ${this.cnvMapMesh.renderScale.x}`);
        const mouseInMapRatio = mouseAbsPos
            .subtract(
                this.cnvMapMesh
                    .cachedGeometry
                    .getAbsolutePosition())
            .divide(getViewportScale())
            .divide(this.cnvMapMesh.size.multiply(this.cnvMapMesh.renderScale));
        const originScale = this.cnvMapMesh.renderScale;
        const mouseOffset = mouseInMapRatio.clone().multiply(originScale)
            .subtract(mouseInMapRatio.multiply(scale))
            .multiply(this.cnvMapMesh.size);
        const targetPos = this.cnvMapMesh.position.clone().add(mouseOffset);
        targetPos.x = Easing.clamp(targetPos.x, this.cnvMapMesh.size.x * (1 - scale), 0);
        targetPos.y = Easing.clamp(targetPos.y, this.cnvMapMesh.size.y * (1 - scale), 0);

        this._mapPosTask.to(targetPos);
        this._mapScaleTask.to(scale);
    }
}

const positionRatioInMap: mw.Vector2 = mw.Vector2.zero;

export function calculatePositionRatioInMap(currentPosition: mw.Vector): Vector2 {
    positionRatioInMap.set(
        (GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.x - currentPosition.x) / sceneSize.x,
        (currentPosition.y - GameServiceConfig.MAP_SCENE_AS_MAP_LEFT_DOWN_POS.y) / sceneSize.y,
    );
    return positionRatioInMap;
} 