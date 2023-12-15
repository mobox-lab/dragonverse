import { RoleModuleC } from "../../module/role/RoleModule";

/**
 * 弹跳蘑菇
 */
@mw.Component
export default class MushRoom extends mw.Script {

    private _mushRoom: mw.GameObject;

    private _trigger: mw.Trigger;

    private _isMushRoomJumping: boolean = false;

    @mw.Property({ group: "蘑菇属性", displayName: "弹跳蘑菇Z轴冲量大小" })
    private _impulse: number = 1000;

    @mw.Property({ group: "蘑菇属性", displayName: "第一阶段变大属性" })
    private _firstScale: mw.Vector = new mw.Vector(0.1, 0.1, 0.12);

    @mw.Property({ group: "蘑菇属性", displayName: "第一阶段变大时间" })
    private _firstTime: number = 100;

    @mw.Property({ group: "蘑菇属性", displayName: "第二阶段变大属性" })
    private _secondScale: mw.Vector = new mw.Vector(0.11, 0.11, 0.13);

    @mw.Property({ group: "蘑菇属性", displayName: "第二阶段变大时间" })
    private _secondTime: number = 200;

    @mw.Property({ group: "蘑菇属性", displayName: "二、三阶段延迟时间" })
    private _delayTime: number = 400;

    @mw.Property({ group: "蘑菇属性", displayName: "第三阶段变大属性" })
    private _thirdScale: mw.Vector = new mw.Vector(0.06, 0.06, 0.06);


    @mw.Property({ group: "蘑菇属性", displayName: "第三阶段变大时间" })
    private _thirdTime: number = 100;

    @mw.Property({ group: "蘑菇属性", displayName: "第四阶段变大属性" })
    private _fourthScale: mw.Vector = new mw.Vector(0.05, 0.05, 0.05);

    @mw.Property({ group: "蘑菇属性", displayName: "第四阶段变大时间" })
    private _fourthTime: number = 200;

    protected onStart(): void {

        this.initMushRoom();
    }


    private initMushRoom() {

        this._mushRoom = this.gameObject.getChildByName("mush");

        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;

        this._trigger.onEnter.add(this.onEnter);
    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                ModuleService
                    .getModule(RoleModuleC)
                    .controller
                    .addImpulse(obj, new mw.Vector(0, 0, this._impulse));
                this.mushRoomJump();
            }
        }
    };

    private mushRoomJump() {
        if (this._isMushRoomJumping) return;
        let changeVec = new mw.Vector(0);

        // actions.tween(this._mushRoom.localTransform.scale)
        //     .to(300, { x: 0.1, y: 0.1, z: 0.12 })
        //     .to(700, { x: 0.11, y: 0.11, z: 0.13 })
        //     .start()

        // actions.tween(this._mushRoom.localTransform.scale)
        //     .delay(2000)
        //     .to(300, { x: 0.06, y: 0.06, z: 0.06 })
        //     .to(700, { x: 0.05, y: 0.05, z: 0.05 })
        //     .call(() => {
        //         this._isMushRoomJumping = false;
        //     })
        //     .start()

        //蘑菇一阶段变大
        new Tween({ x: this._fourthScale.x, y: this._fourthScale.y, z: this._fourthScale.z })
            .to({ x: this._firstScale.x, y: this._firstScale.y, z: this._firstScale.z })
            .duration(this._firstTime)
            .onUpdate(val => {
                changeVec.set(val.x, val.y, val.z);
                this._mushRoom.localTransform.scale = changeVec;
            })
            .start()
            .onComplete(() => {
                //蘑菇二阶段Q弹
                new Tween({ x: this._firstScale.x, y: this._firstScale.y, z: this._firstScale.z })
                    .to({ x: this._secondScale.x, y: this._secondScale.y, z: this._secondScale.z })
                    .duration(this._secondTime)
                    .onUpdate(val => {
                        changeVec.set(val.x, val.y, val.z);
                        this._mushRoom.localTransform.scale = changeVec;
                    })
                    .start()
                    .onComplete(() => {
                        //蘑菇三阶段变小
                        new Tween({ x: this._secondScale.x, y: this._secondScale.y, z: this._secondScale.z })
                            .to({ x: this._thirdScale.x, y: this._thirdScale.y, z: this._thirdScale.z })
                            .delay(this._delayTime)
                            .duration(this._thirdTime)
                            .onUpdate(val => {
                                changeVec.set(val.x, val.y, val.z);
                                this._mushRoom.localTransform.scale = changeVec;
                            })
                            .start()
                            .onComplete(() => {
                                //蘑菇四阶段恢复
                                new Tween({ x: this._thirdScale.x, y: this._thirdScale.y, z: this._thirdScale.z })
                                    .to({ x: this._fourthScale.x, y: this._fourthScale.y, z: this._fourthScale.z })
                                    .duration(this._fourthTime)
                                    .onUpdate(val => {
                                        changeVec.set(val.x, val.y, val.z);
                                        this._mushRoom.localTransform.scale = changeVec;
                                    })
                                    .start()
                                    .onComplete(() => {
                                        this._isMushRoomJumping = false;
                                    });
                            });
                    });

            });


    }


}