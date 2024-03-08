import { NodeInfoBase, NodeInfoSkillRect } from "./AnmationInfo";
/** 技能区域检测 */
export class SkillRectCheck {

    public static showRect: boolean = false;

    /** 检测节点标识区域信息 */
    public static checkNodes(char: mw.Character | mw.Character, nodeInfo: NodeInfoBase[]): mw.GameObject[] {

        let res = [];

        nodeInfo.forEach(e => {

            if (!(e instanceof NodeInfoSkillRect)) {
                return;
            }
            let angle = parseInt(e.skillAngle);
            //let offsetDis = parseInt(e.skillOffsetDis);
            let radius = parseInt(e.skillRadius);
            let height = parseInt(e.skillHeight);
            let length = parseInt(e.skillLength);
            let width = parseInt(e.skillWidth);
            let charLocation = mw.Vector.add(mw.Vector.zero, char.worldTransform.position);
            let dir = char.worldTransform.getForwardVector();
            const rotation = dir.toRotation();
            const offsetDis = rotation.rotateVector(new Vector(parseInt(e.offsetPos[0]), parseInt(e.offsetPos[1]), parseInt(e.offsetPos[2])));
            if (e.offsetPos.length == 3) {
                charLocation.add(offsetDis);
            }

            if (radius > 0 && height > 0) {
                //radius check
                res = this.checkRadius(char, charLocation, radius, height);

            } else if (height > 0 && length > 0 && width > 0) {
                //box check
                let endLocation = mw.Vector.add(charLocation, mw.Vector.multiply(dir, length));
                res = this.checkBox(char, charLocation, endLocation, width, height);
            }

            if (angle > 0) {
                //angle check
                res = this.checkAngle(charLocation, dir, angle, res);
            }

            //过滤自己
            res = res.filter(e => { return e.gameObjectId != char.gameObjectId });

        })

        return res;

    }

    /**
     * 角度检测
     * @param charLocation 
     * @param dir 
     * @param angle 
     * @param targets 
     * @returns 
     */
    public static checkAngle(charLocation: mw.Vector, dir: mw.Vector, angle: number, targets: mw.GameObject[]): mw.GameObject[] {
        let res = [];
        targets.forEach(e => {
            if (MathUtil.angleCheck(charLocation, dir, e.worldTransform.position, angle)) {
                res.push(e);
            }
        })

        return res;
    }

    /** 半径检查 */
    public static checkRadius(char: mw.GameObject, charLocation: mw.Vector, radius: number, height: number): mw.GameObject[] {

        let res = QueryUtil.capsuleOverlap(charLocation, radius, height, SkillRectCheck.showRect);
        //res = res.filter(e => { return e.guid != char.guid });
        return res;

    }

    /** 矩形盒子检测 */
    private static checkBox(char: mw.GameObject, charLocation: mw.Vector, endLocation: mw.Vector, width: number, height: number): mw.GameObject[] {
        let res = this.modifyboxOverlapInLevel(charLocation, endLocation, width, height, SkillRectCheck.showRect);
        //res = res.filter(e => { return e.guid != char.guid });
        return res;

    }

    public static modifyboxOverlapInLevel(StartLocation: Vector, EndLocation: Vector, Width: number, Height: number, debug: boolean, IgnoreObjectsGuid?: Array<string>, IgnoreByKind?: boolean, Source?: GameObject): Array<GameObject> {
        let halfSize = new Vector(1, Width / 2, Height / 2);
        let orientation = Vector.subtract(EndLocation, StartLocation).toRotation();
        let results = QueryUtil.boxTrace(StartLocation, EndLocation, halfSize, orientation, true, debug, IgnoreObjectsGuid, IgnoreByKind, Source);
        let objResults = new Array<GameObject>();
        for (let i = 0; i < results.length; i++) {
            let obj = results[i].gameObject;
            if (!obj) continue;
            if (objResults.indexOf(obj) == -1) objResults.push(obj);
        }
        return objResults;
    }

}