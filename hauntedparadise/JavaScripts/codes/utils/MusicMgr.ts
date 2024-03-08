/*
 * @Author       : dal
 * @Date         : 2023-11-23 13:47:37
 * @LastEditors  : dal
 * @LastEditTime : 2023-11-23 14:19:21
 * @FilePath     : \hauntedparadise\JavaScripts\utils\MusicMgr.ts
 * @Description  : 
 */

import { GameConfig } from "../../config/GameConfig";


export default class MusicMgr {

    private static _instance: MusicMgr;

    private constructor() { }

    public static get instance() {
        if (!this._instance) {
            this._instance = new MusicMgr();
        }
        return this._instance;
    }

    /** 开启音效声音 */
    public openMusic() {
        SoundService.volumeScale = 1;
    }

    /** 关闭音效声音 */
    public closeMusic() {
        SoundService.volumeScale = 0;
    }

    /** 打开BGM声音 */
    public openBgm() {
        SoundService.BGMVolumeScale = 1;
    }

    /** 关闭BGM声音 */
    public closeBgm() {
        SoundService.BGMVolumeScale = 0;
    }

    private playBgm(guid: string, volume: number = 1) {
        SoundService.playBGM(guid, volume);
    }

    private playSound(guid: string, volume: number = 1, loopNum: number = 1) {
        return SoundService.playSound(guid, loopNum, volume);
    }


    private play3DSound(guid: string, target: string | GameObject | Vector, volume: number = 1, loopNum: number = 1) {
        if (!target) {
            // console.error(`3D音效${guid}没填宿主，将默认在Player身上播放`);
            this.play3DSound(guid, Player.localPlayer.character, volume, loopNum);
        }
        return SoundService.play3DSound(guid, target, loopNum, volume, { radius: 1e3, falloffDistance: 3e3 });
    }

    private stopPlaySound(guid: string) {
        SoundService.stopSound(guid);
    }

    /** 控制3D音效停止的map */
    soundMap: Map<string, number> = new Map();

    private stopPlay3DSound(guid: string) {
        if (!this.soundMap.has(guid)) { return; }
        SoundService.stop3DSound(this.soundMap.get(guid));
        this.soundMap.delete(guid);
    }

    /**
     * 根据音效配置表id播放对应音效
     * @param soundId 音效配置表id
     * @param target 3D音效的宿主（如果没有将默认在Player身上播放）
     */
    async play(soundId: number, target?: string | GameObject | Vector) {
        let soundCfg = GameConfig.Sound.getElement(soundId);
        if (!soundCfg || !soundCfg.guid || soundCfg.volume === 0) { return; }
        if (!AssetUtil.assetLoaded(soundCfg.guid)) { await AssetUtil.asyncDownloadAsset(soundCfg.guid); }
        switch (soundCfg.type) {
            case 0:
                this.playBgm(soundCfg.guid, soundCfg.volume);
                break;
            case 1:
                this.playSound(soundCfg.guid, soundCfg.volume, soundCfg.loopNum);
                break;
            case 2:
                this.soundMap.set(soundCfg.guid, this.play3DSound(soundCfg.guid, target, soundCfg.volume, soundCfg.loopNum));
                break;
            default:
                console.error("音效类型错误:" + soundCfg.id);
        }
    }

    /**
     * 根据音效配置表id，停止播放某个音效
     * @param soundId 音效配置表id
     */
    stop(soundId: number) {
        let soundCfg = GameConfig.Sound.getElement(soundId);
        if (!soundCfg || !soundCfg.guid) { return; }
        switch (soundCfg.type) {
            case 0:
                SoundService.stopBGM();
                break;
            case 1:
                this.stopPlaySound(soundCfg.guid);
                break;
            case 2:
                this.stopPlay3DSound(soundCfg.guid);
                break;
            default:
                console.error("音效类型错误，停止失败:" + soundCfg.id);
        }
    }
}