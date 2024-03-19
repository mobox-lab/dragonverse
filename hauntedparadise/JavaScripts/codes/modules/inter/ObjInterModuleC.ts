import { PlayerManagerExtension, } from '../../Modified027Editor/ModifiedPlayer';
import { MainUI } from "../../ui/MainUI";
import { BoardHelper, BoardKeys } from '../blackboard/BoardDefine';
import { HandTrigger } from './HandTrigger';
import { ObjInterModuleS } from "./ObjInterModuleS";
import PickHud from './ui/PickHud';

export class ObjInterModuleC extends ModuleC<ObjInterModuleS, null> {
    //private _selecetedObj: mw.GameObject;

    private _selectedTrigger: HandTrigger;

    private _selectedDis: number = 0;

    private _ui: MainUI;

    private _triggerArr: HandTrigger[] = [];

    private _curIndex: number = 0;

    private _lastTriggerTime: number = 0;

    /** 能否发射线 */
    private enableLineTrace: boolean = true;

    protected onEnterScene(sceneType: number): void {
        this._ui = mw.UIService.getUI(MainUI);

        Event.addLocalListener("EnableLineTrace", (enable: boolean) => { this.enableLineTrace = enable; });
    }

    //#region  obsolute

    private _selecetedObj: GameObject;

    private _delay: number = 2;

    protected onUpdate(dt: number): void {
        if (!this.enableLineTrace) { return; }

        this._delay--;
        if (this._delay >= 0) {
            return;
        }
        this._delay = 10;
        const char = this.localPlayer.character;
        this.checkInterObject(char);
    }

    private _lineOffset: Vector2[] = [new Vector(0, 0), new Vector2(50, 50), new Vector2(-50, -50), new Vector2(50, -50), new Vector2(-50, 50)]

    private checkInterObject(char: mw.Character) {
        let viewPos = mw.getViewportSize().divide(2);
        //死亡状态不显示边框和UI吧
        if (BoardHelper.GetTargetKeyValue(BoardKeys.PlayerDeathState)) {
            this.resetSelectItem();
            return
        }
        for (let index = 0; index < this._lineOffset.length; index++) {
            let linePos = viewPos.clone().add(this._lineOffset[index]);
            //let viewPos = this._ui.getWhitePointPos();
            let res = ScreenUtil.getGameObjectByScreenPosition(linePos.x, linePos.y, 600, true, false);
            for (let index = 0; index < res.length; index++) {
                const element = res[index];
                if (PlayerManagerExtension.isCharacter(element.gameObject) || element.gameObject instanceof mw.Trigger || element.gameObject instanceof UIWidget) {
                    continue;
                }
                if (!element.gameObject) {
                    continue;
                }
                if (element.gameObject.tag == "interObj") {
                    if (this._selecetedObj && this._selecetedObj["interTag"] == element.gameObject["interTag"]) {
                        return;
                    }
                    this.resetSelectItem();
                    this._selecetedObj = element.gameObject;
                    this._selecetedObj["highFunc"] && this._selecetedObj["highFunc"](true);

                    // 如果是建筑item
                    if (this._selecetedObj["highFuncBuilding"]) {
                        if (this._selecetedObj["banHandUIView"] != null && this._selecetedObj["banHandUIView"] === false) {
                            this._selecetedObj["highFuncBuilding"](true);
                            UIService.getUI(PickHud).switch(true, this._selecetedObj);
                        } else {
                            // 一些可以交互的建筑如门
                            if (this._selecetedObj["highFunc"]) {
                                // 让它依然可以交互
                                UIService.getUI(MainUI).setHandVisible(true);
                            }
                        }
                    } else {
                        UIService.getUI(MainUI).setHandVisible(true);
                    }
                    return;
                }
                break;
            }
        }

        this.resetSelectItem();
    }

    private resetSelectItem() {
        if (this._selecetedObj) {
            this._selecetedObj["highFunc"] && this._selecetedObj["highFunc"](false);
            // 建筑item的特殊处理
            if (this._selecetedObj["highFuncBuilding"]) {
                if (this._selecetedObj["banHandUIView"] != null && this._selecetedObj["banHandUIView"] === false) {
                    this._selecetedObj["highFuncBuilding"](false);
                    UIService.getUI(PickHud).switch(false, this._selecetedObj);
                } else {
                    if (this._selecetedObj["highFunc"]) {
                        // 让它依然可以交互
                        UIService.getUI(MainUI).setHandVisible(false);
                    }
                }
            } else {
                UIService.getUI(MainUI).setHandVisible(false);
            }
            this._selecetedObj = null;
        }
    }

    /*** 持续点击触发 */
    public longClickTriggerItem() {
        if (this._selecetedObj) {
            this._selecetedObj["longClickInterFunc"] && this._selecetedObj["longClickInterFunc"]();
        }
    }

    public triggerSelectItem() {
        let curTIme = TimeUtil.elapsedTime();
        if (curTIme - this._lastTriggerTime < 0.5) {
            console.error("操作过于频繁")
            return;
        }
        this._lastTriggerTime = curTIme;
        if (this._selecetedObj) {
            this._selecetedObj["interFunc"] && this._selecetedObj["interFunc"]();
            // 触发建筑的交互方法
            this._selecetedObj["interBuildFun"] && this._selecetedObj["interBuildFun"]();
        }
    }
    //#endregion

    public reqSyncCatEvt() {
        this.server.net_reqSyncCatEvt();
    }
}