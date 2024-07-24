import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import TalentModuleC from "./TalentModuleC";
import TalentModuleS from "./TalentModuleS";

export default class TalentUtils {
    public static getRunesConfigByKey(key: number, index: number | undefined | null): number {
        const config = GameConfig.TalentBuff.getElement(key);
        if (config) {
            const res: number = Utils.isNotNullOrUndefined(index) ? config.value[index] : 0;
            return res;
        } else {
            return 0;
        }
    }

    // 无尽模式
    public static getInfiniteRunesConfigByKey(key: number): number {
        const config = GameConfig.TalentBuff.getElement(key);
        if (config) {
            const value: number = config.value?.[0] || 0;
            return value;
        } else {
            return 0;
        }
    }

    public static getModuleCRunesIndexById(id: number) {
        const moduleC = ModuleService.getModule(TalentModuleC);
        const index = moduleC.getTalentIndex(id);
        return index;
    }

    public static getModuleSRunesIndexById(id: number, userId: string) {
        const moduleS = ModuleService.getModule(TalentModuleS);
        const index = moduleS.getPlayerTalentIndex(userId, id);
        return index;
    }

    public static getModuleCRunesValueById(id: number) {
        // todo 龙娘的id
        if (id > 2000) {
            return 0;
        }
        const index = this.getModuleCRunesIndexById(id);
        // 无尽天赋
        if (id === 1047 || id === 1048 || id === 1049) {
            if (index > 0) {
                const value = this.getInfiniteRunesConfigByKey(id);
                return index * value;
            } else {
                return 0;
            }
        }

        if (index > 0) {
            const value = this.getRunesConfigByKey(id, index - 1);
            return value;
        } else {
            return 0;
        }
    }

    public static getModuleSRunesValueById(id: number, userId: string) {
        // todo 龙娘的id
        if (id > 2000) {
            return 0;
        }
        const index = this.getModuleSRunesIndexById(id, userId);
        // 无尽天赋
        if (id === 1047 || id === 1048 || id === 1049) {
            if (index > 0) {
                const value = this.getInfiniteRunesConfigByKey(id);
                return index * value;
            } else {
                return 0;
            }
        }
        if (index > 0) {
            const value = this.getRunesConfigByKey(id, index - 1);
            return value;
        } else {
            return 0;
        }
    }
}
