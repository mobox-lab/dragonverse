/*
 * @Author       : dal
 * @Date         : 2024-02-28 10:58:05
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 18:15:31
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\IDCardModule.ts
 * @Description  : 
 */

import { GameConfig } from "../../../config/GameConfig";
import Tips from "../../utils/Tips";
import { BaseInfo, DayLikeNum, GiftInfo, IntimacyInfo, LikeAddIntimacyVal, MaxRecentLikeNum, RecentLikeInfo, TestHeadImgList, TestNameList } from "./IDCardConst";
import { IDCardData, IDCardDataHelper, IDCardDataType } from "./IDCardDataHelper";
import IDCardDefine from "./IDCardDefine";
import IDCardPanel from "./ui/IDCardPanel";

export class IDCardModuleC extends ModuleC<IDCardModuleS, null> {

    protected onStart(): void {
        this.updateBaseInfo();
    }

    /** 更新初始信息 */
    private async updateBaseInfo() {
        this.server.net_reqUpdateBaseInfo(this.localPlayer.userId, await this.getLocalPlayerBaseInfo());
    }

    public async getLocalPlayerBaseInfo() {
        const baseInfo = new BaseInfo();
        const p = await Player.asyncGetLocalPlayer() as Player;
        baseInfo.headImgUrl = SystemUtil.isPIE ? TestHeadImgList[MathUtil.randomInt(0, TestHeadImgList.length)] : p["avatarUrl"];
        baseInfo.nickName = SystemUtil.isPIE ? TestNameList[MathUtil.randomInt(0, TestNameList.length)] : p["nickName"];
        baseInfo.sex = p.character.description.advance.base.characterSetting.somatotype % 2;
        baseInfo.userId = p.userId;
        return baseInfo;
    }

    /** 检查一个玩家是否可以点赞 */
    private async checkCanLike(beLikedUserId: string): Promise<boolean> {
        if (beLikedUserId === Player.localPlayer.userId) { Tips.show("不能给自己点赞（请把这个接多语言）"); return false; }
        if (!Player.getPlayer(beLikedUserId)) { Tips.show("你要点赞的玩家已离线或不在一个房间！（请把这个接多语言）"); return false; }
        const data = await this.reqData(Player.localPlayer.userId);
        if (IDCardDefine.checkIsNewDay(data.lastLoginTimeStamp)) {
            this.server.net_updateToDayLikeInfo(Player.localPlayer.userId);
            return true;
        }
        if (data.todayLikedUserIdList.includes(beLikedUserId)) { Tips.show("无法重复点赞!（请把这个接多语言）"); return false; }
        if (data.todayLeftLikeNum <= 0) { Tips.show("今天点赞太多了，明天再来吧!（请把这个接多语言）"); return false; }
        return true;
    }

    /** 检查一个玩家是否可以送礼 */
    private checkCanGift(beLikedUserId: string): boolean {
        if (beLikedUserId === Player.localPlayer.userId) { Tips.show("不能给自己送礼（请把这个接多语言）"); return false; }
        if (!Player.getPlayer(beLikedUserId)) { Tips.show("你要送礼的玩家已离线或不在一个房间！（请把这个接多语言）"); return false; }
        return true;
    }

    public async reqData(userId: string) {
        return this.server.net_reqData(userId);
    }

    public reqSetData(userId: string, properties: string[], values: any[]) {
        this.server.net_reqSetData(userId, properties, values);
    }

    /** 请求点赞 */
    public async reqLike(beLikerId: string) {
        if (await this.checkCanLike(beLikerId)) {
            this.server.net_reqLike(this.localPlayer.userId, beLikerId);
        }
    }

    /**
     * 响应点赞
     * @param likerId 
     * @param beLikerData 
     */
    public net_resLike(likerId: string, beLikerData: IDCardData) {
        // 被点赞的人
        if (likerId != this.localPlayer.userId && beLikerData.baseInfo.userId === this.localPlayer.userId) {
            Tips.show(`${Player.getPlayer(likerId).character.displayName}觉得你很不错，给你点了个赞（请把这个接多语言）`);
        }
        this.checkNeedRefreshPanel(beLikerData);
    }

    private get selfPanel() {
        return UIService.getUI(IDCardPanel);
    }

    public checkNeedRefreshPanel(beLikerData: IDCardData) {
        if (this.selfPanel.visible && this.selfPanel["userId"] === beLikerData.baseInfo.userId) {
            this.selfPanel.updateIDCardInfo(beLikerData);
        }
    }

    /** 请求送礼 */
    public reqGift() {
        Tips.show(`功能待开发（请把这个接多语言）`);
    }

    /** 响应送礼 */
    public net_resGift() {
        Tips.show(`功能待开发（请把这个接多语言）`);
    }
}

export class IDCardModuleS extends ModuleS<IDCardModuleC, null> {

    /**
     * 
     * @param likerId 点赞的人
     * @param beLikerId 被点赞的人
     */
    @Decorator.noReply()
    public async net_reqLike(likerId: string, beLikerId: string) {
        let serverLikerId = this.currentPlayer.userId;
        // 防作弊
        if (serverLikerId != null && serverLikerId != undefined) { likerId = serverLikerId; }
        // 点赞的人
        const likerData = await this.net_reqData(likerId);
        // 被点赞的人
        const beLikerData = await this.net_reqData(beLikerId);
        if (!this.checkCanLike(likerData, beLikerData)) { return; }

        // 结算请密度
        this.countIntimacy(likerData, beLikerData, LikeAddIntimacyVal);

        likerData.todayLeftLikeNum -= 1;
        likerData.todayLikedUserIdList.push(beLikerId);
        this.saveData(likerId, likerData);

        beLikerData.beLikedCount += 1;
        beLikerData.charmVal += 1;
        const recentLikeInfo = new RecentLikeInfo();
        recentLikeInfo.userId = likerId;
        recentLikeInfo.nickName = likerData.baseInfo.nickName;
        beLikerData.recentLikeInfoList.push(recentLikeInfo);
        if (beLikerData.recentLikeInfoList.length > MaxRecentLikeNum) { beLikerData.recentLikeInfoList.shift(); }
        this.saveData(beLikerId, beLikerData);

        // 给回调
        // this.getClient(Player.getPlayer(beLikerId)).net_resLike(likerId, beLikerData);
        // this.getClient(Player.getPlayer(likerId)).net_resLike(likerId, beLikerData);
        this.getAllClient().net_resLike(likerId, beLikerData);
    }

    /**
     * 送了礼,要总结一下两个玩家之间亲密度
     * @param data1 数据1
     * @param data2 数据2
     * @param addVal 增加的亲密读值
     */
    private countIntimacy(data1: IDCardData, data2: IDCardData, addVal: number) {
        this.intimacyCountUtil(data1, data2.baseInfo.userId, addVal);
        this.intimacyCountUtil(data2, data1.baseInfo.userId, addVal);
    }

    private intimacyCountUtil(data: IDCardData, withUserId: string, addVal: number) {
        let info = data.intimacyInfoList.find(v => { return v.userId === withUserId });
        if (!info) { info = new IntimacyInfo(); data.intimacyInfoList.push(info); }
        info.userId = withUserId;
        info.value += addVal;
    }

    /** 检查一个玩家是否可以点赞 */
    private checkCanLike(likerData: IDCardData, beLikerData: IDCardData): boolean {
        if (!Player.getPlayer(beLikerData.baseInfo.userId)) { return false; }
        if (likerData.baseInfo.userId === beLikerData.baseInfo.userId) { return false; }
        if (IDCardDefine.checkIsNewDay(likerData.lastLoginTimeStamp)) {
            this.updateToDayLikeInfo(likerData);
            return true;
        }
        if (likerData.todayLeftLikeNum <= 0) { return false; }
        if (likerData.todayLikedUserIdList.includes(beLikerData.baseInfo.userId)) { return false; }
        return true;
    }

    /** 检查一个玩家是否可以送礼 */
    private checkCanGift(likerId: string, beLikerId: string): boolean {
        if (!Player.getPlayer(beLikerId)) { return false; }
        if (likerId === beLikerId) { return false; }
        return true;
    }

    /** 请求更新，同时更新上次登录时间 */
    @Decorator.noReply()
    public async net_reqUpdateBaseInfo(userId: string, baseInfo: BaseInfo) {
        const data = await this.net_reqData(userId);
        data.baseInfo = baseInfo;
        this.initGift(data);
        // 登录时发现是新的一天那么更新今日份点赞信息
        if (IDCardDefine.checkIsNewDay(data.lastLoginTimeStamp)) {
            this.updateToDayLikeInfo(data);
        }
        this.saveData(userId, data);
    }

    /**
     * 初始化礼物
     * @param data 
     */
    private initGift(data: IDCardData) {
        const giftIdList = GameConfig.Gift.getAllElement().map((v) => { return v.id });
        const myGiftIdList = data.giftInfoList.map(v => { return v.id });
        const needInitGift = giftIdList.filter(v => { return !myGiftIdList.includes(v) });
        needInitGift.forEach(v => {
            const giftInfo = new GiftInfo();
            giftInfo.id = v;
            data.giftInfoList.push(giftInfo);
        });
    }

    private updateToDayLikeInfo(data: IDCardData) {
        data.lastLoginTimeStamp = Date.now();
        data.todayLeftLikeNum = DayLikeNum;
        data.todayLikedUserIdList = [];
    }

    /** 更新今日份点赞信息 */
    @Decorator.noReply()
    public net_updateToDayLikeInfo(userId: string) {
        this.net_reqSetData(userId, [IDCardDataType.LastLoginTimeStamp, IDCardDataType.TodayLeftLikeNum, IDCardDataType.TodayLikedUserIdList],
            [Date.now(), DayLikeNum, []]);
    }

    public async net_reqData(userId: string) {
        return IDCardDataHelper.reqGetData(userId);
    }

    @Decorator.noReply()
    public net_reqSetData(userId: string, properties: string[], values: any[]) {
        IDCardDataHelper.reqSetData(userId, properties, values);
    }

    @Decorator.noReply()
    private saveData(userId: string, data: IDCardData) {
        IDCardDataHelper.reqSaveData(userId, data);
    }
}
