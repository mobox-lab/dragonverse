import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import {InteractLogic_C, InteractLogic_S, InteractObject} from "./InteractObject";

/**
 * 交互物-MW交互物对象
 * 按照设置，将玩家于MW交互物绑定
 */
@Component
export default class Interactive extends InteractObject {
    @mw.Property({ displayName: "退出是否回到交互前位置" })//可以多个
    public isBeforPos: boolean = true;
    onStart() {
        this.init(Interactive_S, Interactive_C);
    }
}
//客户端
class Interactive_C extends InteractLogic_C<Interactive> {
    onStart(): void {
        Player.asyncGetLocalPlayer().then((player: mw.Player) => {
            //this.callServerFun("Net_Login");
        });
    }
}
//服务端
class Interactive_S extends InteractLogic_S<Interactive> {
    private interactiver: mw.Interactor;
    private handlePlayerId: number = 0;
    private doing: boolean = false;
    private isDown: boolean = false;
    private beforPos: mw.Vector;//交互之前的坐标
    onStart(): void {
        if (this.gameObject instanceof mw.Interactor) {
            this.interactiver = this.gameObject as mw.Interactor;
        } else {
            console.error("SP_Trigger_Server->OnStart: GameObject is not InteractiveObj!");
        }
    }
    protected onPlayerAction(playerId: number, active: boolean): void {
        if (active) {
            this.sitDown(playerId);
        } else {
            this.standUp(playerId);
        }
    }
    //坐下
    private sitDown(playerId: number) {
        if (this.handlePlayerId != 0 && this.handlePlayerId != playerId) return;
        this.handlePlayerId = playerId;
        this.isDown = true;
        if (this.doing) return;

        this.doing = true;
        //InteractPlayerMsg.addPlayer(playerId);
        this.beforPos = Player.getPlayer(playerId).character.worldTransform.position.clone();
        //oTrace("sssssssssssssssssssssssss     " + this.beforPos);
        GeneralManager.modiftEnterInteractiveState(this.interactiver, Player.getPlayer(playerId).character).then((value: boolean) => {
            this.doing = false;
            if (!this.isDown) {
                this.standUp(playerId);
            }
        });
    }
    //站起
    private standUp(playerId: number) {
        if (this.handlePlayerId != playerId) return;
        this.isDown = false;
        if (this.doing) return;
        this.doing = true;
        this.exitOwnObject(playerId, (res: boolean) => {
            //InteractPlayerMsg.removePlayer(playerId);
            this.doing = false;
            if (this.isDown) {
                this.sitDown(playerId);
            } else {
                this.handlePlayerId = 0;
            }
        });
    }
    //退出独享交互物的方法
    private exitOwnObject(playerId: number, resCallback: (res: boolean) => void) {
        if (this.interactiver.getCurrentCharacter() != null) {
            //oTrace("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx     " + this.beforPos);
            GeneralManager.modifyExitInteractiveState(this.interactiver, this.info.isBeforPos ? this.beforPos : this.gameObject.worldTransform.position).then((res: boolean) => {//20309是站立(还没有默认姿态)
                let player = Player.getPlayer(playerId);
                player.character.lookAt(this.gameObject.worldTransform.position);
                PlayerManagerExtesion.changeStanceExtesion(player.character,"")
                if (resCallback != null) resCallback(true);
            });
        } else {
            if (resCallback != null) resCallback(false);
        }
    }
}