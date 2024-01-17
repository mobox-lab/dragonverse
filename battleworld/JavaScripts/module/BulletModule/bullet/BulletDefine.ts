/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 10:05:16
* @Description  : 定义子弹的一些通用枚举，常量，类型等
*/

/**
 * 测试用
 */
export let useCachedMode: boolean = false;
export function setUseCachedMode(value: boolean) {
    useCachedMode = value;
}

/**
 * 测试用
 */
export let useReplicatedMode: boolean = false;
export function setUseReplicatedMode(value: boolean) {
    useReplicatedMode = value;
}


/**
 * 旋转一个向量
 * @param from 需要放置的向量
 * @param axis 旋转所绕的轴
 * @param angle 旋转的角度
 * @returns  返回旋转后的向量
 */
export function bullet_RotateVector(from: mw.Vector, axis: mw.Vector, angle: number): mw.Vector {
    // let rot = new UE.Quat(new UE.Vector(axis.x, axis.y, axis.z), angle * Math.PI / 180);
    // let fromV3 = new UE.Vector(from.x, from.y, from.z);
    // let newV3 = rot.op_Multiply(fromV3);
    // // return new mw.Vector(newV3.X, newV3.Y, newV3.Z);
    // let ret2=new mw.Vector(newV3.X, newV3.Y, newV3.Z);
    // console.log(ret2);

    let rat = mw.Quaternion.fromAxisAngle(axis, angle * Math.PI / 180)
    // rat.

    // let old=from.toRotation().add( rat.toRotation());
    // let ret=old.getForce();

    let ret3 = mw.Quaternion.multiplyVector(from, rat);
    // console.log(ret3);
    return ret3;
}


/**
 * 判断两个物体是否相等
 * @param objA 
 * @param objB 
 * @returns 
 */
export function checkObjIsEqual(objA: mw.GameObject, objB: mw.GameObject): boolean {
    if (objA == null || objA == undefined || objB == null || objB == undefined)
        return false;
    try {
        return objA.gameObjectId == objB.gameObjectId;
    } catch (error) {
        return false;
    }
}

/**
 * //25782,资源库里固定空锚点guid
 */
export let emptyAnchorKey = "Anchor";
/**
 * //113,资源库里的触发器guid
 */
export let boxTriggerKey = "Trigger";

/**
 * 子弹用的trigger tag，用于过虑子弹互相命中
 */
export let bulletTriggerTag = "bulletTriggerTag";

/**
 * 定义子弹类的类形状
 */
export type BulletClass<T> = { new(...arg): T };

/**
 * 子弹行为的回调 用于创建,命中和结束
 */
export type BulletEvent = (arg: any) => void;

/**
 * 子弹类型
 */
export enum EBulletType {
    /**
     * 服务器用的逻辑子弹，仅对数据有一个缓存罢了
     */
    Logic = 0,
    /**
     * 客户端用的线性子弹
     */
    Line = 1,
    /**
     * 客户端用的定点抛物线子弹
     */
    Parabola = 2,
    /**
     * 客户端用的目标跟踪子弹
     */
    Trace = 3,

    /**
     * 曲线子弹：贝塞尔 
     */
    Curve = 4,

}


/**
 * 子弹发射用的数据结构,支持定义直线型子弹,抛物线型子弹，跟踪型子弹的发射数据集
 */
export type BulletLaunchData = {
    /**atkerIsPlayer:这个子弹是玩家发出的吗，false表示是非玩家(怪物，npc...)发起的 */
    atkerIsPlayer: boolean,
    /**这个子弹由那一个客户端的玩家id负责处理 */
    playerId: number,
    /**发射位置 */
    launchPos: mw.Vector,
    /**目标位置 */
    targetPos: mw.Vector,
    /**子弹在配置表里的静态id, 配置了子弹前端要用的数据以及一些专用数据 */
    configId: number,
    /**子弹类型  服务端固定为EBulletType.Logic */
    bulletType?: EBulletType,
    /**速度，如果有提供，将覆盖 configId对应静态表里的速度 */
    speed?: number,
    /**穿透量，如果有提供，将覆盖 configId对应静态表里的穿透量 */
    penetrateCount?: number,
    /**子弹分裂数，如果有提供，将覆盖 configId对应静态表里的分裂数 */
    splitCount?: number,
    /**子弹水平分裂角度，如果有提供，将覆盖 configId对应静态表里的分裂角度 */
    splitAngle?: number,
    /**子弹反弹次数，如果有提供，将覆盖 configId对应静态表里的反弹次数 */
    reboundCount?: number,
    /**定点抛物线的高度比例(0-1) */
    heightScale?: number,
    /**跟踪型目标的mw.GameObject.guid */
    traceTargetGuid?: string,
    /**子弹延迟销毁时间(s)，如果有提供，将覆盖 configId对应静态表里的延迟销毁时间 */
    delayDestroy?: number,
    /**自定义额外需要的透传对象数据,json格式，基础类型(boolean,number,string),比如  用于计算命中伤害的攻击力数据这些, 如果服务端参与的应尽量少的透传，节约带宽 ,不应被更改 */
    extraData?: any
}

/**
 * 客户端用于创建子弹的数据结构
 * atkerIsPlayer :这个子弹是玩家发出的吗，false表示是非玩家(怪物，npc...)发起的
 * id:子弹的id
 * pid:玩家客户端用于计算的id
 * f:起始位置
 * t:结束位置
 * cfgId:number 子弹在配置表里的静态id, 配置了子弹前端要用的数据以及一些专用数据
 * bt:EBulletType 子弹类型
 * spd:速度，如果有提供，将覆盖 configId对应静态表里的速度
 * pc: 穿透量，如果有提供，将覆盖 configId对应静态表里的穿透量
 * sc:子弹分裂数，如果有提供，将覆盖 configId对应静态表里的分裂数
 * sa:子弹水平分裂角度，如果有提供，将覆盖 configId对应静态表里的分裂角度
 * rc:子弹反弹次数，如果有提供，将覆盖 configId对应静态表里的反弹次数
 * hs:定点抛物线的高度比例(0-1)
 * tt:跟踪型目标的mw.GameObject.guid,跟踪类型的必须要提供有效的guid 
 * dd:子弹延迟销毁时间(s)，如果有提供，将覆盖 configId对应静态表里的延迟销毁时间  
 * ed：会将BulletLaunchData的额外数据 透传，自由控制，尽量少
 */
export type BulletCreateData = {
    atkerIsPlayer: boolean, id: number, pid: number, f: number[], t: number[], cfgId: number, bt: EBulletType,
    spd?: number, pc?: number, sc?: number, sa?: number, rc?: number, hs?: number, tt?: string, dd?: number, ed?: any
};



/**
 * 客户端用计算子弹命中结果的数据结构
 *命中结果，需要上报的自定义数据,  定义为一个json结构对象,基础类型(boolean,number,string),透传，尽量小
 */
export type BulletClientHitData = {}



/**
 * 客户端用于上报子弹命中的数据结构
 * id:子弹的id
 * hitCount:命中次数，
 * hitInfo:命中情况，需要上报的自定义数据,  定义为一个json结构对象,基础类型(boolean,number,string),透传，尽量小
 */
export type BulletServerHitData = { id: number, hitCount: number, hitInfo: BulletClientHitData }


/**
 * 服务器对子弹的命中结果进行了验证并计算了伤害，这个伤害结果用属性同步到客户端，会序列化成一个json串传送，   定义为一个json结构对象,基础类型(boolean,number,string),透传，尽量小
 */
export type BulletDamageData = {};



/**
 * 子弹的命中计算方式
 */
export enum EBulletHitCalcType {
    /**
     * trigger检测  0
     */
    Trigger,
    /**
     * 射线检测    1
     */
    LineTrace
}

/**
 * 子弹的销毁条件
 */
export enum EBulletDestroyCondition {
    /**
     * 到达目的地
     */
    ReachTarget,
    /**
     * 无法再穿透时 反弹专用
     */
    CannotPenetrate,

    /**
     * 无法再反弹时，反弹专用
     */
    CannotRebound
}


/**
 * 子弹公共模块会用到的一些事件
 */
export enum BulletEvents {

    /**
     * 客户端子弹击中了某个物体
     */
    ClientBulletHitTarget = "ClientBulletHitTarget",
    /**
     * 客户端属性同步响应事件  参数
     */
    ClientReplicatedResult = "ClientReplicatedResult",

    /**
     * 客户端属性同步响应子弹销毁事件
     */
    ClientReplicatedDestroy = "ClientReplicatedDestroy",

}


/**
 * 定义子弹会用到的rpc函数名
 */
export namespace BulletRpcFun {
    //////////////////////////////服务器/////////////////////////////
    export let net_OnBulletHit = "net_OnBulletHit";
    export let net_OnBulletDestroy = "net_OnBulletDestroy";

    ////////////////////////////////////////////////////////////////////

    ////////////////////////////////////////客户端///////////////////
    /**
     * 子弹创建了
     */
    export let net_CreateBullet = "net_CreateBullet";

    /**
     * 一批子弹被创建了
     */
    export let net_CreateBullets = "net_CreateBullets";

    /**
     * 子弹生成伤害了，rpc
     */
    export let net_BulletTakeDamage = "net_BulletTakeDamage";

    /**
     * 子弹销毁
     */
    export let net_onBulletDestroyClient = "net_onBulletDestroyClient";

}




/**
 * 子弹的基础id
 */
let bulletBaseId: number = 0;
/**
 * 获取一个子弹用的全局唯一的guid
 * @returns 
 */
export function getBulletGuid(): number {
    return bulletBaseId++;
}