import { JModuleC } from "../../depend/jibu-module/JModule";
import YoactArray from "../../depend/yoact/YoactArray";
import TalentModuleS from "./TalentModuleS";
import IUnique from "../../depend/yoact/IUnique";
import TalentModuleData from "./TalentModuleData";

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
    public talentItemYoact: YoactArray<TalentItemUnique> = new YoactArray<TalentItemUnique>();

    protected onJStart(): void {
        super.onJStart();

        this.talentItemYoact.setAll(TalentItemUnique.arrayFromObject(this.data));
    }

    /**
     * 获取天赋解锁点数
     * @param {number} id
     * @returns {number}
     */
    public getTalentIndex(id: number): number {
        return this.talentItemYoact.getItem(id)?.index ?? 0;
    }
}





