import { CSAssets } from "../CameraCG";
import { GoPool } from "../utils/GoPoole";
import { CameraProxy } from "./CameraProxy";

/**
 * 代理摄像机
 * 非摄像机同步模式下使用的代替显示对象
 */
export class VirtualCamera extends CameraProxy {

    /**
     * 初始化代理摄像机对象
     */
    public init() {
        this.go = GoPool.getInstance().spawn(CSAssets.MESH_CONES, GameObjPoolSourceType.Asset) as mw.Model;
        this.go.createMaterialInstance(0);
        this.go.getMaterialInstance()[0].setVectorParameterValue("Main_Diffuse_Color", mw.LinearColor.yellow);
        this.go.getMaterialInstance()[0].setScalarParameterValue("Main_Opacity_Max", 0.6);
        this.go.setVisibility(mw.PropertyStatus.Off);
        this.go.worldTransform.scale = new mw.Vector(0.4, 0.4, 0.3);
    }

    public setRotation(rot: Rotation) {
        this.go.worldTransform.rotation = rot.clone().add(new Rotation(0, 90, 0))
    }

    /**
     * 销毁摄像机对象
     */
    public destroy() {
        this.go.destroy();
    }

}