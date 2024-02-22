import {PlayerManagerExtesion,} from "../../Modified027Editor/ModifiedPlayer";
import {ChatMsg} from "../../utils/ChatMsg";
import MessageBox from "../../utils/MessageBox";
import {stringToNumberArr, utils} from "../../utils/uitls";
import {AnalyticsTool} from "../Analytics/AnalyticsTool";
import {P_Msg} from "./P_Msg";
import {P_TradingChooseMain,} from "./P_TradeChoose";
import {P_historyRecord} from "./P_TradeHistory";
import {P_Trading} from "./P_Trading";
import {PlayerNameManager} from "./PlayerNameManager";
import {TradingModuleData, tradeRecord} from "./TradingModuleData";
import {TradingModuleS} from "./TradingModuleS";
import {GameConfig} from "../../config/GameConfig";
import {GlobalEnum} from "../../const/Enum";

export class TradingModuleC extends ModuleC<TradingModuleS, TradingModuleData> {

    private choosePlayerUI: P_TradingChooseMain;
    private histroyUI: P_historyRecord;
    private chatUI: P_Msg;
    private tradUI: P_Trading;

    protected onStart(): void {


        this.chatUI = mw.UIService.getUI(P_Msg);

        this.chatUI.onSendMsgAC.add(this.sendMsg.bind(this));
        this.tradUI = mw.UIService.getUI(P_Trading);
        this.tradUI.mMSgCanvas.addChild(this.chatUI.uiObject);
        this.chatUI.uiObject.visibility = mw.SlateVisibility.Collapsed;
        this.tradUI.hideAction.add(() => {
            if (this.chatUI && this.chatUI.uiObject.visible) {
                this.chatUI.uiObject.visibility = mw.SlateVisibility.Collapsed;
            }
        });
        this.tradUI.onSendMsgAC.add(this.chatPanel.bind(this));
        this.choosePlayerUI = mw.UIService.getUI(P_TradingChooseMain);
        this.histroyUI = mw.UIService.getUI(P_historyRecord);
        this.histroyUI.onCommentAC.add(this.comment.bind(this));
        this.choosePlayerUI.initTradeBtn(this.data.IsOpen);
        this.choosePlayerUI.onClickPlayerItemAC.add(this.onClickPlayerItem.bind(this));
        this.choosePlayerUI.onClickOpenBtnAC.add(this.setTradeOption.bind(this));
        this.choosePlayerUI.mHistory_Btn.onClicked.add(this.openHistroy.bind(this));

        this.initSceneTrigger();
    }

    protected async onEnterScene(sceneType: number): Promise<void> {
        let name = AccountService.getNickName();
        if (!name) name = "测试名字 " + utils.GetRandomNum(1, 100);
        this.server.net_enterGame(name);
    }

    /** 存名字 */
    net_PlayerJoin(str: string) {
        let arr = JSON.parse(str);
        PlayerNameManager.instance.clearMap();
        arr.forEach((element: { id: number, name: string }) => {
            PlayerNameManager.instance.addPlayerName(element.id, element.name);
        });
    }

    public async showChoosePlayerUI() {
        this.choosePlayerUI.setCanvasItem(await this.getPlayerData());
    }

    /**获取玩家数据 */
    public async getPlayerData() {
        let data = await this.server.net_getPlayerData();
        let arr: { id: number, state: GlobalEnum.TradingState, petId: number }[] = [];
        PlayerNameManager.instance.clearMap();
        JSON.parse(data).forEach((element: { id: number, name: string, state: number, petId: number }) => {
            arr.push({id: element.id, state: element.state, petId: element.petId});
            PlayerNameManager.instance.addPlayerName(element.id, element.name);
        });
        return arr;
    }

    /**点击了玩家item */
    private async onClickPlayerItem(playerID: number) {
        let isSuccess = await this.server.net_requestTrading(playerID);
        if (isSuccess) {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_15.Value);
        } else {
            MessageBox.showOneBtnMessage(GameConfig.Language.Text_messagebox_16.Value);
        }
        this.choosePlayerUI.hide();

        AnalyticsTool.action_sell(1, 0, 0);
    }

    /**评价 */
    private comment(is: boolean, data: tradeRecord) {
        let Arr = stringToNumberArr(data.str);
        let senderID = Arr[0];
        let receiverID = Arr[2];
        if (Player.localPlayer.userId == senderID.toString()) {
            this.server.net_comment(is, receiverID, JSON.stringify(data));
        } else {
            this.server.net_comment(is, senderID, JSON.stringify(data));
        }
    }

    /**设置交易选项 */
    public setTradeOption(IsOpen: boolean) {
        this.server.net_setTradeOption(IsOpen);
    }

    private openHistroy() {
        this.histroyUI.showPanel(this.data.Record);
    }


    /**当前聊天玩家id */
    private curPlayerID: number;
    /**目标聊天玩家id */
    private tarPlayerID: number;


    /**聊天面板 */
    private chatPanel(sendId: number, receiverId: number) {
        if (this.chatUI.uiObject.visible) {
            this.chatUI.uiObject.visibility = mw.SlateVisibility.Collapsed;
        } else {
            if (Player.localPlayer.playerId == sendId) {
                this.curPlayerID = sendId;
                this.tarPlayerID = receiverId;
            } else {
                this.curPlayerID = receiverId;
                this.tarPlayerID = sendId;
            }
            this.chatUI.uiObject.visibility = mw.SlateVisibility.Visible;
        }
    }

    /**发送消息 */
    private sendMsg(msg: string) {
        ChatMsg.enqueue({msg: msg, playerID: this.curPlayerID});
        this.server.net_sendMsg(this.tarPlayerID, msg);
    }

    /**接收消息 */
    net_receiveMsg(sendId: number, str: string) {
        ChatMsg.enqueue({msg: str, playerID: sendId});
        this.tradUI.setRedPointVis(true);
    }


    /**场景触发器交互 */

    private async initSceneTrigger() {
        let trigger = await GameObject.asyncFindGameObjectById("330EDD490C991F0F") as mw.Trigger;
        trigger?.onEnter.add(this.enterTrigger.bind(this));
        trigger?.onLeave.add(this.exitTrigger.bind(this));
    }

    private enterTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;
        this.showChoosePlayerUI();
    }

    private exitTrigger(obj: mw.GameObject) {
        if (PlayerManagerExtesion.isCharacter(obj) == false) {
            return;
        }
        let char = obj as mw.Character;
        if (char != Player.localPlayer.character) return;

    }
}