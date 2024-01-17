import { MapEx } from "odin";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import Tips from "../../tool/P_Tips";
import { MotionDataManager } from "./MotionDataManager";
import { MotionFrameNodeBase, MotionFrameNode } from "./MotionFrameNodeBase";
import { MotionWindow } from "./MotionWindow";
import { UIEvent_editMotion } from "./UIEvent_editMotion";
import { MotionDisplay } from "./MotionDisplay";
import { EFrameNodeType } from "./MontionEnum";
import { MotionModuleC } from "../../module/MotionModule/MotionModuleC";
import { MotionFrameNodePanel } from "./MotionFrameNodePanel";
import { MessageBox } from "../../tool/MessageBox";


/**技能编辑器模块 */
@Singleton()
export class MotionManager {
    public static instance: MotionManager = null;

    /**组索引 */
    public curGroupIndex: number = 0;
    /**当前选中的motion列表索引 */
    public curSelectMotionListIndex: number = 0;
    /**选中frame node index */
    public curSelectFrameNodexIndex: number = 0;

    private _isInit: boolean = false;

    private _leftControl: boolean = false;


    /**拷贝的数据 */
    private _copyFrameNode: MotionFrameNodeBase = null;

    /**初始化 */
    public init() {

        if (this._isInit) {
            return;
        }
        this._isInit = true;

        InputUtil.onKeyDown(mw.Keys.LeftControl, () => {
            this._leftControl = true;
        });
        InputUtil.onKeyUp(mw.Keys.LeftControl, () => {
            this._leftControl = false;
        });

        InputUtil.onKeyDown(mw.Keys.C, () => {
            if (this._leftControl == false) return;
            Tips.show("拷贝");

            let motionClip = this.getCurSelectMotionClip();

            if (motionClip == null) return;

            let motionNodes = MapEx.get(motionClip.motionNodeMap, this.curSelectFrameNodexIndex);

            if (motionNodes == null) {
                return;
            }
            this._copyFrameNode = motionNodes[MotionFrameNodePanel.instance._selectNodeIndex];


        });
        InputUtil.onKeyDown(mw.Keys.V, () => {
            if (this._leftControl == false) return;

            if (this._copyFrameNode == null) {
                Tips.show("没有可拷贝的 ");
                return;
            }
            this.copyFrameNode(this._copyFrameNode);
            Tips.show("拷贝成功");
        });



        EventManager.instance.add(UIEvent_editMotion.AddMontion, this.listen_addMontion.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Select_GroupIndex, this.listen_selectGroupIndex.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Delete_GroupIndex, this.listen_deleGroupIndex.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Select_MontionIndex, this.listen_selectMotionIndex.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Delete_MotionIndex, this.listen_deleteMotionIndex.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Select_FrameNodexIndex, this.select_frameNodeIndex.bind(this));
        EventManager.instance.add(UIEvent_editMotion.AddFrameNode, this.addFrameNode.bind(this));
        EventManager.instance.add(UIEvent_editMotion.RemoveFrameNode, this.removeFrameNode.bind(this));
        EventManager.instance.add(UIEvent_editMotion.CopyFrameNode, this.copyFrameNode.bind(this));
        EventManager.instance.add(UIEvent_editMotion.AddFrameCount, this.listen_addFrameCount.bind(this));
        EventManager.instance.add(UIEvent_editMotion.SubFrameCount, this.listen_subFrameCount.bind(this));

        MotionWindow.instance.init();
        MotionDisplay.instance.init();
    }

    /**增加一个montion */
    private listen_addMontion(configId: number, groupName: string, name: string, frameCount: number) {

        MotionDataManager.instance.addMotion(configId, groupName, name, frameCount);
        if (MotionDataManager.instance._motionClips.length == 1) {
            this.refresh_motionIndex();
        }
    }

    private listen_selectGroupIndex(index: number) {
        this.curGroupIndex = index;
        EventManager.instance.call(UIEvent_editMotion.Change_GroupIndex, index);
    }

    /**删除组 */
    private listen_deleGroupIndex(index: number) {
        let groupNames = Array.from(MotionDataManager.instance._groupClipMap.keys());
        if (groupNames == null || groupNames[index] == null) {
            Tips.show("没有可删除的组");
            return;
        }

        MessageBox.showTwoBtnMessage("", "是否删除组" + groupNames[index], (result: boolean) => {
            if (result == false) return;


            let groupName = groupNames[index];

            let clips = MotionDataManager.instance._groupClipMap.get(groupName);

            let newMotionClips = MotionDataManager.instance._motionClips.filter((data) => {
                return clips.includes(data) == false;
            });

            MotionDataManager.instance._motionClips = newMotionClips;


            MotionDataManager.instance._groupClipMap.delete(groupName);


            this.listen_selectGroupIndex(0);
        });


    }

    /**选中指定索引 */
    private listen_selectMotionIndex(index: number) {
        this.curSelectMotionListIndex = index;

        EventManager.instance.call(UIEvent_editMotion.Change_MotionIndex, index);
    }

    private change_motionIndex(index: number) {
        this.curSelectMotionListIndex = index;
        EventManager.instance.call(UIEvent_editMotion.Change_MotionIndex, index);
    }

    private refresh_motionIndex() {
        EventManager.instance.call(UIEvent_editMotion.Change_MotionIndex, this.curSelectMotionListIndex);
    }

    private listen_deleteMotionIndex(index: number) {

        let curGroupClips = this.getCurSelectGoup();

        if (curGroupClips == null || curGroupClips.length == 0) {
            return;
        }
        let deleClips = curGroupClips.splice(index, 1);
        // 数组里的引用也移除
        let newClips = MotionDataManager.instance._motionClips.filter((data) => {
            return deleClips.includes(data) == false;
        });
        MotionDataManager.instance._motionClips = newClips;

        let value = this.curSelectMotionListIndex - 1;
        value = MathUtil.clamp(value, 0, value);
        this.change_motionIndex(value);
    }




    /**改变帧索引 */
    private select_frameNodeIndex(index: number) {
        this.curSelectFrameNodexIndex = index;
        EventManager.instance.call(UIEvent_editMotion.Change_FrameNodeIndex);
    }


    /**添加帧节点 */
    private addFrameNode(nodeType: EFrameNodeType) {
        let motionData = this.getCurSelectMotionClip();

        if (motionData == null) {
            Tips.show("当前数据为空");
            return;
        }

        let node = this.createEmptyNode(nodeType);

        if (node == null) {
            return;
        }



        if (MapEx.has(motionData.motionNodeMap, this.curSelectFrameNodexIndex) == false) {
            MapEx.set(motionData.motionNodeMap, this.curSelectFrameNodexIndex, []);
        }
        let motionNodes = MapEx.get(motionData.motionNodeMap, this.curSelectFrameNodexIndex);
        motionNodes.push(node);

        EventManager.instance.call(UIEvent_editMotion.RefreshFrameNode);
    }

    /**创建一个空节点 */
    private createEmptyNode(nodeType: EFrameNodeType) {
        let nodeGuid = this.createSingleGuid();

        if (nodeGuid == null) {
            return null;
        }

        let nodeClass: typeof MotionFrameNodeBase = MotionFrameNode.getNodeClass(nodeType);
        if (nodeClass == null) {
            Tips.show("添加节点失败" + nodeType)
            console.error("vae===addFrameNode nodeClass==nul", nodeType);
            return null;
        }

        let node = new nodeClass();
        node.frameGuid = nodeGuid;
        return node;
    }

    private isHasGuid(createGuid: string) {
        for (let index = 0; index < MotionDataManager.instance._motionClips.length; index++) {
            const motionClip = MotionDataManager.instance._motionClips[index];

            for (let key in motionClip.motionNodeMap) {
                let datas = motionClip.motionNodeMap[key];
                if (datas == null) {
                    continue;
                }

                for (let i = 0; i < datas.length; i++) {
                    const element = datas[i];
                    if (element.frameGuid == createGuid) {
                        return true;
                    }
                }
            }


        }

        return false;
    }

    /**创建一个唯一guid 可能为空 */
    private createSingleGuid() {
        let nodeGuid = this.createGuid();
        let whileCount = 0;
        while (this.isHasGuid(nodeGuid)) {
            nodeGuid = this.createGuid();
            whileCount++;

            if (whileCount >= 100) {
                Tips.show("添加节点失败，没有合适的guid")
                console.error("vae===addFrameNode whileCount>100 ", nodeGuid);
                return null;
            }
        }

        return nodeGuid;
    }

    // 生成唯一guid
    public createGuid() {
        let guid = "";
        for (let i = 0; i < 4; i++) {
            guid += Math.floor(Math.random() * 16.0).toString(16);
        }
        return guid;
    }

    /**移除帧节点 */
    private removeFrameNode(nodeData: MotionFrameNodeBase) {
        let motionData = this.getCurSelectMotionClip();

        if (motionData == null) {
            console.error("vae===removeFrameNode motionData == null",
                this.curSelectMotionListIndex);
            Tips.show("移除节点失败" + this.curSelectMotionListIndex);
            return;
        }

        let motionNodes = MapEx.get(motionData.motionNodeMap, this.curSelectFrameNodexIndex);

        let index = motionNodes.findIndex((data) => {
            return data == nodeData;
        });

        if (index == -1) {
            console.error("vae===removeFrameNode index == -1",
                this.curSelectMotionListIndex);
            Tips.show("移除节点失败,未查找到" + this.curSelectMotionListIndex);
            return;
        }

        motionNodes.splice(index, 1);

        EventManager.instance.call(UIEvent_editMotion.RefreshFrameNode);
    }


    /**复制帧节点 */
    private copyFrameNode(nodeData: MotionFrameNodeBase) {

        let motionData = this.getCurSelectMotionClip();
        if (motionData == null) {
            console.error("vae===removeFrameNode motionData == null",
                this.curSelectMotionListIndex);
            Tips.show("复制节点失败" + this.curSelectMotionListIndex);
            return;
        }

        let nodeGuid = this.createSingleGuid();

        if (nodeGuid == null) {
            return null;
        }
        let copyNode: MotionFrameNodeBase = this.deepCopy(nodeData);
        copyNode.frameGuid = nodeGuid;

        console.error("===copynode ", copyNode.constructor.name)

        if (MapEx.has(motionData.motionNodeMap, this.curSelectFrameNodexIndex) == false) {
            MapEx.set(motionData.motionNodeMap, this.curSelectFrameNodexIndex, []);
        }
        let motionNodes = MapEx.get(motionData.motionNodeMap, this.curSelectFrameNodexIndex);
        motionNodes.push(copyNode);

        EventManager.instance.call(UIEvent_editMotion.RefreshFrameNode);
    }

    // 深拷贝对象
    public deepCopy(obj: any) {
        if (typeof obj != 'object') {
            return obj;
        }
        let newobj = {};
        for (let attr in obj) {
            if (typeof obj[attr] == `object`) {
                newobj[attr] = new mw.Vector(obj[attr]["x"], obj[attr]["y"], obj[attr]["z"]);
                continue;
            }
            newobj[attr] = obj[attr];
        }
        return newobj;
    }

    private listen_addFrameCount() {
        let motionData = this.getCurSelectMotionClip();
        if (motionData == null) {
            Tips.show("增加帧数失败" + this.curSelectMotionListIndex);
            return;
        }
        motionData.frameCount++;

        EventManager.instance.call(UIEvent_editMotion.Refresh_Motion);
    }

    private listen_subFrameCount() {
        let motionData = this.getCurSelectMotionClip();
        if (motionData == null) {
            Tips.show("减少帧数失败" + this.curSelectMotionListIndex);
            return;
        }

        if (motionData.frameCount <= 1) {
            Tips.show("帧数至少一帧");
            return;
        }
        motionData.frameCount--;
        if (this.curSelectFrameNodexIndex - 1 >= 0) {

            // 清理下数据
            for (const key in motionData.motionNodeMap) {
                if (Number(key) >= motionData.frameCount) {
                    Tips.show("移除数据节点" + key);
                    MapEx.del(motionData.motionNodeMap, key);
                }
            }

            if (this.curSelectFrameNodexIndex >= motionData.frameCount) {
                let selectIndex = this.curSelectFrameNodexIndex - 1;
                EventManager.instance.call(UIEvent_editMotion.Select_FrameNodexIndex,
                    selectIndex);
            }

        }
        EventManager.instance.call(UIEvent_editMotion.Refresh_Motion);
    }


    public saveData() {
        Tips.show("数据序列化成功");
        let saveData = JSON.stringify(MotionDataManager.instance._motionClips);
        console.error("vae-motion-saveData:" + saveData);
    }

    /**播放帧动画 */
    public playMotion() {
        let motionData = this.getCurSelectMotionClip();

        if (motionData == null) {
            Tips.show("播放失败，没有数据");
            return;
        }

        // let findIndex = MotionDataManager.instance._motionClips.findIndex((data) => {
        //     return motionData == data;
        // });

        // if (findIndex == -1) {
        //     return;
        // }


        ModuleService.getModule(MotionModuleC).gm_invoke_motion(motionData.motionId);
    }

    /**获取当前选中的动效片段 */
    public getCurSelectMotionClip() {
        let names = Array.from(MotionDataManager.instance._groupClipMap.keys());

        let name = names[MotionManager.instance.curGroupIndex];

        if (name == null || MotionDataManager.instance._groupClipMap.has(name) == false) {

            return null;
        }

        let motionClip = MotionDataManager.instance._groupClipMap.get(name)[this.curSelectMotionListIndex];

        return motionClip;
    }

    /**获取当前选中的动效组 数组 */
    public getCurSelectGoup() {
        let names = Array.from(MotionDataManager.instance._groupClipMap.keys());

        let name = names[MotionManager.instance.curGroupIndex];

        if (name == null || MotionDataManager.instance._groupClipMap.has(name) == false) {

            return null;
        }

        return MotionDataManager.instance._groupClipMap.get(name);
    }


    /**打开编辑器 */
    public showEditor() {
        this.init();
        MotionWindow.instance.show_editView();
    }

}
