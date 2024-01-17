
import { SpawnManager } from "../../Modified027Editor/ModifiedSpawn";
import { GameConfig } from "../../config/GameConfig";
import { Globaldata } from "../../const/Globaldata";
import { PlayerModuleC } from "../PlayerModule/PlayerModuleC";
import { EnumDamageType } from "../PlayerModule/PlayerModuleData";
import PlayerHeadUI from "../PlayerModule/UI/PlayerHeadUI";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";
import { IUnitBase } from "./IUnitBase";
import { UnitManager } from "./UnitManager";


/**
 * 木桩npc
 */

@Component
export default class WoodUnit extends Script implements IUnitBase {

    private unitId: number;

    private woodObj: mw.GameObject = null;

    private curHp: number = 0;

    private hudUI: PlayerHeadUI = null;
    private worldHud: mw.UIWidget = null;

    public attributeType: number[] = [];
    public attributeValue: number[] = [];

    public async initUnit(unitId: number, prefabGuid: string) {
        this.unitId = unitId;

        this.woodObj = await mw.GameObject.asyncSpawn(prefabGuid);
        (this.woodObj as mw.Model).setCollision(mw.PropertyStatus.On);
        this.curHp = Globaldata.guide_npcMaxHp;

        UnitManager.instance.addUnit(this.unitId, this);
        // 头顶ui
        if (!this.hudUI) {
            this.hudUI = mw.UIService.create(PlayerHeadUI);
        }
        let name = GameConfig.Language.guide_npc_name.Value;
        this.hudUI.setName(name, 0);
        this.hudUI.setBindPId(this.unitId);
        // 创建ui控件
        if (!this.worldHud) {
            this.worldHud = SpawnManager.spawn({ guid: "UIWidget" }) as mw.UIWidget;
            this.worldHud.setTargetUIWidget(this.hudUI.uiWidgetBase);
            this.worldHud.widgetSpace = mw.WidgetSpaceMode.OverheadUI;
        }
        this.worldHud.parent = this.woodObj;
        this.worldHud.localTransform.position = Globaldata.guide_npcHudLos;
        this.woodObj.worldTransform.scale = Globaldata.guide_npcScale;

        this.refresh_hpUI();
    }

    private refresh_hpUI() {
        if (!this.hudUI) return;
        this.hudUI.refash(Globaldata.guide_npcMaxHp, this.curHp);
    }

    getUnitId() {
        return this.unitId;
    }

    getModel() {
        return this.woodObj;
    }

    getModelLocaction() {
        if (this.woodObj == null) {
            return null;
        }
        return this.woodObj.worldTransform.position;
    }

    setModelLocation(pos: mw.Vector) {
        if (this.woodObj == null) {
            return;
        }
        this.woodObj.worldTransform.position = pos;
    }



    getValue(type: Attribute.EnumAttributeType, isAdd: boolean) {

    }

    isDead() {
        return this.curHp <= 0;
    }
    onHurt(value: number) {
        this.curHp -= value;

        this.curHp = MathUtil.clamp(this.curHp, 0, this.curHp);
        this.refresh_hpUI();

        ModuleService.getModule(PlayerModuleC).scene_unit_injured([this.unitId],
            [{
                from: mw.Player.localPlayer.playerId,
                target: this.unitId,
                value: value,
                type: EnumDamageType.normal
            }]
        )

        if (this.curHp > 0) {
            return;
        }

        this.destroy();
    }


    /**设置NPC属性 */
    public setAttribute(type: Attribute.EnumAttributeType, value: number) {

    }

    /**
   * 添加npc属性
   * @param type 
   * @param value 
   */
    public addValue(type: Attribute.EnumAttributeType, value: number) {

    }

    reduceValue(type: Attribute.EnumAttributeType, value: number) {

    }

    protected onDestroy(): void {

        UnitManager.instance.removeUnit(this.unitId);

        if (this.woodObj) {
            this.woodObj.destroy();
            this.woodObj = null;
        }
    }

}