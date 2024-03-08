/** 冷兵器节点类型 */
export enum NodeType {

    /** 动画 */
    Animation = 1,
    /** 特效 */
    Eff = 2,
    /** 移动 */
    Move = 3,
    /** 音效 */
    Audio = 4,
    /** 技能判定区域 */
    SkillRect = 5,
    /** 飞行弹道 */
    FlyEntity = 6,
    /** 连段节点 */
    Period = 7,
    /** 禁用节点 */
    Forbidden = 8,
    /** 相机节点 */
    Camera = 9,
    /** 脱手脉冲节点 */
    Throw = 10
}

/** 节点信息 */


/**
 * 所有节点信息
 */
export class AnimationInfo {

    /** 战斗待机动画 */
    public charFightIdelAniId: string = "";

    public charFightIdelSlot: string = "2";

    /** 自动锁定 */
    public autoFocus: string = "0";

    public autoFocusRadius: string = "500";

    public autoFocusAngle: string = "90";

    public autoFocusDistFactor: string = "1";

    /** 动画信息 */
    public infos: NodeInfoBase[] = [];
}


export const NodeParamName: Map<string, string> = new Map([
    ["guid", "节点Guid"],
    ["duration", "持续时间"],
    ["rate", "速率"],
    ["hitLength", "击打时间"],
    ["frontRockLength", "前摇时间"],
    ["isCharge", "是否蓄力"],
    ["isAutoPlay", "是否自动播放"],
    ["delayPlayTime", "延迟播放时间"],
    ["slotIndex", "插槽位置"],
    ["stopTime", "停止时间"],
    ["colorHex", "特效颜色偏移"],
    ["offsetPos", "偏移坐标"],
    ["offsetRotation", "偏移旋转"],
    ["offsetScale", "偏移缩放"],
    ["isToPos", "是否瞬移"],
    ["moveDir", "移动朝向"],
    ["moveDistance", "移动距离"],
    ["skillAngle", "角度"],
    ["skillRadius", "半径"],
    ["skillWidth", "宽度"],
    ["skillHeight", "高度"],
    ["skillLength", "长度"],
    ["moveSpeed", "移动速度"],
    ["moveRotation", "移动旋转"],
    ["chargeTime", "蓄力时间"],
    ["skillIndex", "判定索引"],
    ["loop", "是否循环"],
    ["axis", "轴"],
    ["rotationSpeed", "旋转速度"],
    ["isCollision", "开启碰撞"],
    ["target", "目标"],
    ["flyRadius", "环绕半径"],
    ["frequency", "检测频率"],
    ["presetIndex", "预设类型"],
    ["offsetLength", "位移偏移"],
    ["offsetFov", "FOV偏移"],

]);


export class NodeInfoBase {

    /** 节点类型 */
    public type: string = "";
}

export class NodeInfoAnim extends NodeInfoBase {
    public type = String(NodeType.Animation);
    /** 节点Guid */
    public guid: string = "";
    /** 动画插槽索引 0全身，1上半身，2下半身 */
    public slotIndex: string = "0";
    /** 持续时间 */
    public duration: string = "0";
    /** 播放速率 */
    public rate: string = "1";
    /** 延迟播放时间 */
    public delayPlayTime: string = "0";
    /** 循环 0不循环 */
    public loop: string = "0"
    /** 击打时间(废弃) */
    public hitLength: string = "0";
    /** 前摇时间(废弃) */
    public frontRockLength: string = "0";
    /** 是否蓄力（废弃） */
    public isCharge: string = "0";
    /** 是否自动播放(废弃) */
    public isAutoPlay: string = "0";
}

export class NodeInfoEff extends NodeInfoBase {
    public type = String(NodeType.Eff);
    /** 节点Guid */
    public guid: string = "";
    /** 延迟播放时间 */
    public delayPlayTime: string = "0";
    /** 插槽位置 */
    public slotIndex: string = "-1";
    /** 循环 0不循环*/
    public loop: string = "0"
    /** 停止时间 */
    public stopTime: string = "200";

    /** 特效颜色偏移 */
    public colorHex: string = "";
    /** 偏移坐标 */
    public offsetPos: Array<string> = ["0", "0", "0"];
    /** 偏移旋转 */
    public offsetRotation: Array<string> = ["0", "0", "0"];
    /** 偏移缩放 */
    public offsetScale: Array<string> = ["0", "0", "0"];
}

export class NodeInfoMove extends NodeInfoBase {
    public type = String(NodeType.Move);
    /** 移动参数 */
    /** 是否瞬移 1 瞬移 0 插值,-1忽略玩家 */
    public isToPos: string = "0";
    /** 移动朝向 1 前 -1 后*/
    public moveDir: Array<string> = ["1", "0", "0"];
    /** 移动距离 */
    public moveDistance: string = "200";

    public moveRotation: Array<string> = ["0", "0", "0"];
    /** 持续时间 */
    public duration: string = "200";
    /** 延迟播放时间 */
    public delayPlayTime: string = "0";
}

export class NodeInfoAudio extends NodeInfoBase {
    public type = String(NodeType.Audio);
    /** 节点Guid */
    public guid: string = "";

    /** 延迟播放时间 */
    public delayPlayTime: string = "0";

    /** 停止时间 */
    public stopTime: string = "200";

}

export class NodeInfoSkillRect extends NodeInfoBase {
    public type = String(NodeType.SkillRect);
    /** 技能判定参数 */
    public skillIndex: string = "0";
    /** 角度 */
    public skillAngle: string = "0";
    /** 偏移坐标 */
    public offsetPos: Array<string> = ["0", "0", "0"];
    /** 半径 */
    public skillRadius: string = "0";
    /** 高度 */
    public skillHeight: string = "0";
    /** 长度 */
    public skillLength: string = "0";
    /** 宽度 */
    public skillWidth: string = "0";
    /** 延迟播放时间 */
    public delayPlayTime: string = "200";
}

export class NodeInfoFlyEntity extends NodeInfoBase {
    public type = String(NodeType.FlyEntity);
    /** 飞行弹道参数 */
    public skillIndex: string = "0";
    /** 节点Guid */
    public guid: string = "";
    /** 速度 */
    public moveSpeed: string = "300";
    /** 偏移坐标 */
    public offsetPos: Array<string> = ["0", "0", "0"];
    /** 偏移旋转 */
    public offsetRotation: Array<string> = ["0", "0", "0"];
    /** 偏移缩放 */
    public offsetScale: Array<string> = ["1", "1", "1"];
    /** 轴 */
    public axis: string = "0";
    /** 旋转速度 */
    public rotationSpeed: string = "0";
    /** 特效颜色偏移 */
    public colorHex: string = "";
    /** 延迟播放时间 */
    public delayPlayTime: string = "0";
    /** 移动距离 */
    public moveDistance: string = "500";
}

/** 连段节点 */
export class NodeInfoPeriod extends NodeInfoBase {
    public type = String(NodeType.Period);

    /** 持续时间 */
    public duration: string = "1000";
    /** 前摇时间  */
    public frontRockLength: string = "0";
    /** 是否蓄力 */
    public isCharge: string = "0";
    /** 是否自动播放 */
    public isAutoPlay: string = "0";
    /** 蓄力时间, 蓄力时间内的动画，音效，特效会执行,支持三段蓄力
     * @example ["1000","2000","3000"] 当前连段为第0段，未到达1000释放不播放，到达1000释放播放第一段，到达2000释放播放第二段，到达3000释放播放第三段
     */
    public chargeTime: Array<string> = ["-1", "-1", "-1"];
}


/** 控制释放节点 */
export class NodeInfoForbidden extends NodeInfoBase {
    public type = String(NodeType.Forbidden);

    /** 启用类型 0冷兵器，1移动，2跳跃 */
    public slotIndex: string = "0";
    /** 持续时间 */
    public duration: string = "500";
    /** 延迟时间  */
    public delayPlayTime: string = "0";
    /** 移动速度衰减百分比 */
    public moveSpeed: string = "100"
}

/** 相机节点 */
export class NodeInfoCamera extends NodeInfoBase {
    public type = String(NodeType.Camera);
    /** 预设：0特写，1远景，2震屏 */
    public presetIndex: string = "0";
    /** 持续时间 */
    public duration: string = "500";
    /** 延迟时间  */
    public delayPlayTime: string = "0";
    /** 位移偏移 */
    public offsetLength: string = "100";
    /** FOV偏移 */
    public offsetFov: string = "0";
    /** 震屏 方向0-5,幅度,频率
     * 0:x 1:y 2:z 3:pitch 4:yaw 5:roll
     */
    public shake: Array<string> = ["0", "5", "50"];
}

/** 投掷物节点 */
export class NodeInfoThrow extends NodeInfoBase {
    public type = String(NodeType.Throw);
    skillIndex: string = "0"

    /** 对象Guid */
    guid: string = "";

    /** 持续时间 */
    duration: string = "5000";
    /** 位移速度 */
    moveSpeed: string = "0";
    /** 移动距离 */
    moveDistance: string = "500";
    /** 偏移旋转 */
    public offsetRotation: Array<string> = ["0", "0", "0"];
    /** 偏移缩放 */
    public offsetScale: Array<string> = ["1", "1", "1"];
    /** 特效颜色偏移 */
    public colorHex: string = "";
    /** 检测半径 */
    public skillRadius: string = "200";
    /** 检测频率 */
    public frequency: string = "1000";
    /** 延迟时间 */
    public delayPlayTime: string = "0";
}

export function getNodeClassByType(type: NodeType): new () => NodeInfoBase {
    switch (type) {
        case NodeType.Animation:
            return NodeInfoAnim;
        case NodeType.Eff:
            return NodeInfoEff;
        case NodeType.Move:
            return NodeInfoMove;
        case NodeType.Audio:
            return NodeInfoAudio;
        case NodeType.SkillRect:
            return NodeInfoSkillRect;
        case NodeType.FlyEntity:
            return NodeInfoFlyEntity;
        case NodeType.Period:
            return NodeInfoPeriod;
        case NodeType.Forbidden:
            return NodeInfoForbidden;
        case NodeType.Camera:
            return NodeInfoCamera;
        case NodeType.Throw:
            return NodeInfoThrow;
        default:
            return NodeInfoBase;
    }
}

export class ThrowGo {
    intervalHandle: any = null;
    constructor(public id: string, public go: mw.GameObject, public time: number, public checkTimer: number, public flyTimer: number) { }
}