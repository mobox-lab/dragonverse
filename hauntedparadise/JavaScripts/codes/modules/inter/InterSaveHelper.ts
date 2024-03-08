/*
 * @Author       : dal
 * @Date         : 2024-01-11 16:35:57
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-04 16:29:03
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\inter\InterSaveHelper.ts
 * @Description  : 
 */
import { CommonUtils } from "../../utils/CommonUtils";
import { MapEx } from "../../utils/MapEx";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { ArchiveDataType, ArchiveHelper, ClueSaveData } from "../archive/ArchiveHelper";
import ArchiveModuleC from "../archive/ArchiveModuleC";
import { BagModuleS } from "../bag/BagModuleS";
import { EquipDefine } from "../equip/EquipDefine";
import { EquipModuleS } from "../equip/EquipModuleS";
import { ProcedureModuleC } from "../procedure/ProcedureModuleC";
import { ProcedureModuleS } from "../procedure/ProcedureModuleS";

export class InterSaveModuleC extends ModuleC<InterSaveModuleS, null> {
    public reqSaveInter(guid: string, statId: number) {
        this.server.net_saveInter(`${guid}`, statId);
    }

    public reqSaveInterAndUseItem(guid: string, statId: number) {
        this.server.net_saveInterAndUseItem(`${guid}`, statId);
        GhostTraceHelper.itemTrace(EquipDefine.curPlayerEquipItem.cfgId, 2);
    }

    public reqSavePasswd(key: string, passWd: string) {
        this.server.net_savePassWd(key, passWd);
    }

    public reqSaveInterAndAddItem(guid: string, statId: number, itemId: number, count: number, needSelect: boolean = true) {
        this.server.net_saveInterAndAddItem(`${guid}`, statId, itemId, count, needSelect);
    }

    reqSaveInterAndAddCurrency(key: string, currencyId: number) {
        //TODO:实际接入
    }

    reqDeleteClue(key: string) {
        this.server.net_deleteClue(Player.localPlayer.playerId, key);
    }
}

export class InterSaveModuleS extends ModuleS<InterSaveModuleC, null> {
    /**
     * @param pid 玩家id
     * @param key 线索的key
     */
    public static onClueDel: string = "evt_onClueDel";

    @Decorator.noReply()
    public async net_deleteClue(pid: number, key: string) {
        Event.dispatchToLocal(InterSaveModuleS.onClueDel, pid, key)
        const player = await Player.asyncGetPlayer(pid);
        let userId = player.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        if (!curData) {
            console.error("尝试保存不存在的东西")
            return;
        }
        MapEx.del(curData.clues, key);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.CLUES], [curData.clues]);
    }

    @Decorator.noReply()
    public async net_saveInterAndAddItem(guid: string, statId: number, itemId: number, count: number, needSelect: boolean = true) {
        let playerId = this.currentPlayerId;
        let userId = this.currentPlayer.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        MapEx.set(curData.interObjs, guid, statId);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.INTER], [curData.interObjs]);
        ModuleService.getModule(BagModuleS).net_reqAddItem(playerId, itemId, "", "", count, needSelect);
    }

    @Decorator.noReply()
    public async net_saveInterAndUseItem(guid: string, statId: number) {
        let playerId = this.currentPlayerId;
        let userId = this.currentPlayer.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        MapEx.set(curData.interObjs, guid, statId);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.INTER], [curData.interObjs]);
        ModuleService.getModule(EquipModuleS).net_useItem(playerId);
    }

    public async addClue(key: string, loc: Vector, assid: number) {
        let userId = this.currentPlayer.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        if (!curData) {
            console.error("尝试保存不存在的东西")
            return;
        }
        let data = new ClueSaveData();
        data.assid = assid;
        data.loc = CommonUtils.vec2Arr(loc);
        data.rot = [0, 0, 0];
        MapEx.set(curData.clues, key, data);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.CLUES], [curData.clues]);
    }

    @Decorator.noReply()
    public async net_saveInter(guid: string, statId: number) {
        let userId = this.currentPlayer.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        MapEx.set(curData.interObjs, guid, statId);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.INTER], [curData.interObjs]);
    }

    @Decorator.noReply()
    public async net_savePassWd(key: string, passWd: string) {
        let userId = this.currentPlayer.userId;
        let scipt = ProcedureModuleS.getScriptByUserID(userId);
        let curData = await ArchiveHelper.reqGetData(userId, scipt.archiveID);
        MapEx.set(curData.password, key, passWd);
        ArchiveHelper.reqSetData(userId, [ArchiveDataType.PASSWORD], [curData.password]);
    }
}

