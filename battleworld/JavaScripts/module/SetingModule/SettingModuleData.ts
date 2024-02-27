/** 
 * @Author       : zewei.zhang
 * @Date         : 2024-02-26 19:13:29
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2024-02-27 14:36:22
 * @FilePath     : \DragonVerse\battleworld\JavaScripts\module\SetingModule\SettingModuleData.ts
 * @Description  : 持久化设置
 */
export class SettingModuleData extends Subdata {
    @Decorator.persistence()
    public cameraSpeed: number;

    protected initDefaultData(): void {
        this.cameraSpeed = 0.5;
    }
}