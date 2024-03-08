
/**
 * 摄像机代理对象基类
 */
export abstract class CameraProxy {

    /** 摄像机对象 */
    public go: Model | Camera;

    /**
     * 初始化摄像机对象
     */
    public abstract init();

    /**
     * 销毁摄像机对象
     */
    public abstract destroy();

    /**
     * 获取摄像机位置
     * @returns 摄像机位置
     */
    public getLocation() {
        return this.go.worldTransform.position.clone();
    }

    /** 
     * 获取摄像机旋转
     * @returns 摄像机旋转
     */
    public getRotation(): Rotation {
        return this.go.worldTransform.rotation.clone();
    }

    /**
     * 获取摄像机视角场
     * @returns 摄像机视角场
     */
    public getFov(): number {
        return -1
    }

    /**
     * 设置摄像机位置
     * @param location 摄像机位置
     */
    public setLocation(loc: Vector) {
        this.go.worldTransform.position = loc.clone();
    }

    /**
     * 设置摄像机旋转
     * @param rotation 摄像机旋转
     */
    public setRotation(rot: Rotation) {
        this.go.worldTransform.rotation = rot.clone();
    }

    /**
     * 设置摄像机视角场
     * @param fov 摄像机视角场
     */
    public setFOV(fov: number) { }

    /** 
     * 设置对象显影
     */
    public setVisibility(isVisible: boolean) {
        this.go.setVisibility(isVisible ? PropertyStatus.On : PropertyStatus.Off);
    }

}
