/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-04-24 16:14:39
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-25 15:18:54
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\PortalTrigger.ts
 * @Description  : 传送门交互物
 */

import Log4Ts from "../../depend/log4ts/Log4Ts";
import Nolan from "../../depend/nolan/Nolan";
import Gtk from "../../util/GToolkit";
import { ActivateByTrigger, ActivateMode, TriggerType } from "./ActiveMode";
import { SharedInteractiveObj } from "./BaseInteractiveScript";

export default class PortalTrigger extends SharedInteractiveObj {

    @Property({ displayName: "传送目的地", group: "Config-location" })
    public destination: Vector = Vector.zero;

    @Property({ displayName: "传送目标", group: "Config-location", tooltip: "传送目标的 guid. 优先生效." })
    public destinationTargetGuid: string = "";

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

    @Property({
        displayName: "是否保持原有速度",
        tooltip: "若目的地过于贴近地面 原有速度将受摩擦力影响\n旋转将跟随 isRefreshObjectRotation",
        group: "Config-speed",
    })
    public isHoldVelocity: boolean = false;

    private _nolan: Nolan;


    activeMode: ActivateMode;

    maxPlayerCount: number = Infinity;



    protected onStart(): void {
        super.onStart();
        this.activeMode = new ActivateByTrigger(this.gameObject, TriggerType.TriggerInServer);
    }

    allPlayerEndInteractionInClient(): void {
        Log4Ts.log(PortalTrigger, `allPlayerEndInteractionInClient`);
    }
    firstStartInteractionInClient(): void {
        Log4Ts.log(PortalTrigger, `firstStartInteractionInClient`);
    }
    protected startInteractionInServer(playerId: number): void {
        Log4Ts.log(PortalTrigger, `startInteractionInServer:${playerId}}`);
    }

    protected startInteractionInClient(playerId: number): void {
        Log4Ts.log(PortalTrigger, `startInteractionInClient:${playerId}}`);
        this.transferPlayer(Player.getPlayer(playerId).character);
    }
    protected stopInteractionInServer(playerId: number, finishCallBack: () => void): void {
        Log4Ts.log(PortalTrigger, `stopInteractionInServer:${playerId}}`);
    }
    protected stopInteractionInClient(playerId: number, finishCallBack: () => void): void {
        Log4Ts.log(PortalTrigger, `stopInteractionInClient:${playerId}}`);
    }

    protected transferPlayer(character: Character) {
        Log4Ts.log(PortalTrigger, `player enter. playerId: ${character?.player?.playerId ?? "null"}`);

        if (character) {
            const player = character.player;
            if (player) {
                const velocity = character.velocity;

                character.addImpulse(velocity.clone().multiply(Vector.negOne), true);
                character.worldTransform = new Transform(
                    Gtk.isNullOrEmpty(this.destinationTargetGuid) ?
                        this.destination :
                        GameObject.findGameObjectById(this.destinationTargetGuid)?.worldTransform.position ?? this.destination,
                    this.isRefreshObjectRotation ? this.endRotation : character.worldTransform.rotation,
                    character.worldTransform.scale,
                );

                if (this.isRefreshCameraRotation) this._nolan.lookToward(this.endRotation.rotateVector(Vector.forward));

                if (this.isHoldVelocity) {
                    let v = this.isRefreshObjectRotation ?
                        this.endRotation.rotateVector(Vector.forward).multiply(velocity.length) :
                        velocity;

                    character.addImpulse(v, true);
                }
            }
        }
    }
}
