import { HeadUIPart } from "./HeadUIPart";

@mw.Component
export default class PetEntity extends mw.Script {




    public get dragon() {
        return this.gameObject as mw.Character;
    }

    /**
     * 跟随者
     */
    private _owner: mw.Character;

    @mw.Property({ replicated: true, onChanged: "onStart" })
    private _ownerId: string;

    @mw.Property({ replicated: true, onChanged: "onNickNameChanged" })
    private _nickName: string;

    private _headUI: HeadUIPart;





    protected onStart(): void {

        if (mw.SystemUtil.isClient()) {

            if (!this._ownerId) {
                return;
            }

            this._owner = mw.GameObject.findGameObjectById(this._ownerId) as mw.Character;

            this.onNickNameChanged();
        }
    }



    private onNickNameChanged() {

        if (!this._headUI) {
            this._headUI = new HeadUIPart(this.dragon, "14062C944FAD738B13E044A8F5FF8084");
        }

        this._headUI.setNickName(this._nickName);
    }







}