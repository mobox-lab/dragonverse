import { GeneralManager } from "../../../codes/Modified027Editor/ModifiedStaticAPI";
import HomeBaseHud_Generate from "../../../ui-generate/HomeBaseHud_generate";

export class HomeBaseHud extends HomeBaseHud_Generate {
    /**角色 */
    private _char: mw.Character;
    /**玩家 */
    private _player: mw.Player;
    /**目标位置 */
    private _targetLoc: Vector = Vector.zero;
    /**屏幕外的位置 */
    private _outScreenPos: Vector2 = Vector2.zero;
    /**临时方向向量 */
    private _tempDirVec: Vector = Vector.zero;
    /** Y 轴旋转角度 */
    private _rotY: number = 0;
    /** 追随的目标 */
    private _target: GameObject

    /**
     * UI初始化，设置界面层级
     */
    onStart() {
        this.layer = mw.UILayerTop;
    }

    /**
     * 设置目标位置，功能为：初始化玩家和角色，设置目标位置，开启每帧更新
     * @param loc 目标位置
     */
    public static setTargetLoc(target: GameObject) {
        UIService.show(HomeBaseHud, target);
    }

    protected onShow(target: GameObject) {
        if (!this._char) {
            this._player = Player.localPlayer;
            this._char = this._player.character;
        }
        this._target = target;
        this.canUpdate = true;
    }

    protected onHide() {
        this.canUpdate = false;
    }

    /**
     * 每帧执行的方法，功能为：根据玩家当前位置和目标位置，计算出任务引导箭头的方向，当玩家与目标位置距离不足1时，关闭每帧执行
     * @param dt 时间间隔
     */
    onUpdate(dt: number) {
        this._targetLoc.set(this._target.worldTransform.position);
        let playerPos = this._char.worldTransform.position.clone();
        const sizeY = this.rootCanvas.size.y - 50;
        const sizeX = this.rootCanvas.size.x - 150;
        if (GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, this._targetLoc, this._outScreenPos, false)) {
            this._outScreenPos.subtract(new Vector2(150, 50));
            this._outScreenPos.x = MathUtil.clamp(this._outScreenPos.x, 0, sizeX)
            this._outScreenPos.y = MathUtil.clamp(this._outScreenPos.y, 0, sizeY)
            this.rootCanvas.position = this._outScreenPos;
        } else {

            const vec2Offset = new Vector2(this._targetLoc.x, this._targetLoc.y)
                .subtract(playerPos)
                .normalize()
            const forwardVec = Camera.currentCamera.worldTransform.getForwardVector()
            const vec2Forward = new Vector2(forwardVec.x, forwardVec.y)
            const dotResult = vec2Forward.x * vec2Offset.x + vec2Forward.y * vec2Offset.y

            const rad = Math.acos(dotResult)
            const relativeVec = new Vector2(100 * Math.cos(rad), 100 * Math.sin(rad))
            const crossResult = this.V3Cross(new Vector(vec2Offset.x, vec2Offset.y, 0), new Vector(-forwardVec.x, -forwardVec.y, 0))
            if (crossResult.z > 0) {
                relativeVec.x = 1920 - relativeVec.x
            }

            let playerScreenPos = mw.Vector2.zero
            GeneralManager.modifyProjectWorldLocationToWidgetPosition(Player.localPlayer, playerPos, playerScreenPos, false)
            const guideUIPos = relativeVec.add(playerScreenPos)
            guideUIPos.x = MathUtil.clamp(guideUIPos.x, 0, sizeX)
            guideUIPos.y = MathUtil.clamp(guideUIPos.y, 0, sizeY)

            this.rootCanvas.position = guideUIPos
        }
    }

    /**
     * 计算两个向量的叉积
     * @param v1 向量 1
     * @param v2 向量 2
     * @returns 叉积结果
     */
    public V3Cross(v1: mw.Vector, v2: mw.Vector) {
        let x = v1.y * v2.z - v1.z * v2.y
        let y = v2.x * v1.z - v1.x * v2.z
        let z = v1.x * v2.y - v1.y * v2.x
        return new mw.Vector(x, y, z)
    }
}