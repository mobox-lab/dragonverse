/*
 * @Author: pengfei.sun pengfei.sun@appshahe.com
 * @Date: 2023-04-14 16:18:32
 * @LastEditors: pengfei.sun pengfei.sun@appshahe.com
 * @LastEditTime: 2023-04-17 20:29:15
 * @FilePath: \testsg\JavaScripts\FSM\IFSMState.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export interface IFSMState {
    
    name:string 
    /**
    * 状态进入，外部调用
    */
    enter(currentState: number,param?:any): void;//lastState: number,
    /**
     * 更新，外部驱动
     */
    onUpdate(dt: number);
    /**
     * 退出状态外部调用
     */
    exit(param?:any);

    /**
     * 销毁
     */
    onDestory();
    /**
     * 能否切换
     */
    canEnter();

    /**
    * 能否退出
    */
    canEixt();
}