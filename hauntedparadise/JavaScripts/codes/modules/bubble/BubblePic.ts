
import { BubbleChat } from "./Bubble";
import { IBubbleConfig, IBubbleSkin } from "./IBubbleConfig";
/**UI大小常量 */
const tempSize: mw.Vector2 = new mw.Vector2(0);
/**
 * 表情气泡类，继承于BubbleChat，用于在玩家头顶显示表情气泡
 */
export class BubblePic extends BubbleChat {
    /**表情图片 */
    protected img: mw.Image;

    /**
     * 构造函数，初始化表情图片，设置表情图片的大小、位置、图片资源，可见性和渲染大小
     * @param object 所属的物体
     * @param _ui 所属的UI，从对象池拿
     * @param _text 所属的UI，展示的文字
     */
    constructor(skin: IBubbleSkin, cfg: IBubbleConfig, imgGuid: string, onMeasure: () => void, owner: () => mw.GameObject, protected size: Vector2) {
        super(skin, cfg, "", onMeasure, owner);
        this.img = this._ui.rootCanvas.findChildByPath("img2showMood") as mw.Image;
        if (!this.img) {
            this.img = mw.Image.newObject(this._ui.rootCanvas, "img2showMood");
        }
        this.img.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        this.img.size = size;
        this.img.imageGuid = imgGuid;
        this.img.position = new Vector2(20, 20);
        this.img.renderScale = new Vector2(1.3, 1.3);
    }

    /**
     * 计算气泡的显示的位置、大小和设置文本，设置箭头图片的显示隐藏，设置喇叭图片的显示隐藏，设置世界UI的渲染大小
     */
    public measure() {
        /**计算总长度*/
        tempSize.set(this.size);
        /**计算富文本高度*/
        tempSize.set(tempSize.x + this.skin.borderSpaceLeft + this.skin.borderSpaceRight, tempSize.y + this.skin.borderSpaceUp + this.skin.borderSpaceDown);

        this._halfWidth = tempSize.x / 2;
        this._height = tempSize.y;

        /**计算气泡大小*/
        this._ui.rootCanvas.size = tempSize;
        this._ui.bg.size = tempSize;
        if (this.skin.borderVisible) {
            tempSize.x += 6;
            tempSize.y += 6;
            this._ui.border.size = tempSize;
        }
        this._ui.text.position = tempSize.set(this.skin.borderSpaceLeft, this.skin.borderSpaceUp);

        this._ui.text.text = "";
        this._ui.text.fontSize = this.skin.fontSize;
        /**根据气泡皮肤配置，设置箭头图片的显示隐藏 */
        if (this.skin.arrayVisible) {
            this._ui.array.visibility = mw.SlateVisibility.Collapsed;
            this._ui.array.position = tempSize.set(this._halfWidth - 28, this._height - 9);
        } else {
            this._ui.array.visibility = mw.SlateVisibility.Collapsed;
        }
        /**根据气泡皮肤配置，设置喇叭图片的显示隐藏 */
        if (this.skin.hornVisiable) {
            this._ui.horn.visibility = mw.SlateVisibility.HitTestInvisible;
        }
        else {
            this._ui.horn.visibility = mw.SlateVisibility.Collapsed;
        }
        /**设置世界UI的渲染大小 */
        this.widget.drawSize = new Vector2(512, 512);
    }

    /**
     * 气泡销毁时调用，隐藏表情图片
     */
    public destory() {
        this.img.visibility = mw.SlateVisibility.Collapsed;
        super.destory();
    }
}