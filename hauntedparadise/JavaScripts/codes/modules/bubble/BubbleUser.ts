import { BubbleChat } from "./Bubble";
import { BubblePic } from "./BubblePic";
import { IBubbleConfig, IBubbleSkin } from "./IBubbleConfig";

/**
 * 用户使用的聊天气泡类，用于气泡的显示和销毁，更新气泡的显示
 */
export class BubbleUser {

    /**对话气泡实例 */
    private _bubbles: BubbleChat[] = [];
    /**所属物体 */
    private gameObject: mw.GameObject;

    /**世界UI数组 */
    private _widgetPool: UIWidget[] = [];

    /**
     * 构造函数
     * @param guid 说话者的GUID
     * @param cfg 气泡配置的ID
     */
    constructor(public guid: string, private cfg: IBubbleConfig) {

    }

    /**
     * 获取气泡数量
     */
    public get count(): number {
        return this._bubbles.length;
    }
    /**
     * 更新气泡显示，更新对话框
     * @param dt 这一帧与上一帧的时间差
     */
    public onUpdate(dt: number) {
        for (let i = 0; i < this._bubbles.length; i++) {
            if (this._bubbles[i].onUpdate(dt)) {
                this._bubbles[i].destory();
                this._bubbles.splice(i, 1);
                i--;
            }
        }
    }

    /**
     * 显示对话框，找到气泡所属物体，若未找到则返回，判断是否达到最大限制，达到最大限制则删除最早显示的气泡
     * @param skin 气泡皮肤配置
     * @param text 气泡显示文本
     * @param cfg 气泡配置
     */
    public show(skin: IBubbleSkin, text: string, cfg: IBubbleConfig) {

        if (!this.gameObject) {
            this.gameObject = GameObject.findGameObjectById(this.guid);
        }
        if (!this.gameObject) return;
        /**   达到最大限制，删除最早显示的气泡 */
        if (this._bubbles.length >= this.cfg.maxCount) {
            const bubble = this._bubbles.shift();
            bubble.destory();
        }
        this._bubbles.push(new BubbleChat(skin, cfg, text, this.onMeasure, this.owner));
    }

    /**
     * 显示气泡框的图片，找到气泡所属物体，若未找到则返回，判断是否达到最大限制，达到最大限制则删除最早显示的气泡
     * @param skin 气泡皮肤配置
     * @param imgGuid 显示图片的guid
     * @param cfg 气泡配置
     * @param size 图片的大小
     */
    public showPic(skin: IBubbleSkin, imgGuid: string, cfg: IBubbleConfig, size: Vector2) {
        if (!this.gameObject) {
            this.gameObject = GameObject.findGameObjectById(this.guid);
        }
        if (!this.gameObject) return;
        /**达到最大限制，删除最早显示的气泡 */
        if (this._bubbles.length >= this.cfg.maxCount) {
            const bubble = this._bubbles.shift();
            bubble.destory();
        }
        this._bubbles.push(new BubblePic(skin, cfg, imgGuid, this.onMeasure, this.owner, size));
    }

    /**
     * 获取当前气泡的拥有者
     * @returns 当前气泡的拥有者
     */
    private owner = () => {
        return this.gameObject;
    }

    /**
     * 气泡重新定位回调，遍历当前的气泡，重新气泡的偏移位置
     */
    private onMeasure = () => {
        let offset = this.cfg.offset;
        /**遍历当前的气泡，重新气泡的偏移位置 */
        for (let i = this._bubbles.length - 1; i >= 0; i--) {
            offset += this._bubbles[i].height;
            this._bubbles[i].offset(offset);
            offset += 15;
        }
    }

    /**
     * 清除所有对话气泡，遍历当前的气泡并销毁
     */
    public clear() {
        /**遍历当前的气泡并销毁 */
        for (let i = 0; i < this._bubbles.length; i++) {
            this._bubbles[i].destory();
            this._bubbles.splice(i, 1);
            i--;
        }
    }
}