/*
 * @Author: 余泓 hong.yu@appshahe.com
 * @Date: 2023-12-20 18:04:45
 * @LastEditors: 余泓 hong.yu@appshahe.com
 * @LastEditTime: 2023-12-20 18:40:57
 * @FilePath: \DragonVerse\JavaScripts\gameplay\map\MapManager.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { MapPanel } from "../../ui/map/MapPanel";


export class MapManager {

    private static _instance: MapManager = null;

    public static get instance(): MapManager {
        if (MapManager._instance == null) {
            MapManager._instance = new MapManager();
        }
        return MapManager._instance;
    }


    public showMap() {
        UIService.show(MapPanel);
    }

    public hideMap() {
        UIService.hide(MapPanel);
    }




}