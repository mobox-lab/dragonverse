import { GameConfig } from "../config/GameConfig";
import GameServiceConfig from "../const/GameServiceConfig";
import { GlobalData } from "../const/GlobalData";
import Nolan from "../depend/nolan/Nolan";
import EnvironmentManager from "../gameplay/interactiveObj/EnvironmentManager";
import JumpGameTransition_Generate from "../ui-generate/jumpGame/JumpGameTransition_generate";
import CutsceneUI from "../UI/CutsceneUI";
import Utils from "../Utils";

@Component
export default class StageTransmitTrigger extends Script {
    
    @Property({ displayName: "sceneID", group: "属性"})
    public sceneID: number = 2;
    @Property({ displayName: "传送坐标", group: "属性" })
    public location: mw.Vector = new mw.Vector(1125, 697, 30);

    @Property({
        displayName: "是否刷新玩家物体旋转",
        tooltip: "true 时 将玩家物体旋转调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshObjectRotation: boolean = true;

    @Property({
        displayName: "是否刷新相机旋转",
        tooltip: "true 时 将玩家相机调整为 endRotation.",
        group: "Config-rotation",
    })
    public isRefreshCameraRotation: boolean = true;


    @Property({ displayName: "角色目标旋转", group: "Config-rotation" })
    public endRotation: Rotation = Rotation.zero;

    private _nolan: Nolan;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        super.onStart();
        if (SystemUtil.isClient()) {
            this._nolan = Nolan.getInstance();
            let trigger = this.gameObject as Trigger;
            trigger.onEnter.add((gameObject: GameObject) => {
                if (gameObject instanceof mw.Character) {
                    if (Utils.isLocalPlayer(gameObject?.player?.playerId)) {
                        this.transmitPlayerClient(gameObject.player);
                    }
                }
            });
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {

    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {

    }

    public transmitPlayerClient(player: mw.Player) {
        UIService.show(CutsceneUI, () => {
            const character = player.character;
            character.worldTransform = new Transform(
                this.location,
                this.isRefreshObjectRotation ? this.endRotation : character.worldTransform.rotation,
                character.worldTransform.scale
            );
            if (this.isRefreshCameraRotation) this._nolan.lookToward(this.endRotation.rotateVector(Vector.forward));
            EnvironmentManager.getInstance().setEnvironment(this.sceneID);
        });
        TimeUtil.delaySecond(GlobalData.Anim.stageCrossAnimSeconds).then(() => {
            UIService.getUI(CutsceneUI).hideCanvas();
        });
    }
}