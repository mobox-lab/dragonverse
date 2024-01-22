
// /**
//  * 玩家数据相关扩展
//  */

// import { EWorldType, GlobalWorld } from "../const/GlobalWorld";

// export declare namespace mwext {

//     export interface PlayerData {
//         loadDataManifest();
//         asyncGetData();
//         asyncSetData();
//         asyncGetV0Data();
//         loadData();
//     }



// }

// mwext["PlayerData"].prototype.loadDataManifest = async function () {
//     let errorMsg;
//     const userId = this.userId;
//     const key = mwext["PlayerData"]["getPlayerDataKey"](userId);
//     console.log(`PlayerData[${userId}]->loadDataManifest: Load dataManifest start. ${key}`);
//     const res = await this.asyncGetData(key);
//     if (res.code != mw.DataStorageResultCode.Success) {
//         errorMsg = `PlayerData[${userId}]->loadDataManifest: Load V1 dataManifest error. ErrorCode:${res.code}`;
//         console.error(errorMsg);
//         return { errorMsg, dataManifest: null };
//     }
//     let data_v1 = res.data;

//     //  玩家是否有数据,没有需要跳到世界1
//     if (GlobalWorld.worldType != EWorldType.world1
//         && data_v1 == null && SystemUtil.isPIE == false) {
//         return null;
//     }

//     if (data_v1 == null) {
//         console.log(`PlayerData[${userId}]->loadDataManifest: V1 dataManifest is null. Try load V0 data.`);
//         const v0Res = await this.asyncGetV0Data(userId);
//         if (v0Res.code != mw.DataStorageResultCode.Success) {
//             errorMsg = `PlayerData[${userId}]->loadDataManifest: Load V0 data error. ErrorCode:${v0Res.code}`;
//             console.error(errorMsg);
//             return { errorMsg, dataManifest: null };
//         }
//         const data_v0 = v0Res.data;
//         if (data_v0 != null) {
//             console.log(`PlayerData[${userId}]->loadDataManifest: Load V0 data success. V0 to V1.`);
//             data_v1 = await this.convertV0ToV1(userId, data_v0);
//         } else {
//             console.log(`PlayerData[${userId}]->loadDataManifest: V0 data is null.`);
//         }
//     } else {
//         console.log(`PlayerData[${userId}]->loadDataManifest: Load dataManifest success.`);
//     }
//     if (data_v1 == null) {
//         console.log(`PlayerData[${userId}]->loadDataManifest: New playerData.`);
//         data_v1 = { userId, createTime: mw.TimeUtil.parseTime(new Date(Date.now())), version: 1, subDataList: [] };
//     }
//     console.log(`PlayerData[${userId}]->loadDataManifest: Load dataManifest complete.`);
//     return { errorMsg: null, dataManifest: data_v1 };
// }


// mwext["PlayerData"].prototype.asyncGetData = async function (key: string) {
//     return GlobalWorld.getCustomdata(key);
// }
// mwext["PlayerData"].prototype.asyncSetData = async function (key: string, value) {
//     GlobalWorld.setCustomData(key, value);
// }
// mwext["PlayerData"].prototype.asyncGetV0Data = async function (key: string) {
//     return GlobalWorld.getCustomdata(key);
// }
// mwext["PlayerData"].prototype.loadData = async function () {

//     if (!this.isServer)
//         return;
//     console.log(`PlayerData[${this.userId}]->loadData: Load data start.`);

//     const dataManifestRes = await this.loadDataManifest();

//     // 如果 第二世界，玩家数据为空，自动跳到第一世界
//     if (SystemUtil.isPIE == false &&
//         GlobalWorld.worldType == EWorldType.world2 &&
//         (dataManifestRes.dataManifest == null ||
//             dataManifestRes.dataManifest.subDataList.length == 0)) {

//         let player = mw.Player.getPlayer(this.userId);
//         Event.dispatchToClient(player, "DataInit_Reply_Fail", "this.userId dataManifest == null");
//         return;
//     }

//     let errorMsg;
//     if (dataManifestRes.errorMsg != null) {
//         errorMsg = `PlayerData[${this.userId}]->loadData: Load dataManifest error.`;
//         console.error(errorMsg);
//         this.loadResult = 1 /* MAINFEST_LOAD_FAIL */;
//         this.errorContent = `${errorMsg} ${dataManifestRes.errorMsg}}`;
//         this.onLoadComplete.call();

//         let player = mw.Player.getPlayer(this.userId);
//         Event.dispatchToClient(player, "DataInit_Reply_Fail", this.errorContent);
//         return;
//     }
//     const dataManifest = dataManifestRes.dataManifest;
//     const dataMapRes = await this.loadAllSubdataInfo(dataManifest.subDataList);
//     if (dataMapRes.errorMsg != null) {
//         errorMsg = `PlayerData[${this.userId}]->loadData: Load subdata list error.`;
//         console.error(errorMsg);
//         this.loadResult = 2 /* DATA_MAP_LOAD_FAIL */;
//         this.errorContent = `${errorMsg} ${dataMapRes.errorMsg}}`;
//         this.onLoadComplete.call();

//         let player = mw.Player.getPlayer(this.userId);
//         Event.dispatchToClient(player, "DataInit_Reply_Fail", this.errorContent);
//         return;
//     }
//     console.log(`PlayerData[${this.userId}]->loadData: Load data complete.`);
//     this.loadResult = 0 /* SUCESS */;
//     this.dataManifest = dataManifest;
//     this.dataMap = dataMapRes.dataMap;
//     this.onLoadComplete.call();
// }
