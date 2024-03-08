import { GameConfig } from "../../../config/GameConfig";

export default class StoreData extends Subdata {

    /**每日白嫖次数 */
    @Decorator.persistence()
    wantTimes: number = 0;

    @Decorator.persistence()
    dateMark: number = undefined;
    onWantTimeChange: Action1<number> = new Action1()
    changeWantsTimes(val: number) {
        this.wantTimes += val;
        this.save(true)
        this.onWantTimeChange.call(this.wantTimes);
    }

    checkDataRefresh() {
        let date = new Date().getDate()
        if (date == this.dateMark) return;
        this.dateMark = date;
        this.wantTimes = GameConfig.SubGlobal.wantParams.array1d[0];
        this.save(true)
        this.onWantTimeChange.call(this.wantTimes);
    }
}