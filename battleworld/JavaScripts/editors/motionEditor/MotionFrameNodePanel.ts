import { MapEx } from "odin";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import { IItemRender, UIMultiScroller } from "../../tool/UIMultiScroller";
import FrameNodeItem_Generate from "../../ui-generate/editor_motion/FrameNodeItem_generate";
import FrameNodeView_Generate from "../../ui-generate/editor_motion/FrameNodeView_generate";
import MotionEditorWindow_Generate from "../../ui-generate/editor_motion/MotionEditorWindow_generate";
import { EMotionFrameNodeViewItemType, MotionFrameNode, MotionFrameNodeBase, MotionFrameNode_Camera } from "./MotionFrameNodeBase";
import { MotionManager } from "./MotionManager";
import { UIEvent_editMotion } from "./UIEvent_editMotion";
import Tips from "../../tool/P_Tips";
import { MotionEditConst } from "./MotionEditConst";
import { EFrameNodeType } from "./MontionEnum";



interface INodeData {
    variateKey: string;
    nodeData: MotionFrameNodeBase;
}

class FrameNodeItem extends FrameNodeItem_Generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;

    public data: INodeData = null;

    onStart() {
        this.mBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;

        // 输入框值改变
        this.mInput.onTextCommitted.add((text: string) => {

            let nodeClass = MotionFrameNode.getNodeClass(this.data.nodeData.frameNodeType);

            let realVariateKey = this.data.variateKey.split(MotionEditConst.constName)[0]


            let variateType = `${realVariateKey}_vtype`;

            let vType = nodeClass[variateType];

            switch (vType) {
                case EMotionFrameNodeViewItemType.Text_Input:
                    {
                        let itemValue = this.data.nodeData[realVariateKey];
                        let typeName = typeof itemValue;
                        if (typeName == "number") {
                            let value = Number(text);
                            if (isNaN(value)) {
                                return;
                            }
                            this.data.nodeData[realVariateKey] = value;
                        } else {
                            this.data.nodeData[realVariateKey] = text;
                        }
                    }
                    break;
                case EMotionFrameNodeViewItemType.Num_Array:
                    {
                        let numStrs = text.split("|");
                        this.data.nodeData[realVariateKey] = [];
                        for (let index = 0; index < numStrs.length; index++) {
                            const element = Number(numStrs[index]);
                            if (isNaN(element)) {
                                Tips.show("数字数组错误");
                                continue;
                            }

                            this.data.nodeData[realVariateKey].push(element);
                        }
                    }
                    break;
            }


        });

        this.mInputX.onTextCommitted.add((text: string) => {
            let value = Number(text);
            if (isNaN(value)) {
                return;
            }
            let realVariateKey = this.data.variateKey.split(MotionEditConst.constName)[0]
            this.data.nodeData[realVariateKey]["x"] = value;
        });
        this.mInputY.onTextCommitted.add((text: string) => {
            let value = Number(text);
            if (isNaN(value)) {
                return;
            }
            let realVariateKey = this.data.variateKey.split(MotionEditConst.constName)[0]
            this.data.nodeData[realVariateKey]["y"] = value;
        });

        this.mInputZ.onTextCommitted.add((text: string) => {
            let value = Number(text);
            if (isNaN(value)) {
                return;
            }
            let realVariateKey = this.data.variateKey.split(MotionEditConst.constName)[0]
            this.data.nodeData[realVariateKey]["z"] = value;
        });
    }

    setData(data: INodeData): void {
        this.data = data;

        this.mTittle.visibility = mw.SlateVisibility.Collapsed;
        this.mInput.visibility = mw.SlateVisibility.Collapsed;
        this.mInputX.visibility = mw.SlateVisibility.Collapsed;
        this.mInputY.visibility = mw.SlateVisibility.Collapsed;
        this.mInputZ.visibility = mw.SlateVisibility.Collapsed;
        this.mBtn.visibility = mw.SlateVisibility.Collapsed;

        let realVariateKey = this.data.variateKey.split(MotionEditConst.constName)[0];

        let nodeClass = MotionFrameNode.getNodeClass(this.data.nodeData.frameNodeType);


        let variateType = `${realVariateKey}_vtype`;

        let vType = nodeClass[variateType];

        if (vType == EMotionFrameNodeViewItemType.Btn) {
            this.mBtn.visibility = mw.SlateVisibility.Visible;
            this.mBtn.text = nodeClass[this.data.variateKey];
            return;
        }

        if (this.data.nodeData[realVariateKey] == null) {
            Tips.show("realVariateKey null " + realVariateKey);
            console.error("===FrameNodeItem error nodeData[realVariateKey] == null ", realVariateKey)
            return;
        }

        this.mInput.text = "";

        switch (vType) {
            case EMotionFrameNodeViewItemType.Text_Input:
                {
                    this.mTittle.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    this.mInput.visibility = mw.SlateVisibility.Visible;
                    this.mTittle.text = nodeClass[this.data.variateKey]
                    let releativeData = this.data.nodeData[realVariateKey]
                    if (releativeData != null) {
                        this.mInput.text = releativeData.toString();
                    }
                }
                break;
            case EMotionFrameNodeViewItemType.Text_Vector:
                {
                    this.mTittle.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    this.mInputX.visibility = mw.SlateVisibility.Visible;
                    this.mInputY.visibility = mw.SlateVisibility.Visible;
                    this.mInputZ.visibility = mw.SlateVisibility.Visible;
                    this.mTittle.text = nodeClass[this.data.variateKey];
                    let releativeData = this.data.nodeData[realVariateKey];
                    if (releativeData) {
                        this.mInputX.text = releativeData["x"].toString();
                        this.mInputY.text = releativeData["y"].toString();
                        this.mInputZ.text = releativeData["z"].toString();
                    }
                }
                break;
            case EMotionFrameNodeViewItemType.Num_Array:
                {
                    this.mTittle.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                    this.mInput.visibility = mw.SlateVisibility.Visible;
                    this.mTittle.text = nodeClass[this.data.variateKey]
                    let releativeData = this.data.nodeData[realVariateKey]
                    if (releativeData != null) {
                        let str = ""
                        for (let index = 0; index < releativeData.length; index++) {
                            const element = releativeData[index];
                            if (index < releativeData.length - 1) {
                                str += element + "|";
                            } else {
                                str += element;
                            }
                        }
                        this.mInput.text = str;
                    }
                }
                break;
        }
    }


    get clickObj(): mw.StaleButton {
        return null;
    }

    setSelect(bool: boolean): void {

    }

}

class FrameNodeView extends FrameNodeView_Generate implements IItemRender {
    updateData(): void {

    }
    realIndex: number;

    /**帧节点列表 */
    private nodeScroll: UIMultiScroller = null;

    public data: MotionFrameNodeBase = null;

    private _nodeDatas: INodeData[] = [];


    onStart() {
        let renderItemSize = new mw.Vector2(230, 70);
        let horAndVerSpace = new mw.Vector2(0, 5);

        this.nodeScroll = new UIMultiScroller(this.mScrollView,
            this.mContent, FrameNodeItem);

        this.nodeScroll.InitCallback.add(this.onInitItem, this);
        this.nodeScroll.ItemCallback.add(this.onRefeshItem, this);

        this.mSelectBtn.touchMethod = mw.ButtonTouchMethod.PreciseTap;
    }


    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem(index: number, renderItem: IItemRender) {
        if (renderItem instanceof FrameNodeItem) {

            renderItem.mBtn.onClicked.add(() => {
                if (renderItem.data.nodeData.frameNodeType == EFrameNodeType.MotionFrameNode_Camera) {
                    if (renderItem.data.nodeData instanceof MotionFrameNode_Camera) {
                        let chara = Player.localPlayer.character;
                        let trans = Camera.currentCamera.worldTransform.clone();
                        let relative = Camera.currentCamera.localTransform.clone();

                        let resultLoc = chara.localTransform.inverseTransformPosition(trans.position);
                        let resultDir = trans.rotation.getForce();

                        let relativeDir = chara.localTransform.inverseTransformDirection(resultDir)

                        renderItem.data.nodeData.camrea_offsetPos = resultLoc;
                        renderItem.data.nodeData.camrea_offsetRotation.x = relativeDir.x;
                        renderItem.data.nodeData.camrea_offsetRotation.y = relativeDir.y;
                        renderItem.data.nodeData.camrea_offsetRotation.z = relativeDir.z;

                        console.error("====保存数据1 ", resultLoc)
                        console.error("====保存数据2 ", relativeDir)
                        console.error("====保存数据3 ", relative.rotation)
                        this.refresh_NodeScroll();
                    }
                }
            });

        }
    }


    private onRefeshItem(index: number, renderItem: IItemRender) {
        renderItem.setData(this._nodeDatas[index]);
    }

    setData(data: MotionFrameNodeBase): void {
        this.data = data;
        this.refresh_NodeScroll();
    }

    get clickObj(): mw.StaleButton {
        return this.mSelectBtn;
    }

    setSelect(bool: boolean): void {
        let color = bool ? mw.LinearColor.yellow : mw.LinearColor.black;
        this.mSelect.imageColor = color
    }

    public refresh_NodeScroll() {

        this._nodeDatas.length = 0;

        let nodeClass = MotionFrameNode.getNodeClass(this.data.frameNodeType);

        for (const key in nodeClass) {
            if (key.includes(MotionEditConst.constName) == false) {
                continue;
            }
            let nodeData: INodeData = {
                variateKey: key,
                nodeData: this.data
            }
            this._nodeDatas.push(nodeData);
        }


        this.nodeScroll.setData(this._nodeDatas);
    }

}

/**技能帧节点功能UI */
@Singleton()
export class MotionFrameNodePanel {
    public static instance: MotionFrameNodePanel = null;


    private motionEditorWindow: MotionEditorWindow_Generate = null;

    /**帧节点列表 */
    private frameNodeScroll: UIMultiScroller = null;

    private _nodeDatas: MotionFrameNodeBase[] = [];

    public init() {
        this.motionEditorWindow = mw.UIService.getUI(MotionEditorWindow_Generate, false);

        let scrollView = this.motionEditorWindow.mFrameNodeScroll;
        let content = this.motionEditorWindow.mFrameNodeContent;

        this.frameNodeScroll = new UIMultiScroller(scrollView, content, FrameNodeView);

        this.frameNodeScroll.InitCallback.add(this.onInitItem, this);
        this.frameNodeScroll.ItemCallback.add(this.onRefeshItem, this);

        EventManager.instance.add(UIEvent_editMotion.RefreshFrameNode, this.listen_fefreshFrameNode.bind(this));
        EventManager.instance.add(UIEvent_editMotion.Change_FrameNodeIndex, this.listen_frameNodeIndex.bind(this));


        this.refresh_frameNodeScroll();
    }

    private listen_fefreshFrameNode() {
        this.refresh_frameNodeScroll();
    }

    private listen_frameNodeIndex() {
        this.refresh_frameNodeScroll();
    }


    /**
     * 初始化
     * @param index 
     * @param renderItem 
     */
    private onInitItem(index: number, renderItem: IItemRender) {
        if (renderItem instanceof FrameNodeView) {
            renderItem.mCopyBtn.onClicked.add(() => {
                EventManager.instance.call(UIEvent_editMotion.CopyFrameNode, renderItem.data);
            });

            renderItem.mDeleBtn.onClicked.add(() => {
                EventManager.instance.call(UIEvent_editMotion.RemoveFrameNode, renderItem.data);
            });
            renderItem.mSelectBtn.onClicked.add(() => {
                this._selectNodeIndex = renderItem.realIndex;

                this.refresh_frameNodeScroll();
            });
        }
    }

    /**
     * 刷新任务item数据
     * @param index 
     * @param renderItem 
     */
    private onRefeshItem(index: number, renderItem: IItemRender) {
        renderItem.setData(this._nodeDatas[index]);

        renderItem.setSelect(index == this._selectNodeIndex);
    }

    /**当前选中的 节点索引 */
    public _selectNodeIndex: number = -1;

    public refresh_frameNodeScroll(reset: boolean = true) {


        let motionClip = MotionManager.instance.getCurSelectMotionClip();
        if (motionClip == null) {
            this.frameNodeScroll.setData([]);
            return;
        }

        this._nodeDatas.length = 0;

        let motionNodes = MapEx.get(motionClip.motionNodeMap, MotionManager.instance.curSelectFrameNodexIndex);

        if (motionNodes) {
            for (let index = 0; index < motionNodes.length; index++) {
                const node = motionNodes[index];
                this._nodeDatas.push(node);
            }
            if (this._selectNodeIndex >= motionNodes.length) {
                this._selectNodeIndex = -1;
            }
        }


        this.frameNodeScroll.setData(this._nodeDatas, reset);
    }


}
