/**
 * AUTHOR: 泪染倾城（找闺）
 * TIME: 2023.12.20-19.26.48
 * ATTENTION: onStart 等UI脚本自带函数不可改写为异步执行，有需求的异步逻辑请使用函数封装，通过函数接口在内部使用
 */

import { TweenCommon } from "../TweenCommon";
import { GameConfig } from "../config/GameConfig";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import QuestionUI_Generate from "../ui-generate/HUD/QuestionUI_generate";

export default class QuestionUI extends QuestionUI_Generate {
    public onConfirm: () => void | undefined = undefined;
    public onCancel: () => void | undefined = undefined;
    /**
     * 构造UI文件成功后，在合适的时机最先初始化一次
     */
    protected onStart() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = UILayerMiddle;
        this.closeBtn.onClicked.add(() => {
            this.onCancel?.();
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            });
        });
        this.btn_UnConfirm_Use.onClicked.add(() => {
            this.onCancel?.();
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            });
        });
        this.btn_Confirm_Use.onClicked.add(() => {
            let language = LocaleUtil.getDefaultLocale().toString().toLowerCase();
            if (!!language.match("zh")) {
                StringUtil.clipboardCopy(
                    "https://mobox.gitbook.io/cn-long-yu-bao-wei-zhan-ru-men-shou-ce-dragon-defense"
                );
            } else {
                StringUtil.clipboardCopy("https://mobox.gitbook.io/dragon-defense-guidebook/");
            }
            this.onConfirm?.();
            TweenCommon.popUpHide(this.rootCanvas, () => {
                UIService.hideUI(this);
            });
        });
    }

    /**
     * 构造UI文件成功后，onStart之后
     * 对于UI的根节点的添加操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onAdded() {}

    /**
     * 构造UI文件成功后，onAdded之后
     * 对于UI的根节点的移除操作，进行调用
     * 注意：该事件可能会多次调用
     */
    protected onRemoved() {}

    /**
     * 构造UI文件成功后，UI对象再被销毁时调用
     * 注意：这之后UI对象已经被销毁了，需要移除所有对该文件和UI相关对象以及子对象的引用
     */
    protected onDestroy() {}

    /**
     * 每一帧调用
     * 通过canUpdate可以开启关闭调用
     * dt 两帧调用的时间差，毫秒
     */
    //protected onUpdate(dt :number) {
    //}

    /**
     * 设置显示时触发
     */
    protected onShow(options?: { text?: string; onConfirm: () => void; onCancel: () => void }) {
        const { text, onConfirm, onCancel } = options ?? {};
        this.onConfirm = onConfirm;
        this.onCancel = onCancel;
        this.text_Recovery.text = text ?? GameConfig.Language.QuestionText_1.Value;
        this.text_Confirm_Use.text = onConfirm
            ? GameConfig.Language.Return_text_2.Value
            : GameConfig.Language.QuestionText_2.Value;
        this.text_UnConfirm_Use.text = onConfirm
            ? GameConfig.Language.Return_text_3.Value
            : GameConfig.Language.QuestionText_3.Value;
        TweenCommon.popUpShow(this.rootCanvas);
        KeyOperationManager.getInstance().onKeyUp(this, Keys.Escape, () => {
            TweenCommon.popUpHide(this.rootCanvas, () => {
                this.onCancel?.();
                UIService.hideUI(this);
            });
        });
    }

    protected onHide() {
        KeyOperationManager.getInstance().unregisterKey(this, Keys.Escape);
    }
}
