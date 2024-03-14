/*
 * @Author       : enyu.liu enyu.liu@appshahe.com
 * @Date         : 2023-10-16 16:53:59
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 15:04:03
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\procedure\ui\MainMenuPanel.ts
 * @Description  : 
 */
import { GameConfig } from "../../../../config/GameConfig";
import { IPaintingStyleElement } from "../../../../config/PaintingStyle";
import BackGround_UI_Generate from "../../../../ui-generate/ShareUI/BackGround_UI_generate";
import Start_UI_Generate from "../../../../ui-generate/ShareUI/Start_UI_generate";
import { EGameTheme } from "../../../Defines";
import GameStart from "../../../GameStart";
import { DialogUI } from "../../../ui/DialogUI";
import { MainUI } from "../../../ui/MainUI";
import RegionTips from "../../../ui/RegionTips";
import { GlobalSwitch } from "../../../utils/GlobalSwitch";
import { LanUtil } from "../../../utils/LanUtil";
import MusicMgr from "../../../utils/MusicMgr";
import { GhostTraceHelper } from "../../../utils/TraceHelper";
import { UtilEx } from "../../../utils/UtilEx";
import { ArchivePanel } from "../../archive/ui/ArchivePanel";
import { StyleType } from "../../blackboard/BoardDefine";
import UIGlobalRankPanel from "../../globalRank/ui/UIGlobalRankPanel";
import HelpModuleC from "../../help/HelpModuleC";
import HotWeaponPanel from "../../hotweapon/ui/HotWeaponPanel";
import AddFriendHud from "../../idcard/ui/AddFriendPanel";
import IDCardPanel from "../../idcard/ui/IDCardPanel";
import MeleeWeaponPanel from "../../meleeweapon/ui/MeleeWeaponPanel";
import { RouteModuleC } from "../../route/RouteModule";

export class MainMenuPanel extends Start_UI_Generate {

    /** 风格列表 */
    styleList: StyleType[] = [];//[StyleType.Normal, StyleType.Cute];

    /** 画面风格 */
    styleId: number = StyleType.Cute;

    playerCamera: Camera;

    // /** 用玩家的摄像机 */
    // public switchPlayerCamera() {
    //     Camera.switch(this.playerCamera);
    // }

    protected onAwake(): void {
        Player.asyncGetLocalPlayer().then(player => { this.playerCamera = Camera.currentCamera; });
        this.initButtons();
        this.btn_start.onClicked.add(() => {
            mw.UIService.show(ArchivePanel, this.styleList[this.styleId]);
            mw.UIService.hide(MainMenuPanel);
        });
        this.btn_switchstyle.onClicked.add(this.switchStyle.bind(this));

        this.btn_start.onPressed.add(() => { this.setPressState(this.btn_start, this.img_paint1); });
        this.btn_switchstyle.onPressed.add(() => { this.setPressState(this.btn_switchstyle, this.img_paint2); });
        this.btn_backToHall.onPressed.add(() => { this.setPressState(this.btn_backToHall, this.img_paint3); })

        this.btn_start.onReleased.add(() => { this.cancelPressState(this.btn_start, this.img_paint1); });
        this.btn_switchstyle.onReleased.add(() => { this.cancelPressState(this.btn_switchstyle, this.img_paint2); });
        this.btn_backToHall.onReleased.add(() => { this.cancelPressState(this.btn_backToHall, this.img_paint3); })


        this.btn_rankinglist.onClicked.add(() => { UIService.show(UIGlobalRankPanel) });

        this.btn_backToHall.onClicked.add(() => {
            UIService.getUI(DialogUI).show(LanUtil.getText("ReturnHall_01"), (res: boolean) => {
                if (res) {
                    ModuleService.getModule(RouteModuleC).reqJumpGame(EGameTheme.Hall);
                }
            })
        })

        GameConfig.PaintingStyle.getAllElement().forEach(this.init.bind(this));
    }

    camera: Camera;

    cameraList: Camera[] = [];

    monsterTransformList: Transform[] = [];

    private _cacheMonsterArr: Map<string, Character> = new Map();

    private init(cfg: IPaintingStyleElement) {
        GameObject.asyncFindGameObjectById(cfg.CameraId).then((camera: Camera) => { this.cameraList.push(camera) });
        GameObject.asyncFindGameObjectById(cfg.TransformAnchorId).then((anchor: GameObject) => {
            if (!anchor) { return; }
            this.monsterTransformList.push(anchor.worldTransform.clone());
        });
    }

    /** 怪物模型 */
    monster: Character;

    onStart(): void {
        // UtilEx.asyncLoadAsset("131828");

        GameObject.asyncFindGameObjectById(GameConfig.PaintingStyle.getElement(StyleType.Normal).CameraId).then((camera: Camera) => {
            this.camera = camera;
            this.styleId = StyleType.Cute;
            if (!GlobalSwitch.canChooseStyle()) {
                this.canvas_switch.visibility = SlateVisibility.Collapsed;
                // this.canvas_subtitles.visibility = SlateVisibility.Collapsed;
                this.canvas_hall.position = this.canvas_switch.position;
                // Camera.switch(camera);
            } else {
                this.switchStyle(false);
            }
        });
    }

    private setPressState(btn: StaleButton, img: Image) {
        img.visibility = SlateVisibility.SelfHitTestInvisible;
        btn.fontColor = LinearColor.colorHexToLinearColor("AF0000FF");
    }

    private cancelPressState(btn: StaleButton, img: Image) {
        img.visibility = SlateVisibility.Collapsed;
        btn.fontColor = LinearColor.colorHexToLinearColor("C6C6C6FF");
    }

    private switchStyle(isdelay: boolean = true) {
        this.styleId = (this.styleId + 1) % this.styleList.length;
        let ghostCfg = GameConfig.PaintingStyle.getElement(this.styleList[this.styleId]);
        const listStyleId = this.styleList[this.styleId];
        this.camera = this.cameraList[listStyleId - 1];
        // Camera.switch(this.cameraList[listStyleId - 1], isdelay ? 1 : 0);
        let tempTrans = this.monsterTransformList[listStyleId - 1];
        if (tempTrans) {
            this.initMonster(ghostCfg, tempTrans.clone());
            this.text_style.text = ghostCfg.text;
            this.text_subtitles.text = ghostCfg.tauntTxt;
        }
    }

    private async initMonster(ghostCfg: IPaintingStyleElement, trans: Transform) {
        // 加载资源
        if (!AssetUtil.assetLoaded(ghostCfg.ghostGuid)) { await AssetUtil.asyncDownloadAsset(ghostCfg.ghostGuid) }
        this.monster?.currentAnimation.stop();
        this.monster = this._cacheMonsterArr.get(ghostCfg.ghostGuid);
        if (!this.monster) {
            this.monster = await GameObject.asyncSpawn(ghostCfg.ghostGuid);
            this._cacheMonsterArr.has(ghostCfg.ghostGuid) && this._cacheMonsterArr.get(ghostCfg.ghostGuid).destroy();
            this._cacheMonsterArr.set(ghostCfg.ghostGuid, this.monster);
            this.monster.collisionWithOtherCharacterEnabled = false;
        }
        this._cacheMonsterArr.forEach(e => {
            e.setVisibility(PropertyStatus.Off, true);
        })
        this.monster.setVisibility(PropertyStatus.On, true);
        this.monster.worldTransform = trans;
        this.monster.displayName = "";
        const ani = this.monster.loadAnimation(ghostCfg.animationGuid);
        ani.loop = Infinity;
        ani.speed = ghostCfg.animationSpeed;
        ani.play();
    }

    protected onShow() {
        UIService.hide(MainUI);
        UIService.hide(RegionTips);
        UIService.hide(IDCardPanel);
        UIService.hide(AddFriendHud);

        if (GameStart.GameTheme === EGameTheme.Graveyard) {
            // 游戏结束，关闭深色背景UI
            UIService.hide(BackGround_UI_Generate);
        }

        this.styleList = GameStart.isGPark ? [StyleType.Normal, StyleType.Abnormal, StyleType.Cute] : [StyleType.Normal, StyleType.Cute];
        MusicMgr.instance.play(1001);
        GhostTraceHelper.uploadMGS("ts_action_open_box", "开始游戏界面", { box_id: 0 });
        // this.camera ? Camera.switch(this.camera) : "";
        UIService.getUI(ArchivePanel).reqRefreshArchiveInfo();
        this.cancelPressState(this.btn_start, this.img_paint1);
        this.cancelPressState(this.btn_switchstyle, this.img_paint2);
        this.cancelPressState(this.btn_backToHall, this.img_paint3);
        //认为是游戏结束
        ModuleService.getModule(HelpModuleC).endGame();

        UIService.hide(HotWeaponPanel);
        UIService.hide(MeleeWeaponPanel);

        UIService.getUI(MainUI).banHandUIVisible = false;
    }
}