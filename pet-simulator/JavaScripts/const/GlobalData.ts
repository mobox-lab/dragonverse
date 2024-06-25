import { GameConfig } from "../config/GameConfig";
import { RankType } from "../modules/Rank/RankModuleS";
import { GlobalEnum } from "./Enum";
import Gtk from "../util/GToolkit";

export class EggEndInfo {
    /**坐标z轴偏移 */
    public posZ: number = 0;
    /**旋转x轴偏移 */
    public rotX: number = 0;
    /**缩放变化 */
    public scale: number = 1;

    constructor(posZ: number, rotX: number, scale: number) {
        this.posZ = posZ;
        this.rotX = rotX;
        this.scale = scale;
    }

    clone() {
        return new EggEndInfo(this.posZ, this.rotX, this.scale);
    }
}

export class endInfo {
    /**地面跳跃时的当前高度 */
    public jumpHeight: number = 0;
    /**地面跳跃时的当前旋转 */
    public yRot: number = 0;

    constructor(jumpHeight: number, yRot: number) {
        this.jumpHeight = jumpHeight;
        this.yRot = yRot;
    }

    clone(): endInfo {
        return new endInfo(this.jumpHeight, this.yRot);
    }
}

export namespace GlobalData {
    export class Global {
        /**是否显示GM */
        public static isShowGM: boolean = false;
        /**所选择的语言索引(-1:系统 0:英语 1:汉语 2:日语 3:德语)*/
        public static selectedLanguageIndex: number = -1;
        /**是否使用平台角色 */
        public static isUseAvatar: boolean = true;
        /**是否海外发布 */
        public static isOverSea: boolean = false;
        /**金币上限 */
        public static goldMax: number = 99999999999999999;
        /**自己宠物的裁剪距离（包括3DUI） */
        public static selfPetCutDistance: number = 5000;
        /**其他宠物的裁剪距离（包括3DUI） */
        public static otherPetCutDistance: number = 3000;
        /**是否免费送滑板 */
        public static isFreeSkateboard: boolean = false;
        /**是否同去同回 */
        public static isSameGoBack: boolean = false;
        /**是否开启收集图鉴机器 */
        public static isOpenCollectMachine: boolean = false;

        /**
         * 跳子游戏 进度条时长.
         */
        public static readonly jumpGameProgressDuration = 3e3;

        public static copyUrl = "https://www.mobox.io";
    }

    export class worldUI {
        /**血条最远显示距离 */
        public static headUIMAxVisDistance: number = 3000;
        /**宠物头顶UI 相对位置 */
        public static petHeadUIOffset: mw.Vector = new mw.Vector(20, 0, 80);
        /**飞行宠物头顶UI相对位置 */
        public static flyPetHeadUIOffset: mw.Vector = new mw.Vector(20, 0, 180);
        /**宠物头顶ui 大小 */
        public static petHeadUISize: mw.Vector2 = new mw.Vector2(370, 200);

        /**玩家头顶UI相对位置 */
        public static playerHeadUIOffset: mw.Vector = new mw.Vector(0, 0, 85);
    }

    /**宠物 */
    export class pet {
        /**宠物行动栏 宠物稀有度背景 普通 稀有 史诗 传说 神话 */
        public static petStatePetRarityGuid: string[] = ["357131", "357135", "357129", "357134", "357132"];
		/**宠物行动栏，休息时颜色 */
        public static restingPetStateImgColor: LinearColor = LinearColor.colorHexToLinearColor("#B5B5B5");
        /**宠物行动栏，出战时颜色 */
        public static attackingPetStateImgColor: LinearColor = LinearColor.colorHexToLinearColor("#FED43F");
        /**宠物行动栏，休息时边缘颜色 */
        public static restingPetStateImgBorderColor: LinearColor = LinearColor.colorHexToLinearColor("#6B6B6B");
        /**宠物行动栏，出战时边缘颜色 */
        public static attackingPetStateImgBorderColor: LinearColor = LinearColor.colorHexToLinearColor("#A66D00");
        /**宠物行动栏，悬浮时缩放 */
        public static petStateImgHoverScale: Vector2 = new Vector2(0.9, 0.9);
        /**宠物行动栏，非悬浮时缩放 */
        public static petStateImgNormalScale: Vector2 = Vector2.one;

        //扭蛋开出来龙娘的姿势
        public static petShowStanceGuid: string = "144180";
        //龙娘攻击动画
        public static chaAttackAnimGuid: string = "121561";

        /**宠物移动的最大帧数（超过该值不动了） */
        public static maxMoveFrame: number = 20;

        /**跟随相对坐标 */
        public static followOffsets: mw.Vector[][] = [
            [new mw.Vector(-100, 0, 0)],
            [new mw.Vector(-100, 90, 0), new mw.Vector(-100, -90, 0)],
            [new mw.Vector(-100, 90, 0), new mw.Vector(-100, -90, 0), new mw.Vector(-300, 0, 0)],
            [
                new mw.Vector(-100, 90, 0),
                new mw.Vector(-100, -90, 0),
                new mw.Vector(-300, 90, 0),
                new mw.Vector(-300, -90, 0),
            ],
            [
                new mw.Vector(-100, 150, 0),
                new mw.Vector(-100, 0, 0),
                new mw.Vector(-100, -150, 0),
                new mw.Vector(-300, 90, 0),
                new mw.Vector(-300, -90, 0),
            ],
            [
                new mw.Vector(-100, 150, 0),
                new mw.Vector(-100, 0, 0),
                new mw.Vector(-100, -150, 0),
                new mw.Vector(-300, 150, 0),
                new mw.Vector(-300, 0, 0),
                new mw.Vector(-300, -150, 0),
            ],
            [
                new mw.Vector(-100, 150, 0),
                new mw.Vector(-100, 0, 0),
                new mw.Vector(-100, -150, 0),
                new mw.Vector(-300, 150, 0),
                new mw.Vector(-300, 0, 0),
                new mw.Vector(-300, -150, 0),
                new mw.Vector(-500, 0, 0),
            ],
        ];

        /**宠物重力模拟的帧数（只有高于该帧数才会模拟重力） */
        public static gravityFrame: number = 25;

        /**最大跟随数量 */
        public static maxFollowCount: number = 7;

        /**
         * 地面跳跃顺序移动数组
         * 地面跳跃时坐标z轴和旋转y轴的变化
         */
        public static jumpOrder: endInfo[] = [
            new endInfo(0, 0),
            new endInfo(60, -20),
            new endInfo(0, 0),
            new endInfo(60, 20),
            new endInfo(0, 0),
        ];

        /**天空飞行顺序移动数组 */
        public static flyOrder: endInfo[] = [
            new endInfo(0, 0),
            new endInfo(60, 0),
            new endInfo(0, 0),
            new endInfo(60, 0),
            new endInfo(0, 0),
        ];

        /**飞行的贝塞尔曲线 */
        public static flyBezier: number[] = [0.26, 0.59, 0.61, 0.28];

        /**地面跳跃到最高点所用时间 */
        public static jumpTime: number = 180;
        /**飞行到最高点所用时间 */
        public static flyTime: number = 300;
        /**每次移动的贝塞尔曲线 */
        public static jumpBezier: number[] = [0.26, 0.59, 0.61, 0.28];
        /**跟随移动时是否平滑lerp */
        public static isSmoothLerp: boolean = true;
        /**平滑值 */
        public static smoothValue: number = 0.4;
        /**引导线场景guid */
        public static guideLineS: string = "1C65E763";
        /**光圈特效guid */
        public static lightCircleS: string = "88780";
        /**宠物攻击时与资源点距离 */
        public static attackDistance: number = 200;
        /**宠物攻击时的y轴旋转角度 */
        public static attackRotationY: number = -30;
        /**宠物完成一次攻击的时间从0到-30再到0 */
        public static attackTime: number = 1200;
        /**宠物一次攻击的贝塞尔 */
        public static attackBezier: number[] = [0.26, 0.59, 0.61, 0.28];
        /**宠物可站立地面tag */
        public static floorTag: string = "floor";
        /**宠物预制体坐标锚点距离地面高度 */
        public static petHeight: number = 25;
        /** 人形对象单位身高*/
        public static chaUnitHeight: number = 90;
        /**初始宠物数组 */
        public static initPets: number[] = [1, 2];

        /**宠物品质对应特效数组 */
        public static qualityEffArr: string[] = ["124432", "125705", "101411", "114159", "160764"];
        /**攻击特效相对宠物坐标偏移 */
        public static attackEffectOffset: mw.Vector[][] = [
            //地面
            [
                new mw.Vector(0, 0, 0),
                new mw.Vector(0, 0, 0),
                new mw.Vector(-200, 0, 0),
                new mw.Vector(0, 0, 0),
                new mw.Vector(0, 0, 0),
            ],
            //飞行
            [
                new mw.Vector(0, 0, 90),
                new mw.Vector(0, 0, 90),
                new mw.Vector(-200, 0, 0),
                new mw.Vector(0, 0, 90),
                new mw.Vector(0, 0, 90),
            ],
        ];
        /**攻击特效相对宠物旋转 */
        public static attackEffectRotation: mw.Rotation[][] = [
            [
                new mw.Rotation(0, 0, 90),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 180),
            ],
            [
                new mw.Rotation(0, 0, 90),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 180),
            ],
        ];
        /**攻击特效相对宠物缩放 */
        public static attackEffectScale: mw.Vector[][] = [
            [
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
            ],
            [
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
                new mw.Vector(1, 1, 1),
            ],
        ];
        /**攻击特效相对宠物旋转 */
        public static chaAttackEffectRotation: mw.Rotation[][] = [
            [
                new mw.Rotation(0, 0, 270),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 0),
            ],
            [
                new mw.Rotation(0, 0, 270),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 180),
                new mw.Rotation(0, 0, 0),
                new mw.Rotation(0, 0, 0),
            ],
        ];
        /**攻击特效相对宠物坐标偏移 */
        public static chaAttackEffectOffset: mw.Vector[][] = [
            //地面
            [
                new mw.Vector(0, 0, 0),
                new mw.Vector(0, 0, 0),
                new mw.Vector(200, 0, 0),
                new mw.Vector(0, 0, 0),
                new mw.Vector(0, 0, 0),
            ],
            //飞行
            [
                new mw.Vector(0, 0, 90),
                new mw.Vector(0, 0, 90),
                new mw.Vector(200, 0, 0),
                new mw.Vector(0, 0, 90),
                new mw.Vector(0, 0, 90),
            ],
        ];
    }

    /**主控UI */
    export class hudUI {
        /**增加动画耗时 单位秒 */
        public static addAniTime: number = 0.8;
        /**金币或钻石canvas初始大小 */
        public static canvasSize: mw.Vector2 = new mw.Vector2(1, 1);
        /**金币或钻石canvas最大大小 */
        public static canvasMaxSize: mw.Vector2 = new mw.Vector2(1.1, 1.1);
        /**单次放大到最大耗时 毫秒 */
        public static canvasMaxTime: number = 200;
        /**每次缩放的贝塞尔曲线 */
        public static canvasBezier: number[] = [0.83, 0, 0.17, 1];
    }

    /**掉落物动画 */
    export class DropAni {
        /**飞到人身上的贝塞尔 */
        public static flyToPlayerBezier: number[] = [0.38, 0.02, 0.87, -0.05];
        /**飞到人身上的时间 不建议用速度转换时间 距离太短情况下基本没效果 */
        public static flyToPlayerTime: number = 200;
        /**玩家吸收资源的距离 */
        public static resourceToPlayer: number = 450;
        /**掉落物之间的销毁距离 */
        public static dropDistance: number = 80;

        /**资源纵坐标偏移 */
        public static resourceY: number = 30;
        /**物理贝塞尔 */
        public static physicsBezier: number[] = [0.3, 0.05, 0.71, 0.97];
        /**掉落物随机生成半径 */
        public static randomRadius: number[] = [100, 300];
        /**大宝箱掉落物随机生成半径 */
        public static randomRadiusBig: number[] = [250, 350];
        /**掉落到地面的耗时 */
        public static dropTime: number = 500;
        /**高度随机范围 */
        public static heightRandoms: number[] = [300, 600];

        /**朝目标方向滚动的概率 */
        public static rollProbability: number = 0.5;
        /**滚动耗时范围 不建议用速度转换时间 距离太短情况下基本没效果 */
        public static rollTime: number[] = [500, 800];
        /**滚动贝塞尔 */
        public static rollBezier: number[] = [0.33, 1, 0.68, 1];
        /**滚动距离范围 */
        public static rollDistanceRandoms: number[] = [100, 200];

        /**弹跳的概率 */
        public static bonceProbability: number = 0.5;
        /**弹跳的间隔 秒 */
        public static bonceTime: number = 2;
        /**弹跳高度范围 */
        public static bonceHeight: number[] = [30, 70];
        /**往上跳时间 */
        public static bonceUpTime: number = 300;
        /**往上跳贝塞尔 （直接用缓动停止函数了 该贝塞尔没用 觉得效果不好可换） */
        public static bonceUpBezier: number[] = [0.33, 1, 0.68, 1];

        /**弹跳下落时间 (下落直接用了弹跳函数)*/
        public static bonceDownTime: number = 300;

        /**一帧喷多少个 */
        public static frameNum: number = 2;
        /**销毁时间 */
        public static destroyTime: number = 60e3;
        /**销毁距离 */
        public static destroyDistance: number = 300;
        /**个数达到X 开始判断距离，进行叠 */
        public static stackNum: number = 100;

        /**相对人物 X 距离开始销毁 */
        public static playerDistance: number = 6000;
    }

    /**场景可破坏资源 */
    export class SceneResource {
        /**暴击世界ui数组 */
        public static critWorldUI: string[] = ["1D8E15F1", "2F355B18", "2B6A0B9D", "25AE61E6", "3C8EDFB2", "11714AAA"];
        /**暴击世界ui 向上飘时间 ms */
        public static critWorldUITime: number = 2000;
        /**暴击ui，向上移动距离 */
        public static critWorldUIHeight: number = 300;
        /**暴击ui 相对资源点 偏移 */
        public static critWorldUIOffset: mw.Vector = new mw.Vector(0, 0, 100);
        /**世界UI存留时间 */
        public static worldUITime: number = 2000;

        /**地面高度 */
        public static groundHeight: number = 55;
        /**掉的高度 */
        public static dropHeight: number = 1000;

        public static dropItemMax: number = 2000;

        /**权重数组1-2级钻石 1-6级金币、 */
        public static weightArr: number[] = [8, 4, 26, 22, 18, 10, 8, 4];
        /**资源类型 */
        public static resourceType: number[] = [1, 2, 3, 4, 5, 6, 7, 8];
        /**初始化资源点刷新间隔 */
        public static initResourceRefresh: number = 0.2;
        /**每个区域资源上限个数 */
        public static maxResourceCount: number = 200;
        /**每个区域资源下限个数 */
        public static minResourceCount: number = 100;
        /**默认区域数组 */
        public static defaultAreaArr: number[] = [1002, 2002];
        /**忽略区域数组 */
        public static ignoreAreaArr: number[] = [0, 1001, 1002, 1011, 2001, 2002, 2003, 2010, 3001];
        /**客户端回收忽略数组 */
        public static clientIgnoreAreaArr: number[] = [1001, 1002, 2001, 2002, 2003];

        /**最后一击暴击权重  与下边一样 不可改*/
        public static critWeightUndef: number = 20;
        /**最后一击暴击权重  可改，与上同步*/
        public static critWeightMap: Map<number, number> = new Map();

        public static critWeight(playerId: number) {
            return Gtk.tryGet(this.critWeightMap, playerId, () => 20);
        }

        /**正常击打特效权重 */
        public static normalWeight: number = 70;

        /**刮痧时间 */
        public static guaShaTime: number = 6;

        public static critRateMap: Map<number, number> = new Map();

        // public static isCrit(playerId: number) {
        //     return Gtk.tryGet(
        //         this.critMap,
        //         playerId,
        //         () =>
        //             MathUtil.randomInt(0, 100) <
        //             GlobalData.SceneResource.critWeight(playerId));
        // }

        public static clearPlayer(playerId: number) {
            this.critRateMap.delete(playerId);
            this.critWeightMap.delete(playerId);
            // this.critMap.delete(playerId);
        }

        /**资源点补充生成 与上次相同的概率  总100% */
        public static sameProbability: number = 50;

        /**一区域分隔 Y 值 */
        public static areaY: number = -4030;
        /**区域一 前区域 资源权重  钻石12  金币1-6*/
        public static area1Weight: number[] = [4, 0, 80, 20, 0, 0, 0, 0];
        /**区域一 后区域 资源权重 */
        public static area2Weight: number[] = [8, 4, 26, 22, 18, 12, 20, 4];

        /**马桶人受击死亡动画 */
        public static toiletDieAni = ["46284", "95617", "111099"];
        /**死亡动画速率 */
        public static dieAniRate: number = 1;
    }

    /**可破坏物动画 */
    export class ResourceAni {
        /**落地tween z轴弹跳 */
        public static dropTween: number[] = [
            800, //初始高度
            0, //回归正常高度
            200, //弹跳高度
            0, //回归正常高度
            50, //弹跳高度
            0, //回归正常高度
        ];

        /**落地tween 时间 */
        public static dropTweenTime: number[] = [
            500, //回归正常时间
            200, //弹跳时间
            200, //回归正常时间
            100, //弹跳时间
            100, //回归正常时间
        ];

        /**落地tween 贝塞尔 */
        public static dropTweenBezier: number[][] = [
            [0.12, 0, 0.39, 0], //回归正常贝塞尔
            [0.61, 1, 0.88, 1], //弹跳贝塞尔
            [0.12, 0, 0.39, 0], //回归正常贝塞尔
            [0.61, 1, 0.88, 1], //弹跳贝塞尔
            [0.12, 0, 0.39, 0], //回归正常贝塞尔
        ];
    }

    /**传送点 */
    export class TransferPoint {
        /**传送点未解锁图标 */
        public static unLockIcon: string[] = ["177502", "174806"]; //?图标 ， 锁图标
        /**传送点未解锁名字 */
        public static unLockName: string = "???";
        /**传送点按钮guid */
        public static btnBgGuid: string[] = ["174828", "174832", "174801"]; //未解锁，解锁一个，都解锁
        /**tips显示时间 */
        public static tipsTime: number = 2;
        /**tips贝塞尔 */
        public static tipsTweenBezier: number[] = [0.13, 0.88, 0.82, 0.15];

        /**场景墙的id数组 */
        public static wallIds: number[] = [
            1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010, 1011, 2003, 2010, 3003, 3004, 3005, 3006, 3007, 3008,
        ];
        /**传送门的id数组 */
        public static doorIds: number[] = [2004, 2005, 2006, 2007, 2008, 2009];
    }

    /**扭蛋机 */
    export class EggMachine {
        /**概率世界ui Guid */
        public static probabilityWorldUI: string = "19998CBE";
        /**未抽到过的宠物 世界UI item显示颜色 */
        public static unGetColor: string = "#767676";

        /**蛋相对摄像机的偏移 */
        public static eggCameraOffset: mw.Vector = new mw.Vector(180, 0, 0);
        /**蛋相对于父节点的偏移 用于调整锚点到中心 */
        public static eggParentOffset: mw.Vector = new mw.Vector(0, 0, -50);

        /**蛋最终坐标偏移数组 */
        public static eggEndInfos: EggEndInfo[] = [
            new EggEndInfo(-70, 0, 0.5), //初始出现在底下，此时只改了纵坐标和缩放
            new EggEndInfo(0, 0, 1), //回归到正常位置
            new EggEndInfo(0, 50, 1), //往左转
            new EggEndInfo(0, 0, 1), //回归到正常位置
            new EggEndInfo(0, -50, 1), //往右转
            new EggEndInfo(0, 0, 1), //回归到正常位置
            new EggEndInfo(0, 50, 1), //往左转
            new EggEndInfo(0, 0, 1), //回归到正常位置
            new EggEndInfo(0, 0, 0.3), //缩小 视角感觉是离远
            new EggEndInfo(0, 0, 2), //放大 视角感觉是离近
        ];

        /**特效出现时间 */
        public static effectAppearTime: number = 0.05;

        /**地面宠物相对蛋的偏移 */
        public static petEggOffset: mw.Vector = new mw.Vector(0, 0, 0);
        /**飞行宠物相对蛋的偏移 */
        public static petFlyEggOffset: mw.Vector = new mw.Vector(0, 0, -70);

        /**宠物最终坐标偏移数组 */
        public static petEndInfos: EggEndInfo[] = [
            new EggEndInfo(0, 0, 1), //回归到正常位置
            new EggEndInfo(0, -360, 1), //往左转
            new EggEndInfo(0, -360, 1), //等在原地
            new EggEndInfo(-200, -360, 1), //回归到正常位置
        ];

        /**宠物tween贝塞尔数组 */
        public static petTweenBezier: number[][] = [
            [0.25, 1, 0.5, 1],
            [0, 0, 1, 1],
            [0.68, -1.45, 0.32, 1.6],
        ];

        /**宠物单个tween耗时 */
        public static petTweenTime: number[] = [1000, 1000, 800];

        /**tween贝塞尔数组 */
        public static tweenBezier: number[][] = [
            [0.11, 0, 0.5, 0], //从底下往上
            [0.68, -0.6, 0.32, 1.6], //往左转
            [0, 0, 1, 1], //回归到正常位置
            [0.68, -0.6, 0.32, 1.6], //往右转
            [0, 0, 1, 1], //回归到正常位置
            [0.68, -0.6, 0.32, 1.6], //往左转
            [0, 0, 1, 1], //回归到正常位置
            [0, 0, 1, 1], //缩小 视角感觉是离远
            [0, 0, 1, 1], //放大 视角感觉是离近
        ];

        /**单个tween耗时数组 毫秒 */
        public static tweenTime: number[] = [500, 200, 300, 200, 300, 200, 300, 250, 200];

        /**闪屏Tween耗时 */
        public static flashTweenTime: number = 200;
        /**闪屏Tween贝塞尔 */
        public static flashTweenBezier: number[] = [0, 0, 1, 1];
        /**宠物信息缩放Tween耗时 */
        public static petInfoTweenTime: number = 1000;
        /**宠物信息缩放Tween贝塞尔 */
        public static petInfoTweenBezier: number[] = [0.16, 1, 0.3, 1];

        //扭蛋机概率世界ui大小
        public static probabilityWorldUISize: mw.Vector2 = new mw.Vector2(260, 226);
        //概率uiY轴偏移
        public static probabilityWorldUIOffsetY: number = 54;
    }

    /**玩家 */
    export class Player {
        /**描边颜色 */
        public static strokeColor: mw.LinearColor = mw.LinearColor.black;
        /**描边宽度 */
        public static strokeWidth: number = 0.4;
        /**描边深度偏移 范围 -25-25 */
        public static strokeDepthBias: number = -1;
        /**描边范围 范围0-1 */
        public static strokeRange: number = 0.93;
    }

    /**射线检测 */
    export class LineTrace {
        /**是否开启射线显示 */
        public static isShowLineTrace: boolean = false;
        /**射线发射距离 */
        public static lineTraceDistance: number = 6000;
        /**射线长按时间 */
        public static lineTraceTime: number = 1000;
    }

    /**提示 */
    export class Tips {
        /**单条提示显示时长 */
        public static tipsTime: number = 5;
        /**单条提示字体颜色 */
        public static tipsColor: string[] = ["#8FF8FF", "#FFD800", "#AEFFA0", "#FF8F8F"];
    }

    /**背包 */
    export class Bag {
        /**背包容量 */
        public static bagCapacity: number = 30;
        /**背包最大容量 */
        public static bagMaxCapacity: number = 100;

        /**背包详情UI 稀有度 普通 稀有 史诗 传说 神话 底板颜色 */
        public static rareColor: string[] = ["#94999DFF", "#3956F4", "#B442EDFF", "#FFD864FF", "#FF3B08FF"];
        /**背包详情UI 特殊化 爱心、彩虹 颜色 */
        public static specialColor: string[] = ["#F04798FF", "#BA7FFFFF"];

        /**背景板颜色 正常、蓝色*/
        public static bgColors: string[] = ["#FFFFFFFF", "#3FB0FEFF"];
        /**传说、神话正常底板 Guid */
        public static legendBgGuid: string[] = ["367714", "367713"];
        /**传说、神话选中底板 Guid */
        public static legendBgSelectGuid: string[] = ["367714", "367713"];
        /**传说、神话 渲染缩放 */
        public static legendBgScale: mw.Vector2 = new mw.Vector2(1, 1);
        /**巨大化渲染缩放 */
        public static hugeScale: mw.Vector2 = new mw.Vector2(1.7, 1.7);

        /**透明度变化区间 */
        public static alphaRange: number[] = [0, 0.8];
        /**透明度变化时间 */
        public static alphaTime: number = 1;
        /**透明度变化贝塞尔 */
        public static alphaBezier: number[] = [0.25, 1, 0.5, 1];

        /**按压悬浮窗时间 ms */
        public static pressTime: number = 200;

        /**背包item 距离左、上边缘 */
        public static itemOffset: number[] = [15, 15];
        /**背包item 距离item间距 */
        public static itemSpace: number = 20;
        /**背包item 大小 */
        public static itemSize: mw.Vector2 = new mw.Vector2(95, 95);
        /**背包itemUI 爱心化、彩虹化图标 Guid */
        public static itemSpecialIconGuid: string[] = ["355922", "355921"];

		public static itemHoverOffsetX = 10;
		public static itemHoverOffsetY = 60;
    }

    /**收集图鉴 */
    export class Collect {
        /**图鉴等级个数数组 */
        public static levelCount: number[] = [80, 200];
        /**图鉴机器位置数组 一世界、三世界*/
        public static CollectPos: mw.Vector[] = [new mw.Vector(3547, 903, 157), new mw.Vector(112190, -29460, 9812)];
        /**图鉴机器旋转数组 */
        public static CollectRot: mw.Rotation[] = [new mw.Rotation(0, 0, -83), new mw.Rotation(0, 0, 0)];
    }

    /**大宝箱 */
    export class BigBox {
        /**X秒后 再次出现 */
        public static boxAppearTime: number = 5;
    }

    export class Music {
        /**背景音乐 */
        public static bgm: number = 1;
        /**脚步声 */
        public static footStep: number = 2;
        /**跳跃声 */
        public static jump: number = 3;
        /**落地音效 */
        public static land: number = 4;
        /**资源掉落地面音效 */
        public static resourceLand: number = 6;
        /**点击音效 */
        public static click: number = 7;
        /**宠物移动音效 */
        public static petMove: number = 8;
        /**领取奖励的烟花音效 */
        public static rewardFireworks: number = 9;
        /**宠物装备音效 */
        public static petEquip: number = 10;
        /**资源物被破坏的音效 */
        public static resourceDestroy: number = 11;
        /**宠物出战音效 */
        public static petFight: number = 12;
        /**资源进入玩家时的音效 */
        public static resourceEnterPlayer: number = 13;
        /**资源物被暴击破坏时的音效 */
        public static resourceDestroyCrit: number = 14;
    }

    /**摄像机缩放 */
    export class Camera {
        /**单次摄像机缩放最小值 弹簧臂长度 */
        public static minLength: number = -20;
        /**单次摄像机缩放最大值 弹簧臂长度 */
        public static maxLength: number = 3000;
        /**单次摄像机缩放的倍率 */
        public static zoomRate: number = 8;
        /**默认弹簧臂长度 */
        public static defaultLength: number = 500;
        /**远弹簧臂长度 */
        public static farLength: number = 1000;
        /**近弹簧臂长度 */
        public static nearLength: number = 350;
    }

    /**宠物描边 */
    export class PetStroke {
        /**描边颜色 */
        public static strokeColor: mw.LinearColor = mw.LinearColor.black;
        /**描边宽度 */
        public static strokeWidth: number = 0.3;
        /**描边深度偏移 范围 -25-25 */
        public static strokeDepthBias: number = -1;
        /**描边范围 范围0-1 */
        public static strokeRange: number = 0.93;
    }

    /**拾取金币UI */
    export class RewardTipsUI {
        /**ui偏移 */
        public static uiSlotLoc: mw.Vector2 = new mw.Vector2(-60, -130);

        /**字体颜色渐变 开始颜色 结束颜色 */
        public static fontColor: mw.Vector[] = [new mw.Vector(255, 255, 255), new mw.Vector(255, 241, 122)];
        /**显示间隔时间/s  超过这个时间ui重置 */
        public static showInterval: number = 0.8;
    }

    /**交易 */
    export class Trading {
        /**交易无操作倒计时/s */
        public static countDown: number = 5;
        /**最终交易倒计时 */
        public static finalCountDown: number = 5;
        /**拒绝玩家交易冷却时间 */
        public static refuseTradingTime: number = 6;
        /**确认按钮 点击、正常 guid */
        public static confirmColor: string[] = ["174813", "174826"];
        /**边框 确认、正常 guid */
        public static borderGuid: string[] = ["179845", "179456"];
        /**箭头 确认、正常 颜色 */
        public static arrowColor: string[] = ["#62E063FF", "#3FB0FEFF"];
        /**我的交易、对方名字 确认 正常 颜色 */
        public static nameColor: string[] = ["#62E063FF", "#FFFFFFFF"];
        /**钻石 确认、正常 底板guid */
        public static diamondBgGuid: string[] = ["174832", "174801"];
        /**开启关闭交易按钮颜色 */
        public static openColor: string[] = ["#FFFFFFFF", "#856BFFFF"];
        /**倒计时颜色 */
        public static countDownColor: string = "#FFFFFFFF";
    }

    /**聊天 */
    export class Chat {
        /**自己的item相对CanvasX偏移 */
        public static selfItemOffsetX: number = 716;
        /**其他人的item相对CanvasX偏移 */
        public static otherItemOffsetX: number = 60;

        /**最上边的item,相对Canvas Y偏移 */
        public static topItemOffsetY: number = 50;
        /**两条item,Y 间距 */
        public static betweenOffsetY: number = 100;
        /**聊天背景框颜色 我|他 */
        public static chatBgColor: string[] = ["#68FF6ACC", "#FF9AC8"];
    }

    /**buff */
    export class Buff {
        /**金币buff */
        public static goldBuff: number = 1;
        /**伤害buff */
        public static damageBuffMap: Map<number, number> = new Map();

        public static damageBuff(playerId?: number) {
            playerId = playerId ?? mw.Player.localPlayer.playerId;

            return Gtk.tryGet(Buff.damageBuffMap, playerId, () => 1);
        }

        public static clearPlayer(playerId: number) {
            this.damageBuffMap.delete(playerId);
        }

        /**当期幸运、增加概率|权重值 */
        public static curSmallLuckyBuff: number[] = [0, 0];
        /**当前超级 增加值 */
        public static curSuperLuckyBuff: number[] = [0, 0];

        //策划配置
        /**幸运药水 概率|权重 增加值 */
        public static smallLuckyPotion: number[] = [0.5, 2];
        /**超级幸运药水 概率|权重 增加值 */
        public static superLuckyPotion: number[] = [0.8, 5];

        // 每日奖励默认赠送buff
        public static dailyBuff: GlobalEnum.BuffType[] = [];
        // 每日奖励赠送buff时间(s)
        public static dailyBuffTime: number[] = [];
    }

    export class Dev {
        /**最高挡位 */
        public static maxLevel: number = 6;
        /**黄金化各挡位概率 */
        public static goldProbability: number[] = [13, 29, 47, 63, 88, 100];
        /**黄金化各挡位花费 */
        public static goldCost: number[] = [250, 400, 600, 800, 1000, 1250];
        /**彩虹化各挡位花费 */
        public static rainbowCost: number[] = [500, 800, 1200, 1600, 2000, 2500];
        /**黄金化触发器guid */
        public static goldTriggerGuid: string = "32E3ADF50324D893";
        /**彩虹化触发器guid */
        public static rainbowTriggerGuid: string = "1F08A7F6";
    }

    /**升级相关 */
    export class LevelUp {
        /**升级触发器guid */
        public static triggerGuid: string = "3F878EA2";
        /**吸收范围 */
        public static levelRangeMap: Map<number, number> = new Map();

        public static levelRange(playerId: number) {
            return Gtk.tryGet(this.levelRangeMap, playerId, 0);
        }

        /**更多钻石 */
        public static moreDiamondMap: Map<number, number> = new Map();

        public static moreDiamond(playerId: number) {
            return Gtk.tryGet(this.moreDiamondMap, playerId, 0);
        };

        /**宠物攻击力 */
        public static petDamageMap: Map<number, number> = new Map();

        public static petDamage(playerId: number) {
            return Gtk.tryGet(this.petDamageMap, playerId, 0);
        };

        /**宠物攻击速度 */
        public static petAttackSpeedMap: Map<number, number> = new Map();

        public static petAttackSpeed(playerId: number) {
            return Gtk.tryGet(this.petAttackSpeedMap, playerId, 0);
        };

        /**最高等级 */
        public static maxLevel: number = 5;

        public static initPlayer(playerId: number,
                                 levelData: number[]) {
            let upgradeData = GameConfig.Upgrade.getAllElement().map(v => v.Upgradenum);

            this.levelRangeMap.set(playerId, (upgradeData[0][levelData[0] - 1] ?? 0) + 1);
            this.moreDiamondMap.set(playerId, (upgradeData[1][levelData[1] - 1] ?? 0) + 1);
            this.petDamageMap.set(playerId, (upgradeData[2][levelData[2] - 1] ?? 0) + 1);
            this.petAttackSpeedMap.set(playerId, (upgradeData[3][levelData[3] - 1] ?? 0) + 1);
        }

        public static clearPlayer(playerId: number) {
            this.levelRangeMap.delete(playerId);
            this.moreDiamondMap.delete(playerId);
            this.petDamageMap.delete(playerId);
            this.petAttackSpeedMap.delete(playerId);
        }
    }

    /**合成 */
    export class Fuse {
        /**花费 */
        public static cost: number = 5000;
        /**最多融合数量 */
        public static maxFuseCount: number = 12;
        /**最少融合数量 */
        public static minFuseCount: number = 3;
        /**融合触发器guid */
        public static triggerGuid: string = "152DB88F";
        /**最低攻击力比值 */
        public static minDamageRate: number = 3;
        /**最高攻击力比值 */
        public static maxDamageRate: number = 1.5;
    }

    /**加速攻击特效 */
    export class SpeedUp {
        /**加速特效飞向宠物速度 */
        public static speed: number = 1000;
        /**宠物增加的攻速 比值 直接在升级后的基础上再乘 */
        public static petAttackSpeed: number = 2;
        /**左手攻击动作 */
        public static leftAttack: string = "85026";
        /**左手攻击动作延时 秒*/
        public static leftAttackDelay: number = 0.4;
        /**右手攻击动作 */
        public static rightAttack: string = "85025";
        /**右手攻击动作延时 秒*/
        public static rightAttackDelay: number = 0.4;
        /**加速特效飞行宠物的贝塞尔 */
        public static bezier: number[] = [0.5, 0.5, 0.5, 0.5];
        /**加速飞过去的特效资源id */
        public static effectId: number = 20;
        /**宠物身上的特效资源id */
        public static petEffectId: number = 22;
        /**存留在宠物身上的时间 */
        public static petEffectStay: number = 3;
        /**点击按钮间隔 */
        public static clickInterval: number = 0.5;
        /**长按特效资源id */
        public static longPressEffectId: number = 21;
        /**长按攻击动作 */
        public static longPressAttack: string = "117387";
        /**长按特效的默认缩放 */
        public static longPressScale: Vector = new mw.Vector(1, 1, 0.5);
        /**长按判定时间 */
        public static longPressTime: number = 500;
    }

    /**成就系统相关参数 */
    export class Achievement {
        /**Item的位置间隔大小 例如间隔260 则item1的位置是0，item2的位置就是260……520…… */
        public static itemPositionInterval: number = 130;
        /**---------------------------------------------------------------------- */
        /**第一世界金币Icon */
        public static firstWorldCoinImageIcon: string = "176088";
        /**第二世界金币Icon */
        public static secondWorldCoinImageIcon: string = "176090";
        /**第三世界金币Icon */
        public static thirdWorldCoinImageIcon: string = "175733";
        /**钻石Icon */
        public static diamondImageIcon: string = "176091";
        /**背包Icon */
        public static knapsackImageIcon: string = "136950";
        /**宠物Icon */
        public static petImageIcon: string = "176418";
        /**---------------------------------------------------------------------- */
        /**item-Grade背景图颜色-容易（指定R、G、B、A设置颜色 0 ~255） */
        public static easyImageBgColor: number[] = [136, 221, 255, 255];
        /**item-Grade背景图颜色-简单（指定R、G、B、A设置颜色 0 ~255） */
        public static simpleImageBgColor: number[] = [59, 180, 255, 255];
        /**item-Grade背景图颜色-中等（指定R、G、B、A设置颜色 0 ~255） */
        public static mediumImageBgColor: number[] = [255, 155, 39, 255];
        /**item-Grade背景图颜色-困难（指定R、G、B、A设置颜色 0 ~255） */
        public static difficultImageBgColor: number[] = [210, 31, 42, 255];
        /**item-Grade背景图颜色-疯狂（指定R、G、B、A设置颜色 0 ~255） */
        public static crazyImageBgColor: number[] = [141, 58, 236, 255];
        /**item-Grade背景图颜色-完成（指定R、G、B、A设置颜色 0 ~255） */
        public static completeImageBgColor: number[] = [67, 236, 84, 255];
        /**------------------------------------------------------------------------- */
        /**Tips从上到下移动时间（单位：s） */
        public static tweenTopToDownTipsTime: number = 0.3;
        /**Tips从下到上移动时间（单位：s） */
        public static tweenDownToTopTipsTime: number = 0.3;
        /**Tips显示时间 (单位：s)*/
        public static tipShowTime: number = 2;
    }

    /**词条悬浮窗 UI */
    export class BuffUI {
        /**ui Y轴长度 0,1,2,3个词条 不用改 */
        public static uiYLengthArr: number[] = [412, 482, 552, 622];

        /**文本高度限制 Y  2行字的高度*/
        public static textHeightLimit: number = 49 * 2;

        /**拥有数量 图片、字 ui 距离底部距离 */
        public static hasUIDis = [15, 29];
    }

    /**滑板 */
    export class Ripstik {
        /**没有滑板提示 */
        public static btnBgGuid: string = "未拥有滑板，通过任务商店购买";
        /**滑板Icon */
        public static unLockIcon: string[] = ["174802", "174807"]; //图标 ， 锁图标
        /**滑板Guid */
        public static ripstikGuid: string = "172322";
        /**滑板装备插槽 */
        public static slotName: mw.HumanoidSlotType = mw.HumanoidSlotType.Root;
        /**滑板相对偏移 */
        public static relativeLoc: mw.Vector = new mw.Vector(0, 0, 0);
        /**滑板相对旋转 */
        public static relativeRot: mw.Rotation = new mw.Rotation(0, 0, 90);
        /**滑板相对缩放 */
        public static relativeScale: mw.Vector = new mw.Vector(2, 2, 2);
        /**滑板特效数组 */
        public static effectIds: string[] = ["151527", "4399", "145505"];
        /**特效相对偏移 */
        public static effectrelativeLoc: mw.Vector = new mw.Vector(-80, 0, 0);
        /**装备动画 */
        public static animationGuid: string = "183578";
        /**地面最大加速度修改值 */
        public static maxAcceleration: number = 2000;
        /**地面最大速度修改值 */
        public static maxSpeed: number = 1500;
        /**地面摩擦力修改值 */
        public static groundFriction: number = 0.3;
        /**行走制动速率修改值 */
        public static walkRate: number = 1000;
        /**摄像机弹簧臂位置偏移 */
        public static cameraRelativeLoc: mw.Vector = new mw.Vector(0, 0, 130);
    }

    /**附魔 */
    export class Enchant {
        /**附魔触发器guid */
        public static triggerGuid: string = "3D93BC133BD789C1";
        /**特效Guid */
        public static effectGuid: string = "142961";
        /**特效挂载对象Guid */
        public static effectTargetGuid: string = "1F9255B4";
        /**特效相对位置 */
        public static effectPos: number[] = [0, 0, 89];
        /**特效相对位置 */
        public static effectScale: number[] = [0.6, 0.6, 0.6];
        /**普通附魔表 id范围 */
        public static normalEnchantIdRange: number[] = [1, 42];
        /**特殊附魔 id范围 */
        public static specialEnchantIdRange: number[] = [43, 45];
        /**神话附魔 只有神话宠物才有可能初始携带 id范围 */
        public static mythEnchantIdRange: number[] = [46, 46];
        /**过滤id */
        public static filterIds: number[] = [11, 12, 13, 14, 15, 44];
        /**同时附魔最大数 */
        public static maxEnchantNum: number = 3;
        /**附魔stop界面停留时间/s */
        public static stopTime: number = 3;
        /**附魔单次钻石花费 */
        public static diamondCost: number = 10000;
        /**附魔 词条背景 - 普通、传说、神话、空、未解锁 Guid */
        public static enchantItemGuid: string[] = ["355919", "356154", "357133", "355924", "359012"];
        /**附魔 左侧详情 宠物稀有度背景 普通 稀有 史诗 传说 神话 */
        public static enchantPetRarityGuid: string[] = ["355918", "355920", "355926", "355913", "355925"];
        /**附魔 词条图标 对勾/锁  */
        public static enchantSelectIconGuid: string[] = ["295627", "367715"];
        /**附魔按钮 正常、stop Guid */
        public static enchantBtnGuid: string[] = ["359019", "174843"];

        /**随机生成钻石间隔  /s*/
        public static randomDiamondInterval: number[] = [5, 10];
        /**随机生成钻石数量 */
        public static randomDiamondNum: number[] = [5, 80];
        /**默认best、巨大化 词条的宠物 */
        public static bestPets: number[] = [127, 128, 627, 628, 1127, 1128, 137, 203, 703, 1203];
        /**通行证词条宠物 47词条 */
        public static passportPets: number[] = [136, 137, 202, 702, 1202];
        /**通行证47词条 */
        public static passportEnchantId: number = 47;
        /**best词条id */
        public static bestEnchantId: number = 46;
        /**单双词条权重 */
        public static singleDoubleWeight: number[] = [70, 30]; // 干掉了

        /**特效每帧旋转角度值 */
        public static effectRotate: number = 60;

        /**宠物自动吸收数组  不用填*/
        public static petAutoBuffKeysMap: Map<number, number[]> = new Map();

        public static petAutoBuffKeys(playerId: number): number[] {
            return Gtk.tryGet(Enchant.petAutoBuffKeysMap, playerId, () => []);
        };

        public static clearPlayer(playerId: number) {
            this.petAutoBuffKeysMap.delete(playerId);
        }
    }

    /**任务相关 */
    export class Task {
        /**任务世界UI及区域 */
        public static worldUI: Map<number, string> = new Map<number, string>([[1002, "040D3D06"]]);
        /**任务完成后的字体颜色 */
        public static taskCompleteColor: string = "#A3A3A3";
        /**任务完成后的图标 */
        public static taskCompleteIcon: string = "183279";
        /**滑板id */
        public static ripstikId: number = 3;
        /**钻石id */
        public static diamondIds: number[] = [8, 10];
        /**宠物背包容量id */
        public static petBagId: number[] = [5, 5];
        /**宠物装备数量id */
        public static petEquipId: number[] = [4, 4];
        /**扭蛋表id */
        public static gashaponId: number[] = [2, 2];
        /**升级id 定死 */
        public static levelUpId: number = 5;
    }

    /**快捷传送动效 */
    export class TweenFastTranBtn {
        /**开始角度 */
        public static startAngle: number = -20;
        /**结束角度 */
        public static endAngle: number = 20;
        /**时间 */
        public static tweenTime: number = 0.5;
        /**贝塞尔曲线数据 */
        public static tweenBezier: number[] = [0.25, 1, 0.5, 1];
    }

    /**快捷传送动效 */
    export class CoinsIcon {
        /**第一世界金币 */
        public static firstWorldCoinIcon: string = "176424";
        /**第二世界金币 */
        public static secondWorldCoinIcon: string = "176434";
        /**第三世界金币 */
        public static thirdWorldCoinIcon: string = "176416";
    }

    /**宠物加速canvas动效 */
    export class PetSpeedUp {
        /**出现高度 */
        public static height: number = -200;
        /**出现时间 */
        public static tweenTime: number = 0.5;
        /**贝塞尔曲线数据 */
        public static tweenBezier: number[] = [0.25, 1, 0.5, 1];
    }

    /**排行榜 */
    export class Rank {
        /**排行刷新时间 /s */
        public static refreshTime: number = 20;
        /**排行榜手动刷新cd */
        public static manualRefreshCd: number = 3;
        /**1-3名npcGuid和舞蹈id对应的map */
        public static npcDanceMap: Map<string, string> = new Map([
            ["30E2546D", "84930"],
            ["17AA50EF", "88449"],
            ["0D43B0FB", "29717"],
        ]);
        /**1-3名npcGuid和其世界UI对应的map */
        public static npcWorldUIMap: Map<string, string> = new Map([
            ["30E2546D", "36873A67"],
            ["17AA50EF", "38B58021"],
            ["0D43B0FB", "08FCD1B5"],
        ]);
        /**排行榜item的图标guid  */
        public static itemImageGuids: Map<string, string> = new Map([
            [RankType.Collect, "343791"],
            [RankType.Diamond, "175740"],
        ]);

        /**排行榜世界uiGuid */
        public static worldUIGuid: string = "15AFB5E0";
        /**1-3排名世界uiiGuid */
        // public static rankCountGuid: string[] = ["083FA0C1", "17DAA771", "13D530F8"];
        /**1-3名字颜色 */
        public static nameColors: string = "#FFD800FF";
        /**排行榜ui的位置数组 一世界、三世界*/
        public static rankUIPos: mw.Vector[] = [new mw.Vector(4315, -24, 607), new mw.Vector(112113, -30727, 10287)];
        /**排行榜ui的旋转数组 */
        public static rankUIRot: mw.Rotation[] = [new mw.Rotation(0, 0, -180), new mw.Rotation(0, 0, 0)];
        /**排行榜ui的缩放数组 */
        public static rankUIScale: mw.Vector[] = [new mw.Vector(2.75, 2.75, 2.75), new mw.Vector(2.41, 2.41, 2.41)];
    }

    /**娃娃机 */
    export class DollMachine {
        /**使用一次用时 时间/s */
        public static Time: number = 40;
        /**强制下钩时间  小于 用时*/
        public static ForceDownTime: number = 35;
        /**玩家使用娃娃机的cd */
        public static PlayerCD = 5;

        /**玩家控制抓钩的移动速度 */
        public static HookMoveSpeed: number = 4;

        /**四个爪子前后左右 初始、到勾完 目标 相对旋转 */
        public static ClawArrRota: mw.Rotation[][] = [
            [
                new mw.Rotation(-90, -40, 90),
                new mw.Rotation(90, 40, 90),
                new mw.Rotation(0, 0, 50),
                new mw.Rotation(180, 0, 130),
            ],
            [
                new mw.Rotation(-90, 0, 90),
                new mw.Rotation(90, 0, 90),
                new mw.Rotation(0, 0, 90),
                new mw.Rotation(180, 0, 90),
            ],
        ];
        /**爪子向下运动时间、爪子抓动作完成、返回初始点 时间 ms/s */
        public static ClawDownTime: number[] = [1000, 800, 1000];

        /**爪子下降的高度 */
        public static ClawUpToDownHight: number = 370;

        /**娃娃相对爪子位置 */
        public static DollRelativeClawLoc: mw.Vector[] = [
            new mw.Vector(0, 24, 0),
            new mw.Vector(0, 35, 0),
            new mw.Vector(1.35, 30, 0),
            new mw.Vector(-1.35, 30, 0),
            new mw.Vector(0, 35, 0),
            new mw.Vector(0, 24, 0),
            new mw.Vector(0, 24, 0),
        ];

        /**钩子左右下上晃动 */
        public static HookShaking: number[][] = [
            [0, 3],
            [0, -3],
            [0, -3],
            [0, 3],
            [90, 93],
            [90, 87],
            [90, 87],
            [90, 93],
        ];
        /**宠物蛋生成的时间间隔 */
        public static EggGenerateInterval: number = 0.5;
        /**宠物蛋生成的最大数量 */
        public static EggMaxNumber: number = 40;
    }

    /**rolePlay模块 */
    export class Rp {
        /**跳舞区域触发器Guid */
        public static danceTriggerGuid: string = "2575B703";
        /**跳舞动作Guid */
        public static danceAnimGuid: string = "29748";
    }

    /**公告 */
    export class Notice {
        /**任务宠物 */
        public static taskPet: number[] = [127, 128];
        /**夏日宠物 */
        public static summerPet: number[] = [129, 130];
        /**升级提示次数 */
        public static levelUpTipsCount: number[] = [15, 25];
        /**收集宠物数量数组 */
        public static collectPetCount: number[] = [40, 80, 130];
        /**附魔词条数组 */
        public static enchantBuff: number[] = [43, 44, 45];
        /**大宝箱刮痧Tips */
        public static bigBoxTips: number[] = [65, 66, 67, 129];
    }

    /**全局tips */
    export class GlobalTips {
        /**显示背景时间  ms*/
        public static showBgTime: number = 1500;
        /**显示文字时间 */
        public static showTextTime: number = 5500;
    }

    /**货币交易 */
    export class CurrencyExchange {
        /**钻石与夏日币比值 */
        public static diamondToCoin: number = 100000;
    }

    /**通行证任务 */
    export class PassTask {
        /**通行证任务时间（天*时*分） */
        public static globalTotalVIPTime: number = 30 * 24 * 60;
        /**每日刷新时间（目前是凌晨4点，格式为4:0） */
        public static dailyRefreshTime: string = "4:0";
        /**每周刷新时间（目前是m每周一凌晨4点，格式为4:0） */
        public static weeklyRefreshTime: string = "4:0";

        /**红点最大缩放 */
        public static bigRenderScale: mw.Vector2 = new mw.Vector2(1, 1);
        /**红点最小缩放 */
        public static smallRenderScale: mw.Vector2 = new mw.Vector2(0, 0);
        /**红点缩放时间 */
        public static renderScaleTime: number = 0.2;
        /**红点贝塞尔曲线值 */
        public static renderScaleBezier: number[] = [0.25, 0.1, 0.25, 1];

        /**未解锁背景颜色 */
        public static unLockColor: string = "#FFFFFFFF";
        /**边框颜色数组 未解锁、已解锁、已领取 */
        public static frameColors: string[] = ["#929FA0FF", "#7FBFDC", "FB8E91FF"];
        /**钥匙与星星比值 */
        public static keyToStar: number = 15;
        /**普通玩家完成任务类型个数上限 */
        public static normalPlayerTaskTypeMax: number = 3;

        /**折叠贝塞尔 */
        public static closeTipsBezier: number[] = [0.89, 0.13, 0.21, 0.94];
        /**折叠时间 (ms)*/
        public static closeTpisTime: number = 600;
        /**展开贝塞尔 */
        public static openTipsBezier: number[] = [0.89, 0.13, 0.21, 0.94];
        /**折叠时间 (ms)*/
        public static openTipsTime: number = 600;
    }

    /**特殊扭蛋 */
    export class SpecialEgg {
        /**任务蛋Guid */
        public static taskEggGuid: string = "2552E22014C958F3";
        /**扭蛋1 */
        public static egg1: string = "21B32C12";
        /**扭蛋2 */
        public static egg2: string = "23BF1CF0";
        /**扭蛋3 */
        public static egg3: string = "2A27AEF3";
        /**通行证蛋 */
        public static passportEgg: string = "07CEEC2515A9F281";
    }

    /**奖励补偿 */
    export class RewardCompensation {
        /**钻石 */
        public static diamond: number = 200000;
        /**任务点数 */
        public static taskPoint: number = 200;
    }

    /**解锁广场花费钻石 */
    export class UnlockSquare {
        /**解锁花费钻石 */
        public static diamond: number = 10000;
    }

    /**跳转游戏时携带的数据 */
    export class JumpGame {
        /**主包跳转到交易广场 */
        public static mainJumpToTradingPlaza: string = "From Main";
        /**交易广场跳转到主包 */
        public static tradingPlazaToMain: string = "From TradingPlaza";
    }

    export class Environment {
        /**白天天空盒顶部 */
        public static skyBoxDayTop: string = "#0061B2FF";
        /**白天天空盒上层 */
        public static skyBoxDayUp: string = "#88CEFDFF";
        /**白天天空盒下层 */
        public static skyBoxDayBottom: string = "#0068CDFF";
        /**白天环境光 */
        public static dayLightingColor: string = "#C5C5C5FF";
        /**白天云颜色 */
        public static dayCloudColor: string = "#B0B8C9FF";
        /**白天月亮颜色 */
        public static dayMoonColor: string = "#FFFFFFFF";
        /**白天光照强度 */
        public static dayLightingIntensity: number = 0.8;
        /**白天天空盒亮度 */
        public static daySkyBoxIntensity: number = 1;

        /**天空黄昏盒顶部 */
        public static skyBoxDuskTop: string = "#6D3100FF";
        /**天空黄昏盒上层 */
        public static skyBoxDuskUp: string = "#FD7800FF";
        /**天空盒黄昏下层 */
        public static skyBoxDuskBottom: string = "#7D2501FF";
        /**黄昏环境光 */
        public static duskLightingColor: string = "#F29F91FF";
        /**黄昏云颜色 */
        public static duskCloudColor: string = "#E69E88FF";
        /**黄昏光照强度 */
        public static duskLightingIntensity: number = 0.35;
        /**黄昏天空盒亮度 */
        public static duskSkyBoxIntensity: number = 0.4;

        /**黑夜光照强度 */
        public static nightLightingIntensity: number = 0.1;
        /**黑夜天空盒亮度 */
        public static nightSkyBoxIntensity: number = 0.1;
        /**黑夜月亮颜色 */
        public static nightMoonColor: string = "#9C2520FF";

        /**白天到黄昏过渡时间(秒) */
        public static dayToDuskDuration: number = 25;
        /**黄昏到黑夜过渡时间(秒) */
        public static duskToNightDuration: number = 25;
        /**黑夜到白天过渡时间(秒) */
        public static nightToDayDuration: number = 50;
    }

    /**
     * 体力.
     */
    export class Energy {
        /**
         * 体力 单次恢复上限.
         * @type {number}
         */
        public static readonly ENERGY_RECOVERY_MAX_COUNT = 60;

        /**
         * 体力系数采样数量.
         * @type {number}
         */
        public static readonly ENERGY_RECOVERY_SAMPLE_COUNT: number = 5;

        /**
         * 体力 恢复间隔. min
         * @type {number}
         */
        public static readonly ENERGY_RECOVERY_INTERVAL: number = 2;

        /**
         * 体力 恢复间隔. ms
         * @type {number}
         */
        public static get ENERGY_RECOVERY_INTERVAL_MS(): number {
            return this.ENERGY_RECOVERY_INTERVAL * 60 * 1000;
        }

        /**
         * 体力 失效再唤醒间隔.
         * @type {number}
         */
        public static readonly ENERGY_INVALID_RE_ALIVE_DURATION: number = 100;

        /**
         * 体力 修改合批次数.
         * @type {number}
         */
        public static readonly ENERGY_PATCH_RPC_COUNT = 10;

        /**
         * 体力 倍率.
         * @type {number}
         */
        public static readonly ENERGY_RATIO = 1 / 3;
    }

    /**
     * Auth 及 通信.
     */
    export class Auth {
        /**
         * 敏感数据重取间隔. ms
         * @type {number}
         */
        public static readonly KEY_STORAGE_GET_FAILED_REFRESH_INTERVAL = 3e3;

        /**
         * 最小访问间隔. ms
         * @type {number}
         */
        public static readonly MIN_ACCESS_INTERVAL = 0.5e3;

        /**
         * 最大订单日志数量.
         * @type {number}
         */
        public static readonly MAX_ORDER_LOG_COUNT = 50;

        /**
         * Token 过期刷新间隔. ms
         * @type {number}
         */
        public static readonly EXPIRED_REFRESH_INTERVAL = 10e3;
    }

    export enum PetCharacterType {
        GameObject = 0,
        Character = 1,
    }
}
