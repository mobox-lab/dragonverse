import { GameManager } from "../../GameManager";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { UserDragonRespData } from "../auth/AuthModule";
import { DragonDataModuleC } from "../dragonData/DragonDataModuleC";
import { DragonDataModuleS } from "../dragonData/DragonDataModuleS";
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

    public static getDragonIndex(id: number): number {
        const dragonData = ModuleService.getModule(DragonDataModuleC).dragonData;
        // console.log("getDragonIndex C", JSON.stringify(dragonData));
        const index = this.getDragonIndexByData(dragonData, id);
        // console.log("getDragonIndex C 2", id, index);
        return index;
    }

    public static getDragonIndexByData(dragonData: UserDragonRespData | undefined, id: number) {
        let index = 0;
        if (dragonData && Array.isArray(dragonData?.DragonPalList)) {
            let dragons = [];
            if (id === 2001) {
                //  光龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 10 && d.dragonPalId < 20);
            } else if (id === 2002) {
                // 暗龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 20 && d.dragonPalId < 30);
            } else if (id === 2003) {
                // 水龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 30 && d.dragonPalId < 40);
            } else if (id === 2004) {
                //  火龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 40 && d.dragonPalId < 50);
            } else if (id === 2005) {
                // 木龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 50 && d.dragonPalId < 60);
            } else if (id === 2006) {
                // 土龙娘
                dragons = dragonData.DragonPalList.filter((d) => d.dragonPalId > 60 && d.dragonPalId < 70);
            } else {
                return index;
            }

            const ids = dragons.map((item) => item.dragonPalId);
            const uniqueIds = [...new Set(ids)];
            if (uniqueIds.length >= 6) {
                index = 3;
            } else if (uniqueIds.length >= 3) {
                index = 2;
            } else if (uniqueIds.length >= 1) {
                index = 1;
            }
            return index;
        }
        return index;
    }

    public static getModuleCRunesValueById(id: number) {
        if (id > 2000) {
            const index = this.getDragonIndex(id);
            if (index > 0) {
                const value = this.getRunesConfigByKey(id, index - 1);
                return value;
            } else {
                return 0;
            }
        }
        const index = this.getModuleCRunesIndexById(id);
        // 无尽天赋
        if (id === 1047 || id === 1048 || id === 1049) {
            if (index > 0) {
                const stage = GameManager.getStageClient();
                if (stage && stage.stageCfgId) {
                    const stageCfg = GameConfig.Stage.getElement(stage.stageCfgId);
                    const isInfinite = Utils.isInfiniteMode(stageCfg?.groupIndex);
                    if (isInfinite) {
                        const value = this.getInfiniteRunesConfigByKey(id);
                        return index * value;
                    } else {
                        return 0;
                    }
                } else {
                    return 0;
                }
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

    public static getModuleSRunesValueById(id: number, player: Player) {
        if (id > 2000) {
            const dragonData = ModuleService.getModule(DragonDataModuleS).getDragonData(player);
            const index = this.getDragonIndexByData(dragonData, id);
            if (index > 0) {
                const value = this.getRunesConfigByKey(id, index - 1);
                return value;
            } else {
                return 0;
            }
        }
        const index = this.getModuleSRunesIndexById(id, player.userId);
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

    public static calcExp4Lv(lv: number, exp: number, times: number[][]) {
        let multiplier = times[0][1];

        let currentSegmentIndex = 0;

        for (let currentLevel = 1; currentLevel < lv; currentLevel++) {
            if (currentSegmentIndex < times.length - 1 && currentLevel >= times[currentSegmentIndex + 1][0]) {
                currentSegmentIndex++;
                multiplier = times[currentSegmentIndex][1];
            }
            exp *= multiplier;
        }

        return Math.round(exp);
    }
}
