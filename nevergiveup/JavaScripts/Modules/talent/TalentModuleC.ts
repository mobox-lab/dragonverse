import { JModuleC } from "../../depend/jibu-module/JModule";
import YoactArray from "../../depend/yoact/YoactArray";
import TalentModuleS from "./TalentModuleS";
import IUnique from "../../depend/yoact/IUnique";
import TalentModuleData from "./TalentModuleData";
import { GameConfig } from "../../config/GameConfig";
import PlayerModuleC from "../PlayerModule/PlayerModuleC";

export class TalentItemUnique implements IUnique {
    public id: number;
    public index: number;

    public static arrayFromObject(data: TalentModuleData): TalentItemUnique[] {
        const result: TalentItemUnique[] = [];
        for (const key in data.talentMap) {
            const element = data.talentMap[key];
            result.push(new TalentItemUnique(Number(key), element));
        }
        return result;
    }

    constructor(id: number, index: number) {
        this.id = id;
        this.index = index;
    }

    public move(updated: this): boolean {
        let changed: boolean = false;
        if (this.index !== updated.index) {
            changed = true;
            this.index = updated.index;
        }

        return changed;
    }

    public primaryKey = (): number => this.id;

}

export default class TalentModuleC extends JModuleC<TalentModuleS, TalentModuleData> {
    private _playC: PlayerModuleC;
    public talentItemYoact: YoactArray<TalentItemUnique> = new YoactArray<TalentItemUnique>();

    private get playC(): PlayerModuleC | null {
        if (!this._playC) this._playC = ModuleService.getModule(PlayerModuleC);
        return this._playC;
    }

    protected onJStart(): void {
        super.onJStart();

        this.talentItemYoact.setAll(TalentItemUnique.arrayFromObject(this.data));
    }

    /**
     * 检查是否足够消费
     * @param {number[]} nums
     * @returns {boolean}
     * @private
     */
    private checkEnoughCost(nums: number[]): boolean {
        const [gold, tech] = nums;
        const enoughGold = this.playC.checkGold(gold);
        const enoughTech = this.playC.checkTechPoint(tech);
        return enoughGold && enoughTech;
    }

    /**
     * 获取天赋解锁点数
     * @param {number} id
     * @returns {number}
     */
    public getTalentIndex(id: number): number {
        return this.talentItemYoact.getItem(id)?.index ?? 0;
    }

    public tryTalentLevelUp(id: number) {
        const talent = GameConfig.TalentTree.getElement(id);
        const level = this.getTalentIndex(id);
        const isEnoughCost = this.checkEnoughCost([talent.cost[0][level + 1], talent.cost[1][level + 1]]);
        if (!isEnoughCost) return;
        console.log("tryTalentLevelUp: ", 123);
    }
}





