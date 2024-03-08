/**
 * 日期时间工具类
 * 该类提供了一些日期时间相关的工具方法
 */
export class DateTimeUtil {

    /** 本地时间偏移 */
    private static _timeZone = new Date(Date.now()).getTimezoneOffset() * 60000;

    /**
     * 格式化倒计时
     * @param timestamp 时间戳
     * @returns 格式化后的倒计时字符串
     */
    static formatCountdown(timestamp: number): string {
        const totalSeconds = Math.floor(timestamp / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }

    /**
     * 是否是同一天
     * @param time1 时间1
     * @param time2 时间2，默认为当前时间
     * @param offest 时间偏移
     * @returns 是否是同一天
     */
    public static isSameDay(time1: number, time2?: number, offest: number = 0): boolean {
        return Math.floor((time1 + this._timeZone - offest) / 86400000) == Math.floor(((time2 == null ? Date.now() : time2) + this._timeZone - offest) / 86400000);
    }

}