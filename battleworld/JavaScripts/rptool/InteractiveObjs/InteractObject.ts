
import { util } from "../../tool/Utils";
import { NetManager } from "../NetManager";

//交互玩家管理
export class InteractPlayerMsg {
    /**交互物中的人 */
    private static playerSet: Set<number> = new Set();
    //记录玩家加入交互物
    public static addPlayer(player: number | mw.Player): void {
        let playerId: number = this.getPlayerId(player);
        this.playerSet.add(playerId);
    }

    //记录玩家离开交互物
    public static removePlayer(player: number | mw.Player): void {
        let playerId: number = this.getPlayerId(player);
        this.playerSet.delete(playerId);
    }
    public static has(player: number | mw.Player): boolean {
        let playerId: number = this.getPlayerId(player);
        return this.playerSet.has(playerId);
    }
    private static getPlayerId(player: number | mw.Player): number {
        if (player instanceof mw.Player) return player.playerId;
        return player;
    }
}
export class InteractiveHelper {
    //显示“退出交互”按钮(客户端)
    public static addExitInteractiveListener: (type: number, callback: () => void) => void;
    //隐藏“退出交互”按钮(客户端)
    public static removeExitInteractiveListener: () => void;

    //显示选择UI(客户端)
    public static showSelectUI: (icoList: string[], selectCallback: (index: number) => void) => void;
    //关闭选择UI(客户端)
    public static hideSelectUI: () => void;

    //外部激活条件判断(???)
    public static activeConditions: (param: string, playerId?: number) => boolean;
    //外部行为(???)
    public static onPlayerAction: (playerId: number, active: boolean, activeParam: any, param: string) => boolean;
    //潘多拉埋点(客户端)
    public static onPandoraAnalytics: (guid: string, tag: string, active: boolean, needExit: boolean) => void;
    //设置一个玩家的交互状态(服务端)
    public static onPlayInteract: (player: mw.Player | number, state: boolean) => void;
    //判断玩家当前的状态是否可以交互(服务器&客户端)
    public static playInteractionEnable: (player: mw.Player | number, isTips?: false) => boolean;
    //提示
    public static showTips: (text: string) => void;
    //获取CD中多语言
    public static getCDLanguage: () => string;
}
//交互对象,上面挂行为能力的前后端逻辑
export abstract class InteractObject extends mw.Script {
    @mw.Property({ displayName: "后续联动", group: "通用" })//可以多个,逗号分割,每个路径可以用true:或false:做前缀，条件性激活
    private nextActivePath: string = "";
    @mw.Property({ displayName: "外部联动参数", group: "通用" })
    private outsideActive: string = "";
    @mw.Property({ displayName: "延迟激活时间(秒)", group: "通用" })
    private delay: number = 0;

    public objLogicS: InteractLogic_S<any>;
    public objLogicC: InteractLogic_C<any>;
    protected init(ServerClass: { new(objScript: InteractObject): InteractLogic_S<any> }, ClientClass: { new(objScript: InteractObject): InteractLogic_C<any> }) {
        if (mw.SystemUtil.isClient()) {
            this.objLogicC = new ClientClass(this);
        }
        if (mw.SystemUtil.isServer()) {
            this.objLogicS = new ServerClass(this);
        }
    }
    public get logic(): InteractLogic<any> {
        if (mw.SystemUtil.isClient()) {
            return this.objLogicC;
        } else {
            return this.objLogicS;
        }
    }
    protected onUpdate(dt: number): void {
        this.objLogicS?.onUpdate(dt);
        this.objLogicC?.onUpdate(dt);
    }
    protected onDestroy(): void {
        if (this.objLogicS != null) {
            this.objLogicS["destroy"]();
            this.objLogicS = null;
        }
        if (this.objLogicC != null) {
            this.objLogicC["destroy"]();
            this.objLogicC = null;
        }
    }
}
//交互对象的行为逻辑 在这个基础上分出: 能力逻辑_S 和 能力逻辑_C
abstract class InteractLogic<T extends InteractObject> {
    private paramScript: T;
    private waitActiveId: number = null;//等待激活的呀安驰方法的延迟id
    constructor(paramScript: T) {
        this.paramScript = paramScript;
        setTimeout(() => {
            this.init();
        }, 0);
    }
    //初始化
    protected init() {
        try { this.onStart(); } catch (e) { }
        this.registerNetFun();
    }
    //游戏对象上挂载的原始脚本
    protected get info(): T {
        return this.paramScript;
    }
    //游戏对象
    protected get gameObject(): mw.GameObject {
        return this.info.gameObject;
    }
    protected get guid(): string {
        return this.info.guid;
    }
    protected get name(): string {
        return this.info.name;
    }
    //是否开启Update
    protected set useUpdate(value: boolean) {
        this.info.useUpdate = value;
    }


    //======================

    private _nextLogicList: Array<InteractLogic<any>> = null;
    private _nextLogicList_true: Array<InteractLogic<any>> = null;
    private _nextLogicList_flase: Array<InteractLogic<any>> = null;

    private get nextLogicList(): Array<InteractLogic<any>> {
        if (this._nextLogicList == null) {
            this.findNextLogic();
        }
        return this._nextLogicList;
    }
    private get nextLogicList_true(): Array<InteractLogic<any>> {
        if (this._nextLogicList_true == null) {
            this.findNextLogic();
        }
        return this._nextLogicList_true;
    }
    private get nextLogicList_false(): Array<InteractLogic<any>> {
        if (this._nextLogicList_flase == null) {
            this.findNextLogic();
        }
        return this._nextLogicList_flase;
    }
    private startInteract(playerId: number, active: boolean, param: any) {
        let delayTime = this.info["delay"];
        if (delayTime <= 0) {
            this.interact(playerId, active, param);
            return;
        }
        if (active) {
            if (this.waitActiveId != null) {
                clearTimeout(this.waitActiveId);
            }
            this.waitActiveId = setTimeout(() => {
                this.waitActiveId = null;
                this.interact(playerId, active, param);
            }, delayTime * 1000);
        } else {
            if (this.waitActiveId != null) {
                //都没有激活过，也不用退出了
                clearTimeout(this.waitActiveId);
                this.waitActiveId = null;
            } else {
                this.interact(playerId, active, param);
            }
        }
    }
    //交互
    protected interact(playerId: number, active: boolean, param: any = null) {
        this.interactThis(playerId, active, param);
        //this.interactNext(playerId, active, param);
    }
    protected interactThis(playerId: number, active: boolean, param: any = null) {
        this.onPlayerAction(playerId, active, param);
        let outsideActive: string = this.info['outsideActive'];//外部调用
        if (!mw.StringUtil.isEmpty(outsideActive)) {
            InteractiveHelper.onPlayerAction(playerId, active, param, outsideActive);
        }
    }
    //交互后续节点
    protected interactNext(playerId: number, active: boolean, param: any = null) {
        for (let i = 0; i < this.nextLogicList.length; i++) {
            this.nextLogicList[i].startInteract(playerId, active, param);
        }
        if (active) {
            for (let i = 0; i < this.nextLogicList_true.length; i++) {
                this.nextLogicList_true[i].startInteract(playerId, true, param);
            }
        } else {
            for (let i = 0; i < this.nextLogicList_false.length; i++) {
                this.nextLogicList_false[i].startInteract(playerId, true, param);
            }
        }
    }
    private findNextLogic() {
        this._nextLogicList = [];
        this._nextLogicList_true = [];
        this._nextLogicList_flase = [];
        let nextActivePath: string = this.info['nextActivePath'];
        if (!mw.StringUtil.isEmpty(nextActivePath)) {
            let paths = nextActivePath.split(',');
            for (let i = 0; i < paths.length; i++) {
                let path: string = paths[i];
                let type: number = 0;
                if (path.startsWith("true:")) {
                    type = 1;
                    path = path.substring(5);
                } else if (path.startsWith("false:")) {
                    type = -1;
                    path = path.substring(6);
                }
                let nextLogic: InteractLogic<any> = this.findLogic(path);
                if (nextLogic == null || this._nextLogicList.includes(nextLogic)) continue;
                switch (type) {
                    case 0: this._nextLogicList.push(nextLogic); break;
                    case -1: this._nextLogicList_flase.push(nextLogic); break;
                    case 1: this._nextLogicList_true.push(nextLogic); break;
                }
            }
        }
    }
    //根据路径查询一个场景脚本(Server Only)
    protected findLogic(path: string): InteractLogic<any> {
        if (mw.StringUtil.isEmpty(path)) return null;
        let interactObj: InteractObject = util.findScriptFromGo_sync(this.gameObject, path);
        if (interactObj == null) {
            console.error(`InteractAction_S->findScript：找不到脚本 gameObject=${this.gameObject.name} path=${path}`);
            return null;
        }
        return interactObj?.logic;
    }



    //=======================


    //根据路径查询一个子节点
    protected findChild<T extends mw.GameObject>(path: string): T {
        if (mw.StringUtil.isEmpty(path)) return null;
        let arr = path.split('/');
        let go: mw.GameObject = this.gameObject;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '..') {
                go = go.parent;
            } else {
                go = go.getChildByName(arr[i]);
            }
            if (go == null) return null;
        }
        return go as T;
    }
    //根据路径查询同名的多个子节点
    protected findChildren<T extends mw.GameObject>(path: string): Array<T> {
        if (mw.StringUtil.isEmpty(path) || path == '..') return null;
        let arr = path.split('/');
        let go: mw.GameObject = this.gameObject;
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                break;
            }
            if (arr[i] == '..') {
                go = go.parent;
            } else {
                go = go.getChildByName(arr[i]);
            }
            if (go == null) return null;
        }
        let goArr: Array<T> = [];
        let children = go.getChildren();
        for (let i = 0; i < children.length; i++) {
            if (children[i].name == arr[arr.length - 1]) {
                goArr.push(children[i] as T);
            }
        }
        return goArr;
    }
    //注册自己的网络方法(自己的和父类的)
    private registerNetFun() {
        this.registerObjNetFun(this);
        this.registerObjNetFun(this["__proto__"]);
    }
    //注册对象网络方法
    private registerObjNetFun(obj: any) {
        if (obj == null) return;
        let prototype = Object.getPrototypeOf(obj);
        let funNames = Reflect.ownKeys(prototype);
        for (let i = 0; i < funNames.length; i++) {
            let funName: string = funNames[i].toString();
            if ((funName.startsWith('net_')) && typeof this[funName] === 'function') {
                NetManager.instance.registerFun(this[funName], this, this.guid + funName);
            }
        }
    }
    //启动调用
    protected abstract onStart(): void;
    //激活或反激活调用
    protected onPlayerAction(playerId: number, active: boolean, param: any): void { }
    //刷新时调用(需要请重写，需要开启:this.useUpdate=true)
    public onUpdate(dt: number): void { };
    protected destroy(): void {
        this.paramScript = null;
    }
}
//==============================================================================================================
//交互行为-服务端
export abstract class InteractLogic_S<T extends InteractObject> extends InteractLogic<T> {
    //调用特定客户端的方法
    protected callClientFun(player: mw.Player | number, funName: string, ...params: any[]) {
        NetManager.instance.callClientFun(player, `${this.guid}${funName}`, ...params);
    }
    //调用全世界客户端的方法
    protected callAllClientFun(funName: string, ...params: any[]) {
        NetManager.instance.callAllClientFun(`${this.guid}${funName}`, ...params);
    }
    //获取当前调用服务器方法的玩家
    protected get currentPlayer(): mw.Player {
        return NetManager.instance.currentPlayer;
    }
    //获取当前调用服务器方法的玩家ID
    protected get currentPlayerId(): number {
        return this.currentPlayer.playerId;
    }
    protected destroy(): void {
        super.destroy();
        //this.onInteract.clear();
    }
    //激活或反激活调用
    protected abstract onPlayerAction(playerId: number, active: boolean, param: any): void
}
//交互行为-客户端
export abstract class InteractLogic_C<T extends InteractObject> extends InteractLogic<T> {
    //调用服务端方法
    protected async callServerFun(funName: string, ...prames: any[]): Promise<any> {
        return await NetManager.instance.callServerFun(`${this.guid}${funName}`, ...prames);
    }
}



//RP交互对象,上面挂行为能力的前后端逻辑
export abstract class RPInteractObject extends InteractObject {
    @mw.Property({ displayName: "同步到客户端", group: "关联" })//是否派发到客户端
    private toClient: boolean = false;
}
export abstract class RPInteractLogic_S<T extends RPInteractObject> extends InteractLogic_S<T>{
    protected interactThis(playerId: number, active: boolean, param: any = null) {
        super.interactThis(playerId, active, param);
        if (this.info["toClient"]) {
            this.callClientFun(playerId, "net_onPlayerAction", playerId, active, param);
        }
    }
    /**控制*/
    public control(...param: any[]) {

    }
}
export abstract class RPInteractLogic_C<T extends RPInteractObject> extends InteractLogic_C<T>{
    //通过这个方法讲服务端的onPlayerAction传递给客户端onPlayerAction
    private net_onPlayerAction(playerId: number, active: boolean, param: any) {
        this.onPlayerAction(playerId, active, param);
    }
    /**控制*/
    public control(...param: any[]) {

    }
    //激活或反激活调用
    protected abstract onPlayerAction(playerId: number, active: boolean, param: any): void
}