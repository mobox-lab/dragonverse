import { BuffBase, BuffType } from "./Buff";
import UnifiedRoleController from "../../module/role/UnifiedRoleController";

/**
 * Buff 控制器.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @author maopan.liao
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class BuffContainer {
    private buffs: Map<BuffType, BuffBase> = new Map();

    /**
     * 是否 存在同类型 Buff.
     * @param type
     */
    public hasBuff(type: BuffType) {
        return this.buffs.has(type);
    }

    /**
     * 获取 指定类型 Buff.
     * @param type
     */
    public getBuff(type: BuffType) {
        return this.buffs.get(type);
    }

    /**
     * 添加 Buff.
     * @param buff
     */
    public addBuff(buff: BuffBase) {
        if (this.hasBuff(buff.type)) {
            this.removeBuff(buff.type);
        }

        this.buffs.set(buff.type, buff);
        buff.start();

        if (buff.survivalStrategy < 0) {
            this.removeBuff(buff.type);
        }
    }

    /**
     * 刷新已有 Buff.
     * 已有 Buff 需与传入条件 **同型**：
     *      同型 指具有相同的 {@link BuffBase.type} 与 {@link BuffBase.caster}.
     *
     * 建议具有简单结构或对自身同型 Buff 具有冲突性的 Buff 在添加前执行此方法.
     * @param type
     * @param caster
     * @param refresher 更新 buff 数据. 传入参数为已有同型 Buff.
     * @return {boolean} 当存在同型 Buff 且刷新成功时返回 true, 否则返回 false.
     */
    public refreshBuff<T>(type: BuffType, caster: UnifiedRoleController, refresher: (buff: T) => void = null): boolean {
        if (!this.hasBuff(type)) {
            return false;
        }

        const buff = this.getBuff(type);
        if (buff.caster === caster) {
            try {
                refresher && refresher(buff as T);
                buff.refresh();
                return true;
            } catch (e) {
                return false;
            }
        }

        return false;
    }

    /**
     * 移除 指定类型 Buff.
     * @param buffType
     */
    public removeBuff(buffType: BuffType) {
        if (!this.hasBuff(buffType)) {
            return;
        }

        const buff = this.buffs.get(buffType);
        this.buffs.delete(buffType);
        buff.remove();
    }

    public destroy() {
        for (const type of this.buffs.keys()) {
            this.removeBuff(type);
        }
    }

    public update(dt: number) {
        let currentTime = Date.now();

        for (const buff of this.buffs.values()) {

            if (buff.survivalStrategy > 0) {
                if (currentTime > buff.startTime + buff.survivalStrategy) {
                    this.removeBuff(buff.type);
                    continue;
                }
            }

            if (buff.intervalTime > 0) {
                let passTime = currentTime - buff.startTime;
                let totalCnt = Math.floor(passTime / buff.intervalTime);
                let cnt = totalCnt - buff.times;

                for (let i = 0; i < cnt; i++) {
                    buff.intervalThink();
                }
            }

        }
    }
}