import { MapEx } from "odin";
import { Singleton } from "../../tool/FunctionUtil";
import { Edit_BulletData } from "./Edit_BulletData";
import { GameConfig } from "../../config/GameConfig";

@Singleton()
export class Edit_BulletDataManager {
    public static instance: Edit_BulletDataManager = null;


    public _bulletDatas: Edit_BulletData[] = [];
    private _bulletMap: Map<number, Edit_BulletData> = new Map();


    public init() {
        let bulletCfgs = GameConfig.Bullet.getAllElement();

        for (let i = 0; i < bulletCfgs.length; i++) {
            let data = bulletCfgs[i];

            let strData = JSON.stringify(data);

            let newData: Edit_BulletData = JSON.parse(strData);

            this._bulletDatas.push(newData);
            this._bulletMap.set(newData.id, newData);
        }

    }

    /**获取子弹配置数据 */
    public getBulletData(id: number) {
        if (this._bulletMap.has(id) == false) {
            return;
        }
        return this._bulletMap.get(id);
    }

}