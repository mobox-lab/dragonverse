import { GeneralManager, } from '../../../../Modified027Editor/ModifiedStaticAPI';
import { BuffData, } from "module_buff";
import { oTrace, } from "odin";

import EnumAttributeType = Attribute.EnumAttributeType;
import { EMotion_Events } from "../../../../const/Enum";
import { EventManager } from "../../../../tool/EventManager";
import { Attribute } from "../../../PlayerModule/sub_attribute/AttributeValueObject";
import { BuffC_Base } from "../BuffC_Base";
import { BuffS_Base } from "../BuffS_Base";




/**
 * 闪现 BUFF   帝江之翼
 * 玩家使用道具后，先播放一个motion,同时以玩家屏幕中心发出射线，在motion播放完成后将玩家瞬移至射线碰到的第一个物体的点位，并再释放一个motion
 */
export class FlashBuffC extends BuffC_Base {

    /**是否移动成功 */
    private isMoveingSuccess: boolean = false

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("FlashBuffC constructor _id: ", _id, " configId: ", staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        // oTrace("FlashBuffC init");
        super.init();
        this.buff_Flash(true)
    }

    /**
     * 销毁，清理
     */
    public destroy() {
        //oTrace("FlashBuffC Destroy");
        super.destroy();
        this.buff_Flash(false)
    }

    /**
      * 闪现
      */
    private buff_Flash(isCreated: boolean): void {
        //oTrace("buff_Flash:  onBuffSpawn: buffName: ", this.buffEffectType, this.hostGuid);

        if (isCreated) {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    //fash 
                    let distance = this.param1 //3000
                    let hits = this.centerLine(distance, false).filter(hit => !(hit.gameObject instanceof mw.Trigger))
                    if (hits.length > 0) {
                        let pos = hits[0].position;
                        let playerpos = player.character.worldTransform.position.clone();
                        let end = new mw.Vector(pos.x, pos.y, playerpos.z);
                        let dir = mw.Vector.subtract(end, playerpos).normalize();
                        let endPos = mw.Vector.add(end, dir.multiply(player.character.collisionExtent.x * -2))
                        player.character.worldTransform.position = endPos
                        this.isMoveingSuccess = true

                        //motion
                        let motinID = this.param2 //39
                        EventManager.instance.call(EMotion_Events.MotionInvokeMotion, motinID);
                        //oTrace("MotionInvokeMotionId________________________", motinID)
                    } else {
                        this.isMoveingSuccess = false
                    }
                }
            } else {

            }
        } else {
            if (Number(this.hostId) > 0) {
                if (this.hostId == Player.localPlayer.playerId) {
                    let player = Player.getPlayer(this.hostId)
                    if (this.isMoveingSuccess) {
                        // oTrace("isMoveingSuccess == false  play Animation")
                    } else {
                        //oTrace("isMoveingSuccess == false  no Play Animation")
                    }
                }
            } else {

            }
        }
    }

    /**
     * 朝屏幕正中心发射射线,起点摄像机位置
     * @param distance 有效距离
     * @param debug 是否显示射线
     */
    public centerLine(distance: number, debug: boolean = false) {
        let character = Player.localPlayer.character;
        let loc = Camera.currentCamera.worldTransform.position;
        let dir = GeneralManager.modifyGetShootDir(character, loc, distance).multiply(distance);
        let endPos: mw.Vector = mw.Vector.add(loc, dir);
        let hits = QueryUtil.lineTrace(loc, endPos, true, debug, [], false, false, Player.localPlayer.character);
        if (hits == null || hits.length <= 0) return [];
        return hits;
    }


}

export class FlashBuffCS extends BuffS_Base {

    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("FlashBuffCS constructor ", _id, staticConfig.id, arg);
        super(_id, staticConfig, arg);
    }

    public init() {
        //oTrace("FlashBuffCS init");
        super.init();
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("FlashBuffCS Destroy");
        super.destroy();
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

}

