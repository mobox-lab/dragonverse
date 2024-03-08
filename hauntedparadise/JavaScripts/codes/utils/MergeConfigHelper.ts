import { ConfigBase, IElementBase } from "../../config/ConfigBase";

/** 将两个结构相同的配置合并到一个 */
export default class MergeConfigHelper {

    /**
     * 将config2的所有元素并入导config1 ( 那种有ReadByName的合不了哈 )
     * @param config1 配置1
     * @param config2 配置2
     */
    public static merge(config1: ConfigBase<IElementBase>, config2: ConfigBase<IElementBase>) {

        for (let i = 0; i < config2["ELEMENTARR"].length; i++) {
            if(config1["ELEMENTARR"].filter(v => {return v.id === config2["ELEMENTARR"][i].id}).length === 0)  {
                config1["ELEMENTARR"].push(config2["ELEMENTARR"][i]);
            }
        }

        config2["ELEMENTMAP"].forEach((v, k) => {
            config1["ELEMENTMAP"].set(k, v);
        })

        // 这个好像没什么用
        config2["KEYMAP"].forEach((v, k) => {
            config1["KEYMAP"].set(k, v);
        })
    }
}