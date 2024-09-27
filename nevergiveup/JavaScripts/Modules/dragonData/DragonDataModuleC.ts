import { GameConfig } from "../../config/GameConfig";
import { DragonElemental, TowerElementType } from "../../const/enum";
import { JModuleC } from "../../depend/jibu-module/JModule";
import IUnique from "../../depend/yoact/IUnique";
import YoactArray from "../../depend/yoact/YoactArray";
import { UserDragonRespData } from "../auth/AuthModule";
import DragonDataModuleData from "./DragonDataModuleData";
import { DragonDataModuleS } from "./DragonDataModuleS";

export class DragonBlessListUnique implements IUnique {
    public categoryId: DragonElemental;
    public id: number; // dragonPalId
    public index: number; // 顺序
    public cnt: number;

    public static arrayFromByteArray(data: UserDragonRespData, categoryId: DragonElemental): DragonBlessListUnique[] {
        const dragonIds = GameConfig.Dragon.getAllElement()
            .filter((cfg) => cfg.elementalId === categoryId)
            .map((cfg) => cfg.dragonPalId);
        const arr: { id: number; cnt: number; categoryId: DragonElemental }[] = [];
        for (const id of dragonIds) {
            const list = data?.DragonPalList ?? [];
            const cnt = list.length ? list.find((d) => d.dragonPalId === id)?.amount ?? 0 : 0;
            arr.push({ id, cnt, categoryId });
        }
        arr.sort((a, b) => b.cnt - a.cnt);
        console.log("#debug dragonIds:" + dragonIds + " data:" + JSON.stringify(data));
        return arr.map(({ id, cnt, categoryId }, index) => new DragonBlessListUnique(id, cnt, categoryId, index));
    }

    constructor(id: number, cnt: number, categoryId: DragonElemental, index: number) {
        this.categoryId = categoryId;
        this.cnt = cnt;
        this.id = id;
        this.index = index;
    }

    //#region IUnique
    public move(updated: this): boolean {
        this.id = updated.id;
        this.categoryId = updated.categoryId;
        this.cnt = updated.cnt;
        this.index = updated.index;
        return true;
    }

    public primaryKey(): number {
        return this.id;
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
export class DragonDataModuleC extends JModuleC<DragonDataModuleS, DragonDataModuleData> {
    /**
     * 龙娘数据
     * @type {UserDragonRespData|undefined}
     */
    public dragonData: UserDragonRespData | undefined = undefined;
    /**
     * 龙娘祝福列表
     */
    public dragonBlessListYoactArr: YoactArray<DragonBlessListUnique>[] = [];

    protected onJStart(): void {
        this.queryDragon();
    }
    public async queryDragon() {
        const res = await this.server.net_queryUserDragon();
        this.dragonData = res;
        console.log("DragonData:", JSON.stringify(this.dragonData));
        const categoryIds = Object.values(DragonElemental)
            .filter((v) => Number(v) >= 0)
            .map((v) => Number(v) as DragonElemental);
        this.dragonBlessListYoactArr = categoryIds.map((cid) => {
            return new YoactArray<DragonBlessListUnique>().setAll(
                DragonBlessListUnique.arrayFromByteArray(this.dragonData, cid)
            );
        });
    }
}
