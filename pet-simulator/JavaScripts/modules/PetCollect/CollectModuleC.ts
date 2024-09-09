

import { GameConfig } from "../../config/GameConfig";
import { GlobalData } from "../../const/GlobalData";
import { utils } from "../../util/uitls";
import { PlayerNameManager } from "../Trading/PlayerNameManager";
import { CollectModuleData } from "./CollectModuleData";
import { CollectModuleS } from "./CollectModuleS";
import { P_Collect } from "./P_Collect";

export class CollectModuleC extends ModuleC<CollectModuleS, CollectModuleData> {

    private petPanel: P_Collect;
    // private petHover: P_PetHover;

    /**全服宠物数 */
    private petCountMap: Map<number, number> = new Map<number, number>();

    public collectCountAC: Action1<number> = new Action1();

    protected onStart(): void {
        this.initEvent();
        if (this.data.HasArr.length > 0 && !this.data.HasArr.includes(this.data.HasArr[0])) {
            this.addPet(this.data.HasArr[0]);
        }
    }

    // protected onEnterScene(sceneType: number): void {
    //     this.isShowAndHideUnlockBtn();
    // }

    // private curAddLevel: number = 0;
    /**是否显示解锁图签等级按钮 */
    // private isShowAndHideUnlockBtn(): void {
    //     let levelCount = GlobalData.Collect.levelCount;
    //     let petCount = this.data.HasArr.length;
    //     let level = this.data.level;
    //     this.curAddLevel = 0;
    //     for (let i = levelCount.length - 1; i >= 0; --i) {
    //         if (petCount >= levelCount[i] && level < i + 2) {
    //             this.curAddLevel = i + 2 - level;
    //             break;
    //         }
    //     }
    //     if (this.curAddLevel == 0) return;
    //     // this.petPanel.switchState(true);
    // }

    // public setCurAddLevel(): void {
    //     if (this.curAddLevel == 0) return;
    //     this.addLevel(this.curAddLevel);
    //     this.curAddLevel = 0;
    // }

    private initEvent() {
        this.petPanel = mw.UIService.getUI(P_Collect);
        // this.petHover = mw.UIService.getUI(P_PetHover);

        this.petPanel.mCloseBtn.onClicked.add(() => {
            this.petPanel.hide();
            // this.petHover.hide();
        })
        this.data.onHasChangeAC.add(this.onHasChange, this);
        this.data.onLevelChangeAC.add(this.levelChange.bind(this))
    }
    private onHasChange(id: number) {
        // this.isShowAndHideUnlockBtn();
        this.petPanel.setCurHasCount(this.data.HasArr.length, this.data.level);
        this.collectCountAC.call(this.data.HasArr.length);
    }
    private levelChange(num: number) {
        this.petPanel.setLevel(this.data.level);
        this.petPanel.setCurHasCount(this.data.HasArr.length, this.data.level);
    }

    public showCollectUI() {
        this.petPanel.show();
        this.petPanel.initUI(this.data.HasArr, this.data.level);
    }

    /**添加解锁宠物 */
    public addPet(id: number) {
        this.server.net_AddPet(id);
    }

    // public addLevel(value: number) {
    //     this.server.net_addLevle(value);
    // }


    /**获取全服玩家宠物数 */
    public net_getCollectCount(str: string) {
        let arr = JSON.parse(str);
        arr.forEach((item: { id: number, count: number }) => {
            this.petCountMap.set(item.id, item.count);
        })
    }
    public async net_petNotice(playerId: number, index: number) {
        let name = await PlayerNameManager.instance.getPlayerNameAsync(playerId);
        let petName = GlobalData.Notice.collectPetCount[index];
        let str = utils.Format(GameConfig.Language.World_Tips_12.Value, petName);
        str = name + " " + str;
        // mw.UIService.getUI(P_GlobalTips).showTips(str);
    }

    /**获取宠物id 数 */
    public getCollectCount(id: number): number {
        if (this.petCountMap.has(id)) {
            return this.petCountMap.get(id);
        }
        return 0;
    }

}