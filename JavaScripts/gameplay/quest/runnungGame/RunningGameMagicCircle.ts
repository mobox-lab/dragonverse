/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-15 15:57:26
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-15 16:07:05
 * @FilePath: \DragonVerse\JavaScripts\gameplay\quest\runnungGame\RunningGameMagicCircle.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */


/**
 * 跑酷游戏解锁魔法阵
 */
export class RunningGameMagicCircle {

    private _trigger:mw.Trigger;

    private _type:number;

    constructor(guid:string,type:number){
        this._type=type;
        this._trigger=mw.GameObject.findGameObjectById(guid) as mw.Trigger;

        this._trigger.onEnter.add(this.onTriggerEnter);
        this._trigger.onLeave.add(this.onTriggerLeave);

    }


    private onTriggerEnter=(obj:mw.GameObject)=>{

    }

    private onTriggerLeave=(obj:mw.GameObject)=>{

    }


}