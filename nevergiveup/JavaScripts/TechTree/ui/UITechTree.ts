import { PlayerActions, TechTreeActions } from "../../Actions";
import PlayerModuleC from "../../Modules/PlayerModule/PlayerModuleC";
import PlayerModuleData from "../../Modules/PlayerModule/PlayerModuleData";
import { TweenCommon } from "../../TweenCommon";
import Utils from "../../Utils";
import { GameConfig } from "../../config/GameConfig";
import { MGSTool } from "../../tool/MGSTool";
import TechItemLink_Generate from "../../ui-generate/TechTree/TechItemLink_generate";
import TechItem_Generate from "../../ui-generate/TechTree/TechItem_generate";
import TechRequireItem_Generate from "../../ui-generate/TechTree/TechRequireItem_generate";
import TechTreeContainer_Generate from "../../ui-generate/TechTree/TechTreeContainer_generate";
import { TechNode } from "../TechTree";


let paddingY = GameConfig.Global.getAllElement()[0].techTreePaddingY;
export class UITechItemLink extends TechItemLink_Generate {
    linkItems(from: number[], to: number[]) {
        let fromPos = this.getPos(from);
        let toPos = this.getPos(to);
        // mid point
        let mid = new Vector2((fromPos.x + toPos.x) / 2, (fromPos.y + toPos.y) / 2);
        this.uiObject.position = mid;
        // this.uiObject.renderTransformAngle = Math.atan2(to[0] - from[0], to[1] - from[1]) * 180 / Math.PI;
    }

    getPos(value: number[]) {
        let size = this.uiObject.parent.size;
        let cols = 10;
        let itemSize = 100;
        let linkSize = 10;
        return new Vector2(size.x / cols * (value[1] - 1) + (itemSize - linkSize) / 2, (itemSize + paddingY) * (value[0] - 1) + (itemSize - linkSize) / 2);
    }
}

export class UITechTreeNode extends TechItem_Generate {
    set position(value: number[]) {
        let size = this.uiObject.parent.size;
        let cols = 10;
        let itemSize = 100;
        this.uiObject.position = new Vector2(size.x / cols * (value[1] - 1), (itemSize + paddingY) * (value[0] - 1));
    }

    init(node: TechNode) {
        this.mItem.normalImageGuid = node.icon;
        this.mSelected.visibility = SlateVisibility.Collapsed;
        this.mItem.onClicked.add(() => {
            TechTreeActions.onItemClicked.call(node.id);
        });

        TechTreeActions.onItemClicked.add((id) => {
            if (id == node.id) {
                this.mSelected.visibility = SlateVisibility.Visible;
            } else {
                this.mSelected.visibility = SlateVisibility.Collapsed;
            }
        });
    }
}

export class UITechRequired extends TechRequireItem_Generate {

}

export class UITechTree extends TechTreeContainer_Generate {
    maxY = 0;
    requireItems: UITechRequired[] = [];
    selected: number = 1001;
    currentOffset: Vector2 = Vector2.zero;
    onStart() {
        this.layer = UILayerTop;
        TechTreeActions.onItemClicked.add((id) => {
            this.selected = id;
            this.updateSelected();
        });

        this.closeBtn.onClicked.add(() => {
            TweenCommon.popUpHide(this.uiObject, () => {
                UIService.hideUI(this);
            });
        });

        this.infoBtn.onClicked.add(async () => {
            ModuleService.getModule(PlayerModuleC).tryUnlockTechNode(this.selected);
            this.updateSelected();
        });

        TechTreeActions.onItemUnlocked.add(() => {
            this.updateSelected();
        });
        PlayerActions.onPlayerDataChanged.add(() => {
            this.updateCurrency();
        });
    }

    updateCurrency() {
        let data = DataCenterC.getData(PlayerModuleData);
        if (data) {
            this.goldTxt.text = Utils.formatNumber(DataCenterC.getData(PlayerModuleData).gold);
            this.techPointTxt.text = Utils.formatNumber(DataCenterC.getData(PlayerModuleData).techPoint);
        }
    }

    updateSelected() {
        let cfg = GameConfig.TechTree.getElement(this.selected);
        if (cfg) {
            this.infoCanvas.visibility = SlateVisibility.Visible;
            this.infoTxt.text = cfg.NameKey;
            this.infoTxtDesc.text = Utils.Format(cfg.desc, cfg.amounts);
            if (cfg.Cost) {
                for (let i = 0; i < cfg.Cost.length; i++) {
                    let [id, amount] = cfg.Cost[i];
                    let item = GameConfig.Item.getElement(id);
                    if (!this.requireItems[i]) {
                        this.requireItems[i] = UIService.create(UITechRequired);
                        this.mRequired.addChild(this.requireItems[i].uiObject);
                    }
                    this.requireItems[i].uiObject.visibility = SlateVisibility.Visible;
                    if (item.itemType !== 2) {
                        this.requireItems[i].mImg.imageGuid = item.itemImgGuid;
                    }
                    else {
                        let card = GameConfig.Tower.getElement(item.itemTypeid);
                        Utils.setImageByAssetGuid(this.requireItems[i].mImg, card.imgGuid)
                    }
                    this.requireItems[i].mAmount.text = `*${amount.toString()}`;
                }

                for (let i = cfg.Cost.length; i < this.requireItems.length; i++) {
                    this.requireItems[i].uiObject.visibility = SlateVisibility.Collapsed;
                }
            }
            let isUnlock = DataCenterC.getData(PlayerModuleData).unlockedTechNodes.indexOf(this.selected) != -1;
            if (isUnlock) {
                this.infoBtn.visibility = SlateVisibility.Collapsed;
                this.txtUnlocked.visibility = SlateVisibility.Visible;
                this.txtUnlocked.text = GameConfig.Language.getElement("Text_Unlock").Value;
            }
            else {
                let techTree = ModuleService.getModule(PlayerModuleC).techTree;
                let node = techTree.getNode(this.selected);
                if (node.metAllRequirements()) {
                    this.infoBtn.visibility = SlateVisibility.Visible;
                    this.txtUnlocked.visibility = SlateVisibility.Collapsed;
                }
                else {
                    this.infoBtn.visibility = SlateVisibility.Collapsed;
                    this.txtUnlocked.visibility = SlateVisibility.Visible;
                    this.txtUnlocked.text = GameConfig.Language.getElement("Text_NotSatisfied").Value;
                }
            }
        }
    }
    onShow() {
        MGSTool.page("tech");
        this.techItemCanvas.position = Utils.TEMP_VECTOR2.set(0, 0);
        TechTreeActions.onItemClicked.call(1001);
        this.mScrollBox.scrollToStart();
        TweenCommon.popUpShow(this.uiObject, () => {
            // UIService.hideUI(this);
        });
        this.updateCurrency();
    }

    hideTween() {
        TweenCommon.popUpHide(this.uiObject, () => {
            UIService.hideUI(this);
        });
    }

    addNode(uiNode: UITechTreeNode, position: number[]) {
        this.techItemCanvas.addChild(uiNode.uiObject);
        uiNode.position = position;
        this.maxY = Math.max(this.maxY, position[0]);
        this.updateCanvasSize();
        this.techItemCanvas.position = Utils.TEMP_VECTOR2.set(0, 0);
    }

    addLink(uiLink: Image, from: number[], to: number[]) {
        const getPos = (value: number[]) => {
            let size = uiLink.parent.size;
            let cols = 10;
            let itemSize = 100;
            let linkSize = 10;
            return new Vector2(size.x / cols * (value[1] - 1) + (itemSize - linkSize) / 2, (itemSize + paddingY) * (value[0] - 1) + (itemSize - linkSize) / 2);
        }

        const linkItems = (from: number[], to: number[]) => {
            let fromPos = getPos(from);
            let toPos = getPos(to);
            // mid point
            let mid = new Vector2((fromPos.x + toPos.x) / 2, (fromPos.y + toPos.y) / 2);

            let distance = Math.sqrt(Math.pow(fromPos.x - toPos.x, 2) + Math.pow(fromPos.y - toPos.y, 2));
            let angle = Math.atan2(toPos.y - fromPos.y, toPos.x - fromPos.x) * 180 / Math.PI;
            if (angle < 0) {
                angle += 360;
            }
            uiLink.size = new Vector2(distance, 10);
            mid.x = mid.x - uiLink.size.x / 2 + 5;
            mid.y = mid.y - uiLink.size.y / 2 + 5;
            uiLink.position = mid;
            // console.log(mid, Math.atan2(toPos.x - fromPos.x, toPos.y - fromPos.y) * 180 / Math.PI);
            uiLink.renderTransformAngle = angle;
        }
        this.techItemCanvas.addChild(uiLink);
        uiLink.zOrder = -1;
        linkItems(from, to);
        this.techItemCanvas.position = Utils.TEMP_VECTOR2.set(0, 0);
    }

    updateCanvasSize() {
        let size = this.techItemCanvas.size;
        let itemSize = 100;
        this.techItemCanvas.size = new Vector2(size.x, (itemSize + paddingY) * this.maxY - paddingY);
    }
}