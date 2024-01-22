/*
 * @Author: yukun.gao yukun.gao@appshahe.com
 * @Date: 2022-08-14 16:22:31
 * @LastEditors: yukun.gao yukun.gao@appshahe.com
 * @LastEditTime: 2022-08-15 11:55:28
 * @FilePath: \JavaScripts\module\bullet\IHitDetector.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/08 10:21:43
* @Description  : 命中检测器接口
*/

export interface IHitDetector {

    /**
     * 对应的子弹id
     */
    bulletId: number;

    /**
     * 初始化
     * @param arg 
     */
    init(arg: any): void;

    /**
     * 检测碰撞后是否有效
     * @param target 
     */
    onBulletHitObj(target: mw.GameObject): boolean;

    /**
     * 初始化完成
     */
    initOver(): void;

    /** 
     * 帧驱动
     * dt s
     */
    onUpdate(dt: number): void;

    /**
     * 销毁前
     */
    preDestroy(): void;

    /**
     * 销毁了
     */
    onDestroy(): void;

}
