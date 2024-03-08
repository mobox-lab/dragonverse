/*
 * @Author       : dal
 * @Date         : 2023-11-14 17:09:06
 * @LastEditors  : dal
 * @LastEditTime : 2024-03-01 14:27:29
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\TimeTransferUtil.ts
 * @Description  : 
 */

/** 时间转换工具类 */
export default class TimeTransferUtil {

    /** 获取两个时间戳相差的天数 */
    static getDaysDifference(timestamp1: number, timestamp2: number): number {
        let date1 = new Date(timestamp1);
        let date2 = new Date(timestamp2);

        // 确保 date1 在 date2 之前  
        if (date1 > date2) {
            const temp = date1;
            date1 = date2;
            date2 = temp;
        }

        // 计算两个日期之间的毫秒数差异  
        const differenceInMilliseconds = timestamp2 - timestamp1;

        // 将毫秒数转换为天数  
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

        return Math.round(differenceInDays);
    }

    /** 如果一个数字小于10，则往前面补0，并返回这个字符串 */
    static insertZero(num: number): string {
        num = Math.floor(num);
        return num < 10 ? "0" + num : num + "";
    }

    /**
     * 将时间戳转换成 月.日 时:分的形式，如：07.23 17:58
     * @param timeStamp 时间戳
     * @returns 月.日 时:分 形式的字符串
     */
    static getDateStr1ByTimeStamp(timeStamp: number) {
        let createDate = new Date(timeStamp);
        return this.insertZero(createDate.getMonth() + 1) + "." + this.insertZero(createDate.getDate()) + " " + this.insertZero(createDate.getHours()) + ":" + this.insertZero(createDate.getMinutes());
    }

    /**
     * 将时间戳转换成 时:分:秒的形式，如：17:58:03
     * @param timemili 毫秒
     * @returns 时:分:秒 形式的字符串
     */
    static getDateStrByTimeMili(timemili: number) {
        if (timemili < 0) { return ""; }
        let totalSecond = Math.floor(timemili / 1e3);
        let hour = totalSecond / 60 / 60;
        let minute = totalSecond / 60 % 60;
        let second = totalSecond % 60;
        return this.insertZero(hour) + ":" + this.insertZero(minute) + ":" + this.insertZero(second);
    }

    /**
     * 将秒 时:分:秒的形式，如：17:58:03
     * @param timeSec 秒
     * @returns 时:分:秒 形式的字符串
     */
    static getDateStrByTimeSec(timeSec: number) {
        if (timeSec < 0) { return ""; }
        let hour = timeSec / 60 / 60;
        let minute = timeSec / 60 % 60;
        let second = timeSec % 60;
        return this.insertZero(hour) + ":" + this.insertZero(minute) + ":" + this.insertZero(second);
    }

    /**
     * 把秒转换成以时，分，秒的形式返回
     */
    static getTimeInfoByTimeSec(timeSec: number) {
        if (timeSec < 0) { return { hour: 0, minute: 0, second: 0 }; }
        let hour = timeSec / 60 / 60;
        let minute = timeSec / 60 % 60;
        let second = timeSec % 60;
        return { hour: Math.floor(hour), minute: Math.floor(minute), second: Math.floor(second) };
    }
}