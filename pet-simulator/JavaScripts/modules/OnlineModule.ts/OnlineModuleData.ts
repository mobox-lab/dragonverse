
export class OnlineModuleData extends Subdata {


    @Decorator.persistence()
    private waitGetArr: number[] = [];


    @Decorator.persistence()
    private hasGetArr: number[] = [];

    /**今天在线时间 */
    @Decorator.persistence()
    public todayOnlineTime: number = 0;

    /**当前登录日期 可做上次登陆使用*/
    @Decorator.persistence()
    curLoginTime: number = 0;

    /**当前登陆小时  */
    @Decorator.persistence()
    curLoginHour: number = 0;

    public onlineDayAC: Action = new Action();

    /**已经领取事件 */
    public onHasGetAC: Action = new Action();


    protected initDefaultData(): void {

    }
    /**待领取数组 */
    public get WaitGetArr(): number[] {
        return this.waitGetArr;
    }
    /**已领取数组 */
    public get HasGetArr(): number[] {
        return this.hasGetArr;
    }

    get version(): number {
        return 2;
    }
    protected onDataInit(): void {
        if (this.currentVersion != this.version) {
            if (this.currentVersion == 1) {
                this.curLoginHour = 0;
            }
            this.currentVersion = this.version;
        }


    }

    /**设置当前天 */
    public setCurDay(day: number, hour: number, isUpdate: boolean) {
        if (isUpdate) {
            this.todayOnlineTime = 0;
            this.hasGetArr.length = 0;
            this.waitGetArr.length = 0;
        }
        this.curLoginTime = day;
        this.curLoginHour = hour;
        this.save(true);
        this.onlineDayAC.call();
    }

    /**添加已领取 */
    public addHasGet(id: number) {
        let index = this.hasGetArr.indexOf(id, 0)
        if (index == -1) {
            this.hasGetArr.push(id);
            //删除id
            let index2 = this.waitGetArr.indexOf(id, 0)
            if (index2 != -1) {
                this.waitGetArr.splice(index2, 1);
            }
            this.save(true);
            this.onHasGetAC.call();
        }
    }

    /**添加待领取 */
    public addWaitGet(id: number) {
        let index = this.waitGetArr.indexOf(id, 0)

        if (index == -1) {
            this.waitGetArr.push(id);
            this.save(true);
        }
    }

    public addOnlineTime(time: number) {
        this.todayOnlineTime += time;
        this.save(true);
    }



}