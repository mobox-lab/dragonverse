/**
 * 关卡管理器
 */
export class LevelManager {
    // 单例模式
    private static _instance: LevelManager
    public static get instance(): LevelManager {
        if (LevelManager._instance == null) {
            LevelManager._instance = new LevelManager()
        }
        return LevelManager._instance
    }

    /**死亡触发器 */
    private _deathTrigger: Trigger

    /**复活位置 */
    private _rebornPosition: Vector = new Vector(10, 0, 420)

    public async init() {
        this._deathTrigger = await GameObject.asyncFindGameObjectById("2E949904") as Trigger
        this._deathTrigger?.onEnter.add((other: GameObject) => {
            // 当进入的物体是角色类型
            if (other instanceof Character) {
                // 让角色死亡
                this.charDeath(other)
            }
        })
    }

    /**让角色死亡 */
    public charDeath(char: Character) {

        setTimeout(() => {
            // 让角色复活
            this.charReborn(char)
        }, 1000);
    }

    /**让角色复活 */
    public charReborn(char: Character) {
        // 将角色的位置改变到复活点
        char.worldTransform.position = this._rebornPosition.clone().add(new Vector(-1650, -3550, 3664))
    }
}