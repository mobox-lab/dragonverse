/*
 * @Author       : dal
 * @Date         : 2023-11-16 17:34:47
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-19 11:39:00
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ProcedureData.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import GameStart from "../../GameStart";
import { MapEx } from "../../utils/MapEx";
import { ArchiveDataType, ArchiveHelper } from "../archive/ArchiveHelper";
import { DegreeType } from "../blackboard/BoardDefine";
import { ProcedureModuleS } from "./ProcedureModuleS";
import GlobalDataHelper from "./ui/GlobalDataHelper";


export default class ProcedureData extends Subdata {

    /** 已通过的关卡 */
    @Decorator.persistence()
    passedDegrees: number[] = [];

    passedDegreesAction: Action = new Action();

    /** 新解锁了难度需要保存下来在选难度时提示一下的 */
    @Decorator.persistence()
    newDegreeList: DegreeType[] = [];

    @Decorator.persistence()
    notebookMap: MapEx.MapExClass<boolean> = {};

    /** 笔记解锁的回调 */
    noteUnlockAction: Action = new Action();

    protected onDataInit(): void {
        if (!this.notebookMap) {
            this.notebookMap = {};
        }
    }

    /** 是否通过某种难度 */
    public isDegreePassed(degree: DegreeType) {
        return this.passedDegrees.includes(degree);
    }

    /**
     * 通过难度
     * @param degree
     */
    public passDegree(degree: DegreeType) {
        if (this.isDegreePassed(degree)) { return; }
        this.passedDegrees.push(degree);
        if (!GameStart.IsAPackage) {
            if (degree >= 2 && degree < 5) { this.unlockNewDegree(degree + 1) };
        }
        this.save(true);
        GlobalDataHelper.addPassNum(degree);
        this.passedDegreesAction.call(degree);
    }

    /** 解锁了一个新的难度 */
    public unlockNewDegree(newDegree: DegreeType) {
        this.newDegreeList.push(newDegree);
        this.save(true);
    }

    /** 从解锁难度列表中移除 */
    public removeNewDegree(degree: DegreeType) {
        this.newDegreeList.splice(this.newDegreeList.indexOf(degree), 1);
        this.save(true);
    }

    /** 看某一个笔记是否解锁 */
    public getNoteIsUnlockById(cfgId: number) {
        if (!MapEx.has(this.notebookMap, cfgId)) {
            MapEx.set(this.notebookMap, cfgId, false);
        }
        return MapEx.get(this.notebookMap, cfgId);
    }

    /** 根据存档来加载笔记 */
    public async loadNoteByArchive(userId: string) {
        // 加载前，先把存档清空
        MapEx.forEach(this.notebookMap, (k) => { MapEx.set(this.notebookMap, k, false) });
        this.save(true);
        // 加载存档
        const archiveData = await ArchiveHelper.reqGetData(userId, ProcedureModuleS.getScriptByUserID(userId).archiveID);
        archiveData.unlockedNotes.forEach(noteCfgId => {
            this.writeNoteByCfgId(noteCfgId);
        });
    }

    /** 根据配置来写笔记 */
    public writeNoteByCfgId(cfgId: number) {
        MapEx.set(this.notebookMap, cfgId, true);
        this.save(true);
        this.noteUnlockAction.call(cfgId);
    }

    /** 初始化笔记 */
    public initNote(userId: string, archiveId: number) {
        if (!this.notebookMap) {
            this.notebookMap = {};
        }
        MapEx.forEach(this.notebookMap, (k) => { MapEx.set(this.notebookMap, k, false) });
        this.save(true);

        // 解锁初始化默认的
        GameConfig.Global.defaultNoteIdList.array1d && GameConfig.Global.defaultNoteIdList.array1d.forEach(cfgID => this.unlockNote(cfgID, userId, archiveId));
    }

    /** 解锁一个笔记 */
    public async unlockNote(cfgId: number, userId: string, archiveId?: number) {
        if (archiveId === -1 || !archiveId) { archiveId = ProcedureModuleS.getScriptByUserID(userId).archiveID }
        let unlockedNotes: number[] = (await ArchiveHelper.reqGetData(userId, archiveId)).unlockedNotes;
        if (unlockedNotes.includes(cfgId)) { return; }
        unlockedNotes.push(cfgId);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.UNLOCKEDNOTES], [unlockedNotes]);
        this.writeNoteByCfgId(cfgId);
    }
}
