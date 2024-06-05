import Log4Ts from "../../depend/log4ts/Log4Ts";

/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-02-26 19:13:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-06-05 10:52:14
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\module\SettingModule\SettingModuleData.ts
 * @Description  : 持久化设置
*/
export class SettingOptions {
    @Property()
    public bgmVolume: number = 1;
    @Property()
    public soundEffectVolume: number = 1;
    @Property()
    public cameraLookUpRateScale: number = 0.5;
    @Property()
    public saturation: number = 1;
    @Property()
    public enableShadow: boolean = true;
    @Property()
    public fovScale: number = 800;
    @Property()
    public enableSearch: boolean = true;

    constructor(bgmVolume: number, soundEffectVolume: number, cameraLookUpRateScale: number, saturation: number, enableShadow: boolean, fovScale: number, enableSearch: boolean) {
        this.bgmVolume = bgmVolume;
        this.soundEffectVolume = soundEffectVolume;
        this.cameraLookUpRateScale = cameraLookUpRateScale;
        this.saturation = saturation;
        this.enableShadow = enableShadow;
        this.fovScale = fovScale;
        this.enableSearch = enableSearch;
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

    // /**
    //  * 图像质量
    //  */
    // @Decorator.persistence()
    // graphicsQuality: number;

    // /**
    //  * 裁剪距离
    //  */
    // @Decorator.persistence()
    // clipDistance: number;

    /**
     * 饱和度
     */
    @Decorator.persistence()
    saturation: number;

    /**
     * 是否开启阴影
     */
    @Decorator.persistence()
    enableShadow: boolean;

    /**
     * 视野缩放距离
     */
    @Decorator.persistence()
    fovScale: number;

    /**
     * 是否开启索敌
     */
    @Decorator.persistence()
    enableSearch: boolean;

    protected initDefaultData(): void {
        // this.language = LanguageTypes.Chinese;
        this.bgmVolume = 1;
        this.soundEffectVolume = 1;
        this.cameraLookUpRateScale = 0.5;
        this.saturation = 1;
        this.enableShadow = true;
        this.fovScale = 0.3;
        this.enableSearch = true;
        this.currentVersion = 2;
    }
    protected get version(): number {
        return 2
    }

    protected onDataInit(): void {
        while (this.version != this.currentVersion) {
            switch (this.currentVersion) {
                case 1:
                    // 假如数据版本还是1，那么就需要进行升级
                    this.currentVersion = 2

                    // 在升级的地方对新字段进行初始化
                    this.cameraLookUpRateScale = 0.5
                    this.saturation = 1;
                    this.enableShadow = true;
                    this.fovScale = 0.3;
                    this.enableSearch = true;
                    break;

                default:
                    Log4Ts.error(PlayerSettingModuleData, `unsupported data version.`);
                    break;
            }
        }
    }
}