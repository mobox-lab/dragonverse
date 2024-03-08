import { WeaponClient } from "./WeaponClient";
import { WeaponData } from "./WeaponDef";

/** 冷兵器服务器处理器 */
export class WeaponServer extends WeaponClient {

    onStart() {

        super.onStart();

    }

    onUpdate(dt: number) {

        super.onUpdate(dt);

    }

    protected onDestroy(): void {
        super.onDestroy();

    }

    //@RemoteFunction(mw.Server)
    server_setWeaponJsonByParams(...params: number[]) {
        setTimeout(() => {
            this.client_setWeaponJsonByParams(...params);
        }, 2000);
        console.log("rewrite server data")
        this.weaponParams = params;
    }

    @RemoteFunction(mw.Server)
    server_startPeriod(animationIndex: number, periodIndex: number, launcherPlayerId: number, playerIds?: number[]) {

        let synchronizedPlayers = [];
        if (playerIds) {
            console.log("server_startPeriod use playerIds", playerIds)
            synchronizedPlayers = playerIds;
        }
        else if (WeaponData.getSynchronizedPlayer) {
            synchronizedPlayers = WeaponData.getSynchronizedPlayer(launcherPlayerId);
            console.log("server_startPeriod use getSynchronizedPlayer", synchronizedPlayers)
        }
        else {
            synchronizedPlayers = Player.getAllPlayers().map(e => e.playerId).filter(e => e != launcherPlayerId);
            console.log("server_startPeriod use getAllPlayers", synchronizedPlayers)
        }
        console.log("synchronizedPlayers", synchronizedPlayers)
        synchronizedPlayers.forEach(e => {
            try {
                let player = Player.getPlayer(e);
                if (player != null) {
                    this.client_startPeriod(player, animationIndex, periodIndex);
                }
            } catch (error) {
                console.error(error, "cannot find player", e);
            }
        })
    }


    @RemoteFunction(mw.Server)
    protected server_StopAllTimer() {
        this.allTimer.forEach(e => {
            e.delay = 0;
        })
        this.allTimer = [];
        this.allUpdateCallback = [];
    }

    // /**
    //  * 播放特效
    //  * @param guid 特效id
    //  * @param slotIndex 插槽位置 -1 则在角色原地播放
    //  * @param offsetPos 偏移坐标
    //  * @param offsetRotate 偏移旋转
    //  * @param offsetScale 偏移缩放
    //  */
    // @RemoteFunction(mw.Server)
    // protected async server_PlayEffectProxy(guid: string, stopTime: number, slotIndex: number,
    //     offsetPos: mw.Vector, offsetRotate: mw.Rotation, offsetScale: mw.Vector, colorHex: string) {
    //     this.client_PlayEffect(guid, stopTime, slotIndex, offsetPos, offsetRotate, offsetScale, colorHex);
    // }

    // /** 服务器停止所有特效 */
    // @RemoteFunction(mw.Server)
    // protected server_StopAllEffectProxy() {
    //     this.client_StopAllEffect();
    // }

    // /**
    //  * 设置指定对象坐标
    //  * @param guid 
    //  * @param pos 
    //  */
    // @RemoteFunction(mw.Server)
    // protected async server_SetCharPos(guid: string, pos: mw.Vector) {
    //     let go = await GameObject.asyncFindGameObjectById(guid);
    //     if (PlayerManagerExtesion.isCharacter(go)) {
    //         let char = go as mw.Character | mw.Character;
    //         char.worldTransform.position = (new mw.Vector(pos.x, pos.y, pos.z));
    //     }
    // }

    @RemoteFunction(mw.Server)
    private async server_addImp(guid: string, moveDis: number, moveDir: number) {
        let go = await GameObject.asyncFindGameObjectById(guid);
        if (go instanceof mw.Pawn) {
            let char = go as mw.Character | mw.Character;
            char.addImpulse(char.worldTransform.getForwardVector().multiply(moveDis).multiply(moveDir), true);
        }
    }

    // /**
    //  * 设置指定对象坐标
    //  * @param guid 
    //  * @param pos 
    //  */
    // @RemoteFunction(mw.Server)
    // protected async server_SetCharToPos(guid: string, startPos: mw.Vector, pos: mw.Vector, time: number) {

    //     this.characterLerpMove(guid, startPos, pos, time);

    // }

    /** 服务器 设置玩家装备 */
    @RemoteFunction(mw.Server)
    protected server_EquipWeapon(guid: string, isRight: boolean) {
        if (isRight) this.equipRightWeaponGuid = guid;
        else this.equipLeftWeaponGuid = guid;
    }

    /** 服务器 设置玩家guid */
    @RemoteFunction(mw.Server)
    protected server_SetChar(guid: string) {
        this.charGuid = guid;
    }

    // /**
    //  * 服务器发射飞弹
    //  * @param fireNodeId 飞弹id
    //  * @param startPos 开始位置
    //  * @param dir 飞行方向
    //  * @param speed 速度
    //  */
    // @RemoteFunction(mw.Server)
    // protected server_FireNodeBroadcast(fireNodeId: string, startPos: mw.Vector, dir: mw.Vector, speed: number, guid: string, colorHex: string, flyMoveDis: string) {
    //     this.client_createFireNode(fireNodeId, startPos, dir, speed, guid, colorHex, flyMoveDis);
    // }

    // @RemoteFunction(mw.Server)
    // protected server_UnFireNode(guid: string) {
    //     this.client_UnFireNode(guid);
    // }

}