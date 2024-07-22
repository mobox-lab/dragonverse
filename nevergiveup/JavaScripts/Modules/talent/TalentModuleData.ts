import { JModuleData } from "../../depend/jibu-module/JModule";

export default class TalentModuleData extends JModuleData {
    /**
     * 已选择的天赋树
     * @type {object} -- {天赋Id:解锁点数}
     */
    @Decorator.persistence()
    talentMap: Record<string, number> = {};

    protected initDefaultData(): void {
        this.currentVersion = this.version;
        this.talentMap = {};
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
