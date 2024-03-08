import { GameConfig } from "../../../../config/GameConfig";
import { ModifiedCameraSystem } from "../../../Modified027Editor/ModifiedCamera";
import { UtilEx } from "../../../utils/UtilEx"
import ProcedureScript from "../component/ProcedureScript"

export class ProcedureStateBase extends UtilEx.StateFunc {

    public constructor(protected owner: ProcedureScript) {
        super();
    }

    /** 客户端初始化玩家状态 */
    public client_initPlayerState() {
        if (SystemUtil.isServer()) { return; }
        const char = Player.localPlayer.character
        char.jumpEnabled = false;
        char.movementEnabled = false;
        char.worldTransform.position = GameConfig.Global.StartPos.vector;
        const rot = new Rotation(GameConfig.Global.StartRot.vector)
        char.worldTransform.rotation = rot;
        ModifiedCameraSystem.setOverrideCameraRotation(rot);
        ModifiedCameraSystem.resetOverrideCameraRotation();
    }
}