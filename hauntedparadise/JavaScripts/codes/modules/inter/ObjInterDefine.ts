@Serializable
export class InterEvtData {
    @mw.Property({ displayName: "事件名字" })
    public evtName: string = "";
    @mw.Property({ displayName: "目标模型", capture: true })
    public targetGuid: string = "";
    @mw.Property({ displayName: "参数" })
    public params: string[] = [""];
    @mw.Property({ displayName: "延迟时间(s)" })
    public delayTime: number = 0;
}

/**
 * 客户端接受服务器的事件
 */
Event.addServerListener("ObjInterBySer", (datas: InterEvtData[]) => {
    ObjInterDefine.dispatchClientDirect(datas)
})

/** 
 * 服务器接受客户端的时间 
 */
Event.addClientListener("ObjInterByClient", (player: mw.Player, datas: InterEvtData[]) => {
    ObjInterDefine.dispatchServerByData(datas, "")
    datas.forEach(element => {
        console.log("dispatchAllClient" + element.evtName);
    });
})

export class ObjInterDefine {
    /**
     * 双端的事件
     */
    public static scEvts = ["showWorldTips"];//["evt_playEffect", "evt_playTween", ];

    /**
     * 在服务器分发事件
     * @param datas 分发的
     * @param defaultGuid 
     */
    public static dispatchServerByData(datas: InterEvtData[], defaultGuid: string) {
        datas.forEach(e => {
            if (e.targetGuid == "") {
                e.targetGuid = defaultGuid;
            }
        })
        if (SystemUtil.isServer()) {
            Event.dispatchToAllClient("ObjInterBySer", datas);
        }
        if (SystemUtil.isClient()) {
            this.dispatchClientByData(datas, defaultGuid);
        }
    }

    /**
     * 在客户端分发事件
     * @param datas 需要分发的事件数据
     * @param defaultGuid 默认的挂点guid
     */
    public static dispatchClientByData(datas: InterEvtData[], defaultGuid: string) {
        datas.forEach(e => {
            if (e.targetGuid == "") {
                e.targetGuid = defaultGuid;
            }
        })
        if (SystemUtil.isClient()) {
            let allDisData = [];
            datas.forEach(element => {
                if (element.evtName == "") {
                    return;
                }
                if (this.scEvts.includes(element.evtName)) {
                    allDisData.push(element);
                }
                else {
                    if (element.delayTime != 0) {
                        setTimeout(() => {
                            this.dispatchLocal(element.evtName, element.targetGuid, ...element.params);
                        }, element.delayTime * 1000);
                    }
                    else {
                        try {
                            this.dispatchLocal(element.evtName, element.targetGuid, ...element.params);
                        } catch (error) {
                            console.error("error when dispatchClientByData" + error)
                        }

                    }
                }
            });
            this.dispatchAllClient(allDisData);
        }
    }

    /**
     * 直接发送事件，不检测是否有双端的事件
     * @param datas 
     */
    public static dispatchClientDirect(datas: InterEvtData[]) {
        if (SystemUtil.isClient()) {
            datas.forEach(element => {
                if (element.evtName == "") {
                    return;
                }
                if (element.delayTime != 0) {
                    setTimeout(() => {
                        this.dispatchLocal(element.evtName, element.targetGuid, ...element.params);
                    }, element.delayTime * 1000);
                }
                else {
                    try {
                        this.dispatchLocal(element.evtName, element.targetGuid, ...element.params);
                    } catch (error) {
                        console.error("error when dispatchClientByData" + error)
                    }
                }
            });
        }
    }

    /**
     * 分发到所有的客户端
     * @param datas 
     */
    private static dispatchAllClient(datas: InterEvtData[]) {
        if (datas.length == 0) {
            return;
        }
        Event.dispatchToServer("ObjInterByClient", datas);
    }

    /**
     * 实际的事件触发的地方
     * @param evtName 
     * @param params 
     */
    private static dispatchLocal(evtName: string, ...params: any[]) {
        Event.dispatchToLocal(evtName, ...params);
        console.log("dispatchLocal__ evtName:" + evtName + "params:" + params);
    }
}

export class InterEvtNameDef {
    /**
     * 播放特效（C端）
     * @param isPlay 是否播放
     */
    public static effectEvtName = "evt_playEffect";
    /**
     * 与门交互（C端）
     */
    public static doorInter = "doorInter";
    public static soundEvtName = "evt_playSound";

    /**
     *  显示密码锁的ui(C端)
     */
    public static showLockUIEvtName = "evt_showLockUI";

    /**
     * 播放音效（C端）
     */
    public static playSoundEvtName = "evt_playSound";

    /**
    * 播放BGM（C端）
    */
    public static playBGMEvtName = "evt_playBGM";

    /**
    * 播放3D音效（C端）
    */
    public static play3DSoundEvtName = "evt_play3DSound";

    /**
     * 停止播放音效（C端）
     */
    public static stopSoundEvtName = "evt_stopSound";

    /**
    * 停止播放BGM（C端）
    */
    public static stopBGMEvtName = "evt_stopBGM";

    /**
    * 停止播放3D音效（C端）
    */
    public static stop3DSoundEvtName = "evt_stop3DSound";

    /**
     * 修改交互物自定义数据（C端）
     * @param key 修改自定义数据key
     * @param value 修改自定义数据value值
     */
    public static modifyDataEvtName = "evt_modifyInteractData";

    /**
     * 设置物体到配置的位置（C端）
     */
    public static setLocationEvtName = "evt_setLocation";

    /**
    * 设置物体到配置的旋转（C端）
    */
    public static setRotationEvtName = "evt_setRotation";

    /**
    * 设置物体到配置的缩放（C端）
    */
    public static setScaleEvtName = "evt_setScale";

    /**
    * 播放配置的动效（C端）
    * @param forwardPlay 是否正向播放
    */
    public static playTweenEvtName = "evt_playTween";

    /**
    * 设置物体是否显示（C端）
    * @param visible 是否显示
    */
    public static setVisibilityEvtName = "evt_setObjectVisibility";


    /**
     * 尝试拾取物品(C端)
     */
    public static pickItemEvt = "evt_itemPick";

    /**
     * 蹲下事件(C端)
     */
    public static crouchEvt = "evt_changeCrouch";

    /**
     * 改变位置事件(c端)
     */
    public static evt_changeLoc = "evt_changeLoc";

    /**
     * 设置摄像机(c端)
     */
    public static evt_setCamera = "evt_setCamera";

    /**
     * 重置摄像机
     */
    public static evt_resetCamera = "evt_resetCamera";

    /**
     * 打开UI
     */
    public static evt_openUI = "evt_openUI";

    /**
     * 关闭UI
     */
    public static evt_closeUI = "evt_closeUI";

    /**
     * 使用物品
     */
    public static evt_useItem = "evt_userItem";

}

