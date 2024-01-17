export class Tools {

    public static isLocalPlayer(obj: mw.GameObject) {
        if (obj == null) {
            return false;
        }

        if ((obj instanceof mw.Character) == false) {
            return false;
        }

        let chara = obj as mw.Character;
        if (chara.player == null) {
            return false;
        }

        if (mw.Player.localPlayer == null) {
            return false;
        }

        if (chara.player != mw.Player.localPlayer) {
            return false;
        }

        return true;

    }


    public static isEmpty(data: any) {
        if (data == null) {
            return true;
        }
        if (data == undefined) {
            return true;
        }
        return false;
    }

}