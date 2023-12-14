import { GameConfig } from "../../../config/GameConfig";
import { EventDefine } from "../../../const/EventDefine";
import Log4Ts from "../../../depend/log4ts/Log4Ts";

export class RunningGameController {

    /**普通情况下最大速度 */
    private _defaultMaxSpeed: number

    /**加速情况下最大速度 */
    private _speedUpMaxSpeed: number;

    /**初始最大速度 */
    private _oriMaxSpeed: number;

    /**设置当前最大速度 */
    private set maxSpeed(value: number) {
        this._character.maxFlySpeed = value;
    }

    private get maxSpeed(): number {
        return this._character.maxFlySpeed;
    }

    /**获取当前速度 */
    public get speed(): number {
        return this._character.velocity.length
    }

    /**当前速度大于普通最大速度后，默认减速速度 */
    private _deceleration: number;

    /**初始加速度 */
    private _oriAcceleration: number;

    /**默认加速速度  */
    private _defaultAcceleration: number;

    /**通过加速圈加速速度 */
    private _speedUpAcceleration: number;

    /**设置当前加速度 */
    private set acceleration(value: number) {
        this._character.maxAcceleration = value;
    }

    private get acceleration(): number {
        return this._character.maxAcceleration;
    }

    /**加速标志位时间，代表刚通过加速圈正处于加速过程中 */
    private _addFlagTime: number;

    /**加速后持续时间 */
    private _addSpeedDurTime: number

    /**通过减速圈减速差值 */
    private _speedDownValue: number;

    /**玩家默认fov */
    private _defaultFov: number;

    /**玩家当前fov */
    private _curFov: number;

    private _fovValue: number;


    /**设置玩家当前fov */
    public set curFov(value: number) {
        if (this._curFov === value) {
            return;
        }
        this._curFov = value;
        Camera.currentCamera.fov = value;
    }

    public get curFov(): number {
        return this._curFov;
    }

    private _character: mw.Character;

    private _intervalHander: number;

    constructor(character: mw.Character) {
        this._character = character;
        this.init();
    }



    private init() {
        //初始化跑酷规则参数
        this._defaultMaxSpeed = GameConfig.Global.RG_MaxSpeed.value;
        this._speedUpMaxSpeed = this._defaultMaxSpeed * 3;
        this._deceleration = GameConfig.Global.RG_DEFAULT_Deceleration.value;
        this._defaultAcceleration = GameConfig.Global.RG_DEFAULT_Acceleration.value;
        this._speedUpAcceleration = GameConfig.Global.RG_UP_Acceleration.value;
        this._addSpeedDurTime = GameConfig.Global.RG_SPEEDUP_TIME.value;;
        this._speedDownValue = GameConfig.Global.RG_SpeedDown_Value.value;
        this._defaultFov = Camera.currentCamera.fov;
        this._curFov = this._defaultFov;
        this._fovValue = GameConfig.Global.RG_FOV_VALUE.value;
        //初始化玩家加速度和最大速度
        this._oriAcceleration = this._character.maxAcceleration;
        this._oriMaxSpeed = this._character.maxFlySpeed;
        this.acceleration = this._defaultAcceleration;
        this.maxSpeed = this._defaultMaxSpeed;
        //初始化定时器
        this._intervalHander = TimeUtil.setInterval(this.onUpdateInterval, 0.01);
    }

    private onUpdateInterval = () => {
        this.onSpeedUpdate();
        this.setCurFov();
    }

    /**
     * 根据当前速度设置fov
     */
    private setCurFov() {
        //根据当前速度来设置fov
        const speed = this.speed;
        let fov: number;
        if (speed <= this._defaultMaxSpeed) {
            fov = this._defaultFov;
        } else {
            let fovValue = Math.floor((speed - this._defaultMaxSpeed) / 100 * this._fovValue);
            fov = this._defaultFov + fovValue;
        }
        this.curFov = fov;
    }

    /**
     * 速度更新，每0.01更新一次，切换加速、减速过程
     */
    private onSpeedUpdate() {
        if (this._addFlagTime) {
            //代表当前处于加速圈加速中

            this.checkAccelerationTime();
        } else {
            //当前不处于加速圈加速中，可能处于低速匀加速过程，也可能处于高速减速过程
            //处于低速匀加速过程不用管，因为有加速度存在，让他自己加速就行
            //处于高速减速过程，需要让速度逐渐减小
            this.onSpeedDown();
        }
        //Log4Ts.log({ name: this.constructor.name }, `--------->cur speed:${this.speed} ---------> fov value:${this.curFov}------>cur add:${this.acceleration}`);

    }

    /**
     * 检查加速时间是否到期
     */
    private checkAccelerationTime() {
        const curTime = Date.now();
        if ((curTime - this._addFlagTime) > this._addSpeedDurTime * 1000) {
            //加速时间到期

            Event.dispatchToLocal(EventDefine.OnRunningGameInfoChange, "加速时间到期");
            this._addFlagTime = null;
            this.acceleration = this._defaultAcceleration;
        }
    }

    private onSpeedDown() {
        //当前速度大于默认最大速度，需要减速
        let speed = this.speed;
        if (speed > (this._defaultMaxSpeed + 1)) {
            //Event.dispatchToLocal(EventDefine.OnRunningGameInfoChange, "需要减速:" + Math.floor(speed));
            speed -= this._deceleration;
            this.maxSpeed = speed > this._defaultMaxSpeed ? speed : this._defaultMaxSpeed;
        }
    }


    /**
     * 通过加速圈
     */
    public enterSpeedUp() {
        //刷新加速标志位时间,重设置加速度

        Event.dispatchToLocal(EventDefine.OnRunningGameInfoChange, "通过加速圈:" + Math.floor(this.speed));

        this._addFlagTime = Date.now();
        this.acceleration = this._speedUpAcceleration;
        //计算最大速度
        const speed = this.speed;
        let maxSpeed: number = speed + this._defaultMaxSpeed / 2;
        if (maxSpeed < this._defaultMaxSpeed) {
            maxSpeed = this._defaultMaxSpeed;
        } else if (maxSpeed > this._speedUpMaxSpeed) {
            maxSpeed = this._speedUpMaxSpeed;
        }
        this.maxSpeed = maxSpeed;
    }

    /**
     * 通过减速圈
     */
    public enterSpeedDown() {


        let speed = this.speed;
        let maxSpeed = this.maxSpeed;

        let changeMaxSpeed = speed - this._speedDownValue;
        if (changeMaxSpeed <= 200) {
            changeMaxSpeed = 200;
        }
        this.maxSpeed = changeMaxSpeed;
        Event.dispatchToLocal(EventDefine.OnRunningGameInfoChange, "通过减速圈前：" + Math.floor(this.speed) + "-" + Math.floor(this.maxSpeed));
        mw.TimeUtil.delayExecute(() => {
            this.maxSpeed = maxSpeed
            Event.dispatchToLocal(EventDefine.OnRunningGameInfoChange, "通过减速圈后：" + Math.floor(this.speed) + "-" + Math.floor(this.maxSpeed));
        }, 10)
    }


    public onEnd() {
        this.curFov = this._defaultFov;
        this.acceleration = this._oriAcceleration;
        this.maxSpeed = this._oriMaxSpeed;
        TimeUtil.clearInterval(this._intervalHander);
        this._intervalHander = null;
        this._character = null;
    }


}