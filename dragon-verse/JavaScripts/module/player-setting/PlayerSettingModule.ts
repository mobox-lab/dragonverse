import ModuleC = mwext.ModuleC;
import ModuleS = mwext.ModuleS;
import Subdata = mwext.Subdata;
import i18n, { LanguageTypes } from "../../language/i18n";
import AudioController from "../../controller/audio/AudioController";
import { ATransactItem, Transact } from "./ATransactItem";
import { Constructor } from "../../util/GToolkit";
import Log4Ts from "../../depend/log4ts/Log4Ts";

type SettingItemType =
    "bgm-volume"
    | "sound-effect-volume"
    | "language"
    | "mute-sound-effect-volume"
    | "mute-bgm-volume"

abstract class SettingItem<T> extends ATransactItem<T> {
    public readonly abstract type: SettingItemType;

    public abstract reset(): this;
}

class LanguageTransactItem extends SettingItem<LanguageTypes> {
    public type: SettingItemType = "language";
    public readonly previewEnable: boolean = false;

    protected set(val: LanguageTypes): void {
        i18n.use(val);
    }

    public get(): LanguageTypes {
        return i18n.currentLanguage();
    }

    public reset(): this {
        this.set(0);
        return this;
    }
}

class BgmVolumeTransactItem extends SettingItem<number> {
    public type: SettingItemType = "bgm-volume";
    public readonly previewEnable: boolean = true;

    protected set(val: number): void {
        AudioController.getInstance().bgmVolumeScale = val;
    }

    public get(): number {
        return AudioController.getInstance().bgmVolumeScale;
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
        AudioController.getInstance().volumeScale = val;
    }

    public get(): number {
        return AudioController.getInstance().volumeScale;
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
        AudioController.getInstance().muteBgm(val);
    }

    public get(): boolean {
        return AudioController.getInstance().isPlayBgm;
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
        AudioController.getInstance().muteSoundEffect(val);
    }

    public get(): boolean {
        return AudioController.getInstance().isPlayEffect;
    }

    public reset(): this {
        this.set(false);
        return this;
    }
}

export default class PlayerSettingModuleData extends Subdata {
    //@Decorator.persistence()
    //public isSave: bool;

    @Decorator.persistence()
    language: LanguageTypes = LanguageTypes.Chinese;

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


    protected initDefaultData(): void {
        this.language = LanguageTypes.Chinese;
        this.bgmVolume = 1;
        this.soundEffectVolume = 1;
    }

    protected onDataInit(): void {

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
        this._settingItems.set("language", LanguageTransactItem);
        this._settingItems.set("bgm-volume", BgmVolumeTransactItem);
        this._settingItems.set("sound-effect-volume", SoundEffectVolumeTransactItem);
        this._settingItems.set("mute-bgm-volume", MuteBgmVolumeTransactItem);
        this._settingItems.set("mute-sound-effect-volume", MuteSoundEffectVolumeTransactItem);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
    }

    protected onStart(): void {
        super.onStart();

        //#region Member init
        this.set("language", this.data.language)
            .set("bgm-volume", this.data.bgmVolume)
            .set("sound-effect-volume", this.data.soundEffectVolume)
            .apply(false);

        Event.dispatchToLocal(PlayerSettingModuleC.EVENT_NAME_PLAYER_SETTING_CHANGED);
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

        //#region Event Subscribe
        // this._eventListeners.push(Event.addLocalListener(EventDefine.EVENT_NAME, CALLBACK));
        //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
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
        this._eventListeners.forEach(value => value.disconnect());
        //#endregion ------------------------------------------------------------------------------------------
    }

    protected onExecute(type: number, ...params: any[]): void {
        super.onExecute(type, ...params);
    }

    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄

    //#region Method
    private saveData() {
        this.server.net_save(
            this.data.language,
            this.data.bgmVolume,
            this.data.soundEffectVolume);
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
                    case "mute-bgm-volume":
                        this.data.bgmVolume = item.setVal as number;
                        break;
                    case "sound-effect-volume":
                    case "mute-sound-effect-volume":
                        this.data.soundEffectVolume = item.setVal as number;
                        break;
                    case "language":
                        this.data.language = item.setVal as LanguageTypes;
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

    public setMute(val: boolean) {
        this.set("mute-bgm-volume", val);
        this.set("mute-sound-effect-volume", val);
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
        this._eventListeners.forEach(value => value.disconnect());
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
    public net_save(
        language: LanguageTypes,
        bgmVolume: number,
        soundEffectVolume: number,
    ) {
        this.currentData.language = language;
        this.currentData.bgmVolume = bgmVolume;
        this.currentData.soundEffectVolume = soundEffectVolume;

        this.currentData.save(false);
    }
    //#endregion ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
}