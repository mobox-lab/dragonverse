/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-30 09:20:47
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-30 09:20:49
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\SkyBoxManager.ts
 * @Description  : 天空盒管理
 */

import { GameConfig } from "../../config/GameConfig";

export default class SkyBoxManager {
    private constructor() {}

    private static instance: SkyBoxManager;

    public static getInstance() {
        if (!this.instance) {
            this.instance = new SkyBoxManager();
        }
        return this.instance;
    }

    public setSkyBox(sceneConfigId: number) {
        let config = GameConfig.Scene.getElement(sceneConfigId);
        if (config == null) return;
        Skybox.skyDomeBaseColor = new LinearColor(
            config.skyDomeBaseColor[0],
            config.skyDomeBaseColor[1],
            config.skyDomeBaseColor[2],
            config.skyDomeBaseColor[3]
        );
        Skybox.skyDomeGradientEnabled = Boolean(config.skyDomeGradientEnabled);
        Skybox.skyDomeBottomColor = new LinearColor(
            config.skyDomeBottomColor[0],
            config.skyDomeBottomColor[1],
            config.skyDomeBottomColor[2],
            config.skyDomeBottomColor[3]
        );
        Skybox.skyDomeHorizontalFallOff = config.SkyDomeHorizontalFallOff;
        Skybox.skyDomeIntensity = config.skyDomeIntensity;
        Skybox.skyDomeMiddleColor = new LinearColor(
            config.skyDomeMiddleColor[0],
            config.skyDomeMiddleColor[1],
            config.skyDomeMiddleColor[2],
            config.skyDomeMiddleColor[3]
        );
        Skybox.skyDomeTextureID = config.skyDomeTextureID;
        Skybox.skyDomeTopColor = new LinearColor(
            config.skyDomeTopColor[0],
            config.skyDomeTopColor[1],
            config.skyDomeTopColor[2],
            config.skyDomeTopColor[3]
        );
        Skybox.yawAngle = config.yawAngle;
        if (Boolean(config.starVisible)) {
            Skybox.starVisible = Boolean(config.starVisible);
            Skybox.starIntensity = config.starIntensity;
            Skybox.starTextureID = config.starTextureID;
            Skybox.starDensity = config.starDensity;
        } else {
            Skybox.starVisible = false;
        }

        if (Boolean(config.sunVisible)) {
            Skybox.sunVisible = Boolean(config.sunVisible);
            Skybox.sunColor = new LinearColor(
                config.sunColor[0],
                config.sunColor[1],
                config.sunColor[2],
                config.sunColor[3]
            );
            Skybox.sunSize = config.sunSize;
            Skybox.sunIntensity = config.sunIntensity;
            Skybox.sunTextureID = config.sunTextureID;
        } else {
            Skybox.sunVisible = false;
        }

        if (Boolean(config.moonVisible)) {
            Skybox.moonVisible = Boolean(config.moonVisible);
            Skybox.moonColor = new LinearColor(
                config.moonColor[0],
                config.moonColor[1],
                config.moonColor[2],
                config.moonColor[3]
            );
            Skybox.moonIntensity = config.moonIntensity;
            Skybox.moonSize = config.moonSize;
            Skybox.moonTextureID = config.moonTextureID;
        }

        if (Boolean(config.cloudVisible)) {
            Skybox.cloudVisible = Boolean(config.cloudVisible);
            Skybox.cloudColor = new LinearColor(
                config.cloudColor[0],
                config.cloudColor[1],
                config.cloudColor[2],
                config.cloudColor[3]
            );
            Skybox.cloudSpeed = config.cloudSpeed;
            Skybox.cloudOpacity = config.cloudOpacity;
            Skybox.cloudTextureID = config.cloudTextureID;
            Skybox.cloudDensity = config.cloudDensity;
        } else {
            Skybox.cloudVisible = false;
        }
    }
}
