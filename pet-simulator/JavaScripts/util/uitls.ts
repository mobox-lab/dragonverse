import { GeneralManager } from "../Modified027Editor/ModifiedStaticAPI";
import { GameConfig } from "../config/GameConfig";
import { GlobalData } from "../const/GlobalData";
import KeyOperationManager from "../controller/key-operation-manager/KeyOperationManager";
import Log4Ts from "mw-log4ts";
import GameServiceConfig from "../const/GameServiceConfig";

export class utils {
    /**当前帧数 */
    public static frameCount: number = 0;

    /**UI弹出效果 */
    public static showUITween(ui: mw.UIScript, posY?: number, duration: number = 100, callBack?: Function) {
        let pos: mw.Vector2 = mw.Vector2.zero;

        posY = posY ? posY : mw.getViewportSize().y / 10; //视口大小

        new mw.Tween({ y: posY })

            .to({ y: 0 })

            .duration(duration)

            .onUpdate((val) => {
                pos.set(0, val.y);

                ui.uiObject.position = pos;
            })

            // .interpolation(TweenUtil.Interpolation.Bezier)

            .easing(TweenUtil.Easing.Cubic.Out) //TweenUtil.Easing.Elastic.Out   TweenUtil.Easing.Cubic.Out

            .start()

            .onComplete(() => {
                if (callBack) {
                    callBack;
                }
            });
    }

    public static throttle(fn: Function, time = 500) {
        let timer = null;
        return function () {
            if (!timer) {
                fn.apply(this, arguments);
                timer = setTimeout(() => {
                    timer = null;
                }, time);
            }
        };
    }

    public static debounce(fn: Function, wait: number = 500) {
        let timer = null;
        return function () {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, wait);
        };
    }

    // 日志优化 上报
    public static logP12Info(name: string, info: any, type?: "error" | "info" | "warn"): void {
        const announcer = { name };
        const msg = JSON.stringify(info) + " #P12";
        if (type == "error") {
            Log4Ts.error(announcer, msg);
        } else if (type == "warn") {
            Log4Ts.warn(announcer, msg);
        } else {
            Log4Ts.log(announcer, msg);
        }
    }

    /** 计算合成所需花费，参数为今日已合成过的次数 */
    public static fuseCostCompute(fusedNum: number) {
        // 第1-10次： 5000
        // 第11-100次：5000+(n-10)1000
        // 第101-200次：5000+(n-10)1500
        // 第201-320次：5000+(n-10)2000
        // 第321次-无穷： 623000(1.15^(n-320))
        const pow = 320;
        if (fusedNum < 10) {
            return 5000;
        } else if (fusedNum < 100) {
            return 5000 + (fusedNum + 1 - 10) * 1000;
        } else if (fusedNum < 200) {
            return 5000 + (fusedNum + 1 - 10) * 1500;
        } else if (fusedNum < pow) {
            return 5000 + (fusedNum + 1 - 10) * 2000;
        } else {
            return Math.floor(623000 * Math.pow(1.15, fusedNum + 1 - pow));
        }
    }

    /**
     * 随机获取指定范围内的整数
     * @param Min 起始值
     * @param Max 最大值
     * @returns 随机整数[min, max]
     */
    public static GetRandomNum(min: number, max: number): number {
        let Range = max - min;
        let Rand = Math.random();
        return min + Math.round(Rand * Range);
    }

    /**显影该物体所有子节点除了某命名 */
    public static showAllChildExcept(node: mw.GameObject, isShow: boolean, exceptName: string = ""): void {
        node.getChildren().forEach((child) => {
            if (child.name != exceptName) {
                child.setVisibility(isShow ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
            }
            this.showAllChildExcept(child, isShow, exceptName);
        });
    }

    /**除了命名为"attack"，其他所有子节点加描边 */
    public static addOutlineExcept(node: mw.GameObject, isAdd: boolean, exceptName: string = "attack"): void {
        let pet = GlobalData.PetStroke;
        node.getChildren().forEach((child) => {
            if (child.name != exceptName) {
                GeneralManager.modifyaddOutlineEffect(
                    child,
                    pet.strokeColor,
                    pet.strokeWidth,
                    pet.strokeDepthBias,
                    pet.strokeRange
                );
            }
            this.addOutlineExcept(child, isAdd, exceptName);
        });
    }

    /**所有子节点设置裁剪距离 */
    public static setClipDistance(node: mw.GameObject, distance: number): void {
        node.getChildren().forEach((child) => {
            if (child instanceof mw.Model) {
                child.setCullDistance(distance);
            }
            this.setClipDistance(child, distance);
        });
    }

    /**
     * 获取Text表对应id多语言
     * @param id
     * @returns
     */
    public static GetUIText(id: number): string {
        let textEle = GameConfig.Text.getElement(id);
        if (textEle == null) {
            return "空的id:" + id;
        }
        return textEle.Text;
    }

    public static Format(str: string, ...param: any[]) {
        if (param) {
            let i = 0;
            param.forEach((p) => {
                if (!str) return "unKnow";
                str = str.replace("{" + i + "}", param[i]);
                i++;
            });
        }
        return str;
    }

    /**检测一个点是否在一个正方形内 ,只检测x y*/
    public static check_pointInSquare(point: mw.Vector, points: mw.Vector[]): boolean {
        let xMin = points[0].x;
        let yMin = points[0].y;
        let xMax = points[1].x;
        let yMax = points[1].y;
        if (point.x > xMin && point.x < xMax && point.y > yMin && point.y < yMax) {
            return true;
        }
        return false;
    }

    /**检测一个点是否在多边形内 注意 只检测水平 没有高度*/
    public static check_pointInPolygon(point: mw.Vector, points: mw.Vector[]): boolean {
        if (points.length < 3) {
            return false;
        }

        let cross = 0; // 目标点向右划线与多边形相交次数
        for (let index = 0; index < points.length; index++) {
            let p1 = points[index];
            let p2 = points[(index + 1) % points.length]; // 两个点组成一条边

            if (p1.y == p2.y) {
                continue; // 边是水平的，跳过
            }

            if (point.y < Math.min(p1.y, p2.y)) {
                continue; // 如果目标点低于组成的边
            }

            if (point.y > Math.max(p1.y, p2.y)) {
                continue; // 目标点高于组成的边
            }

            // 如果p1画水平线，过p2画水平线，目标点在这两个水平线之间
            let x = ((point.y - p1.y) * (p2.x - p1.x)) / (p2.y - p1.y) + p1.x;
            // 几何意义：过目标点，画一条线，x是这条线与多边形当前边的交点x坐标
            if (x > point.x) {
                cross++;
            }
        }

        return cross % 2 == 1; // 如果交点个数是奇数在多边形内。
    }

    /**检测一个点是否在长方体内*/
    public static check_pointInRectangle(point: mw.Vector, points: number[]): boolean {
        if (points.length < 3) {
            return false;
        }
        let xMin = Math.min(points[0], points[2]);
        let yMin = Math.min(points[1], points[3]);
        let xMax = Math.max(points[2], points[0]);
        let yMax = Math.max(points[3], points[1]);
        let zMin = Math.min(points[4], points[5]);
        let zMax = Math.max(points[4], points[5]);

        if (point.x > xMin && point.x < xMax && point.y > yMin && point.y < yMax && point.z > zMin && point.z < zMax) {
            return true;
        }
        return false;
    }

    /**资源下载 */
    public static async downloadRes(guid: string): Promise<boolean> {
        if (mw.AssetUtil.assetLoaded(guid)) {
            return true;
        }
        return await mw.AssetUtil.asyncDownloadAsset(guid);
    }

    /**格式化描述为字符串 00:00:00 */
    public static formatTime(second: number): string {
        let t_sec = Math.floor(second % 60);
        let t_time = Math.floor(second / 60);
        let t_minu = Math.floor(t_time % 60); // 分钟数
        let leftTime: string = t_minu.toString();
        if (t_minu <= 9) {
            leftTime = "0" + t_minu;
        }
        let rightTime: string = t_sec.toString();
        if (t_sec <= 9) {
            rightTime = "0" + t_sec;
        }
        return leftTime + ":" + rightTime;
    }

    /**将number转换成时间 00:00*/
    public static parseTime(time: number): string {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    }

    /**关开BGM */
    public static setBGM(isPlay: boolean) {
        isPlay ? (mw.SoundService.BGMVolumeScale = 1) : (mw.SoundService.BGMVolumeScale = 0);
        isPlay ? (mw.SoundService.volumeScale = 1) : (mw.SoundService.volumeScale = 0);
    }

    /**获取今天日期 转为number */
    public static getTodayNumber(): number {
        let a = new Date();
        let str = TimeUtil.parseTime(a);

        let strr = str.split(" ")[0].replace("-", "").replace("-", "");
        return Number(strr);
    }

    /**获取今天的时间 小时 */
    public static getTodayHour(): number {
        let a = new Date();
        let str = TimeUtil.parseTime(a);
        let strr = str.split(" ")[1].split(":")[0];
        return Number(strr);
    }

    /**设置物体可见性与碰撞 */
    public static setVisibilityAndCollider(go: mw.GameObject, status: boolean) {
        go.setVisibility(status ? mw.PropertyStatus.On : mw.PropertyStatus.Off);
        go.setCollision(status ? mw.PropertyStatus.On : mw.PropertyStatus.Off, true);
        go.getChildren().forEach((element) => {
            if (!element.getVisibility() && status) {
                element.setVisibility(mw.PropertyStatus.On);
            } else if (element.getVisibility() && !status) {
                element.setVisibility(mw.PropertyStatus.Off);
            }
        });
    }

    public static GetCurMinute(): number {
        return Number((TimeUtil.time() / 60).toFixed(0));
    }

    public static GetCurSec(): number {
        return TimeUtil.time();
    }

    /**
     * 返回当前时间（例 13：15）。
     * @returns
     */
    public static getCurrentTime(): string {
        let date = new Date();
        return date.getHours() + ":" + date.getMinutes();
    }

    /**
     * 今天是星期几
     * @returns
     */
    public static getWhatDay(): string {
        let whatDay = "7123456".charAt(new Date().getDay());
        return whatDay;
    }

    /**
     * 返回上次登录是周几
     * @param day
     * @returns
     */
    public static getLastDay(day: number): string {
        let whatDay = "7123456".charAt(day);
        return whatDay;
    }

    /**
     * 判断是否同一周
     * @param date1
     * @param date2
     * @returns
     */
    public static iSameWeek(date1, date2): boolean {
        let dt1 = new Date();
        dt1.setTime(date1);
        let dt2 = new Date();
        dt2.setTime(date2);
        let md1 = tmonday(dt1);
        let md2 = tmonday(dt2);
        return md1 === md2;
    }

    /**数值转换 单位分别是k,m,b,t,Qa 保留两位小数 */
    public static formatNumber(num: number): string {
        let str = "";
        let nNum = num;
        if (nNum >= 1000000000000000) {
            nNum = num / 1000000000000000;
            if (nNum >= 1000) {
                str = this.formatNumber(nNum);
                str += "Qa";
                return str;
            }
            str = this.formatNumber2(nNum) + "Qa";
        } else if (nNum >= 1000000000000) {
            nNum = num / 1000000000000;
            str = this.formatNumber2(nNum) + "t";
        } else if (nNum >= 1000000000) {
            nNum = num / 1000000000;
            str = this.formatNumber2(nNum) + "b";
        } else if (nNum >= 1000000) {
            nNum = num / 1000000;
            str = this.formatNumber2(nNum) + "m";
        } else if (nNum >= 1000) {
            nNum = num / 1000;
            str = this.formatNumber2(nNum) + "k";
        } else {
            str = num.toFixed(0);
        }
        return str;
    }

    /**保留小数点后两位 如果小数点后为0不保留 */
    public static formatNumber2(num: number): string {
        return num.toFixed(2).replace(/\.?0+$/, "");
    }

    /**数组中随机一个元素 */
    public static randomArray<T>(array: T[]): T {
        let index = Math.floor(Math.random() * array.length);
        return array[index];
    }

    public static setEffect() {}

    public static triInit(guid: string, enterCB: Function, leaveCB: Function): void {
        GameObject.asyncFindGameObjectById(guid).then((obj) => {
            let trigger = obj as mw.Trigger;
            trigger.onEnter.add((other) => {
                if (other == Player.localPlayer.character) {
                    enterCB();
                    KeyOperationManager.getInstance().onKeyDown(null, Keys.F, () => {
                        leaveCB();
                        enterCB();
                    });
                }
            });
            trigger.onLeave.add((other) => {
                if (other == Player.localPlayer.character) {
                    leaveCB();
                    KeyOperationManager.getInstance().unregisterKey(null, Keys.F);
                }
            });
        });
    }

    /**刷新宠物id */
    public static refreshPetId(oldId: number): number {
        let cfgs = GameConfig.PetARR.getAllElement();
        let cfg = GameConfig.PetV1.getElement(oldId);

        let tarGuid = cfg.ModelGuid;
        let tarDev = cfg.DevType;
        let tarType = cfg.QualityType;
        let item = cfgs.find((ele) => {
            return ele.ModelGuid == tarGuid && ele.DevType == tarDev && ele.QualityType == tarType;
        });
        if (item) {
            return item.id;
        } else {
            return 1;
        }
    }

    public static isPremiumMemberSupported(): Promise<boolean> {
        return new Promise<boolean>((resovle) => {
            PurchaseService.isPremiumMemberSupported((isSupport) => {
                resovle(isSupport);
            });
        });
    }

    public static isPremiumMember(): Promise<boolean> {
        return new Promise<boolean>((resovle) => {
            PurchaseService.isPremiumMember((result) => {
                resovle(result);
            });
        });
    }

    public static formatEtherInteger(token: bigint): string {
        const tokenE = token / GameServiceConfig.Ether;
        return tokenE.toString(10);
    }
}

/**彩虹颜色 */
export class ImgColorTween {
    private startSRBG2 = mw.LinearColor.colorHexToLinearColor("#111236"); //颜色3
    private endSRGB2 = mw.LinearColor.colorHexToLinearColor("#FF0055");
    private tween2: mw.Tween<{ x: number; y: number; z: number }> = new mw.Tween({
        x: this.startSRBG2.r,
        y: this.startSRBG2.g,
        z: this.startSRBG2.b,
    })
        .to(
            {
                x: this.endSRGB2.r,
                y: this.endSRGB2.g,
                z: this.endSRGB2.b,
            },
            800
        )
        .onUpdate((v) => {
            let sRGBColor: mw.LinearColor = mw.LinearColor.white;
            sRGBColor.r = Number(v.x);
            sRGBColor.g = Number(v.y);
            sRGBColor.b = Number(v.z);
            this.petImg.imageColor = sRGBColor;
        })
        .start();

    private startSRBG1 = mw.LinearColor.colorHexToLinearColor("#E89839"); //颜色2
    private endSRGB1 = mw.LinearColor.colorHexToLinearColor("#111236");
    private tween1: mw.Tween<{ x: number; y: number; z: number }> = new mw.Tween({
        x: this.startSRBG1.r,
        y: this.startSRBG1.g,
        z: this.startSRBG1.b,
    })
        .to(
            {
                x: this.endSRGB1.r,
                y: this.endSRGB1.g,
                z: this.endSRGB1.b,
            },
            800
        )
        .onUpdate((v) => {
            let sRGBColor: mw.LinearColor = mw.LinearColor.white;
            sRGBColor.r = Number(v.x);
            sRGBColor.g = Number(v.y);
            sRGBColor.b = Number(v.z);
            this.petImg.imageColor = sRGBColor;
        })
        .start();

    private startSRBG = mw.LinearColor.colorHexToLinearColor("#FF0055"); //颜色1
    private endSRGB = mw.LinearColor.colorHexToLinearColor("#E89839");

    private tween = new mw.Tween({ x: this.startSRBG.r, y: this.startSRBG.g, z: this.startSRBG.b })
        .to(
            {
                x: this.endSRGB.r,
                y: this.endSRGB.g,
                z: this.endSRGB.b,
            },
            800
        )
        .onUpdate((v) => {
            let sRGBColor: mw.LinearColor = mw.LinearColor.white;
            sRGBColor.r = Number(v.x);
            sRGBColor.g = Number(v.y);
            sRGBColor.b = Number(v.z);
            this.petImg.imageColor = sRGBColor;
        })
        .start();

    private petImg: mw.Image;

    constructor(img: mw.Image) {
        this.petImg = img;
        this.tween.chain(this.tween1);
        this.tween1.chain(this.tween2);
        this.tween2.chain(this.tween);
    }

    /**是否播放 */
    public playColorTween(isPlay: boolean) {
        if (isPlay) {
            this.imgColorTween();
        } else {
            if (this.tween?.isPlaying()) this.tween.stop();
            if (this.tween1?.isPlaying()) this.tween1.stop();
            if (this.tween2?.isPlaying()) this.tween2.stop();
        }
    }

    private imgColorTween() {
        this.tween.start();
    }
}

export function tmonday(dtm): string {
    let dte = new Date(dtm);
    let day = dte.getDay();
    let dty = dte.getDate();
    if (day === 0) {
        day = 7;
    }
    dte.setDate(dty - day + 1);
    return dte.getFullYear() + "-" + dte.getMonth() + "-" + dte.getDate();
}

/**贝塞尔曲线 */
export class bezierCurve {
    public static getPoints(startP: mw.Vector, ctrlPoint: mw.Vector, endPos: mw.Vector, pointCount: number = 100) {
        let pointArr: mw.Vector[] = [];
        for (let i = 0; i < pointCount; i++) {
            let value = i / pointCount;
            let pos1 = this.vectorLerp(startP, ctrlPoint, value);
            let pos2 = this.vectorLerp(ctrlPoint, endPos, value);

            var final = this.vectorLerp(pos1, pos2, value);

            pointArr.push(final as mw.Vector);
        }
        return pointArr;
    }

    public static vectorLerp(
        v1: mw.Vector | mw.Vector2,
        v2: mw.Vector | mw.Vector2,
        lerp: number
    ): mw.Vector | mw.Vector2 {
        let x = 0;
        let y = 0;
        let z = null;
        x = this.numLerp(v1.x, v2.x, lerp);
        y = this.numLerp(v1.y, v2.y, lerp);
        if (v1 instanceof mw.Vector) {
            z = this.numLerp((v1 as mw.Vector).z, (v2 as mw.Vector).z, lerp);
        }
        return z == null ? new mw.Vector2(x, y) : new mw.Vector(x, y, z);
    }

    public static numLerp(a: number, b: number, lerp: number): number {
        if (lerp < 0) lerp = 0;
        if (lerp > 1) lerp = 1;
        return a + (b - a) * lerp;
    }
}

//单例的装饰器
const SINGLETON_KEY = Symbol();

export function Singleton() {
    return function (type: { new (); instance: any }) {
        const proxyType = new Proxy(type, {
            // this will hijack the constructor
            construct(target, argsList, newTarget) {
                // we should skip the proxy for children of our target class
                if (target.prototype !== newTarget.prototype) {
                    return Reflect.construct(target, argsList, newTarget);
                }
                // if our target class does not have an instance, create it
                if (!target[SINGLETON_KEY]) {
                    target[SINGLETON_KEY] = Reflect.construct(target, argsList, newTarget);
                }
                return target[SINGLETON_KEY];
            },
        });
        Reflect.defineProperty(proxyType, "instance", {
            get() {
                if (!this[SINGLETON_KEY]) {
                    new this();
                }
                return this[SINGLETON_KEY];
            },
            set(next) {
                this[SINGLETON_KEY] = next;
            },
        });
        return proxyType;
    };
}

/**字符串转换为数字数组 */
export function stringToNumberArr(str: string): number[] {
    let arr: number[] = [];
    let strArr = str.split(",");
    for (let i = 0; i < strArr.length; i++) {
        const element = strArr[i];
        arr.push(Number(element));
    }
    return arr;
}

/**数字数组转换为字符串 */
export function numberArrToString(arr: number[]): string {
    let str = "";
    for (let i = 0; i < arr.length; i++) {
        const element = arr[i];
        if (i == 0) {
            str += element;
        } else {
            str += "," + element;
        }
    }
    return str;
}

/**把 词条转换为 id_level; */
export function buffToString(id: number, level: number): string {
    return id + "_" + level + ";";
}

/**把 id_level; 转换为 词条 */
export function stringToBuff(str: string): { id: number; level: number }[] {
    let arr = str.split(";");
    let buff: { id: number; level: number }[] = [];
    arr.forEach((element) => {
        if (element == "") return;
        let item = element.split("_");
        let id = Number(item[0]);
        let level = Number(item[1]);
        buff.push({ id: id, level: level });
    });

    return buff;
}
