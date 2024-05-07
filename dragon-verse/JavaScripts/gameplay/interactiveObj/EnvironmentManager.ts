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
import Log4Ts from "../../depend/log4ts/Log4Ts";
import Gtk, { Singleton } from "../../util/GToolkit";

export default class EnvironmentManager extends Singleton<EnvironmentManager>() {
    public setEnvironment(sceneConfigId: number) {
        let config = GameConfig.SceneEnvironment.findElement("sceneId", sceneConfigId);
        if (config == null) return;
        this.setSkyBox(config);
        this.setFog(config);
        this.setPostProcess(config);
        this.setLighting(config);
    }
    /**
     * @description: 设置后处理
     * @param config
     * @return
     */
    public setPostProcess(config: ISceneEnvironmentElement) {
        this.setEnvironmentConfig("PostProcess: postProcessPreset", config.postProcessPreset, () => {
            if (config.postProcessPreset !== -1) {
                PostProcess.preset = config.postProcessPreset;
            }
        });

        this.setEnvironmentConfig("PostProcess: bloom", config.bloom, () => {
            PostProcess.bloom = config.bloom;
        });

        this.setEnvironmentConfig("PostProcess: saturation", config.saturation, () => {
            PostProcess.saturation = config.saturation;
        });

        this.setEnvironmentConfig("PosProcess: contrast", config.contrast, () => {
            PostProcess.contrast = config.contrast;
        });

        this.setEnvironmentConfig("PosProcess: blurEnabled", config.blurEnabled, () => {
            if (Boolean(config.blurEnabled)) {
                PostProcess.blurEnabled = Boolean(config.blurEnabled);
                this.setEnvironmentConfig("PosProcess: blurIntensity", config.blurIntensity, () => {
                    PostProcess.blurIntensity = config.blurIntensity;
                });
            } else {
                PostProcess.blurEnabled = false;
            }
        });

        this.setEnvironmentConfig("PosProcess: depthOfFieldEnabled", config.depthOfFieldEnabled, () => {
            if (Boolean(config.depthOfFieldEnabled)) {
                PostProcess.depthOfFieldEnabled = Boolean(config.depthOfFieldEnabled);
                this.setEnvironmentConfig("PosProcess: depthOfFieldIntensity", config.depthOfFieldIntensity, () => {
                    PostProcess.depthOfFieldIntensity = config.depthOfFieldIntensity;
                });
                this.setEnvironmentConfig("PosProcess: focusDistance", config.focusDistance, () => {
                    PostProcess.focusDistance = config.focusDistance;
                });
                this.setEnvironmentConfig("PosProcess: focusPosition", config.focusPosition, () => {
                    PostProcess.focusPosition = config.focusPosition;
                });
            } else {
                PostProcess.depthOfFieldEnabled = false;
            }
        });
    }
    /**
     * @description: 设置光照
     * @param config
     * @return
     */
    public setLighting(config: ISceneEnvironmentElement) {
        this.setEnvironmentConfig("Lighting: lightingYawAngle", config.lightingYawAngle, () => {
            Lighting.yawAngle = config.lightingYawAngle;
        });
        this.setEnvironmentConfig("Lighting: pitchAngle", config.pitchAngle, () => {
            Lighting.pitchAngle = config.pitchAngle;
        });
        this.setEnvironmentConfig("Lighting: lightColor", config.lightColor, () => {
            Lighting.lightColor = new LinearColor(
                config.lightColor.x,
                config.lightColor.y,
                config.lightColor.z,
                config.lightColor.w
            );
        });
        this.setEnvironmentConfig("Lighting: ev100", config.ev100, () => {
            Lighting.ev100 = config.ev100;
        });
        this.setEnvironmentConfig("Lighting: castShadowsEnabled", config.castShadowsEnabled, () => {
            Lighting.castShadowsEnabled = Boolean(config.castShadowsEnabled);
        });
        this.setEnvironmentConfig("Lighting: shadowsDistance", config.shadowsDistance, () => {
            Lighting.shadowsDistance = config.shadowsDistance;
        });
        this.setEnvironmentConfig("Lighting: temperatureEnabled", config.temperatureEnabled, () => {
            Lighting.temperatureEnabled = Boolean(config.temperatureEnabled);
        });
        this.setEnvironmentConfig("Lighting: temperature", config.temperature, () => {
            Lighting.temperature = config.temperature;
        });
        this.setEnvironmentConfig("Lighting: directionalLightIntensity", config.directionalLightIntensity, () => {
            Lighting.directionalLightIntensity = config.directionalLightIntensity;
        });
        this.setEnvironmentConfig("Lighting: directionalLightColor", config.directionalLightColor, () => {
            Lighting.directionalLightColor = new LinearColor(
                config.directionalLightColor.x,
                config.directionalLightColor.y,
                config.directionalLightColor.z,
                config.directionalLightColor.w
            );
        });
        this.setEnvironmentConfig("Lighting: skyLightColor", config.skyLightColor, () => {
            Lighting.skyLightColor = new LinearColor(
                config.skyLightColor.x,
                config.skyLightColor.y,
                config.skyLightColor.z,
                config.skyLightColor.w
            );
        });
        this.setEnvironmentConfig("Lighting: skyLightIntensity", config.skyLightIntensity, () => {
            Lighting.skyLightIntensity = config.skyLightIntensity;
        });
    }
    /**
     * @description: 设置雾效
     * @param config
     * @return
     */
    public setFog(config: ISceneEnvironmentElement) {
        this.setEnvironmentConfig("Fog: fogEnable", config.fogEnable, () => {
            if (Boolean(config.fogEnable)) {
                Fog.enabled = Boolean(config.fogEnable);
                this.setEnvironmentConfig("Fog: density", config.density, () => {
                    Fog.density = config.density;
                });
                this.setEnvironmentConfig("Fog: heightFalloff", config.heightFalloff, () => {
                    Fog.heightFalloff = config.heightFalloff;
                });
                this.setEnvironmentConfig("Fog: height", config.height, () => {
                    Fog.height = config.height;
                });
                this.setEnvironmentConfig("Fog: inscatteringColor", config.inscatteringColor, () => {
                    Fog.inscatteringColor = new LinearColor(
                        config.inscatteringColor.x,
                        config.inscatteringColor.y,
                        config.inscatteringColor.z,
                        config.inscatteringColor.w
                    );
                });
                this.setEnvironmentConfig("Fog: maxOpacity", config.maxOpacity, () => {
                    Fog.maxOpacity = config.maxOpacity;
                });
                this.setEnvironmentConfig("Fog: startDistance", config.startDistance, () => {
                    Fog.startDistance = config.startDistance;
                });
                this.setEnvironmentConfig("Fog: directionalInscatteringColor", config.directionalInscatteringColor, () => {
                    Fog.directionalInscatteringColor = new LinearColor(
                        config.directionalInscatteringColor.x,
                        config.directionalInscatteringColor.y,
                        config.directionalInscatteringColor.z,
                        config.directionalInscatteringColor.w
                    );
                });
                this.setEnvironmentConfig("Fog: directionalInscatteringExponent", config.directionalInscatteringExponent, () => {
                    Fog.directionalInscatteringExponent = config.directionalInscatteringExponent;
                });
                this.setEnvironmentConfig("Fog: directionalInscatteringStartDistance", config.directionalInscatteringStartDistance, () => {
                    Fog.directionalInscatteringStartDistance = config.directionalInscatteringStartDistance;
                });
                this.setEnvironmentConfig("Fog: fogPreset", config.fogPreset, () => {
                    Fog.setPreset(config.fogPreset);
                });
            } else {
                Fog.enabled = false;
            }
        });
    }
    public setSkyBox(config: ISceneEnvironmentElement) {
        this.setEnvironmentConfig("SkyBox: skyBoxPreset", config.skyBoxPreset, () => {
            Skybox.preset = config.skyBoxPreset;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeBaseColor", config.skyDomeBaseColor, () => {
            Skybox.skyDomeBaseColor = new LinearColor(
                config.skyDomeBaseColor.x,
                config.skyDomeBaseColor.y,
                config.skyDomeBaseColor.z,
                config.skyDomeBaseColor.w
            );
        });

        this.setEnvironmentConfig("SkyBox: skyDomeGradientEnabled", config.skyDomeGradientEnabled, () => {
            Skybox.skyDomeGradientEnabled = Boolean(config.skyDomeGradientEnabled);
        });

        this.setEnvironmentConfig("SkyBox: skyDomeBottomColor", config.skyDomeBottomColor, () => {
            Skybox.skyDomeBottomColor = new LinearColor(
                config.skyDomeBottomColor.x,
                config.skyDomeBottomColor.y,
                config.skyDomeBottomColor.z,
                config.skyDomeBottomColor.w
            );
        });
        this.setEnvironmentConfig("SkyBox: SkyDomeHorizontalFallOff", config.SkyDomeHorizontalFallOff, () => {
            Skybox.skyDomeHorizontalFallOff = config.SkyDomeHorizontalFallOff;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeIntensity", config.skyDomeIntensity, () => {
            Skybox.skyDomeIntensity = config.skyDomeIntensity;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeMiddleColor", config.skyDomeMiddleColor, () => {
            Skybox.skyDomeMiddleColor = new LinearColor(
                config.skyDomeMiddleColor.x,
                config.skyDomeMiddleColor.y,
                config.skyDomeMiddleColor.z,
                config.skyDomeMiddleColor.w
            );
        });
        this.setEnvironmentConfig("SkyBox: skyDomeTextureID", config.skyDomeTextureID, () => {
            Skybox.skyDomeTextureID = config.skyDomeTextureID;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeTopColor", config.skyDomeTopColor, () => {
            Skybox.skyDomeTopColor = new LinearColor(
                config.skyDomeTopColor.x,
                config.skyDomeTopColor.y,
                config.skyDomeTopColor.z,
                config.skyDomeTopColor.w
            );
        });
        this.setEnvironmentConfig("SkyBox: skyBoxYawAngle", config.skyBoxYawAngle, () => {
            Skybox.yawAngle = config.skyBoxYawAngle;
        });

        this.setEnvironmentConfig("SkyBox: starVisible", config.starVisible, () => {
            if (Boolean(config.starVisible)) {
                Skybox.starVisible = Boolean(config.starVisible);
                this.setEnvironmentConfig("SkyBox: starIntensity", config.starIntensity, () => {
                    Skybox.starIntensity = config.starIntensity;
                });
                this.setEnvironmentConfig("SkyBox: starTextureID", config.starTextureID, () => {
                    Skybox.starTextureID = config.starTextureID;
                });
                this.setEnvironmentConfig("SkyBox: starDensity", config.starDensity, () => {
                    Skybox.starDensity = config.starDensity;
                });
            } else {
                Skybox.starVisible = false;
            }
        });

        this.setEnvironmentConfig("SkyBox: sunVisible", config.sunVisible, () => {
            if (Boolean(config.sunVisible)) {
                Skybox.sunVisible = Boolean(config.sunVisible);
                this.setEnvironmentConfig("SkyBox: sunColor", config.sunColor, () => {
                    Skybox.sunColor = new LinearColor(
                        config.sunColor.x,
                        config.sunColor.y,
                        config.sunColor.z,
                        config.sunColor.w
                    );
                });
                this.setEnvironmentConfig("SkyBox: sunSize", config.sunSize, () => {
                    Skybox.sunSize = config.sunSize;
                });
                this.setEnvironmentConfig("SkyBox: sunIntensity", config.sunIntensity, () => {
                    Skybox.sunIntensity = config.sunIntensity;
                });
                this.setEnvironmentConfig("SkyBox: sunTextureID", config.sunTextureID, () => {
                    Skybox.sunTextureID = config.sunTextureID;
                });
            } else {
                Skybox.sunVisible = false;
            }
        });

        this.setEnvironmentConfig("SkyBox: moonVisible", config.moonVisible, () => {
            if (Boolean(config.moonVisible)) {
                Skybox.moonVisible = Boolean(config.moonVisible);
                this.setEnvironmentConfig("SkyBox: moonColor", config.moonColor, () => {
                    Skybox.moonColor = new LinearColor(
                        config.moonColor.x,
                        config.moonColor.y,
                        config.moonColor.z,
                        config.moonColor.w
                    );
                });
                this.setEnvironmentConfig("SkyBox: moonIntensity", config.moonIntensity, () => {
                    Skybox.moonIntensity = config.moonIntensity;
                });
                this.setEnvironmentConfig("SkyBox: moonSize", config.moonSize, () => {
                    Skybox.moonSize = config.moonSize;
                });
                this.setEnvironmentConfig("SkyBox: moonTextureID", config.moonTextureID, () => {
                    Skybox.moonTextureID = config.moonTextureID;
                });
            } else {
                Skybox.moonVisible = false;
            }
        });

        this.setEnvironmentConfig("SkyBox: cloudVisible", config.cloudVisible, () => {
            if (Boolean(config.cloudVisible)) {
                Skybox.cloudVisible = Boolean(config.cloudVisible);
                this.setEnvironmentConfig("SkyBox: cloudColor", config.cloudColor, () => {
                    Skybox.cloudColor = new LinearColor(
                        config.cloudColor.x,
                        config.cloudColor.y,
                        config.cloudColor.z,
                        config.cloudColor.w
                    );
                });
                this.setEnvironmentConfig("SkyBox: cloudSpeed", config.cloudSpeed, () => {
                    Skybox.cloudSpeed = config.cloudSpeed;
                });
                this.setEnvironmentConfig("SkyBox: cloudOpacity", config.cloudOpacity, () => {
                    Skybox.cloudOpacity = config.cloudOpacity;
                });
                this.setEnvironmentConfig("SkyBox: cloudTextureID", config.cloudTextureID, () => {
                    Skybox.cloudTextureID = config.cloudTextureID;
                });
                this.setEnvironmentConfig("SkyBox: cloudDensity", config.cloudDensity, () => {
                    Skybox.cloudDensity = config.cloudDensity;
                });
            } else {
                Skybox.cloudVisible = false;
            }
        });
    }

    private checkEnvironmentConfig(configName: string, config: any): boolean {
        if (Gtk.isNullOrUndefined(config)) {
            Log4Ts.log(EnvironmentManager, `${configName} is null!`);
            return false;
        }
        return true;
    }

    private setEnvironmentConfig(configName: string, config: any, setMethod: () => void) {
        if (this.checkEnvironmentConfig(configName, config)) {
            setMethod();
        }
    }
}
