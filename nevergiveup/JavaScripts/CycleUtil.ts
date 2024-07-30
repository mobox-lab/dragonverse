/*
 * @Author: shifu.huang
 * @Date: 2023-12-10 16:12:05
 * @LastEditors: shifu.huang
 * @LastEditTime: 2023-12-10 18:16:48
 * @FilePath: \nevergiveup\JavaScripts\CycleUtil.ts
 * @Description: 修改描述
 */
export namespace CycleUtil {
    let effectMapList: { [key: string]: mw.Effect[] } = {};
    let effectIndexMapList: { [key: string]: number } = {};
    const amount = 10;

    let uiMapList: { [key: string]: [number, UIScript[]] } = {};
    const uiAmount = 5;

    export async function playEffectOnPosition(guid: string, location: Vector, scale: Vector = Vector.one, color: LinearColor = null) {
        await AssetUtil.asyncDownloadAsset(guid);
        if (!effectMapList[guid]) {
            effectMapList[guid] = [];
        }
        if (effectMapList[guid].length < amount) {
            effectMapList[guid].push(GameObject.spawn(guid) as mw.Effect);
            effectIndexMapList[guid] = effectMapList[guid].length - 1;
        } else {
            effectIndexMapList[guid] = (effectIndexMapList[guid] + 1) % amount;
        }
        let effect = effectMapList[guid][effectIndexMapList[guid]];
        effect.worldTransform.position = location;
        effect.worldTransform.scale = scale;
        if (color) {
            effect.setColor("Color", color);
        }
        effect.forceStop();
        effect.play();
    }

    export async function playUIOnPosition(uiClass: new () => mw.UIScript, location: Vector2, layer: number = UILayerMiddle, ...params: any[]) {
        const guid = uiClass.name;
        let ui: UIScript;
        if (!uiMapList[guid]) {
            uiMapList[guid] = [0, []];
        }
        if (uiMapList[guid][1].length < uiAmount) {
            ui = UIService.create(uiClass);
            uiMapList[guid][1].push(ui);
            uiMapList[guid][0] = uiMapList[guid][1].length - 1;
        } else {
            uiMapList[guid][0] = (uiMapList[guid][0] + 1) % uiAmount;
        }
        ui = uiMapList[guid][1][uiMapList[guid][0]];
        ui.rootCanvas.position = location;
        UIService.showUI(ui, layer, ...params);
    }

    export async function playEffectOnPlayerSlot(character: mw.Character, guid: string, slot: mw.HumanoidSlotType) {
        await AssetUtil.asyncDownloadAsset(guid);
        if (!effectMapList[guid]) {
            effectMapList[guid] = [];
        }
        if (effectMapList[guid].length < amount) {
            effectMapList[guid].push(GameObject.spawn(guid) as mw.Effect);
            effectIndexMapList[guid] = effectMapList[guid].length - 1;
        }
        else {
            effectIndexMapList[guid] = (effectIndexMapList[guid] + 1) % amount;
        }
        let effect = effectMapList[guid][effectIndexMapList[guid]];
        if (effect) {
            character.attachToSlot(effect, slot);
            effect.localTransform.position = (new Vector(0, 0, 0));
            effect.forceStop();
            effect.play();
        }
    }
}