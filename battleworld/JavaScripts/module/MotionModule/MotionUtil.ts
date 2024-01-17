import { GameConfig } from "../../config/GameConfig";





import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

export class MotionUtil {

    public static filterPlayers: mw.Player[] = [];

    /**根据motiongid获取motionskill */
    public static getMotionSkillCfg(motionId: number) {
        return GameConfig.MotionSkill.findElement("motionId", motionId);
    }

    /***获取玩家所在区域的其它玩家对象数组 */
    public static getCurAreaPlayers() {

        let mAttr = ModuleService.getModule(AttributeModuleC);


        this.filterPlayers.length = 0;

        let curPlayer = Player.localPlayer;

        this.filterPlayers.push(curPlayer);

        let selfId = curPlayer.playerId;
        let selfAreaId = mAttr.getAttributeValue(Attribute.EnumAttributeType.areaId, selfId);

        let players = Player.getAllPlayers();
        for (let index = 0; index < players.length; index++) {
            const player = players[index];

            if (player == curPlayer) {
                continue;
            }
            let areaId = mAttr.getAttributeValue(Attribute.EnumAttributeType.areaId, player.playerId);
            if (areaId != selfAreaId) {
                continue;
            }
            this.filterPlayers.push(player);
        }

        return this.filterPlayers;
    }



}