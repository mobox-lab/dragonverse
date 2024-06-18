/*
 * @Author: shifu.huang
 * @Date: 2024-01-08 10:57:28
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-29 13:38:37
 * @FilePath: \nevergiveup\JavaScripts\Blocking.ts
 * @Description: 修改描述
 */

/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-29 15:43:49
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-12 16:25:59
 * @FilePath     : \nevergiveup\JavaScripts\Blocking.ts
 * @Description  : 修改描述
 */
import { PlayerActions } from "./Actions";
import { PlayerUtil } from "./Modules/PlayerModule/PlayerUtil";
import Utils from "./Utils";
import BlockingMaskUI_Generate from "./ui-generate/Sundry/BlockingMaskUI_generate";
import BlockingUI_Generate from "./ui-generate/Sundry/BlockingUI_generate";
import { GameConfig } from './config/GameConfig';

@Component
export default class Blocking extends Script {
    @mw.Property({ displayName: "所需等级" })
    requiredLevel: number = 0;
    @mw.Property({ displayName: "世界ui", capture: true })
    worldUIGuid: string = "";
    @mw.Property({ displayName: "禁行区", capture: true })
    blockingAreaGuid: string = "";
    @mw.Property({ displayName: "文字" })
    blockingAreaText: string = "LVL{0}+";
    @mw.Property({ displayName: "世界ui蒙版", capture: true })
    worldUIMaskGuid: string = "";
    worldUI: UIWidget;
    blockingArea: Model;
    worldUIMask: UIWidget;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected async onStart(): Promise<void> {
        if (SystemUtil.isServer()) return;
        this.blockingArea = await GameObject.asyncFindGameObjectById(this.blockingAreaGuid) as Model;
        PlayerActions.onPlayerLevelChangedClient.add(() => {
            this.checkBlocking();
        });
        GameObject.asyncFindGameObjectById(this.worldUIGuid).then((widget: UIWidget) => {
            this.worldUI = widget;
            this.worldUI.worldTransform.scale = new Vector(1);
            this.worldUI.headUIMaxVisibleDistance = 3000;
            let levelUI = UIService.create(UIBlocking);
            this.worldUI.setTargetUIWidget(levelUI.uiWidgetBase);
            let text = Utils.Format(GameConfig.Language.getElement(this.blockingAreaText).Value, this.requiredLevel);
            levelUI.mRequireLevel.text = text;
        });

        GameObject.asyncFindGameObjectById(this.worldUIMaskGuid).then((widget: UIWidget) => {
            this.worldUIMask = widget;
            this.worldUIMask.headUIMaxVisibleDistance = 3000
            let maskUI = UIService.create(UIBloickingMask);
            this.worldUIMask.setTargetUIWidget(maskUI.uiWidgetBase);
        });

        this.checkBlocking();
    }

    checkBlocking() {
        let inter = setInterval(() => {
            let script = PlayerUtil.getPlayerScript(Player.localPlayer?.playerId);
            if (!script) return;
            clearInterval(inter);
            if (this.requiredLevel < 0) return;
            if (script.level >= this.requiredLevel) {
                this.gameObject.destroy();
                // this.gameObject.destroy();
                // this.blockingArea.addPassableTarget(player.character);
                // this.updateBlockingArea();
            }
        }, 500)
    }

    updateBlockingArea() {
        this.blockingArea.destroy();
        this.worldUI.setVisibility(mw.PropertyStatus.Off);
        this.worldUIMask.setVisibility(mw.PropertyStatus.Off);
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

export class UIBlocking extends BlockingUI_Generate {

}

export class UIBloickingMask extends BlockingMaskUI_Generate {

}
