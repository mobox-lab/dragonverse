/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-20 16:43:56
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-21 13:46:28
 * @FilePath: \DragonVerse\JavaScripts\ui\map\MapPanel.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import MapPanel_Generate from "../../ui-generate/map/MapPanel_generate";
import Log4Ts from "../../depend/log4ts/Log4Ts";

const LeftTopPos: mw.Vector = new mw.Vector(25598, 35552, 0);
const LeftDownPos: mw.Vector = new mw.Vector(25598, -26447, 0);
const RightTopPos: mw.Vector = new mw.Vector(-25191, 35552, 0);

/**
 * 小地图 Panel.
 */
export class MapPanel extends MapPanel_Generate {
    /**
     * 地图实际X长度
     */
    private _lengthX: number;

    /**
     * 地图实际Y长度
     */
    private _lengthY: number;

    private _character: mw.Character;

    /**
     * 玩家当前位置
     */
    private _curPos: mw.Vector = mw.Vector.zero;

    private _smallMapPos: mw.Vector2 = mw.Vector2.zero;

    private _iconSize: mw.Vector2;

    private _iconMidPos: mw.Vector2 = mw.Vector2.zero;

    private _mapSize: mw.Vector2;

    protected onAwake(): void {
        super.onAwake();
        this._lengthX = Math.abs(LeftTopPos.x - RightTopPos.x);
        this._lengthY = Math.abs(LeftTopPos.y - LeftDownPos.y);

        let canvasSize = this.mSmallCanvas.size;
        this._iconSize = this.mSmallMineCanvas.size.clone();

        this._iconMidPos.x = (canvasSize.x - this._iconSize.x) / 2;
        this._iconMidPos.y = (canvasSize.y - this._iconSize.y) / 2;
        this._mapSize = this.mSmallMapCanvas.size.clone();

        this.btnMiniMap.onClicked.add(
            () => {
                Log4Ts.log(MapPanel, `clicked.`);
            },
        );
    }

    onShow() {
        this._character = Player.localPlayer.character;
        this.canUpdate = true;
    }

    onUpdate() {
        this.calculateMapPos();
    }

    private calculateMapPos() {
        if (this._character) {
            this._curPos.set(this._character.worldTransform.position);
            this._smallMapPos.set(
                this._iconMidPos.x - (Math.abs(this._curPos.x - LeftTopPos.x) / this._lengthX * (this._mapSize.x - this._iconSize.x)),
                this._iconMidPos.y - (Math.abs(this._curPos.y - LeftTopPos.y) / this._lengthY * (this._mapSize.y - this._iconSize.y)),
            );
            this.mSmallMapCanvas.position = this._smallMapPos;
            this.mSmallMineCanvas.renderTransformAngle = this._character.worldTransform.rotation.z - 90;
        }
    }
}