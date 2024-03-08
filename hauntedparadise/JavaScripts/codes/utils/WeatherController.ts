/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-03-05 10:53:40
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-03-05 10:59:49
 * @FilePath     : \hauntedparadise\JavaScripts\codes\utils\WeatherController.ts
 * @Description  : 
 */
import { GameConfig } from "../../config/GameConfig";
import { ColorUtils } from "./Color";

export class WeatherCtrl {
    /**
     * 根据天空ID设置天空
     * @param weatherId 
     */
    static async setWeather(cfgId: number) {
        let cfg = GameConfig.HomeWeather.getElement(cfgId);
        if (cfg) {
            Skybox.preset = cfg.skyBoxPre;//天空球预设
            console.log("设置了当前的天气" + cfgId);
            Lighting.brightness = cfg.skyLight
            Lighting.lightColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyColor);//光颜色
            Lighting.ev100 = cfg.ev100
            Lighting.yawAngle = cfg.orientation

            let pitchAngle = cfg.pitchAngle;
            if (pitchAngle > 90) {
                pitchAngle = pitchAngle % 360 - 180;
            }
            if (pitchAngle < -90) {
                pitchAngle = pitchAngle % 360 + 180;
            }
            if (pitchAngle > 0) {
                pitchAngle = -pitchAngle;
            }
            Lighting.pitchAngle = pitchAngle;   //俯仰角度
            Lighting.temperature = cfg.dirTem

            //
            Skybox.skyDomeGradientEnabled = cfg.isGradual;//是否开启渐变效果
            Skybox.starVisible = cfg.isOpenStar;//是否开启星星
            Skybox.moonVisible = cfg.isOpenMoon;//是否开启月亮

            Skybox.skyDomeIntensity = cfg.skyBoxLight
            //console.error("天空球亮度 : " + Skybox.skyDomeIntensity);

            Skybox.skyDomeBaseColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyBoxColor);//天空球颜色

            Skybox.skyDomeTopColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyTopColor)
            Skybox.skyDomeMiddleColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyUpColor)
            Skybox.skyDomeBottomColor = ColorUtils.colorHexToLinearColor("#" + cfg.skyDownColor)
            Skybox.sunVisible = cfg.isOpenSun;
            if (cfg.isOpenSun) {
                if (cfg.sunColor) {
                    Skybox.sunColor = ColorUtils.colorHexToLinearColor("#" + cfg.sunColor)
                }
                if (cfg.sunSize) {
                    Skybox.sunSize = cfg.sunSize
                    //console.error("太阳大小 : " + Skybox.sunSize);
                }
            }
            Skybox.cloudVisible = cfg.isOpenCloud;
            Skybox.cloudColor = ColorUtils.colorHexToLinearColor("#" + cfg.cloudColor)
            Skybox.cloudOpacity = cfg.cloudOpacity
            if (cfg.isOpenMoon) {
                Skybox.moonColor = ColorUtils.colorHexToLinearColor("#" + cfg.moonColor)
                Skybox.moonIntensity = cfg.moonLight
                if (!AssetUtil.assetLoaded(cfg.moonGuid)) {
                    await AssetUtil.asyncDownloadAsset(cfg.moonGuid);
                }
                if (cfg.moonSize) {
                    Skybox.moonSize = cfg.moonSize;
                }
                Skybox.moonTextureID = cfg.moonGuid;//月亮贴图
            }


            Fog.setPreset(cfg.fogPreset);//雾效预设
            Fog.inscatteringColor = ColorUtils.colorHexToLinearColor("#" + cfg.fogInscatteringColor)
            // console.error("雾散射颜色 : " + ColorUtils.linearColorToHexColor(Fog.fogInscatteringColor));
            Fog.density = cfg.fogDensity
            // console.error("雾密度 : " + Fog.fogDensity);
            Fog.height = cfg.fogHeight
            //console.error("雾高度 : " + Fog.fogHeight);
            Fog.maxOpacity = cfg.fogMaxOpacity
            //console.error("雾最大透明度 : " + Fog.fogMaxOpacity);
            Fog.startDistance = cfg.startDistance
            //console.error("雾开始距离 : " + Fog.startDistance);
            Fog.directionalInscatteringExponent = cfg.dirExponent
            //console.error("雾方向散射指数 : " + Fog.directionalInscatteringExponent);
            Fog.directionalInscatteringStartDistance = cfg.direStartDistance
            //console.error("雾方向散射开始距离 : " + Fog.directionalInscatteringStartDistance);
            Fog.directionalInscatteringColor = ColorUtils.colorHexToLinearColor("#" + cfg.dirScatteringColor)
            //console.error("雾方向散射颜色 : " + ColorUtils.linearColorToHexColor(Fog.directionalInscatteringColor));
        }
    }
}