import Utils from "../Utils";
import { IBuffElement } from "../config/Buff";
import { GameConfig } from "../config/GameConfig";

/*
 * @Author: shifu.huang
 * @Date: 2023-12-26 15:04:25
 * @LastEditors: shifu.huang
 * @LastEditTime: 2024-01-07 14:00:42
 * @FilePath: \nevergiveup\JavaScripts\tool\BuffTool.ts
 * @Description: 修改描述
 */
// export enum BuffType {
//     attackDamage = 1,
//     findRange = 2,
//     attackRange = 3,
//     attackTime = 4,
//     attackCount = 5,
//     speed = 6,
//     speedPercent = 7,
//     attackDamagePercent = 8,
//     attackTimePercent = 9,
//     hurtAmount = 10,
//     hurtAmountPercent = 11,
// }
export class Buff {
    id: number = 0;
    duration: number = 0;
    cfg: IBuffElement;
    go: GameObject;
    attached: boolean = false;
    constructor(id: number) {
        this.updateBuff(id);
        // for (let buffName of Object.keys(BuffType)) {
        //     this[buffName] = cfg[buffName];
        // }
        this.cfg.guid && GameObjPool.asyncSpawn(this.cfg.guid).then(async (go: GameObject) => {
            // go.parent = null;
            // go.worldTransform.position = Utils.TEMP_VECTOR.set(0, 0, -810975);
            go.localTransform = Utils.Transform_Default;
            go.localTransform.position = Utils.TEMP_VECTOR.set(0, 0, -810975);
            this.go = go;
        })
    }

    public updateBuff(id: number) {
        this.id = id;
        let cfg = GameConfig.Buff.getElement(id);
        this.cfg = cfg;
        this.duration = cfg.duration;
    }


    onDestroy() {
        if (this.go) {
            this.attached = false;
            // this.go.parent = null;
            GameObjPool.despawn(this.go);
            this.go = null;
        }
    }
}

// Buff管理器类
export class BuffManager {
    buffs: Buff[];

    constructor() {
        this.buffs = [];
    }

    addBuff(buffID: number): boolean {
        let cfg = GameConfig.Buff.getElement(buffID);
        let oriBuff = this.buffs.find(b => b.cfg.conflictID == cfg.conflictID);
        let newBuff;
        if (oriBuff && oriBuff.duration > 0) {
            if (!cfg) {
                console.log('hsf====================== 没有buff', (buffID))
                return;
            }
            switch (cfg.conflictTypes) {
                case 1://覆盖
                    if (buffID > oriBuff.id) {
                        this.removeBuff(oriBuff);
                        // oriBuff.updateBuff(buffID);
                        newBuff = new Buff(buffID);
                        this.buffs.push(newBuff);
                    } else if (buffID == oriBuff.id) {
                        oriBuff.duration = cfg.duration;
                    } else {
                        //低级的buff不叠加
                    }
                    break;
                case 2://独立存在
                    newBuff = new Buff(buffID);
                    this.buffs.push(newBuff);
                    break;
            }
        } else {
            newBuff = new Buff(buffID);
            this.buffs.push(newBuff);
        }
        return newBuff != null;
    }

    removeBuff(buff: Buff) {
        const index = this.buffs.indexOf(buff);
        if (index !== -1) {
            this.buffs[index].onDestroy();
            this.buffs.splice(index, 1);
        }
    }

    destroy() {
        for (const buff of this.buffs) {
            buff.onDestroy();
        }
        this.buffs = [];
    }

}

export interface BuffBag {
    buffManager: BuffManager;
    applyBuff(buffID: number): void;
    destroyBuff(buff: Buff): void;
    updateAttributes(): void;
    calculateAttribute(attribute: string): void;
    updateBuffs(dt: number): void;
}