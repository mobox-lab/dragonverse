
/**
 * 公共载具预制体
 * 需要使用工程中的DefaultUI来控制载具
 * 适用于0.27.0及以上版本
 */

@Component
export default class VehicleSkate extends Script {

    VehicleMain: AdvancedVehicle;
    TriggerObj: Trigger;
    InteractorObj: Interactor;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {

        //通过父子级关系获取载具的交互物和触发器
        this.VehicleMain = this.gameObject as AdvancedVehicle;
        const get_VehicleChildren = this.VehicleMain.getChildren();

        if (SystemUtil.isServer()) {
            for (let index = 0; index < get_VehicleChildren.length; index++) {
                if (get_VehicleChildren[index] instanceof Interactor) {
                    this.InteractorObj = get_VehicleChildren[index] as Interactor;
                } else if (get_VehicleChildren[index] instanceof Trigger) {
                    this.TriggerObj = get_VehicleChildren[index] as Trigger;
                }
            }

            this.TriggerObj.onEnter.add((chara) => {
                //判断进入触发器的对象类型是否为角色
                if (chara instanceof Character) {
                    this.TriggerObj.enabled = false; //上车后关闭触发器
                    chara.setCollision(CollisionStatus.Off);  //关闭角色碰撞，防止也载具自身碰撞产生冲突
                    Event.dispatchToClient(chara.player, "enterSkate", [chara.player.playerId, this.VehicleMain.gameObjectId, this.InteractorObj.gameObjectId]);
                }
            });

            Event.addClientListener("LeaveSkate", (player: Player) => {
                player.character.setCollision(CollisionStatus.On);  //打开角色碰撞
                setTimeout(() => {
                    this.TriggerObj.enabled = true; //下车后延迟打开触发器，避免和角色位置重叠再次进入上车逻辑
                }, 2000);
            })
        }

        if (SystemUtil.isClient()) {
            let vehicleClient: AdvancedVehicle = null;
            let InteractorClient: Interactor = null;

            //角色进入触发器，触发上车逻辑
            Event.addServerListener("enterSkate", (value: Array<any>) => {
                const player = Player.localPlayer
                if (value[0] == player.playerId) {
                    vehicleClient = GameObject.findGameObjectById(value[1]) as AdvancedVehicle;
                    InteractorClient = GameObject.findGameObjectById(value[2]) as Interactor;
                    InteractorClient.enter(player.character); //将角色与交互物绑定，并设置动画姿态
                    vehicleClient.owner = player.character.player; //获取载具控制权                                        
                    this.VehicleControl(vehicleClient, player.playerId);  //调用载具控制函数
                }
            });

            //接收UI按钮指令，触发下车逻辑
            Event.addLocalListener("LeaveSkate", () => {
                vehicleClient.owner = null; //交还载具控制权
                let leavePosition = vehicleClient.worldTransform.position;
                InteractorClient.leave(new Vector(leavePosition.x, leavePosition.y, leavePosition.z + 150).add(vehicleClient.worldTransform.getRightVector().multiply(-100))); //解除角色与交互物绑定
                InteractorClient.onLeave.add(()=>{
                    Event.dispatchToServer("LeaveSkate");
                })
            });
        }
    }


    /**
     * 载具控制
     */
    protected VehicleControl(vehicle: AdvancedVehicle, playerid: number) {

        const LocalplayerId = Player.localPlayer.playerId

        //键盘指令：载具前进
        InputUtil.onKeyDown(Keys.W, () => { vehicle.throttleInput = 1 });
        InputUtil.onKeyUp(Keys.W, () => { vehicle.throttleInput = 0 });
        //键盘指令：载具后退
        InputUtil.onKeyDown(Keys.S, () => { vehicle.throttleInput = -1 });
        InputUtil.onKeyUp(Keys.S, () => { vehicle.throttleInput = 0 });
        //键盘指令：载具左转
        InputUtil.onKeyDown(Keys.A, () => { vehicle.steeringInput = -1 });
        InputUtil.onKeyUp(Keys.A, () => { vehicle.steeringInput = 0 });
        //键盘指令：载具右转
        InputUtil.onKeyDown(Keys.D, () => { vehicle.steeringInput = 1 });
        InputUtil.onKeyUp(Keys.D, () => { vehicle.steeringInput = 0 });

        // UI处理，通过工程中的默认UI来控制载具
        const DefaultUI = GameObject.findGameObjectsByTag("DefaultUI") as UIObject[]; //找到工程默认UI对象
        const JoystickPanel = DefaultUI[0].uiWidgetBase.findChildByPath("RootCanvas/VirtualJoystickPanel") as VirtualJoystickPanel; //找到工程默认UI下的摇杆控件
        const JumpBtn = DefaultUI[0].uiWidgetBase.findChildByPath('RootCanvas/Button_Jump') as Button; //找到工程默认UI下的按钮控件

        //通过摇杆组件控制载具移动
        JoystickPanel.onInputDir.add((vec2) => {
            if (playerid == LocalplayerId && vehicle.gameObjectId == this.VehicleMain.gameObjectId) {
                //通过对摇杆轴参数的限制，防止摇杆因轻微变化产生的载具转向，降底载具控制难度.
                if (vec2.x > 0.4 || vec2.x < -0.4) {
                    vehicle.steeringInput = vec2.x;
                } else {
                    vehicle.steeringInput = 0;
                }
                vehicle.throttleInput = vec2.y;
            }
        });

        //通过跳跃按钮下车
        JumpBtn.onClicked.add(() => {
            if (playerid == LocalplayerId && vehicle.gameObjectId == this.VehicleMain.gameObjectId) {
                console.log(`下车`);
                Event.dispatchToLocal("LeaveSkate");
                //注意：在触发器事件中调用VehicleControl()函数，JoystickPanel与JumpBtn进行过一次绑定，所以在下车时需要对其进行解除，否则再次进入触发器时会重新调用.add，对UI事件进行重复绑定；
                JoystickPanel.onInputDir.clear();
                JumpBtn.onClicked.clear();
            }
        });
    }
}