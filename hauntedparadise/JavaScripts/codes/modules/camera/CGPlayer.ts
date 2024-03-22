import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import { CommonUtils } from "../../utils/CommonUtils";
import { BoardHelper } from "../blackboard/BoardDefine";
import { CameraCG } from "../cameraCG/CameraCG";
// import { GhostModuleC } from "../ghost/GhostModuleC";
import { InterEvtData, ObjInterDefine } from "../inter/ObjInterDefine";

@Component
export default class CGPlayer extends Script {

    @Property({ displayName: "播放的cgId" })
    public cgId: string = "1";

    @Property({ displayName: "依次显示的节点" })
    public nodeArr: string[] = [""];

    @mw.Property({ group: "播放完后触发的事件", displayName: "触发事件" })
    public evtDataArr: InterEvtData[] = [new InterEvtData()];

    private cfgArr: number[] = [];

    private _curIndex: number = 0;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let arr = this.cgId.split("|");
        arr.forEach(e => {
            this.cfgArr.push(Number(e));
        })
        Event.addLocalListener("CGPlayer", (GOID: string) => {
            if (this.gameObject.gameObjectId != GOID) {
                return;
            }
            UIService.hide(MainUI);
            this._curIndex = 0;
            // ModuleService.getModule(GhostModuleC).protectedPlayer(true);
            this.playAni();
        });
        Event.addLocalListener(BoardHelper.BoardLoadingEvt, () => {
            this.nodeArr.forEach(e => {
                const child = this.gameObject.getChildByName(e)
                child?.setVisibility(PropertyStatus.Off, true);
                child?.setCollision(PropertyStatus.Off, true);
            })
        })
    }

    private playAni() {
        let cgelem = GameConfig["Json"].getElement(this.cfgArr[this._curIndex]);
        let child = this.gameObject.getChildByName(this.nodeArr[this._curIndex])
        child?.setVisibility(PropertyStatus.On, true);
        child?.setCollision(PropertyStatus.On, true);
        if (!cgelem) {
            // ModuleService.getModule(GhostModuleC).protectedPlayer(false);
            Player.localPlayer.character.setVisibility(PropertyStatus.On);
            UIService.show(MainUI);
            CameraCG.instance.exitFreeCamera();
            ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
            return;
        }
        console.log("CG播放")
        Player.localPlayer.character.setVisibility(PropertyStatus.Off);
        CameraCG.instance.play(cgelem.json, () => {
            console.log("CG播放完毕")
            child?.setVisibility(PropertyStatus.Off, true);
            child?.setCollision(PropertyStatus.Off, true);
            this._curIndex++;
            if (this._curIndex >= this.cgId.length) {
                // ModuleService.getModule(GhostModuleC).protectedPlayer(false);
                Player.localPlayer.character.setVisibility(PropertyStatus.On);
                UIService.show(MainUI);
                CameraCG.instance.exitFreeCamera();
                ObjInterDefine.dispatchClientByData(this.evtDataArr, this.gameObject.gameObjectId);
                this.nodeArr.forEach(e => {
                    const child = this.gameObject.getChildByName(e)
                    child?.setVisibility(PropertyStatus.Off, true);
                    child?.setCollision(PropertyStatus.Off, true);
                })
            }
            else {
                this.playAni();
            }
        }, false);
    }
}
