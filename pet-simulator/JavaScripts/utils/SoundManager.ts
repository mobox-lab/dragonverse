import { GameConfig } from "../config/GameConfig";

export class SoundManager {

    private sound: mw.Sound;

    private static _instance: SoundManager;
    public static get instance(): SoundManager {
        if (!this._instance) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }

    public play3DSound(soundId: number, target: mw.Vector | mw.GameObject): number {
        let soundInfo = GameConfig.Music.getElement(soundId);
        let falloffDis = soundInfo.falloffDistance == 0 ? 600 : soundInfo.falloffDistance;
        let shapeDis = soundInfo.shapeExtents == 0 ? 200 : soundInfo.shapeExtents;
        return SoundService.play3DSound(soundInfo.guid, target, 1, soundInfo.volume, { radius: shapeDis, falloffDistance: falloffDis });

    }

    public playAtkSound(soundId: number, target: mw.Vector | mw.GameObject) {
        let soundInfo = GameConfig.Music.getElement(soundId);
        let falloffDis = soundInfo.falloffDistance == 0 ? 600 : soundInfo.falloffDistance;
        let shapeDis = soundInfo.shapeExtents == 0 ? 200 : soundInfo.shapeExtents;

        if (this.sound && this.sound.playState == 0) {
            return;
        }
        let playId = SoundService.play3DSound(soundInfo.guid, target, 1, soundInfo.volume, { radius: shapeDis, falloffDistance: falloffDis });
        SoundService.get3DSoundById(playId).then(go => {
            this.sound = go;
        })
    }

    /**播放3D循环音效 */
    public play3DSoundLoop(soundId: number, target: mw.Vector | mw.GameObject): number {
        let soundInfo = GameConfig.Music.getElement(soundId);
        return SoundService.play3DSound(soundInfo.guid, target, 0, soundInfo.volume);
    }

    /**播放背景音乐 */
    public playBGM(soundId: number): void {
        let soundInfo = GameConfig.Music.getElement(soundId);
        SoundService.playBGM(soundInfo.guid, soundInfo.volume);
    }

    /**播放音效 */
    public playSound(soundId: number): void {
        let soundInfo = GameConfig.Music.getElement(soundId);
        SoundService.playSound(soundInfo.guid, 1, soundInfo.volume);
    }

}