// import GhostInst from "../GhostInst";
// import { BaseGhostCheckCom, BaseGhostCom } from "./base/IGhostCom";
//
// export namespace GhostComDefine {
//     /** 鬼在客户端检测玩家的组件图 */
//     export const clientGhostCheckComMap: Map<number, new (ctl: GhostInst, ...params: any[]) => BaseGhostCheckCom> = new Map();
//     /** 鬼在服务器游荡的组件 */
//     export const serverGhostHangComMap: Map<number, new (ctl: GhostInst, ...params: any[]) => BaseGhostCom> = new Map();
//     /** 鬼在服务器寻敌的组件 */
//     export const serverGhostFollowComMap: Map<number, new (ctl: GhostInst, ...params: any[]) => BaseGhostCom> = new Map();
// }