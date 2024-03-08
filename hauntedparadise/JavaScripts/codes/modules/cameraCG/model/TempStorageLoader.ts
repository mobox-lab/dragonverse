import { CSConfig } from "../CSConfig";
import { CSEditor } from "../CSEditor";
import { Log } from "../utils/Log";
import { KeyFrame } from "./KeyFrame";

/** 
 * 临时存储加载器，用于在PIE下存储临时数据
 */
export class TempStorageLoader {

    /** 数据存储广播 */
    public static readonly EVENT_TEMP_STORAGE_SAVE = "CS.TempStorageSave";
    /** 数据读取广播 */
    public static readonly EVENT_TEMP_STORAGE_LOAD = "CS.TempStorageLoad";
    /** 数据读取响应广播 */
    public static readonly EVENT_TEMP_STORAGE_LOAD_RESPONSE = "CS.TempStorageLoadResponse";

    /** 单例 */
    private static _instance: TempStorageLoader;
    public static get instance(): TempStorageLoader {
        if (!TempStorageLoader._instance) {
            TempStorageLoader._instance = new TempStorageLoader();
        }
        return TempStorageLoader._instance;
    }

    /** 临时存储事件 */
    private _storageSaveEvent: mw.EventListener;
    /** 临时存储读取事件 */
    private _storageLoadEvent: mw.EventListener;
    /** 临时存储读取响应事件 */
    private _storageLoadResEvent: mw.EventListener;

    private _saveData: string = null;
    private _saveTimeout: any = null;

    /** 
     * 构造方法，创建数据相关的事件监听
     */
    constructor() {
        if (SystemUtil.isPIE && SystemUtil.isServer()) {
            this._storageSaveEvent = Event.addClientListener(TempStorageLoader.EVENT_TEMP_STORAGE_SAVE, (player: mw.Player, ...params: unknown[]) => {
                if (params && params.length == 1) {
                    Log.info("saveData", params[0]);
                    DataStorage.asyncSetData(CSConfig.TEMP_STORAGE_KEY, JSON.parse(params[0] as string));
                    // DataStorage.asyncSetData(CSConfig.TEMP_STORAGE_COPY_KEY, params[0] as string);
                } else {
                    Log.warn("数据不符，存储失败");
                }
            });
            this._storageLoadEvent = Event.addClientListener(TempStorageLoader.EVENT_TEMP_STORAGE_LOAD, (player: mw.Player, ...params: unknown[]) => {
                DataStorage.asyncGetData(CSConfig.TEMP_STORAGE_KEY).then((result) => {
                    if (result.code != 200) {
                        Log.warn("数据读取失败", result);
                        Event.dispatchToClient(player, TempStorageLoader.EVENT_TEMP_STORAGE_LOAD_RESPONSE, null);
                    }
                    Event.dispatchToClient(player, TempStorageLoader.EVENT_TEMP_STORAGE_LOAD_RESPONSE, JSON.stringify(result.data));
                }).catch((reason: any) => {
                    Log.err("临时数据读取异常", reason);
                    Event.dispatchToClient(player, TempStorageLoader.EVENT_TEMP_STORAGE_LOAD_RESPONSE, null);
                });
            });
            Log.info("数据存储事件创建");
        }

        if (SystemUtil.isPIE && SystemUtil.isClient()) {
            // 暂存数据读取
            this._storageLoadResEvent = Event.addServerListener(TempStorageLoader.EVENT_TEMP_STORAGE_LOAD_RESPONSE, (...params: unknown[]) => {
                if (params && params.length == 1 && params[0] as string) {
                    CSEditor.instance.loadAnim(params[0] as string);
                }
            });
        }
    }

    /** 
     * 销毁方法，销毁数据相关的事件监听
     */
    public destroy() {
        this._storageSaveEvent?.disconnect();
        this._storageLoadEvent?.disconnect();
        this._storageLoadResEvent?.disconnect();
    }

    /** 
     * 尝试读取数据，向服务端发送读取广播
     */
    public tryLoadData() {
        Event.dispatchToServer(TempStorageLoader.EVENT_TEMP_STORAGE_LOAD);
    }

    /** 
     * 保存数据，向服务端发送存储广播
     */
    public saveData(animData: KeyFrame) {
        this._saveData = JSON.stringify(animData);
        if (this._saveTimeout) return;
        this._saveTimeout = setTimeout(() => {
            Log.info("SaveTempData size:", this._saveData.length);
            this._saveTimeout = null;
            Event.dispatchToServer(TempStorageLoader.EVENT_TEMP_STORAGE_SAVE, this._saveData);
        }, 2000);
    }

}