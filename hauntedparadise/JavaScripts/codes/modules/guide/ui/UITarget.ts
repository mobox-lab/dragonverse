/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-01-30 15:24:54
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-01-31 15:02:02
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\guide\ui\UITarget.ts
 * @Description  : 
 */

import Hall_Direction_UI_Generate from "../../../../ui-generate/ShareUI/hall/Hall_Direction_UI_generate";
import { GeneralManager } from "../../../Modified027Editor/ModifiedStaticAPI";
import { UIMathUtil } from "../../help/ui/HelpInVisableUI";

const LimitRange: number = 300

export default class UITarget extends Hall_Direction_UI_Generate {
    private _destination: Vector
    private _outScreenPos: Vector2 = new Vector2()
    private _arriveCall: Function;

    onStart() {
        let center = new Vector2(WindowUtil.getViewportSize().x / 2, WindowUtil.getViewportSize().y / 2)
        this.mCanvas_Arror.position = center
    }

    onShow(destination: Vector, call: Function) {
        this._arriveCall = call;
        this._destination = destination;
        this.canUpdate = true
    }

    onHide() {
        this.canUpdate = false
    }

    onUpdate(dt: number) {
        if (!this._destination) return;
        if (!Player.localPlayer.character || !Player.localPlayer.character.worldTransform) {
            return;
        }
        //TODO策划给出椭圆的中心点和半径
        this.calCoolDownPoint(dt);
        let distance = Vector.distance(this._destination, Player.localPlayer.character.worldTransform.position);
        if (distance <= 300) {
            UIService.hide(UITarget)
            this._arriveCall && this._arriveCall()
        }
    }

    /**
    * 计算倒计时在UI上的坐标
    * @returns 
    */
    private calCoolDownPoint(dt) {
        const result = this.getPos(this._destination, dt)
        const centerX = this.rootCanvas.size.x / 2;
        const centerY = this.rootCanvas.size.y / 2;
        const vector2 = UIMathUtil.reprojectPointOnEllipse(centerX, centerY, centerX - LimitRange, centerY - LimitRange, result/*.screenPosition*/.x, result/*.screenPosition*/.y);
        if (!UIMathUtil.isPointInsideEllipse(centerX, centerY, centerX - LimitRange, centerY - LimitRange, result/*.screenPosition*/.x, result/*.screenPosition*/.y)) {
            this.mImg_Arror.visibility = SlateVisibility.Visible;
            this.calRoundPoint();
        } else {
            this.mImg_Arror.visibility = SlateVisibility.Collapsed;
        }
        //计算的是两个中心点实际坐标要减去UI的一半
        this.mCanvas_Arror.position = vector2.subtract(this.mCanvas_Arror.size.clone().divide(2));

    }
    private getPos(targetLoc: Vector, dt: number) {
        let playerPos = Player.localPlayer.character.worldTransform.position.clone();
        if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, targetLoc, this._outScreenPos, false)) {
            this._outScreenPos.x = Math.max(LimitRange, this._outScreenPos.x)
            this._outScreenPos.x = Math.min(this.rootCanvas.size.x - LimitRange, this._outScreenPos.x)

            this._outScreenPos.y = Math.max(LimitRange, this._outScreenPos.y)
            this._outScreenPos.y = Math.min(this.rootCanvas.size.y - LimitRange, this._outScreenPos.y)
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
            const crossResult = Vector.cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
            if (crossResult.z > 0) {
                relativeVec.x = -relativeVec.x
            }

            let playerScreenPos = mw.Vector2.zero
            GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
            const guideUIPos = relativeVec.add(playerScreenPos)
            guideUIPos.y = Math.max(guideUIPos.y, this.rootCanvas.size.y - LimitRange)
            return guideUIPos
        }
    }

    private calRoundPoint() {
        const ScreeCenter = new Vector2(this.rootCanvas.size.x / 2, this.rootCanvas.size.y / 2);
        const resultVector = Vector2.subtract(ScreeCenter, this.mCanvas_Arror.position)
        const angle = UIMathUtil.angleWithXAxis(resultVector);
        this.mCanvas_Arror.renderTransformAngle = angle;
    }

}