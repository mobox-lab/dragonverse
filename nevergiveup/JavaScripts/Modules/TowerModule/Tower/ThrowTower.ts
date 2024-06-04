/*
 * @Author: shifu.huang
 * @Date: 2023-12-25 15:13:51
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-17 10:50:15
 * @FilePath: \nevergiveup\JavaScripts\Modules\TowerModule\Tower\ThrowTower.ts
 * @Description: 修改描述
 */
import { GameManager } from "../../../GameManager";
import Utils from "../../../Utils";
import AttackTower from "./AttackTower";
import { Flyer } from "./Flyer";

export default class ThrowTower extends AttackTower {
    protected async attack() {
        const enemys = this.getRandEnemy(this.cfg.attackCount[this.level]);
        if (!enemys || enemys.length <= 0) return;
        if (this._attackAnim) this._attackAnim.play();
        let pos = null;
        //没创建好就不旋转，让没创建好也能攻击
        if (this.tower?.worldTransform && enemys[0]?.position?.x != null && enemys[0]?.position?.y != null && this.oriTransform) {
            pos = this.tower?.worldTransform.position;
            this.tower.worldTransform.rotation = Utils.TEMP_VECTOR.set(
                enemys[0].position.x - this.tower.worldTransform.position.x,
                enemys[0].position.y - this.tower.worldTransform.position.y,
                0,).toRotation().add(this.oriTransform.rotation);
        }
        if (pos == null) pos = this.oriPos;
        pos.z += 80;
        let go = new Flyer(pos, this.cfg.weaponGuid, this.cfg.flyZ);
        await TimeUtil.delaySecond(0.2);
        let flag = await go.isReady();
        flag && go.fireToPos(enemys[0].position);
        this.attackShow();
        setTimeout(() => {
            this.makeDamage(enemys);
        }, 300);
    }
}