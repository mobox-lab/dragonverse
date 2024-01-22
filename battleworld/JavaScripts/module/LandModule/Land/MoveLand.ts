import { Globaldata } from "../../../const/Globaldata";


/**
 * 移动地块
 */
export default class MoveLand {

    /**处理材质移动显示闪烁问题*/
    public static addIndex: number = 1

    /**绑定物体 */
    private parent: GameObject = null;

    /**运动器*/
    private mover: mw.IntegratedMover = null;

    /**运动器 位置*/
    private pos: Vector = null;

    /**运动器 旋转*/
    private rotation: Rotation = null;

    /**运动时间 */
    private _moveTime: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }


    /** 
     * 创建 
     */
    public async creat(parent: GameObject, speed: Vector, time: number) {
        this.parent = parent;
        this.pos = parent.worldTransform.position.clone();
        this.rotation = parent.worldTransform.rotation.clone();
        if (MoveLand.addIndex <= 0) { MoveLand.addIndex = 1; }
        parent.worldTransform.position = this.pos.clone().add(new Vector(0, 0, speed.z != 0 ? 0 : Globaldata.land_matieral_offect * MoveLand.addIndex));
        MoveLand.addIndex++;

        //fix:编辑器Bug,运动器回收再使用会导致上一个物体再移动一段距离,暂时使不直接生成销毁
        //this.mover = await SpawnManager.modifyPoolAsyncSpawn("PhysicsSports") as mw.IntegratedMover; 
        this.mover = await GameObject.asyncSpawn("IntegratedMover") as mw.IntegratedMover

        this.mover.linearRepeat = true;
        this.mover.linearRepeatTime = time;
        this.mover.linearSpeed = speed;

        this.mover.parent = parent;


        let keepTime = Globaldata.land_Parcess_refash_time - time * 2

        // console.error("===vae move 1 ", time, keepTime, speed);

        // 到达终点停顿时间

        this.mover.linearRepeatDelay = keepTime;

        this.mover.onLinearStart.clear();
        // 回到起点的回调
        this.mover.linearReturnDelay = 0.1;// 不设置没回到
        this.mover.onLinearStart.add(() => {
            this.mover.enable = false;
        });

        this.mover.enable = true;

        // //fixbug:回收,需要延迟启动不然后影响上个物体
        // this.mover.enable = true;
        // setTimeout(() => {
        //     if (this.mover) {
        //         this.mover.enable = false;
        //     }
        // }, time * 1000);
    }

    /**
     * 回收
     */
    public recycle() {
        this.mover.linearSpeed = Vector.zero;
        this.mover.linearRepeat = false;
        this.mover.enable = false;
        this.mover.parent = null;
        //fix:编辑器Bug,运动器回收再使用会导致上一个物体再移动一段距离,暂时使不直接生成销毁
        //GameObjPool.despawn(this.mover); 
        this.mover.destroy();
        this.mover = null;
        this.parent.worldTransform.position = this.pos.clone();
        this.parent.worldTransform.rotation = this.rotation.clone();
        this.parent = null;
        this.pos = null;
        this.rotation = null;
        MoveLand.addIndex--;
    }



    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    public destroy(): void {

    }
}