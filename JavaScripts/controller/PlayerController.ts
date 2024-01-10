import Log4Ts, { DebugLevels } from "../depend/log4ts/Log4Ts";
import { Singleton } from "../depend/singleton/Singleton";
import { KeyboardManager } from "./KeyboardManager";

export class PlayerController extends Singleton<PlayerController>() {

    private _isSwimingInArea1 = false;
    private _isSwimingInArea2 = false;
    private _velocity: mw.Vector = mw.Vector.zero;

    protected onConstruct(): void {

        let swimArea1 = GameObject.findGameObjectById("0431AECB") as SwimmingVolume;
        let swimArea2 = GameObject.findGameObjectById("2A9D1832") as SwimmingVolume;
        swimArea1.onEnter.add((go) => {
            Player.asyncGetLocalPlayer().then((player) => {
                if (go instanceof Character && go === player.character) {
                    this._isSwimingInArea1 = true;
                }
            })
        });
        swimArea2.onEnter.add((go) => {
            Player.asyncGetLocalPlayer().then((player) => {
                if (go instanceof Character && go === player.character) {
                    this._isSwimingInArea2 = true;
                }
            })
        });
        swimArea1.onLeave.add((go) => {
            Player.asyncGetLocalPlayer().then((player) => {
                if (go instanceof Character && go === player.character) {
                    this._isSwimingInArea1 = false;
                }
            })
        });
        swimArea2.onLeave.add((go) => {
            Player.asyncGetLocalPlayer().then((player) => {
                if (go instanceof Character && go === player.character) {
                    this._isSwimingInArea2 = false;
                }
            })
        });


        KeyboardManager.getInstance().onKeyDown.add((key) => {

            if (key === mw.Keys.SpaceBar) {
                if (!this._isSwimingInArea1 && !this._isSwimingInArea2) {
                    mw.Player.localPlayer.character.jump();
                } else {
                    actions.tween(Player.localPlayer.character.worldTransform).to(10,
                        { position: Player.localPlayer.character.worldTransform.position.clone().add(new Vector(0, 0, 100)) },).call(() => {
                            Player.localPlayer.character.jump();
                        }).start();
                }
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