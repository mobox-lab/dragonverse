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
        if (mw.SystemUtil.isClient()) {
            console.log("统计", key, des, JSON.stringify(data));
            mw.RoomService.reportLogInfo(key, des, JSON.stringify(data));
        }
    }

    export function playerGoTrace(pos: Vector) {
        this.uploadMGS("ts_action_resource_change", "玩家去哪了", { change_way: `${pos.x.toFixed(2)}|${pos.y.toFixed(2)}|${pos.z.toFixed(2)}`, getinfo_id: Math.ceil(TimeUtil.elapsedTime()) });
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
        let count = interTraceCountMap.get(itemId) || 0;
        this.uploadMGS("ts_action_unlock", "使用交互物", {
            item_id: itemId,
            area_id: count,
            object_type: object_type,
            isfirstunlock: guid, eqpt_id: isSunc ? 1 : 0
        });
        interTraceCountMap.set(itemId, count + 1);
    }

    /**
     * 道具操作
     * @param itemId 道具id
     * @param interType 交互类型 0 拾取 1 丢弃 2 使用 3 被消耗
     */
    export function itemTrace(itemId: number, interType: number) {
        this.uploadMGS("ts_item_give", "道具相关操作上发", { item_id: itemId, reqsucceed: interType });
    }

    let areaEnterMap: Map<number, number> = new Map();

    export function areaEnterTrace(areaId: number) {
        areaEnterMap.set(areaId, TimeUtil.elapsedTime());
        this.uploadMGS("ts_action_build", "进入区域", { model_id: areaId });
    }

    export function areaLeaveTrace(areaId: number) {
        if (!areaEnterMap.has(areaId)) {
            return;
        }
        let preTime = areaEnterMap.get(areaId);
        this.uploadMGS("ts_action_buy_plane", "离开区域", { plane_id: areaId, play_time: TimeUtil.elapsedTime() - preTime });
    }

    /**
     * 性能帧率埋点，上传埋点数据
     * @param count 多少次
     * @param fps 帧率
     * @param cpuLevel CPPU画质等级
     * @param gpuLevel GPU画质等级
     */
    export function fpsTrace(count: number, fps: number, cpuLevel: number, gpuLevel: number) {
        this.uploadMGS("ts_game_over", "性能帧率埋点", {
            round_id: count,
            round_length: cpuLevel,
            round_wave: gpuLevel,
            stage_level: fps
        });
    }

    /**
     * UI名字
     * @param uiname UI名字
     */
    export function uishowTrace(uiname: string) {
        this.uploadMGS("ts_action_buy_storage", "UI名字", {
            isfirstbuy: uiname
        });
    }

    /**
     * 点击事件
     * @param btnName 点击事件
     */
    export function buttonTrace(btnName: string) {
        this.uploadMGS("ts_action_click", "点击事件", {
            button: btnName
        });
    }

    /**
     * 弹幕发送
     * @param playType 0 聊天框，1表情
     */
    export function chatTrace(playType: number) {
        this.uploadMGS("ts_action_kudos", "弹幕发送", {
            play_type: playType
        });
    }

    /** 变成鬼的时间点 */
    let _change2humanTime: number = 0;

    /** 变成鬼的次数 */
    let _changeGhostTime: number = 1;

    /**
     * 玩家变身鬼上发
     */
    export function change2GhostTrace() {
        this.uploadMGS("ts_vehicle_enter", "变成幽灵", {
            times: _changeGhostTime++
        });
        _change2humanTime = TimeUtil.elapsedTime();
    }

    /**
     * 幽灵状态结束上发
     * @param type 0 被救起tts_，1自然死亡，2手动终结
     */
    export function change2HumanTrace(type: number) {
        this.uploadMGS("ts_vehicle_leave", "变成人", {
            vehicle_type: type, time: TimeUtil.elapsedTime() - _change2humanTime
        });
    }

    /**
     * 当玩家输入锁的时候发送
     * @param lockGuid 锁的guid
     * @param enterPassWd 确认输入的密码
     * @param coorectPassWd 正确的密码
     */
    export function lockResultTrace(lockGuid: string, enterPassWd: string, coorectPassWd: string) {
        this.uploadMGS("ts_avatar_edit_show", "当玩家输入锁的时候发送", {
            from: lockGuid,
            isfirstbuy: `${enterPassWd}|${coorectPassWd}`
        });
    }

    let traceNum: number[] = [];

    /**
    * 大厅动画流程埋点
    * @param id 查表。
    * @param canJump 是否可以跳过
    * @param isjump 是否跳过
    */
    export function hallAniTrace(id: number, canJump: boolean, isjump: boolean = false) {
        if (traceNum.includes(id)) {
            return;
        }
        traceNum.push(id);
        if (canJump) {
            this.uploadMGS("ts_game_start", "动画流程埋点", {
                scene_id: id,
                game_mode: isjump ? 1 : 0
            });
        }
        else {
            this.uploadMGS("ts_game_start", "动画流程埋点", {
                scene_id: id
            });
        }
        if (id == 10) {
            this.uploadMGS("ts_game_start", "流程时长", {
                player_num: TimeUtil.elapsedTime()
            });
        }
    }
} 