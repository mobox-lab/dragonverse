import { ICollectibleItemElement } from "../../config/CollectibleItem";
import { GameConfig } from "../../config/GameConfig";
import { IBagItemElement } from "../../config/BagItem";
import { QualityTypes } from "../../const/QualityTypes";
import { ResultAlgo, ResultAlgoFactory, ResultAlgoTypes } from "./ResultAlgoTypes";

/**
 * Collectible Item.
 * 可收集物.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export default class CollectibleItem {
    private _id: number;

    /**
     * ID.
     */
    public get id(): number {
        return this._id;
    }

    private _hitPoint: number;

    private _isGenerated: boolean = false;

    private _generateTime: number = null;

    private _location: Vector = null;

    public autoDestroyTimerId: number = null;

    /**
     * 剩余可采集次数.
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
     * 是否 可采集.
     */
    public get isCollectible(): boolean {
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
     * 采集.
     */
    public collect() {
        --this._hitPoint;
    }

    public info(): string {
        return `id:${this._id}, hitPoint:${this._hitPoint}, generateTime:${new Date(this._generateTime)}, location:${this._location}`;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Config

    /**
     * 采集成功率. [0,1]
     * @config
     */
    public static successRate(id: number): number {
        return this.getConfig(id).successRate / 100;
    }

    /**
     * 名称.
     * @config
     */
    public static nameStr(id: number): string {
        return this.getBagConfig(id).name;
    };

    /**
     * 描述.
     * @config
     */
    public static desc(id: number): string {
        return this.getBagConfig(id).desc;
    };

    /**
     * 品质.
     * @config
     */
    public static quality(id: number): QualityTypes {
        return this.getConfig(id).qualityId as QualityTypes;
    };

    /**
     * 最大存在数量.
     * @config
     */
    public static maxExistenceCount(id: number): number {
        return this.getConfig(id).existenceCount;
    }

    /**
     * 最大存在时间 ms.
     * @config
     */
    public static maxExistenceTime(id: number): number {
        return this.getConfig(id).existenceTime * 1000;
    }

    /**
     * 采集结果算法.
     * @config
     */
    public static resultAlgo(id: number): ResultAlgo {
        return ResultAlgoFactory(this.getConfig(id).resultAlgo as ResultAlgoTypes);
    }

    /**
     * 生成间隔 ms.
     * @param id
     */
    public static generationInterval(id: number): number {
        return this.getConfig(id).generationInterval * 1000;
    }

    public static bagId(id: number): number {
        return this.getConfig(id).bagId;
    }

    public static getConfig(id: number): ICollectibleItemElement {
        return GameConfig.CollectibleItem.getElement(id);
    }

    public static getBagConfig(id: number): IBagItemElement {
        return GameConfig.BagItem.getElement(this.getConfig(id).bagId);
    }

    public getConfig(): ICollectibleItemElement {
        return CollectibleItem.getConfig(this._id);
    }

    public getBagConfig(): IBagItemElement {
        return CollectibleItem.getBagConfig(this._id);
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}