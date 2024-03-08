import HelpInvisible_UI_Generate from "../../../../ui-generate/ShareUI/HelpInvisible_UI_generate";
import { GeneralManager } from "../../../Modified027Editor/ModifiedStaticAPI";

/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2024-01-02 17:07:25
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-04 16:02:28
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\help\ui\HelpInVisableUI.ts
 * @Description  : 
 */
export class HelpInVisibleUI extends HelpInvisible_UI_Generate {

    // public startPos: Vector2 = new Vector2(0, 0);
    private targetPlayer: Player;
    public rangeX: number;
    public rangeY: number;
    onStart() {
        //this.startPos = this.canvas_help.position.clone();
        this.rangeX = this.canvas_countDown.parent.size.x - this.canvas_countDown.size.x;
        this.rangeY = this.canvas_countDown.parent.size.y - this.canvas_countDown.size.y;
    }

    async onShow() {
        if (!this.targetPlayer) {
            console.error("没有目标玩家");
            return;
        }
        this.canUpdate = true;
    }
    onHide() {
        this.canUpdate = false;
    }
    setTarget(player: mw.Player) {
        this.targetPlayer = player;
    }
    /**
     * 暂时不用
     */
    showHelpMessage() {
        let startPos = this.canvas_help.position.clone()
        new Tween(startPos.clone()).to(startPos.clone().add(new Vector2(0, -20)), 300)
            .onUpdate((value: Vector2) => {
                this.canvas_help.position = value;
            }).onComplete(() => {
                this.canvas_help.position = startPos.clone();
                this.canvas_help.visibility = SlateVisibility.Collapsed
            }).onStart(() => {
                this.canvas_help.position = startPos.clone();
                this.canvas_help.visibility = SlateVisibility.Visible;
            })
            .start();
    }

    updateMaskBtn(curTimer: number, secondTimer: number, HelpTime: number) {
        if (curTimer <= 3) {
            this.maskBtn_color.normalImageColor = LinearColor.red;
        }
        //剩余五秒黄色提示ui
        else if (curTimer <= 7) {
            this.maskBtn_color.normalImageColor = LinearColor.yellow;
        }
        this.maskBtn_color.fanShapedValue = 1 - (curTimer - secondTimer) / HelpTime;
    }

    onUpdate(dt) {
        if (!this.targetPlayer.character || !this.targetPlayer.character.worldTransform || !Player.localPlayer.character || !Player.localPlayer.character.worldTransform) {
            return;
        }
        //TODO策划给出椭圆的中心点和半径

        this.calCoolDownPoint(dt);

        this.text_distance.text = Math.floor(Vector.distance(this.targetPlayer.character.worldTransform.position, Player.localPlayer.character.worldTransform.position) / 10) + "m";
    }

    /**
     * 计算倒计时在UI上的坐标
     * @returns 
     */
    private calCoolDownPoint(dt) {
        // const result = InputUtil.projectWorldPositionToWidgetPosition(this.targetPlayer.character.worldTransform.position);
        // if (result/*.screenPosition*/.equals(Vector2.zero)) {
        //         return
        // };
        const result = this.getPos(this.targetPlayer.character.worldTransform.position, dt)
        const centerX = this.rootCanvas.size.x / 2;
        const centerY = this.rootCanvas.size.y / 2;
        const vector2 = UIMathUtil.reprojectPointOnEllipse(centerX, centerY, centerX - 200, centerY - 200, result/*.screenPosition*/.x, result/*.screenPosition*/.y);
        if (!UIMathUtil.isPointInsideEllipse(centerX, centerY, centerX - 200, centerY - 200, result/*.screenPosition*/.x, result/*.screenPosition*/.y)) {
            this.mCanvas_arrow.visibility = SlateVisibility.Visible;
            this.calRoundPoint();
        } else {
            this.mCanvas_arrow.visibility = SlateVisibility.Collapsed;
        }
        //计算的是两个中心点实际坐标要减去UI的一半
        this.canvas_countDown.position = vector2.subtract(this.canvas_countDown.size.clone().divide(2));

    }
    private _rotY: number = 0;
    private _outScreenPos: Vector2 = Vector2.zero;
    private getPos(targetLoc: Vector, dt: number) {
        // let dis = Vector.distance(Player.localPlayer.character.worldTransform.position, targetLoc) / 100;
        // this._rotY += dt * 120;
        // if (this._rotY > 360) {
        //     this._rotY = 0;
        // }
        // //   this.mcircle.renderTransformAngle = this._rotY;

        let playerPos = Player.localPlayer.character.worldTransform.position.clone();
        if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, targetLoc, this._outScreenPos, false)) {
            this._outScreenPos.x = Math.max(200, this._outScreenPos.x)
            this._outScreenPos.x = Math.min(this.rootCanvas.size.x - 200, this._outScreenPos.x)

            this._outScreenPos.y = Math.max(200, this._outScreenPos.y)
            this._outScreenPos.y = Math.min(this.rootCanvas.size.y - 200, this._outScreenPos.y)
            return this._outScreenPos
        } else {
            const vec2Offset = new Vector2(targetLoc.x, targetLoc.y)
                .subtract(playerPos)
                .normalize()
            const forwardVec = Player.localPlayer.character.worldTransform.getForwardVector()
            const vec2Forward = new Vector2(forwardVec.x, forwardVec.y)
            const dotResult = vec2Forward.x * vec2Offset.x + vec2Forward.y * vec2Offset.y

            const rad = Math.acos(dotResult)
            const relativeVec = new Vector2(100 * Math.cos(rad), 100 * Math.sin(rad))
            const crossResult = this.V3Cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
            if (crossResult.z > 0) {
                relativeVec.x = -relativeVec.x
            }

            let playerScreenPos = mw.Vector2.zero
            GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
            const guideUIPos = relativeVec.add(playerScreenPos)
            guideUIPos.y = Math.max(guideUIPos.y, this.rootCanvas.size.y - 200)
            return guideUIPos
        }
    }
    public V3Cross(v1: mw.Vector, v2: mw.Vector) {
        let x = v1.y * v2.z - v1.z * v2.y
        let y = v2.x * v1.z - v1.x * v2.z
        let z = v1.x * v2.y - v1.y * v2.x
        return new mw.Vector(x, y, z)
    }
    /**
     * 计算三角形在圆上的坐标
     */
    private calRoundPoint() {
        const ScreeCenter = new Vector2(this.rootCanvas.size.x / 2, this.rootCanvas.size.y / 2);
        const targetPos = this.canvas_countDown.position.clone().add(this.canvas_countDown.size.clone().divide(2)).subtract(this.mCanvas_arrow.size.clone().divide(2));
        const resultVector = ScreeCenter.subtract(targetPos);
        // const radius = this.mCanvas_arrow
        const angle = UIMathUtil.angleWithXAxis(resultVector);
        this.mCanvas_arrow.position = targetPos.clone().add(resultVector.normalize().multiply(-100))
        this.mCanvas_arrow.renderTransformAngle = angle;
    }

}



export class UIMathUtil {
    /**
     * 给定椭圆的范围
     * @param centerX 
     * @param centerY 
     * @param radiusX 
     * @param radiusY 
     * @param numberOfPoints 
     * @returns 
     */

    public static isPointInsideEllipse(centerX: number, centerY: number, radiusX: number, radiusY: number, pointX: number, pointY: number) {
        // 计算点相对于椭圆中心的归一化坐标
        const normalizedX = (pointX - centerX) / radiusX;
        const normalizedY = (pointY - centerY) / radiusY;

        // 检查点是否在椭圆内（归一化坐标满足方程 x^2 + y^2 <= 1）
        return normalizedX ** 2 + normalizedY ** 2 <= 1;
    }
    /** 
     * 将超出范围的点重新投影到椭圆上
     */
    public static reprojectPointOnEllipse(centerX: number, centerY: number, radiusX: number, radiusY: number, outOfRangeX: number, outOfRangeY: number) {
        // 判断点是否在椭圆内
        if (this.isPointInsideEllipse(centerX, centerY, radiusX, radiusY, outOfRangeX, outOfRangeY)) {
            // 如果已经在椭圆内，则直接返回原始点坐标
            return new Vector2(outOfRangeX, outOfRangeY);
        }

        // 计算椭圆心到超出范围点的向量
        const vectorToOutOfRange = {
            x: outOfRangeX - centerX,
            y: outOfRangeY - centerY
        };

        // 缩放向量到椭圆的半轴长度
        const scaleFactorX = radiusX / Math.sqrt(vectorToOutOfRange.x ** 2 + vectorToOutOfRange.y ** 2);
        const scaleFactorY = radiusY / Math.sqrt(vectorToOutOfRange.x ** 2 + vectorToOutOfRange.y ** 2);
        const scaledVector = {
            x: vectorToOutOfRange.x * scaleFactorX,
            y: vectorToOutOfRange.y * scaleFactorY
        };

        // 重新投影点到椭圆上
        const result = new Vector2(centerX + scaledVector.x, centerY + scaledVector.y)

        return result;
    }
    /**
     * 计算与Y轴(向上)的角度
     * @param centerX 
     * @param centerY 
     * @param pointX 
     * @param pointY 
     * @returns 
     */
    public static angleWithXAxis(point: Vector2) {
        // 使用反正切函数计算角度（弧度）
        let angleInRadians = Math.atan2(point.x, point.y);
        angleInRadians = angleInRadians * 180 / Math.PI
        //if (angleInRadians < 0) angleInRadians = -angleInRadians + 180;
        return -angleInRadians;
    }

    /**
     * 把椭圆坐标投影到圆的坐标上
     * @param center 中心点坐标
     * @param angleWithXAxis 目标旋转角度
     * @param targetRadius 目标圆的半径
     * @returns 
     */
    public static pointOnAnotherCircle(center: Vector2, angleWithXAxis: number, targetRadius: number) {
        // 将角度转换为弧度
        const angleInRadians = (angleWithXAxis * Math.PI) / 180;

        // 计算新圆上的点的坐标
        const newX = center.x + targetRadius * Math.cos(angleInRadians);
        const newY = center.y + targetRadius * Math.sin(angleInRadians);

        return new Vector2(newX, newY);
    }
}