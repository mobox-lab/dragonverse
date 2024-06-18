/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-18 10:15:42
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-21 17:43:32
 * @FilePath     : \nevergiveup\JavaScripts\UI\UIDialog.ts
 * @Description  : 修改描述
 */

import DialogUI_Generate from "../ui-generate/guideModule/DialogUI_generate";

export class Dialog {
    name: string;
    text: string;
    onComplete: Function;
    timer: number = 0;
    index: number = 0;
    hasComplete: boolean = false;
    static count: number = 0;
    id: number;
    constructor(name: string, text: string, onComplete: Function) {
        this.id = Dialog.count++;
        this.name = name;
        this.text = text;
        this.onComplete = onComplete;
        this.timer = 0;
    }

    show() {
        let dialogUI = UIService.getUI(UIDialog);
        dialogUI.mName.text = this.name;
        dialogUI.mMessage.text = "";
        this.timer = 0;
        UIService.show(UIDialog);
    }

    onUpdate(dt: number) {
        this.timer += dt;
        let interval = 1 / 30
        if (this.timer > interval) {
            this.timer = 0;
            this.index++;
            let dialogUI = UIService.getUI(UIDialog);
            dialogUI.mMessage.text = this.text.substring(0, this.index);
            if (this.index >= this.text.length) {
                this.hasComplete = true;
            }
        }
    }

    skip() {
        this.index = this.text.length;
        this.onUpdate(1);
        this.hasComplete = true;
    }
}

export namespace GuideDialog {
    export let dialogs: Dialog[] = [];
    export let isShow: boolean = false;

    export function push(name: string, text: string, onComplete: Function) {
        let dialog = new Dialog(name, text, onComplete);
        dialogs.push(dialog);
    }

    export function show() {
        isShow = true;
        if (dialogs.length > 0) {
            dialogs[0].show();
        }
    }

    export function hide() {
        isShow = false;
        dialogs = [];
        UIService.hide(UIDialog);
    }

    export function onUpdate(dt: number) {
        if (isShow == false) return;
        if (dialogs.length > 0) {
            dialogs[0].onUpdate(dt);
        }
    }

    export function onContinue() {
        if (dialogs.length > 0) {
            if (dialogs[0].hasComplete) {
                let dialog = dialogs.shift();
                dialog.onComplete();
                showNext();
            }
            else {
                dialogs[0].skip();
            }
        }
    }

    export function showNext() {
        if (dialogs.length > 0 && isShow) {
            dialogs[0].show();
        }
    }
}


export class UIDialog extends DialogUI_Generate {
    onStart() {
        this.layer = UILayerDialog;
        this.mContinue.onClicked.add(() => {
            GuideDialog.onContinue();
        });
    }
}