/*
 * @Author: yukun.gao yukun.gao@appshahe.com
 * @Date: 2022-08-14 16:22:31
 * @LastEditors: 陈佩文 peiwen.chen@appshahe.com
 * @LastEditTime: 2022-10-19 19:01:31
 * @FilePath: \JavaScripts\module\bullet\Rep_Bullet.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
* @Author       : MengYao.Zhao
* @Date         : 2022/07/01 11:41:33
* @Description  : 属性同步脚本，同步服务器计算的命中信息
*/


import { oTrace } from "odin";
import { BulletEvents } from "./BulletDefine";


@Component
export default class Rep_Bullet extends mw.Script {

    //子弹伤害命中情况
    @mw.Property({ replicated: true, onChanged: "onDamageInfoChanged" })
    public damageInfo: string = "";

    @mw.Property({ replicated: true, onChanged: "onDestroyInfoChanged" })
    public onDestroyInfo: string = "";


    onStart() {
        //oTrace("Rep_Bullet onStart");
    }

    onDestroy() {
        //  oTrace("Rep_Bullet onDestroy");
    }

    /**
     * 当客户端收到子弹伤害命中情况时
     */
    protected onDamageInfoChanged() {
        //oTrace("收到子弹伤害信息")
        if (this.damageInfo == "")
            return;
        // try { 
        Event.dispatchToLocal(BulletEvents.ClientReplicatedResult, JSON.parse(this.damageInfo));

        // } catch (error) {

        // }
    }

    /**
     * 客户端收到子弹会销毁
     */
    protected onDestroyInfoChanged() {

        if (this.onDestroyInfo == "") {
            return;
        }

        let info = JSON.parse(this.onDestroyInfo);

        Event.dispatchToLocal(BulletEvents.ClientReplicatedDestroy, info);

    }

}