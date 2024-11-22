import { GameConfig } from "../config/GameConfig";
import { IVoiceElement } from "../config/Voice";
import { GameManager } from "../GameManager";

/*
 * @Author: shifu.huang
 * @Date: 2023-06-08 10:17:41
 * @LastEditors: haoran.zhang haoran.zhang@appshahe.com
 * @LastEditTime: 2024-08-12 11:21:48
 * @FilePath: \nevergiveup\JavaScripts\tool\SoundUtil.ts
 * @Description: 修改描述
 */

/**0 0点模板 */
const TEMP_VECTOR = Vector.zero;

export enum VoiceEvent {
    Bgm = "BgmVoiceFactor",
    Attack = "AttackVoiceFactor",
}

export enum EffectEvent {
    AttackEffect = "AttackEffect",
    AttackDamage = "AttackDamage",
}

/**声音工具 */
export namespace SoundUtil {
    export let bgmVoiceFactor: number = 0.3;
    export let attackVoiceFactor: number = 1;
    /**初始化 */
    export function init() {
        if (SystemUtil.isServer()) {
            Event.addClientListener("playSound", (player: mw.Player, id: number, pos: Vector) => {
                let players = Player.getAllPlayers();
                for (let i = 0; i < Player.getAllPlayers().length; i++) {
                    let p = players[i];
                    if (player.playerId != p.playerId) Event.dispatchToClient(p, "playSound", player.playerId, id, pos);
                }
            });
        } else {
            Event.addServerListener("playSound", (playerId: number, id: number, pos: Vector) => {
                let player = Player.getPlayer(playerId);
                if (player) {
                    let character = player.character;
                    if (character) {
                        console.log("play sound", id);
                        PlaySoundById(id, false, pos);
                    }
                }
            });

            Event.addLocalListener(VoiceEvent.Bgm, (value: number) => {
                bgmVoiceFactor = value;
                mw.SoundService.BGMVolumeScale = value;
                if (value === 0) {
                    const stage = GameManager.getStageClient();
                    if (stage) {
                        stage.stopBGM();
                    } else {
                        stopBGM();
                    }
                } else {
                    const stage = GameManager.getStageClient();
                    if (stage) {
                        stage.playBGM();
                    } else {
                        playBGM();
                    }
                }
            });

            Event.addLocalListener(VoiceEvent.Attack, (value: number) => {
                attackVoiceFactor = value;
            });
        }
    }
    /**
     * 播放音乐
     * @param cfg 配置
     * @param pos 位置
     * @param isDestroy 是否删除
     * @returns 音乐数据
     */
    export async function PlaySound(
        cfg: IVoiceElement,
        pos: Vector = null,
        isDestroy: boolean = true
    ): Promise<mw.Sound> {
        if (!cfg) return null;
        if (attackVoiceFactor === 0) return;
        let soundObj = (await GameObjPool.asyncSpawn(cfg.Guid)) as mw.Sound;
        soundObj.isLoop = cfg.isLoop;
        // soundObj.volume = cfg.Volume * bgmVoiceFactor + 100;
        soundObj.volume = cfg.Volume;
        if (cfg.Distance > 0 && pos) {
            soundObj.isSpatialization = true;
            soundObj.worldTransform.position = pos;
            soundObj.attenuationShapeExtents = TEMP_VECTOR.set(cfg.Distance, 0, 0);
        }
        soundObj.play();
        if (isDestroy) {
            soundObj.onFinish.add(() => {
                GameObjPool.despawn(soundObj);
            });
        }
        return soundObj;
    }

    /**
     * 通过音效表ID播放音效
     * @param id 音效表ID
     * @param isSync 是否同步
     * @param pos 3d音效坐标
     * @param isDestroy 是否删除
     * @returns 音乐数据
     */
    export async function PlaySoundById(
        id: number,
        isSync: boolean = false,
        pos: Vector = null,
        isDestroy: boolean = true
    ): Promise<mw.Sound> {
        let voice;
        const cfg = GameConfig.Voice.getElement(id);
        if (cfg) {
            if (cfg.IsBgm) {
                mw.SoundService.playBGM(cfg.Guid, cfg.Volume);
            } else {
                if (isSync) {
                    Event.dispatchToServer("playSound", id, pos);
                }
                voice = await SoundUtil.PlaySound(cfg, pos, isDestroy);
            }
        } else {
            console.log("找不到音效!!!!!!!!!!!!!!!!!!!!! ", id);
        }
        return voice;
    }

    /**
     * 停止BGM
     */
    export function stopBGM() {
        mw.SoundService.stopBGM();
    }

    export function playBGM() {
        mw.SoundService.playBGM("434721", bgmVoiceFactor);
    }
}
