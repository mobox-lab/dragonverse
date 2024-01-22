import { GameConfig } from "../../config/GameConfig";
import { oTrace, oTraceError } from "../../utils/LogManager";
import { Singleton, utils } from "../../utils/uitls";


/**区域划分 */
@Singleton()
export class AreaDivideManager {
    public static instance: AreaDivideManager;

    /**区域变化 1：变化前的id 2:变化后的id */
    public onAreaChangeAC: Action2<number, number> = new Action2<number, number>();


    private curArea: number = 0;
    /**当前区域 */
    public get CurAreaId(): number {
        return this.curArea;
    }

    public set CurAreaId(v: number) {
        if (v == this.curArea) return;
        let preId = this.curArea;
        this.curArea = v;
        this.onAreaChangeAC.call(preId, v);
    }

    private areaLocMap: Map<number, number[]> = new Map<number, number[]>();
    private checkInterval: any;

    public init() {

        let cfgs = GameConfig.AreaDivide.getAllElement();
        for (let i = 0; i < cfgs.length; i++) {
            const element = cfgs[i];
            if (element.areaPoints)
                this.areaLocMap.set(element.id, element.areaPoints);
        }

        if (this.areaLocMap.size == 0) {
            oTraceError('lwj 区域划分数据为空');
            return;
        }
    }

    /**服务端用 检查点在那个范围内 */
    public checkPointInArea(curLoc: mw.Vector): number {
        for (let [key, value] of this.areaLocMap) {
            if (utils.check_pointInRectangle(curLoc, value)) {
                return key;
            }
        }
        return 0;
    }

    /**服务器 检查点 是否在指定的id里 */
    public checkPointInAreaById(curLoc: mw.Vector, id: number): boolean {
        if (this.areaLocMap.has(id)) {
            let areaLos = this.areaLocMap.get(id);
            if (utils.check_pointInRectangle(curLoc, areaLos)) return true;
        }
        return false;
    }


    /**客户端用 */
    public checkArea() {

        this.clearCheckInterval();

        this.checkInterval = TimeUtil.setInterval(() => {
            let curLoc = Player.localPlayer.character.worldTransform.position;

            if (this.areaLocMap.has(this.CurAreaId)) {
                let areaLos = this.areaLocMap.get(this.CurAreaId);
                if (utils.check_pointInRectangle(curLoc, areaLos)) return;
            }

            for (let [key, value] of this.areaLocMap) {
                if (utils.check_pointInRectangle(curLoc, value)) {
                    this.CurAreaId = key;
                    break;
                }
            }

        }, 3)

    }


    private clearCheckInterval() {
        if (this.checkInterval) {
            TimeUtil.clearInterval(this.checkInterval);
            this.checkInterval = null;
        }
    }



}