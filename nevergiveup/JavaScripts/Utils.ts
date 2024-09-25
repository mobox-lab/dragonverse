/*
 * @Author: wanghua.zhao wanghua.zhao@appshahe.com
 * @Date: 2023-06-09 18:48:17
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-18 16:22:09
 * @FilePath: \nevergiveup\JavaScripts\Utils.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import Log4Ts from "mw-log4ts";
import { PlayerUtil } from "./Modules/PlayerModule/PlayerUtil";
import { TipsManager } from "./UI/Tips/CommonTipsManagerUI";
import { IElementBase } from "./config/ConfigBase";
import { GameConfig } from "./config/GameConfig";
import GameServiceConfig from "./const/GameServiceConfig";

/**
 * 多语言/时间转换工具类
 */
export default class Utils {
    public static Transform_Default = new Transform();
    /**Vector2.zero */
    public static TEMP_VECTOR2 = new Vector2(0);
    /**Vector.zero */
    public static TEMP_VECTOR = new Vector(0);
    /**LinearColor */
    public static TEMP_COLOR = new LinearColor(0, 0, 0, 0);
    /**Rotation */
    public static TEMP_ROTATION = new Rotation(0, 0, 0);
    /**数字为数组 */
    private static FORMAT_NUMBER_BITS = [
        1000000000000000000000000, 1000000000000000000000, 1000000000000000000, 1000000000000000, 1000000000000,
        1000000000, 1000000, 1000,
    ];
    /**数字字符串数组 */
    private static FORMAT_NUMBER_STRING = ["AD", "AC", "AB", "AA", "T", "B", "M", "K"];
    /**飞书链接 */
    private static readonly WEB_HOOK_URL =
        "https://open.feishu.cn/open-apis/bot/v2/hook/bda5b13e-18b2-4fa7-a9a9-e33b42ed10f4";

    private static iconData: { [key: string]: mw.AssetIconData } = {};

    // 日志优化 上报
    public static logP12Info(name: string, info: any, type?: "error" | "info" | "warn"): void {
        const announcer = { name };
        const msg = JSON.stringify(info) + " #P12";
        if(type == "error"){
            Log4Ts.error(announcer, msg);
        } else if(type == "warn"){
            Log4Ts.warn(announcer, msg);
        } else {
            Log4Ts.log(announcer, msg);
        }
    }

    /*2DUI-多语言=================================================================================================================*/
    /**
     *2DUI-多语言
     * @param node
     * @param textConId
     * @param param
     */
    // public static setUIText(node: mw.TextBlock | mw.StaleButton, textConId: number | string, ...param: any[]): void {
    //     let str = "";
    //     if (typeof textConId === "string") {
    //         let langueConfig = GameConfig.Language.findElement("Name", textConId);
    //         if (!langueConfig) {
    //             return;
    //         }
    //         // 需要两个表的id一一对应
    //         // textEle = GameConfig.Text.getElement(langueConfig.ID);
    //         str = langueConfig.Value;
    //     }

    //     if (param && param.length > 0) {
    //         str = this.Format(str, ...param);
    //     }
    //     str = str.split("\\n").join("\n");
    //     if (node instanceof mw.TextBlock) {
    //         node.text = (str);
    //     }
    //     else {
    //         node.text = (str);
    //     }
    // }
    /**
     * 字符串拼接
     * @param str 字符串
     * @param param 参数
     * @returns
     */
    public static Format(str: string, ...param: any[]) {
        if (str) {
            if (param) {
                let i = 0;
                param.forEach((p) => {
                    str = str.replace("{" + i + "}", param[i]);
                    i++;
                });
            }
        }
        return str;
    }

    public static modifyProjectWorldLocationToWidgetPosition(
        player: mw.Player,
        worldLocation: mw.Vector,
        outScreenPosition: mw.Vector2,
        isPlayerViewportRelative: boolean
    ): boolean {
        let result = InputUtil.projectWorldPositionToWidgetPosition(worldLocation, isPlayerViewportRelative);
        outScreenPosition.x = result.screenPosition.x;
        outScreenPosition.y = result.screenPosition.y;
        return result.result;
    }

    /**
     *
     * @param value 数值
     * @param minValue 最小数值
     * @param maxValue 最大数值
     * @param newMin 新的最小数值
     * @param newMax 新的最大数据
     * @returns
     */
    public static mapValue(
        value: number,
        minValue: number = 0,
        maxValue: number = 1,
        newMin: number = 0.3,
        newMax: number = 1
    ): number {
        value = Math.max(minValue, Math.min(maxValue, value));
        return ((value - minValue) * (newMax - newMin)) / (maxValue - minValue) + newMin;
    }

    /**
     * 颜色数值转换
     * @param r r
     * @param g g
     * @param b b
     * @param a a
     * @returns LinearColor
     */
    public static getTempColor(r: number, g: number, b: number, a: number = 255): LinearColor {
        this.TEMP_COLOR.r = r / 255;
        this.TEMP_COLOR.g = g / 255;
        this.TEMP_COLOR.b = b / 255;
        this.TEMP_COLOR.a = a / 255;
        return this.TEMP_COLOR;
    }

    /**
     * 数值百分比转换
     * @param num 数值
     * @returns 转换后的数值
     */
    public static toPercent(num) {
        return (num * 100).toFixed() + "%";
    }

    /**
     * 数字转化为 时：分：秒
     * @param time 数值
     * @param deleteHour 是否舍弃 小时
     * @returns 时：分：秒
     */
    public static FormatTime(time: number, deleteHour: boolean = true): string {
        let h = Math.floor(time / 3600);
        let hh = h < 10 ? StringUtil.format("0{0}", h) : h.toString();
        let m = Math.floor((time - h * 3600) / 60);
        let mm = m < 10 ? StringUtil.format("0{0}", m) : m.toString();
        let s = Math.floor(time - h * 3600 - m * 60);
        let ss = s < 10 ? StringUtil.format("0{0}", s) : s.toString();
        let str = "";
        if (deleteHour) {
            str = mm + ":" + ss;
        } else {
            str = hh + ":" + mm + ":" + ss;
        }
        return str;
    }

    /**
     * 判断两个时间是否是同一天
     * @param oldTime 旧时间
     * @param nowTime 新时间
     * @returns 是否是同一天
     */
    public static judgeSameDay(oldTime: number, nowTime: number): boolean {
        // public static judgeSameDay(oldTime: Date, nowTime: Date): boolean {
        const d1 = new Date(oldTime);
        const d2 = new Date(nowTime);
        return d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate();
        // var oneDayTime = 1000 * 60 * 60 * 24;
        // var old_count = Math.floor((oldTime / oneDayTime))
        // var now_other = Math.floor((nowTime / oneDayTime))
        // return old_count == now_other;
    }

    /**
     * 得到本地时间处理时区后的时间戳
     * @returns 本地时间处理时区后的时间戳
     */
    public static getTimestamp() {
        return new Date().getTime();
    }

    /**
     * UTC时间戳转本地时间戳
     * @param utcTime UTC时间戳
     * @returns 本地时间戳
     */
    public static getLocalTimestampFromUTC(utcTime: number) {
        const d = new Date();
        return utcTime - d.getTimezoneOffset() * 60 * 1000;
    }

    /**
     * UTC时间戳转本地时间戳
     * @param utcTime UTC时间戳
     * @returns 本地时间戳
     */
    public static getMonthAndDay(): number[] {
        const d = new Date();
        return [d.getMonth() + 1, d.getDate()];
    }

    /**
     * 格式化数字显示，如：1,000=1.00K，1,000,000=1.00M，1,000,000,000=1.00B，1,000,000,000,000=1.00T
     * @param value
     * @param fixCount 需要格式的位数
     * @returns 格式化后的数字
     */
    public static formatNumber(value: number, fixCount: number = 0): string {
        if (value != 0 && !value) return "";
        for (let i = 0; i < Utils.FORMAT_NUMBER_BITS.length; i++) {
            if (value > Utils.FORMAT_NUMBER_BITS[i]) {
                return (value / Utils.FORMAT_NUMBER_BITS[i]).toFixed(2) + Utils.FORMAT_NUMBER_STRING[i];
            }
        }
        return value.toFixed(fixCount);
    }

    /**
     * 格式化数字显示，如：1,000=1.00K，1,000,000=1.00M，1,000,000,000=1.00B，1,000,000,000,000=1.00T
     * @param value
     * @param fixCount 需要格式的位数
     * @returns 格式化后的数字
     */
    public static checkLevel(value: number): boolean {
        if (PlayerUtil.getPlayerScript(Player.localPlayer.playerId)?.level >= value) {
            return true;
        } else {
            TipsManager.showTips(StringUtil.format(GameConfig.Language.getElement("Text_LessLevel").Value, value));
            return false;
        }
    }

    /**
     * 截取最大显示数量
     * @param value
     * @param fixCount 需要格式的位数
     * @returns 格式化后的数字
     */
    public static truncateString(str: string, n: number): string {
        str = this.filterIllegalCharacters(str);
        let truncated = str;
        let length = 0;
        for (let i = 0; i < str.length; i++) {
            let char = str[i];
            length += char.charCodeAt(0) > 255 ? 2 : 1;
            if (length > n) {
                truncated = truncated.substring(0, i);
                truncated += "...";
                break;
            }
        }
        return truncated;
    }

    static filterIllegalCharacters(str) {
        // 定义正则表达式，匹配 U+00a0 非法字符
        const illegalCharacterRegex = /\u00a0/g;

        // 使用空字符串替换 U+00a0 非法字符
        const filteredStr = str.replace(illegalCharacterRegex, "");

        return filteredStr;
    }

    /**
     * 格式化数字时间，如：1000=1,000，1000000=1,000,000，
     * @param value 数字
     * @returns
     */
    public static formatToLocale(value: number): string {
        if (value != 0 && !value) return "";
        return value.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
    }

    // /**
    //  * 将log发送到飞书 暂时屏蔽
    //  * @param str 字符串
    //  * @returns
    //  */
    // public static async log2FeiShu(str: string, delayTime: number = 10) {
    //     return;//暂时屏蔽
    //     setTimeout(async () => {//可能出现的情况，服务器还没就绪的时候请求，有概率报错https://pandora.233leyuan.com/crashAnalysis/exceptionDetails?app_name=com.meta.box&start_time=1704816000&end_time=1704956700&request_id=1745342006802169857&requestIdDetail=1745342130244730881&kindIndex=0
    //         const res = await mw.fetch(this.WEB_HOOK_URL, {
    //             method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //             headers: {
    //                 'Content-Type': 'application/json'
    //                 // 'Content-Type': 'application/x-www-form-urlencoded',
    //             },
    //             body: `{ "msg_type": "text", "content": { "text": "${str}" } }`// body data type must match "Content-Type" header
    //         });
    //         console.error(`${res.status} - ${res.ok}`);
    //     }, delayTime * 1000);
    // }

    /**
     * 获取屏幕实际大小
     * @returns 屏幕实际大小
     */
    public static getScreenSize(): Vector2 {
        const screen = getViewportSize().divide(getViewportScale());
        return screen;
    }

    /**
     * map转成string，以逗号分隔
     * @param myMap map
     * @returns 转后string
     */
    public static mapToString(myMap: Map<any, any>): string {
        const jsonString = JSON.stringify(Object.fromEntries(myMap));
        return jsonString;
    }

    /**
     * string转成map，以逗号分隔
     * @param jsonString string
     * @returns 转后string
     */
    public static stringToMap(jsonString: string): Map<any, any> {
        const myMap = new Map(Object.entries(JSON.parse(jsonString)));
        return myMap;
    }

    /**
     * 格式化数字，不足补前缀0
     * @param num 数字
     * @param length 格式化长度
     * @returns
     */
    public static preZeroFormatNumber(num: number, length: number): string {
        return (Array(length).join("0") + num).slice(-length);
    }

    /**
     * 判断两个number数组是否一致
     * @param arr1 数组1
     * @param arr2 数组2
     * @returns 是否一致
     */
    public static numberArrayEquals(arr1: number[], arr2: number[]): boolean {
        if (!arr1 || !arr2) return false;
        if (arr1.length !== arr2.length) return false;
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

    /**
     * 当前时间是否是在期间之内
     * @param now 当前
     * @param start 开始
     * @param end 结束
     * @returns 是否在期间之内
     */
    public static dateBetween(now: Date, start: Date, end: Date): boolean {
        if (!now || !start || !end) return false;
        return now.getTime() >= start.getTime() && now.getTime() <= end.getTime();
    }

    /**
     * 判断是否是本地玩家
     * @param p 玩家或者玩家ID
     */
    public static isLocalPlayer(p: Player | number | Character): boolean {
        if (!Player?.localPlayer?.playerId) return false;
        if (typeof p === "number") {
            return p === Player.localPlayer.playerId;
        } else if (p instanceof Player) {
            return p?.playerId === Player.localPlayer.playerId;
        } else if (p instanceof Character) {
            return p?.player?.playerId === Player.localPlayer.playerId;
        }
        return false;
    }

    /**
     * 在xy平面上随机一个半径内的点
     * @param point 中点
     * @param radius 半径
     * @param height 身高
     * @returns 随机点
     */
    public static getRandomPositionInRadius(point: Vector, radius: number, height: number = 0): Vector {
        let result = Vector.zero;
        result.x = MathUtil.randomFloat(point.x - radius, point.x + radius);
        result.y = MathUtil.randomFloat(point.y - radius, point.y + radius);
        result.z = point.z + height;
        return result;
    }

    public static getBounds(model: Model, boundMin: Vector, boundMax: Vector) {
        let center = Vector.zero;
        let extend = Vector.zero;
        model.getBounds(false, center, extend, false);
        boundMin = Vector.subtract(center, extend);
        boundMax = Vector.add(center, extend);
    }

    public static async requestAssetIcons(elements: IElementBase[], modelIDName: string, isFinal: boolean = false) {
        let guids: string[] = [];
        elements.forEach((element) => {
            guids.push(element[modelIDName].toString());
        });
        mw.assetIDChangeIconUrlRequest(guids).then(() => {
            elements.forEach((cfg) => {
                let data = mw.getAssetIconDataByAssetID(cfg[modelIDName]);
                if (data) {
                    Utils.iconData[cfg[modelIDName].toString()] = data;
                    cfg["iconData"] = data;
                }
            });
            if (isFinal) {
                for (let i = 0; i < this.imageCB.length; i++) {
                    let e = this.imageCB[i];
                    this.setImageByAsset(e[0], e[1], false);
                }
            }
        });
    }

    private static imageCB: [Image, any][] = [];

    public static setImageByAsset(icon: mw.Image, e: any, isFirst: boolean = true) {
        if (e.iconData) {
            icon.setImageByAssetIconData(e.iconData);
        } else {
            icon.imageGuid = "213367";
            isFirst && Utils.imageCB.push([icon, e]);
        }
    }

    public static setImageByAssetGuid(icon: mw.Image, guid: string) {
        if (Utils.iconData[guid]) {
            icon.setImageByAssetIconData(Utils.iconData[guid]);
        } else {
            Utils.downloadIconAsset(guid).then(() => {
                let data = mw.getAssetIconDataByAssetID(guid);
                if (data) {
                    Utils.iconData[guid] = data;
                }
                icon.setImageByAssetIconData(Utils.iconData[guid]);
            });
        }
    }

    public static downloadIconAsset(guid: string) {
        if (Utils.iconData[guid]) return;
        return mw.assetIDChangeIconUrlRequest([guid]);
    }

    public static shallowCopy(object: any) {
        return Object.assign({}, object);
    }

    public static deepCopy(object: any) {
        return JSON.parse(JSON.stringify(object));
    }

    public static faceCameraToTarget(target: Vector) {
        let camera = Camera.currentCamera;
        camera.lookAt(target);
    }

    public static numTofix(num: number, fixed: number) {
        return parseFloat(num.toFixed(fixed));
    }

    public static getRandomProbability(array: number[]) {
        const totalWeight = array.reduce((sum, weight) => sum + weight, 0);
        const random = Math.random() * totalWeight;

        let accumulatedWeight = 0;
        for (let i = 0; i < array.length; i++) {
            accumulatedWeight += array[i];
            if (random <= accumulatedWeight) {
                return i;
            }
        }
    }

    /**得到一个两数之间的随机整数，包括两个数在内 */
    public static getRandomIntInclusive(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
    }

    public static isNotNullOrUndefined<T>(value: T | null | undefined): value is T {
        return value !== null && value !== undefined;
    }

    public static formatEtherInteger(token: bigint): string {
        const tokenE = token / GameServiceConfig.Ether;
        return tokenE.toString(10);
    }
}
