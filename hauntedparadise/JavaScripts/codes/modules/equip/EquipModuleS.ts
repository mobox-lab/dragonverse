/*
 * @Author       : dal
 * @Date         : 2023-12-21 19:15:24
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-07 13:15:10
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\EquipModuleS.ts
 * @Description  : 
 */
import { GameConfig } from "../../../config/GameConfig";
import { BagDefine, BagItemData } from "../bag/BagDefine";
import { InterSaveModuleS } from "../inter/InterSaveHelper";
import { EquipModuleC } from "./EquipModuleC";
import EquipScirpt from "./EquipScript";
import { ItemS } from "./items/Item";


export class EquipModuleS extends ModuleS<EquipModuleC, null> {

    public clazzMap: Map<string, ItemS> = new Map<string, ItemS>();

    private _scriptMap: Map<number, EquipScirpt> = new Map();

    protected override onStart(): void {
        super.onStart();
        Event.addLocalListener(BagDefine.RemoveItemEvt, (playerId: number, bagData: BagItemData) => {
            let script = this._scriptMap.get(playerId);
            if (script && script.equipData && script.equipData.guid == bagData.guid && bagData.count <= 0) {
                script.equipData = null;
            }
        })

    }

    protected async onPlayerEnterGame(player: mw.Player) {
        try {
            if (!player || !player.character) {
                return;
            }
            let script = await Script.spawnScript(EquipScirpt, true, player.character);
            this._scriptMap.set(player.playerId, script);
        } catch (error) {

        }
    }

    protected onPlayerLeft(player: mw.Player): void {
        try {
            let scripts = this._scriptMap.get(player.playerId);
            this._scriptMap.delete(player.playerId);
            if (scripts) {
                scripts.destroy();
            }
        } catch (error) {

        }
    }

    public getPlayerEquip(playerId: number): number {
        let script = this._scriptMap.get(playerId);
        if (script && script.equipData) {
            return script.equipData.cfgId;
        }
        else {
            return -1;
        }
    }

    public net_equip(itemId: string) {
        let script = this._scriptMap.get(this.currentPlayerId);
        if (!script) {
            return;
        }
        if (!itemId) {
            script.equipData = null;
            return;
        }
        let itemData = BagDefine.GetItemData(this.currentPlayerId, itemId)
        if (!itemData) {
            return;
        }
        script.equipData = itemData;
    }

    public net_useItem(playerId: number, useCount: number = 1) {
        let script = this._scriptMap.get(playerId);
        if (script && script.equipData) {
            let guid = script.equipData.guid;
            let cfg = GameConfig.Item.getElement(script.equipData.cfgId);
            if (!cfg || cfg.isConsumable) {
                return BagDefine.RemoveItem(playerId, guid, useCount);
            }
        }
        else {
            return false;
        }
    }

    @Decorator.noReply()
    net_discardItem(key: string, fallPos: Vector) {
        let script = this._scriptMap.get(this.currentPlayerId);
        if (script && script.equipData) {
            let guid = script.equipData.guid;
            let cfg = GameConfig.Item.getElement(script.equipData.cfgId);
            if (!cfg.isCanDiscard) { return; }
            let discardCount = script.equipData.count;
            BagDefine.RemoveItem(this.currentPlayerId, guid);
            if (cfg.isCanPick) {
                ModuleService.getModule(InterSaveModuleS).addClue(key, fallPos, cfg.id);
                this.getClient(this.currentPlayer).net_insDisItem(key, cfg.prefab, fallPos, discardCount);
            }
        }
        else {
            return -1;
        }
    }

    @Decorator.noReply()
    public net_changeBrandTxt(txt: string) {
        let script = this._scriptMap.get(this.currentPlayerId);
        if (script && script.equipData) {
            script.brandTxt = txt;
        }
        else {
            return -1;
        }
    }

    /**
     * 玩家使用交互道具
     * @param itemID 
     * @param targetID 
     */
    public net_playerUseInteractItem(itemID: number, targetID: number) {
        this.getAllClient().net_notifyInteractEffect(itemID, this.currentPlayerId, targetID);
    }

}