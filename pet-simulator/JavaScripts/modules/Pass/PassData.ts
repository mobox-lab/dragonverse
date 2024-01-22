// import { GlobalEnum } from "../../const/Enum";
// import { oTraceError } from "../../utils/LogManager";
// import { PassTaskHelp } from "./PassTaskHelp";

// export class Task {
//     /**id */
//     i: number;
//     /**进度 */
//     p: number;

//     constructor(taskId: number) {
//         this.i = taskId;
//         this.p = 0;
//     }
// }

// export class PassData extends Subdata {

//     /**星星改变事件 */
//     public onStarChange: Action1<number> = new Action1();

//     @Decorator.persistence()
//     public lastDayNow: number = 0;
//     @Decorator.persistence()
//     private _curLv: number = 0;
//     @Decorator.persistence()
//     private _starCount: number = 0;
//     @Decorator.persistence()
//     public vipGetArr: number[] = [];


//     public get curLv(): number {
//         return this._curLv;
//     }
//     public get starCount(): number {
//         return this._starCount;
//     }

//     protected initDefaultData(): void {
//         this.lastDayNow = Date.now();
//     }

//     public setCurLv(lv: number, isVip: boolean) {
//         this._curLv = lv;
//         if (isVip) {
//             this.vipGetArr.push(lv);
//         }
//         this.save(true);
//     }
//     public changeStarCount(count: number) {
//         let curCount = this._starCount + count;
//         if (curCount < 0) {
//             return false;
//         }
//         this._starCount = curCount;
//         this.save(true);
//         this.onStarChange.call(this._starCount);
//         return true;
//     }

//     /************任务*********  */

//     @Decorator.persistence()
//     private _curTaskList: Task[] = [];
//     @Decorator.persistence()
//     private _finishTaskList: number[] = [];
//     @Decorator.persistence()
//     private _refreshCount: number = 3;
//     /**是否补偿过 */
//     @Decorator.persistence()
//     public isCompensate: boolean = false;

//     /**任务完成事件 */
//     public onTaskFinish: Action1<number> = new Action1();
//     /**任务刷新事件 */
//     public onTaskRefresh: Action1<number> = new Action1();

//     public get curTaskList(): Task[] {
//         return this._curTaskList;
//     }
//     public get finishTaskIds(): number[] {
//         return this._finishTaskList;
//     }

//     public get refreshCount(): number {
//         return this._refreshCount;
//     }


//     public getTaskById(taskId: number): Task {
//         return this._curTaskList.find((task) => {
//             return task.i == taskId;
//         });
//     }

//     /**通过任务类型找任务 */
//     public getTaskByType(type: GlobalEnum.VipTaskType): Task[] {

//         let tasks: Task[] = [];
//         this._curTaskList.forEach((task) => {
//             if (PassTaskHelp.getTaskType(task.i, type)) {
//                 tasks.push(task);
//             }
//         });
//         return tasks;

//     }

//     /**
//     * 保存退出游戏的时间
//     * @param value
//     */
//     public saveLastDayNow(lastDayNow: number): void {
//         this.lastDayNow = lastDayNow;
//         this.save(true);
//     }


//     /**重置任务 */
//     public resetTask() {
//         this._curTaskList.length = 0;
//         this._finishTaskList.length = 0;
//         this._refreshCount = 3;
//         this.save(true);
//     }
//     /**完成任务 */
//     public finishTask(taskId: number) {
//         this._curTaskList = this._curTaskList.filter((task) => {
//             return task.i != taskId;
//         });
//         this._finishTaskList.push(taskId);
//         this.save(true);
//         this.onTaskFinish.call(taskId);
//     }
//     /**添加任务 */
//     public addTask(taskIds: number[]) {
//         taskIds.forEach((taskId) => {
//             this._curTaskList.push(new Task(taskId));
//         });
//         if (taskIds.length > 3) {
//             oTraceError('lwj 当前任务》3 Error' + taskIds);
//         }
//         this.save(true);
//     }
//     /**刷新任务 */
//     public refreshTask(taskIds: number[]) {
//         this._curTaskList.length = 0;
//         taskIds.forEach((taskId) => {
//             this._curTaskList.push(new Task(taskId));
//         });
//         this._refreshCount--;
//         this.save(true);
//     }


// }