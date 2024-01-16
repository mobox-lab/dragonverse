
import { RankModuleS, RankType } from "./RankModuleS";
import { RankPanelItem } from "./P_Rank";
import { GlobalData } from "../../const/GlobalData";
import { GameConfig } from "../../config/GameConfig";

import { AreaDivideManager } from "../AreaDivide/AreaDivideManager";

export class RankUIData {
    public playerId: number;
    public rank: number;
    public name: string;
    public value: number;

    constructor(playerId: number, name: string, value: number) {
        this.playerId = playerId;
        this.name = name;
        this.value = value;
    }
}

export class RankModuleC extends ModuleC<RankModuleS, null>{

    /**当前排名类型 */
    private curRankType: RankType = RankType.Diamond;
    /**当前排名类型对应的UI按钮 */
    private curTypeBtn: mw.StaleButton = null;
    private curPlayer: mw.Player;
    /**排名世界ui文本 */
    private dancePlayerNames: Array<mw.TextBlock> = [];
    private ui: mw.UIWidget;


    private interval: any;


    protected onStart(): void {
        this.getWorldUI();
        mw.AvatarSettings.optimizationEnabled = (false);
        AreaDivideManager.instance.onAreaChangeAC.add(this.onAreaChange.bind(this));

    }


    protected async onEnterScene(sceneType: number): Promise<void> {

        this.curPlayer = Player.localPlayer;

        TimeUtil.delayExecute(() => {
            const nickName = mw.AccountService.getNickName();
            let playerName = nickName ? nickName : this.curPlayer.character.displayName;
            this.server.net_addPlayer(playerName);
        }, 5);
    }
    private onAreaChange(preId: number, curId: number) {
        if (preId < 3000 && curId > 3000) {
            this.setUIPos(1);
        } else if (preId > 2000 && curId < 2000) {
            this.setUIPos(0);
        }
    }
    /**设置ui排行榜位置 */
    protected setUIPos(index: number) {
        this.ui.worldTransform.position = GlobalData.Rank.rankUIPos[index];
        this.ui.worldTransform.rotation = GlobalData.Rank.rankUIRot[index];
        this.ui.worldTransform.scale = GlobalData.Rank.rankUIScale[index];
    }

    /**向itemList中添加item */
    private addRankItem(uiData: RankUIData, type: RankType): RankPanelItem {
        let itemUI = mw.UIService.create(RankPanelItem);
        this.canvas.addChild(itemUI.uiObject);
        itemUI.setData(uiData, type);
        this.allItem.set(uiData.playerId, itemUI);
        return itemUI;
    }


    private clearInterval() {
        if (this.interval) {
            TimeUtil.clearInterval(this.interval);
            this.interval = null;
        }
    }


    /***********世界ui 相关********** */

    private icon_1: mw.Image;
    private icon_2: mw.Image;
    private canvas: mw.Canvas;
    private scrollBox: mw.ScrollBox;
    private refreshBtn: mw.MaskButton;

    private itemPool: RankPanelItem[] = [];
    private allItem: Map<number, RankPanelItem> = new Map();
    /**上一次的排名列表 */
    private lastAllItem: Map<number, RankUIData> = new Map();


    /**获取世界ui */
    private async getWorldUI() {
        this.ui = await GameObject.asyncFindGameObjectById(GlobalData.Rank.worldUIGuid) as mw.UIWidget;
        let root = this.ui.getTargetUIWidget().rootContent;
        this.icon_1 = root.findChildByPath("mImage_iconchange1") as mw.Image;
        this.icon_2 = root.findChildByPath("mImage_iconchange2") as mw.Image;
        this.canvas = root.findChildByPath("ScrollBox/Canvas") as mw.Canvas;
        this.scrollBox = root.findChildByPath("ScrollBox") as mw.ScrollBox;
        this.scrollBox.allowOverscroll = false;
        let diamondBtn = root.findChildByPath("StaleButton") as mw.StaleButton;
        let collectBtn = root.findChildByPath("StaleButton_1") as mw.StaleButton;
        this.refreshBtn = root.findChildByPath("mBtn_refresh") as mw.MaskButton;
        let text = root.findChildByPath("mText_Title") as mw.TextBlock;
        text.text = GameConfig.Language.Rank_Title_1.Value;
        text = root.findChildByPath("TextBlock") as mw.TextBlock;
        text.text = GameConfig.Language.Rank_Title_2.Value;
        text = root.findChildByPath("TextBlock_1") as mw.TextBlock;
        text.text = GameConfig.Language.Rank_Title_3.Value;
        text = root.findChildByPath("mText_Title") as mw.TextBlock;
        text.text = GameConfig.Language.Rank_Title_1.Value;

        this.curTypeBtn = diamondBtn;
        this.curRankType = RankType.Diamond;
        this.curTypeBtn.enable = false;
        // 初始化icon
        this.icon_1.imageGuid = GlobalData.Rank.itemImageGuids.get(this.curRankType);
        this.icon_2.imageGuid = GlobalData.Rank.itemImageGuids.get(this.curRankType);
        // 排行榜类型切换按钮点击事件
        collectBtn.onClicked.add(() => {

            this.switchRankType(RankType.Collect, collectBtn);
            this.refreshPanel(RankType.Collect);
        });
        diamondBtn.onClicked.add(() => {

            this.switchRankType(RankType.Diamond, diamondBtn);
            this.refreshPanel(RankType.Diamond);
        });

        this.refreshBtn.visibility = mw.SlateVisibility.Visible;
        // 刷新排行榜信息
        this.refreshBtn.pressedDelegate.add(async () => {

            // 刷新排行榜
            this.net_refresh();

        })
        const color = GlobalData.Rank.nameColors;
        let rank = 1;
        GlobalData.Rank.npcWorldUIMap.forEach(async (UIGuid, npcGuid) => {
            let ui = await GameObject.asyncFindGameObjectById(UIGuid) as mw.UIWidget;
            let text = ui.getTargetUIWidget().rootContent.findChildByPath("mText_RankLevel") as mw.TextBlock;
            let name = ui.getTargetUIWidget().rootContent.findChildByPath("mText_UserName") as mw.TextBlock;
            this.dancePlayerNames.push(name);
            name.text = "";
            text.text = "#" + (rank);
            text.setFontColorByHex(color);
            name.setFontColorByHex(color);
            rank++;
        })

    }

    /**刷新跳舞的npc和名称UI */
    public refreshDanceNpcText(dataList: RankUIData[]) {
        // 前三名文本
        for (let i = 0; i < 3; i++) {
            const data = dataList[i];
            // 房间内人数小于三人，玩家不存在则直接设置名称UI为空
            if (data == null) {
                this.dancePlayerNames[i].text = "";
            }
            // 玩家存在则设置为玩家名
            else {
                let rankUI = this.allItem.get(data.playerId);
                this.dancePlayerNames[i].text = rankUI.mText_Username.text;
            }
        }
    }


    /**刷新panel */
    private async refreshPanel(type: RankType) {

        // UI按钮进入cd
        this.setRefreshBtnCd(this.refreshBtn);
        // 滚动条到最前面
        this.scrollBox.scrollToStart();
        // 根据排行榜类型获取排名数据
        let uiDataList = await this.getRankByType(type);
        let playerCount = uiDataList.length;
        // 和上一次的UI列表进行对比, 并播放对应的动画
        this.playUIAnim(uiDataList, this.allItem);

        this.canvas.size = new mw.Vector2(1200, playerCount * 90);
        // // 将数据设置给UI
        // for (let i = 0; i < playerCount; i++) {

        //     const data = uiDataList[i];
        //     data.rank = i + 1;
        //     let uiItem = this.allItem[i];
        //     uiItem.setData(data, type);
        //     this.ui.refresh();
        // }
        // 刷新跳舞npc下方的text
        this.refreshDanceNpcText(uiDataList);
    }


    /**执行UI动画 */
    private playUIAnim(newData: RankUIData[], oldList: Map<number, RankPanelItem>) {
        let len = newData.length;
        // 新增的item, 逐渐出现
        for (let i = 0; i < len; i++) {
            const data = newData[i];
            data.rank = i + 1;
            // 说明是本次刷新后新增加的item
            if (!oldList.has(data.playerId)) {
                let itemUI = this.addRankItem(data, this.curRankType);
                this.itemFadeInTween(itemUI);
            }
            // 本次排名和上次排名都有的item，排名未变动则不变，排名变动则平移
            else {
                let itemUI = oldList.get(data.playerId);
                // 排名未变动
                if (data.rank == itemUI.rank) {
                    // 什么都不做
                }
                // 排名变动
                else {
                    this.itemMoveTween(itemUI, itemUI.rank, data.rank);
                }
                itemUI.setData(data, this.curRankType);
            }
        }
        // 已经被删除的item，逐渐消失
        oldList.forEach((uiItem, playerId) => {
            let include = false;
            for (let i = 0; i < newData.length; i++) {
                if (newData[i].playerId == playerId) {
                    include = true;
                    break;
                }
            }
            // 如果新数据不包含该item，逐渐消失并删除
            if (!include) {
                this.itemFadeOutTween(uiItem);
            }
        });
    }


    /**排名item淡入 */
    private itemFadeInTween(item: RankPanelItem) {
        item.uiObject.position = this.calcuItemPos(item.rank);
        new mw.Tween({ alpha: 0 }).to({ alpha: 1 }, 1000)
            .onUpdate((obj) => {
                item.uiObject.renderOpacity = obj.alpha;
            })
            .start();
    }


    /**排名item淡出 */
    private itemFadeOutTween(item: RankPanelItem) {
        item.uiObject.position = this.calcuItemPos(item.rank);
        this.allItem.delete(item.playerId);
        new mw.Tween({ alpha: 1 }).to({ alpha: 0 }, 1000)
            .onUpdate((obj) => {
                item.uiObject.renderOpacity = obj.alpha;
            })
            .onComplete(() => {
                item.destroy();
            })
            .start();
    }


    /**排名item平移 */
    private itemMoveTween(item: RankPanelItem, fromRank: number, toRank: number) {
        let fromPos = this.calcuItemPos(fromRank);
        let toPos = this.calcuItemPos(toRank);
        new mw.Tween(fromPos).to(toPos, 1000)
            .onUpdate(pos => {
                item.uiObject.position = pos;
            })
            .onComplete(() => {

            })
            .start();
    }


    /**item设置位置 */
    private calcuItemPos(rank: number): Vector2 {
        //距离左边的偏移量
        let offX = 0;
        //距离上边的偏移量
        let offY = 0;
        //每个item的间隔
        let space = 5;
        //每行的个数
        let row = 1;
        //每个item的宽度
        let itemWidth = 1200;
        //每个item的高度
        let itemHeight = 85;
        //计算出每个item的位置
        let index_x: number = rank % row;
        if (index_x == 0) {
            index_x = row;
        }
        let x = (index_x - 1) * (itemWidth + space) + offX;
        let y = Math.floor((rank - 1) / row) * (itemHeight + space) + offY;
        return new Vector2(x, y);
    }


    /**设置手动刷新排行榜按钮cd */
    private setRefreshBtnCd(btn: mw.MaskButton) {
        // 设置按钮不可交互
        this.refreshBtn.visibility = mw.SlateVisibility.HitTestInvisible;
        btn.fanShapedValue = 0;
        // 刷新频率
        let dt = 0.02 / GlobalData.Rank.manualRefreshCd;
        TimeUtil.setInterval(() => {
            btn.fanShapedValue += dt;
        }, dt,
            () => {
                if (btn.fanShapedValue >= 1) {
                    // 设置按钮可交互
                    this.refreshBtn.visibility = mw.SlateVisibility.Visible;
                    return true;
                } else {
                    return false;
                }
            })
    }

    /**根据排名类型从服务端获取排名数据 */
    private async getRankByType(type: RankType) {
        let rankListStr = await this.server.net_getRankByType(type);
        // console.warn(`获取到 ${type} 类型的数据，数据为： ${rankListStr}`);
        let uiDataList = JSON.parse(rankListStr) as RankUIData[];
        return uiDataList;
    }

    /**切换排名类型 */
    private switchRankType(newType: RankType, newBtn: mw.StaleButton) {
        // 切换排行榜icon图片
        this.icon_1.imageGuid = GlobalData.Rank.itemImageGuids.get(newType);
        this.icon_2.imageGuid = this.icon_1.imageGuid;
        // 禁用本类型按钮
        newBtn.enable = false;
        // 启用原类型按钮
        this.curTypeBtn.enable = true;
        // 存储当前类型按钮
        this.curTypeBtn = newBtn;
        // 存储当前排名类型
        this.curRankType = newType;
    }


    /**服务端调令客户端刷新 */
    public net_refresh() {
        this.refreshPanel(this.curRankType);
    }

}