/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-20 16:43:56
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-20 17:46:24
 * @FilePath: \DragonVerse\JavaScripts\ui\map\MapPanel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MapPanel_Generate from "../../ui-generate/map/MapPanel_generate";



const LeftTopPos: mw.Vector = new mw.Vector(25598, 35552, 0);
const LeftDownPos: mw.Vector = new mw.Vector(25598, -26447, 0);
const RightTopPos: mw.Vector = new mw.Vector(-25191, 35552, 0);

/**
 * 小地图UI
 */
export class MapPanel extends MapPanel_Generate {

    /**地图实际X长度 */
    private _length_X: number;
    /**地图实际Y长度 */
    private _length_Y: number;

    private _character: mw.Character;

    /**玩家头像跳动tween */
    private _iconMoveTween: Tween<any>;
    /**
     * 玩家当前位置
     */
    private _curPos: mw.Vector = mw.Vector.zero;

    private _durX: number;
    private _durY: number;
    private _smallMapPos: mw.Vector2 = mw.Vector2.zero;

    private _iconSize: mw.Vector2;

    private _iconMidPos: mw.Vector2 = mw.Vector2.zero;

    private _mapSize: mw.Vector2;

    protected onAwake(): void {

        this._length_X = Math.abs(LeftTopPos.x - RightTopPos.x);
        this._length_Y = Math.abs(LeftTopPos.y - LeftDownPos.y);

        let canvasSize = this.mSmallCanvas.size;
        this._iconSize = this.mSmallMineCanvas.size.clone();

        this._iconMidPos.x = (canvasSize.x - this._iconSize.x) / 2;
        this._iconMidPos.y = (canvasSize.y - this._iconSize.y) / 2;
        this._mapSize = this.mSmallMapCanvas.size.clone();
    }


    onShow() {
        this._character = Player.localPlayer.character;
        this.canUpdate = true;

        this.iconMove();
    }

    private iconMove() {

        let canvasSize = this.mSmallCanvas.size;
        let iconSize = this.mSmallMineCanvas.size;

        let x = (canvasSize.x - iconSize.x) / 2;
        let y = (canvasSize.y - iconSize.y) / 2;
        let pos = new mw.Vector2(x, 0);
        this._iconMoveTween = new Tween({ moveY: (y - 10) })
            .to({ moveY: y + 10 })
            .onUpdate(val => {
                pos.y = val.moveY;
                this.mSmallMineCanvas.position = pos;
            })
            .yoyo(true)
            .repeat(Infinity)
            .start()
    }




    onUpdate() {
        this.caculateMapPos();

    }


    private caculateMapPos() {
        if (this._character) {
            this._curPos.set(this._character.worldTransform.position);
            this._durX = this._iconMidPos.x - (Math.abs(this._curPos.x - LeftTopPos.x) / this._length_X * (this._mapSize.x - this._iconSize.x));
            this._durY = this._iconMidPos.y - (Math.abs(this._curPos.y - LeftTopPos.y) / this._length_Y * (this._mapSize.y - this._iconSize.y));
            this._smallMapPos.set(this._durX, this._durY);
            this.mSmallMapCanvas.position = this._smallMapPos;
        }
    }



    onHide() {
        this._iconMoveTween?.stop();
        this._iconMoveTween = null;
        this.canUpdate = false;
        this._character = null;
    }


}