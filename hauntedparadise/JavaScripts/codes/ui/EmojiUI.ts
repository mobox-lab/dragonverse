import { GlobalDefine } from "../../DefNoSubModule";
import Pose_UI_Generate from "../../ui-generate/ShareUI/Pose_UI_generate";
import { GameAnimation } from "../utils/GameAnimaiton";
import EmojiItemUI from "./EmojiItemUI";
import { MainUI } from "./MainUI";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-26 16:07:12
 * @LastEditors: error: error: git config user.name & please set dead value or install git && error: git config user.email & please set dead value or install git & please set dead value or install git
 * @LastEditTime: 2023-12-28 11:10:38
 * @FilePath     : \hauntedparadise\JavaScripts\codes\ui\EmojiUI.ts
 * @Description  : 
 */
export default class EmojiUI extends Pose_UI_Generate {

    public poseItemPool: EmojiItemUI[] = [];

    private _offset: number;

    onStart() {
        for (let i = 1; i <= 4; i++) {
            this[`btn_pose${i}`].onClicked.add(() => {
                console.log("需要显示的图片guid", this[`btn_pose${i}`].normalImageGuid);
                Event.dispatchToLocal("BubblePic", this[`btn_pose${i}`].normalImageGuid);

                let emj = this.poseItemPool.length > 0 ? this.poseItemPool.pop() : UIService.create(EmojiItemUI);
                //this[`canvas_pose1`].get//
                //先上滚轮再想办法
                let startPos: Vector2 = new Vector2(1502 + this._offset, 190);

                // let oriSize = getViewportSize();
                // oriSize.x /= 1920;
                // oriSize.y /= 1080;

                // startPos.divide(oriSize);

                startPos = startPos.add(new Vector2((-i % 2 + 1) * 90, i > 2 ? 90 : 0)).add(this.btn_pose1.position);


                // absoluteToViewport(getAbsoluteSize(this[`canvas_pose${i}`].tickSpaceGeometry), Vector2.zero, startPos);
                // ScreenUtil.
                //localToViewport(this[`canvas_pose${i}`].tickSpaceGeometry, Vector2.zero, Vector2.zero, startPos);
                //screenToViewport(this.canvas_switchpose.position);
                // let pos = this[`canvas_pose${i}`].position.add(this[`canvas_pose${i}`].parent.position);
                // startPos.set(pos);

                emj.img.imageGuid = this[`btn_pose${i}`].normalImageGuid;
                //向上飘同样的距离
                let endPos = /*i <= 2 ? Vector2.add(startPos, new Vector2(0, -100)) :*/ Vector2.add(startPos, new Vector2(0, -190));
                // this.canvas_switchpose.addChild(emj.uiWidgetBase);


                this.transformBubblePic(emj, startPos, endPos);
            })
        }
        this.btn_offposition.onClicked.add(() => {
            UIService.getUI(MainUI).btn_switchposition.visibility = SlateVisibility.Visible;
            UIService.hideUI(this);
        })
    }
    onHide() {
        UIService.getUI(MainUI).btn_switchposition.visibility = SlateVisibility.Visible
    }


    onShow() {
        this._offset = UIService.getUI(MainUI).canvas_smile.position.x;
        this.mrootcanvas.position = new Vector2(this._offset, 0);
        UIService.getUI(MainUI).btn_switchposition.visibility = SlateVisibility.Collapsed
    }

    /**给图片一个向上飘的UI动画 */
    transformBubblePic(emj: EmojiItemUI, startPos: mw.Vector2, endPos: mw.Vector2) {
        UIService.showUI(emj);
        emj.mrootcanvas.visibility = SlateVisibility.Visible
        GameAnimation.UIAnimation.playFlyUI(startPos, endPos, emj.mrootcanvas, 0.5, () => {
            //回收UI
            emj.mrootcanvas.visibility = SlateVisibility.Collapsed;
            this.poseItemPool.push(emj);
        });

        GameAnimation.UIAnimation.playFadeAnimation(1, 0, 0.5, emj.mrootcanvas)

    }


}