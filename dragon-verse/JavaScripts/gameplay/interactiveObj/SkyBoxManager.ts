/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-30 09:20:47
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-30 09:20:49
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\SkyBoxManager.ts
 * @Description  : 天空盒管理
 */

import { GameConfig } from "../../config/GameConfig";
import { ISceneEnvironmentElement } from "../../config/SceneEnvironment";
import { Singleton } from "../../util/GToolkit";

export default class EnvironmentManager extends Singleton<EnvironmentManager>() {
    public setEnvironment(sceneConfigId: number) {
        let config = GameConfig.SceneEnvironment.findElement("sceneId", sceneConfigId);
        if (config == null) return;
        this.setSkyBox(config);
        this.setFog(config);
        this.setPostProcess(config);
        this.setLighting(config);
    }
    public setPostProcess(config: ISceneEnvironmentElement) {
        if (config.postProcessPreset !== -1) {
            PostProcess.preset = config.postProcessPreset;
        }
        PostProcess.bloom = config.bloom;
        PostProcess.saturation = config.saturation;
        PostProcess.contrast = config.contrast;
        if (Boolean(config.blurEnabled)) {
            PostProcess.blurEnabled = Boolean(config.blurEnabled);
            PostProcess.blurIntensity = config.blurIntensity;
        } else {
            PostProcess.blurEnabled = false;
        }

        if (Boolean(config.depthOfFieldEnabled)) {
            PostProcess.depthOfFieldEnabled = Boolean(config.depthOfFieldEnabled);
            PostProcess.depthOfFieldIntensity = config.depthOfFieldIntensity;
            PostProcess.focusDistance = config.focusDistance;
            PostProcess.focusPosition = config.focusPosition;
        } else {
            PostProcess.depthOfFieldEnabled = false;
        }
    }
    public setLighting(config: ISceneEnvironmentElement) {
        Lighting.yawAngle = config.lightingYawAngle;
        Lighting.pitchAngle = config.pitchAngle;
        Lighting.lightColor = new LinearColor(
            config.lightColor[0],
            config.lightColor[1],
            config.lightColor[2],
            config.lightColor[3]
        );
        Lighting.ev100 = config.ev100;
        Lighting.castShadowsEnabled = Boolean(config.castShadowsEnabled);
        Lighting.shadowsDistance = config.shadowsDistance;
        Lighting.temperatureEnabled = Boolean(config.temperatureEnabled);
        Lighting.temperature = config.temperature;
        Lighting.directionalLightIntensity = config.directionalLightIntensity;
        Lighting.directionalLightColor = new LinearColor(
            config.directionalLightColor[0],
            config.directionalLightColor[1],
            config.directionalLightColor[2],
            config.directionalLightColor[3]
        );
        Lighting.skyLightColor = new LinearColor(
            config.skyLightColor[0],
            config.skyLightColor[1],
            config.skyLightColor[2],
            config.skyLightColor[3]
        );
        Lighting.skyLightIntensity = config.skyLightIntensity;
    }
    public setFog(config: ISceneEnvironmentElement) {
        if (Boolean(config.fogEnable)) {
            Fog.enabled = Boolean(config.fogEnable);
            Fog.density = config.density;
            Fog.heightFalloff = config.heightFalloff;
            Fog.height = config.height;
            Fog.inscatteringColor = new LinearColor(
                config.inscatteringColor[0],
                config.inscatteringColor[1],
                config.inscatteringColor[2],
                config.inscatteringColor[3]
            );
            Fog.maxOpacity = config.maxOpacity;
            Fog.startDistance = config.startDistance;
            Fog.directionalInscatteringColor = new LinearColor(
                config.directionalInscatteringColor[0],
                config.directionalInscatteringColor[1],
                config.directionalInscatteringColor[2],
                config.directionalInscatteringColor[3]
            );
            Fog.directionalInscatteringExponent = config.directionalInscatteringExponent;
            Fog.directionalInscatteringStartDistance = config.directionalInscatteringStartDistance;
            Fog.setPreset(config.fogPreset);
        } else {
            Fog.enabled = false;
        }
    }
    public setSkyBox(config: ISceneEnvironmentElement) {
        Skybox.preset = config.skyBoxPreset;
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
        Skybox.yawAngle = config.skyBoxYawAngle;
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
