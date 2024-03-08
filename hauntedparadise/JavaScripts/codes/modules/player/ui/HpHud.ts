/*
 * @Author       : dal
 * @Date         : 2024-01-31 11:15:07
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-31 16:59:11
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\player\ui\HpHud.ts
 * @Description  : 
 */
import Lifebar_UI_Generate from "../../../../ui-generate/ShareUI/Lifebar_UI_generate";

export default class HpHud extends Lifebar_UI_Generate {

    onStart() {
        this.layer = mw.UILayerScene;
    }

    public initBloodVolume(curHp: number, maxHp: number) {
        this.bloodVolume.currentValue = 0;
        this.bloodVolume.sliderMaxValue = maxHp;
        this.updateBloodVolume(curHp);
    }

    /** 血条移动的相对速度 */
    private readonly slideSpeed: number = 0.1;

    private tween: Tween<any>;

    public updateBloodVolume(toHp: number) {
        if (this.tween) { this.tween.stop(); }
        let tempVal = Math.abs(this.bloodVolume.currentValue - toHp);
        let slideTime = tempVal / this.slideSpeed;
        this.tween = new Tween({ data: this.bloodVolume.currentValue })
            .to({ data: toHp }, slideTime)
            .onUpdate((trans) => {
                this.bloodVolume.currentValue = trans.data;
            })
            .start()
    }
}