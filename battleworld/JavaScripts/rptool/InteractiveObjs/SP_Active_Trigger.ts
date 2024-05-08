import { GameConfig } from "../../config/GameConfig";
import { EnergyModuleC } from "../../module/Energy/EnergyModule";
import { PlayerModuleC } from "../../module/PlayerModule/PlayerModuleC";
import { MessageBox } from "../../tool/MessageBox";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";
import Log4Ts from "../../depend/log4ts/Log4Ts";

/**触发模式 */
enum TriggerMode {
    /**共有模式*/
    Public = "public",//共有模式，第一个人进入触发器激活，最后一个人离开触发器关闭
    /**独立模式*/
    Private = "private"//独立模式：每个人进出触发器，单独计算激活和关闭
}
//交互物触发器-碰触交互
@Component
export default class SP_Trigger extends InteractObject {
    @mw.Property({ displayName: "工作模式", selectOptions: { "公共": TriggerMode.Public, "独立": TriggerMode.Private }, group: "属性" })
    public mode: TriggerMode = TriggerMode.Private;
    @mw.Property({ displayName: "退出按钮", group: "属性" })
    public needExitBtn: boolean = false;
    @mw.Property({ displayName: "外部条件", group: "属性" })
    public activeCondition: string = "";
    onStart() {
        this.init(Trigger_S, Trigger_C);
    }
}
//客户端
class Trigger_C extends InteractLogic_C<SP_Trigger> {
    onStart(): void {
        if (this.gameObject instanceof mw.Trigger) {
            this.gameObject.onEnter.add(this.onEnter.bind(this));
            this.gameObject.onLeave.add(this.onLeave.bind(this));
        }
    }

    private onEnter(go: mw.GameObject) {

        if ((go instanceof mw.Character) == false) {
            return;
        }
        let chara = go as mw.Character;
        if (chara.player.playerId != Player.localPlayer.playerId) {
            return;
        }
        if (ModuleService.getModule(EnergyModuleC).currEnergy() <= 0) return;
        chara.movementEnabled = false;
        const playerC = ModuleService.getModule(PlayerModuleC);
        let [rank] = playerC.getRank();
        let rankCfg = GameConfig.Rank.getElement(rank);
        if (!rankCfg) return;
        let rankCost = rankCfg.rankTicket;
        Log4Ts.log(Trigger_C, `rankCost: ${rankCost}`);
        if (rankCost && playerC.rankTicket) {
            let content = StringUtil.format(GameConfig.Language.Tips_rank_3.Value, rankCost);
            MessageBox.showTwoBtnMessage("", content, (res) => {
                if (res) {
                    playerC.newPayRankTicket();
                    this.interactNext(chara.player.playerId, true);
                }
                else {
                    chara.movementEnabled = true;
                }
            });
            return;
        }
        this.interactNext(chara.player.playerId, true);
    }

    private onLeave(go: mw.GameObject) {
        if ((go instanceof mw.Character) == false) {
            return;
        }
        let chara = go as mw.Character;
        if (chara.player.playerId != Player.localPlayer.playerId) {
            return;
        }
        chara.movementEnabled = true;
    }


}
//服务端
class Trigger_S extends InteractLogic_S<SP_Trigger> {
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }

}

