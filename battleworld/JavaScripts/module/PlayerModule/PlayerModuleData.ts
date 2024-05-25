
import { EPlayerFightState } from "../../const/Enum";
import { Globaldata } from "../../const/Globaldata";
import { Attribute } from "./sub_attribute/AttributeValueObject";



/**伤害类型 */
export enum EnumDamageType {
    /**普通*/
    normal,
    /**暴击*/
    crit
}

// 伤害显示信息
export interface HitDamageInfo {
    from: number;
    target: number;
    value: number;
    type: EnumDamageType;
    soundId?: number,
    effectId?: number,
}


export class BattleWorldPlayerModuleData extends Subdata {

    /**是否为新玩家 */
    @Decorator.persistence()
    public isNewPlayer: boolean = true;

    public setNotNewPlayer() {
        this.isNewPlayer = false;
        this.save(true);
    }


    /**属性点变化事件 */
    public onattributeCountChange: mw.Action = new mw.Action();

    @Decorator.persistence()
    private reserveAttribute: Attribute.AttributeArray;


    /**是否格挡 */
    public isParry: boolean = false;
    /**格挡按钮按下时间 */
    public clickBtnTime: number = 0;
    /**是否防御 */
    public isDefense: boolean = false;
    /**玩家当前是否战斗状态 */
    public isFightStatus: boolean = false;
    /**玩家当前是否战斗中受伤状态 */
    public isFightStatusBeHurt: boolean = false;
    /**战斗状态key */
    private _fightKey: any = null;
    /**战斗受伤状态key */
    private _fightBeHurtKey: any = null;
    /**玩家当前 战斗状态 */
    public state: EPlayerFightState = EPlayerFightState.none;
    /**玩家是否无敌 */
    public isInvincible: boolean = false;
    /**是否无限能量 */
    public isInfiniteEnergy: boolean = false;
    /**是否开始传送 */
    public istransform: boolean = false;
    /**传送key*/
    private transformKey: any = null;

    /**玩家击杀其它玩家数量 只有死亡时才清空*/
    private killPlayerCount: number = 0;


    public get dataName() {
        return "PlayerModuleData";
    }

    //当前最新的版本号(默认是1，升级数据需要重写)
    protected override get version() {
        return 3;
    }

    constructor() {
        super();
    }

    protected initDefaultData() {
        this.reserveAttribute = {};

        this.reserveAttribute[Attribute.EnumAttributeType.exp] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.lv] = 1;
        this.reserveAttribute[Attribute.EnumAttributeType.money] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeCount] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeEnergy] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeHp] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeAtk] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeMagic] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.attributeAtkSkill] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.rankScore] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.lastDayRankCheckTime] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.dayRankScore] = 0;
        this.reserveAttribute[Attribute.EnumAttributeType.isShowRank] = 0;
    }

    protected onDataInit(): void {
        if (!this.currentVersion) {
            this.currentVersion = 1;
        }
        let checkCount = 10;
        while (this.version != this.currentVersion) {
            checkCount--;
            if (checkCount <= 0) break;

            switch (this.currentVersion) {
                case 1:
                    this.currentVersion = 2;//设置当前版本
                    this.reserveAttribute[Attribute.EnumAttributeType.rankScore] = 0;
                    this.reserveAttribute[Attribute.EnumAttributeType.lastDayRankCheckTime] = 0;
                    this.reserveAttribute[Attribute.EnumAttributeType.dayRankScore] = 0;
                    break;
                case 2:
                    this.currentVersion = 3;//设置当前版本
                    this.reserveAttribute[Attribute.EnumAttributeType.isShowRank] = 0;
                    break;
                default:
                    console.log("未处理的数据版本~");
            }
        }
    }


    /**获取玩家属性值 */
    public getAttrValue(attrType: Attribute.EnumAttributeType) {
        return this.reserveAttribute[attrType];
    }

    /**
     * 设置玩家属性
     * @param attrType 属性类型 
     * @param value 属性值
     */
    public setAttrValue(attrType: Attribute.EnumAttributeType, value: number, isSave: boolean = false, isSyncClient: boolean = false) {
        this.reserveAttribute[attrType] = value;
        if (SystemUtil.isServer() && isSave) {
            this.save(isSyncClient);
        }
    }


    /**切换为战斗状态 */
    public changeFightStatus(isHurt: boolean) {
        //if (this.isFightStatus && isHurt) {
        if (isHurt) {
            this.isFightStatusBeHurt = true;
            this.start_to_FightStatusBeHurt();
        }
        this.isFightStatus = true;
        this.start_to_nofightStatus();
    }

    /**
     * 计时到达后，切换为非战斗状态
     */
    private start_to_nofightStatus() {
        this.clear_to_nofightStatus();
        this._fightKey = setTimeout(() => {
            this._fightKey = null;
            this.isFightStatusBeHurt = false;
            this.isFightStatus = false;
        }, Globaldata.fightKeepTime * 1000);
    }
    private clear_to_nofightStatus() {
        if (this._fightKey) {
            clearTimeout(this._fightKey);
            this._fightKey = null;
        }
    }

    /**
     * 计时到达后，切换为战斗状态
     */
    private start_to_FightStatusBeHurt() {

        this.clear_to_FightStatusBeHurt();

        this._fightBeHurtKey = setTimeout(() => {
            this._fightBeHurtKey = null;
            this.isFightStatusBeHurt = false;
            this.isFightStatus = true;
        }, Globaldata.fightKeepTimeHP * 1000);

    }
    private clear_to_FightStatusBeHurt() {
        if (this._fightBeHurtKey) {
            clearTimeout(this._fightBeHurtKey);
            this._fightBeHurtKey = null;
        }
    }

    /** 
     * 开始传送
     */
    public startTransform() {
        this.clearTransform();
        this.istransform = true;
        this.transformKey = setTimeout(() => {
            this.istransform = false;
            this.transformKey = null;
        }, 1000);
    }

    /**
     * 清理传送定时器
     */
    public clearTransform() {
        if (this.transformKey) {
            clearTimeout(this.transformKey);
            this.transformKey = null;
        }
    }

    /**增加击杀数量 */
    public addKillCount() {
        this.killPlayerCount++;
    }

    /**清理击杀数量 */
    public clearKillCount() {
        this.killPlayerCount = 0;
    }
    /**获取击杀数量 */
    public getKillCount() {
        return this.killPlayerCount;
    }


    // private defValues: number[] = [];

    // /**减伤记录增加 */
    // public addDefRecord(value: number) {
    //     if (value <= 0) return;
    //     this.defValues.push(value);
    // }

    // /**移除减伤记录 */
    // public reduceDefRecrod(value: number) {
    //     let findIndex = this.defValues.findIndex((tmpValue) => {
    //         return tmpValue == value;
    //     });
    //     if (findIndex == -1) {
    //         return;
    //     }
    //     this.defValues.splice(value, 1);
    // }

    // /**获取减伤记录 */
    // public getDefRecord() {
    //     return this.defValues;
    // }

    private perGainMap: Map<number, number[]> = new Map();

    /**百分比加成记录  */
    public addPerGainRecrod(type: Attribute.EnumAttributeType, value: number) {

        if (value == 0) {
            return;
        }

        // 判断是否为百分比增益的type
        let perGain = Math.floor(type / 100);
        if (perGain != 2) {
            return;
        }

        if (this.perGainMap.has(type) == false) {
            this.perGainMap.set(type, []);
        }
        this.perGainMap.get(type).push(value);
    }

    /**移除记录 */
    public reducePerGainRecrod(type: Attribute.EnumAttributeType, value: number) {
        if (this.perGainMap.has(type) == false) {
            return;
        }
        let recordValues = this.perGainMap.get(type);
        let findIndex = recordValues.findIndex((tmpValue) => {
            return tmpValue == value;
        });
        if (findIndex == -1) {
            return;
        }
        recordValues.splice(findIndex, 1);
    }

    /**获取百分比增益记录记录 */
    public getPerGainRecord(type: Attribute.EnumAttributeType) {
        if (this.perGainMap.has(type) == false) {
            return;
        }

        return this.perGainMap.get(type);
    }


    /**进入战场时的时间戳 */
    private enterBattleStampTime: number = 0;

    /**记录进入战场时的时间戳 */
    public enterBattleTime() {
        this.enterBattleStampTime = Date.now();
    }

    /**获取存活时间 */
    public getSurviveTime() {
        return Math.floor((Date.now() - this.enterBattleStampTime) / 1000);
    }

}

