import { GameConfig } from "../../config/GameConfig";
import { IBagItemElement } from "../../config/BagItem";
import { QualityTypes } from "../../const/QualityTypes";
import {
    SuccessRateAlgo,
    SuccessRateAlgoFactory,
    SuccessRateAlgoTypes,
} from "../collectible-item/SuccessRateAlgoTypes";
import { IDragonElement } from "../../config/Dragon";

/**
 * Scene Dragon instance.
 * 场景龙. (可捕捉龙).
 * @desc 该类型下 id 语义为场景龙 id.
 * @desc ---
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class SceneDragon {
//#region Constant
    /**
     * 最小寻路距离.
     */
    public static readonly NAVIGATION_RANDOM_MIN_DISTANCE = 1000;

    /**
     * 最大寻路距离.
     */
    public static readonly NAVIGATION_RANDOM_MAX_DISTANCE = 8000;

    /**
     * 行走速度上限.
     */
    public static readonly WALK_SPEED = 100;

    /**
     * 跑步速度上限.
     */
    public static readonly RUN_SPEED = 450;

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    private _id: number;

    /**
     * 个性龙 ID.
     */
    public get id(): number {
        return this._id;
    }

    private _hitPoint: number;

    private _isGenerated: boolean = false;

    private _generateTime: number = null;

    private _location: Vector = null;

    /**
     * 剩余可捕捉次数.
     */
    public get hitPoint(): number {
        return this._hitPoint;
    }

    /**
     * 生成时间.
     */
    public get generateTime(): number {
        return this._generateTime;
    }

    /**
     * 是否 已注册生成.
     */
    public get isGenerated(): boolean {
        return this._isGenerated;
    }

    /**
     * 是否 可捕捉.
     */
    public get isCatchable(): boolean {
        return this._hitPoint > 0;
    }

    /**
     * 位置.
     */
    public get location(): Vector {
        return this._location;
    }

//#region Method
    public sync(
        id: number,
        hitPoint: number,
        generateTime: number,
        location: Vector): this {
        this._id = id;
        this._hitPoint = hitPoint;
        this._generateTime = generateTime;
        this._location = location;
        this._isGenerated = true;
        return this;
    }

    /**
     * 生成.
     */
    public generate(id: number, location: Vector) {
        this._id = id;
        this._location = location;
        this._hitPoint = this.getConfig().hitPoint;
        this._generateTime = Date.now();
        this._isGenerated = true;
    }

    /**
     * 移除.
     */
    public destroy() {
        this._generateTime = null;
        this._location = null;
        this._isGenerated = false;
    }

    /**
     * 捕捉.
     */
    public catch() {
        --this._hitPoint;
    }

    public info(): string {
        return `id:${this._id}, hitPoint:${this._hitPoint}, generateTime:${new Date(this._generateTime)}, birth location:${this._location}`;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Config

    /**
     * 名称.
     * @config
     * @param id
     */
    public static nameStr(id: number): string {
        return this.getBagConfig(id).name;
    };

    /**
     * 描述.
     * @config
     * @param id
     */
    public static desc(id: number): string {
        return this.getBagConfig(id).desc;
    };

    /**
     * 品质.
     * @config
     * @param id
     */
    public static quality(id: number): QualityTypes {
        return this.getConfig(id).qualityId as QualityTypes;
    };

    /**
     * 捕捉消耗.
     * @param id
     */
    public static cost(id: number): number {
        return this.getConfig(id).cost;
    }

    /**
     * 捕捉成功率算法.
     * @config
     */
    public static successRateAlgo(id: number): SuccessRateAlgo {
        return SuccessRateAlgoFactory(this.getConfig(id).successRateAlgoId as SuccessRateAlgoTypes);
    }

    /**
     * 背包 id.
     * @config
     * @param id
     */
    public static bagId(id: number): number {
        return this.getConfig(id).bagId;
    }

    /**
     * 龙 配置.
     * @param id 龙 id.
     */
    public static getConfig(id: number): IDragonElement {
        return GameConfig.Dragon.getElement(id);
    }

    /**
     * 背包 配置.
     * @param id 个性龙 id.
     */
    public static getBagConfig(id: number): IBagItemElement {
        return GameConfig.BagItem.getElement(this.getConfig(id).bagId);
    }

    public getConfig(): IDragonElement {
        return SceneDragon.getConfig(this._id);
    }

    public getBagConfig(): IBagItemElement {
        return SceneDragon.getBagConfig(this._id);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}