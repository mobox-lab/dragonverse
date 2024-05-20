import { GameConfig } from "../../config/GameConfig";
import { Globaldata } from "../../const/Globaldata";
import { EnergyModuleC } from "../../module/Energy/EnergyModule";
import { PlayerModuleC } from "../../module/PlayerModule/PlayerModuleC";
import { MessageBox } from "../../tool/MessageBox";
import { Notice } from "../../tool/Notice";
import { ClickUIPools } from "./ClickUIs";
import { InteractLogic_C, InteractLogic_S, InteractObject } from "./InteractObject";
import { EModule_Events_S } from "../../const/Enum";
import GameServiceConfig from "../../const/GameServiceConfig";

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

        Event.addServerListener(EModule_Events_S.payTicketSuccessful, this.payTicketCallback.bind(this));
        Event.addServerListener(EModule_Events_S.reduceEnergySuccessful, this.enterGame.bind(this));
    }

    private onEnter(go: mw.GameObject) {

        if (!(go instanceof mw.Character)) return;
        let chara = go as mw.Character;

        if (chara.player.playerId != Player.localPlayer.playerId) return;
        if (ModuleService.getModule(EnergyModuleC).currEnergy() < GameServiceConfig.STAMINA_COST_ENTER_FIGHTING) {
            Notice.showDownNotice(GameConfig.Language.StaminaNotEnough.Value);
            return;
        }


        ClickUIPools.instance.show(Globaldata.fireWeaponUIGuid, GameConfig.Language.Scene_name_1.Value, go, Vector.zero, async () => {

            ClickUIPools.instance.hide(go);
            chara.movementEnabled = false;
            const playerC = ModuleService.getModule(PlayerModuleC);
            const rankTicket = await playerC.getRankTicket();
            let [rank] = playerC.getRank();
            let rankCfg = GameConfig.Rank.getElement(rank);
            if (!rankCfg) return;
            let rankCost = rankCfg.rankTicket;
            if (rankCost && rankTicket) {
                let content = StringUtil.format(GameConfig.Language.Tips_rank_3.Value, rankCost);
                MessageBox.showTwoBtnMessage("", content, (res) => {
                    if (res) {
                        playerC.payRankTicket();
                    } else {
                        chara.movementEnabled = true;
                    }
                });
                return;
            }
            ModuleService.getModule(PlayerModuleC).playerJoinFighting();
            // this.interactNext(chara.player.playerId, true);
        });
    }

    private enterGame() {
        this.interactNext(Player.localPlayer.playerId, true);
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
        ClickUIPools.instance.hide(go);
    }

    /**
     * 门票支付成功通知
     * @param {number} playerId
     * @private
     */
    private payTicketCallback(playerId: number) {
        this.interactNext(playerId, true);
    }

}
//服务端
class Trigger_S extends InteractLogic_S<SP_Trigger> {
    protected onPlayerAction(playerId: number, active: boolean, param: any): void {

    }
    protected onStart(): void {

    }

}

