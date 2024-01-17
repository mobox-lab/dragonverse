import { GameConfig } from "../../../config/GameConfig";
import { EModule_Events } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { util } from "../../../tool/Utils";
import MainDeadMask_Generate from "../../../ui-generate/Main/MainDeadMask_generate";
import { AttributeModuleC } from "../../AttributeModule/AttributeModuleC";
import { Attribute } from "../sub_attribute/AttributeValueObject";




export class MainDeadMask extends MainDeadMask_Generate {

    /**属性模块*/
    private atrributeMD: AttributeModuleC;

    /**渐变动画*/
    private tweenFade: mw.Tween<any> = null;

    onStart() {
        this.atrributeMD = ModuleService.getModule(AttributeModuleC);
        this.layer = mw.UILayerTop;
        this.fadeCanvas.visibility = mw.SlateVisibility.Collapsed;
        EventManager.instance.add(EModule_Events.player_Dead, this.listent_PlayerDead.bind(this));
        EventManager.instance.add(EModule_Events.player_Resurgence, this.listent_Resurgence.bind(this));
    }


    private listent_PlayerDead(uid: number, rankScore: number) {
        if (uid) {
            this.mdeadNameTip.visibility = mw.SlateVisibility.Visible;
            let name = this.atrributeMD.getAttributeValue(Attribute.EnumAttributeType.playerName, uid);
            this.mdeadNameTip.text = util.getLanguageByKey("battal_dead_02", [name]);
        } else {
            this.mdeadNameTip.visibility = mw.SlateVisibility.Collapsed;
        }
        if (rankScore < 0) {
            this.mRank.text = StringUtil.format(GameConfig.Language.Tips_rank_2.Value, -rankScore);
        }
        else {
            this.mRank.text = StringUtil.format(GameConfig.Language.Tips_rank_1.Value, rankScore);
        }
        this.listent_fade(true, Globaldata.deathTime);
    }

    private listent_Resurgence() {
        this.fadeCanvas.visibility = mw.SlateVisibility.Collapsed;
        //this.listent_fade(true, Globaldata.reviveTime);      //todo 金币计算

    }

    private listent_fade(isDead: boolean, time: number) {

        if (this.tweenFade) {
            this.tweenFade.stop();
        }

        let start = isDead ? 0 : 1
        let end = isDead ? 1 : 0

        this.tweenFade = new mw.Tween({ alpha: start }).to({ alpha: end }, time * 1000)
            .onUpdate((data) => {
                this.fadeCanvas.renderOpacity = data.alpha;
            })
            .onComplete(() => {
                this.fadeCanvas.visibility = mw.SlateVisibility.Collapsed;
            }).onStart(() => {
                this.fadeCanvas.visibility = mw.SlateVisibility.Visible;
            })

        this.tweenFade.start();
    }



}