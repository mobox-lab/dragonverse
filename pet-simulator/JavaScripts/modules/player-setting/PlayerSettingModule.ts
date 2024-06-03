import ModuleC = mwext.ModuleC;
import ModuleS = mwext.ModuleS;
import Subdata = mwext.Subdata;

import { ATransactItem, Transact } from "./ATransactItem";
import { Constructor } from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";
import { P_HudUI } from "../Hud/P_HudUI";
import GameServiceConfig from "../../const/GameServiceConfig";

type SettingItemType =
    | "bgm-volume"
    | "sound-effect-volume"
    | "language"
    | "mute-sound-effect-volume"
    | "mute-bgm-volume" |
    "camera-lookUp-rate-scale";

abstract class SettingItem<T> extends ATransactItem<T> {
    public abstract readonly type: SettingItemType;
    public abstract reset(): this;
}

// class LanguageTransactItem extends SettingItem<LanguageTypes> {
//     public type: SettingItemType = "language";
//     public readonly previewEnable: boolean = false;

//     protected set(val: LanguageTypes): void {
//         i18n.use(val);
//     }

//     public get(): LanguageTypes {
//         return i18n.currentLanguage();
//     }

//     public reset(): this {
//         this.set(0);
//         return this;
//     }
// }

class BgmVolumeTransactItem extends SettingItem<number> {
    public type: SettingItemType = "bgm-volume";
    public readonly previewEnable: boolean = true;

    protected set(val: number): void {
        SoundService.BGMVolumeScale = val;
    }

    public get(): number {
        return SoundService.BGMVolumeScale;
    }

    public reset(): this {
        this.set(1);
        return this;
    }
}

class SoundEffectVolumeTransactItem extends SettingItem<number> {
    public type: SettingItemType = "sound-effect-volume";
    public readonly previewEnable: boolean = true;

    protected set(val: number): void {
        SoundService.volumeScale = val;
    }

    public get(): number {
        return SoundService.volumeScale;
    }

    public reset(): this {
        this.set(1);
        return this;
    }
}

class MuteBgmVolumeTransactItem extends SettingItem<boolean> {
    public type: SettingItemType = "mute-bgm-volume";
    public readonly previewEnable: boolean = true;

    protected set(val: boolean): void {
        SoundService.BGMVolumeScale = val ? 0 : 1;
    }

    public get(): boolean {
        return SoundService.BGMVolumeScale === 0;
    }

    public reset(): this {
        this.set(false);
        return this;
    }
}

class MuteSoundEffectVolumeTransactItem extends SettingItem<boolean> {
    public type: SettingItemType = "mute-sound-effect-volume";
    public readonly previewEnable: boolean = true;

    protected set(val: boolean): void {
        SoundService.volumeScale = val ? 0 : 1;
    }

    public get(): boolean {
        return SoundService.volumeScale === 0;
    }

    public reset(): this {
        this.set(false);
        return this;
    }
}

class CameraLookUpRateScaleTransactItem extends SettingItem<number> {
    public type: SettingItemType = "camera-lookUp-rate-scale";
    public readonly previewEnable: boolean = true;

    protected set(val: number): void {
        //映射到0.15到0.4之间，效果好一点
        let value = (val - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) * (GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MAX - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) / (1 - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) + GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN;
        // Log4Ts.log(CameraLookUpRateScaleTransactItem, `set cameraLookUpRateScale: ${value}`);
        UIService.getUI(P_HudUI, false).mTouchPad.inputScale = new Vector2(value, value);
    }

    public get(): number {
        let value = UIService.getUI(P_HudUI, false).mTouchPad.inputScale.x;
        //从0.15到0.4映射到0.15到1之间
        let res = (value - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) * (1 - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) / (GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MAX - GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN) + GameServiceConfig.MOUSE_DRAG_SENSITIVITY_MIN;
        // Log4Ts.log(CameraLookUpRateScaleTransactItem, `get cameraLookUpRateScale: ${res}`);
        return res;
    }

    public reset(): this {
        this.set(0.5);
        return this;
    }
}

export default class PlayerSettingModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;

    // @Decorator.persistence()
    // language: LanguageTypes = LanguageTypes.Chinese;

    /**
     * 音乐音量.
     * @desc value in [0,1].
     */
    @Decorator.persistence()
    bgmVolume: number;

    /**
     * 音效音量.
     * @desc value in [0,1].
     */
    @Decorator.persistence()
    soundEffectVolume: number;

    /**
     * 镜头灵敏度.
     * @desc value in [0.15,1].
     */
    @Decorator.persistence()
    cameraLookUpRateScale: number;

    protected initDefaultData(): void {
        // this.language = LanguageTypes.Chinese;
        this.bgmVolume = 1;
        this.soundEffectVolume = 1;
        this.cameraLookUpRateScale = 0.5;
    }

    protected onDataInit(): void {
        while (this.version != this.currentVersion) {
            switch (this.currentVersion) {
                case 1:
                    // 假如数据版本还是1，那么就需要进行升级
                    this.currentVersion = 2

                    // 在升级的地方对新字段进行初始化
                    this.cameraLookUpRateScale = 0.5
                    break;

                default:
                    Log4Ts.error(PlayerSettingModuleData, `unsupported data version.`);
                    break;
            }
        }
    }
}

/**
 * PlayerSetting Module.
 * 玩家设置.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 */
export class PlayerSettingModuleC extends ModuleC<PlayerSettingModuleS, PlayerSettingModuleData> {
    //#region Member
    public static readonly EVENT_NAME_PLAYER_SETTING_CHANGED = "EventNamePlayerSettingChanged";

    private _eventListeners: EventListener[] = [];

    private _settingItems: Map<SettingItemType, Constructor<SettingItem<unknown>>> = new Map();

    private _transact: Transact = new Transact();
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();

        //#region Inner Member init
        // this._settingItems.set("language", LanguageTransactItem);
        this._settingItems.set("bgm-volume", BgmVolumeTransactItem);
        this._settingItems.set("sound-effect-volume", SoundEffectVolumeTransactItem);
        this._settingItems.set("mute-bgm-volume", MuteBgmVolumeTransactItem);
        this._settingItems.set("mute-sound-effect-volume", MuteSoundEffectVolumeTransactItem);
        this._settingItems.set("camera-lookUp-rate-scale", CameraLookUpRateScaleTransactItem);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        // this.set("language", this.data.language)
        this.set("bgm-volume", this.data.bgmVolume)
            .set("mute-bgm-volume", !this.data.bgmVolume)
            .set("sound-effect-volume", this.data.soundEffectVolume)
            .set("mute-sound-effect-volume", !this.data.soundEffectVolume)
            .apply(false);

        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    public initCameraLookUpRateScale() {
        this.set("camera-lookUp-rate-scale", this.data.cameraLookUpRateScale).apply(false);
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onEnterScene(sceneType: number): void {
        super.onEnterScene(sceneType);
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    private saveData() {
        this.server.net_save(
            this.data.bgmVolume,
            this.data.soundEffectVolume,
            this.data.cameraLookUpRateScale);
    }

    /**
     * 设定.
     * @param type
     * @param val
     */
    public set<T>(type: SettingItemType, val: T): this {
        const cls = this._settingItems.get(type);
        if (!cls) Log4Ts.error(PlayerSettingModuleC, `unsupported setting item.`);
        const item = new cls() as SettingItem<T>;
        this._transact.push(item);
        item.hold(val).preview();
        return this;
    }

    /**
     * 获取.
     * @param {SettingItemType} type
     * @return {T}
     */
    public get<T>(type: SettingItemType): T {
        const cls = this._settingItems.get(type);
        if (!cls) Log4Ts.error(PlayerSettingModuleC, `unsupported setting item.`);
        const item = new cls() as SettingItem<T>;
        return item.get();
    }

    /**
     * 应用.
     */
    public apply(save: boolean = true): this {
        if (save) {
            for (const item of this._transact) {
                if (!item.setValValid()) continue;
                switch ((item as SettingItem<unknown>).type) {
                    case "bgm-volume":
                        this.data.bgmVolume = item.setVal as number;
                        break;
                    case "mute-bgm-volume":
                        this.data.bgmVolume = (item.setVal as boolean) ? 0 : 1;
                        break;
                    case "sound-effect-volume":
                        this.data.soundEffectVolume = item.setVal as number;
                        break;
                    case "mute-sound-effect-volume":
                        this.data.soundEffectVolume = (item.setVal as boolean) ? 0 : 1;
                        break;
                    case "language":
                        // this.data.language = item.setVal as LanguageTypes;
                        break;
                    case "camera-lookUp-rate-scale":
                        this.data.cameraLookUpRateScale = item.setVal as number;
                        break;
                    default:
                        Log4Ts.error(PlayerSettingModuleC, `unsupported setting item when save.`);
                }
            }
        }

        this._transact.commit();
        save && this.saveData();
        return this;
    }

    /**
     * 取消.
     */
    public cancel(): this {
        this._transact.cancel();
        return this;
    }

    /**
     * 重置.
     */
    public reset(): this {
        this.cancel();
        for (const itemCls of this._settingItems.values()) {
            new itemCls().reset();
        }

        this.saveData();

        return this;
    }

    /**
     * 撤销.
     */
    public undo(): this {
        this._transact.pop().cancel();

        return this;
    }

    /**
     * 是否 存在未提交的事务项目.
     */
    public isUnCommit() {
        return this._transact.length > 0;
    }

    public applySettings(isMute: boolean, cameraLookUpRateScale: number) {
        this.set("mute-bgm-volume", isMute);
        this.set("mute-sound-effect-volume", isMute);
        this.set("camera-lookUp-rate-scale", cameraLookUpRateScale);
        this.apply();
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}

export class PlayerSettingModuleS extends ModuleS<PlayerSettingModuleC, PlayerSettingModuleData> {
    //#region Member
    private _eventListeners: EventListener[] = [];
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region MetaWorld Event
    protected onAwake(): void {
        super.onAwake();
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        //#endregion ------------------------------------------------------------------------------------------

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onUpdate(dt: number): void {
        super.onUpdate(dt);
    }

    protected onDestroy(): void {
        super.onDestroy();
        //#region Event Unsubscribe
        this._eventListeners.forEach((value) => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    protected onPlayerLeft(player: Player): void {
        super.onPlayerLeft(player);
    }

    protected onPlayerEnterGame(player: Player): void {
        super.onPlayerEnterGame(player);
    }

    protected onPlayerJoined(player: Player): void {
        super.onPlayerJoined(player);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Net Method
    public net_save(bgmVolume: number, soundEffectVolume: number, cameraLookUpRateScale: number) {
        // this.currentData.language = language;
        this.currentData.bgmVolume = bgmVolume;
        this.currentData.soundEffectVolume = soundEffectVolume;
        this.currentData.cameraLookUpRateScale = cameraLookUpRateScale;
        this.currentData.save(false);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}
