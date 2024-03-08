/*
 * @Author: YuKun.Gao
 * @Date: 2023-11-13 15:15:52
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2023-11-13 15:52:45
 * @Description: file content
 * @FilePath: \hauntedparadise\JavaScripts\modules\Level\levelBase.ts
 */

import { MapEx } from "../../utils/MapEx";
import { ArchiveData } from "../archive/ArchiveHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import { InterSaveModuleC } from "../inter/InterSaveHelper";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { EmProcedureState } from "../procedure/const/EmProcedureState";
import { Event_LoadArchiveData } from "../procedure/const/Events";

@Component
export default class LevelBase extends mw.Script {

    private _isStared: boolean = false;

    private _lisnArr: EventListener[] = [];

    protected get keyHead(): string {
        return "";
    }

    private _isLoadingStart: boolean = false;

    private _cacheLoadData: ArchiveData;

    protected onStart(): void {

        if (SystemUtil.isClient()) {
            let module = ModuleService.getModule(ProcedureModuleC);
            if (module && module.myScript && module.myScript.state === EmProcedureState.Start) {
                if (!this._isStared) {
                    this._isStared = true;
                    this.onLevelStart();
                }
            }
            this._lisnArr.push(Event.addLocalListener(BoardHelper.BoardLoadingEvt, async () => {
                if (!this._isStared) {
                    this._isStared = true;
                    this._isLoadingStart = true;
                    await this.onLevelStart();
                    if (!this._isLoadingStart) {
                        this.onLoadData(this._cacheLoadData)
                        console.log("start loadcacheLoadData")
                    }
                    this._isLoadingStart = false;
                }
            }))
            this._lisnArr.push(Event.addLocalListener(Event_LoadArchiveData, (data: ArchiveData) => {
                if (this._isLoadingStart) {
                    this._cacheLoadData = data;
                    this._isLoadingStart = false;
                    console.log("need loadcacheLoadData")
                }
                else {
                    this.onLoadData(data);
                }
            }));
            this._lisnArr.push(Event.addLocalListener(BoardHelper.BoardClearEvent, () => {
                this.onReset();
            }));


        } else {
            this.onLevelStart();
        }

    }

    protected onDestroy(): void {
        this._lisnArr.forEach(e => {
            e.disconnect();
        })
        this._lisnArr.length = 0;
    }

    protected onLevelStart() {

    }

    protected addLocalListen(evtName: string, callback: (...params: any[]) => void) {
        this._lisnArr.push(Event.addLocalListener(evtName, callback));
    }

    protected addServerListen(evtName: string, callback: (...params: any[]) => void) {
        this._lisnArr.push(Event.addServerListener(evtName, callback));
    }
    protected addClientListen(evtName: string, callback: (player: Player, ...params: any[]) => void) {
        this._lisnArr.push(Event.addClientListener(evtName, callback));
    }

    save2Archive(statId: number) {
        ModuleService.getModule(InterSaveModuleC).reqSaveInter(this.getKey(), statId);
    }

    save2ArchiveAndUseItem(statId: number) {
        ModuleService.getModule(InterSaveModuleC).reqSaveInterAndUseItem(this.getKey(), statId);
    }

    save2ArchiveAndAddItem(statId: number, itemId: number, count: number, needSelect: boolean = true) {
        ModuleService.getModule(InterSaveModuleC).reqSaveInterAndAddItem(this.getKey(), statId, itemId, count, needSelect);
    }

    save2ArchiveAndAddCurrency(statId: number, itemId: number, count: number, needSelect: boolean = true) {
        ModuleService.getModule(InterSaveModuleC).reqSaveInterAndAddCurrency(this.getKey(), statId);
    }

    onLoadData(data: ArchiveData) {

    }

    getKey() {
        return this.keyHead + "_" + this.gameObject.gameObjectId;
    }

    getSaveStatId(data: ArchiveData): number {
        let isUnlock = MapEx.has(data.interObjs, this.getKey());
        if (!isUnlock) {
            return undefined;
        }
        return MapEx.get(data.interObjs, this.getKey())
    }

    onReset() {

    }
}