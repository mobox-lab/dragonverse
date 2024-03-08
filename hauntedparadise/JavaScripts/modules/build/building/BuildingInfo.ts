/*
 * @Author: chen.liang chen.liang@appshahe.com
 * @Date: 2023-12-21 15:13:56
 * @LastEditors: chen.liang chen.liang@appshahe.com
 * @LastEditTime: 2023-12-29 16:26:33
 * @FilePath: \hauntedparadise\JavaScripts\modules\build\building\BuildingInfo.ts
 * @Description: 
 */

/**
 * 建筑信息类
 */
export class BuildingInfo {
    /**
     * 建筑独立id,客户端生成的时候不填
     */
    uuid: string

    /**
     * 道具表id
     */
    itemId: number
    /**
     * 拥有者 userId (不在家的话没有)
     */
    ownerId: string

    /** 创建者userId，被谁创建的(就不分在不在家了)，如果是自己刷的应该是个空串儿或者是null */
    creatorId: string = ""

    /**
     * 建筑位置
     */
    pos: Vector

    /**
     * 建筑旋转
     */
    rot: Rotation

    /**
     * 建筑家位置
     */
    homePos: Vector

    /**
     * 建筑家旋转
     */
    homeRot: Rotation

    /**
     * 建筑血量
     */
    hp: number;

    parentUUID: string

    childrenUUIDs: string[] = [];

    /**
     * 额外数据
     */
    dataEx: any

}
