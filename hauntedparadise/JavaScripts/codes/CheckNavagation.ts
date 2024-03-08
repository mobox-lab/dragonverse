import { AddGMCommand } from "module_gm";
import { GameConfig } from "../config/GameConfig";

class CacheData {
    public pos: Vector;
    public cfgId: number;
    public index: number;
}

AddGMCommand("检测导航数据", () => {
    let cfgs = GameConfig.GhostInstance.getAllElement();
    let path: CacheData[] = [];
    cfgs.forEach(e => {
        for (let index = 0; index < e.patrols.length; index++) {
            const element = e.patrols[index];
            let data = new CacheData();
            data.pos = element;
            data.index = index;
            data.cfgId = e.id;
            path.push(data);
        }
    })

    let func = () => {
        if (path.length == 0) {
            return;
        }
        let nextData = path.pop();
        Navigation.navigateTo(Player.localPlayer.character, nextData.pos, 0, () => {

        }, () => {
            console.error("error on finding path cfgId" + nextData.cfgId + ":" + nextData.pos);
        });
        setTimeout(() => {
            func();
        }, 200);
    }
    func();
})