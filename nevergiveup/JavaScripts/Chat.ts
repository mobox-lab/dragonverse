/*
* @Author: yudong.wu yudong.wu@appshahe.com
* @Date: 2023-01-17 11:00:59
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-24 17:40:02
 * @FilePath: \nevergiveup\JavaScripts\Chat.ts
* @Description: 
*/

import { Bubble } from "./Bubble";
import { GameManager } from "./GameManager";
import { GameConfig } from "./config/GameConfig";
import { MGSTool } from "./tool/MGSTool";
import ChatGame_HUD_Generate from "./ui-generate/HUD/ChatGame_HUD_generate";
import Word_Generate from "./ui-generate/Sundry/Word_generate";
import QuickBubbleUI_Generate from "./ui-generate/bubbleModule/QuickBubbleUI_generate";


abstract class ChatPFDef extends mw.Script {
    protected abstract server_showText(playerId: number, guid: string, text: string);

}

abstract class ChatClient extends ChatPFDef {
    @mw.Property({ displayName: "聊天文字配置", arrayDefault: "", group: "基础配置" })
    public chatConfig: string[] = [];
    @mw.Property({ displayName: "聊天气泡最大显示距离(-1为无限制)", group: "基础配置" })
    public maxShowDistance: number = -1;
    /**主界面 */
    private _main: ChatGame_HUD_Generate;
    /**主界面Nood */
    private _wordArr: Word_Generate[] = [];
    /**当前玩家 */
    public currentPlayer: mw.Player;
    /**气泡对象 */
    private _bubbles: Bubble[] = [];
    /**气泡UI对象池 */
    private _uiPool: mwext.ObjPool<QuickBubbleUI_Generate>;

    onStart(): void {
        super.onStart();
        // if (mw.SystemUtil.isClient()) {
        //     this.initMain();
        //     this.addLayoutNodes();
        //     // Event.addLocalListener('LanguageInit', this.addWordBtnEvents.bind(this));
        //     TimeUtil.delayExecute(() => {
        //         this.addWordBtnEvents();
        //     }, 3)
        //     // this.initBubble();
        //     // this.useUpdate = true;
        // }
    }

    /**初始化UI */
    initMain() {
        this._main = mw.UIService.show(ChatGame_HUD_Generate);
        this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
        this._main.wordBtn.onClicked.add(() => {
            this._main.canvas_word.visibility = (this._main.canvas_word.visible ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.Visible);
            this._main.canvas_word.visible && MGSTool.clickBtn("10");
        });
    }

    /**向滚动条中添加结点 */
    addLayoutNodes() {
        let length_word = this.chatConfig.length;
        for (let i = 0; i < length_word; i++) {
            let item = mw.UIService.create(Word_Generate);
            this._main.mCanvasWord.addChild(item.uiObject);
            item.uiObject.size = item.rootCanvas.size;
            this._wordArr.push(item);
        }
    }

    /**为每个文字按钮添加监听事件 */
    addWordBtnEvents() {
        let wNodes = this._wordArr;
        let config = this.chatConfig;
        wNodes.forEach(node => {
            let btn = node.mBtn_word;
            let index = wNodes.indexOf(node);
            let string = GameConfig.Language.getElement(config[index]).Value + "";
            btn.text = string;
            btn.onClicked.add(() => {
                this._main.canvas_word.visibility = mw.SlateVisibility.Collapsed;
                GameManager.boardcastMessage(string);
                MGSTool.quickChat(index);
            });
        });
    }

    /**
     * 初始化气泡UI对象池
     */
    initBubble() {
        Player.asyncGetLocalPlayer().then(player => {
            this.currentPlayer = player;
        });
        this._uiPool = new mwext.ObjPool(
            () => {
                const ui = mw.UIService.create(QuickBubbleUI_Generate);
                return ui;
            },
            (ui: QuickBubbleUI_Generate) => {
                ui.rootCanvas.visibility = mw.SlateVisibility.HitTestInvisible;
                ui.rootCanvas.renderScale = Vector2.zero;
                ui.dialogText.autoSizeEnable = true;
                ui.dialogText.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
                ui.dialogText.text = "";
                ui.dialogText.invalidateLayoutAndVolatility();
            },
            (ui: QuickBubbleUI_Generate) => { ui.destroy(); }, () => { }, 3);
    }


    /**
     * 显示UI
     * @param text
     */
    showText(text: string) {
        if (this.currentPlayer.character) {
            this.server_showText(this.currentPlayer.playerId, this.currentPlayer.character.gameObjectId, text);
        }
    }

    /**
     * 服务端回调，真正push显示消息
     * @param player 玩家
     * @param guid 角色的Guid
     * @param text 展示的文字
     */
    @RemoteFunction(mw.Client)
    client_onShowText(player: mw.Player, guid: string, text: string) {
        GameObject.asyncFindGameObjectById(guid).then(object => {
            object.onDestroyDelegate.add(() => {
                this.clear(object);
            });
            this.showDialog(object, text);
        });
    }

    /**
     * 显示聊天气泡
     * @param object 所属的物体
     * @param text 展示的文字
     */
    showDialog(object: mw.GameObject, text: string) {
        const playerBubbles = this._bubbles.filter(i => i.object == object);
        if (playerBubbles.length > 4) {
            // 删除多余文本，每个人只能说4条
            const index = this._bubbles.findIndex(i => i.object == object);
            this._bubbles[index].destory();
            this._bubbles.splice(index, 1);
        }
        this._bubbles.push(new Bubble(object, this._uiPool, text, this.sortAllBubbles));
    }

    /**
     * 排序这个玩家的所有气泡，超过最大数量则删除上面的
     * @param owner 拥有者
     */
    sortAllBubbles = (owner: mw.GameObject) => {
        const playerBubbles = this._bubbles.filter(i => i.object == owner);
        let offset = 0;
        for (let i = playerBubbles.length - 1; i >= 0; i--) {
            offset += playerBubbles[i].height;
            playerBubbles[i].offset(offset);
            offset += 5;
        }
    };

    /**
     * 清除这个玩家的所有消息
     * @param playerId
     */
    clear(object: mw.GameObject) {
        for (let i = 0; i < this._bubbles.length; i++) {
            if (this._bubbles[i].object == object) {
                this._bubbles[i].destory();
                this._bubbles.splice(i, 1);
                i--;
            }
        }
    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
        for (let i = 0; i < this._bubbles.length; i++) {
            if (this._bubbles[i].onUpdate(dt)) {
                this._bubbles[i].destory();
                this._bubbles.splice(i, 1);
                i--;
            }
        }
    }

}

@Component
export default class ChatServer extends ChatClient {
    onStart(): void {
        super.onStart();
    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
    }

    /**
     * 服务器处理聊天气泡是否分发给其他玩家
     * @param curplayer 发出气泡的玩家
     * @param guid 角色的guid
     * @param text 聊天文字
     */
    @RemoteFunction(mw.Server)
    protected server_showText(playerId: number, guid: string, text: string) {
        if (this.maxShowDistance == -1) {
            Player.getAllPlayers().forEach(e => {
                this.client_onShowText(e, guid, text);
            })
        }
        else {
            const players = Player.getAllPlayers();
            let curplayer = Player.getPlayer(playerId);
            for (const player of players) {
                if (player === curplayer) {
                    this.client_onShowText(player, guid, text);
                }
                else {
                    const len = Vector.distance(player.character.worldTransform.position, curplayer.character.worldTransform.position);
                    if (len <= this.maxShowDistance) {
                        this.client_onShowText(player, guid, text);
                    }
                }
            }
        }
    }
}
