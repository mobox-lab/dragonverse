import { oTraceError } from "odin";
import { Globaldata } from "../../const/Globaldata";
import { Singleton } from "../../tool/FunctionUtil";
import { EPlayerEvents_C } from "../../const/Enum";
import { EventManager } from "../../tool/EventManager";
import { GameConfig } from "../../config/GameConfig";


interface IPlayerTmpData {
    /**玩家坐标缓存 */
    tmpLoc: mw.Vector;
    /**上次获取数据时的时间戳 */
    getTimeStamp: number;
}

@Singleton()
export class PlayerManager {
    public static instance: PlayerManager;

    private _mapPlayer: Map<number, IPlayerTmpData> = new Map();
    // 玩家transform
    private _transform: mw.Transform = null;
    // 当前玩家
    private _currentPlayer: mw.Player = null;

    /**添加玩家缓存 */
    public addPlayer(pId: number) {
        if (this._mapPlayer.has(pId)) {
            return;
        }
        let player = Player.getPlayer(pId);
        if (player == null) {
            oTraceError("===PlayerManager:addPlayer ", pId);
            return;
        }
        if (player.character == null) {
            return;
        }
        if (player.character.worldTransform == null) {
            return;
        }
        let tmpVector = mw.Vector.zero;

        let charaLoc = player.character.worldTransform.position;

        let tmpData: IPlayerTmpData = {
            tmpLoc: tmpVector,
            getTimeStamp: Date.now()
        }

        tmpVector.x = charaLoc.x;
        tmpVector.y = charaLoc.y;
        tmpVector.z = charaLoc.z;

        this._mapPlayer.set(pId, tmpData);
    }

    /**移除玩家缓存 */
    public removePlayer(pId: number) {
        if (this._mapPlayer.has(pId) == false) {
            return;
        }

        this._mapPlayer.delete(pId);
    }

    /**
     * 更新玩家位置
     * @param pId 玩家id
     * @param loc 更新坐标 可以为空 会主动获取下玩家当前坐标
     * @returns 
     */
    public updatePlayerLoc(pId: number = null, loc: mw.Vector = null) {
        let player: mw.Player = null;
        if (pId == null && SystemUtil.isClient()) {
            player = Player.localPlayer;
            pId = player.playerId;
        } else {
            player = Player.getPlayer(pId);
        }

        if (player == null) {
            return null;
        }

        if (player.character == null) {
            return null;
        }
        if (this._mapPlayer.has(pId) == false) {
            this.addPlayer(pId);
        }

        let data = this._mapPlayer.get(pId);

        let charaLoc = loc;
        if (charaLoc == null) {
            charaLoc = player.character.worldTransform.position;
        }

        data.getTimeStamp = Date.now();
        data.tmpLoc.x = charaLoc.x;
        data.tmpLoc.y = charaLoc.y;
        data.tmpLoc.z = charaLoc.z;

    }


    /**
     * 获取玩家坐标
     * @param 注意：适用于 玩家体感不敏感功能，使用坐标进行计算（比如 距离校验 播放声音特效），涉及设置玩家坐标计算不要使用
     * @param 注意：如果玩家被传送位置，注意 调用updatePlayerLoc 更新玩家缓存
     * @param pId 玩家id  如果为空，则默认为客户端当前玩家
     * @returns 返回玩家坐标  可能为空自行判断
     */
    public getPlayerLoc(pId: number = null) {
        let player: mw.Player = null;
        if (pId == null && SystemUtil.isClient()) {
            player = Player.localPlayer;
            pId = player.playerId;
        } else {
            player = Player.getPlayer(pId);
        }

        if (player == null) {
            return null;
        }

        if (player.character == null) {
            return null;
        }
        if (player.character.worldTransform == null) {
            return null;
        }
        if (this._mapPlayer.has(pId) == false) {
            this.addPlayer(pId);
        }

        let data = this._mapPlayer.get(pId);

        let intervalTime = Date.now() - data.getTimeStamp;

        if (intervalTime < Globaldata.getPlayerLocInterval) {
            return data.tmpLoc;
        } else {

            // 刷新
            data.getTimeStamp = Date.now();

            let charaLoc = player.character.worldTransform.position;

            data.tmpLoc.x = charaLoc.x;
            data.tmpLoc.y = charaLoc.y;
            data.tmpLoc.z = charaLoc.z;

            return data.tmpLoc;
        }
    }

    update(dt: number) {
        this.updateTransform();
    }


    /**
     * 玩家transform update
     */
    private updateTransform() {
        // if (!this.getActive()) return;
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        if (this._currentPlayer == null || this._currentPlayer.character == null) return;
        this._transform = this._currentPlayer.character.localTransform;
    }

    /**
     * 获取玩家transform
     */
    public getPlayerTransform(): mw.Transform {
        return this._transform;
    }


    /**
     * 客户端获取玩家
     */
    public get currentPlayer() {
        if (SystemUtil.isServer()) return null;
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        return this._currentPlayer;
    }

    /**
     * 客户端获取玩家ID
     */
    public get currentPlayerId() {
        if (SystemUtil.isServer()) return null;
        if (this._currentPlayer == null) this._currentPlayer = Player.localPlayer;
        if (this.currentPlayer == null) return null;
        return this._currentPlayer.playerId;
    }

    private addImpulseDelayKey: any = null;
    private tmpImpulse: mw.Vector = mw.Vector.zero;

    /**玩家添加冲量
     * 
     */
    public addImpulse(offsetPos: mw.Vector, forceNum: number, groundFriction: number) {

        if (SystemUtil.isServer()) return;

        // 技能模块 玩家添加冲量 并 设置摩擦时会冲突，延迟处理下冲量 

        this.clear_addImpulseDelayKey();

        this.currentPlayer.character.groundFriction = groundFriction;

        this.addImpulseDelayKey = setTimeout(() => {
            this.addImpulseDelayKey = null;
            let charaVelocity = this.currentPlayer.character.velocity;
            mw.Vector.multiply(charaVelocity, -1, this.tmpImpulse);
            let relativeLoc = this.currentPlayer.character.localTransform.transformPosition(offsetPos);
            let playerLoc = PlayerManager.instance.getPlayerLoc();
            mw.Vector.subtract(relativeLoc, playerLoc, Globaldata.tmpVector2);
            Globaldata.tmpVector2.normalize();
            mw.Vector.multiply(Globaldata.tmpVector2, forceNum, Globaldata.tmpVector2);
            mw.Vector.add(this.tmpImpulse, Globaldata.tmpVector2, this.tmpImpulse);

            this.currentPlayer.character.addImpulse(this.tmpImpulse, true);
        }, 100);
    }

    private clear_addImpulseDelayKey() {
        if (this.addImpulseDelayKey != null) {
            clearTimeout(this.addImpulseDelayKey);
            this.addImpulseDelayKey = null;
        }
    }

    /**
     * 控制玩家显示隐藏
     */
    public setPlayerVisible(pId: number, visible: boolean) {
        let player = mw.Player.getPlayer(pId);
        if (player == null) {
            return;
        }
        if (player.character == null) {
            return;
        }

        player.character.setVisibility(visible);
        if (visible) {
            player.character.displayName = "";
            if (player.character.overheadUI) {
                player.character.overheadUI.setVisibility(false);
            }
        }
        // 主要处理插槽内的挂件情况

        // 如果显示，手部的武器隐藏
        // if (visible) {
        //     // 编辑器问题，已经提单子了
        //     setTimeout(() => {
        //         EventManager.instance.call(EModule_Events.playerChangeEquipState, [pId], false);
        //     }, 0);
        // }

        EventManager.instance.call(EPlayerEvents_C.Player_Visible_C, pId, visible);

    }

    /**
     * 根据分数获取段位
     */
    public getRankLevel(rankScore: number): number {
        let cfgArr = GameConfig.Rank.getAllElement();
        let id = 0;
        for (let i = 0; i < cfgArr.length; i++) {
            let cfg = cfgArr[i];
            if (rankScore >= cfg.integral) {
                id = cfg.id;
            }
        }
        return id;
    }

}