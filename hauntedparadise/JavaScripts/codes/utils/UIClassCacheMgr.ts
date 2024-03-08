import { InterEvtNameDef } from "../modules/inter/ObjInterDefine";

/*
 * @Author: YuKun.Gao
 * @Date: 2023-11-10 18:45:33
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2023-11-12 09:53:53
 * @Description: file content
 * @FilePath: \hauntedparadise\JavaScripts\utils\UIClassCacheMgr.ts
 */
export class UIClassCacheMgr {

    public static instance: UIClassCacheMgr = new UIClassCacheMgr();

    public constructor() {

        if (SystemUtil.isClient()) {
            console.error("注册UI事件监听");
            Event.addLocalListener(InterEvtNameDef.evt_openUI, (guid: string, uiName: string, ...params) => {

                let clazz = UIClassCacheMgr.getUIClass(uiName);
                if (clazz == null) {
                    console.error("找不到UI : " + uiName);
                    return;
                }
                console.error("显示UI : " + uiName);
                UIService.show(clazz, ...params);

            })

            Event.addLocalListener(InterEvtNameDef.evt_closeUI, (guid: string, uiName: string) => {

                let clazz = UIClassCacheMgr.getUIClass(uiName);
                if (clazz == null) {
                    console.error("找不到UI : " + uiName);
                    return;
                }
                console.error("隐藏UI : " + uiName);
                UIService.hide(clazz);


            })
        }

    }

    private static uiClassCache: { [key: string]: any } = {};

    /**
     * 获取UI类
     */
    public static getUIClass(uiName: string): any {



        if (UIClassCacheMgr.uiClassCache[uiName] == null) {
        
            if (UIService["UI_"+uiName] != null) {
                UIClassCacheMgr.uiClassCache[uiName] = UIService["UI_"+uiName];
                return this.getUIClass(uiName);
            }
        
            return null;
        }
        return UIClassCacheMgr.uiClassCache[uiName];
    }

    /**
     * 设置UI类
     */
    public static setUIClass(uiName: string, uiClass: any): void {
        UIClassCacheMgr.uiClassCache[uiName] = uiClass;
    }

}