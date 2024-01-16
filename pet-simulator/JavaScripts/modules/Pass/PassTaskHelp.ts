import { GameConfig } from "../../config/GameConfig";
import { IVIPTaskElement } from "../../config/VIPTask";
import { GlobalData } from "../../const/GlobalData";
import { AreaModuleData } from "../AreaDivide/AreaModuleData";

export class PassTaskHelp {

    /**根据星级与过滤id获取随机任务的id */
    public static getTask(playerId: number, star: number, filterIds: number[] = []): number {

        let data: AreaModuleData = null;
        if (SystemUtil.isClient())
            data = DataCenterC.getData(AreaModuleData);
        else
            data = DataCenterS.getData(playerId, AreaModuleData);

        let cfgs: IVIPTaskElement[] = [];
        GameConfig.VIPTask.findElements("level", star).forEach(element => {
            if (filterIds.indexOf(element.id) < 0 && data.getAreaDataById(element.Front) != 1) {
                cfgs.push(element);
            }
        });
        let index = Math.floor(Math.random() * cfgs.length);
        return cfgs[index].id;

    }
    /**获取对应星级任务 */
    public static getStarTasks(playerId: number, stars: number[]): number[] {
        let tasks: number[] = [];
        stars.forEach(element => {
            tasks.push(this.getTask(playerId, element, this.getFilterIds(tasks)));
        });
        return tasks;
    }
    /**获取过滤数组 */
    public static getFilterIds(taskIds: number[]): number[] {
        let filterIds: number[] = [];

        taskIds.forEach(element => {
            let cfg = GameConfig.VIPTask.getElement(element);
            GameConfig.VIPTask.findElements("VIPTaskType", cfg.VIPTaskType).forEach(element => {
                filterIds.push(element.id);
            });
        })
        return filterIds;
    }

    public static getTaskType(taskId: number, type: number): boolean {
        return GameConfig.VIPTask.getElement(taskId).VIPTaskType == type;
    }

    /**根据当前已完成的任务，随机新的任务 
     * @param taskId 当前任务id
     * @param completeTasks 已完成的任务
     * @param isVip 是否是vip
     * @param return 返回表id， 0表示都完成了
    */
    public static getNewTask(taskId: number, completeTasks: number[], isVip: boolean): number {

        let maxTaskCount = GameConfig.VIPTask.getAllElement().length;
        if (!isVip) {
            maxTaskCount = GlobalData.PassTask.normalPlayerTaskTypeMax;
        }

        let curStar = GameConfig.VIPTask.getElement(taskId).level;


        let finshStar = 0;

        let filterIds: number[] = [];

        for (let i = 0; i < completeTasks.length; i++) {
            let cfg = GameConfig.VIPTask.getElement(completeTasks[i]);
            if (cfg.level == curStar) {
                filterIds.push(completeTasks[i]);
                finshStar++;
            }
        }
        if (finshStar >= maxTaskCount) {
            return 0;
        } else {
            return this.getTask(Player.localPlayer.playerId, curStar, filterIds);
        }

    }

    /**检查已经完成的任务是几星的 */
    public static checkFinishTask(completeTasks: number[]): number[] {
        let star: number[] = [0, 0, 0];
        completeTasks.forEach(element => {
            let cfg = GameConfig.VIPTask.getElement(element);
            if (cfg.level == 1) {
                star[0]++;
            } else if (cfg.level == 2) {
                star[1]++;
            } else if (cfg.level == 3) {
                star[2]++;
            }
        });
        return star;
    }




}