import { MapEx } from "odin";
import { MotionEditConst } from "../motionEditor/MotionEditConst";
import { EMotionFrameNodeViewItemType } from "../motionEditor/MotionFrameNodeBase";

export function edit_BulletData(arrMap: MapEx.MapExClass<any>) {
    if (MotionEditConst.isUseEdit) {
        return function (constructor: any) {
            for (let key in arrMap) {
                let value = arrMap[key];
                constructor[key] = value;//prototype
            }
        }
    }
}

@edit_BulletData({
    "name_vname": "名称",
    "name_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "description_vname": "子弹描述",
    "description_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "bulletType_vname_vtype": "子弹类型",
    "bulletType_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "detectionType_vname": "伤害检测方式",
    "detectionType_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "detectionDelay_vname": "延迟时间(s)进行射线检测",
    "detectionDelay_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "destroyCondition_vname": "销毁结束条件",
    "destroyCondition_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "penetrateCount_vname": "子弹有效命中次数（>1表示具有穿透性)",
    "penetrateCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "splitCount_vname": "子弹分裂数",
    "splitCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "splitAngle_vname": "子弹分裂角度",
    "splitAngle_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "reboundCount_vname": "反弹次数",
    "reboundCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "parabolaHeightScale_vname": "抛物线高度比例(0-1)",
    "parabolaHeightScale_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "delayDestroy_vname": "延迟多少s销毁子弹",
    "delayDestroy_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "speed_vname": "速度：帧间隔*Speed",
    "speed_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fireEffectGuid_vname": "子弹生成时的开火特效Guid",
    "fireEffectGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fireEffectScale_vname": "开火特效的世界缩放",
    "fireEffectScale_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "fireEffectLoop_vname": "开火特效循环次数0:无限循环>0表示循环次数",
    "fireEffectLoop_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fireSoundGuid_vname": "开火音效(3d)1次性的",
    "fireSoundGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fireSoundVolume_vname": "开火音效的音量比例(0-1)",
    "fireSoundVolume_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "flyEffectGuid_vname": "子弹飞行用的模型",
    "flyEffectGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "flyEffectScale_vname": "子弹飞行模型的世界缩放",
    "flyEffectScale_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "triggerRelativePos_vname": "子弹trigger的相对位置",
    "triggerRelativePos_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "triggerRelativeRot_vname": "子弹trigger的相对朝向",
    "triggerRelativeRot_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "triggerRelativeScale_vname": "子弹trigger的相对缩放",
    "triggerRelativeScale_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "flySoundGuid_vname_vtype": "飞行音效(3d)",
    "flySoundGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "flySoundLoop_vname": "飞行音效循环与否0循环>0次数",
    "flySoundLoop_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "flySoundVolume_vname": "飞行音效的音量比例(0-1)",
    "flySoundVolume_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "hitEffectGuid_vname": "子弹命中时的特效Guid，可以没有",
    "hitEffectGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "hitEffectScale_vname": "命中特效的世界缩放",
    "hitEffectScale_vtype": EMotionFrameNodeViewItemType.Text_Array,
    "hitEffectLoop_vname": "命中特效循环次数",
    "hitEffectLoop_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "hitSoundGuid_vname": "命中音效(3d)",
    "hitSoundGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "hitSoundVolume_vname": "命中音效的音量比例(0-1",
    "hitSoundVolume_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "extraParam1_vname": "预留参数1",
    "extraParam1_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "extraParam2_vname": "预留参数2",
    "extraParam2_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "extraParam3_vname": "预留参数3",
    "extraParam3_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class Edit_BulletData {
    /**id*/
    id: number
    /**名称*/
    name: string
    /**子弹描述*/
    description: string
    /**子弹类型*/
    bulletType: number
    /**开启对npc自动导航 */
    autoNav: boolean
    /**伤害检测方式*/
    detectionType: number
    /**延迟时间(s)进行射线检测*/
    detectionDelay: number
    /**销毁结束条件*/
    destroyCondition: number
    /**子弹有效命中次数（>1表示具有穿透性)*/
    penetrateCount: number
    /**子弹分裂数*/
    splitCount: number
    /**子弹分裂角度*/
    splitAngle: number
    /**反弹次数*/
    reboundCount: number
    /**抛物线高度比例(0-1)*/
    parabolaHeightScale: number
    /**延迟多少s销毁子弹*/
    delayDestroy: number
    /**速度：帧间隔*Speed*/
    speed: number
    /**子弹生成时的开火特效Guid*/
    fireEffectGuid: string
    /**开火特效的世界缩放*/
    fireEffectScale: Array<number>
    /**开火特效循环次数0:无限循环>0表示循环次数*/
    fireEffectLoop: number
    /**开火音效(3d)1次性的*/
    fireSoundGuid: string
    /**开火音效的音量比例(0-1)*/
    fireSoundVolume: number
    /**子弹飞行用的模型/特效约定朝向看向+X可以空着如瞬发的子弹*/
    flyEffectGuid: string
    /**子弹飞行模型的世界缩放*/
    flyEffectScale: Array<number>
    /**子弹trigger的相对位置*/
    triggerRelativePos: Array<number>
    /**子弹trigger的相对朝向*/
    triggerRelativeRot: Array<number>
    /**子弹trigger的相对缩放*/
    triggerRelativeScale: Array<number>
    /**飞行音效(3d)*/
    flySoundGuid: string
    /**跟着物体走的*/
    flySoundLoop: number
    /**飞行音效循环与否0循环>0次数*/
    flySoundVolume: number
    /**飞行音效的音量比例(0-1)*/
    hitEffectGuid: string
    /**子弹命中时的特效Guid，可以没有*/
    hitEffectScale: Array<number>
    /**命中特效的世界缩放*/
    hitEffectLoop: number
    /**开火特效循环次数*/
    hitSoundGuid: string
    /**0:无限循环*/
    hitSoundVolume: number
    /**>0表示循环次数*/
    extraParam1: string
    /**命中音效(3d)*/
    extraParam2: string
    /** 1次性的*/
    extraParam3: string


    /**曲线偏移倍数，发射点到目标点距离的一倍作为乘法计算 中心 */
    curveOffsetMultiple: mw.Vector
    /**随机偏移倍数参考可以为空 */
    randomOffsetMultiple: mw.Vector
    /**返回时子弹偏移倍数 */
    backOffsetMultiple: mw.Vector
    /**固定曲线Z，相对释放者偏移*/
    fixCurveZ: number
    /**是否一直矫正子弹方向指向目标 0不矫正 1矫正  默认0 降低计算量 */
    isCalculateRotation: boolean
    /**曲线子弹无目标是否直线飞行*/
    isStraight: boolean
    /**是否穿透   0不穿透 1穿透   设置穿透(1)能降低计算量*/
    isThrough: boolean

    /**命中爆炸id */
    hitBombId: number
}

