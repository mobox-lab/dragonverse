/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-11 15:42:26
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-15 11:07:42
 * @FilePath: \DragonVerse\JavaScripts\gameplay\interactive\IceBlock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-11 15:42:26
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-11 16:51:33
 * @FilePath: \DragonVerse\JavaScripts\gameplay\interactive\IceBlock.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AEce
 */

import { IIceBlockElement } from "../../config/IceBlock";
import { EventDefine } from "../../const/EventDefine";
import { RoleModuleC } from "../../module/role/RoleModule";
import { arrayToRot, arrayToVec } from "../../util/CommonUtil";
import GToolkit from "../../util/GToolkit";
import MovementController from "./MovementController";

const IceGuid: string = "88BDBCEE422124B5D71B199F040FC9F5";
const IceBombGuid: string = "89089";
/**
 * 冰块
 */
export class IceBlock {


    private _config: IIceBlockElement;

    private _iceObj: mw.GameObject;

    private _iceBombParticle: mw.Effect;

    private _trigger: mw.Trigger;

    constructor(config: IIceBlockElement) {
        this._config = config;
        this.initIceBlock();
    }


    private initIceBlock() {
        //设置冰块
        GameObjPool.asyncSpawn(IceGuid).then(val => {
            this._iceObj = val;
            this._iceObj.worldTransform.position = arrayToVec(this._config.iceLoc);
            this._iceObj.worldTransform.rotation = arrayToRot(this._config.iceRot);
            this._iceObj.worldTransform.scale = arrayToVec(this._config.iceScale);

        });

        //设置trigger
        GameObjPool.asyncSpawn("Trigger").then(val => {
            this._trigger = val as mw.Trigger;
            this._trigger.worldTransform.position = arrayToVec(this._config.iceLoc);
            this._trigger.worldTransform.rotation = arrayToRot(this._config.triggerRot);
            this._trigger.worldTransform.scale = arrayToVec(this._config.triggerScale);
            this._trigger.onEnter.add(this.onEnter);
        });

        AssetUtil.asyncDownloadAsset(IceBombGuid);
    }

    private onEnter = (obj: mw.GameObject) => {
        if (obj instanceof mw.Character) {
            if (obj === Player.localPlayer.character) {
                if (obj.velocity.z <= -this._config.triggerSpeedZ) {
                    ModuleService.getModule(RoleModuleC).controller.addImpulse(obj, new mw.Vector(0, 0, this._config.impulse));
                    //GToolkit.getFirstScript<MovementController>(obj, MovementController).addImpulse(obj, new mw.Vector(0, 0, this._config.impulse));
                    GameObjPool.despawn(this._iceObj);
                    this._trigger.onEnter.clear();
                    GameObjPool.despawn(this._trigger);
                    this.creatIceBombParticle();
                    Event.dispatchToLocal(EventDefine.PlayerEnterIceTrigger, this._config.id);
                }

            }
        }

    }


    private creatIceBombParticle() {
        GameObjPool.asyncSpawn(IceBombGuid).then(val => {
            this._iceBombParticle = val as mw.Effect;
            this._iceBombParticle.worldTransform.scale = arrayToVec(this._config.effectScale);
            this._iceBombParticle.worldTransform.position = arrayToVec(this._config.iceLoc);
            this._iceBombParticle.play(() => {
                GameObjPool.despawn(this._iceBombParticle);
            });
        })
    }


}