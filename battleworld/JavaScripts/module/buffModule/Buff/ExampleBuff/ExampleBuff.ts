/** 
* @Author       : MengYao.Zhao
* @Date         : 2022/04/18 11:55:31
* @Description  : 客户端 buff示例模块 一个示例buff，继承于BuffC,没有必要可以直接使用BuffC
*/

/**
 * 示例BUFF
 */
import { BuffC, BuffData, BuffS } from "module_buff";
import { oTrace, oTraceError } from "odin";

export class ExampleBuffC extends BuffC {
    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffC constructor _id: ", _id, " configId: ", staticConfig.id);
        super(_id, staticConfig);
    }

    public init() {
        //oTrace("ExampleBuffC init");
        super.init();
    }

    /**
   * 销毁，清理
   */
    public destroy() {
        //oTrace("ExampleBuffC Destroy");
        super.destroy();
    }

}
 
export class ExampleBuffS extends BuffS {

    /** 释放者的guid，SkillBaseActor.guid/GameObject.guid , 如果不存在表示该buff位于世界位置上 */
    private _castPId: number = 0;
    /**buff释放者 pid */
    public get castPId(): number {
        return this._castPId;
    }
    constructor(_id: number, staticConfig: BuffData, arg: any) {
        //oTrace("ExampleBuffS constructor ", _id, staticConfig.id, arg);

        super(_id, staticConfig);

        let pid = Number(arg);
        if (isNaN(pid) == false) {
            this._castPId = pid;
        } else {
            //oTraceError("ExampleBuffS isNaN(pid) ", arg);
        }
    }

    public init() {
        //oTrace("ExampleBuffS init");
        super.init();
    }

    /**
    * 销毁，清理
    */
    public destroy() {
        //oTrace("ExampleBuffS Destroy");
        super.destroy();
    }

    public onUpdate(dt: number): void {
        super.onUpdate(dt);
    }
}