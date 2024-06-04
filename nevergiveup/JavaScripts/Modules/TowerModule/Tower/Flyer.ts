export class Flyer {
    /**导弹预制体 */
    private _prefab: GameObject

    /**构造函数，new的时候传入一个位置来进行初始化 */
    constructor(bornPos: Vector, private guid: string, private flyZ: number) {
        this.init(bornPos)
    }

    /**初始化DaoDan */
    private async init(bornPos: Vector) {
        // 使用对象池来创建预制体，并设置预制体的位置
        this._prefab = await GameObjPool.asyncSpawn(this.guid, GameObjPoolSourceType.Prefab)
        this._prefab.worldTransform.position = bornPos;
        this._prefab.setVisibility(false);
    }

    /**导弹飞向一个坐标 */
    public async fireToPos(targetPos: Vector) {
        // 先播放起飞动画
        // this.fireReadyAnim()
        this._prefab.setVisibility(true);

        // 在目标位置创建一个特效（预警特效）
        EffectService.playAtPosition("155714", targetPos, {
            duration: 0.5
        })


        // 将起点坐标解构（方便Tween进行过渡）
        let startLoc = { x: this._prefab.worldTransform.position.x, y: this._prefab.worldTransform.position.y, z: this._prefab.worldTransform.position.z }
        // 将目标点坐标解构（方便Tween进行过渡）
        let targetLoc = { x: targetPos.x, y: targetPos.y, z: targetPos.z }


        // 上一帧位置
        let lastPos: Vector = this._prefab.worldTransform.position.clone()
        // 当前帧位置
        let nowPos: Vector = Vector.zero
        // 中间商位置（避免频繁去new Vector）
        let tempPos: Vector = Vector.zero

        // 创建起点为导弹位置的一个Tween
        const newTween = new Tween(this._prefab.worldTransform.position.clone())

        newTween.to({
            // X轴飞行路径（这些路径点可以自由定义）
            x: [
                // startLoc.x - 100 + Math.random() * 200,
                // startLoc.x + 3000 + Math.random() * 2000,
                // startLoc.x + 5000 + Math.random() * 2000,
                targetLoc.x],

            // Y轴飞行路径（这些路径点可以自由定义）
            y: [
                // startLoc.y + 300 + Math.random() * 200,
                // startLoc.y + 3000 + Math.random() * 2000,
                // startLoc.y + 5000 + Math.random() * 2000,
                targetLoc.y],

            // Z轴飞行路径（这些路径点可以自由定义）
            z: [
                targetLoc.z + this.flyZ,
                // 750 + Math.random() * 1000,
                // 950 + Math.random() * 1000,
                // 750 + Math.random() * 1000,
                // 550 + Math.random() * 1000,
                targetLoc.z]

        }, 300) // 整个过程持续3000毫秒

            /**
             * Linear插值：完全线性，拐弯没有过渡，直来直去
             * Bezier插值：全程平滑，整个过程都被平滑成一条曲线
             * CatmullRom插值：拐弯平滑，只在拐弯处进行平滑
             */
            .interpolation(TweenUtil.Interpolation.Bezier) // 使用CatmullRom插值

            .onUpdate((value) => {
                // 每次循环，将value（过渡值）赋值给tempPos和nowPos用于运算
                tempPos.set(value.x, value.y, value.z)
                nowPos.set(value.x, value.y, value.z)
                // 将火箭的坐标设置为过渡值
                this._prefab.worldTransform.position = tempPos
                // 根据上一帧位置和这一帧位置，计算火箭的实时朝向
                this._prefab.worldTransform.rotation = nowPos.subtract(lastPos).toRotation()
                // 将此帧值赋值给lastPos，用于下一次运算
                lastPos.set(value.x, value.y, value.z)

            })

        // 当Tween播放完毕时
        newTween.onComplete(() => {
            // 在结束位置播放一个爆炸特效
            EffectService.playAtPosition("4373", this._prefab.worldTransform.position)
            // 重置火箭的旋转
            this._prefab.worldTransform.rotation = Rotation.zero
            // 将火箭归还给预制体
            GameObjPool.despawn(this._prefab)
        })

        newTween.start()
    }


    /**判断预制体是否创建完毕 */
    public isReady(): Promise<boolean> {
        return new Promise((res) => {
            if (this._prefab != null) {
                res(true);
            } else {
                let index = 0
                let id = setInterval(() => {
                    index++
                    if (this._prefab != null) {
                        clearInterval(id)
                        res(true);
                    } else if (index > 300) {
                        clearInterval(id)
                        res(false)
                    }
                }, 30);
            }
        })
    }

    /**起飞阶段动画 */
    private fireReadyAnim() {
        let tempRotate: Rotation = Rotation.zero
        let startPos: Vector = this._prefab.worldTransform.position.clone()

        let tweenA = new Tween({ y: 0 }).to({ y: 60 + Math.random() * 30 }, 1000).onUpdate((value) => {
            tempRotate.y = value.y
            this._prefab.worldTransform.rotation = tempRotate
        }).start().easing(TweenUtil.Easing.Cubic.Out)

        let tweenB = new Tween(startPos).to(startPos.clone().add(new Vector(0, 0, Math.random() * 100)), 1000).onUpdate((value) => {
            this._prefab.worldTransform.position = value
        }).start().easing(TweenUtil.Easing.Cubic.Out)
    }
}