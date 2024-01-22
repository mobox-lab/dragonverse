import { Globaldata } from "../../const/Globaldata";
import { AttributeModuleC } from "../AttributeModule/AttributeModuleC";
import { PlayerManager } from "../PlayerModule/PlayerManager";
import PlayerHeadUI from "../PlayerModule/UI/PlayerHeadUI";
import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

export class RankModelInfo{
    /** character模型 */
    model: Character;
    /** uiWidget */
    uiWidget: mw.UIWidget;
    /** ui表现类 */
    ui: PlayerHeadUI;
}

@Component
export default class RankSync extends Script {

    /** 段位第一名userid */
    @mw.Property({ replicated: true, onChanged: "onScoreFirstChange" })
    public rankScoreFirst: string = "";
    /** model数据map */
    private _modelMap: Map<number,RankModelInfo> = new Map();
    /** model动画map */
    private _animationMap:  Map<number,Animation> = new Map();
    /** 属性模块 */
    private _attributeC: AttributeModuleC = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        
    }

    protected async onScoreFirstChange() {
        await ModuleService.ready();
        if (!this._attributeC) {
            this._attributeC = ModuleService.getModule(AttributeModuleC);
        }
        if(!this._modelMap.has(0)){
            await this.initModel(0);
        }
        this.changerModelAppearance(0, this.rankScoreFirst);
    }
    
    /**
     * 初始化展示npc
     * @param ranking 
     */
    private async initModel(ranking:number){
        let modelInfo = new RankModelInfo();
        modelInfo.model = await mw.GameObject.asyncFindGameObjectById(Globaldata.npc_modelGuid) as Character;
        if (!modelInfo.model) return;
        await modelInfo.model.asyncReady();
        modelInfo.model.switchToFlying();
        modelInfo.model.setCollision(CollisionStatus.Off);
        modelInfo.model.complexMovementEnabled = false;
        modelInfo.model.displayName = "";
        modelInfo.uiWidget = await mw.GameObject.asyncSpawn("UIWidget", { replicates: false }) as mw.UIWidget;
        let ani = modelInfo.model.loadAnimation(Globaldata.npc_modelAnim);
        ani.loop = 0;

        //绑定头顶ui
        modelInfo.ui = mw.UIService.create(PlayerHeadUI);
        modelInfo.ui.rankNpcHeadUI();
        modelInfo.uiWidget.setTargetUIWidget(modelInfo.ui.uiObject as mw.UserWidget);
        modelInfo.uiWidget.widgetSpace = WidgetSpaceMode.OverheadUI;
        modelInfo.model.attachToSlot(modelInfo.uiWidget, HumanoidSlotType.Root);
        modelInfo.uiWidget.localTransform.position = new Vector(0, 0, modelInfo.model.collisionExtent.z);

        //数据
        this._modelMap.set(ranking, modelInfo);
        this._animationMap.set(ranking,ani);
        //体型变化，重新设置位置
        modelInfo.model.onDescriptionComplete.clear();
        modelInfo.model.onDescriptionComplete.add(() => {
            modelInfo.model.worldTransform.position = Globaldata.npc_modelPos.clone().add(new Vector(0, 0, modelInfo.model.collisionExtent.z));
        })
    }

    /**
     * 更改展示npc外观
     * @param ranking 
     * @param userId 
     */
    private changerModelAppearance(ranking: number, userId: string) {
        if (userId == ""){
            let modelInfo = this._modelMap.get(ranking);
            if (!modelInfo) return;
            modelInfo.model.setVisibility(false);
            return;
        }
        let player = Player.getPlayer(userId);
        if (!player) return;
        let name = this._attributeC.getAttributeValue(Attribute.EnumAttributeType.playerName, player.playerId);
        let rankScore = this._attributeC.getAttributeValue(Attribute.EnumAttributeType.rankScore, player.playerId);
        let modelInfo = this._modelMap.get(ranking);
        if (!modelInfo) return;
        modelInfo.model.setVisibility(true);
        mw.AccountService.getUserData(userId, 0, (data) => {
            modelInfo.model.clearDescription();
            const jsonData = JSON.parse(data);
            if(!jsonData["part"]){
                modelInfo.model.setDescription(["BB2186CE4D241BD4459D2DAFDE90537F"]);
                this._animationMap.get(ranking).play();
                return;
            }
            mw.AccountService.setUserData(modelInfo.model, data, () => {

                this._animationMap.get(ranking).play();
            });
        });
        modelInfo.ui.setName(name, 0);
        modelInfo.ui.setRank(PlayerManager.instance.getRankLevel(rankScore));
    }

}