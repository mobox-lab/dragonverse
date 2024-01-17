export class TimeUtilExtensiton {

    /**时间条件缓存 */
    private static _timeCondMap: Map<string, number> = new Map<string, number>();

    /**
     * 检测key是否在限制时间内
     * @param eventName 检测的key
     * @param condTime 秒
     */
    public static check_TimeCond(eventName: string, condTime: number = 1) {
        if (StringUtil.isEmpty(eventName)) {
            return false;
        }

        if (this._timeCondMap.has(eventName) == false) {
            this._timeCondMap.set(eventName, 0);
            return false;
        }

        let recordTime = this._timeCondMap.get(eventName);
        let subTIme = Date.now() - recordTime - condTime * 1000;
        //console.error("=====subTIme ", subTIme / 1000);
        if (subTIme <= 0) {
            return true;
        }

        return false;
    }

    /**
     * 记录限制时间
     * @param eventName 
     * @returns 
     */
    public static set_TimeCond(eventName: string) {
        if (StringUtil.isEmpty(eventName)) {
            return;
        }
        this._timeCondMap.set(eventName, Date.now());
    }


}