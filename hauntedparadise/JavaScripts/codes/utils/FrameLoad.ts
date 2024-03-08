/*
 * @Author       : dal
 * @Date         : 2024-01-05 14:33:10
 * @LastEditors  : dal
 * @LastEditTime : 2024-01-05 14:33:17
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\FrameLoad.ts
 * @Description  : 
 */
/*
 * @Author       : feifei.song
 * @Date         : 2023-12-27 11:49:56
 * @LastEditors  : feifei.song
 * @LastEditTime : 2024-01-04 18:09:50
 * @FilePath     : \crazytheaternight\JavaScripts\utils\FrameLoad.ts
 * @Description  : 
 */

import { TimerOnly, WaitCall, WaitReady } from "./AsyncTool";

/** 节点裁剪类型 */
export enum NodeCullType {

    /** 无 */
    None = 0,

    /** 四叉树隐藏，仅客户端可用 */
    FourTreeHide,

    /** 四叉树删除，仅客户端可用 */
    FourTreeRemove,
}


/** 节点信息 */
class FrameLoadInfo {

    /** 加载后的节点 */
    public node: mw.GameObject | mw.Script;

    /** 是否显示 */
    public isShow: boolean = false;

    /** 是否销毁 */
    public isDestroy: boolean = false;


    /**
     * 构造函数
     * @param cfg 配置文件
     * @param root 根节点
     * @param cullType 裁剪类型
     * @param stayGuid 是否保留 guid
     */
    constructor(public cfg: any, public root: FrameLoadRoot, public cullType: NodeCullType, public stayGuid: boolean) { }

    /**
     * 加载节点
     * @returns 
     */
    public async load() {
        if (this.cfg.ParentGuid && this.cfg.SourceType == "Script") {
            await this.root.waitNode(this.cfg.ParentGuid);
        }
        const node = await FrameLoad.instance.loadNode(this);
        if (!node) {
            console.error("load error:" + this.cfg.Guid);
            (!this.isDestroy) && this.root.onNodeLoad.call(this);
            return;
        }
        if (this.isDestroy) {
            node.destroy();
            return;
        }

        this.node = node;
        node["__frameLoadInfo"] = this;

        if (!(node instanceof mw.Script)) {
            node.name = this.cfg.Name;
            if (this.cfg.Collision != null) {
                node.setCollision(this.cfg.Collision);
            }
        }

        this.root.onNodeLoad.call(this);
    }

    /**
     * 设置父节点
     * @param parent 父节点
     * @effect 内部调用
     */
    public setParent(parent: mw.GameObject | mw.Script) {
        if (this.node instanceof mw.Script) {
            return;
        } else if (this.node instanceof mw.GameObject && parent) {
            (this.node as any).parent = parent;
        }

        const position = this.cfg.RootComponent.LocalTransform.Position;
        this.node.localTransform.position = new mw.Vector(position.X, position.Y, position.Z);

        const rotation = this.cfg.RootComponent.LocalTransform.EulerRotation;
        this.node.localTransform.rotation = new mw.Rotation(rotation.X, rotation.Y, rotation.Z);

        const scale = this.cfg.RootComponent.LocalTransform.Scale;
        this.node.localTransform.scale = new mw.Vector(scale.X, scale.Y, scale.Z);
    }

    /**
     * 销毁节点
     */
    public onDestroy() {
        this.node = null;
        this.isDestroy = true;
        FrameLoad.instance.removeNode(this);
        this.root.onNodeDestroy.call(this);
    }

}


/** 节点信息 */
class FrameLoadRoot extends FrameLoadInfo {

    /** 自己加载完成 */
    public ready: WaitReady<void> = new WaitReady();;

    /** 子节点加载完成 */
    public childReady: WaitReady<void> = new WaitReady();;

    ////// 内部调用成员对象 /////////
    /** 节点加载后回调 */
    public onNodeLoad: Action1<FrameLoadInfo> = new Action1<FrameLoadInfo>();

    /** 节点加载后回调 */
    public onNodeDestroy: Action1<FrameLoadInfo> = new Action1<FrameLoadInfo>();

    /** 节点列表 */
    private book: Map<string, FrameLoadInfo> = new Map();

    /** 等待父节点的列表 */
    private waitParent: Map<string, FrameLoadInfo[]> = new Map();

    /** 等待某个节点加载完成 */
    private waitNodeList: Map<string, ((info: FrameLoadInfo) => void)[]> = new Map();

    /** 裁剪列表 */
    private cullList: FrameLoadInfo[] = [];

    /** 加载进度 */
    private step: number;


    /**
     * 构造函数
     * @param cfg 配置文件
     * @param cullType 裁剪类型
     * @param stayGuid 是否保留 guid
     */
    constructor(cfg: any, cullType: NodeCullType, stayGuid: boolean) {

        // 初始化裁剪类型，和自己的配置数据
        const cfgArr = cfg.PrefabData.Scene;
        let rootCfg = cfgArr[0];
        for (let k in cfgArr) {
            if (!cfgArr[k].ParentGuid) {
                rootCfg = cfgArr[k];
                break;
            }
        }
        super(rootCfg, null, cullType, stayGuid);
        this.root = this;
        this.book.set(rootCfg.Guid, this);

        if (SystemUtil.isServer() || cullType == NodeCullType.None || cullType == null) {
            this.cullType = NodeCullType.None;
        } else {
            this.cullType = cullType;
        }

        // 添加子节点
        let list: FrameLoadInfo[] = [];
        const scriptList: FrameLoadInfo[] = [];
        const script: Map<string, FrameLoadInfo> = new Map();
        const scriptArg: Map<string, any> = new Map();
        cfg.PrefabData.Scene.forEach(element => {
            if (SystemUtil.isServer() && element.MWNetStatus == 1) {
                return;
            } else if (SystemUtil.isClient() && element.MWNetStatus == 0) {
                return;
            }

            const component = element.Script?.ScriptComponent;
            if (component) {
                for (let k in component) {
                    scriptArg.set(k, component[k]);
                }
            }
            const component2 = element.Script?.StaticScriptComponent;
            if (component2) {
                for (let k in component2) {
                    scriptArg.set(k, component2[k]);
                }
            }

            if (element.ParentGuid) {
                const info = new FrameLoadInfo(element, this, cullType, stayGuid);
                if (element.SourceType == "Script") {
                    scriptList.push(info);
                } else {
                    list.push(info);
                }
                this.book.set(element.Guid, info);
                if (element.SourceType == "Script") {
                    script.set(element.Guid, info);
                }
            }
        });
        list = list.concat(scriptList);
        scriptArg.forEach((v, k) => {
            const it = script.get(k);
            if (it) {
                it.cfg["__componentArg"] = v;
            }
        });

        // 处理加载回调
        if (this.cullType == NodeCullType.None) {
            this.step = list.length || 1;
            list.splice(0, 0, this);
            list.forEach(info => info.load());
            this.onNodeLoad.add((go: FrameLoadInfo) => {
                if (go == this) {
                    this.ready.over();
                }
                this.step--;
                if (this.step == 0) {
                    this.book.forEach(info => {
                        if (info.root != info && !(info.node instanceof mw.Script) && info.node) {
                            info.setParent(this.book.get(info.cfg.ParentGuid).node);
                        }
                    });
                    this.childReady.over();
                }
            });

        } else {
            this.load().then(() => {
                this.ready.over();
                this.childReady.over();
            });
        }

        // 定义回调
        this.onNodeLoad.add(this.onItemLoad);
        this.onNodeDestroy.add(this.onItemDestroy);
    }

    /**
     * 等待某个节点加载完成
     * @param guid 节点 guid
     * @returns 
     */
    public async waitNode(guid: string): Promise<FrameLoadInfo> {
        const info = this.book.get(guid);
        if (info.node) {
            return info;
        }

        return new Promise<FrameLoadInfo>((resolve, reject) => {
            let ls = this.waitNodeList.get(guid);
            if (!ls) {
                ls = [];
                this.waitNodeList.set(guid, ls);
            }
            ls.push(resolve);
        });
    }


    /**
     * 当元素加载成功
     * @param info 
     */
    private onItemLoad = (info: FrameLoadInfo) => {
        if (!info.node) {
            return;
        }

        // 添加自己的父节点
        if (info.cfg.ParentGuid) {
            const parent = this.book.get(info.cfg.ParentGuid);
            if (parent) {
                info.setParent(parent.node);
            } else {
                let ls = this.waitParent.get(info.cfg.ParentGuid);
                if (!ls) {
                    ls = [];
                    this.waitParent.set(info.cfg.ParentGuid, ls);
                }
                ls.push(info);
            }
        } else {
            info.setParent(null);
        }

        // 添加子节点
        this.book.set(info.cfg.Guid, info);
        this.waitParent.get(info.cfg.Guid)?.forEach(e => {
            e.setParent(info.node);
        });

        if (this.cullType != NodeCullType.None) {
            this.cullList.push(info);
        }

        this.waitNodeList.get(info.cfg.Guid)?.forEach(e => e(info));
        this.waitNodeList.delete(info.cfg.Guid);
    }

    /**
     * 当元素销毁的时候
     * @param info 被销毁的元素
     */
    private onItemDestroy = (info: FrameLoadInfo) => {
        for (let [k, v] of this.book) {
            if (v == info) {
                this.book.delete(k);
                break;
            }
        }

        this.waitParent.forEach(e2 => {
            e2.forEach((e, i) => {
                if (e == info) {
                    e2.splice(i, 1);
                }
            });
        })

        const index = this.cullList.indexOf(info);
        if (index >= 0) {
            this.cullList.splice(index, 1);
        }
        if (info == this) {
            this.book.forEach(e => {
                e.isDestroy = true;
                this.childReady.over();
                FrameLoad.instance.removeNode(e);
            });
        }
    }

}

/** 加载信息类型 */
class LoadItem {
    constructor(public info: FrameLoadInfo, public revole: (go: mw.GameObject | Script) => void) { }
}

/**  */
export class FrameLoad {

    /** 单例 */
    public static instance: FrameLoad = new FrameLoad();

    /** 每帧间隔时间 (s) */
    public frameMaxTime: number = 0.3;

    /** 每帧加入队列的最大数量 */
    public addLoad: number = 2;

    /** 每帧同时加载的最大数量 */
    public loadCountMax: number = 5;

    /** 加载列表 */
    private loadList: LoadItem[] = [];

    /** 计时器 */
    private loadTimer: TimerOnly = new TimerOnly();

    /** 当前加载的数量 */
    private nowLoadCount: number = 0;


    constructor() {

        // 重写销毁函数
        const destroyCall = mw.GameObject.prototype.destroy;
        mw.GameObject.prototype.destroy = function () {
            destroyCall.call(this);
            const info = (this as any)["__frameLoadInfo"];
            if (!info) {
                return;
            }
            info.onDestroy();
        }

    }

    /**
     * 创建一个对象
     * @param prefabStr 预制件字符串
     * @param cullType 裁剪类型
     * @param stayGuid 是否保留 guid
     * @returns 返回等待创建的节点信息
     */
    public async asyncSpawn(prefabStr: string, cullType: NodeCullType = NodeCullType.None, stayGuid: boolean = false): Promise<GameObject> {
        const str = prefabStr.replace(/'/g, '"');
        const json = JSON.parse(str);

        const root = new FrameLoadRoot(json, cullType, stayGuid);
        await root.ready.ready();

        return root.node as GameObject;
    }

    /**
     * 等待子节点加载完成
     * @param go 被等待的节点
     * @returns 
     */
    public async asyncReady(go: GameObject) {
        await go.asyncReady();
        const info = (go as any)["__frameLoadInfo"];
        if (!info) {
            return;
        }
        await info.root.childReady.ready();
    }

    /**
     * 异步加载一个节点
     * @param info 加载的节点
     * @returns 
     */
    public async loadNode(info: FrameLoadInfo): Promise<mw.GameObject | Script> {
        if (!this.loadTimer.isRunning) {
            this.loadTimer.setInterval(this.onLoadNode, 1);
        }
        return new Promise<mw.GameObject | Script>((revole) => {
            this.loadList.push(new LoadItem(info, revole));
        });
    }

    /**
     * 删除加载列表中的元素
     * @param info 删除的节点
     * @returns 
     */
    public removeNode(info: FrameLoadInfo): void {
        const index = this.loadList.findIndex(e => e.info == info);
        if (index >= 0) {
            this.loadList.splice(index, 1);
        }
    }


    /**
     * 分帧加载
     */
    private onLoadNode = async () => {
        // 校验帧间隔时间
        if (TimeUtil.deltatime() > this.frameMaxTime || this.nowLoadCount >= this.loadCountMax) {
            return;
        }

        for (let i = 0; i < this.addLoad; i++) {
            if (this.loadList.length == 0) {
                this.loadTimer.stop();
                return;
            }

            const it = this.loadList.shift();
            this.nowLoadCount++;

            this.spawnNode(it.info).then((node) => {
                this.nowLoadCount--;
                it.revole(node);
            });
            if (this.nowLoadCount >= this.loadCountMax) {
                return;
            }
        }
    }

    /**
     * 异步加载资源
     * @param guid 被加载的 guid
     * @returns 是否加载成功
     */
    private async loadAsset(guid: string): Promise<boolean> {
        if (mw.AssetUtil.assetLoaded(guid)) {
            return true;
        } else {
            return await mw.AssetUtil.asyncDownloadAsset(guid);
        }
    }

    /**
     * 异步创建节点
     * @param cfg 节点配置
     * @returns 
     */
    private async spawnNode(info: FrameLoadInfo): Promise<GameObject | Script> {
        let go: mw.GameObject | Script = null;
        const cfg = info.cfg;

        // 加载模型
        try {
            if (cfg.StaticMesh) {
                if (!info.stayGuid) {
                    go = (await mw.GameObject.asyncSpawn(cfg.StaticMesh.Asset)) as mw.Model;
                } else {
                    go = await WaitCall.wait<mw.Model>((revole) => {
                        // @ts-ignore
                        UE.MetaWorldStatics.BeginSpawnActorWithGuid(cfg.StaticMesh.Asset, (success, actor) => {
                            revole(GameObject.findGameObjectById(actor.GetGuid()))
                        }, cfg.MWNetStatus, false, info.cfg.Guid);
                    })
                }
                const model: mw.Model = go as mw.Model;
                for (let k in cfg.StaticMesh.Materials) {
                    const matrl = cfg.StaticMesh.Materials[k];
                    await this.loadAsset(matrl);
                    model.setMaterial(matrl, parseInt(k));
                }
                await model.asyncReady();
                model.worldTransform.position = new mw.Vector(-100000, -100000, -100000);
                go = model;

            } else if (cfg["Audio Spatialization"] != null) {
                if (!info.stayGuid) {
                    go = await mw.GameObject.asyncSpawn(cfg.Asset) as mw.Sound;
                } else {
                    go = await WaitCall.wait<mw.GameObject>((revole) => {
                        // @ts-ignore
                        UE.MetaWorldStatics.BeginSpawnActorWithGuid(cfg.Asset, (success, actor) => {
                            revole(GameObject.findGameObjectById(actor.GetGuid()))
                        }, cfg.MWNetStatus, false, info.cfg.Guid);
                    })
                }
                const sound: mw.Sound = go as mw.Sound;
                await sound.asyncReady();
                sound.worldTransform.position = new mw.Vector(-100000, -100000, -100000);
                this.initAudio(sound, cfg);
                go = sound;

            } else if (cfg.Script?.Somatotype != null) {
                const npc = await mw.GameObject.asyncSpawn(cfg.Asset) as mw.Character;
                await npc.asyncReady();
                npc.worldTransform.position = new mw.Vector(-100000, -100000, -100000);
                this.initNpc(npc, cfg);
                go = npc;

            } else if (cfg.SourceType == "Script") {
                const parent = await info.root.waitNode(cfg.ParentGuid);
                const script = await mw.Script.spawnScript(cfg.ScriptAsset || cfg.Asset, true, parent.node as GameObject);
                this.setScriptArg(script, cfg.__componentArg);
                go = script;

            } else if (cfg.Asset) {
                if (!info.stayGuid) {
                    go = await mw.GameObject.asyncSpawn(cfg.Asset);
                } else {
                    go = await WaitCall.wait<mw.GameObject>((revole) => {
                        // @ts-ignore
                        UE.MetaWorldStatics.BeginSpawnActorWithGuid(cfg.Asset, (success, actor) => {
                            revole(GameObject.findGameObjectById(actor.GetGuid()))
                        }, cfg.MWNetStatus, false, info.cfg.Guid);
                    })
                }
                await go.asyncReady();
                go.worldTransform.position = new mw.Vector(-100000, -100000, -100000);

                this.initEffect(go, cfg);
                this.initWorldUI(go, cfg);
            }

        } catch (e) {
            console.error(e);
        }
        return go;
    }

    /**
     * 初始化特效
     * @param node 
     * @param cfg 
     */
    private initEffect(go: mw.GameObject, cfg: any) {
        if (cfg.Effects) {
            const effect = go as Effect;
            effect.loop = cfg.Loop;
            // const color = cfg["Effect color"];
            // effect.setColor(new mw.LinearColor(color.R, color.G, color.B, color.A));
            if (cfg.Autoactivation) {
                effect.play();
            } else {
                effect.stop();
            }
        }
    }

    /**
     * 初始化特效
     * @param node 
     * @param cfg 
     */
    private initWorldUI(go: mw.GameObject, cfg: any) {
        if (cfg.Asset == "UIWidget") {
            const widget = go as mw.UIWidget;
            widget.setUIbuGUID(cfg["Bind UI objects"].Guid);
            widget.selfOcclusion = cfg["是否可被遮挡"];
            widget.scaledByDistanceEnable = cfg["是否开启近大远小"];
            widget.hideByDistanceEnable = cfg["是否开启最大可见距离"];
            widget.headUIMaxVisibleDistance = cfg["最大可见距离"];
        }
    }

    /**
     * 初始化音频
     * @param sound 
     * @param cfg 
     */
    private initAudio(sound: mw.Sound, cfg: any) {
        sound.isLoop = cfg.Loop;
        sound.isSpatialization = cfg["Audio Spatialization"];
        sound.attenuationShape = cfg["Attenuation Shape"];
        sound.falloffDistance = cfg["Falloff Distance"];
        sound.attenuationDistanceModel = cfg["Falloff Model"];
        sound.attenuationShapeExtents = this.toVector(cfg["Audio Extents"]);
        if (cfg.bAutoPlay) {
            sound.play();
        }
    }

    /**
     * 初始化音频
     * @param sound 
     * @param cfg 
     */
    private async initNpc(npc: mw.Character, cfg: any) {
        npc.description.advance.base.characterSetting.somatotype = cfg.Somatotype;
        if (cfg["bUse233Role"]) {
            AccountService.downloadData(npc, (success) => {
                console.log(`download 233 platform data ${success}`);
            });
        } else {
            const appearance: string[] = [];
            const appearanceCfg = cfg["Script"]["appearancePart"];
            for (let k in appearanceCfg) {
                appearance.push(appearanceCfg[k]);
            }
            for (let i = 0; i < appearance.length; i++) {
                await AssetUtil.asyncDownloadAsset(appearance[i])
                await AssetUtil.assetLoaded(appearance[i]);
            }
            npc.setDescription(appearance);
            npc.syncDescription();
        }

        npc.displayName = cfg["repCharacterName"];
        npc.canJumpOutOfWater = cfg["repEnableJumpingOutOfWater"];
        npc.movementEnabled = cfg["repEnableMove"];
        npc.maxWalkSpeed = cfg["repMaxWalkSpeed"];
        npc.maxFlySpeed = cfg["repMaxFlySpeed"];
        npc.maxSwimSpeed = cfg["repMaxSwimSpeed"];
        npc.maxFallingSpeed = cfg["repMaxFallingSpeed"];
        npc.maxWalkSpeedCrouched = cfg["repMaxWalkSpeedCrouched"];
        npc.brakingDecelerationWalking = cfg["repBrakingDecelerationWalking"];
        npc.brakingDecelerationFlying = cfg["repBrakingDecelerationFlying"];
        npc.brakingDecelerationSwimming = cfg["repBrakingDecelerationSwimming"];
        npc.horizontalBrakingDecelerationFalling = cfg["repBrakingDecelerationFalling"];
        npc.maxStepHeight = cfg["repMaxStepHeight"];
        npc.walkableFloorAngle = cfg["repWalkableFloorAngle"];
        npc.groundFriction = cfg["repGroundFriction"];
        npc.groundFrictionEnabled = cfg["edGroundFrictionEnabled"];
        npc.driftControl = cfg["repAirControl"];
        npc.maxAcceleration = cfg["repMaxAcceleration"];
        npc.gravityScale = cfg["repGravityScale"];
        npc.jumpEnabled = cfg["repEnableJump"];
        npc.maxJumpHeight = cfg["repMaxJumpHeight"];
        npc.jumpMaxCount = cfg["repJumpMaxCount"];
        npc.crouchEnabled = cfg["repEnableCrouch"];
        npc.moveFacingDirection = cfg["repMoveFacingDirection"];
        npc.movementDirection = cfg["repMovementDirection"];
        // npc.movementAxisDirection = this.toVector(cfg["repMovementAxisDirection"]);
        npc.collisionWithOtherCharacterEnabled = cfg["repEnableCollisionWithOtherCharacter"];
    }

    /**
     * 转向量
     * @param cfg 配置
     * @returns 
     */
    private toVector(cfg) {
        return new Vector(cfg.X, cfg.Y, cfg.Z);
    }

    /**
     * 转旋转
     * @param cfg 配置
     * @returns 
     */
    private toRotation(cfg) {
        return new Rotation(cfg.X, cfg.Y, cfg.Z);
    }

    /**
     * 递归设置脚本参数
     * @param script 被设置的脚本
     * @param arg 参数
     * @returns 
     */
    private setScriptArg(script: any, arg: any) {
        if (!arg) { return; }

        const isArray = Array.isArray(script);
        for (let k in arg) {
            if (isArray) {
                const k1 = Number(k);
                if (!isNaN(k1)) {
                    this.objectCopy(script, k1, arg, k);
                    break;
                }

            } else {
                const key = k.toLowerCase();
                for (let k2 in script) {
                    if (k2.toLowerCase() == key) {
                        this.objectCopy(script, k2, arg, k);
                        break;
                    }
                }
            }
        }
    }

    private objectCopy(script, scriptKey, arg, argKey) {
        if (typeof (script[scriptKey]) == "object") {
            const type = typeof (arg[argKey])
            if (type == "object") {
                this.setScriptArg(script[scriptKey], arg[argKey]);
            } else if (type == "string") {
                this.setScriptArg(script[scriptKey], JSON.parse(arg[argKey]));
            } else {
                script[scriptKey] = arg[argKey];
            }
        } else {
            script[scriptKey] = arg[argKey];
        }
    }

}
