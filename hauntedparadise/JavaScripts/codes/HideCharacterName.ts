
@Component
export default class HideCharacterName extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        let char = this.gameObject as Character;
        char.asyncReady().then(char => {
            char.displayName = "";
        })
    }
}