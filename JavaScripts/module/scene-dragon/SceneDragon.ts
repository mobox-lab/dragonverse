import { GameConfig } from "../../config/GameConfig";
import { IBagItemElement } from "../../config/BagItem";
import { QualityTypes } from "../../const/QualityTypes";
import Shape from "../../util/area/Shape";
import AreaManager from "../../gameplay/area/AreaManager";
import {
    SuccessRateAlgo,
    SuccessRateAlgoFactory,
    SuccessRateAlgoTypes,
} from "../collectible-item/SuccessRateAlgoTypes";
import { IDragonElement } from "../../config/Dragon";

/**
 * Scene Dragon.
 * 场景龙. (可捕捉龙).
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
export default class SceneDragon {
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
    public generate(id: number) {
        this._id = id;

        this._hitPoint = this.getConfig().hitPoint;
        this.randomGenerate();
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

    /**
     * 随机生成位置.
     * @private
     */
    private randomGenerate() {
        const p = Shape.randomPoint(AreaManager.getInstance().getAreas(SceneDragon.generationAreaId(this._id)));
        if (!p) {
            return;
        }
        this._location = new Vector(p.x, p.y, 0);
    }

    public info(): string {
        return `id:${this._id}, hitPoint:${this._hitPoint}, generateTime:${new Date(this._generateTime)}, birth location:${this._location}`;
    }

//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

//#region Config

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
     * 生成区域.
     * @param id
     */
    public static generationAreaId(id: number): number[] {
        return this.getConfig(id).generationAreaId;
    }

    /**
     * 最大存在时间 ms.
     * @config
     */
    public static maxExistenceTime(id: number): number {
        return this.getConfig(id).existenceTime * 1000;
    }

    /**
     * 生成间隔 ms.
     * @param id
     */
    public static generationInterval(id: number): number {
        return this.getConfig(id).generationInterval * 1000;
    }

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

    public static getConfig(id: number): IDragonElement {
        return GameConfig.Dragon.getElement(id);
    }

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