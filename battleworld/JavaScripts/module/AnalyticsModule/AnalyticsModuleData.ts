
export class AnalyticsModuleData extends Subdata {

    // 操作记录
    @Decorator.persistence()
    public records: string[] = [];

    // 核心循环步骤
    @Decorator.persistence()
    public coreCords: number[] = [];

    public get dataName() {
        return "AnalyticsModuleData";
    }

    protected onDataInit(): void {
        if (this.records == null) {
            this.records = [];
        }

        if (this.coreCords == null) {
            this.coreCords = [];
        }
    }

    // 添加记录
    public addRecord(record: string) {
        if (this.records.includes(record)) return;
        this.records.push(record);

        if (SystemUtil.isServer()) {
            this.save(false);
        }
    }

    /**获取操作数据 */
    public getRecords() {
        return this.records;
    }

    // 添加记录
    public addCoreRecord(step: number) {
        if (this.coreCords.includes(step)) return;
        this.coreCords.push(step);
        if (SystemUtil.isServer()) {
            this.save(false);
        }
    }

    /**获取操作数据 */
    public getCoreRecords() {
        return this.coreCords;
    }

}