import { QualityTypes } from "../const/QualityTypes";
import ScriptObject from "./common/ScriptObject";
import { I18nLabel } from "./common/i18nLabel";




export class UI extends mw.UIScript {



    onStart() {

        this.canUpdate
    }

    onUpdate() {

    }
}

@Component
export default class DragonInfo extends ScriptObject {




    @mw.Property({ displayName: "昵称", "group": "DragonInfo" })
    public nickName: I18nLabel = new I18nLabel();

    @mw.Property({ displayName: "龙品质", "group": "DragonInfo", enumType: QualityTypes })
    public quality: QualityTypes = QualityTypes.None;




    clone(outer: { [K in Exclude<keyof this, keyof ScriptObject>]: this[K]; }): { [K in Exclude<keyof this, keyof ScriptObject>]: this[K]; } {
        outer.nickName = this.nickName;
        outer.quality = this.quality;

        return outer;
    }


}

