/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-06 17:15:03
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-06 17:32:18
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\FaceToCamera.ts
 * @Description  : 
 */

import { WaitLoop } from "./AsyncTool";

export default class FaceToCamera extends mw.Script {

    private _camera: Camera
    @mw.Property({ displayName: "初始旋转偏移" })
    public deltaAngle: number = 90
    protected onStart(): void {
        WaitLoop.loop(() => { return this.gameObject }).then(() => {
            this._camera = Camera.currentCamera;
            this.useUpdate = true;
        })
    }

    protected onUpdate(dt: number): void {
        let ro = Vector.subtract(this._camera.worldTransform.position, this.gameObject.worldTransform.position).toRotation()
        ro.z += this.deltaAngle
        this.gameObject.worldTransform.rotation = ro
    }
}