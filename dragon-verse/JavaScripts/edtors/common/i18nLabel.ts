import i18n from "../../language/i18n";

@mw.Serializable
export class I18nLabel {


    @mw.Property({ displayName: "默认文本" })
    public text: string = ''


    @mw.Property({ displayName: "多语言配置", onChangedInEditor: "onI18nChanged" })
    public i18n: string = ''

    toString() {
        return this.text;
    }


    onI18nChanged() {

        this.text = i18n.lan(this.i18n);
    }

}