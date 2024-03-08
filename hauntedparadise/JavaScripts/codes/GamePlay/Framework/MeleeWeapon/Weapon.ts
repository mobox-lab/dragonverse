
import { WeaponData } from "./WeaponDef";
import { WeaponServer } from "./WeaponServer";

WeaponData.focusFilter = (go: mw.GameObject) => {
    return (go instanceof mw.Pawn);
}

/** 冷兵器类 */
@Component
export default class Weapon extends WeaponServer {

    onStart() {
        super.onStart();
        this.useUpdate = true;
    }

    onUpdate(dt: number) {
        super.onUpdate(dt);
    }



    protected onDestroy(): void {
        super.onDestroy();

    }

}