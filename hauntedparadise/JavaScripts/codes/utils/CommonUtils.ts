/*
 * @Author       : dal
 * @Date         : 2023-11-23 14:10:34
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-02-28 13:54:21
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\CommonUtils.ts
 * @Description  : 
 */

export class ListenContainer {
    private _listenerList: mw.EventListener[] = [];

    public addListener(e: mw.EventListener) {
        this._listenerList.push(e);
    }

    public destroy() {
        this._listenerList.forEach(e => {
            e.disconnect();
        })
        this._listenerList.length = 0;
    }
}

export class CommonUtils {
    public static async checkAssets(...guids: string[]) {
        for (let index = 0; index < guids.length; index++) {
            const element = guids[index];
            if (!AssetUtil.assetLoaded(element)) {
                await AssetUtil.asyncDownloadAsset(element);
            }
        }
    }

    public static distanceNumberXY(ax: number, ay: number, bx: number, by: number): number {
        return Math.abs(ax - bx) + Math.abs(ay - by)
    }

    public static readonly cullDistanceXY = 7000

    /**
     * 用于网络裁剪，过滤一些不需要同步逻辑的玩家
     * @param fromPos 过滤的起始位置
     * @returns 
     */
    public static getRpcPlayerList(fromPos: Vector) {
        let finalPlayerList: Player[] = [];
        for (const player of Player.getAllPlayers()) {
            let playerPos = player.character.worldTransform.position;
            if (playerPos == null) continue;
            let disXY = this.distanceNumberXY(fromPos.x, fromPos.y, playerPos.x, playerPos.y);
            // 过滤超出范围的接收者
            if (disXY > this.cullDistanceXY) continue;
            finalPlayerList.push(player);
        }
        return finalPlayerList;
    }

    /**
     * 判断是不是自己的character
     * @param char 传进来的character
     * @returns 是不是自己
     */
    static isSelfChar(char: mw.GameObject): boolean {
        if (!(char instanceof Character)) return false;
        if (!char.player) return false;
        let selfPlayer = Player.localPlayer;
        if (!selfPlayer) return false;
        if (char.player.playerId != selfPlayer.playerId) return false;
        return true;
    }

    /** 遍历一个obj关闭它的所有特效 */
    public static disableEffFromHost(obj: GameObject) {
        if (obj instanceof Effect) {
            obj.forceStop();
        } else {
            obj.getChildren().forEach(obj => {
                this.disableEffFromHost(obj);
            });
        }
    }

    /** 遍历一个obj开启它的所有特效 */
    public static enableEffFromHost(obj: GameObject) {
        if (obj instanceof Effect) {
            obj.play();
        } else {
            obj.getChildren().forEach(obj => {
                this.enableEffFromHost(obj);
            });
        }
    }

    /** 关闭一个模型的碰撞，支持遍历所有子节点 */
    public static switchCollision(obj: GameObject, collision: boolean, dfs: boolean = false) {
        (obj as Model).setCollision(collision ? CollisionStatus.On : CollisionStatus.Off);
        if (dfs) {
            obj.getChildren().forEach(obj => {
                this.switchCollision(obj, collision, dfs);
            });
        }
    }

    /**
     * 根据一个数组中所有值合计不超过1的数组，随机取一个下标
     * @param rateList 概率数组
     * @returns 随机下标，如果没随机到返回-1
     */
    public static getIdByRateList(rateList: number[]): number {
        let randomNum = Math.random();
        for (let index = 0; index < rateList.length; index++) {
            if (rateList[0] >= randomNum) { return index; }
            else if (index != 0) {
                rateList[index] = rateList[index - 1] + rateList[index];
                if (rateList[index] >= randomNum) { return index; }
            }
        }
        return -1;
    }

    /** 通过指定数组随机获取数组中的一个值 */
    public static getRandomValByArrList(arr: any[]): any {
        return arr[MathUtil.randomInt(0, arr.length)];
    }

    /**
     * 通过cfgId播放音效
     * @param cfgId 配置表id
     */
    public static playSoundByCfgId(cfgId: number) {
        // let cfg = GameConfig.Sound.getElement(cfgId);
        // if (!cfg) {
        //     console.error("没有指定的配置信息")
        //     return;
        // }
        // let vol = 0;
        // if (cfg.vol.length != 0) {
        //     vol = MathUtil.randomFloat(cfg.vol[0], cfg.vol[1]);
        // }
        // else { 
        //     vol = cfg.vol[0];
        // }

        // let soundId = SoundService.play3DSound(cfg.assetid, Player.localPlayer.character, 1, vol);
        // if (cfg.length != 0) {
        //     setTimeout(() => {
        //         SoundService.stop3DSound(soundId);
        //     }, cfg.length*1000);
        // }
    }

    public static rot2Arr(rot: Rotation) {
        let res = [];
        res[0] = rot.x;
        res[1] = rot.y;
        res[2] = rot.z;
        return res;
    }

    public static string2Vec(str: string) {
        let arr = str.split("|");
        return new Vector(Number(arr[0]), Number(arr[1]), Number(arr[2]));
    }

    public static arr2Rot(arr: number[], defaultVal: Rotation = Rotation.zero) {
        if (!arr || arr.length < 3) {
            return defaultVal;
        }
        defaultVal.set(arr[0], arr[1], arr[2]);
        return defaultVal;
    }

    public static vec2Arr(vec: Vector) {
        let res = [];
        res[0] = vec.x;
        res[1] = vec.y;
        res[2] = vec.z;
        return res;
    }

    public static arr2Vec(arr: number[]) {
        return new Vector(arr[0], arr[1], arr[2]);
    }


    public static formatString(str: string, ...param: any[]) {
        if (!str) {
            console.error("没有配置的字符串")
            return "没有配置的字符串";
        }
        return StringUtil.format(str, ...param)
    }


    /**
     * 获得一个打击的力，用于模拟抛物线
     * @param gravity 重力的数值
     * @param speed 速度
     * @param startPos 出发点
     * @param targetPos 目标点
     * @returns 产生的力
     */
    public static getHitForce(gravity: number, speed: number, startPos: mw.Vector, targetPos: mw.Vector): mw.Vector {
        const dis = mw.Vector.distance(startPos, targetPos);
        const costTime = dis / speed;
        const disY = targetPos.z - startPos.z;
        let force = new mw.Vector((targetPos.x - startPos.x) / costTime,
            (targetPos.y - startPos.y) / costTime,
            (disY / costTime) + 0.5 * gravity * costTime);
        return force;
    }

    /**
     * 获得准星过滤了trigger和Character之后的位置
     * @returns 屏幕中间打射线后的第一个位置,如果没有东西，则返回射线的方向
     */
    public static getViewCenterWorldPos(maxDis: number = 1000) {
        let viewPos = mw.getViewportSize().divide(2);

        let res = ScreenUtil.getGameObjectByScreenPosition(viewPos.x, viewPos.y, maxDis, true, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.gameObject instanceof mw.Trigger || element.gameObject instanceof Character) {
                continue;
            }
            if (!element.gameObject) {
                continue;
            }
            return element.position;
        }
        //if (res.length == 0) { 
        let playerLoc = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Head);
        let targetPos = Camera.currentCamera.worldTransform.rotation.getForce().multiply(maxDis).add(playerLoc);
        res = QueryUtil.lineTrace(targetPos, targetPos.clone().add(Vector.down.multiply(maxDis)), true, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.gameObject instanceof mw.Trigger || element.gameObject instanceof Character) {
                continue;
            }
            if (!element.gameObject) {
                continue;
            }
            return element.position;
        }
        return targetPos;
    }

    /**
     * 获得准星过滤了trigger和Character之后的位置
     * @returns 屏幕中间打射线后的第一个位置,如果没有东西，则返回射线的方向
     */
    public static getViewCenterWorldHit(maxDis: number = 1000) {
        let viewPos = mw.getViewportSize().divide(2);

        let res = ScreenUtil.getGameObjectByScreenPosition(viewPos.x, viewPos.y, maxDis, true, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.gameObject instanceof mw.Trigger || element.gameObject instanceof Character) {
                continue;
            }
            if (!element.gameObject) {
                continue;
            }
            return element;
        }
        //if (res.length == 0) { 
        let playerLoc = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Head);
        let targetPos = Camera.currentCamera.worldTransform.rotation.getForce().multiply(maxDis).add(playerLoc);
        res = QueryUtil.lineTrace(targetPos, targetPos.clone().add(Vector.down.multiply(maxDis)), true, true);
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            if (element.gameObject instanceof mw.Trigger || element.gameObject instanceof Character) {
                continue;
            }
            if (!element.gameObject) {
                continue;
            }
            return element;
        }
        return targetPos;
    }
    /**
     * 贝塞尔曲线
     * @param p1x 
     * @param p1y 
     * @param p2x 
     * @param p2y 
     * @returns 
     */
    public static cubicBezier(p1x, p1y, p2x, p2y) {
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

    /**
     * 将一个s转换成时间格式。例如： 100s -> 00:01:40
     * @param totalSeconds 
     * @returns 
     */
    public static FormatTime(totalSeconds: number): string {
        let hours: number = Math.floor((totalSeconds / 3600));
        let hh: string = (hours < 10 ? "0" + hours : hours).toString();
        let minutes: number = Math.floor((totalSeconds - hours * 3600) / 60);
        let mm: string = minutes < 10 ? "0" + minutes : minutes.toString();
        let seconds: number = Math.floor(totalSeconds - hours * 3600 - minutes * 60);
        let ss: string = seconds < 10 ? "0" + seconds : seconds.toString();
        let num: string = hh + ":" + mm + ":" + ss;
        return num;
    }

    /**
     * 将一个s转换成时间格式。例如： 100s ->01:40
     * @param totalSeconds 
     * @returns 
     */
    public static FormatTimeMS(totalSeconds: number): string {
        let minutes: number = Math.floor((totalSeconds) / 60);
        let mm: string = minutes < 10 ? "0" + minutes : minutes.toString();
        let seconds: number = Math.floor(totalSeconds - minutes * 60);
        let ss: string = seconds < 10 ? "0" + seconds : seconds.toString();
        let num: string = mm + ":" + ss;
        return num;
    }
    private static _partsArr: string[] = ["gloves", "lowerCloth", "upperCloth", "shoes"];
    private static _color: LinearColor = LinearColor.colorHexToLinearColor("#557384FF")

    /**
     * 涂黑一个外观
     * @param des 乣被涂黑的外观    
     */
    public static blackDescription(des: CharacterDescription) {
        des.advance.hair.backHair.color.color = this._color;
        des.advance.hair.frontHair.color.color = this._color;
        des.advance.makeup.skinTone.skinColor = this._color;
        for (let index = 0; index < this._partsArr.length; index++) {
            const name = this._partsArr[index];
            let parts = des.advance.clothing[name].part;
            for (let index = 0; index < parts.length; index++) {
                const element = parts[index];
                element.color.areaColor = this._color;
                element.design.designColor = this._color;
                element.pattern.patternColor = this._color;

            }
            des.advance.clothing[name].part = parts;
        }


    }

    /**
     * 获得正泰分布的值
     * @param u u
     * @param value 实际值
     * @param target 中间点
     */
    public static getUValue(u: number, value: number, target: number) {
        let fenzi = Math.sqrt(2 * Math.PI * Math.pow(u, 2));
        let e = 2.71828;
        let fenmu = Math.pow(e, (Math.pow(value - target, 2) / (2 * Math.pow(u, 2))));
        return fenzi / fenmu;
    }

    /**根据权重随机 */
    public static weightRandom(weights: number[]) {
        let rand = Math.random() * weights.reduce((l, r) => l + r, 0);
        for (let i = 0; i < weights.length; i++) {
            if (rand > weights[i]) {
                rand -= weights[i];
            } else {
                return i;
            }
        }
    }

    /**根据权重随机 */
    public static weightRandom2(data: number[][]) {
        let weights: number[] = [];
        data.forEach(e => {
            weights.push(e[1])
        })
        return CommonUtils.weightRandom(weights)
    }

    public static getViewPosition(node: mw.Widget, pos: Vector2): Vector2 {
        if (!node.parent) return pos;
        pos.add(node.parent.position);
        return CommonUtils.getViewPosition(node.parent, pos);
    }

}
