import { GameConfig } from "../../../config/GameConfig";
import { CommonUtils } from "../../utils/CommonUtils";
import { LanUtil } from "../../utils/LanUtil";
import Tips from "../../utils/Tips";
import { ArchiveData } from "../archive/ArchiveHelper";
import { BoardHelper } from "../blackboard/BoardDefine";
import { EquipDefine } from "../equip/EquipDefine";
import { InterEvtNameDef } from "../inter/ObjInterDefine";
import { ChainHelper } from "../inter/helper/ChainHelper";
import LevelBase from "./LevelBase";

@Component
export default class PushItemControl extends LevelBase {

    @mw.Property({ displayName: "目标模型" })
    public targetGuid: string = "";

    @mw.Property({ replicated: true, displayName: "可放置物配置Id(消耗类型)" })
    public canPushItemCfgId: number[] = [0];

    @mw.Property({ replicated: true, displayName: "黑板数据Key名", tooltip: "不要携带_" })
    public blackKeyName: string = "";

    @mw.Property({ replicated: true, displayName: "放置后触发条件判断，接收目标对象Id" })
    public receiveGoGuid: string = "";
    //public pushedTriggerEvt: InterEvtData[] = [new InterEvtData()];

    @mw.Property({ replicated: true, displayName: "放置音效" })
    public pushSound: string = "";

    @mw.Property({ replicated: true, displayName: "显隐物品guid", capture: true })
    public itemGuid: string = "";

    public isUseCue: boolean = false;

    public isPushed: boolean = false;

    protected async onLevelStart(): Promise<void> {

        if (SystemUtil.isClient()) {

            console.error("初始化 showItemCOntrol" + this.gameObject.gameObjectId);

            let go: GameObject = null;
            if (this.itemGuid != "") {
                go = await mw.GameObject.asyncFindGameObjectById(this.itemGuid);
                if (!go) { console.error(`TypeError: PushItemControl脚本中${this.gameObject.name}的 guid: ${this.itemGuid}找不到！`); return; }
                await go.asyncReady();
                console.log("关闭了物品的显隐" + go.gameObjectId)
                go.setVisibility(mw.PropertyStatus.Off);
            }
            ChainHelper.instance.addevt(InterEvtNameDef.evt_useItem, this);
            this.addLocalListen(InterEvtNameDef.evt_useItem, async (targetGuid: string) => {

                console.error("使用道具事件进入");

                if (targetGuid != this.targetGuid) {
                    console.error("目标对象不一致，本次操作取消");
                    return;
                }

                if (BoardHelper.GetTargetKeyValue(this.blackKeyName) != null) {
                    Tips.show(GameConfig.Language.tips_show_02.Value);
                    return;
                }

                let player = Player.localPlayer;
                if (EquipDefine.getCurItem(player.playerId) == -1) {
                    let itemCfg = GameConfig.Item.getElement(this.canPushItemCfgId[0]);
                    if (itemCfg) {
                        Tips.show(CommonUtils.formatString(LanUtil.getText("Door_Tips3"), itemCfg.name));
                    }
                    return;
                } else {

                    console.error("当前手持 : " + EquipDefine.getCurItem(player.playerId));
                    if (this.pushSound != "")
                        SoundService.playSound(this.pushSound, 1, 1);

                    let curItem = EquipDefine.getCurItem(player.playerId);
                    if (this.canPushItemCfgId.indexOf(curItem) == -1) {
                        let itemCfg = GameConfig.Item.getElement(this.canPushItemCfgId[0]);
                        if (itemCfg) {
                            Tips.show(CommonUtils.formatString(LanUtil.getText("Door_Tips3"), itemCfg.name));
                        }
                        return;
                    }
                    console.error("使用道具 : " + curItem);
                    this.save2ArchiveAndUseItem(curItem);
                    this.unlcokItem(curItem);

                }
            });
        }
    }

    private async unlcokItem(curItem: number) {
        BoardHelper.ChangeKeyValue(this.blackKeyName, curItem);
        if (this.receiveGoGuid != "") {
            BoardHelper.ChangeKeyValue(this.blackKeyName + "_" + this.receiveGoGuid, curItem);
        }

        let go = await mw.GameObject.asyncFindGameObjectById(this.itemGuid);
        if (go != null) {
            go.setVisibility(mw.PropertyStatus.On);
        }
        this.isPushed = true;
    }

    public async onReset() {
        this.isPushed = false
        let go: GameObject = null;
        if (this.itemGuid != "") {
            go = await mw.GameObject.asyncFindGameObjectById(this.itemGuid);
            go.setVisibility(mw.PropertyStatus.Off);


            let number = BoardHelper.GetTargetKeyValue(this.blackKeyName);
            if (number != null) {
                go.setVisibility(mw.PropertyStatus.On);
            }
        }
    }

    onLoadData(data: ArchiveData): void {
        this.isPushed = false;
        this.isUseCue = false;
        let isUnlock = this.getSaveStatId(data);
        if (!isUnlock) {
            return;
        }

        if (isUnlock != -1) {
            this.unlcokItem(isUnlock);
        }
        if (isUnlock == -1) {
            this.isUseCue = true;
        }
    }

    public setCueSave() {
        if (this.isUseCue) {
            return;
        }
        this.save2Archive(-1);
        this.isUseCue = true;
    }
}