import { IEvtCom, RegisterEvt } from "./IEvtCom";
import { PlayerModuleC } from "../../player/PlayerModuleC";
import GhostInst from "../../ghost/GhostInst";
import { MainUI } from "../../../ui/MainUI";
import { NotebookPanel } from "../../procedure/ui/NotebookPanel";

@RegisterEvt
export class DeathEvt implements IEvtCom {
    evtName: string = "evt_playerDeath";

    onGetCall(goid: string, aniGuid: string, dealyStr: string) {
        if (GhostInst.isInvincible) {
            return;
        }
        if (ModuleService.getModule(PlayerModuleC).isKilling) {
            return;
        }
        let delay = Number(dealyStr);
        //Player.localPlayer.character.loadAnimation(aniGuid).play();
        UIService.hide(MainUI);
        UIService.hide(NotebookPanel);
        Player.localPlayer.character.ragdollEnabled = true;
        ModuleService.getModule(PlayerModuleC).killPlayer(delay, () => {
            setTimeout(() => {
                Player.localPlayer.character.ragdollEnabled = false;
                ModuleService.getModule(PlayerModuleC).clearCrouch();
            }, 300);
        });;
    }
}

@RegisterEvt
export class DeathEvt2 implements IEvtCom {
    evtName: string = "evt_setPlayerDie";

    onGetCall(goid: string, dealyStr: string) {
        if (GhostInst.isInvincible) {
            return;
        }
        if (ModuleService.getModule(PlayerModuleC).isKilling) {
            return;
        }
        UIService.hide(MainUI);
        UIService.hide(NotebookPanel);
        let delay = Number(dealyStr);
        //Player.localPlayer.character.loadAnimation(aniGuid).play();
        Player.localPlayer.character.ragdollEnabled = true;
        ModuleService.getModule(PlayerModuleC).killPlayer(delay, () => {
            setTimeout(() => {
                Player.localPlayer.character.ragdollEnabled = false;
                ModuleService.getModule(PlayerModuleC).clearCrouch();
            }, 300);
        });;
    }
}
