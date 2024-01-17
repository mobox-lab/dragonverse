import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";
import { EEquipEvents_S, EEquipPartType, EPlayerEvents_S } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { EquipModuleC } from "./EquipModuleC";
import { EquipModuleData } from "./EquipModuleData";
import EquipSync from "./EquipSync";










export class EquipModuleS extends ModuleS<EquipModuleC, EquipModuleData>
{

    private _equipSyncMap: Map<number, EquipSync> = new Map();

    protected onStart(): void {
        EventManager.instance.add(EEquipEvents_S.equip_checkEquipRemove_s, this.listen_checkEquipRemove, this);
    }

    private listen_checkEquipRemove(pId: number, itemId: number) {
        this.removeEquip(pId, itemId, true);
    }


    protected onPlayerLeft(player: mw.Player): void {
        let pId = player.playerId;
        if (this._equipSyncMap.has(pId) == false) {
            return;
        }

        this._equipSyncMap.get(pId).destroy();
        this._equipSyncMap.delete(pId);
    }


    protected async onPlayerEnterGame(player: mw.Player) {

        let pId = player.playerId;

        if (this._equipSyncMap.has(pId)) {
            return;
        }

        let playerData = this.getPlayerData(player);

        let newScript = await mw.Script.spawnScript(EquipSync, true);
        this._equipSyncMap.set(pId, newScript);

        let partIds = [];
        for (const key in EEquipPartType) {

            let partType = Number(key);
            if (isNaN(partType)) {
                continue;
            }

            if (MapEx.has(playerData.equipData, partType)) {
                let equipId = MapEx.get(playerData.equipData, partType);
                partIds.push(equipId);
            } else {
                partIds.push(0);
            }

        }


        // 延迟下 ，客户端才会收到同步信息
        setTimeout(() => {
            newScript.server_init(pId, partIds);
        }, 0);

    }

    /**
     * 同步玩家装备数据
     * @param pId 玩家id
     * @param partType 部位类型
     * @param equipId 装备id
     */
    private async changeEquip(pId: number, partType: EEquipPartType, equipId: number) {
        if (this._equipSyncMap.has(pId) == false || partType == EEquipPartType.killEff) {
            return;
        }

        this._equipSyncMap.get(pId).server_setEquipId(partType, equipId);
    }

    /**
     * 添加装备
     */
    @Decorator.noReply()
    public net_addEquip(itemId: number) {
        let addEquipCfg = GameConfig.Equip.getElement(itemId);
        if (addEquipCfg == null) return;

        let playerData = this.currentData;

        if (MapEx.has(playerData.equipData, addEquipCfg.type)) {
            let preEquipId = MapEx.get(playerData.equipData, addEquipCfg.type);
            //fix:卡没属性翅膀bug
            //let preEquipCfg = GameConfig.Equip.getElement(preEquipId);
            //if (preEquipCfg&&addEquipCfg.attrType && addEquipCfg.attrType.length > 0) {
            EventManager.instance.call(EPlayerEvents_S.player_recalculateEquip, this.currentPlayerId, false, preEquipId);
            //}
        }

        MapEx.set(playerData.equipData, addEquipCfg.type, itemId);   // 添加装备到数据
        playerData.save(false);

        this.changeEquip(this.currentPlayerId, addEquipCfg.type, itemId);

        if (!addEquipCfg.attrSwitch) return;
        //if (addEquipCfg.attrType && addEquipCfg.attrType.length > 0) {
        EventManager.instance.call(EPlayerEvents_S.player_recalculateEquip, this.currentPlayerId, true, itemId);
        //}
    }

    /**移除装备 */
    @Decorator.noReply()
    public net_removeEquip(itemId: number) {
        this.removeEquip(this.currentPlayerId, itemId);
    }

    /**移除玩家装备 */
    private removeEquip(pId: number, itemId: number, async: boolean = false) {
        let removeEquipCfg = GameConfig.Equip.getElement(itemId);
        if (removeEquipCfg == null) return;

        let playerData = this.getPlayerData(pId);
        if (playerData == null) return;
        if (MapEx.has(playerData.equipData, removeEquipCfg.type) == false) {
            return;
        }

        let curEquipId = MapEx.get(playerData.equipData, removeEquipCfg.type);
        if (curEquipId != itemId) {
            return;
        }

        MapEx.del(playerData.equipData, removeEquipCfg.type);   // 移除装备
        playerData.save(async);

        this.changeEquip(pId, removeEquipCfg.type, 0);

        if (!removeEquipCfg.attrSwitch) return;
        if (removeEquipCfg.attrType && removeEquipCfg.attrType.length > 0) {
            EventManager.instance.call(EPlayerEvents_S.player_recalculateEquip, pId, false, itemId);
        }
    }

    /**
     * 获取部位的装备id
     */
    public getPartEquipId(playerId: number, type: EEquipPartType) {
        let data = this.getPlayerData(playerId);
        if (MapEx.has(data.equipData, type) == false) {
            return 0
        }
        return MapEx.get(data.equipData, type);
    }

}