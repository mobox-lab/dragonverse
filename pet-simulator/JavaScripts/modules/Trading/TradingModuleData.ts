//
//
//
// /**记录 */
// export type tradeRecord = {
//     /**发送者id,发送者钻石、接受id,接转世 */
//     str: string,
//     /**发送宠物 */
//     s: string,
//     /**接收宠物 */
//     r: string,
//     /**名字 */
//     n: string,
//     /**时间 */
//     t: number,
//     /**评价 0bad 1good*/
//     c: string
// }
//
// export class TradingModuleData extends Subdata {
//
//     /**是否开启交易 */
//     @Decorator.persistence()
//     private isOpen: boolean = true;
//
//     /**交易记录 */
//     @Decorator.persistence()
//     private tradingRecord: tradeRecord[] = [];
//
//     /**评价 */
//     @Decorator.persistence()
//     private badCount: number = 0;
//     @Decorator.persistence()
//     private goodCount: number = 0;
//
//     protected initDefaultData(): void {
//         this.isOpen = true;
//         this.tradingRecord = [];
//         this.badCount = 0;
//         this.goodCount = 0;
//     }
//
//     protected get version(): number {
//         return 3;
//     }
//     protected onDataInit(): void {
//         while (this.currentVersion != this.version) {
//             if (this.currentVersion == 1) {
//                 this.checkRecord();
//                 this.currentVersion = 2;
//             }
//             if (this.currentVersion == 2) {
//                 this.checkRecord();
//                 this.currentVersion = 3;
//             }
//             this.save(false);
//         }
//     }
//
//     /**
//     * 重写数据名
//     */
//     public get dataName(): string {
//         return "TradingModuleData";
//     }
//     public get Record() {
//         return this.tradingRecord;
//     }
//
//
//     public get IsOpen(): boolean {
//         return this.isOpen;
//     }
//
//     /**设置是否开启交易 */
//     public setIsOpen(isOpen: boolean) {
//         this.isOpen = isOpen;
//         this.save(true);
//     }
//
//     /**添加交易记录 */
//     public addTradingRecord(record: tradeRecord) {
//         this.tradingRecord.push(record);
//         this.checkRecord();
//         this.save(true);
//     }
//
//     /**添加评价 */
//     public addComment(isGood: boolean) {
//         if (isGood) {
//             this.goodCount++;
//         } else {
//             this.badCount++;
//         }
//         this.save(true);
//     }
//     //超过6条数据,删除老数据
//     private checkRecord() {
//
//         while (this.tradingRecord.length > 6) {
//             this.tradingRecord.shift();
//         }
//     }
//
//     public commentOver(data: tradeRecord, is: boolean) {
//         let item = this.Record.find((element) => {
//             return element = data
//         });
//
//         if (item) {
//             item.c = is ? "1" : "0";
//             this.save(true);
//         }
//     }
//
//
// }