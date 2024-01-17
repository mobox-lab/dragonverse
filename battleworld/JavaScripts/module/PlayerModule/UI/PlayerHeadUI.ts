import PlayerHeadUI_Generate from "../../../ui-generate/PlayerHeadUI_generate";
import { util } from "../../../tool/Utils";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { GameConfig } from "../../../config/GameConfig";
import { Attribute } from "../sub_attribute/AttributeValueObject";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { EAttributeEvents_C, ENotice_Events_S } from "../../../const/Enum";

export default class PlayerHeadUI extends PlayerHeadUI_Generate {

    public atrributeMD: AttributeModuleC = null;

    public playerName: string = "";

    public lv: number = 11;

    private curval: number = 1;

    private target: number = 1;

    private bindPId: number = 0;

    private _curRank: number = 0;


    protected onStart(): void {
        this.canUpdate = true;


        this.mBountyCanvas.visibility = mw.SlateVisibility.Collapsed;

        EventManager.instance.add(EAttributeEvents_C.Attribute_MassacreValue_C, this.listen_massacreValue, this);



        let visibility2 = Globaldata.default_open_danUI ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mRankCanvas.visibility = visibility2;
    }

    onUpdate() {

        if (this.bindPId == mw.Player.localPlayer.playerId) {
            this.curval = this.mOwn_bar_hp_back.currentValue;
            this.mOwn_bar_hp_back.currentValue = util.lerp(this.curval, this.target, 0.1)
        } else {
            this.curval = this.mEnemyName_bar_hp_back.currentValue;
            this.mEnemyName_bar_hp_back.currentValue = util.lerp(this.curval, this.target, 0.1)
        }

    }

    /**绑定id */
    public setBindPId(pId: number) {
        this.bindPId = pId;

        if (this.bindPId == mw.Player.localPlayer.playerId) {
            this.setHpUI(true);
        } else {
            this.setHpUI(false);
        }

        this.refresh_massacreValue();
        if (this.bindPId < 0) {
            this.mRankCanvas.visibility = mw.SlateVisibility.Collapsed;
            this.mBountyCanvas.visibility = mw.SlateVisibility.Collapsed;
        }

    }

    /**监听玩家杀戮值变化 */
    private listen_massacreValue(pId: number) {
        if (pId != this.bindPId) {
            return;
        }
        this.refresh_massacreValue();
    }

    /**刷新玩家杀戮值 */
    private refresh_massacreValue(init: boolean = false) {
        // 不需要刷新
        if (this.bindPId <= 0) {
            return;
        }

        if (this.atrributeMD == null) {
            this.atrributeMD = ModuleService.getModule(AttributeModuleC);
        }
        let massacreValue = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.massacreValue, this.bindPId);
        if (massacreValue == 0) {
            if (this.mBountyCanvas.visible) {
                this.mBountyCanvas.visibility = mw.SlateVisibility.Collapsed;
            }
            return;
        }
        if (this.mBountyCanvas.visible == false) {
            this.mBountyCanvas.visibility = mw.SlateVisibility.SelfHitTestInvisible;
        }

        if (init) {
            let visibility1 = Globaldata.default_open_massacreUI ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
            this.mBountyCanvas.visibility = visibility1;
        }


        let addGold = massacreValue * Globaldata.massacre_base_moneyReward;
        this.mBountyNumber_txt.text = addGold.toString();
    }


    public refash(maxHp: number, curHp: number) {
        //oTrace("refash_______________", maxHp, curHp);
        this.target = curHp / maxHp;

        if (this.bindPId == mw.Player.localPlayer.playerId) {
            this.mOwn_bar_hp.currentValue = this.target;
        } else {
            this.mEnemy_bar_hp.currentValue = this.target;
        }

    }

    public setName(name: string, lv: number) {
        if (name == null || name == "") {
            name = this.playerName;
        }

        if (lv == null) {
            lv = this.lv;
        }

        this.mEnemyName_txt.text = name;
        this.mOwnName_txt.text = name;
        this.playerName = name;
        this.lv = lv;
    }
    /**
     * 设置段位头顶ui表现
     */
    public setRank(rankId: number) {
        if (rankId == this._curRank) return;
        let cfg = GameConfig.Rank.getElement(rankId);
        if (cfg.rankImgID) {
            this.mRankIcon_txt.imageGuid = cfg.rankImgID;
        }
        this.mRankName_txt.text = cfg.rankName;
    }
    /**
     * 设置段位显隐,0隐藏，1显示
     */
    public setRankVis(vis: number) {
        this.mRankCanvas.visibility = vis ? mw.SlateVisibility.SelfHitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setColor(color: string, backcolor: string) {
        this.mEnemy_bar_hp.fillImageColor = mw.LinearColor.colorHexToLinearColor(color);
        this.mEnemyName_bar_hp_back.fillImageColor = mw.LinearColor.colorHexToLinearColor(backcolor);
    }

    public setHpVisible(visible: boolean) {


        if (visible) {
            this.mOwn_bar_hp.visibility = mw.SlateVisibility.HitTestInvisible;
            this.mOwn_bar_hp_back.visibility = mw.SlateVisibility.HitTestInvisible;
            this.mEnemy_bar_hp.visibility = mw.SlateVisibility.HitTestInvisible;
            this.mEnemyName_bar_hp_back.visibility = mw.SlateVisibility.HitTestInvisible;
            this.hpImageOwn.visibility = mw.SlateVisibility.HitTestInvisible;
            this.hpImageEnemy.visibility = mw.SlateVisibility.HitTestInvisible;
        } else {
            this.mOwn_bar_hp.visibility = mw.SlateVisibility.Collapsed;
            this.mOwn_bar_hp_back.visibility = mw.SlateVisibility.Collapsed;
            this.mEnemy_bar_hp.visibility = mw.SlateVisibility.Collapsed;
            this.mEnemyName_bar_hp_back.visibility = mw.SlateVisibility.Collapsed;
            this.hpImageOwn.visibility = mw.SlateVisibility.Collapsed;
            this.hpImageEnemy.visibility = mw.SlateVisibility.Collapsed;
        }

    }

    public setHeadUIVisable(visible: boolean) {
        this.rootCanvas.visibility = visible ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
    }

    public setHpUI(isOwn: boolean) {
        this.mOwnHP.visibility = isOwn ? mw.SlateVisibility.HitTestInvisible : mw.SlateVisibility.Collapsed;
        this.mEnemyHP.visibility = isOwn ? mw.SlateVisibility.Collapsed : mw.SlateVisibility.HitTestInvisible;
    }

    /**
     * 展示npc的头顶ui表现
     */
    public rankNpcHeadUI() {
        this.setHpVisible(false);
        this.rootCanvas.renderScale = Globaldata.npc_headUISize;
        this.setRankVis(1);
        this.setHpUI(true);
    }

}
