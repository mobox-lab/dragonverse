import BubbleUI_Generate from "../../../ui-generate/ShareUI/common/BubbleUI_generate";
import { LanUtil } from "../../utils/LanUtil";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { Bubble, BubbleProxy } from "./BubbleProxy";
import { IBubbleUI } from "./IBubbleUI";

export class BubbleEvt {
    public static evt_sendBubble: string = "evt_sendBubble";
}


@mw.Component
export default class BubbleScript extends BubbleProxy {
    /**皮肤ID */
    public static skinId: number = 0;
    /**保存对应文本index */
    private textMap: Map<string, number> = new Map();
    /**
     * 初始化，设置气泡皮肤，设置气泡UI，监听MGS消息
     */
    protected onStart(): void {
        super.onStart();
        /**监听MGS消息 */
        if (SystemUtil.isClient()) {
            ///local bubble
            Event.addLocalListener(BubbleEvt.evt_sendBubble, (guid: string, text: string) => {
                let len = text.split("|");
                let offset = len.shift();
                if (Number(offset)) {
                    this.offset = Number(offset);
                }
                let index: number = 0;
                if (this.textMap.has(guid)) {
                    index = this.textMap.get(guid);
                    index++;
                }
                this.textMap.set(guid, index);
                let newText = LanUtil.getText(len[index % len.length]);
                this.sendBubble(guid, Player.localPlayer.character.gameObjectId, 0, newText, false);
            })
            //text bubble
            Event.addLocalListener("Bubble_scMsg", (txt: string) => {
                GhostTraceHelper.chatTrace(0);
                Event.dispatchToServer("Bubble_Msg", txt, BubbleScript.skinId);
            })
            Event.addServerListener("Bubble_ClientMsg", (guid: string, text: string, skinId: number) => {
                this.offset = 60;
                this.sendBubble(guid, guid, skinId, text);
            })
            /**图片气泡 */
            Event.addLocalListener("BubblePic", (picId: string) => {
                GhostTraceHelper.chatTrace(1);
                Event.dispatchToServer("BubblePic_Msg", picId, BubbleScript.skinId)
            })
            Event.addServerListener("BubblePic_ClientMsg", (guid: string, picId: string, skinId: number) => {
                let target = GameObject.findGameObjectById(guid)
                Bubble.showBubblePic(skinId, picId, guid, new Vector2(100, 100))
            })
            Event.addLocalListener("SetBorderSpace", (right: number, down: number) => {
                console.log("接收到事件 ", right, down);
                this.skins[0].borderSpaceRight = right;
                this.skins[0].borderSpaceDown = down;
            })
        }
        else {
            Event.addClientListener("Bubble_Msg", (player: mw.Player, text: string, skin: number) => {
                Event.dispatchToAllClient("Bubble_ClientMsg", player.character.gameObjectId, text, skin);
            })
            Event.addClientListener("BubblePic_Msg", (player: mw.Player, picId: string, skinId: number) => {
                Event.dispatchToAllClient("BubblePic_ClientMsg", player.character.gameObjectId, picId, skinId)
            })
        }
    }


    private sendBubble(guid: string, chatId: string, skinId: number, text: string, isHuman: boolean = true) {
        let target = GameObject.findGameObjectById(guid)
        Bubble.showBubble(skinId, text, guid, true);
    }

    protected onCreateBubbleUI(): IBubbleUI {
        return mw.UIService.create(BubbleUI_Generate);
    }
}