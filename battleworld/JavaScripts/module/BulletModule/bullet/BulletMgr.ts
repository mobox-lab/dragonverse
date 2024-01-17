/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 11:32:25
* @Description  : 管理子弹的生成，驱动，销毁  (RPC下发)客户端创建表现，客户端进行生成，位移，发起者客户端进行命中判断，
                  如果是共用的服务器创建的子弹（给到一个玩家进行计算），然后上报服务器，服务器计算伤害后属性同步到客户端 ，未收到子弹命中的消息，子弹自己到了目的地自行销毁即可
                  支持穿透，命中判断支持trigger，射线检测
*/

import { Bullet, InnerBulletData } from "./Bullet";
import { BulletLaunchData, BulletClass, bullet_RotateVector, EBulletDestroyCondition } from "./BulletDefine";
import { TimerWheel } from "./TimeWheel";


export abstract class BulletMgr<T extends Bullet> {

    /**
     * 管理子弹定时销毁
     */
    protected bulletTimerWheel: TimerWheel;

    /**
     * 所有静态配置表，外部初始化进来的
     */
    protected staticBullets: Map<number, InnerBulletData>;
    /**
     * 是否已经初始化过了
     */
    protected inited: boolean = false;

    /**
     * 飞行中的子弹,key为子弹唯一id
     */
    protected _bullets: Map<number, T>;
    public get bullets() {
        return this._bullets;
    }

    /**
     * 当子弹创建完成时
     */
    protected _onCreateEvent: mw.Action1<T>;
    public get onCreateEvent(): mw.Action1<T> {
        return this._onCreateEvent;
    }


    /**
    * 当子弹销毁时
    */
    protected _onDestroyEvent: mw.Action1<T>;
    public get onDestroyvent(): mw.Action1<T> {
        return this._onDestroyEvent;
    }


    /**
    * 子弹管理器进行初始化
    *  @param staticBulletDatas  静态子弹表数据,传入GameConfig.Bullet.getAllElement()即可
    */
    protected async init(staticBulletDatas: InnerBulletData[], ...arg) {
        //  oTrace("BulletManager init");
        this.bulletTimerWheel = new TimerWheel();
        this._bullets = new Map<number, T>();
        this.staticBullets = new Map<number, InnerBulletData>();
        staticBulletDatas.forEach((bulletData, _) => {
            this.staticBullets.set(bulletData.id, bulletData);
        })
        this._onCreateEvent = new mw.Action1<T>();
        this._onDestroyEvent = new mw.Action1<T>();
    }

    /**
     * 内部创建一个子弹对象 
     * @param launchData 发射用的数据集
     * @param bulletClass 创建的bulletClass
     * @param needNotify 是否需要通知客户端
     * @param guid 子弹id,如果提供了表示是客户端在创建
     * @returns 子弹对象
     */
    protected async innerCreateBullet(launchData: BulletLaunchData, bulletClass: BulletClass<T>, needNotify: boolean = false, guid: number = null): Promise<T | T[]> {
        if (!launchData.playerId || launchData.playerId <= 0) {
            console.error("创建子弹需要一个玩家id来计算该子弹，请提供一个玩家的id");
            return null;
        }
        if (this._bullets.get(guid)) {
            console.error("不能重复创建相同id的子弹!,guid: " + guid + " ,launchData: " + JSON.stringify(launchData));
            return null;
        }

        let bullet = this.getBullet(launchData, bulletClass, guid);
        await this.initBulletMode(bullet);

        this._onCreateEvent?.call(bullet);

        if (needNotify)
            this.afterCreatedBullet(bullet);

        this._bullets.set(bullet.id, bullet);

        return bullet;
    }

    /**
     * 创建一个子弹对象 
     * @param launchData 发射用的数据集
     * @param bulletClass 创建的bulletClass
     * @param guid 子弹id,如果提供了表示是客户端在创建
     * @returns 子弹对象
     */
    protected async createBullet(launchData: BulletLaunchData, bulletClass: BulletClass<T>, guid: number = null): Promise<T | T[]> {
        return null;
    }

    /**
     * 创建一批子弹对象 ,前两个参数长度一致，数据内容一一对应
     * @param launchDatas 发射用的数据集
     * @param bulletClsses 创建的bulletClass
     * @param guids 子弹id,如果提供了表示是客户端在创建
     * @returns 子弹对象列表
     */
    protected async createBullets(launchDatas: BulletLaunchData[], bulletClsses: BulletClass<T>[] = null, guids: number[] = null): Promise<T[]> {
        if (launchDatas.length != bulletClsses.length)
            return [];

        let bullets = [];
        for (let i = 0; i < launchDatas.length; i++) {
            let bullet = await this.innerCreateBullet(launchDatas[i], bulletClsses[i], false, guids == null ? null : guids[i]);
            bullets.push(bullet);
        }
        this.afterCreatedBullet(bullets);
        return bullets;
    }

    /**
     * 获取一个子弹对象
      * @param launchData 发射用的数据集
     * @param bulletClass 创建的bulletClass 
     * @param guid 子弹id,如果提供了表示是客户端在创建
     */
    protected getBullet(launchData: BulletLaunchData, bulletClass: BulletClass<T>, guid: number = null): T {
        let staticData = this.staticBullets.get(launchData.configId);
        if (staticData == null) {
            console.error("生成子弹失败，不存在子弹配置, configId: " + launchData.configId);
            return null;
        }
        return new bulletClass(launchData, staticData, guid);
    }

    /**
     * 初始化子弹模型  hook
     * @param bullet 初始化的子弹对象      
     * @returns 子弹对象
     */
    protected async initBulletMode(bullet: T) {
        await bullet.init();
    }




    /**
     * 当子弹创建后 hook
     */
    protected afterCreatedBullet(bullet: T | T[]) {

    }

    /**
     * 启动子弹的销毁倒计时
     * @param bullet 
     */
    protected setupBulletDestroyTimer(bullet: T) {
        let delayTime = null;
        if (bullet.delayDestroyTime > 0) {
            delayTime = bullet.delayDestroyTime;
        }
        else {
            if (bullet.destroyCondition == EBulletDestroyCondition.CannotRebound) {
                //这个如果没有，也要加一个
                delayTime = 60000;
            }
        }
        if (delayTime) {
            bullet.destroyTimerId = this.bulletTimerWheel.createTimer(bullet.delayDestroyTime, (bulletId: number) => {
                let bullet = this.findBullet(bulletId);
                if (bullet && !bullet.dead) {
                    this.onBulletForceDestroy(bullet);
                }
            }, bullet.id)
        }
    }

    /**
     * 当子弹需要强制销毁时
     * @param bullet 
     */
    protected onBulletForceDestroy(bullet: T) {
        bullet.markDead();
    }

    /**
     * 根据子弹Id 查找子弹对象
     * @param bulletId 子弹唯一id
     * @returns  T 子弹对象
     */
    findBullet(bulletId: number): T {
        if (this._bullets)
            return this._bullets.get(bulletId);
        return null;
    }


    /**
     * 销毁子弹  
     */
    protected destroyBullet(bullet: T) {
        //  oTrace("BulletManager,destroyBullet ");
        if (bullet.destroyTimerId) {
            this.bulletTimerWheel.cancleTimer(bullet.destroyTimerId);
            bullet.destroyTimerId = null;
        }
        this.onDestroyvent?.call(bullet);
    }


    /**
     * 全部直接清理 
     */
    clear() {
        this._bullets.forEach((bullet, _) => {
            this.destroyBullet(bullet);
        })
        this._bullets.clear();
    }

    /**
     * 完全销毁 
     */
    protected destroy() {
        this.bulletTimerWheel.clearAllTimers();
        this.bulletTimerWheel = null;
        this.clear();
        this._bullets = null;
    }



    /**
     * 从发射数据创建一个新的目标位置的发射数据
     * @param launchData 
     * @param newTarget 
     */
    protected copyFromBulletLaunchData(launchData: BulletLaunchData, newTarget: mw.Vector): BulletLaunchData {
        let ld: BulletLaunchData = {
            atkerIsPlayer: launchData.atkerIsPlayer,
            playerId: launchData.playerId,
            launchPos: new mw.Vector(launchData.launchPos.x, launchData.launchPos.y, launchData.launchPos.z),
            targetPos: newTarget,
            configId: launchData.configId,
            bulletType: launchData.bulletType,
            speed: launchData.speed,
            penetrateCount: launchData.penetrateCount,
            splitCount: launchData.splitCount,
            splitAngle: launchData.splitAngle,
            reboundCount: launchData.reboundCount,
            heightScale: launchData.heightScale,
            traceTargetGuid: launchData.traceTargetGuid,
            delayDestroy: launchData.delayDestroy,
            extraData: launchData.extraData
        }
        return ld;
    }


    /**
    * 计算分裂子弹的轨迹
    * @param launchData 发射数据     
    * @param splitCount 额外子弹 
    * @param splitAngle  分裂角度
    * @returns 
    */
    protected calcSplitBullet(launchData: BulletLaunchData, splitCount: number, splitAngle: number): BulletLaunchData[] {
        let from = launchData.launchPos;
        let to = launchData.targetPos;
        let launchDir = to.clone().subtract(from).normalize();
        let dist = mw.Vector.distance(from, to);
        let atLeftSide = true;
        let leftIndex = 1;
        let rightIndex = 1;
        let rotAngle = 0;
        let atkSet: BulletLaunchData[] = [];
        atkSet.push(launchData);

        for (let i = 0; i < splitCount; i++) {
            if (atLeftSide) {
                rotAngle = -leftIndex * splitAngle;
                leftIndex++;
            }
            else {
                rotAngle = rightIndex * splitAngle;
                rightIndex++;
            }
            atLeftSide = !atLeftSide;
            let newDir = bullet_RotateVector(launchDir, mw.Vector.up, rotAngle);
            let newPos = from.clone().add(newDir.multiply(dist));

            atkSet.push(this.copyFromBulletLaunchData(launchData, newPos));
        }
        return atkSet;
    }
}