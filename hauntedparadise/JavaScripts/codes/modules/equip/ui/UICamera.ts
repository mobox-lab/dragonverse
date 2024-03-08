/*
 * @Author       : dal
 * @Date         : 2024-01-25 16:29:23
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-21 16:07:47
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\equip\ui\UICamera.ts
 * @Description  : 
 */

import { GameConfig } from "../../../../config/GameConfig";
import Camera_UI_Generate from "../../../../ui-generate/ShareUI/Camera_UI_generate";
import Clicking_UI_Generate from "../../../../ui-generate/ShareUI/Clicking_UI_generate";
import { MainUI } from "../../../ui/MainUI";
import Tips from "../../../utils/Tips";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UIAniUtil } from "../../../utils/UIAniUtil";
import { RouteModuleC } from "../../route/RouteModule";
import { EquipModuleC } from "../EquipModuleC";
import CameraItem from "../items/CameraItem";
import { CameraUtilHelper } from "../util/CamerHelper";

export default class CameraPanel extends Camera_UI_Generate {

    /** 所有鬼怪的标志 */
    public static GhostGraphTags: string[] = [];

    protected onStart() {
        CameraPanel.GhostGraphTags = GameConfig.GhostGraph.getAllElement().map((v) => { return v.tag });
        this.btn_back.onClicked.add(() => {
            UIService.show(MainUI);
            UIService.hide(CameraPanel);
            CameraItem.itemGo.setVisibility(PropertyStatus.On);
        });

        this.btn_camera.onClicked.add(this.takePhoto.bind(this));
    }

    private takePhoto() {
        SoundService.playSound("296874");
        UIService.show(ClickingUI);
    }
}

export class ClickingUI extends Clicking_UI_Generate {

    private readonly startPosTop: Vector2 = new Vector2(0, -540);

    private readonly startPosBottom: Vector2 = new Vector2(0, 1080);

    private readonly endPosTop: Vector2 = new Vector2(0, 0);

    private readonly endPosBottom: Vector2 = new Vector2(0, 540);

    protected onShow() {
        this.img_bg1.position = this.startPosTop;
        this.img_bg2.position = this.startPosBottom;

        UIAniUtil.playPosAni(this.img_bg1, this.endPosTop, 5e2, () => {
            ModuleService.getModule(EquipModuleC).equip(null);
            UIAniUtil.playPosAni(this.img_bg1, this.startPosTop, 5e2, () => {
                this.checkPhoto(CameraUtilHelper.takeAShot(CameraPanel.GhostGraphTags, "photoTag"));
            });
        });

        UIAniUtil.playPosAni(this.img_bg2, this.endPosBottom, 5e2, () => {
            UIAniUtil.playPosAni(this.img_bg2, this.startPosBottom, 5e2, () => {

            });
        });
    }

    /** 检查照片拍没拍中 */
    private checkPhoto(hits: string[]) {
        if (hits.length === 0) {
            GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods_id: 0 });
            Tips.show(GameConfig.SubLanguage["camera_01"].Value);
        } else {
            const cfgIdList = this.filterCfgIdListByPhotoTags(hits);
            const nameSet: Set<string> = new Set();
            cfgIdList.forEach(cfgId => {
                GhostTraceHelper.uploadMGS("ts_action_sell", "按下快门", { goods_id: cfgId });
                nameSet.add(GameConfig.GhostGraph.getElement(cfgId).name);
            });
            Tips.show(StringUtil.format(GameConfig.SubLanguage["camera_02"].Value, JSON.stringify(Array.from(nameSet))));
            ModuleService.getModule(RouteModuleC).reqSaveGraph(cfgIdList);
        }
    }


    /**
     * 过滤拍到的图录将其转化为配置列表
     * @param photoTags 拍到的图录实例
     */
    private filterCfgIdListByPhotoTags(photoTags: string[]) {
        return GameConfig.GhostGraph.getAllElement().filter(v => { return photoTags.includes(v.tag); }).map(v => { return v.id });
    }
}