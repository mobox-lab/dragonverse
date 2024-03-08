import { GameConfig } from "../../../config/GameConfig";

export default class TreasureData extends Subdata {

    /**宝箱打开次数 */
    @Decorator.persistence()
    openTimes: number = 0;

    /**日期 */
    @Decorator.persistence()
    dateMark: number = undefined;

    onOpenTimeChange: Action1<number> = new Action1()

    changeOpenTimes() {
        if (this.openTimes >= GameConfig.SubGlobal.openBoxTimes.number) return
        this.openTimes++;
        this.save(true)
        this.onOpenTimeChange.call(this.openTimes)
    }

    checkDate() {
        let today = new Date().getDate()
        if (today != this.dateMark) {
            this.dateMark = today;
            this.openTimes = 0;
            this.save(true)
        }
    }

}