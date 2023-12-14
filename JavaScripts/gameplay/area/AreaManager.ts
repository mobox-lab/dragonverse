import { Singleton } from "../../depend/singleton/Singleton";
import {
    AnyShape,
    IPoint3,
    PolygonShape,
    IShape3,
    Point3FromArray,
    Point3SetShape,
} from "../../util/area/Shape";
import { GameConfig } from "../../config/GameConfig";
import GToolkit from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Enumerable from "linq";
import { ConfigBase } from "../../config/ConfigBase";
import { ICollectibleItemElement } from "../../config/CollectibleItem";
import { IDragonElement } from "../../config/Dragon";
import { BagTypes } from "../../module/bag/BagItemCluster";
import CollectibleItem from "../../module/collectible-item/CollectibleItem";

export default class AreaManager extends Singleton<AreaManager>() {
//#region Constant
    private static readonly POINTS_3D_AREA_HOLDER_TAG = "points-3d-area-holder-tag";
    private static readonly SHAPE_2D_AREA_HOLDER_TAG = "shape-2d-area-holder-tag";
    public static readonly AREA_ID_TAG_PREFIX = "area-id-tag-";
//#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    private _areaMap: Map<number, AnyShape[]> = new Map<number, AnyShape[]>();

    private _injected: boolean = false;

    protected onConstruct(): void {
        super.onConstruct();

        GameConfig.Area.getAllElement().forEach((value) => {
            const areas: AnyShape[] = [];
            const pointsIn3D: IPoint3 [] = [];

            for (const point of value.points) {
                const isPoint3 = point.length === 3;
                if (isPoint3) {
                    pointsIn3D.push(Point3FromArray(point));
                    continue;
                }
                if (point.length % 2) {
                    Log4Ts.error(AreaManager, `range param invalid. length is not even.`);
                } else {
                    const area = PolygonShape.toSeqPoint(GToolkit.fold(point, 2, (data) => {
                        return {x: data[0], y: data[1]};
                    }));
                    areas.push(area);
                }
            }

            areas.push(new Point3SetShape(pointsIn3D));
            this._areaMap.set(value.id, areas);
        });
    }

    private injectScenePoint() {
        if (this._injected) return;
        const pointsTag = AreaManager.POINTS_3D_AREA_HOLDER_TAG;
        const shapeTag = AreaManager.SHAPE_2D_AREA_HOLDER_TAG;
        const pointsHolders = GameObject.findGameObjectsByTag(pointsTag);
        const shapeHolders = GameObject.findGameObjectsByTag(shapeTag);

        let injectReady = false;

        if (GToolkit.isNullOrEmpty(pointsHolders)) {
            Log4Ts.warn(AreaManager, `couldn't find holder or any child in it by tag: ${pointsTag}`);
        } else {
            injectReady = true;
        }
        if (GToolkit.isNullOrEmpty(shapeHolders)) {
            Log4Ts.warn(AreaManager, `couldn't find holder or any child in it by tag: ${shapeTag}`);
        } else {
            injectReady = true;
        }
        if (!injectReady) return;

        Enumerable
            .from(pointsHolders)
            .select(PacemakerPicker)
            .where(item => item.id !== Number.NaN)
            .groupBy(item => item.id)
            .select(item => ({
                id: item.key(),
                shape: new Point3SetShape(item
                    .selectMany(i => i.positions)
                    .toArray()),
            }))
            .forEach(item => {
                let list = this._areaMap.get(item.id);
                if (!list) {
                    list = [];
                    this._areaMap.set(item.id, list);
                }
                list.push(item.shape);
            });

        Enumerable
            .from(shapeHolders)
            .select(PacemakerPicker)
            .where(item => item.id !== Number.NaN)
            .select(item => ({
                id: item.id,
                shape: new PolygonShape(item.positions),
            }))
            .groupBy(item => item.id)
            .select(item => {
                return {
                    id: item.key(),
                    shapes: item.select(i => i.shape).toArray(),
                };
            })
            .forEach(item => {
                let list = this._areaMap.get(item.id);
                if (!list) {
                    list = [];
                    this._areaMap.set(item.id, list);
                }
                list.push(...item.shapes);
            });

        this._injected = true;
        return;
    }

    /**
     * 获取区域.
     * @param id
     */
    public getArea(id: number): AnyShape[] {
        this.injectScenePoint();
        return this._areaMap.get(id) ?? [];
    }

    /**
     * 获取区域集合.
     * @param ids
     */
    public getAreas(ids: number[]): AnyShape[] {
        const areas: AnyShape[] = [];
        if (!ids) return areas;

        ids.forEach((value) => {
            const area = this.getArea(value);
            if (area && area.length > 0) {
                areas.push(...area);
            }
        });
        return areas;
    }

    /**
     * 获取生成点集合.
     * 仅支持 {@link Point3SetShape}
     * @param type
     * @param id
     */
    public getGeneratePoints(type: BagTypes, id: number): IPoint3[] {
        const points: IPoint3[] = [];
        switch (type) {
            case BagTypes.CollectibleItem:
                GameConfig.CollectibleItem.getElement(id).areaIds.forEach(
                    (areaId) => {
                        for (let shape of this.getArea(areaId)) {
                            if (GToolkit.is<IShape3>(shape, "boundingBoxVolume")) points.push(...shape.points());
                        }
                    },
                );
                break;
            case BagTypes.Dragon:
                GameConfig.Dragon.getElement(id).areaIds.forEach(
                    (areaId) => {
                        for (let shape of this.getArea(areaId)) {
                            if (GToolkit.is<IShape3>(shape, "boundingBoxVolume")) points.push(...shape.points());
                        }
                    },
                );
                break;
            default:
                Log4Ts.error(AreaManager, `not support generatable type: ${type}`);
                break;
        }
        return points;
    }

    /**
     * 获取生成物 id 至生成点集合映射.
     * @param type
     */
    public getGenerationPointMap(type: BagTypes): Map<number, IPoint3[]> {
        let configs: ConfigBase<ICollectibleItemElement | IDragonElement>;
        switch (type) {
            case BagTypes.CollectibleItem:
                configs = GameConfig.CollectibleItem;
                break;
            case BagTypes.Dragon:
                configs = GameConfig.Dragon;
                break;
            default:
                Log4Ts.error(AreaManager, `Not support generatable type: ${type}`);
                break;
        }

        const result: Map<number, IPoint3[]> = new Map();
        Enumerable
            .from(configs.getAllElement())
            .select(item => {
                return {
                    id: item.id,
                    points: this.getGeneratePoints(type, item.id),
                };
            })
            .forEach((item) => {
                result.set(item.id, item.points);
            });

        return result;
    }
}

function PacemakerPicker(obj: GameObject) {
    const pacemaker = Enumerable
        .from(obj.getChildren())
        .first(item => !GToolkit.isNullOrEmpty(item.tag) && item.tag.startsWith(AreaManager.AREA_ID_TAG_PREFIX));

    const suite = pacemaker ? Enumerable
        .from(obj.getChildren())
        .where(item => GToolkit.isNullOrEmpty(item.tag))
        .select(item => {
            const pos = item.worldTransform.position;
            return {x: pos.x, y: pos.y, z: pos.z};
        })
        .toArray() : [];

    return {
        id: pacemaker ? Number(pacemaker.tag.substring(AreaManager.AREA_ID_TAG_PREFIX.length)) : Number.NaN,
        positions: suite,
    };
}