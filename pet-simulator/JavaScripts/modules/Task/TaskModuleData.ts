import { MapEx } from "odin";
import { GameConfig } from "../../config/GameConfig";

export class TaskModuleData extends Subdata {

    @Decorator.persistence()
    private taskShopData: MapEx.MapExClass<number>;
    @Decorator.persistence()
    private taskData: MapEx.MapExClass<number>;
    /**当前任务点数 */
    @Decorator.persistence()
    private taskPoint: number = 0;
    public taskCompleteAction: Action2<number, number> = new Action2<number, number>();

    protected initDefaultData(): void {
        this.taskShopData = {};
        this.taskData = {};
    }

    /**获取全部任务进度 */
    public getAllTaskData(): MapEx.MapExClass<number> {
        return this.taskData;
    }

    /**获取单个任务的点数 */
    public getTaskData(id: number): number {
        return MapEx.get(this.taskData, id);
    }

    /**完成单个任务 */
    public completeTask(id: number, addCount: number = 1): boolean {
        let taskInfo = GameConfig.Task.getElement(id);
        let upperLimit = taskInfo.NumB;
        let taskCount = MapEx.get(this.taskData, id);
        if (taskCount >= upperLimit) return false;
        if (taskCount == null) taskCount = 0;
        taskCount = taskCount + addCount;
        if (taskCount >= upperLimit) {
            let reward = taskInfo.Points;
            this.taskPoint += reward;
            taskCount = upperLimit;
        }
        MapEx.set(this.taskData, id, taskCount);
        this.save(true);
        this.taskCompleteAction.call(id, taskCount);
        return true;
    }

    /**获取任务商店数据 */
    public getTaskShopData(id: number): number {
        return MapEx.get(this.taskShopData, id);
    }

    /**获取全部任务商店数据 */
    public getAllTaskShopData(): MapEx.MapExClass<number> {
        return this.taskShopData;
    }

    /**获取当前任务点数 */
    public getTaskPoint(): number {
        return this.taskPoint;
    }

    /**增加任务点数 */
    public addTaskPoint(value: number): void {
        this.taskPoint += value;
        this.save(true);
    }

    /**
     * 设置任务商店数据
     * @param id 任务商店id
     * @returns 返回相差的任务点数 正数失败，如果为0则表示成功，如果为-1则表示已经达到上限并且成功
     */
    public setTaskShopData(id: number): number {
        let taskShopInfo = GameConfig.TaskShop.getElement(id);
        let price = taskShopInfo.Price;
        //相差的任务点数
        let diff = price - this.taskPoint;
        if (diff > 0) {
            return diff;
        }
        this.taskPoint -= price;
        let count = MapEx.get(this.taskShopData, id);
        if (count == null) {
            count = 0;
        }
        count++;
        MapEx.set(this.taskShopData, id, count);
        this.save(true);
        if (taskShopInfo.UponMuch != 0 && count >= taskShopInfo.UponMuch) {
            return -1;
        }
        return 0;
    }

}