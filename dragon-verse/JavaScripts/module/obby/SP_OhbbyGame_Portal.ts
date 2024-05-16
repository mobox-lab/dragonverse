/*
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-08-30 09:38:51
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2023-04-21 12:37:00
 * @FilePath: \ugc\JavaScripts\Module\GameLogic\SceneInteractiveObjs\SP_ObbyGame_Death.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

/**
* 传送门
*/
@Component
export default class ObbyGame_Portal extends mw.Script {
    root: GameObject = null;
    tA: Trigger = null;
    tB: Trigger = null;
    size: number = 10;
    /** 防止玩家一直触发 */
    playerSet = new Set;
    onStart(): void {

        if (SystemUtil.isServer()) {
            if (!this.gameObject || this.gameObject.name != "PortalRoot") {
                console.log("ObbyGame_Portal start Error  script has no Root ErrorIfo:", this.gameObject == null ? " no GameObj" : this.gameObject.name + " name Error");
                return;
            }
            this.root = this.gameObject;
            let rootA = this.root.getChildByName("RootA");
            let rootB = this.root.getChildByName("RootB");
            if (rootA == null || rootB == null) {
                console.log("ObbyGame_Portal start Error  Root Has No rootA or rootB ErrorIfo:", rootA == null ? "rootA is Null" : "rootA find", rootB == null ? "rootB is Null" : "rootB find");
                return;
            }

            this.tA = rootA.getChildByName("TriggerA") as Trigger;
            this.tB = rootB.getChildByName("TriggerB") as Trigger;
            if (!this.tA || !this.tB) {
                console.log("ObbyGame_Portal start Error  Root Has No Trigger ErrorIfo:", this.tA == null ? "ta is Null" : "tA find", this.tB == null ? "tB is Null" : "tB find");
                return;
            }
            this.tA.onEnter.add(this.enterA);
            this.tB.onEnter.add(this.enterB);

            let p = mw.Vector.zero;
            let s = mw.Vector.zero;
            this.tA.getBounds(false, p, s, true);
            //this.size = s.y;
        }
    }
    // 用箭头函数报错，要不运行态返回会清不掉绑定的事件
    private enterA = (go: mw.GameObject) => {
        console.log("ObbyGame_Portal enterA-------------------------------------");
        if (((go) instanceof mw.Character)) {
            console.log("ObbyGame_Portal enterA------------------------------------- go.player.playerId: ", go.player.playerId);
            console.log("ObbyGame_Portal enterA------------------------------------- this.playerSet.has(go.player.playerId): ", this.playerSet.has(go.player.playerId));
            if (this.playerSet.has(go.player.playerId)) return;
            this.playerSet.add(go.player.playerId);
            console.log("ObbyGame_Portal enterA------------------------------------- this.playerSet.size: ", this.playerSet.size);

            let radius = go.collisionExtent.z;

            let dir = this.tA.worldTransform.position.subtract(go.worldTransform.position);
            let tDir = this.tB.worldTransform.getRightVector();

            if (mw.Vector.angle(dir, tDir) > 90)
                tDir = tDir.multiply(-1);

            console.log("ObbyGame_Portal enterA------------------------------------- tDir, this.size: ", tDir.toString(), this.size.toString());
            go.worldTransform.position = this.tB.worldTransform.position.add(tDir.normalized.multiply(this.size));
            TimeUtil.delayExecute(() => {
                this.playerSet.delete(go.player.playerId);
                console.log("ObbyGame_Portal enterA------------------------------------- this.playerSet.size: , delete playerId: ", this.playerSet.size, go.player.playerId);
            }, 5)
        }
    }
    private enterB = (go: mw.GameObject) => {
        console.log("ObbyGame_Portal enterB-------------------------------------");
        if (((go) instanceof mw.Character)) {
            console.log("ObbyGame_Portal enterB------------------------------------- go.player.playerId: ", go.player.playerId);
            console.log("ObbyGame_Portal enterB------------------------------------- this.playerSet.has(go.player.playerId): ", this.playerSet.has(go.player.playerId));
            if (this.playerSet.has(go.player.playerId)) return;
            this.playerSet.add(go.player.playerId);
            console.log("ObbyGame_Portal enterB------------------------------------- this.playerSet.size: ", this.playerSet.size);

            let radius = go.collisionExtent.z;
            let dir = this.tB.worldTransform.position.subtract(go.worldTransform.position);
            let tDir = this.tA.worldTransform.getRightVector();

            if (mw.Vector.angle(dir, tDir) > 90)
                tDir = tDir.multiply(-1);

            console.log("ObbyGame_Portal enterB------------------------------------- tDir, this.size: ", tDir.toString(), this.size.toString());
            go.worldTransform.position = this.tA.worldTransform.position.add(tDir.normalized.multiply((this.size)));
            TimeUtil.delayExecute(() => {
                this.playerSet.delete(go.player.playerId);
                console.log("ObbyGame_Portal enterB------------------------------------- this.playerSet.size: , delete playerId: ", this.playerSet.size, go.player.playerId);
            }, 5)
        }
    }

    protected onDestroy(): void {
        if (SystemUtil.isServer()) {
            if (this.tA) {
                this.tA.onEnter.remove(this.enterA);
            }
            if (this.tB) {
                this.tB.onEnter.remove(this.enterB);
            }
        }
    }
}