/*
 * @Author: shifu.huang
 * @Date: 2023-07-25 18:39:09
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-29 15:28:38
 * @FilePath: \nevergiveup\JavaScripts\Modules\taskModule\TaskModuleDataHelper.ts
 * @Description: 修改描述
 */

/**
 * 记录了玩家完成的主线任务
 */
export class TaskModuleDataHelper extends Subdata {
    /**当前完成的主线任务id */
    @Decorator.persistence()
    finishTasks: number[];

    /**
     * 初始化当前完成的主线任务
     */
    protected initDefaultData(): void {
        this.finishTasks = [];
    }

    protected onDataInit(): void {
        if(this.finishTasks == null) this.finishTasks = [];
    }

}