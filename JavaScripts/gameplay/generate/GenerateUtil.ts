import Log4Ts, { Announcer } from "../../depend/log4ts/Log4Ts";
import Enumerable from "linq";

export function getGenerationPointMap(tag: string, announcer: Announcer) {
    const result = new Map();
    const holder = GameObject.findGameObjectsByTag(tag)[0];
    if (!holder || holder.getChildren().length === 0) {
        Log4Ts.error(announcer, `couldn't find holder or any child in it by tag: ${tag}`);
        return null;
    }
    Enumerable
        .from(holder.getChildren())
        .forEach(item => {
            const id = Number(item.tag);
            if (id === Number.NaN) return;
            let vecArr = result.get(id);
            if (!vecArr) {
                vecArr = [];
                result.set(id, vecArr);
            }
            vecArr.push(item.worldTransform.position);
        });
    return result;
}