/**
 * @Author       : zewei.zhang
 * @Date         : 2024-04-30 09:20:47
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-04-30 09:20:49
 * @FilePath     : \DragonVerse\dragon-verse\JavaScripts\gameplay\interactiveObj\SkyBoxManager.ts
 * @Description  : 环境管理
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
        this.setLinearColorConfig("Lighting: lightColor", config.lightColor, (color) => {
            Lighting.lightColor = color;
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
        this.setLinearColorConfig("Lighting: directionalLightColor", config.directionalLightColor, (color) => {
            Lighting.directionalLightColor = color;
        });
        this.setLinearColorConfig("Lighting: skyLightColor", config.skyLightColor, (color) => {
            Lighting.skyLightColor = color;
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
                //预设得先设置，不然会覆盖后面的设置
                this.setEnvironmentConfig("Fog: fogPreset", config.fogPreset, () => {
                    Fog.setPreset(config.fogPreset);
                });
                this.setEnvironmentConfig("Fog: density", config.density, () => {
                    Fog.density = config.density;
                });
                this.setEnvironmentConfig("Fog: heightFalloff", config.heightFalloff, () => {
                    Fog.heightFalloff = config.heightFalloff;
                });
                this.setEnvironmentConfig("Fog: height", config.height, () => {
                    Fog.height = config.height;
                });
                this.setLinearColorConfig("Fog: inscatteringColor", config.inscatteringColor, (color) => {
                    Fog.inscatteringColor = color;
                });
                this.setEnvironmentConfig("Fog: maxOpacity", config.maxOpacity, () => {
                    Fog.maxOpacity = config.maxOpacity;
                });
                this.setEnvironmentConfig("Fog: startDistance", config.startDistance, () => {
                    Fog.startDistance = config.startDistance;
                });
                this.setLinearColorConfig("Fog: directionalInscatteringColor", config.directionalInscatteringColor, (color) => {
                    Fog.directionalInscatteringColor = color;
                });
                this.setEnvironmentConfig("Fog: directionalInscatteringExponent", config.directionalInscatteringExponent, () => {
                    Fog.directionalInscatteringExponent = config.directionalInscatteringExponent;
                });
                this.setEnvironmentConfig("Fog: directionalInscatteringStartDistance", config.directionalInscatteringStartDistance, () => {
                    Fog.directionalInscatteringStartDistance = config.directionalInscatteringStartDistance;
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
        this.setLinearColorConfig("SkyBox: skyDomeBaseColor", config.skyDomeBaseColor, (color) => {
            Skybox.skyDomeBaseColor = color;
        });

        this.setEnvironmentConfig("SkyBox: skyDomeGradientEnabled", config.skyDomeGradientEnabled, () => {
            Skybox.skyDomeGradientEnabled = Boolean(config.skyDomeGradientEnabled);
        });

        this.setLinearColorConfig("SkyBox: skyDomeBottomColor", config.skyDomeBottomColor, (color) => {
            Skybox.skyDomeBottomColor = color;
        });
        this.setEnvironmentConfig("SkyBox: SkyDomeHorizontalFallOff", config.SkyDomeHorizontalFallOff, () => {
            Skybox.skyDomeHorizontalFallOff = config.SkyDomeHorizontalFallOff;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeIntensity", config.skyDomeIntensity, () => {
            Skybox.skyDomeIntensity = config.skyDomeIntensity;
        });
        this.setLinearColorConfig("SkyBox: skyDomeMiddleColor", config.skyDomeMiddleColor, (color) => {
            Skybox.skyDomeMiddleColor = color;
        });
        this.setEnvironmentConfig("SkyBox: skyDomeTextureID", config.skyDomeTextureID, () => {
            Skybox.skyDomeTextureID = config.skyDomeTextureID;
        });
        this.setLinearColorConfig("SkyBox: skyDomeTopColor", config.skyDomeTopColor, (color) => {
            Skybox.skyDomeTopColor = color;
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
                this.setLinearColorConfig("SkyBox: sunColor", config.sunColor, (color) => {
                    Skybox.sunColor = color;
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
                this.setLinearColorConfig("SkyBox: moonColor", config.moonColor, (color) => {
                    Skybox.moonColor = color;
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
                this.setLinearColorConfig("SkyBox: cloudColor", config.cloudColor, (color) => {
                    Skybox.cloudColor = color;
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

    private setLinearColorConfig(configName: string, config: string, setMethod: (color: LinearColor) => void) {
        this.setEnvironmentConfig(configName, config, () => {
            let color = Gtk.catchMwExportColor(config);
            if (color) {
                setMethod(color);
            } else {
                Log4Ts.log(EnvironmentManager, `${configName} is not a valid color!`);
            }
        });
    }

    private setEnvironmentConfig(configName: string, config: any, setMethod: () => void) {
        if (this.checkEnvironmentConfig(configName, config)) {
            setMethod();
        }
    }
}
