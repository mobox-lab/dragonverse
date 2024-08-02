import { Point, QuadTree, Rectangle } from "./QuadTree";
import noReply = mwext.Decorator.noReply;
import Log4Ts from "mw-log4ts";
import { BaseInteractiveObj } from "./BaseInteractiveScript";

export class InteractiveObjModuleS extends ModuleS<InteractiveObjModuleC, null> {
    /**
     * 记录当前玩家正在交互的物体
     */
    private _playerAndInteractingGoMap: Map<number, string> = new Map<number, string>();

    private _interactiveObjs: Map<string, BaseInteractiveObj> = new Map<string, BaseInteractiveObj>();

    protected onPlayerLeft(player: mw.Player): void {
        //客户端已经无了服务端来结束交互
        if (this._playerAndInteractingGoMap.has(player.playerId)) {
            this.net_stopInteraction(player.playerId, this._playerAndInteractingGoMap.get(player.playerId));
        }
    }

    registerInteractiveObj(goGuid: string, interactiveObj: BaseInteractiveObj) {
        this._interactiveObjs.set(goGuid, interactiveObj);
    }

    unRegisterInteractiveObj(goGuid: string) {
        this._interactiveObjs.delete(goGuid);
    }

    isInteracting(playerId: number): string {
        return this._playerAndInteractingGoMap.get(playerId);
    }

    /**
     * 服务端开始交互逻辑，可以客户端调，也可以服务端调，所以要加playerId
     * @param playerId 玩家id
     * @param goGuid 交互物guid
     */
    @noReply()
    public net_startInteraction(playerId: number, goGuid: string) {
        let currentGoGuid = this._playerAndInteractingGoMap.get(playerId);
        //触发器在不同的端都会触发，所以要判断是否已经在交互了
        if (currentGoGuid == goGuid) return;
        if (currentGoGuid != null) {
            //玩家已经在交互了，先结束之前的交互
            this.net_stopInteraction(playerId, currentGoGuid);
        }
        this._interactiveObjs.get(goGuid).someOneStartInteractionInServer(playerId);
    }

    /**
     * @description: 服务端结束交互逻辑
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    @noReply()
    public net_stopInteraction(playerId: number, goGuid: string): void {
        //如果已经退出了，可能的情况是手动调用了endInteraction，而触发器还能触发结束
        if (this._playerAndInteractingGoMap.get(playerId) != goGuid) return;
        this._interactiveObjs.get(goGuid).someOneStopInteractionInServer(playerId);
    }

    public recordStartInteraction(playerId: number, goGuid: string) {
        this._playerAndInteractingGoMap.set(playerId, goGuid);
    }

    public net_recordEndInteraction(playerId: number) {
        this._playerAndInteractingGoMap.delete(playerId);
    }

    /**
     * @description: 共享的交互物通知客户端走rpc调用
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    public startSharedInteraction(playerId: number, goGuid: string): void {
        this.getClient(playerId).net_startInteractionInClient(playerId, goGuid);
    }

    /**
     * @description: 共享的交互物通知客户端走rpc调用
     * @param {number} playerId
     * @param {string} goGuid
     * @return {*}
     */
    public stopSharedInteraction(playerId: number, goGuid: string): void {
        this.getClient(playerId).net_stopInteractionInClient(playerId, goGuid);
    }
}

export class InteractiveObjModuleC extends ModuleC<InteractiveObjModuleS, null> {
    private _boundary: Rectangle;
    private _quadTree: QuadTree;
    private _detectingRange: number = 250;
    private updateFlag: number = 0; //刷新延迟标记
    private _lastShowPoints: Point[] = [];
    private _detectingRect: Rectangle;

    private _interactiveObjs: Map<string, BaseInteractiveObj> = new Map<string, BaseInteractiveObj>();

    protected onStart(): void {
        //构建四叉树
        this._boundary = new Rectangle(-1041, -1098, 6000, 8000);
        this._quadTree = new QuadTree(this._boundary, 4);
        this._detectingRect = new Rectangle(0, 0, this._detectingRange, this._detectingRange);
    }

    public insertInteractionIntoQuadTree(pos: mw.Vector, goGuid: string) {
        let point = new Point(pos.x, pos.y, goGuid);
        this._quadTree.insert(point);
    }

    registerInteractiveObj(goGuid: string, interactiveObj: BaseInteractiveObj) {
        this._interactiveObjs.set(goGuid, interactiveObj);
    }

    unRegisterInteractiveObj(goGuid: string) {
        this._interactiveObjs.delete(goGuid);
    }

    protected onUpdate(dt: number): void {
        //四叉树没有点就不判断
        if (this._quadTree.points.length == 0) return;
        if (++this.updateFlag % 10 != 0) return;
        // if (!this._needDetectingInteractionUI) return;
        //每10帧判断下
        this._detectingRect.x = Player.localPlayer.character.worldTransform.position.x;
        this._detectingRect.y = Player.localPlayer.character.worldTransform.position.y;
        let points = [];
        let finalPoints = this._quadTree.query(this._detectingRect, points);
        //先show现在的
        finalPoints.forEach((point) => {
            this._interactiveObjs.get(point.goGuid).activeMode.activate = true;
        });
        //再hide不在的
        this._lastShowPoints.forEach((point) => {
            if (finalPoints.indexOf(point) == -1) {
                this._interactiveObjs.get(point.goGuid).activeMode.activate = false;
            }
        });
        this._lastShowPoints = finalPoints;
    }

    public startInteraction(goGuid: string) {
        this.server.net_startInteraction(Player.localPlayer.playerId, goGuid);
    }

    public stopInteraction(goGuid: string): void {
        //通知服务端停止交互
        this.server.net_stopInteraction(Player.localPlayer.playerId, goGuid);
    }

    /**
     * @description: 结束交互可能有表现，表现结束后调这个
     */
    public endInteraction(): void {
        this.server.net_recordEndInteraction(Player.localPlayer.playerId);
    }

    //服务端得到可以交互的消息，开始客户端交互
    public net_startInteractionInClient(playerId: number, goGuid: string): void {
        this._interactiveObjs.get(goGuid).someOneStartInteractionInClient(playerId);
    }

    //服务端得到可以交互的消息，开始客户端交互
    public net_stopInteractionInClient(playerId: number, goGuid: string): void {
        this._interactiveObjs.get(goGuid).someOneStopInteractionInClient(playerId);
    }
}
