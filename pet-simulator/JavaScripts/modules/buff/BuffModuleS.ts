import { MapEx, oTraceError } from "odin";
import { GlobalEnum } from "../../const/Enum";
import { BuffData } from "./BuffData";
import { BuffModuleC } from "./BuffModuleC";
import { GlobalData } from "../../const/GlobalData";
import { AuthModuleS } from "../auth/AuthModule";
import { GameConfig } from "../../config/GameConfig";


export class BuffModuleS extends ModuleS<BuffModuleC, BuffData> {


    onPlayerEnterGame(player: mw.Player): void {
        let playerId = player.playerId;
        this.initPlayerBuff(playerId);
    }

    onUpdate(dt: number): void {

    }

    onPlayerLeft(player: mw.Player): void {

    }

    /**
     * 根据龙力值初始玩家buff
     * @param playerId 
     * @returns 
     */
    private async initPlayerBuff(playerId: number) {
        let value = await ModuleService.getModule(AuthModuleS).getMoboxDragonAbility(playerId);

        let player = Player.getPlayer(playerId);
        if (player == null) {
            return;
        }

        if (value == null || value < 0) {
            console.error("initPlayerBuff getMoboxDragonAbility fail");
            return;
        }
        // console.log("ability: " + value);  value = 100001;

        let cfgs = GameConfig.BuffDragonAbility.getAllElement();
        for (let i = 1; i <= cfgs.length; i++) {
            let dragonAbilityRange = GameConfig.BuffDragonAbility.getElement(i).dragonAbilityRange;
            let addBuff = GameConfig.BuffDragonAbility.getElement(i).addBuff;
            if (dragonAbilityRange == null || dragonAbilityRange[0] == null || dragonAbilityRange[1] == null || addBuff == null) {
                console.error("initPlayerBuff cfg is null");
                continue;
            }
            if (value >= dragonAbilityRange[0] && value <= dragonAbilityRange[1]) {
                for (let j = 0; j < addBuff.length; j++) {
                    let cfg = GameConfig.Buff.getElement(addBuff[j]);
                    if (cfg == null) {
                        console.error("initPlayerBuff cfg is null");
                        continue;
                    }
                    this.addBuff(playerId, addBuff[j]);
                }
                break;
            }
        }
        //超出配置
        let endCfg = GameConfig.BuffDragonAbility.getElement(cfgs.length-1);
        if(value >= endCfg.dragonAbilityRange[1]){
            for (let j = 0; j < endCfg.addBuff.length; j++) {
                const element = endCfg.addBuff[j];
                let cfg = GameConfig.Buff.getElement(element);
                if (cfg == null) {
                    console.error("initPlayerBuff cfg is null");
                    continue;
                }
                this.addBuff(playerId,element);
            }
        }
    }

    public addBuff(playerId: number, buffId:number) {
        this.getClient(playerId).net_addPlayerBuff([buffId]);
    }
}