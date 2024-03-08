import { AddGMCommand } from "module_gm";
import { playerPathData } from "./pathData";

const arr = [];

AddGMCommand("生成小方块", async () => {
    arr.forEach(e => {
        e.destroy();
    })
    arr.length = 0;
    for (let index = 0; index < playerPathData.length; index++) {
        const element = playerPathData[index];
        let pos = element.pos.split("|");
        let vec = new Vector(Number(pos[0]), Number(pos[1]), Number(pos[2]));
        let go = await GameObject.asyncSpawn("E88E83354186E243F54B90A22C94CAFE");
        arr.push(go);
        go.worldTransform.position = vec;
        let ui = go.getChildByName("UI") as UIWidget;
        let _textView = ui.getTargetUIWidget().findChildByPath("RootCanvas/num_txt") as mw.TextBlock;
        _textView.text = element.time.toFixed(0);
    }


})

