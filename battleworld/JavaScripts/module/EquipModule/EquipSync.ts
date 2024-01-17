
/**
 * 装备属性同步 
 * 后续可以扩展数组，同步多个装备
 */

import { GameConfig } from "../../config/GameConfig";
import { EEquipPartType, EModule_Events } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { EquipManager } from "./EquipManager";

@Component
export default class EquipSync extends mw.Script {

    @mw.Property({ replicated: true, multicast: true })
    /**当前绑定的玩家id */
    public pId: number = 0;


    /**玩家的装备id数组 */
    @mw.Property({ replicated: true, multicast: true, onChanged: "client_call_equipPartIds" })
    public equipPartIds: number[] = [];

    private prePartIds: number[] = [];

    private isDestroy: boolean = false;

    private check_equipPartIds() {

        if (SystemUtil.isServer()) return;

        if (this.prePartIds.length > 0) return;

        for (const key in EEquipPartType) {
            let value = Number(key);
            if (isNaN(value)) {
                continue;
            }
            this.prePartIds.push(0);
        }
    }


    private async client_call_equipPartIds() {

        EquipManager.instance.init();

        let player = await Player.asyncGetPlayer(this.pId);

        if (player == null) {
            return;
        }

        // tserror 属性同步回调角色对象不可靠
        if (Player.localPlayer == null) {
            await Player.asyncGetLocalPlayer();
            if (Player.localPlayer == null) {
                return;
            }
        }


        this.check_equipPartIds();

        for (let index = 0; index < this.equipPartIds.length; index++) {
            let curEquipId = this.equipPartIds[index];
            let preEquipId = this.prePartIds[index];

            if (curEquipId == preEquipId) {
                continue;
            }

            if (this.pId == Player.localPlayer.playerId && (index + 1) == EEquipPartType.pet) {
                if (preEquipId > 0) {
                    EventManager.instance.call(EModule_Events.destroyPet, this.pId);
                    this.prePartIds[index] = 0;
                }

                let equipCfg = GameConfig.Equip.getElement(curEquipId);
                if (equipCfg == null) {
                    return;
                }

                this.prePartIds[index] = curEquipId;
                equipCfg.pendantId.forEach((id) => {
                    let apperance = GameConfig.AppearancePendant.getElement(id);
                    if (apperance == null) return;
                    
                    EventManager.instance.call(EModule_Events.createPet, this.pId, apperance.assetGuid);
                })

            } else {
                if (preEquipId > 0) {
                    let preEquipCfg = GameConfig.Equip.getElement(preEquipId);
                    if (preEquipCfg) {
                        preEquipCfg.pendantId.forEach((id) => {
                            let apperance = GameConfig.AppearancePendant.getElement(id);
                            if (apperance == null) return;
                            
                            EventManager.instance.call(EModule_Events.equip_removePendant, this.pId, id);
                        })
                        
                    }
                    this.prePartIds[index] = 0;
                }
                let equipCfg = GameConfig.Equip.getElement(curEquipId);
                if (equipCfg == null) {
                    return;
                }
                this.prePartIds[index] = curEquipId;
                equipCfg.pendantId.forEach((id) => {
                    EventManager.instance.call(EModule_Events.equip_addPendant, this.pId, id);
                });
            }
        }
    }


    /**
     * 服务器初始化
     * @param pId 玩家id
     * @param partEquipIds 装备id数组
     */
    public server_init(pId: number, partEquipIds: number[]) {

        if (this.isDestroy) return;

        this.pId = pId;

        this.equipPartIds.length = 0;

        for (let index = 0; index < partEquipIds.length; index++) {
            if (index + 1 == EEquipPartType.killEff) continue;
            const id = partEquipIds[index];
            this.equipPartIds.push(id);
        }

        //console.error("===equipPartIds", this.equipPartIds);
        //this.equipPartIds = partEquipIds;
    }

    protected onDestroy(): void {
        this.isDestroy = true;
    }

    /**
     * 添加装备
     * @param equipPartType 装备部位类型
     * @param equipId 装备id
     */
    public server_setEquipId(equipPartType: EEquipPartType, equipId: number) {
        let partIndex = equipPartType - 1;
        this.equipPartIds[partIndex] = equipId;
    }

}