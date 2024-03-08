/*
 * @Author       : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @Date         : 2023-12-29 10:04:18
 * @LastEditors  : hangyuan.zhang hangyuan.zhang@appshahe.com
 * @LastEditTime : 2024-01-02 15:47:15
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\help\ui\HelpWorldUI.ts
 * @Description  : 
 */
import HelpVisible_UI_Generate from "../../../../ui-generate/ShareUI/HelpVisible_UI_generate";

export default class HelpWorldUI extends HelpVisible_UI_Generate {
    // private _rotY: number = 0;
    // private _outScreenPos: Vector2 = Vector2.zero;
    // private _targetLoc: Vector = Vector.zero;

    // onStart() {
    //     this.canUpdate = true;
    // }


    // onUpdate(dt: number) {
    //     let dis = Vector.distance(this._char.worldTransform.position, this._targetLoc) / 100;
    //     this._rotY += dt * 120;
    //     if (this._rotY > 360) {
    //         this._rotY = 0;
    //     }
    //     this.rootCanvas.renderTransformAngle = this._rotY;

    //     let playerPos = this._char.worldTransform.position.clone();
    //     if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, this._targetLoc, this._outScreenPos, false)) {
    //         this._outScreenPos.x = Math.max(200, this._outScreenPos.x)
    //         this._outScreenPos.x = Math.min(this.rootCanvas.size.x - 200, this._outScreenPos.x)

    //         this._outScreenPos.y = Math.max(200, this._outScreenPos.y)
    //         this._outScreenPos.y = Math.min(this.rootCanvas.size.y - 200, this._outScreenPos.y)
    //         this.rootCanvas.position = this._outScreenPos
    //     } else {
    //         const vec2Offset = new Vector2(this._targetLoc.x, this._targetLoc.y)
    //             .subtract(playerPos)
    //             .normalize()
    //         const forwardVec = Player.localPlayer.character.worldTransform.getForwardVector()
    //         const vec2Forward = new Vector2(forwardVec.x, forwardVec.y)
    //         const dotResult = vec2Forward.x * vec2Offset.x + vec2Forward.y * vec2Offset.y

    //         const rad = Math.acos(dotResult)
    //         const relativeVec = new Vector2(100 * Math.cos(rad), 100 * Math.sin(rad))
    //         const crossResult = this.V3Cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
    //         if (crossResult.z > 0) {
    //             relativeVec.x = -relativeVec.x
    //         }

    //         let playerScreenPos = mw.Vector2.zero
    //         GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
    //         const guideUIPos = relativeVec.add(playerScreenPos)
    //         guideUIPos.y = Math.max(guideUIPos.y, this.rootCanvas.size.y - 200)

    //         this.rootCanvas.position = guideUIPos
    //     }


    // }


}