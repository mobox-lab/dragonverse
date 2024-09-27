import { JModuleData } from "../../depend/jibu-module/JModule";

export default class TalentModuleData extends JModuleData {
    /**
     * 已选择的天赋树
     * @type {object} -- {天赋Id:解锁点数}
     */
    @Decorator.persistence()
    talentMap: Record<string, number> = {};

    @Decorator.persistence()
    dailyCount: number = 0;

    get allTalents(): Record<string, number> {
        // return this.talentMap copy
        return Object.assign({}, this.talentMap);
    }

    get allTalentCount(): number {
        return Object.keys(this.talentMap)?.length ?? 0;
    }

    protected initDefaultData(): void {
        this.currentVersion = this.version;
        this.talentMap = {};
        this.dailyCount = 0;
    }

    /**
     * 查询天赋等级
     * @param {number} id
     * @returns {number}
     */
    public getTalentIndex(id: number): number {
        return this.talentMap[id] ?? 0;
    }

    public setTalentIndex(id: number, index: number) {
        this.talentMap[id] = index;
    }

}
