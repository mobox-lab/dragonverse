import { PlayerActions } from "../Actions";
import PlayerModuleData from "../Modules/PlayerModule/PlayerModuleData";
import Utils from "../Utils";
import { GameConfig } from "../config/GameConfig";
import { UITechTree, UITechTreeNode } from "./ui/UITechTree";

interface ITechNode {
    id: number;
    name: string;
    description: string;
    requirements: number[];
    isUnlocked: boolean;
    children: ITechNode[];
    position: number[];
    icon: string;
}

export class TechNode implements ITechNode {
    id: number;
    name: string;
    description: string;
    requirements: number[];
    isUnlocked: boolean;
    children: TechNode[];
    position: number[];
    icon: string;
    drawNode: UITechTreeNode;
    requirementDrawNodes: Image[];
    parents: TechNode[];
    firstDraw: boolean = true;

    constructor(id: number, name: string, description: string, requirements: number[], position: number[], icon: string) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.requirements = requirements;
        this.isUnlocked = false;
        this.children = [];
        this.position = position;
        this.icon = icon;
        this.parents = [];
        this.requirementDrawNodes = [];

    }

    unlock(): boolean {
        if (this.canUnlock()) {
            this.isUnlocked = true;
            return true;
        }
        return false;
    }

    canUnlock(): boolean {
        return DataCenterC.getData(PlayerModuleData).unlockedTechNodes.indexOf(this.id) != -1;
        // Logic to determine if the node can be unlocked based on its requirements
        return true;
    }

    addChild(node: TechNode): void {
        this.children.push(node);
        node.parents.push(this);
        node.requirementDrawNodes.push(node.getRequirementDrawNode());
    }

    getDrawNode() {
        if (!this.drawNode) {
            this.drawNode = UIService.create(UITechTreeNode);
            this.drawNode.init(this);
        }
        return this.drawNode;
    }

    getRequirementDrawNode(): Image {
        let image = Image.newObject(null, this.id.toString());
        const layout = new UIConstraintAnchors(UIConstraintHorizontal.Left, UIConstraintVertical.Top);
        image.imageGuid = "114028";
        image.imageDrawType = SlateBrushDrawType.Box;
        image.margin = new Margin(0.2);
        image.size = new Vector2(10, 10);
        image.constraints = layout;
        image.visibility = SlateVisibility.Visible;
        return image;
    }

    draw() {
        const drawNode = this.getDrawNode();
        this.drawNode.mItem.normalImageGuid = this.icon;
        if (this.isUnlocked) {
            drawNode.mItem.normalImageColor = new LinearColor(1, 1, 1);
            drawNode.mLocked.visibility = SlateVisibility.Hidden;
        }
        else {
            if (this.metAllRequirements()) {
                drawNode.mItem.normalImageColor = new LinearColor(0.2, 0.2, 0.2);
                drawNode.mLocked.visibility = SlateVisibility.Hidden;
            }
            else {
                drawNode.mItem.normalImageColor = new LinearColor(0.05, 0.05, 0.05);
                drawNode.mLocked.visibility = SlateVisibility.HitTestInvisible;
            }
        }

        const techTreeUI = UIService.getUI(UITechTree);
        techTreeUI.addNode(drawNode, this.position);
        for (let i = 0; i < this.parents.length; i++) {
            let parent = this.parents[i];
            const requirementDrawNode = this.requirementDrawNodes[i];
            if (parent.isUnlocked) {
                requirementDrawNode.setImageColorByHex("#F4AA60");
            }
            else {
                requirementDrawNode.setImageColorByHex("#D2D0C2");
            }
            setTimeout(() => {
                techTreeUI.addLink(requirementDrawNode, this.position, parent.position);
            }, 1);
        }
        // this.firstDraw = false;
    }

    metAllRequirements(): boolean {
        for (let i = 0; i < this.parents.length; i++) {
            let parent = this.parents[i];
            if (!parent.isUnlocked) {
                return false;
            }
        }
        return true;
    }
}

export class TechTree {
    nodes: { [id: number]: TechNode };
    constructor() {
        this.nodes = {};
        this.init();

    }

    init() {
        let configs = GameConfig.TechTree.getAllElement();
        configs.forEach(config => {
            let id = config.ID;
            while (id > 1000) {
                id -= 1000;
            }
            config.NameKey = StringUtil.format(config.NameKey, Math.floor(id / 10) + 1);
            const node = new TechNode(config.ID, config.NameKey, "", config.Front, config.Position, config.Icon);
            this.nodes[node.id] = node;
        });

        for (let id in this.nodes) {
            const node = this.nodes[id];
            if (!node.requirements) continue;
            node.requirements.forEach(requirementId => {
                const parent = this.nodes[requirementId];
                parent?.addChild(node);
            });
        }

        PlayerActions.onPlayerDataChanged.add(() => {
            for (let id in this.nodes) {
                const node = this.nodes[id];
                node.unlock();
            }
            this.draw();
        });
    }

    draw() {
        for (let id in this.nodes) {
            const node = this.nodes[id];
            node.draw();
        }
    }

    show() {
        if (!Utils.checkLevel(GameConfig.Global.getElement(1).unlockTechLevel)) return;
        this.draw();
        UIService.show(UITechTree, this);
    }

    getNode(id: number) {
        return this.nodes[id];
    }
}
