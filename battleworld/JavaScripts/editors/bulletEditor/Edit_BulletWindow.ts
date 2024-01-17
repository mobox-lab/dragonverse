import { Singleton } from "../../tool/FunctionUtil";
import { UIMultiScroller } from "../../tool/UIMultiScroller";
import Edit_Bullet_Data_generate from "../../ui-generate/editor_bullet/Edit_Bullet_Data_generate";


@Singleton()
export class Edit_BulletWindow {
    public static instance: Edit_BulletWindow = null;

    private _bulletView: Edit_Bullet_Data_generate = null;

    private _btnScroll: UIMultiScroller = null;

    private _dataScroll: UIMultiScroller = null;

    public init() {



        this._bulletView = mw.UIService.create(Edit_Bullet_Data_generate);

    }

}