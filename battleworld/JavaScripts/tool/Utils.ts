import { GeneralManager, } from '../Modified027Editor/ModifiedStaticAPI';
import { PlayerManagerExtesion, } from '../Modified027Editor/ModifiedPlayer';
import { oTrace } from "odin";
import { GameConfig } from "../config/GameConfig";
import { Globaldata } from "../const/Globaldata";

export const GoPool = mwext.GameObjPool;

export namespace util {
    /**
 * 类装饰器-自动init，可以自动调用类的静态init方法
 * @param target 类目标
 */

    export type Vector3Like = { x: number, y: number, z: number }

    export function AutoInit(target) {
        if (target["init"] != null) {
            target["init"]();
        }
    }

    /**
    * 从一个gameObject上根据路径找一个脚本（Server & Client）
    * @param go GameObject
    * @param path 脚本路径
    * @returns 脚本对象
    */
    export function findScriptFromGo_sync(go, path) {
        if (go == null || mw.StringUtil.isEmpty(path))
            return null;
        let arr = path.split('/');
        let sp;
        for (let i = 0; i < arr.length; i++) {
            if (i == arr.length - 1) {
                sp = go.getScriptByName(`${arr[i]}.ts`);
                if (sp == null)
                    sp = go.getScriptByName(arr[i]);
                if (sp == null) {
                    console.error('FindSceneObjScriptError path=' + path + "   -tsFile:" + arr[i]);
                    return null;
                }
            }
            else {
                if (arr[i] == '..') {
                    go = go.parent;
                }
                else {
                    go = go.getChildByName(arr[i]);
                }
                if (go == null) {
                    console.error('FindSceneObjScriptError path=' + path + "   -node:" + arr[i]);
                    return null;
                }
            }
        }
        return sp;
    }

    export interface Vector2Like {
        x: number
        y: number
    }

    export function distanceXY(a: Vector2Like, b: Vector2Like): number {
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }

    export function distanceNumberXY(ax: number, ay: number, bx: number, by: number): number {
        return Math.abs(ax - bx) + Math.abs(ay - by)
    }

    // 数字插值
    export function lerp(from: number, to: number, time: number): number {
        return (to - from) * time + from
    }

    // [0-1]
    export function pingPong(t: number): number {
        return Math.abs(t % 1 - 0.5) * 2
    }

    //cycle为一个周期
    export function shake(t: number, cycle: number) {
        let floor = Math.floor(t / cycle) % 2
        let ping = Math.abs((t + 0.75) % 1 - 0.5) * 2;
        return Math.min(floor + ping, 1 - (floor * 0.5));
    }

    // 根据秒数转换成MM:SS
    export function toMM_SSText(second: number): string {
        let str: string;
        if (second < 60) {
            return second.toString()
        }

        let min = Math.floor(second / 60);
        let sec = second - min * 60;
        let str1 = min < 10 ? "0" + min : min;
        let str2 = sec < 10 ? "0" + sec : sec;
        str = str1 + ":" + str2;
        return str;
    }

    /**
     * 播放配置表音效
     * @param soundCfgId 音效表id 
     */
    export async function playSoundByConfig(soundCfgId: number, target?: string | mw.GameObject | mw.Vector) {
        let soundCfg = GameConfig.Sound.getElement(soundCfgId);
        if (soundCfg == null) return;


        if (soundCfg.range == null || soundCfg.range == 0) {
            mw.SoundService.playSound(soundCfg.guid, soundCfg.loopCount, soundCfg.volume);
            return;
        }

        if (target == null) {
            console.error("playSoundByConfig target is null", soundCfgId);
            return;
        }

        // 播放3D音效
        let playParam = {
            innerRadius: 0,
            falloffDistance: soundCfg.range
        }

        let soundId = mw.SoundService.play3DSound(soundCfg.guid, target, soundCfg.loopCount == 0 ? 0 : 1, soundCfg.volume, playParam);

        if (soundCfg.loopCount > 1) {
            let maxCount = soundCfg.loopCount;
            let curCount = 1;
            let sound = await mw.SoundService.get3DSoundById(soundId);
            sound.onFinish.add(() => {
                if (curCount >= maxCount) {
                    mw.SoundService.stop3DSound(soundId);
                    return
                }
                curCount++;
                sound.play();
            })
        }
    }

    /**播放2d音效 */
    export function play2DSoundByConfig(soundCfgId: number) {
        let soundCfg = GameConfig.Sound.getElement(soundCfgId);
        if (soundCfg == null) return;
        return mw.SoundService.playSound(soundCfg.guid, soundCfg.loopCount, soundCfg.volume);
    }

    /**
     * 同步播放动画 
     * @param owner 播放者
     * @param animationGuid 动画guid
     * @param loop 是否循环
     * @param rate 动画速率
     */
    export function playAnimation(owner: mw.Character, animationGuid: string, loop: number, rate: number) {
        if (owner === undefined || owner === null) return;
        let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, true)
        anim.loop = loop;
        anim.speed = rate;
        anim.play();
        return anim;
    }


    /**
     * 本地播放动画
     * @param owner 播放者
     * @param animationGuid 动画guid
     * @param loop 是否循环
     * @param rate 动画速率
     */
    export function playAnimationLocally(owner: mw.Character, animationGuid: string, loop: number, rate: number) {
        if (owner === undefined || owner === null) return;
        let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, false)
        anim.loop = loop;
        anim.speed = rate;
        anim.play();
        return anim;
    }

    /**
    * 本地播放动画
    * @param owner 播放者
    * @param animationGuid 动画guid
    * @param loop 是否循环
    * @param time 时间  
    */
    export function playAnimationLocally2(owner: mw.Character,
        animationGuid: string, loop: number, time: number,
        slot: mw.AnimSlot = mw.AnimSlot.Default) {
        if (owner === undefined || owner === null) return;
        let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, false)
        anim.loop = loop;
        if (slot >= 0) {
            anim.slot = slot;
        }
        anim.speed = anim.length / time;
        anim.play();
        return anim;
    }

    /**
    * 本地播放动画
    * @param owner 播放者
    * @param animationGuid 动画guid
    * @param loop 是否循环
    * @param time 时间  
    */
    export function playAnimationLocally3(owner: mw.Character,
        animationGuid: string, loop: number, time: number,
        slot: mw.AnimSlot = mw.AnimSlot.Default) {
        if (owner === undefined || owner === null) return;
        let anim = PlayerManagerExtesion.loadAnimationExtesion(owner, animationGuid, false)
        anim.loop = loop;
        if (slot >= 0) {
            anim.slot = slot;
        }
        anim.speed = anim.length / time;
        anim.play();
        return anim;
    }

    /**
     * 数组转位置，旋转，缩放
     * @param arr 9位数组
     * @returns 转换后的结构
     */
    export function mathTools_arryToVector(arr: Array<number>): { loc: mw.Vector, Roc: mw.Rotation, Scale: mw.Vector } {
        if (arr.length == 9) {
            let newArr: { loc: mw.Vector, Roc: mw.Rotation, Scale: mw.Vector } = { loc: new mw.Vector(arr[0], arr[1], arr[2]), Roc: new mw.Rotation(arr[3], arr[4], arr[5]), Scale: new mw.Vector(arr[6], arr[7], arr[8]) };
            return newArr;
        } else {
            console.error(`mathTools_arryToVector :: ==== :: error `);
        }
    }


    export function vector2World(vector: Vector3Like, worldPosition: mw.Vector, forward: mw.Vector, right: mw.Vector): mw.Vector {
        return new mw.Vector(
            vector.x * forward.x + vector.y * right.x + worldPosition.x,
            vector.x * forward.y + vector.y * right.y + worldPosition.y,
            vector.x * forward.z + vector.y * right.z + vector.z + worldPosition.z,
        )
    }
    /**
     * 触发器判断  作用于客户端
     * @param obj 触发物
     * @returns 判断结果
     */
    export const isCharacter = (obj: mw.GameObject) => {
        if (!obj) return false;
        if (!(PlayerManagerExtesion.isCharacter(obj))) return false;
        let player = (obj as mw.Character).player;
        if (player != Player.localPlayer) return false;
        return true;
    }

    /**
    * 时间cd器
    */
    export class CdElement {
        private currentTime: number;
        constructor(
            private cdTime: number,
        ) {
            this.currentTime = Date.now();
        }
        /**cd 处理 */
        handle() {
            let now = Date.now();
            if (now - this.currentTime > this.cdTime * 1000) {
                this.currentTime = now;
                return true;
            }
            else { return false; }
        }
    }
    /**
     * 时间cd器
     */
    export class TimerElement {
        private timer: number = 0
        private ispress: boolean = false
        /**长按判定时间 */
        private pressTimer: number = 0.3

        private funcOverTimePress: () => void
        private funcInTimePress: () => void

        constructor(funcOverTimePress: () => void, funcInTimePress: () => void, time: number) {
            this.funcInTimePress = funcInTimePress;
            this.funcOverTimePress = funcOverTimePress;
        }

        startTime() {
            this.ispress = true;
            this.timer = 0;
        }

        endTime() {
            this.ispress = false;
            if (this.timer < this.pressTimer && this.timer != 0) {
                this.timer = 0;
                if (this.funcInTimePress) {
                    this.funcInTimePress()
                }
            }
        }

        /**cd 处理 */
        handle(dt: number) {
            if (this.ispress) {
                this.timer += dt;
                if (this.timer >= this.pressTimer) {
                    this.timer = 0;
                    this.ispress = false;
                    if (this.funcOverTimePress) {
                        this.funcOverTimePress()
                    }
                }
            }
        }


    }

    /**
      * 倒计时器
      */
    export class IntervalElement {

        private time: number = null;

        private interval: number = null;

        private interval_key: any = null;

        private funcOverTimePress: () => void

        private funcInTimePress: (time: number) => void

        constructor(time: number, interval: number, funcOverTimePress: () => void, funcInTimePress: (time: number) => void) {
            this.time = time;
            this.interval = interval;
            this.funcOverTimePress = funcOverTimePress;
            this.funcInTimePress = funcInTimePress;
        }

        start() {
            this.clear_Interval_Key()
            this.interval_key = TimeUtil.setInterval(() => {
                this.time -= this.interval;
                if (this.time <= 0) {
                    this.time = 0;
                    this.clear_Interval_Key()
                    if (this.funcOverTimePress) {
                        this.funcOverTimePress()
                    }
                } else {
                    if (this.funcInTimePress) {
                        this.funcInTimePress(this.time)
                    }
                }
            }, this.interval);
        }

        private clear_Interval_Key() {
            if (this.interval_key != null) {
                TimeUtil.clearInterval(this.interval_key);
                this.interval_key = null;
            }

        }

        clear() {
            this.clear_Interval_Key();
            this.time = null;
            this.interval = null;
            this.funcInTimePress = null;
            this.funcOverTimePress = null;
        }

    }



    /**
 * 异步加载资源
 * @param assets 需要加载的资源
 * @param callback 加载进度回调方法
 * @returns 
 */
    export function downLoadAllAsset(assets: string[], callback: (progress: number) => void = null): Promise<void> {
        if (!assets || assets.length <= 0) {
            callback && callback(1);
            return;
        }
        return new Promise<void>(async res => {
            let length = assets.length;
            let index = -1;
            for (const guid of assets) {
                index++;
                callback && callback(index / length);
                if (!mw.AssetUtil.assetLoaded(guid)) {
                    await mw.AssetUtil.asyncDownloadAsset(guid)
                }
            }
            res();
        })
    }


    /*
 * 缩略字符
 * @param str 
 * @param limit 限制长度
 * @returns 
 */
    export function breviaryString(str: string, limit: number): string {
        if (str.length > limit) {
            return str.slice(0, limit) + "...";
        } else {
            return str;
        }
    }



    export let linearVector: mw.Vector = mw.Vector.zero;
    /**
     * 扇形射线检测
     * @param Source 检测源
     * @param startLoc 起始坐标
     * @param dir 方向
     * @param radius 检测半径
     * @param angle 角度
     * @param debug 是否显示可视化绘制
     * @param limitAngle 射线检测角度间隔（越小检测越精细（耗性能），默认10）
     * @returns hitResults数组
     */
    export function sectorLineTrace(Source: mw.GameObject, startLoc: mw.Vector,
        dir: mw.Vector,
        radius: number,
        angle: number,
        debug: boolean = false, limitAngle: number = 10) {

        if (angle <= 0) {
            return [];
        }

        mw.Vector.multiply(dir, radius, this.linearVector);
        mw.Vector.add(startLoc, this.linearVector, this.linearVector);
        let hitResults = QueryUtil.lineTrace(startLoc, this.linearVector, true, debug, [], false, false, Source);

        let halfAngle = angle / 2;
        let halfCount = 0;


        if (halfAngle <= limitAngle) {
            halfCount = 2;
        } else {
            halfCount = Math.floor(halfAngle / limitAngle);
            halfAngle = limitAngle;
        }

        let rot1 = new mw.Rotation(new mw.Vector(0, 0, 0));
        for (let index = 0; index < halfCount; index++) {
            rot1.z += halfAngle;
            mw.Quaternion.multiplyVector(dir, rot1.toQuaternion(), this.linearVector);
            mw.Vector.multiply(this.linearVector, radius, this.linearVector);

            mw.Vector.add(startLoc, this.linearVector, this.linearVector);
            let results = QueryUtil.lineTrace(startLoc, this.linearVector, true, debug, [], false, false, Source);
            hitResults = hitResults.concat(results);

        }

        rot1.z = 0;
        for (let index = 0; index < halfCount; index++) {
            rot1.z -= halfAngle;
            mw.Quaternion.multiplyVector(dir, rot1.toQuaternion(), this.linearVector);
            mw.Vector.multiply(this.linearVector, radius, this.linearVector);

            mw.Vector.add(startLoc, this.linearVector, this.linearVector);
            let results = QueryUtil.lineTrace(startLoc, this.linearVector, true, debug, [], false, false, Source);
            hitResults = hitResults.concat(results);
        }

        return hitResults.removeDuplication((value, hashTable, arr) => {
            if (hashTable[value.gameObject.gameObjectId] == null) {
                hashTable[value.gameObject.gameObjectId] = true;
                arr.push(value);
            }
        });
    }

    export class SaveTime {
        public static clickBtnTime: number = 0;
    }

    export class ParryBoolean {
        public static isParrySucc: boolean = false;
        public static isDefenseSucc: boolean = false;
        public static canParry: boolean = true;
    }

    export function checkAngle(aForward: mw.Vector, dir: mw.Vector, angle: number) {
        let newAngle = mw.Vector.angle(dir, aForward);
        if (newAngle >= 180 - angle / 2) {
            return true;
        }
        return false;
    }

    export function playEffectOnScenceUint(player: mw.Character | mw.GameObject, cfgID: number) {
        let effectId = cfgID;
        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }


        Globaldata.tmpRotation.x = effectcfg.EffectRotate.x;
        Globaldata.tmpRotation.y = effectcfg.EffectRotate.y;
        Globaldata.tmpRotation.z = effectcfg.EffectRotate.z;
        let id = null
        if (player instanceof mw.Pawn) {
            id = GeneralManager.rpcPlayEffectOnPlayer(
                effectcfg.EffectID,
                player as any,
                effectcfg.EffectPoint,
                effectcfg.EffectTime,
                effectcfg.EffectLocation,
                Globaldata.tmpRotation,
                effectcfg.EffectLarge);
        } else {
            id = GeneralManager.rpcPlayEffectOnGameObject(
                effectcfg.EffectID,
                player as any,
                effectcfg.EffectTime,
                effectcfg.EffectLocation,
                Globaldata.tmpRotation,
                effectcfg.EffectLarge
            )
        }

        if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
            EffectService.getEffectById(id).then((effect) => {
                if (effect) {
                    effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
                } else {
                    console.error("utils:playEffectOnScenceUint ", effectId, effectcfg.EffectID);
                }

            });
        }

        return id
    }
    export function playEffectOnPlayer(playerID: number, cfgID: number) {
        let effectId = cfgID;
        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }

        Globaldata.tmpRotation.x = effectcfg.EffectRotate.x;
        Globaldata.tmpRotation.y = effectcfg.EffectRotate.y;
        Globaldata.tmpRotation.z = effectcfg.EffectRotate.z;


        let id = GeneralManager.rpcPlayEffectOnPlayer(
            effectcfg.EffectID,
            Player.getPlayer(playerID),
            effectcfg.EffectPoint,
            effectcfg.EffectTime,
            effectcfg.EffectLocation,
            Globaldata.tmpRotation,
            effectcfg.EffectLarge);


        if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
            EffectService.getEffectById(id).then((effect) => {
                if (effect) {
                    effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
                } else {
                    console.error("utils:playEffectOnPlayer ", effectId, effectcfg.EffectID);
                }
            });
        }

        return id
    }

    /**播放特效在某个位置 */
    export function playEffectOnGameObject(effectId: number, target: mw.GameObject) {

        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }


        let id = GeneralManager.rpcPlayEffectOnGameObject(
            effectcfg.EffectID,
            target,
            effectcfg.EffectTime,
            effectcfg.EffectLocation,
            effectcfg.EffectRotate.toRotation(),
            effectcfg.EffectLarge);
        if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
            EffectService.getEffectById(id).then((effect) => {
                if (effect) {
                    effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
                } else {
                    console.error("utils:playEffectOnGameObject ", effectId, effectcfg.EffectID);
                }
            });
        }
        return id
    }

    /**播放特效在某个位置 */
    export function playEffectAtLocation(effectId: number, location: mw.Vector, rot: mw.Rotation = null) {

        let effectcfg = GameConfig.Effect.getElement(effectId);
        if (!effectcfg) {
            oTrace("error effectcfg")
            return
        }
        let effectRot: Rotation = Rotation.zero;
        if (rot) {
            effectRot.x = rot.x;
            effectRot.y = rot.y;
            effectRot.z = rot.z;
        } else {
            effectRot.x = effectcfg.EffectRotate.x;
            effectRot.y = effectcfg.EffectRotate.y;
            effectRot.z = effectcfg.EffectRotate.z;
        }
        let id = GeneralManager.rpcPlayEffectAtLocation(
            effectcfg.EffectID,
            location,
            effectcfg.EffectTime,
            effectRot,
            // rot ? rot : effectcfg.EffectRotate.toRotation(),
            effectcfg.EffectLarge);
        if (StringUtil.isEmpty(effectcfg.ColorValue) == false) {
            EffectService.getEffectById(id).then((effect) => {
                if (effect) {
                    effect.setColor("Color", mw.LinearColor.colorHexToLinearColor(effectcfg.ColorValue));
                } else {
                    console.error("utils:playEffectAtLocation ", effectId, effectcfg.EffectID);
                }

            });
        }

        return id
    }


    /**在一个坐标附近随机坐标 */
    export function getRandomLoc(loc: mw.Vector, radius: number): mw.Vector {
        let x = MathUtil.randomInt(loc.x - radius, loc.x + radius);
        let y = MathUtil.randomInt(loc.y - radius, loc.y + radius);
        return new mw.Vector(x, y, loc.z);
    }

    /**随机获取圆边上的一个点 */
    export function getCircleBorderPoint(loc: mw.Vector, radius: number): mw.Vector {
        let random = Math.random() * 2 * Math.PI;
        let x = loc.x + Math.cos(random) * radius;
        let y = loc.y + Math.sin(random) * radius;
        return new mw.Vector(x, y, loc.z);
    }

    //随机获取圆内一点坐标
    export function getCirclePoint(centerX: number, centerY: number, radius: number, centerZ: number): mw.Vector {
        let random = Math.random() * 2 * Math.PI;
        let x = centerX + Math.cos(random) * radius;
        let y = centerY + Math.sin(random) * radius;
        return new mw.Vector(x, y, centerZ);
    }

    /** 随机获取范围内正方形一点坐标 */
    export function getPointByRange(center: Vector, radius: number, rangeX: Vector2, rangeY: Vector2): mw.Vector {
        let left = Math.max(center.x - radius, rangeX.x);
        let right = Math.min(center.x + radius, rangeX.y);
        let bottom = Math.max(center.y - radius, rangeY.x);
        let top = Math.min(center.y + radius, rangeY.y);
        let x = GetRandomNum(left, right);
        let y = GetRandomNum(bottom, top);
        return new mw.Vector(x, y, center.z);
    }

    /** 随机获取范围内圆外一点 */
    export function getOutCircleP(center: Vector, radius: number, rangeX: Vector2, rangeY: Vector2): mw.Vector {
        if (center.x < rangeX.x || center.x > rangeX.y || center.y < rangeY.x || center.y > rangeY.y) return null;
        let cnt = 0;
        let p1 = new Vector(center.x, center.y);
        let p2 = new Vector(0, 0);
        while (true) {
            cnt++;
            if (cnt > 10000) return null;
            const x = GetRandomNum(rangeX.x, rangeX.y);
            const y = GetRandomNum(rangeY.x, rangeY.y);
            p2.x = x;
            p2.y = y;
            if (Vector.distance(p1, p2) > radius) {
                return new mw.Vector(x, y, center.z);
            }
        }
    }

    /**格式化字符串 */
    export function format(str: string, param: any[]) {
        if (param) {
            let i = 0;
            param.forEach((p) => {
                let vv = param[i];
                str = str.replace("{" + i + "}", vv);
                i++;
            });
        }
        return str;
    }



    /**贝塞尔曲线 */
    export function cubicBezier(p1x, p1y, p2x, p2y) {
        const ZERO_LIMIT = 1e-6;
        const ax = 3 * p1x - 3 * p2x + 1;
        const bx = 3 * p2x - 6 * p1x;
        const cx = 3 * p1x;
        const ay = 3 * p1y - 3 * p2y + 1;
        const by = 3 * p2y - 6 * p1y;
        const cy = 3 * p1y;

        function sampleCurveDerivativeX(t) {
            return (3 * ax * t + 2 * bx) * t + cx;
        }
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function sampleCurveY(t) {
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x) {
            let t2 = x;
            let derivative;
            let x2;
            for (let i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < ZERO_LIMIT) {
                    return t2;
                }
                derivative = sampleCurveDerivativeX(t2);
                if (Math.abs(derivative) < ZERO_LIMIT) {
                    break;
                }
                t2 -= x2 / derivative;
            }
            let t1 = 1;
            let t0 = 0;
            t2 = x;
            while (t1 > t0) {
                x2 = sampleCurveX(t2) - x;
                if (Math.abs(x2) < ZERO_LIMIT) {
                    return t2;
                }
                if (x2 > 0) {
                    t1 = t2;
                } else {
                    t0 = t2;
                }
                t2 = (t1 + t0) / 2;
            }
            return t2;
        }
        function solve(x) {
            return sampleCurveY(solveCurveX(x));
        }
        return solve;
    }


    // /**
    //  * 设置图片为资源库icon
    //  */
    // export function setIcon_modelGuid(icon: mw.Image, cfg: IBagElement) {
    //     if (cfg == null) return;

    //     if (StringUtil.isEmpty(cfg.IconGUID) == false) {
    //         icon.imageGuid = cfg.IconGUID;
    //         return;
    //     }

    //     if (StringUtil.isEmpty(cfg.modelGUID) == false) {
    //         mw.assetIDChangeIconUrlRequest([cfg.modelGUID]).then(() => {
    //             // 获得资源Icon信息
    //             const res = mw.getAssetIconDataByAssetID(cfg.modelGUID);

    //             // 通过资源信息设置 设置图片
    //             icon.setImageByAssetIconData(res);
    //         });
    //     }

    // }


    /***是否当前玩家*/
    export function objectIsCucrrentPlayer(go: mw.GameObject): boolean {
        if (go == null) {
            return false;
        }
        if (PlayerManagerExtesion.isCharacter(go) == false) {
            return false;
        }
        let player = (go as mw.Character).player;
        if (player == null || player.playerId != Player.localPlayer.playerId) {
            return false;
        }
        if (player.character == null) {
            return false;
        }
        return true;
    }

    /***是否当前玩家*/
    export function objectIsPlayer(go: mw.GameObject): boolean {
        if (go == null) {
            return false;
        }
        if (PlayerManagerExtesion.isCharacter(go) == false) {
            return false;
        }
        let player = (go as mw.Character).player;
        if (player == null) {
            return false;
        }
        if (player.character == null) {
            return false;
        }
        return true;
    }

    /** 
     * 将数字转换成标准时间格式00:00
     *  num 为分钟数或者秒数 时:分 / 分:秒  
     */
    export function getFormatTime__HM(num: number): string {
        return `${num / 60 < 10 ? "0" + Math.floor(num / 60) : Math.floor(num / 60)}:${num % 60 < 10 ? "0" + Math.floor(num % 60) : Math.floor(num % 60)}`
    }

    /**  
      * 秒转化为时分秒 00:00:00
      */
    export function secToTime_HMS(second: number): string {

        let h = Math.floor(second / 3600);
        let m = Math.floor((second - h * 3600) / 60);
        let s = second - h * 3600 - m * 60;

        let hStr = h < 10 ? "0" + h : h.toString();
        let mStr = m < 10 ? "0" + m : m.toString();
        let sStr = s < 10 ? "0" + s : s.toString();

        return hStr + ":" + mStr + ":" + sStr;
    }


    export function playEffecstOnPlayer(player: number, array: number[], effectcfgids: number[]) {
        if (array == null) {
            return;
        }
        if (effectcfgids == null) {
            return
        }

        if (array.length > 0) {
            for (let i = 0; i < array.length; i++) {
                EffectService.stop(array[i]);
            }
            array = [];
        }
        for (let index = 0; index < effectcfgids.length; index++) {
            const element = effectcfgids[index];
            let effect = util.playEffectOnPlayer(player, element);
            array.push(effect);
        }
    }

    /**检验姿态重置 */
    export function checkStanceReset(character: mw.Character) {
        if (character == null) return;

        if (character.currentSubStance == null) {
            return;
        }
        character.currentSubStance.stop();


        PlayerManagerExtesion.changeStanceExtesion(character, "")
    }

    /**
     * 返回当前时间（例 13：15）。
     * @returns 
     */
    export function getCurrentTime(): string {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }

    /**
     * 今天是星期几
     * @returns 
     */
    export function getWhatDay(): string {
        let whatDay = "7123456".charAt(new Date().getDay());
        return whatDay;
    }

    /**
     * 返回上次登录是周几
     * @param day 
     * @returns 
     */
    export function getLastDay(day: number): string {
        let whatDay = "7123456".charAt(day);
        return whatDay;
    }

    /**
     * 判断是否同一周
     * @param date1 
     * @param date2 
     * @returns 
     */
    export function iSameWeek(date1, date2): boolean {
        let dt1 = new Date();
        dt1.setTime(date1);
        let dt2 = new Date();
        dt2.setTime(date2);
        let md1 = tmonday(dt1);
        let md2 = tmonday(dt2);
        return md1 === md2;
    }

    export function tmonday(dtm): string {
        let dte = new Date(dtm);
        let day = dte.getDay();
        let dty = dte.getDate();
        if (day === 0) {
            day = 7;
        }
        dte.setDate(dty - day + 1);
        return dte.getFullYear() + '-' + dte.getMonth() + '-' + dte.getDate();
    }

    export function isPremiumMemberSupported(): Promise<boolean> {
        return new Promise<boolean>(resovle => {
            PurchaseService.isPremiumMemberSupported((isSupport) => {
                resovle(isSupport);
            });
        })
    }

    export function isPremiumMember(): Promise<boolean> {
        return new Promise<boolean>(resovle => {
            PurchaseService.isPremiumMember((result) => {
                resovle(result);
            });
        })
    }

    /**
     * 随机获取指定范围内的整数
     * @param Min 起始值
     * @param Max 最大值
     * @returns 随机整数[min, max]
     */
    export function getRandomNum(min: number, max: number): number {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }


    /**计算两个坐标点的中心点 */
    export function midpoint3D(p1: mw.Vector, p2: mw.Vector, outer?: mw.Vector): mw.Vector {
        if (outer) {
            outer.x = (p1.x + p2.x) / 2;
            outer.y = (p1.y + p2.y) / 2;
            outer.z = (p1.z + p2.z) / 2;
            return outer;
        }
        return new mw.Vector((p1.x + p2.x) / 2, (p1.y + p2.y) / 2, (p1.z + p2.z) / 2);
    }

    /**
     * 获取多语言格式化字符串
     * 尽量使用 getLanguageByKey
     */
    export function getLanguageById(id: number | string, param?: any[]) {
        let cfg = GameConfig.Language.getElement(id);
        if (cfg == null) {
            return "多语言表没有id:" + id;
        }
        return param == null ? cfg.Value : util.format(cfg.Value, param);
    }

    /**
     * 获取多语言格式化字符串
     */
    export function getLanguageByKey(key: string, param?: any[]) {
        let res = GameConfig.Language[key];
        return res?.Value == null ? key : param == null ? res.Value : util.format(res.Value, param);
    }

    /**
     * 获取多语言格式化字符串
     */
    export function getLanguageByKeys(keys: string[]) {
        let res: string[] = [];
        for (let i = 0; i < keys.length; i++) {
            let text = GameConfig.Language[keys[i]];
            text = text?.Value == null ? keys[i] : text.Value;
            res.push(text);
        }
        return res;
    }

    /**
     * 从数组获取一定数量的随机ID数组
     * @param array 数组
     * @param count 数量
     * @param isSort 是否排序
     * @returns 返回随机数组
     */
    export function getRandomCountArrayFormArray(array: any[], count: any, isSort: boolean = true): any[] {
        if (count > array.length) {
            return null;
        }
        let randomArray: any[] = [];
        let findCount = 0;

        let func = () => {
            for (let index = 0; index < array.length; index++) {
                const element = array[index];
                let randamIndex = GetRandomNum(0, array.length - 1);

                let t_index = randomArray.findIndex((ele) => {
                    return ele === array[randamIndex];
                })

                if (t_index === -1) {
                    if (findCount >= count) {
                        return;
                    }
                    randomArray.push(array[randamIndex]);
                    findCount++;
                }
            }
        }

        while (findCount < count) {
            func();
        }

        if (isSort) {
            randomArray.sort((a: any, b: any) => {
                return a - b;
            });
        }

        return randomArray;
    }

    /**
     * 随机获取指定范围内的整数
     * @param Min 起始值
     * @param Max 最大值
     * @returns 随机整数[min, max]
     */
    export function GetRandomNum(min: number, max: number): number {
        let Range = max - min;
        let Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    /**
     * 求得长方体内最长对角巷长度
     * @param length 长
     * @param width 宽
     * @param height 高
     * @returns 最长对角线长度
     */
    export function calculateLongestDiagonalLength(length: number, width: number, height: number): number {
        const diagonal1 = Math.sqrt(length * length + width * width + height * height);
        const diagonal2 = Math.sqrt(length * length + width * width);
        const diagonal3 = Math.sqrt(length * length + height * height);
        const diagonal4 = Math.sqrt(width * width + height * height);
        return Math.max(diagonal1, diagonal2, diagonal3, diagonal4);
    }

}


/**判断距离当前日期是否超过一天 */
export function checkDay(stamp: number) {
    let nowDate = new Date(Date.now());
    let stampDate = new Date(stamp);
    return nowDate.getFullYear() > stampDate.getFullYear() || nowDate.getMonth() > stampDate.getMonth() || nowDate.getDate() > stampDate.getDate();
}

/**检测触发触发器的是否是当前玩家(Client) */
export function checkTriggerGo(go: mw.GameObject) {
    if (SystemUtil.isServer()) return false;
    if (go == null || go == undefined || PlayerManagerExtesion.isCharacter(go) == false) return false;
    let player = (go as mw.Character).player;
    let currentPlayer = Player.localPlayer;
    if (player == null || currentPlayer == null || currentPlayer.playerId != player.playerId) return false;
    return true;
}

// 类型函数扩展
declare global {
    interface Array<T> {
        /**数组去重 */
        removeDuplication(filter: (value: T, hashTable: {}, arr: T[]) => void): T[];
        /**数组深拷贝 */
        copy(): T[];
    }

}




/**数组去重 */
Array.prototype.removeDuplication = function (filter: (value, hashTable, arr) => void) {

    var n = {}, r = []; //n為hash表，r為臨時數組
    for (var i = 0; i < this.length; i++) //遍歷當前數組
    {
        filter(this[i], n, r);
    }

    return r;
}
/**数组拷贝 */
Array.prototype.copy = function () {

    let arrs = [];

    for (var i = 0; i < this.length; i++) //遍歷當前數組
    {
        arrs.push(this[i]);
    }

    return arrs;
}

