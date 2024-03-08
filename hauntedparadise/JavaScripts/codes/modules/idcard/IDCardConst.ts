/*
 * @Author       : dal
 * @Date         : 2024-02-28 10:07:31
 * @LastEditors  : dal
 * @LastEditTime : 2024-02-29 18:27:26
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\idcard\IDCardConst.ts
 * @Description  : 
 */

import { EGameTheme } from "../../Defines";

/** 测试头像列表 */
export const TestHeadImgList: string[] = ["170386", "170385", "174057", "218467", "174094", "170380"];

/** 测试名列表 */
export const TestNameList: string[] = [
    "梦回江南",
    "静水深流",
    "月下独酌",
    "墨色流年",
    "风过无痕",
    "云起龙骧",
    "清歌妙舞",
    "雪落无声",
    "竹影清风",
    "琉璃梦境"];

/** 每日最多点赞次数 */
export const DayLikeNum: number = 20;

/** 最多最近的点赞和送礼记录次数 */
export const MaxRecentLikeNum: number = 10;

/** 被人点赞增加的亲密度 */
export const LikeAddIntimacyVal: number = 1;

/** 在身份卡上的游戏主题信息 */
export const OnCardGameThemeList: EGameTheme[] = [EGameTheme.School, EGameTheme.Hospital, EGameTheme.Graveyard, EGameTheme.Town, EGameTheme.Empty];

/** 玩家基础信息 */
export class BaseInfo {

    /** 头像url */
    headImgUrl: string;

    /** 昵称 */
    nickName: string = "";

    /** 0女，1男 */
    sex: number = 0;

    userId: string;
}

/** 近期被点赞的信息  */
export class RecentLikeInfo {

    /** 礼物的时间戳 */
    timeInterval: number = Date.now();

    /** userId */
    userId: string;

    /** 玩家233名 */
    nickName: string = "";
}

/** 礼物信息 */
export class GiftInfo {

    /** 礼物编号 */
    id: number;

    /** 礼物数量 */
    count: number = 0;

    /** 历史上送过这个礼物的玩家id */
    giftUserIdList: string[] = [];
}

/** 近期礼物信息 */
export class RecentGiftInfo extends GiftInfo {

    /** 礼物的时间戳 */
    timeInterval: number = Date.now();

    /** userId */
    userId: string;

    /** 玩家233名 */
    nickName: string = "";
}

/** 亲昵度信息 */
export class IntimacyInfo {

    userId: string;

    value: number = 0;
}