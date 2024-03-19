/*
 * @Author       : dal
 * @Date         : 2023-11-22 14:11:37
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-22 18:00:47
 * @FilePath     : \hauntedparadise\JavaScripts\utils\TraceHelper.ts
 * @Description  : 
 */
export namespace GhostTraceHelper {
    export function uploadMGS(key: string, des: string, data: any) {
    }

    export function playerGoTrace(pos: Vector) {
    }

    export let interTraceCountMap: Map<number, number> = new Map();

    /**
     *
     * @param itemId 0传送，1下蹲，2安全区，3door,4 handtrigger
     * @param object_type 下蹲（0蹲，1起），（0床，1柜子）
     * @param guid 交互物guid
     * @param isSunc 是否成功 1成功 0失败
     */
    export function interTrace(itemId: number, object_type: number, guid: string, isSunc: boolean = true) {
    }

    /**
     * 道具操作
     * @param itemId 道具id
     * @param interType 交互类型 0 拾取 1 丢弃 2 使用 3 被消耗
     */
    export function itemTrace(itemId: number, interType: number) {
    }

    let areaEnterMap: Map<number, number> = new Map();

    export function areaEnterTrace(areaId: number) {
    }

    export function areaLeaveTrace(areaId: number) {
    }

    /**
     * 性能帧率埋点，上传埋点数据
     * @param count 多少次
     * @param fps 帧率
     * @param cpuLevel CPPU画质等级
     * @param gpuLevel GPU画质等级
     */
    export function fpsTrace(count: number, fps: number, cpuLevel: number, gpuLevel: number) {
    }

    /**
     * UI名字
     * @param uiname UI名字
     */
    export function uishowTrace(uiname: string) {
    }

    /**
     * 点击事件
     * @param btnName 点击事件
     */
    export function buttonTrace(btnName: string) {
    }

    /**
     * 弹幕发送
     * @param playType 0 聊天框，1表情
     */
    export function chatTrace(playType: number) {
    }

    /** 变成鬼的时间点 */
    let _change2humanTime: number = 0;

    /** 变成鬼的次数 */
    let _changeGhostTime: number = 1;

    /**
     * 玩家变身鬼上发
     */
    export function change2GhostTrace() {
    }

    /**
     * 幽灵状态结束上发
     * @param type 0 被救起tts_，1自然死亡，2手动终结
     */
    export function change2HumanTrace(type: number) {
    }

    /**
     * 当玩家输入锁的时候发送
     * @param lockGuid 锁的guid
     * @param enterPassWd 确认输入的密码
     * @param coorectPassWd 正确的密码
     */
    export function lockResultTrace(lockGuid: string, enterPassWd: string, coorectPassWd: string) {
    }

    let traceNum: number[] = [];

    /**
     * 大厅动画流程埋点
     * @param id 查表。
     * @param canJump 是否可以跳过
     * @param isjump 是否跳过
     */
    export function hallAniTrace(id: number, canJump: boolean, isjump: boolean = false) {
    }
}