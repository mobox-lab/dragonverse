import { BubblePool } from "./BubblePool";
import { BubbleUser } from "./BubbleUser";
import { IBubbleConfig, IBubbleSkin } from "./IBubbleConfig";
import { IBubbleUI } from "./IBubbleUI";

/**
 * 气泡皮肤配置类，用于设置气泡的外观
 */
@Serializable
class BubbleSkin implements IBubbleSkin {
    /**当前气泡皮肤配置Id */
    @mw.Property({ displayName: "配置ID" })
    public id: number = 0;
    /**气泡文字颜色 333333：默认颜色代码*/
    @mw.Property({ displayName: "文字颜色" })
    public textColor: mw.LinearColor = mw.LinearColor.colorHexToLinearColor("333333");
    /**气泡文字大小 */
    @mw.Property({ displayName: "文字大小" })
    public fontSize: number = 24;
    /**是否显示显示箭头图片 */
    @mw.Property({ displayName: "显示尾巴" })
    public arrayVisible: boolean = true;
    /**背景图片guid 192521：默认背景图片*/
    @mw.Property({ displayName: "背景图片" })
    public bg: string = "192521";
    /**背景图片颜色 */
    @mw.Property({ displayName: "背景颜色" })
    public bgColor: mw.LinearColor = new mw.LinearColor(1, 1, 1, 0.6);
    /**是否显示气泡箭头图片 */
    @mw.Property({ displayName: "显示边框" })
    public borderVisible: boolean = false;
    /**边框图片guid 192521：默认边框图片*/
    @mw.Property({ displayName: "边框图片" })
    public border: string = "192521";
    /**边框颜色 */
    @mw.Property({ displayName: "边框颜色" })
    public borderColor: mw.LinearColor = new mw.LinearColor(0, 0, 0, 0.2);
    /**气泡文字上边距 */
    @mw.Property({ displayName: "文字上边距" })
    public borderSpaceUp: number = 20;
    /**气泡文字下边距 */
    @mw.Property({ displayName: "文字下边距" })
    public borderSpaceDown: number = 20;
    /**气泡文字左边距 */
    @mw.Property({ displayName: "文字左边距" })
    public borderSpaceLeft: number = 20;
    /**气泡文字右边距 */
    @mw.Property({ displayName: "文字右边距" })
    public borderSpaceRight: number = 20;
    /**气泡的UI层级 */
    @mw.Property({ displayName: "ZOrder" })
    public zOrder: number = -1;
    /**是否显示气泡喇叭图片 */
    public hornVisiable: boolean = false;
}
/**
 * Bubble命名空间，用于管理气泡的显示和关闭
 */
export namespace Bubble {
    /**气泡代理，勿用 */
    export let _proxy: BubbleProxy;

    /**
     * 展示气泡，双端可用
     * @param skinId 气泡外观配置，为0时根据说话者选择默认配置
     * @param text 文本
     * @param guid 说话者的GUID，可以为场景物体,服务端必传，客户端不传为主控者说话
     * @param isLocally true仅在本地显示 false所以端显示
     */
    export function showBubble(skinId: number, text: string, guid?: string, isLocally?: boolean) {
        _proxy && _proxy.showBubble(skinId, text, guid, isLocally);
    }

    /**
     * 显示表情气泡的图片
     * @param skinId 气泡皮肤配置ID
     * @param img 表情气泡图片guid
     * @param guid 气泡拥有者的Guid
     * @param size 表情气泡图片大小
     */
    export function showBubblePic(skinId: number, img: string, guid: string, size: Vector2) {
        _proxy && _proxy.boardCastBubblePic(guid, img, skinId, size)
    }

    /**
    * 关闭所属物体气泡，双端可用
    * @param guid 说话者的GUID，可以为场景物体,服务端必传，客户端不传为主控者
    * @param isLocally true仅在本地关闭 false所以端关闭
    */
    export function closeBubble(guid?: string, isLocally?: boolean) {
        _proxy && _proxy.closeBubble(guid, isLocally);
    }
}
/**
 * 气泡代理类，继承Script和IBubbleConfig，用于管理气泡配置和气泡的显示
 */
export abstract class BubbleProxy extends mw.Script implements IBubbleConfig {
    /**最大显示距离 */
    @mw.Property({ displayName: "最大显示距离(0-无限远)", group: "配置" })
    private viewDistance: number = 3000;
    /**气泡最大宽度 */
    @mw.Property({ displayName: "气泡最大宽度", group: "配置" })
    private skinMaxWidth: number = 300;
    /**最大文字数量 */
    @mw.Property({ displayName: "最大文字数量", group: "配置" })
    private maxTextCount: number = 100;
    /**自己的气泡ID */
    @mw.Property({ displayName: "自己气泡", group: "配置" })
    private playerSkinId: number = 0;
    /**他人气泡ID */
    @mw.Property({ displayName: "他人气泡", group: "配置" })
    private otherSkinId: number = 0;
    /**气泡存在时间 */
    @mw.Property({ displayName: "存在时间", group: "配置" })
    public time: number = 5;
    /**最大数量 */
    @mw.Property({ displayName: "最大数量", group: "配置" })
    public maxCount: number = 4;
    /**气泡头顶偏移 */
    @mw.Property({ displayName: "头顶偏移", group: "配置" })
    public offset: number = 60;
    /**气泡配置 */
    @mw.Property({ displayName: "气泡配置", arrayDefault: new BubbleSkin() })
    public skins: BubbleSkin[] = [new BubbleSkin()];

    /**储存所有物体Bubble */
    private bubbleUsers: BubbleUser[] = [];
    /**本机玩家 */
    private player: mw.Player;
    /**
     * 脚本初始化，绑定气泡代理，注册气泡对象池，异步获取当前玩家，绑定玩家离开委托
     */
    protected onStart(): void {
        /**绑定气泡代理 */
        Bubble._proxy = this;
        if (SystemUtil.isClient()) {
            BubblePool.size.x = this.skinMaxWidth;
            /**注册气泡对象池 */
            BubblePool.registerUI(this.onCreateBubbleUI, 0);
            /**异步获取当前玩家 */
            Player.asyncGetLocalPlayer().then(player => {
                this.player = player;
                this.useUpdate = true;
            });
            /**绑定玩家离开委托 */
            Player.onPlayerLeave.add(player => {
                this.bubbleUsers.forEach(e => {
                    let go = GameObject.findGameObjectById(e.guid)
                    if (!go) {
                        e.clear();
                    }
                });
            });
        }
    }

    /**
     * 创建气泡UI接口
     */
    protected abstract onCreateBubbleUI(): IBubbleUI;

    /**
     * 显示气泡，文本不存在则返回，根据最大文本数量截取文本，根据是否为本地显示选择广播或者服务器中转调用全局显示气泡
     * @param skinId 气泡皮肤配置ID
     * @param text 气泡显示的文本
     * @param guid 气泡拥有者的guid
     * @param isLocally true为只在本地显示，false会广播给所有端显示
     */
    public showBubble(skinId: number, text: string, guid: string, isLocally: boolean) {
        if (!text) return;
        if (text.length > this.maxTextCount) {
            text = text.substring(0, this.maxTextCount) + "...";
        }
        if (SystemUtil.isClient()) {
            if (!guid) {
                this.player && (isLocally ? this.boardCastBubble(this.player.character.gameObjectId, skinId, text) : this.serverShowBubble(this.player.character.gameObjectId, skinId, text));
            } else {
                isLocally ? this.boardCastBubble(guid, skinId, text) : this.serverShowBubble(guid, skinId, text);
            }
        } else {
            this.serverShowBubble(guid, skinId, text);
        }
    }

    /**
     * 广播清除所有的气泡
     * @param guid 气泡拥有者的Guid
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    private boradcastCloseBubble(guid: string) {
        let bubbleUser = this.bubbleUsers.find(i => i.guid == guid);
        bubbleUser && bubbleUser.clear();
    }
    /**
     * 关闭气泡，根据是否为本地显示选择广播或者服务器中转调用全局关闭气泡
     * @param guid 气泡拥有者的Guid
     * @param isLocally true为只在本地显示，false会广播给所有端显示
     */
    public closeBubble(guid: string, isLocally: boolean) {
        if (SystemUtil.isClient()) {
            if (isLocally) {
                if (!guid) {
                    this.player && this.boradcastCloseBubble(this.player.character.gameObjectId);
                } else {
                    this.boradcastCloseBubble(guid);
                }
            } else {
                if (!guid) {
                    this.player && this.serverCloseBubble(this.player.character.gameObjectId);
                } else {
                    this.serverCloseBubble(guid);
                }
            }
        } else {
            this.serverCloseBubble(guid);
        }
    }
    /**
     * 服务器中转调用全局显示气泡
     * @param guid 气泡拥有者的Guid
     * @param skinId 气泡皮肤ID
     * @param text 气泡显示文本内容
     */
    @RemoteFunction(mw.Server)
    private serverShowBubble(guid: string, skinId: number, text: string) {
        this.boardCastBubble(guid, skinId, text);
    }

    /**
     * 中转调用全局清除所有气泡
     * @param guid 气泡拥有者的Guid
     */
    @RemoteFunction(mw.Server)
    private serverCloseBubble(guid: string) {
        this.boradcastCloseBubble(guid);
    }

    /**
     * 客户端接受所有人的气泡对话，找到气泡拥有者，判断是否超出最大显示距离，超出则不显示，否则创建气泡
     * @param guid 气泡拥有者的Guid
     * @param skinId 气泡皮肤ID
     * @param text 气泡显示文本内容
     */
    @RemoteFunction(mw.Client, mw.Multicast)
    private boardCastBubble(guid: string, skinId: number, text: string) {
        if (this.viewDistance > 0 && this.player) {
            const obj = GameObject.findGameObjectById(guid);
            if (obj) {
                if (this.player.character.worldTransform) {
                    const squareDistance = mw.Vector2.squaredDistance(this.player.character.worldTransform.position, obj.worldTransform.position);
                    /**超出最大可显示距离，不气泡显示*/
                    if (squareDistance >= this.viewDistance * this.viewDistance) {
                        return;
                    }
                }
            }
        }
        let bubbleUser = this.bubbleUsers.find(i => i.guid == guid);
        if (!bubbleUser) {
            bubbleUser = new BubbleUser(guid, this);
            this.bubbleUsers.push(bubbleUser);
        }
        if (!skinId) {
            /**自动选择使用气泡皮肤ID*/
            skinId = this.player ? (this.player.character.gameObjectId == guid ? this.playerSkinId : this.otherSkinId) : this.otherSkinId;
        }
        bubbleUser.show(this.skins.find(i => i.id == skinId) || this.skins[0], text, this);
    }

    /**
     * 客户端接受设置表情气泡图片，找到气泡拥有者，判断是否超出最大显示距离，超出则不显示，否则创建气泡
     * @param guid 气泡拥有者的Guid
     * @param image 气泡图片Guid
     * @param skinId 气泡皮肤ID
     * @param size 气泡图片大小
     */
    public boardCastBubblePic(guid: string, image: string, skinId: number, size: Vector2) {
        if (this.viewDistance > 0 && this.player) {
            const obj = GameObject.findGameObjectById(guid);
            if (obj) {
                const squareDistance = mw.Vector2.squaredDistance(this.player.character.worldTransform.position, obj.worldTransform.position);
                if (squareDistance >= this.viewDistance * this.viewDistance) {
                    //距离超出，不显示
                    return;
                }
            }
        }
        let bubbleUser = this.bubbleUsers.find(i => i.guid == guid);
        if (!bubbleUser) {
            bubbleUser = new BubbleUser(guid, this);
            this.bubbleUsers.push(bubbleUser);
        }
        if (!skinId) {
            /**自动选择使用气泡皮肤ID*/
            skinId = this.player ? (this.player.character.gameObjectId == guid ? this.playerSkinId : this.otherSkinId) : this.otherSkinId;
        }
        bubbleUser.showPic(this.skins.find(i => i.id == skinId) || this.skins[0], image, this, size);
    }

    /**
     * 周期函数，每帧执行，更新气泡显示，若没有气泡则回收
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        for (let i = 0; i < this.bubbleUsers.length; i++) {
            const bubbleUser = this.bubbleUsers[i];
            if (bubbleUser.count == 0) {
                /**没有气泡，回收 */
                this.bubbleUsers.splice(i, 1);
                i--;
            } else {
                bubbleUser.onUpdate(dt);
            }
        }
    }

}