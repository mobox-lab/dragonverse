/*
 * @Author: pengfei.sun pengfei.sun@appshahe.com
 * @Date: 2023-04-06 20:59:38
 * @LastEditors: pengfei.sun pengfei.sun@appshahe.com
 * @LastEditTime: 2023-04-06 22:28:44
 * @FilePath: \testsg\JavaScripts\tool\Constants.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export namespace Constants {
    export function getUniqueID(): string {
        return new Date().getTime() + Math.random().toString(36).substring(2);
    }

    const gameViewPort = mw.SystemUtil.isServer() ? null : mw.WindowUtil.getViewportSize();
    export function gameViewHeight(): number {
        return gameViewPort ? gameViewPort.y : 0;
    }
    export function gameViewWidth(): number {
        return gameViewPort ? gameViewPort.x : 0;
    }

    /**每秒多少帧 */
    export const SecondFrameCount = 30;
    // 逻辑帧间隔(秒)
    export const LogicFrameInterval = 0.1;
    // 场景单位同步间隔(逻辑帧)
    export const BehaviorMachineSyncIntervalFrame = 15;
    // 表现帧与逻辑帧的平衡值(表现帧使用)
    export function LPBalance(): number {
        return mw.TimeUtil.deltatime() / LogicFrameInterval * 10;
    }
    // 场景单位移动允许误差距离(平方)
    export const SceneUnitRateOfDeviation = 100;
    // 场景信息同步剔除距离(平方)  子弹、技能
    export const SceneUnitInfoCullDistanceXY = 7000;
    // 背包上限
    export const BagMaxCount = 200;
    // 默认武器
    export const DefaultWeaponItemCfgID = 105;
    // 默认装备
    export const DefaultEquipItemCfgID = 99;
    // 复活点
    export const ResurgencePosition = new mw.Vector(271.510, 8630.410, 15961.000);
    // 怪物战斗区范围
    export const SceneUnitFocusDistanceXY = 1000;


}
