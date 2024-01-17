import { PlayerManagerExtesion, } from '../../Modified027Editor/ModifiedPlayer';
import { InteractObject, InteractLogic_C, InteractLogic_S } from "./InteractObject";

//交互物
@Component
export default class SP_Animation extends InteractObject {
    @mw.Property({ displayName: "动作ID", group: "属性" })
    public animation: string = "";
    @mw.Property({ displayName: "动作时长", group: "属性" })
    public time: number = 0;
    @mw.Property({ displayName: "循环次数", group: "属性" })
    public loopNum: number = 0;
    @mw.Property({ displayName: "面向偏移", group: "属性" })
    public lookAtOff: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "位置偏移", group: "属性" })
    public locationOff: mw.Vector = mw.Vector.zero;
    @mw.Property({ displayName: "可移动跳跃", group: "属性" })
    public moveJumpEnable: boolean = false;

    onStart() {
        this.init(Animation_S, Animation_C);
    }
}
//客户端
class Animation_C extends InteractLogic_C<SP_Animation> {
    private lookAtPos: mw.Vector;
    onStart(): void {
        this.lookAtPos = mw.Vector.add(this.gameObject.worldTransform.position, this.info.lookAtOff);
    }

    public onUpdate(dt: number): void {
        Player.localPlayer.character.lookAt(this.lookAtPos);
    }

    net_Lookat(res: boolean) {
        this.useUpdate = res;
    }
}
//服务端
class Animation_S extends InteractLogic_S<SP_Animation> {
    private playerList: Array<number> = [];
    private lookAtPos: mw.Vector;
    private moveToPos: mw.Vector;

    onStart(): void {
        this.lookAtPos = mw.Vector.add(this.gameObject.worldTransform.position, this.info.lookAtOff);
        this.moveToPos = this.gameObject.worldTransform.position.add(this.info.locationOff);
        Player.onPlayerLeave.add((player: mw.Player) => {
            this.removePlayer(player);
        });
    }
    onPlayerAction(playerId: number, active: boolean): void {
        if (mw.StringUtil.isEmpty(this.info.animation)) return;
        let player = Player.getPlayer(playerId);
        if (active) {
            //player.character.worldTransform.position = this.moveToPos;
            PlayerManagerExtesion.rpcPlayAnimation(player.character, this.info.animation, this.info.loopNum, this.info.time)
            player.character.movementEnabled = player.character.jumpEnabled = this.info.moveJumpEnable;
            this.addPlayer(player);
        } else {
            PlayerManagerExtesion.rpcStopAnimation(player.character, this.info.animation)

            player.character.movementEnabled = player.character.jumpEnabled = true;
            this.removePlayer(player);
        }
    }
    private addPlayer(player: mw.Player) {
        if (!this.playerList.includes(player.playerId)) {
            this.playerList.push(player.playerId);
            this.useUpdate = true;
        }

        this.callClientFun(player, "net_Lookat", true);
    }
    private removePlayer(player: mw.Player) {
        let index = this.playerList.indexOf(player.playerId);
        if (index != -1) {
            this.playerList.splice(index, 1);
            if (this.playerList.length == 0) {
                this.useUpdate = false;
            }
            this.callClientFun(player, "net_Lookat", false);
        }
    }
    private aaa = 0;
    private pos: mw.Vector = mw.Vector.zero;
    onUpdate(dt: number): void {
        if (++this.aaa % 10 != 0) return;
        for (let i = 0; i < this.playerList.length; i++) {
            this.pos.x = this.moveToPos.x;
            this.pos.y = this.moveToPos.y;
            this.pos.z = Player.getPlayer(this.playerList[i]).character.worldTransform.position.z;
            Player.getPlayer(this.playerList[i]).character.worldTransform.position = this.pos;
        }
    }
}
