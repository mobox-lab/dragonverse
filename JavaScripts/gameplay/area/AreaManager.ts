import { GameConfig } from "../../config/GameConfig";
import { Singleton } from "../../depend/singleton/Singleton";
import GToolkit from "../../util/GToolkit";
import Shape from "../../util/area/Shape";

export default class AreaManager extends Singleton<AreaManager>() {
    private areaMap: Map<number, Shape[]> = new Map<number, Shape[]>();

    protected onConstruct(): void {
        super.onConstruct();

        GameConfig.Area.getAllElement().forEach((value) => {
            const areas: Shape[] = [];

            for (const range of value.range) {
                if (range.length % 2) {
                    GToolkit.error(AreaManager, `range param invalid. length is not even.`);
                } else {
                    const area = Shape.toSeqPoint(GToolkit.fold(range, 2, (data) => {
                        return { x: data[0], y: data[1] };
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
        const areas: Shape[] = [];
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
