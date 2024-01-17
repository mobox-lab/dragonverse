import { util } from "../tool/Utils";


/**回调体，用于Action和Event系统的辅助功能*/
export class CallBack {
    private fun: Function;
    private thisArg: any;
    public dirty: boolean = false;//脏标记
    constructor(fun: Function, thisArg: any) {
        this.fun = fun;
        this.thisArg = thisArg;
    }
    public call(...prames: any[]): any {
        if (!this.dirty) {
            if (this.thisArg != null) {
                return this.fun.call(this.thisArg, ...prames);
            } else {
                this.fun(...prames);
            }
        }
    }
    //判断是否构建于fun和thisArg
    public isOriginFrom(fun: Function, thisArg: any): boolean {
        return this.fun == fun && this.thisArg == thisArg;
    }
    public get originFun(): Function {
        return this.fun;
    }
    public get originThisArg(): any {
        return this.thisArg;
    }
}


@util.AutoInit
export class NetManager {
    private static _instance: NetManager;
    public static get instance(): NetManager {
        if (NetManager._instance == null) {
            NetManager._instance = new NetManager();
        }
        return NetManager._instance;
    }
    private constructor() { }
    private static init() {
        this.instance.init();
    }
    public destroy() {
        NetManager._instance = null;
        this.funMap.clear();
        this.funMap.clear();
        this.funMap.clear();
        this.funMap.clear();
    }

    private readonly ASK: string = "Ask";
    private readonly REPLY: string = "Reply";
    private readonly NOTIFY: string = "Notify";
    private readonly NO_REPLY: string = "No_Reply";
    private funMap: Map<string, CallBack> = new Map();//注册的方法
    private objFunMap: Map<string, CallBack> = new Map();//注册的对象的方法
    private objMap: Map<string, any> = new Map();//对远端开放调用的对象<netGuid, obj>

    private waitServerResolveMap: Map<string, Array<Function>> = new Map<string, Array<Function>>();
    private noReplyFunNameMap: Map<string, boolean> = new Map();
    private _currentPlayer: mw.Player;
    private _rpcCount: number = 0;

    /**是否显示通信log */
    public set logVisible(value: boolean) {

    }
    /**当前调用服务器方法的玩家*/
    public get currentPlayer(): mw.Player {
        return this._currentPlayer;
    }
    /**发送和接收的rpc总数量*/
    public get rpcCount(): number {
        return this._rpcCount;
    }
    /**初始化(框架方法，请勿调用) */
    private init() {
        if (mw.SystemUtil.isClient()) {
            Event.addServerListener(this.NO_REPLY, (funName: string) => {
                this.showLog(`[NoReply C]      ${funName}`);
                if (this.waitServerResolveMap.has(funName)) {
                    let waitResolveArr = this.waitServerResolveMap.get(funName);
                    while (waitResolveArr.length > 0) {
                        let resolve = this.waitServerResolveMap.get(funName).shift();
                        resolve(null);
                    }
                    this.waitServerResolveMap.delete(funName);
                    this.noReplyFunNameMap.set(funName, true);
                } else {

                }
            });
            Event.addServerListener(this.REPLY, (funName: string, res: any) => {
                this.showLog(`[Reply C]      ${funName}`);
                if (this.waitServerResolveMap.has(funName) && this.waitServerResolveMap.get(funName).length > 0) {
                    let resolve = this.waitServerResolveMap.get(funName).shift();
                    resolve(res);
                } else {

                }
            });
            Event.addServerListener(this.NOTIFY, (funName: string, ...params) => {
                this.showLog(`[Notify C]     ${funName}`);
                let fun = this.getFunction(funName);
                if (fun != null) {
                    fun.call(...params);
                } else {

                }
            });
        }
        if (mw.SystemUtil.isServer()) {
            Event.addClientListener(this.ASK, (player: mw.Player, funName: string, ...params) => {
                this.showLog(`[Ask S]       ${funName}`);
                let fun = this.getFunction(funName);
                if (fun != null) {
                    this._currentPlayer = player;
                    //params.push(player);
                    let res = fun.call(...params);
                    this._currentPlayer = null;

                    if (fun[this.NO_REPLY] != null) {//不用返回值
                        if (!this.noReplyFunNameMap.has(funName)) {
                            this.noReplyFunNameMap.set(funName, true);
                            this.showLog(`[NoReply S]      ${funName}`);
                            Event.dispatchToClient(player, this.NO_REPLY, funName);//告诉客户端这个方法下次别监听了
                        }
                    } else if (res instanceof Promise) {
                        res.then((result: any) => {
                            this.showLog(`[Reply S]      ${funName}`);
                            Event.dispatchToClient(player, this.REPLY, funName, result);
                        });
                    } else {
                        this.showLog(`[Reply S]      ${funName}`);
                        Event.dispatchToClient(player, this.REPLY, funName, res);
                    }
                } else {

                }
            });
        }
    }
    /**
     * 注册网络方法(网络方法是可以被远端调用的， 注意：注册的方法名不能重复)
     * @param fun 方法
     * @param thisArg 方法的域
     * @param callName 调用别名(默认为方法名)
     */
    public registerFun(fun: Function, thisArg: any, callName: string = null) {
        if (callName == null) {
            callName = fun.name;
        }
        if (!this.funMap.has(callName)) {
            let callback: CallBack = new CallBack(fun, thisArg);
            this.funMap.set(callName, callback);
        } else {

        }
    }
    /**
     * 移除注册的网络方法
     * @param fun 方法
     */
    public unRegisterFun(fun: Function): void {
        for (let [callName, callBack] of this.funMap) {
            if (callBack.originFun == fun) {
                this.funMap.delete(callName);
                return;
            }
        }
    }
    /**
     * 注册网络对象(网络对象里的方法都是可以被远端调用的)
     * @param netObj 网络对象
     * @param netGuid 通信id
     */
    public registerObj(netObj: any, netGuid: string) {

        if (netGuid == null) {

        } else if (!this.objMap.has(netGuid)) {
            this.objMap.set(netGuid, netObj);
        } else {

        }
    }
    /**
     * 移除注册的网络对象
     * @param netObj 对象
     */
    public unRegisterObj(netObj: any) {
        if (netObj == null) return;
        for (let [netGuid, obj] of this.objMap) {
            if (obj == netObj) {
                this.objMap.delete(netGuid);
                break;
            }
        }
        for (let [callName, callBack] of this.objFunMap) {
            if (callBack.originThisArg == netObj) {
                this.funMap.delete(callName);
                this.objFunMap.delete(callName);
            }
        }
    }

    /**
     * 调用服务端方法
     * @param fun 方法路径|方法
     * @param params 参数
     * @returns 服务端方法返回值(异步)
     */
    public callServerFun(fun: string | Function, ...params: any[]): Promise<any> {
        if (mw.SystemUtil.isClient()) {
            let funName: string = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`[Ask C]       ${funName}`);
            if (this.noReplyFunNameMap.has(funName)) {//无需等待回值
                Event.dispatchToServer(this.ASK, funName, ...params);
                return null;
            } else {
                if (!this.waitServerResolveMap.has(funName)) {
                    this.waitServerResolveMap.set(funName, []);
                }
                return new Promise<any>((resolve: (value: any) => void) => {
                    this.waitServerResolveMap.get(funName).push(resolve);//保存等待Reply的resolve
                    Event.dispatchToServer(this.ASK, funName, ...params);
                });
            }
        }
    }
    /**
     * 调用目标客户端的方法
     * @param player 目标玩家
     * @param fun 方法路径|方法
     * @param params 参数
     */
    public callClientFun(player: mw.Player | number, fun: string | Function, ...params: any[]) {
        if (mw.SystemUtil.isServer()) {
            let funName: string = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`[Notify S]   TargetCilent   ${funName}`);
            if (player instanceof mw.Player) {
                Event.dispatchToClient(player, this.NOTIFY, funName, ...params);
            } else {
                Event.dispatchToClient(Player.getPlayer(player), this.NOTIFY, funName, ...params);
            }
        }
    }
    /**
     * 调用所有客户端的方法
     * @param fun 方法路径|方法
     * @param params 参数
     */
    public callAllClientFun(fun: string | Function, ...params: any[]) {
        if (mw.SystemUtil.isServer()) {
            let funName: string = (typeof fun === 'string') ? fun : fun.name;
            this.showLog(`[Notify S]   WorldClient   ${funName}`);
            Event.dispatchToAllClient(this.NOTIFY, funName, ...params);
        }
    }
    //根据名称获取一个方法
    //funName可以是netGuid.FunName的形式
    private getFunction(fun: string): CallBack {
        if (this.funMap.has(fun)) {
            return this.funMap.get(fun);
        }
        if (this.objFunMap.has(fun)) {
            return this.objFunMap.get(fun);
        }
        if (fun.includes('.')) {
            let strArr = fun.split('.');
            let netGuid = strArr[0];
            let funName = strArr[1];
            if (this.objMap.has(netGuid)) {
                let obj: any = this.objMap.get(netGuid);
                if (obj[funName] != null && typeof (obj[funName]) == "function") {
                    let callback: CallBack = new CallBack(obj[funName], obj);
                    this.objFunMap.set(fun, callback);
                    return callback;
                }
            }
        }
        return null;
    }
    //输出log
    private showLog(content: string) {
        this._rpcCount++;
        console.warn(`oTraceError---${content}`);
    }
}