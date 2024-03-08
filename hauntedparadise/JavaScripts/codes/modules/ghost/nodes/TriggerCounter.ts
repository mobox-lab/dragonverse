export class TriggerCounter {
    private _enterplayers: number[] = [];
    public constructor(guid: string) {
        GameObject.asyncFindGameObjectById(guid).then(tri => {
            this.init(tri as Trigger);
        })
        Player.onPlayerLeave.add(player => {
            let index = this._enterplayers.indexOf(player.playerId);
            if (index != -1) {
                this._enterplayers.splice(index, 1);
            }
        })
    }


    public getPlayer(): Player {
        if (this._enterplayers.length == 0) {
            return null;
        }
        let playerId = this._enterplayers[0]
        let player = Player.getPlayer(playerId);
        if (!player) {
            this._enterplayers.splice(0, 1);
            return null;
        }
        return player;
    }

    private init(tri: Trigger) {
        tri.onEnter.add((char: Character) => {
            if (!char.player) {
                return;
            }
            let index = this._enterplayers.indexOf(char.player.playerId);
            if (index == -1) {
                this._enterplayers.push(char.player.playerId);
            }
        })
        tri.onLeave.add((char: Character) => {
            if (!char.player) {
                return;
            }
            let index = this._enterplayers.indexOf(char.player.playerId);
            if (index != -1) {
                this._enterplayers.splice(index, 1);
            }
        })
    }
}