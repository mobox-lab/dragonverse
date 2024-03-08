import Color_UI_Generate from "../../../../../ui-generate/ShareUI/Color_UI_generate";

export abstract class BaseRecUI extends Color_UI_Generate {

    protected _maskBtnArray: mw.MaskButton[] = [];

    protected _cavsRotArray: Canvas[] = [];

    protected abstract get bindGo(): GameObject;

    onStart() {
        this.btn_back.onClicked.add(() => {
            UIService.hideUI(this);
        })
        for (let index = 0; index < 4; index++) {
            this._maskBtnArray.push(this[`maskBtn_${index}`]);
        }
        for (let index = 0; index < 3; index++) {
            this._maskBtnArray.push(this[`maskBtn_bingo${index + 1}`]);
        }
        for (let index = 0; index < 3; index++) {
            this._cavsRotArray.push(this[`canvas_rotate${index + 1}`]);
        }
        this.btn_hand.onClicked.add(() => {
            this.onCheckRotation();
        })
        this.mVirtualJoystickPanel.onInputDir.add(() => {
            const dis = Vector.distance(Player.localPlayer.character.worldTransform.position, this.bindGo.worldTransform.position);
            if (dis > 500) {
                UIService.hideUI(this);
            }
        })
    }

    protected resetUI() {
        this._maskBtnArray.forEach(e => {
            e.visibility = SlateVisibility.Collapsed;
        })

        this._cavsRotArray.forEach(e => {
            e.visibility = SlateVisibility.Collapsed;
        })

        this.mVirtualJoystickPanel.resetJoyStick();
    }

    protected abstract onCheckRotation();
}