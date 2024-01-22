import { Easing } from "../../../tool/Tween"
import TopNoticeItem_Generate from "../../../ui-generate/notice/TopNoticeItem_generate"

const upP1 = new mw.Vector2(0, 0)
const upP2 = new mw.Vector2(0, -15)
const downP1 = new mw.Vector2(0, 48)
const downP2 = new mw.Vector2(0, 63)

export class TopNoticeItem extends TopNoticeItem_Generate {
    lifeTime: number
    targetHeight: number
    effTween: Tween<{ x: number }>
    position: mw.Vector2

    onStart() {
        this.effTween = new Tween({ x: 1 }).to({ x: 0 }).onStart(() => {
            this.eff.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.eff_line_1.visibility = mw.SlateVisibility.SelfHitTestInvisible
            this.eff_line_1_1.visibility = mw.SlateVisibility.SelfHitTestInvisible
        }).onUpdate(obj => {
            this.eff.renderOpacity = obj.x
            this.eff_line_1.position = mw.Vector2.lerp(upP1, upP2, 1 - obj.x)
            this.eff_line_1_1.position = mw.Vector2.lerp(downP1, downP2, 1 - obj.x)
            this.eff_line_1.renderOpacity = obj.x
            this.eff_line_1_1.renderOpacity = obj.x
        }).onComplete(() => {
            this.eff.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1_1.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1.position = upP1.clone()
            this.eff_line_1_1.position = downP1.clone()
        }).onStop(() => {
            this.eff.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1_1.visibility = mw.SlateVisibility.Collapsed
            this.eff_line_1.position = upP1.clone()
            this.eff_line_1_1.position = downP1.clone()
        }).easing(Easing.Sinusoidal.Out)
    }

    setLocation(x: number, y: number) {
        if (!this.position) {
            this.position = new mw.Vector2(x, y)
        }
        else {
            this.position.x = x
            this.position.y = y
        }
        this.uiObject.position = this.position
    }

    setInfo(context: string) {
        this.txt_context.text = context
    }

    getInfor(): string {
        return this.txt_context.text;
    }
    playEffect() {
        this.stopEffect()
        this.effTween.start()
    }

    stopEffect() {
        if (this.effTween.isPlaying()) {
            this.effTween.stop()
        }
    }
}