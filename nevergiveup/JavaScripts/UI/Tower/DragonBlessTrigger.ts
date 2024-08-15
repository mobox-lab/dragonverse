import BlessUI from "../Dragon/BlessUI";

@Component
export default class DragonBlessTrigger extends Script {
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        const trigger = this.gameObject as Trigger;
        trigger.onEnter.add(go => this.onPlayerEnter(go));
        trigger.onLeave.add(go => this.onPlayerLeave(go));
    }

    onPlayerEnter(other: GameObject) {
        if (other instanceof Character) {
            if (other === Player.localPlayer.character) {
                UIService.show(BlessUI);
            }
        }
    }

    onPlayerLeave(other: GameObject) {
        if (other instanceof Character) {
            if (other === Player.localPlayer.character) {
                UIService.getUI(BlessUI).hide();
            }
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
}