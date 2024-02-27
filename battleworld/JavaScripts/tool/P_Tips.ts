import { Globaldata } from "../const/Globaldata";
import Log4Ts from "../depend/log4ts/Log4Ts";
import Tips_Generate from "../ui-generate/common/Tips_generate";
import { Tween } from "./Tween";

export default class Tips extends Tips_Generate {
    private static readonly Y_START = 400;
    private static readonly Y_OVER = 150;
    private static readonly MOVE_SPEED = 500;
    private static KEEP_TIME = 1;
    private static _instance: Tips;
    private freeCellArr: Array<mw.Canvas> = [];//当前空闲的条目
    private activeCellArr: Array<mw.Canvas> = [];//当前激活的条目
    private overCellArr: Array<mw.Canvas> = [];//已经完成的条目

    private mTweenBottom: Tween<any> = null;

    /**消息缓存 */
    private mMsgCache: string[] = [];
    /**底部提示缓存 */
    private mBottomMsgCache: string[] = [];

    public static get instance(): Tips {
        if (this._instance == null) {
            this._instance = mw.UIService.create(Tips);
        }
        return this._instance;
    }

    /** 
    * 构造UI文件成功后，在合适的时机最先初始化一次 
    */
    protected onAwake() {
        //设置能否每帧触发onUpdate
        this.canUpdate = false;
        this.layer = mw.UILayerDialog;

    }

    onStart() {
        this.layer = mw.UILayerError;
        this.mTweenBottom = new Tween({ value: 0 }).to({ value: -50 }, 600).onUpdate((data) => {
            this.mBottomText.position = (new mw.Vector2(0, data.value));
        }).onComplete(() => {
            this.mBottomText.position = (new mw.Vector2(0, 0));
            this.mBottomText.visibility = (mw.SlateVisibility.Collapsed);
            this.mTweenBottom.stop();
            if (this.mBottomMsgCache.length > 0) {
                setTimeout(() => {
                    let t_msg = this.mBottomMsgCache.pop();
                    Tips.instance.showBottomTip(t_msg);
                }, 50);
            }
        });

        Event.addServerListener("Event_ShowTips", (...param: any[]) => {
            if (param == null || param.length == 0) {
                return;
            }

            let t_value = param[0];
            if (isNaN(Number(t_value))) {
                Tips.show(t_value);
                return;
            }
            Log4Ts.log(Tips, "Event_ShowTips", t_value);
        });

        Event.addServerListener("Event_ShowBottomTip", (content: string) => {
            Tips.showBottom(content);
        });
        let obj = this.mCell1.findChildByPath('Content_txt');

        this.mCell1["UI_Text"] = this.mCell1.findChildByPath('Content_txt') as mw.TextBlock;
        this.mCell2["UI_Text"] = this.mCell2.findChildByPath('Content_txt') as mw.TextBlock;
        this.mCell3["UI_Text"] = this.mCell3.findChildByPath('Content_txt') as mw.TextBlock;
        this.freeCellArr = [this.mCell1, this.mCell2, this.mCell3];

        this.mBottomText.visibility = (mw.SlateVisibility.Collapsed);

        for (let i = 0; i < this.freeCellArr.length; i++) {
            this.freeCellArr[i].visibility = (mw.SlateVisibility.Collapsed);
        }

        this.canUpdate = true;
    }

    /**
     * 根据日志等级判定输入
     * @param msg 
     */
    public static showByLogLevel(msg: string) {
        if (Globaldata.logLevel != 3) {
            return;
        }
        this.show(msg);
    }

    /**
     * 显示系统提示
     * @param msg 提示内容
     */
    public static show(msg: string, keepTime = 1) {
        this.KEEP_TIME = keepTime;
        if (Tips.instance.visible == false) {
            mw.UIService.show(Tips);
        }
        Tips.instance.showMsg(msg);
    }

    public static showBottom(content: string): void {
        if (Tips.instance.visible == false) {
            mw.UIService.show(Tips);
        }
        Tips.instance.showBottomTip(content);
    }


    // TODO 架构TODO 这一个show，一个showToClient 啥区别~得写在注释里面吧
    /**
     * 在客户端显示
     * @param player 玩家
     * @param content 内容
     */
    public static showToClient(player: mw.Player, ...param: any[]) {
        if (mw.SystemUtil.isServer()) Event.dispatchToClient(player, "Event_ShowTips", ...param);
    }

    /**在客户端显示提示 */
    public static showToAllClient(...param: any[]) {
        if (mw.SystemUtil.isServer()) {
            let t_players = Player.getAllPlayers();
            for (let index = 0; index < t_players.length; index++) {
                Event.dispatchToClient(t_players[index], "Event_ShowTips", ...param);
            }
        }

    }

    public static showBottomTipToClient(player: mw.Player, content: string) {
        if (mw.SystemUtil.isServer()) Event.dispatchToClient(player, "Event_ShowBottomTip", content);
    }

    private showMsg(content: string) {

        for (let index = 0; index < this.activeCellArr.length; index++) {
            const element = this.activeCellArr[index];
            if (element["UI_Text"] && element["UI_Text"].text == content) {
                return;
            }
        }



        if (this.activeCellArr.length >= 3) {
            let t_has = this.mMsgCache.includes(content);

            if (t_has) {
                return;
            }
            this.mMsgCache.push(content);
            return;
        }

        let cell: mw.Canvas = null;
        if (this.freeCellArr.length > 0) {
            cell = this.freeCellArr.shift();
        } else {
            cell = this.activeCellArr.shift();
        }
        cell["UI_Text"].text = (content);

        cell["state"] = 0;
        cell["stopTime"] = 0;
        //cell.visibility = (mw.SlateVisibility.SelfHitTestInvisible);
        this.activeCellArr.push(cell);
    }

    onUpdate(dt: number) {

        if (this.activeCellArr.length == 0) return;
        let pos: mw.Vector2 = null;
        for (let i = 0; i < this.activeCellArr.length; i++) {
            let cell = this.activeCellArr[i];
            switch (cell["state"]) {
                case 0:
                    cell.visibility = (mw.SlateVisibility.Visible);
                    pos = cell.position;
                    pos.y = Tips.Y_START;
                    cell.position = (pos);
                    cell["state"]++;
                    break;
                case 1:
                    pos = cell.position;
                    pos.y -= Tips.MOVE_SPEED * dt;
                    if (i == 0) {
                        if (pos.y <= Tips.Y_OVER) {
                            pos.y = Tips.Y_OVER;
                            cell["state"]++;
                        }
                    } else {
                        let lastCellPos = this.activeCellArr[i - 1].position;
                        if (pos.y <= lastCellPos.y + 60) {
                            pos.y = lastCellPos.y + 60;
                            cell["stopTime"] += dt;
                            if (cell["stopTime"] >= Tips.KEEP_TIME) {
                                cell["state"] += 2;
                            }
                        }
                    }
                    cell.position = (pos);
                    break;
                case 2:
                    cell["stopTime"] += dt;
                    if (cell["stopTime"] >= Tips.KEEP_TIME) {
                        cell["state"]++;
                    }
                    break;
                case 3:
                    cell.visibility = (mw.SlateVisibility.Collapsed);
                    this.overCellArr.push(cell);
                    break;
            }
        }
        while (this.overCellArr.length > 0) {
            let cell = this.overCellArr.shift();
            let index = this.activeCellArr.indexOf(cell);
            this.activeCellArr.splice(index, 1);
            this.freeCellArr.push(cell);

            if (this.mMsgCache.length > 0) {
                let t_msg = this.mMsgCache.pop();
                this.showMsg(t_msg);
            }
        }
    }

    private showBottomTip(content: string): void {
        if (this.mTweenBottom.isPlaying()) {
            this.mBottomMsgCache.push(content);
            return;
        }

        this.mBottomText.position = (new mw.Vector2(0, 0));
        this.mBottomText.visibility = (mw.SlateVisibility.Visible);
        this.mBottomText.text = (content);

        this.mTweenBottom.stop();
        this.mTweenBottom.start();
    }

}