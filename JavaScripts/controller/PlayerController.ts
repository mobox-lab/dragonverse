import { Singleton } from "../depend/singleton/Singleton";
import { KeyboardManager } from "./KeyboardManager";

export class PlayerController extends Singleton<PlayerController>() {


    private _velocity: mw.Vector = mw.Vector.zero;


    protected onConstruct(): void {

        KeyboardManager.getInstance().onKeyDown.add((key) => {

            if (key === mw.Keys.SpaceBar) {

                mw.Player.localPlayer.character.jump();
            }
        })
        TimeUtil.onEnterFrame.add(this.onEnterFrame, this)
    }

    private onEnterFrame(dt: number): void {
        this._velocity.set(0, 0, 0)

        const keyBoard = KeyboardManager.getInstance();

        keyBoard.isKewDown(mw.Keys.W) && this._velocity.x++;
        keyBoard.isKewDown(mw.Keys.S) && this._velocity.x--;
        keyBoard.isKewDown(mw.Keys.A) && this._velocity.y--;
        keyBoard.isKewDown(mw.Keys.D) && this._velocity.y++;


        mw.Player.localPlayer.character.addMovement(this._velocity)


    }

}