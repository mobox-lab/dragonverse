import { Singleton } from "../../depend/singleton/Singleton";
import PolygonShape from "../../util/area/Shape";
import { GameConfig } from "../../config/GameConfig";
import GToolkit from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";

export default class AreaManager extends Singleton<AreaManager>() {
    private areaMap: Map<number, PolygonShape[]> = new Map<number, PolygonShape[]>();

    protected onConstruct(): void {
        super.onConstruct();

        GameConfig.Area.getAllElement().forEach((value) => {
            const areas: PolygonShape[] = [];

            for (const range of value.range) {
                if (range.length % 2) {
                   Log4Ts.error(AreaManager, `range param invalid. length is not even.`);
                } else {
                    const area = PolygonShape.toSeqPoint(GToolkit.fold(range, 2, (data) => {
                        return {x: data[0], y: data[1]};
                    }));
                    areas.push(area);
                }
            }
            this.areaMap.set(value.id, areas);
        });
    }

    /**
     * 获取区域.
     * @param id
     */
    public getArea(id: number) {
        return this.areaMap.get(id);
    }

    /**
     * 获取区域集合.
     * @param ids
     */
    public getAreas(ids: number[]) {
        const areas: PolygonShape[] = [];
        if (!ids) return areas;

        ids.forEach((value) => {
            const area = this.getArea(value);
            if (area) {
                areas.push(...area);
            }
        });
        return areas;
    }
}
