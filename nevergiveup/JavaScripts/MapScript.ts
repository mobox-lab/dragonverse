/**
 * @Author       : xiaohao.li
 * @Date         : 2023-12-04 16:48:32
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2024-01-23 10:18:22
 * @FilePath     : \nevergiveup\JavaScripts\MapScript.ts
 * @Description  : 修改描述
 */

import { StageActions } from "./Actions";
import { TowerEvent } from "./Modules/TowerModule/TowerEnum";
import { EStageState } from "./StageEnums";
import { GameConfig } from "./config/GameConfig";
import { StageUtil } from "./stage/Stage";
import Log4Ts from "mw-log4ts";

export namespace MapManager {
    export let script: MapScript;
    export let stageCfgId: number = 0;
    export let birthPosition: Vector = Vector.zero;
    export let birthRotation: Rotation = Rotation.zero;

    export function getPositionFromId(id: number) {
        if (!script) return Vector.zero;
        return script.getPositionFromId(id);
    }

    export function showFreeSlot(isShow: boolean) {
        if (!script) return;
        return script.showFreeSlot(isShow);
    }

    export function getRoadPositions(index: number) {
        if (!script) return [];
        return script.roads[index].map((road) => road.position);
    }

    export function getFlyPositions(index: number) {
        if (!script) return [];
        return script.flyRoads[index].map((road) => road.position);
    }

    export function getDistances(index: number) {
        if (!script) return [];
        return script.distances[index];
    }

    export function getTotalDistance(index: number) {
        if (!script) return 0;
        return script.totalDistance[index];
    }

    export function getFlyDistances(index: number) {
        if (!script) return [];
        return script.flyDistances[index];
    }

    export function getTotalFlyDistance(index: number) {
        if (!script) return 0;
        return script.totalFlyDistance[index];
    }

    export function getBounds() {
        if (!script) return null;
        return script.mapBounds;
    }

    export function getFreeSlotsCount() {
        if (!script) return 0;
        return script.getFreeSlotsCount();
    }

    export function getSlotsCount() {
        if (!script) return 0;
        return script.getSlotsCount();
    }

    export function getRandLandPos() {
        if (!script) return [];
        return script.getRandLandPos();
    }

    export function destroy() {
        script = null;
    }
}

@Component
export default class MapScript extends Script {
    private slots: Slot[] = [];
    roads: Road[][] = [];
    flyRoads: Road[][] = [];
    distances: number[][] = [];
    totalDistance: number[] = [];
    flyDistances: number[][] = [];
    totalFlyDistance: number[] = [];

    towerCreateEvent: EventListener;
    towerDestroyEvent: EventListener;
    arrows: Effect[] = [];
    arrowTimers: number[] = [];
    arrowLoops: number[] = [];

    mapBounds: number[] = [];
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */

    protected async onStart(): Promise<void> {
        if (SystemUtil.isClient()) {
            try {
                const stageCfg = StageUtil.getStageCfgById(MapManager.stageCfgId);
                this.gameObject.worldTransform.position = stageCfg?.stagePosition.clone();
                this.gameObject.worldTransform.rotation = new Rotation(
                    stageCfg?.rotation?.[0] ?? 200,
                    stageCfg?.rotation?.[1] ?? 0,
                    stageCfg?.rotation?.[2] ?? 0
                );
                let center = Vector.zero;
                let extend = Vector.zero;
                this.gameObject.getBounds(false, center, extend, true);
                await this.parseNode(this.gameObject);
                MapManager.script = this;
                this.useUpdate = true;

                let distance = (a: number[], b: number[]): number => {
                    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
                };

                for (let i = 0; i < this.roads.length; i++) {
                    let points = MapManager.getRoadPositions(i);
                    this.totalDistance[i] = 0;
                    this.distances[i] = points.map((point, index) => {
                        if (index === 0) return 0;
                        let d = distance(points[index - 1], point);
                        return d;
                    });

                    this.totalDistance[i] = this.distances[i].reduce((a, b) => a + b, 0);
                }

                for (let i = 0; i < this.flyRoads.length; i++) {
                    let flyPoints = MapManager.getFlyPositions(i);
                    this.totalFlyDistance[i] = 0;
                    this.flyDistances[i] = flyPoints.map((point, index) => {
                        if (index === 0) return 0;
                        let d = distance(flyPoints[index - 1], point);
                        return d;
                    });

                    this.totalFlyDistance[i] = this.flyDistances[i].reduce((a, b) => a + b, 0);
                }

                this.towerCreateEvent = Event.addLocalListener(TowerEvent.Create, (v: number) => {
                    this.slots[v].isFree = false;
                    // this.resetMaterial(this.slots[v].node as Model);
                    // this.slots[v].showOutline(false);
                    this.slots[v].showPlus(false);
                    this.slots[v].showBg(false);
                });
                this.towerDestroyEvent = Event.addLocalListener(TowerEvent.Destroy, (v: number) => {
                    this.slots[v].isFree = true;
                    this.slots[v].showPlus(true);
                });

                StageActions.onStageStateChanged.add((state: EStageState, ...param: number[]) => {
                    if (state === EStageState.Wait) {
                        for (let i = 0; i < this.arrows.length; i++) {
                            this.arrowTimers[i] = 0;
                            this.arrowLoops[i] = 0;
                        }
                    }
                });

                for (let i = 0; i < this.roads.length; i++) {
                    this.arrowTimers[i] = 0;
                    this.arrowLoops[i] = 0;
                    let arrow = (await GameObjPool.asyncSpawn("128901")) as Effect;
                    if (arrow) {
                        arrow.worldTransform.rotation = new Rotation(90, 0, 0);
                        arrow.worldTransform.scale = new Vector(6, 1, 10);
                        arrow.loopCount = 0;
                        arrow.play();
                        this.arrows.push(arrow);
                    }
                }

                StageActions.onMapLoaded.call();
            } catch (error) {
                Log4Ts.error(MapScript, "on start map load:", error);
            }
        }
    }

    private resetMaterial(node: Model) {
        if (node) {
            const config = StageUtil.getStageCfgById(MapManager.stageCfgId);
            for (let i = 0; i < config.slotMaterials.length; i++) {
                node.setMaterial(config.slotMaterials[i], i);
            }
        }
    }

    private async parseNode(gameObject: GameObject) {
        const pushNode = async (node: GameObject, name: string) => {
            if (node.name.startsWith(name)) {
                let paramStr = node.name.substring(name.length);
                let params = paramStr.split("|");
                let paramInt = params.map((param) => parseInt(param));
                if (node.name === "地块") {
                    let model = node;
                    const parent = node.parent;
                    const children = parent.getChildren();
                    let center = Vector.zero;
                    let extend = Vector.zero;
                    model.getBounds(false, center, extend, false);
                    let slot = new Slot(this, [center.x, center.y, center.z + extend.z], node, children);
                    this.slots.push(slot);
                    node.tag = "slot" + (this.slots.length - 1);
                    // this.resetMaterial(node as Model);
                    await slot.init();
                } else if (node.name.startsWith("path")) {
                    let n = node as Model;
                    n.setCollision(PropertyStatus.Off);
                    let road = new Road(this, [
                        node.worldTransform.position.x,
                        node.worldTransform.position.y,
                        node.worldTransform.position.z,
                    ]);
                    if (params.length === 2) {
                        if (!this.roads[paramInt[0]]) {
                            this.roads[paramInt[0]] = [];
                        }
                        this.roads[paramInt[0]][paramInt[1]] = road;
                    } else {
                        if (!this.roads[0]) {
                            this.roads[0] = [];
                        }
                        this.roads[0][paramInt[0]] = road;
                    }
                    node.setVisibility(PropertyStatus.Off);
                } else if (node.name.startsWith("flypath")) {
                    let n = node as Model;
                    n.setCollision(PropertyStatus.Off);
                    let road = new Road(this, [
                        node.worldTransform.position.x,
                        node.worldTransform.position.y,
                        node.worldTransform.position.z,
                    ]);
                    if (params.length === 2) {
                        if (!this.flyRoads[paramInt[0]]) {
                            this.flyRoads[paramInt[0]] = [];
                        }
                        this.flyRoads[paramInt[0]][paramInt[1]] = road;
                    } else {
                        if (!this.flyRoads[0]) {
                            this.flyRoads[0] = [];
                        }
                        this.flyRoads[0][paramInt[0]] = road;
                    }
                    node.setVisibility(PropertyStatus.Off);
                } else if (node.name.startsWith("birthpoint")) {
                    MapManager.birthPosition.set(
                        node.worldTransform.position.x,
                        node.worldTransform.position.y,
                        node.worldTransform.position.z
                    );
                    MapManager.birthRotation.set(
                        node.worldTransform.rotation.x,
                        node.worldTransform.rotation.y,
                        node.worldTransform.rotation.z
                    );
                    node.setVisibility(PropertyStatus.Off);
                } else if (node.name.startsWith("maparea")) {
                    let center = Vector.zero;
                    let extend = Vector.zero;
                    node.getBounds(false, center, extend, false);
                    this.mapBounds[0] = center.x;
                    this.mapBounds[1] = center.y;
                    this.mapBounds[2] = extend.x;
                    this.mapBounds[3] = extend.y;
                }
            }
        };
        await pushNode(gameObject, "地块");
        await pushNode(gameObject, "path");
        await pushNode(gameObject, "flypath");
        await pushNode(gameObject, "birthpoint");
        await pushNode(gameObject, "maparea");

        for (let i = 0; i < gameObject.getChildren().length; i++) {
            await this.parseNode(gameObject.getChildren()[i]);
        }
    }

    /**
     * 周期函数 每帧执行
     * 此函数执行需要将this.useUpdate赋值为true
     * @param dt 当前帧与上一帧的延迟 / 秒
     */
    protected onUpdate(dt: number): void {
        // WaveManager.update(dt);
        for (let i = 0; i < this.roads.length; i++) {
            if (this.arrowLoops[i] >= 3) continue;
            this.arrowTimers[i] += dt;
            let positions = MapManager.getRoadPositions(i);
            let [position, index] = this.getPositionAndIndex(i, positions, 1300, this.arrowTimers[i]);
            if (index === positions.length - 1) {
                this.arrowLoops[i]++;
                this.arrowTimers[i] = 0;
                continue;
            }
            if (this.arrows[i]) {
                this.arrows[i].worldTransform.position = new Vector(position[0], position[1], position[2] + 50);
                let rotation = this.getRotation(position, positions[index + 1]);
                this.arrows[i].worldTransform.rotation = new Rotation(90, 0, rotation - 90);
            }
        }
    }

    getRotation(a: number[], b: number[]): number {
        return (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
    }

    lerp(a: number[], b: number[], t: number): number[] {
        return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
    }

    getPositionAndIndex(index: number, points: number[][], speed: number, totalTime: number): [number[], number] {
        let totalDistance = MapManager.getTotalDistance(index);
        let distances = MapManager.getDistances(index);
        let distanceTraveled = speed * totalTime;
        if (distanceTraveled >= totalDistance) {
            return [points[points.length - 1], points.length - 1]; // Reached the last point
        }
        let accumulatedDistance = 0;
        for (let i = 1; i < distances.length; i++) {
            accumulatedDistance += distances[i];
            if (accumulatedDistance >= distanceTraveled) {
                let segmentDistance = distances[i];
                let t = (distanceTraveled - (accumulatedDistance - segmentDistance)) / segmentDistance;
                return [this.lerp(points[i - 1], points[i], t), i - 1];
            }
        }

        return [points[0], 0]; // Default to first point if something goes wrong
    }

    /** 脚本被销毁时最后一帧执行完调用此函数 */
    protected onDestroy(): void {
        this.towerCreateEvent.disconnect();
        this.towerDestroyEvent.disconnect();
        for (let i = 0; i < this.slots.length; i++) {
            this.slots[i].destroy();
        }

        for (let i = 0; i < this.arrows.length; i++) {
            GameObjPool.despawn(this.arrows[i]);
        }

        this.slots = [];
        this.roads = [];
        this.flyRoads = [];
        this.distances = [];
        this.totalDistance = [];
        this.flyDistances = [];
        this.totalFlyDistance = [];

        this.arrows = [];
        this.arrowTimers = [];
        this.arrowLoops = [];
        this.mapBounds = [];
        this.mapBounds = [];
    }

    getPositionFromId(id: number) {
        if (!this.slots[id]) return Vector.zero;
        return new Vector(this.slots[id].position[0], this.slots[id].position[1], this.slots[id].position[2]);
    }

    public showFreeSlot(isShow: boolean) {
        for (let slot of this.slots) {
            if (slot.isFree) {
                slot.showBg(isShow);
                if (isShow) {
                    // model.setMaterial("2C8CCDCF45133522BCAE39969724548E");
                    // slot.showOutline(true);
                } else {
                    // this.resetMaterial(model);
                    // model.setOutline(false);
                    // slot.showOutline(false);
                }
            } else if (!isShow) {
                // this.resetMaterial(model);
                // slot.showOutline(false);
            }
        }
    }

    public getFreeSlotsCount() {
        return this.slots.filter((slot) => slot.isFree).length;
    }

    public getSlotsCount() {
        return this.slots.length;
    }

    public getLandPositions() {
        // 使用reduce和concat将this.roads展平
        // let flattenedRoads = this.roads.reduce((acc, val) => acc.concat(val), []).map(v => v.position);

        // 使用map获取slots的positions
        let slotPositions = this.slots
            .filter((slot) => slot.node.localTransform.position.z < 150)
            .map((slot) => slot.position);
        return slotPositions;
        // // 返回flattenedRoads和slotPositions的连接
        // return flattenedRoads.concat(slotPositions);
    }

    public getRandLandPos() {
        let positions = this.getLandPositions();
        let randIndex = MathUtil.randomInt(0, positions.length);
        return positions[randIndex];
    }
}

abstract class IMapComponent {
    protected _map: MapScript;
}

class Slot extends IMapComponent {
    public position: number[];
    public isFree: boolean = true;
    public node: GameObject;
    private _cubeOutlines: Model[] = [];

    public children: GameObject[] = [];

    generateOutline = async (gameObject: GameObject) => {
        if (!(gameObject instanceof Model)) return;
        let model = gameObject as Model;
        let rot = Rotation.zero;
        rot.set(model.worldTransform.rotation.x, model.worldTransform.rotation.y, model.worldTransform.rotation.z);
        // rot.set(stageCfg?.rotation?.[0] ?? 200, stageCfg?.rotation?.[1] ?? 0, stageCfg?.rotation?.[2] ?? 0);
        // model.worldTransform.rotation = rot;
        let boundMin = Vector.zero;
        let boundMax = Vector.zero;
        let vertices = new Array<Vector>();
        let center = Vector.zero;
        let extend = Vector.zero;
        model.getBounds(false, center, extend, false);
        boundMin = Vector.subtract(center, extend);
        boundMax = Vector.add(center, extend);

        // generate the 8 vertices of the bounding box
        vertices.push(new Vector(boundMin.x, boundMin.y, boundMin.z));
        vertices.push(new Vector(boundMax.x, boundMin.y, boundMin.z));
        vertices.push(new Vector(boundMin.x, boundMax.y, boundMin.z));
        vertices.push(new Vector(boundMax.x, boundMax.y, boundMin.z));
        vertices.push(new Vector(boundMin.x, boundMin.y, boundMax.z));
        vertices.push(new Vector(boundMax.x, boundMin.y, boundMax.z));
        vertices.push(new Vector(boundMin.x, boundMax.y, boundMax.z));
        vertices.push(new Vector(boundMax.x, boundMax.y, boundMax.z));

        let midpoints = [];

        // Define edge indices
        const edgeIndices = [
            // [0, 1], [1, 3], [3, 2], [2, 0], // Bottom face edges
            [4, 5],
            [5, 7],
            [7, 6],
            [6, 4], // Top face edges
            // [0, 4], [1, 5], [3, 7], [2, 6]  // Vertical edges
        ];

        const distance = [];

        // Calculate midpoints for each edge
        for (let i = 0; i < edgeIndices.length; i++) {
            let indexA = edgeIndices[i][0];
            let indexB = edgeIndices[i][1];

            let vertexA = vertices[indexA];
            let vertexB = vertices[indexB];

            // Calculate midpoint as the average of vertexA and vertexB
            let midpoint = vertexA.clone().add(vertexB).multiply(0.5);
            midpoints.push(midpoint);
            // add distance
            distance.push(vertexA.clone().subtract(vertexB).magnitude);
        }
        let cubeArr: mw.GameObject[] = [];
        let width = 0.05;
        let anchor = await mw.GameObject.asyncSpawn("Anchor");
        anchor.parent = model;
        anchor.localTransform.position = mw.Vector.zero;
        for (let i = 0; i < midpoints.length; i++) {
            let cube = (await GameObjPool.asyncSpawn("197386")) as Model;
            cube.localTransform.position = midpoints[i];
            cube.parent = anchor;
            // cube.parent = model;
            let material = "532554D8416C3609A871FCBC92273DC8";
            if (material) {
                cube.setMaterial(material);
            }

            // cube.worldTransform.scale = new Vector(0.1, 0.1, 0.1);
            if (i < 8 && i % 2 == 0) {
                cube.worldTransform.scale = new Vector(distance[i] / 100 + width, width, width);
            } else if (i < 8 && i % 2 == 1) {
                cube.worldTransform.scale = new Vector(width, distance[i] / 100 + width, width);
            } else {
                cube.worldTransform.scale = new Vector(width, width, distance[i] / 100 + width);
                cube.localTransform.position = midpoints[i].clone().subtract(new Vector(0, 0, distance[i] / 2));
            }

            cube.localTransform.rotation = mw.Rotation.zero;
            cubeArr.push(cube);
            this._cubeOutlines.push(cube);
        }
        const stageCfg = StageUtil.getStageCfgById(MapManager.stageCfgId);
        const cubeRotation = Rotation.zero;
        cubeRotation.set(stageCfg?.rotation?.[0] ?? 200, stageCfg?.rotation?.[1] ?? 0, stageCfg?.rotation?.[2] ?? 0);

        anchor.worldTransform.rotation = cubeRotation;
        // model.worldTransform.rotation = rot;
        cubeArr.forEach((c) => {
            c.parent = null;
            c.setVisibility(PropertyStatus.On);
        });
    };
    constructor(map: MapScript, position: number[], node: GameObject, children: GameObject[]) {
        super();
        this._map = map;
        this.position = position;
        this.node = node;
        this.children = children;
    }

    async init() {
        // await this.generateOutline(this.node);
        // this.showOutline(false);
        this.showBg(false);
    }

    showPlus(isShow: boolean) {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child.name.startsWith("待选加号")) {
                child.setVisibility(isShow);
            }
        }
    }

    showBg(isShow: boolean) {
        for (let i = 0; i < this.children.length; i++) {
            const child = this.children[i];
            if (child.name.startsWith("选中状态")) {
                child.setVisibility(isShow);
            }
        }
    }

    destroy() {
        for (let i = 0; i < this._cubeOutlines.length; i++) {
            GameObjPool.despawn(this._cubeOutlines[i]);
            // this._cubeOutlines[i].destroy();
        }
    }

    showOutline(show: boolean) {
        for (let i = 0; i < this._cubeOutlines.length; i++) {
            this._cubeOutlines[i].setVisibility(show ? PropertyStatus.On : PropertyStatus.Off);
        }
    }
}

class Road extends IMapComponent {
    public position: number[];
    constructor(map: MapScript, position: number[]) {
        super();
        this._map = map;
        this.position = position;
    }
}
