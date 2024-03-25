/*
 * @Author       : dal
 * @Date         : 2024-01-09 15:16:51
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2024-01-22 10:39:12
 * @FilePath: \hauntedparadise\JavaScripts\modules\build\ui\BuildPanel.ts
 * @Description  : 
 */
import {EquipDefine} from "../../../codes/modules/equip/EquipDefine";
import {EquipModuleC} from "../../../codes/modules/equip/EquipModuleC";
import MusicMgr from "../../../codes/utils/MusicMgr";
import Tips from "../../../codes/utils/Tips";
import {GhostTraceHelper} from "../../../codes/utils/TraceHelper";
import {GameConfig} from "../../../config/GameConfig";
import Build_UI_Generate from "../../../ui-generate/ShareUI/Build_UI_generate";
import {BuildModuleC} from "../BuildModuleC";
import {BuildingEditorHelper} from "../helper/BuildingEditorHelper";
import {BagModuleC} from "../../../codes/modules/bag/BagModuleC";
import {BuildingHelper} from "../helper/BuildingHelper";
import Log4Ts from "../../../depend/log4ts/Log4Ts";
import BuildMaterialItemPanel from "../../build-material/BuildMaterialItemPanel";
import BuildingIconPanel from "./BuildingIconPanel";


export class BuildPanel extends Build_UI_Generate {
    private rotateOffsetX: number = 0;
    private rotateOffsetZ: number = 0;

    /** 旋转值 */
    private moveNum: number = 90;

    private itemId: number;

    private buildingId: number = 1;

    private _resourceItems: BuildingIconPanel[] = [];

    onShow(itemId: number) {
        this.itemId = itemId;
        let config = BuildingHelper.getBuildCfgByItemId(itemId);
        this.buildingId = config.id;
        if (this.buildingId === 1) {
            this.canvas_place.visibility = SlateVisibility.Collapsed;
        } else {
            this.canvas_place.visibility = SlateVisibility.SelfHitTestInvisible;
        }
        this.judgeResource();
    }

    onStart() {
        this.moveNum = GameConfig.Global["BuildRotDelta"].number;
        this.btn_place1.onClicked.clear();
        this.btn_place1.onClicked.add(() => this.confirmBuild());
        this.btn_place2.onClicked.clear();
        this.btn_place2.onClicked.add(() => this.confirmBuild(false));

        this.btn_discardItem.onClicked.add(() => {
            GhostTraceHelper.itemTrace(this.buildingId, 5);
            ModuleService.getModule(EquipModuleC).removeItem(Player.localPlayer.playerId);
        });

        // up
        this.btn_up.onPressed.add(() => {
            this.rotateOffsetX = this.moveNum;
            this.canUpdate = true;
            GhostTraceHelper.itemTrace(this.buildingId, 6);
        });
        this.btn_up.onReleased.add(() => {
            this.rotateOffsetX = 0;
            this.canUpdate = false;
        });
        // down
        this.btn_down.onPressed.add(() => {
            this.rotateOffsetX = -this.moveNum;
            this.canUpdate = true;
            GhostTraceHelper.itemTrace(this.buildingId, 7);
        });
        this.btn_down.onReleased.add(() => {
            this.rotateOffsetX = 0;
            this.canUpdate = false;
        });

        // left
        this.btn_left.onPressed.add(() => {
            this.rotateOffsetZ = this.moveNum;
            this.canUpdate = true;
            GhostTraceHelper.itemTrace(this.buildingId, 8);
        });
        this.btn_left.onReleased.add(() => {
            this.rotateOffsetZ = 0;
            this.canUpdate = false;
        });
        // right
        this.btn_right.onPressed.add(() => {
            this.rotateOffsetZ = -this.moveNum;
            this.canUpdate = true;
            GhostTraceHelper.itemTrace(this.buildingId, 9);
        });
        this.btn_right.onReleased.add(() => {
            this.rotateOffsetZ = 0;
            this.canUpdate = false;
        });

        this.btn_close.onClicked.add(() => this.exit());
    }

    onHide() {
        this.canUpdate = false;
    }

    onUpdate(dt) {
        const char = Player.localPlayer.character;
        if (this.rotateOffsetZ) {
            BuildingEditorHelper.instance.zOffset += this.rotateOffsetZ * dt;
            // let q: Quaternion = BuildingEditorHelper.instance.qOffset;
            // BuildingEditorHelper.instance.qOffset = Quaternion.rotateAround(q, Vector.up, this.rotateOffsetZ * dt);
        }
        if (this.rotateOffsetX) {
            BuildingEditorHelper.instance.xOffset += this.rotateOffsetX * dt;
            // let q: Quaternion = BuildingEditorHelper.instance.qOffset;
            // BuildingEditorHelper.instance.qOffset = Quaternion.rotateAround(q, char.worldTransform.getRightVector(), this.rotateOffsetX * dt);
        }
    }

    async confirmBuild(exit: boolean = true) {
        if (await ModuleService.getModule(BuildModuleC).checkBuildingOver()) {
            Tips.show("建筑超限啦！删掉一些之前的建筑再来建造吧");
            return;
        }

        if (BuildingEditorHelper.instance.checkCanBuild()) {
            const config = GameConfig.Building.getElement(this.buildingId);
            ModuleService
                .getModule(BagModuleC)
                .pay(config.buildMaterial
                    .map(item => [item[0] ?? -1, item[1] ?? 0] as [number, number])
                    .filter(item => item[0] !== -1));
            BuildingEditorHelper.instance.confirmEdit();
            MusicMgr.instance.play(2004);
        }
        if (exit) {
            this.exit();
        } else {
            this.judgeResource();
        }
    }

    private exit() {
        UIService.hide(BuildPanel);
        BuildingEditorHelper.instance.cancelEdit();
    }

    private judgeResource() {
        const buildingConfig = GameConfig.Building.getElement(this.buildingId);
        if (!buildingConfig) {
            Log4Ts.log(BuildPanel, `building Config is null`);
            return false;
        }


        let i = 0;
        let enough = true;
        const bag = ModuleService.getModule(BagModuleC);
        for (; i < this._resourceItems.length && i < buildingConfig.buildMaterial.length; ++i) {
            this._resourceItems[i].setVisible(true);
            let currentCount = bag.getItemCount(buildingConfig.buildMaterial[i][0]);
            enough = enough && currentCount > buildingConfig.buildMaterial[i][1];
            this._resourceItems[i].init(
                GameConfig.Item.getElement(buildingConfig.buildMaterial[i][0])?.icon ?? "",
                currentCount,
                buildingConfig.buildMaterial[i][1]);
        }
        for (; i < this._resourceItems.length || i < buildingConfig.buildMaterial.length; ++i) {
            if (i < this._resourceItems.length) {
                this._resourceItems[i].setVisible(false);
            } else {
                let currentCount = bag.getItemCount(buildingConfig.buildMaterial[i][0]);
                enough = enough && currentCount > buildingConfig.buildMaterial[i][1];
                const newItem = UIService
                    .create(BuildingIconPanel)
                    .init(GameConfig.Item.getElement(buildingConfig.buildMaterial[i][0])?.icon ?? "",
                        currentCount,
                        buildingConfig.buildMaterial[i][1]);
                this.canvas_buildIcon.addChild(newItem.uiObject);
                this._resourceItems.push(newItem);
            }
        }
        if (!enough) {
            this.btn_place1.onClicked.clear();
            this.btn_place2.onClicked.clear();
        }
    }
}