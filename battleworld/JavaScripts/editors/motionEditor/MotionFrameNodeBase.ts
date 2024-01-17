import { MapEx } from "odin";
import { EFrameNodeType } from "./MontionEnum";
import { MotionEditConst } from "./MotionEditConst";

/**技能帧节点 */
export class MotionFrameNode {

    /**会通过修饰器注册进来 */
    public static nodeClassMap: MapEx.MapExClass<any> = {
        // "MotionFrameNode_Animation": MotionFrameNode_Animation,
        // "MotionFrameNode_AnimPause": MotionFrameNode_AnimPause,
        // "MotionFrameNode_TimeDilate": MotionFrameNode_TimeDilate,
        // "MotionFrameNode_Charge": MotionFrameNode_Charge,
        // "MotionFrameNode_ChargeMotion": MotionFrameNode_ChargeMotion,
        // "MotionFrameNode_Effect": MotionFrameNode_Effect,
        // "MotionFrameNode_Sound": MotionFrameNode_Sound,
        // "MotionFrameNode_Move": MotionFrameNode_Move,
        // "MotionFrameNode_impulse": MotionFrameNode_impulse,
        // "MotionFrameNode_Fly": MotionFrameNode_Fly,
        // "MotionFrameNode_Equip": MotionFrameNode_Equip,
        // "MotionFrameNode_RemoveEquip": MotionFrameNode_RemoveEquip,
        // "MotionFrameNode_FlyEntity": MotionFrameNode_FlyEntity,
        // "MotionFrameNode_Camera": MotionFrameNode_Camera,
        // "MotionFrameNode_SkillRect": MotionFrameNode_SkillRect,
        // "MotionFrameNode_BreakPoint": MotionFrameNode_BreakPoint,
        // "MotionFrameNode_UI": MotionFrameNode_UI,
        // "MotionFrameNode_Event": MotionFrameNode_Event,
        // "MotionFrameNode_InvokeMotion": MotionFrameNode_InvokeMotion,
        // "MotionFrameNode_Shake": MotionFrameNode_Shake,
    }
    /**列表按钮数据 会通过修饰器注册进来 */
    public static nodeClassArr = [];

    public static addNodeClass(constructor: any) {
        if (constructor == null) return;

        let className = constructor.name;



        if (MapEx.has(this.nodeClassMap, className)) {
            return;
        }

        MapEx.set(this.nodeClassMap, className, constructor);

        // 列表按钮数据
        let data = {
            uiName: constructor["nodeName"],
            nodeType: className
        }

        this.nodeClassArr.push(data);
    }

    /**获取节点类 */
    public static getNodeClass(nodeType: EFrameNodeType) {

        if (MapEx.has(this.nodeClassMap, nodeType) == false) {
            return null;
        }

        return MapEx.get(this.nodeClassMap, nodeType);
    }

    private static _dataMpa: Map<EFrameNodeType, { classData: any, keys: string[] }> = new Map();

    /**获取节点类的所有成员变量 */
    public static getNodeVariates(nodeType: EFrameNodeType) {
        if (this._dataMpa.has(nodeType) == false) {

            let nodeClass = this.getNodeClass(nodeType);
            let data = new nodeClass();

            let keys = Object.keys(data);

            let outKeys: string[] = [];

            for (let index = 0; index < keys.length; index++) {
                const key = keys[index];
                if (key.includes(MotionEditConst.constName)) {
                    continue;
                }
                if (key.includes(MotionEditConst.constType)) {
                    continue;
                }
                outKeys.push(key);
            }

            let info = {
                classData: data,
                keys: outKeys,
            }

            this._dataMpa.set(nodeType, info);

            console.warn("===getNodeVariates ", nodeType, outKeys);
            return info;
        }

        return this._dataMpa.get(nodeType);
    }

    /**校验下 数据增减 */
    public static verifyNodeVariate(data: MotionFrameNodeBase) {

        let classInfo = this.getNodeVariates(data.frameNodeType);

        // 检验新增的
        let addKeys = [];
        for (let index = 0; index < classInfo.keys.length; index++) {
            const addKey = classInfo.keys[index];

            // 说明这个变量是新增的 
            if (data[addKey] == null) {
                addKeys.push(addKey);
                data[addKey] = classInfo.classData[addKey];
            }
        }
        if (addKeys.length > 0) {
            console.error("===verifyNodeVariate数据新增的key ", addKeys);
        }

        // 移除多余的
        let keys = Object.keys(data);
        let outKeys: string[] = [];
        for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            if (key.includes(MotionEditConst.constName)) {
                continue;
            }
            if (key.includes(MotionEditConst.constType)) {
                continue;
            }
            outKeys.push(key);
        }

        // 获取多余的key
        let notIncludeKeys = keys.filter((key) => {
            return !classInfo.keys.includes(key)
        });
        if (notIncludeKeys && notIncludeKeys.length > 0) {
            console.error("===verifyNodeVariate数据多余的key ", notIncludeKeys);
            for (let index = 0; index < notIncludeKeys.length; index++) {
                const deleKey = notIncludeKeys[index];
                Reflect.deleteProperty(data, deleKey);
            }
        }
    }

}

/**动效节点装饰器 */
export function motionEdit_Node(arrMap: MapEx.MapExClass<any>) {
    if (MotionEditConst.isUseEdit) {
        return function (constructor: any) {
            for (let key in arrMap) {
                let value = arrMap[key];
                constructor[key] = value;//prototype
            }

            MotionFrameNode.addNodeClass(constructor);
        }
    }
}

/**动画帧节点item类型 */
export enum EMotionFrameNodeViewItemType {
    /**文字+输入框类型 */
    Text_Input,
    /**文字+Vector类型 */
    Text_Vector,
    /**按钮类型 */
    Btn,
    /**数组 */
    Text_Array,
    /**数字数组 */
    Num_Array,
}


export class MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Animation;
    /**表现节点属于第几帧 */
    public frameGuid: string = "";
}


/**动画节点 */
@motionEdit_Node({
    "nodeName": "动画",

    "guid_vname": "动画guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "duration_vname": "动画帧数",
    "duration_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "animSlot_vname": "动画插槽",
    "animSlot_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Animation extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Animation;

    /** 动画Guid */
    public guid: string = "117337";
    /** 持续时间 */
    public duration: number = 0;
    /**动画插槽*/
    public animSlot: number = 0;
}

/**动画暂停节点 */
@motionEdit_Node({
    "nodeName": "动画暂停",
    "guid_vname": "动画guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "pauseCount_vname": "动画暂停帧数",
    "pauseCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_AnimPause extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_AnimPause;
    /**动画guid */
    public guid: string = "117337";
    /** 动画暂停帧数 */
    public pauseCount: number = 0;
}


/**时间膨胀节点 */
@motionEdit_Node({
    "nodeName": "时间膨胀",

    "dilationSpeed_vname": "时间膨胀速度",
    "dilationSpeed_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "dilationCount_vname": "时间膨胀持续时间s",
    "dilationCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_TimeDilate extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_TimeDilate;

    /**时间膨胀速度*/
    public dilationSpeed: number = 0;
    /**时间膨胀持续时间*/
    public dilationCount: number = 0;
}

/**蓄力节点 */
@motionEdit_Node({
    "nodeName": "蓄力",

    "listenTime_vname": "自动暂停秒",
    "listenTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "chargeEvent_vname": "蓄力事件",
    "chargeEvent_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "autoRelease_vname": "自动释放秒",
    "autoRelease_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "releaseEvent_vname": "自动释放事件",
    "releaseEvent_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Charge extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Charge;

    /** 监听松开事件 多少秒内没有响应就自动暂停 */
    public listenTime: number = 0;
    /**蓄力成功后的事件 */
    public chargeEvent: string = "";
    /**多少秒内没有松开就自动释放 */
    public autoRelease: number = 0;
    /**自动释放时的事件 */
    public releaseEvent: string = "";
}

/**蓄力motion */
@motionEdit_Node({
    "nodeName": "蓄力motion",

    "normalMotionId_vname": "普通motion",
    "normalMotionId_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "chargeMotionIds_vname": "蓄力事件",
    "chargeMotionIds_vtype": EMotionFrameNodeViewItemType.Num_Array,
    "chargeMotionTimes_vname": "自动释放秒",
    "chargeMotionTimes_vtype": EMotionFrameNodeViewItemType.Num_Array,
})
export class MotionFrameNode_ChargeMotion extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_ChargeMotion;
    /**普通motinoid */
    public normalMotionId: number = 0;
    /**蓄力motionid数组 */
    public chargeMotionIds: number[] = [];
    /**蓄力时间数组 */
    public chargeMotionTimes: number[] = [];
}


/**特效节点 */
@motionEdit_Node({
    "nodeName": "特效",

    "guid_vname": "特效guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "offsetPos_vname": "偏移坐标",
    "offsetPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "offsetRotation_vname": "偏移旋转",
    "offsetRotation_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "offsetScale_vname": "偏移缩放",
    "offsetScale_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "count_vname": "正次数负时间",
    "count_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "slotIndex_vname": "插槽位置",
    "slotIndex_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "colorHex_vname": "特效颜色",
    "colorHex_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "colorHex1_vname": "参数颜色",
    "colorHex1_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Effect extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Effect;

    /** 节点Guid */
    public guid: string = "";
    /** 偏移坐标 */
    public offsetPos: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移旋转 */
    public offsetRotation: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移缩放 */
    public offsetScale: mw.Vector = new mw.Vector(1, 1, 1);
    /** 次数（负数：时间秒；正数：次数） */
    public count: number = 1;
    /** 插槽位置 */
    public slotIndex: number = -1;
    /** 特效颜色偏移0~255 */
    public colorHex: string = "";
    /** 特效颜色2 */
    public colorHex1: string = "";
}

/**音效节点 */
@motionEdit_Node({
    "nodeName": "音效",

    "guid_vname": "guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "sound_volume_vname": "音量",
    "sound_volume_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "sound_innerRadius_vname": "无衰半径",
    "sound_innerRadius_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "sound_maxDistance_vname": "衰减半径",
    "sound_maxDistance_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "sound_count_vname": "停止帧数",
    "sound_count_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "bind_vname": "1绑定玩家非1坐标",
    "bind_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Sound extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Sound;

    /** 节点Guid */
    public guid: string = "";
    /**音量*/
    public sound_volume: number = 1;
    /**无衰半径*/
    public sound_innerRadius: number = 100;
    /**衰减半径*/
    public sound_maxDistance: number = 3000;
    /**停止帧数*/
    public sound_count: number = 0;
    /**是否绑定在玩家身上 */
    public bind: number = 1;
}

/**位移节点 */
@motionEdit_Node({
    "nodeName": "位移",

    "move_offsetPos_vname": "偏移坐标",
    "move_offsetPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "move_isFlash_vname": "是否瞬移  0:瞬移；1:不瞬移",
    "move_isFlash_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "move_count_vname": "位移帧数",
    "move_count_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Move extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Move;
    /** 偏移坐标 */
    public move_offsetPos: mw.Vector = new mw.Vector(0, 0, 0);
    /** 是否瞬移  0:瞬移；1:不瞬移 */
    public move_isFlash: number = 1;
    /**停止帧数*/
    public move_count: number = 0;
}

/**冲量节点 */
@motionEdit_Node({
    "nodeName": "冲量",

    "offsetPos_vname": "方向偏移",
    "offsetPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "forceNum_vname": "冲量力度",
    "forceNum_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "groundFriction_vname": "地面摩擦力",
    "groundFriction_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "gravityScale_vname": "重力倍率",
    "gravityScale_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "gravityTime_vname": "重力倍率持续时间",
    "gravityTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_impulse extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_impulse;
    /**方向偏移 */
    public offsetPos: mw.Vector = new mw.Vector(100, 0, 0);
    /**冲量力度 */
    public forceNum: number = 1000;
    /**地面摩擦力 */
    public groundFriction: number = 2;

    /**重力倍率 */
    public gravityScale: number = 1;
    /**重力倍率持续时间 */
    public gravityTime: number = 0;
}

/**浮空节点 */
@motionEdit_Node({
    "nodeName": "浮空",

    "frameCount_vname": "保持帧数",
    "frameCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Fly extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Fly;
    /**保持帧数 */
    frameCount: number = 0;
}

/**装备节点 */
@motionEdit_Node({
    "nodeName": "装备节点",
    "guid_vname": "guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "sourceType_vname": "资源类型",
    "sourceType_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "equip_offsetPos_vname": "偏移坐标",
    "equip_offsetPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "equip_offsetRotation_vname": "偏移旋转",
    "equip_offsetRotation_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "equip_offsetScale_vname": "偏移缩放",
    "equip_offsetScale_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "equip_socket_vname": "插槽位置",
    "equip_socket_vtype": EMotionFrameNodeViewItemType.Text_Input,
    // "equip_defult_Guid_vname": "默认动作GUID",
    // "equip_defult_Guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Equip extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Equip;

    /** 节点Guid */
    public guid: string = "";
    /** 资源类型 */
    public sourceType: number = 0;
    /** 偏移坐标 */
    public equip_offsetPos: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移旋转 */
    public equip_offsetRotation: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移缩放 */
    public equip_offsetScale: mw.Vector = new mw.Vector(1, 1, 1);
    /** 插槽位置 */
    public equip_socket: number = 0;
    // /**默认动作GUID*/
    // public equip_defult_Guid: string = "";
}
/**移除装备节点 */
@motionEdit_Node({
    "nodeName": "移除装备",

    "guid_vname": "guid",
    "guid_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_RemoveEquip extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_RemoveEquip;
    /** Guid */
    public guid: string = "";
}

/**子弹发射节点 */
@motionEdit_Node({
    "nodeName": "子弹发射",

    "delayTime_vname": "延时发射时间",
    "delayTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "bulletId_vname": "子弹id",
    "bulletId_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "startLoc_vname": "子弹起始位置相对发射者",
    "startLoc_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "endType_vname": "终点计算方式0-1",
    "endType_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "endDis_vname": "终点最远距离",
    "endDis_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_FlyEntity extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_FlyEntity;

    /**延迟发射时间秒 */
    public delayTime: number = 0;
    /** 子弹id */
    public bulletId: number = 0;
    /**子弹起始位置 相对发射者 */
    public startLoc: mw.Vector = new mw.Vector(0, 0, 0);
    /**终点计算方式 0：以玩家正方向来计算终点  1：屏幕中心检测到的目标点（类似射击游戏） */
    public endType: number = 0;
    /**终点最远距离 */
    public endDis: number = 1000;
}

/**相机节点 */
@motionEdit_Node({
    "nodeName": "相机",

    "camrea_offsetPos_vname": "偏移坐标",
    "camrea_offsetPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "camrea_offsetRotation_vname": "偏移旋转",
    "camrea_offsetRotation_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "camrea_during_vname": "移动耗时秒",
    "camrea_during_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "camrea_keepFrame_vname": "持续帧数",
    "camrea_keepFrame_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "resetTime_vname": "相机重置时间",
    "resetTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "btn2_vname": "拷贝参数",
    "btn2_vtype": EMotionFrameNodeViewItemType.Btn,
})
export class MotionFrameNode_Camera extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Camera;

    /** 偏移坐标 */
    public camrea_offsetPos: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移旋转 */
    public camrea_offsetRotation: mw.Vector = new mw.Vector(0, 0, 0);

    /*  移动耗时秒 */
    public camrea_during: number = 0.1;
    /** 持续帧数 */
    public camrea_keepFrame: number = 20;

    /**相机重置时间 */
    public resetTime: number = 1;
}

/**技能判定节点 */
@motionEdit_Node({
    "nodeName": "技能判定",

    "type_vname": "类型",
    "type_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "offsetLoc_vname": "偏移坐标",
    "offsetLoc_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "offsetRot_vname": "偏移旋转",
    "offsetRot_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "LWH_vname": "长宽高",
    "LWH_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "range_vname": "半径",
    "range_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "checkCount_vname": "判定次数",
    "checkCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "checkInterval_vname": "判定间隔秒",
    "checkInterval_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "keepFrameCount_vname": "持续帧数",
    "keepFrameCount_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "isShake_vname": "是否震屏",
    "isShake_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "cameraShakeId_vname": "震屏表id",
    "cameraShakeId_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "rectSocket_vname": "判定区插槽",
    "rectSocket_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "dilationRate_vname": "卡肉时间倍率",
    "dilationRate_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "dilationFrame_vname": "卡肉持续时间s",
    "dilationFrame_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "effectid_vname": "效果id",
    "effectid_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_SkillRect extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_SkillRect;

    /**类型 0方盒 1球形*/
    public type: number = 0;
    /** 偏移坐标 */
    public offsetLoc: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移旋转 */
    public offsetRot: mw.Vector = new mw.Vector(0, 0, 0);
    /**长宽高*/
    public LWH: mw.Vector = new mw.Vector(1, 1, 1);
    /**半径*/
    public range: number = 1;
    // /**圆柱高度*/
    // public height: number = 0;
    /**判定次数*/
    public checkCount: number = 1;
    /**判定间隔 秒*/
    public checkInterval: number = 0;
    /**持续帧数*/
    public keepFrameCount: number = 0;
    /**播放插槽*/
    public rectSocket: number = 0;
    /**是否攻击震屏 */
    public isShake: number = 0;
    /**震屏表id */
    public cameraShakeId: number = 0;

    /**例如判定区共造成5次伤害，效果ID填写的3|3|3|3|4，即这五次伤害依次造成效果表里ID为3、3、3、3、4的效果 */
    public effectid: number = 0;
    /**卡肉 时间膨胀倍率 */
    public dilationRate: number = 0;
    /**卡肉持续时间秒 */
    public dilationFrame: number = 0;
}

/**中断节点 添加该节点，后续motion可以被中断*/
@motionEdit_Node({
    "nodeName": "中断节点",

    "breakType_vname": "中断类型1,2",
    "breakType_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_BreakPoint extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_BreakPoint;

    /**中断类型  1.可被中断，停止播放动效 2.可被中断，不停止播放动效 */
    public breakType: number = 1;
}

/**UI表现节点 */
@motionEdit_Node({
    "nodeName": "UI表现节点",

    "offsetLoc_vname": "偏移坐标",
    "offsetLoc_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "offsetRot_vname": "偏移旋转",
    "offsetRot_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "scale_vname": "偏移缩放",
    "scale_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "uiGuid_vname": "UIguid",
    "uiGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "keepTime_vname": "显示帧数",
    "keepTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "socket_vtype": "插槽",
    "socket_vname": EMotionFrameNodeViewItemType.Text_Input,
    "isBig_vtype": "是否放大",
    "isBig_vname": EMotionFrameNodeViewItemType.Text_Input,
    "bigRate_vtype": "放大倍率",
    "bigRate_vname": EMotionFrameNodeViewItemType.Text_Input,
    "bigSpeed_vname": "放大速度",
    "bigSpeed_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_UI extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_UI;

    /** 偏移坐标 */
    public offsetLoc: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移旋转 */
    public offsetRot: mw.Vector = new mw.Vector(0, 0, 0);
    /** 偏移缩放 */
    public scale: mw.Vector = new mw.Vector(1, 1, 1);
    /**UIguid */
    public uiGuid: string = "0";
    /**显示帧数 */
    public keepTime: number = 0;
    /**插槽 */
    public socket: number = 0;
    /**是否放大 */
    public isBig: number = 0;
    /**放大倍率 */
    public bigRate: number = 0;
    /**放大速度 */
    public bigSpeed: number = 0;
}

/**事件节点 调用自定义事件*/
@motionEdit_Node({
    "nodeName": "事件节点",

    "eventName_vname": "事件名",
    "eventName_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Event extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Event;

    /**事件名 */
    public eventName: string = "Event_";
}

/**调用其它motion节点*/
@motionEdit_Node({
    "nodeName": "motion节点",

    "motionId_vname": "新motionid",
    "motionId_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_InvokeMotion extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_InvokeMotion;

    /**motionid */
    public motionId: number = 0;
}

/**震屏节点*/
@motionEdit_Node({
    "nodeName": "震屏节点",

    "rollAmplitude_vname": "X旋转幅度",
    "rollAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "rollFrequency_vname": "X旋转频率",
    "rollFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "rollWaveform_vname": "X旋转类型0|1",
    "rollWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "pitchAmplitude_vname": "Y旋转幅度",
    "pitchAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "pitchFrequency_vname": "Y旋转频率",
    "pitchFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "pitchWaveform_vname": "Y旋转类型0|1",
    "pitchWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "yawAmplitude_vname": "Z旋转幅度",
    "yawAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "yawFrequency_vname": "Z旋转频率",
    "yawFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "yawWaveform_vname": "Z旋转类型0|1",
    "yawWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "xAmplitude_vname": "X位置幅度",
    "xAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "xFrequency_vname": "X位置频率",
    "xFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "xWaveform_vname": "X位置类型0|1",
    "xWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "yAmplitude_vname": "Y位置幅度",
    "yAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "yFrequency_vname": "Y位置频率",
    "yFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "yWaveform_vname": "Y位置类型0|1",
    "yWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "zAmplitude_vname": "Z位置幅度",
    "zAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "zFrequency_vname": "Z位置频率",
    "zFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "zWaveform_vname": "Z位置类型0|1",
    "zWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "fovAmplitude_vname": "fov位置幅度",
    "fovAmplitude_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fovFrequency_vname": "fov位置频率",
    "fovFrequency_vtype": EMotionFrameNodeViewItemType.Text_Input,
    "fovWaveform_vname": "fov位置类型0|1",
    "fovWaveform_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "keepTime_vname": "持续时间",
    "keepTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_Shake extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_Shake;

    // 翻滚
    public rollAmplitude: number = 0;
    public rollFrequency: number = 0;
    public rollWaveform: number = 1;
    // 俯仰
    public pitchAmplitude: number = 0;
    public pitchFrequency: number = 0;
    public pitchWaveform: number = 1;
    // 偏航
    public yawAmplitude: number = 0;
    public yawFrequency: number = 0;
    public yawWaveform: number = 1;

    // 位置震荡
    public xAmplitude: number = 50;
    public xFrequency: number = 10;
    public xWaveform: number = 1;
    // 位置Y
    public yAmplitude: number = 0;
    public yFrequency: number = 0;
    public yWaveform: number = 1;
    // 位置Z
    public zAmplitude: number = 50;
    public zFrequency: number = 10;
    public zWaveform: number = 1;
    // fov
    public fovAmplitude: number = 0;
    public fovFrequency: number = 0;
    public fovWaveform: number = 1;

    public keepTime: number = 0.5;
}

/**调用其它motion节点*/
@motionEdit_Node({
    "nodeName": "隐藏武器",

    "weaponIndex_vname": "武器索引",
    "weaponIndex_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "hideTime_vname": "隐藏时间秒",
    "hideTime_vtype": EMotionFrameNodeViewItemType.Text_Input,
})
export class MotionFrameNode_VisibleWeapon extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_VisibleWeapon;

    /**武器索引 */
    public weaponIndex: number = 0;
    /**隐藏时间 */
    public hideTime: number = 0;
}

/**调用其它motion节点*/
@motionEdit_Node({
    "nodeName": "播放武器动画",
})
export class MotionFrameNode_PlayWeaponAnim extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotionFrameNode_PlayWeaponAnim;
}

/**模型动画节点*/
@motionEdit_Node({
    "nodeName": "模型动画",

    "modelGuid_vname": "模型guid",
    "modelGuid_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "delayTime_vname": "延迟时间",
    "delayTime_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "animTime_vname": "动画事件秒",
    "animTime_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "destroyTime_vname": "动画结束销毁时间",
    "destroyTime_vtype": EMotionFrameNodeViewItemType.Text_Input,

    "startPos_vname": "起始点",
    "startPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "endPos_vname": "目标点",
    "endPos_vtype": EMotionFrameNodeViewItemType.Text_Vector,

    "startRot_vname": "起始旋转",
    "startRot_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "endRot_vname": "目标旋转",
    "endRot_vtype": EMotionFrameNodeViewItemType.Text_Vector,

    "startScale_vname": "起始缩放",
    "startScale_vtype": EMotionFrameNodeViewItemType.Text_Vector,
    "endScale_vname": "目标缩放",
    "endScale_vtype": EMotionFrameNodeViewItemType.Text_Vector,

})
export class MotioniFrameNode_ModelAnim extends MotionFrameNodeBase {
    public frameNodeType: EFrameNodeType = EFrameNodeType.MotioniFrameNode_ModelAnim;

    public modelGuid: string = "174519";

    /**延迟播放时间 */
    public delayTime: number = 0;

    public animTime: number = 1;

    public destroyTime: number = 3;

    /**起始坐标 */
    public startPos: mw.Vector = new mw.Vector(500, 0, 800);
    public endPos: mw.Vector = new mw.Vector(500, 0, -100);

    public startRot: mw.Vector = new mw.Vector(0, 0, 0);
    public endRot: mw.Vector = new mw.Vector(0, 0, 0);

    public startScale: mw.Vector = new mw.Vector(1, 1, 1);
    public endScale: mw.Vector = new mw.Vector(30, 30, 30);

}