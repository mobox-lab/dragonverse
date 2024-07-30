/** 
 * @Author       : xiaohao.li
 * @Date         : 2023-12-26 16:31:45
 * @LastEditors  : xiaohao.li
 * @LastEditTime : 2023-12-26 16:40:24
 * @FilePath     : \nevergiveup\JavaScripts\VersionTips.ts
 * @Description  : 修改描述
 */

@Component
export default class VersionTips extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isClient()) {
            const txtVersion = TextBlock.newObject(UIService.canvas, "txtVersion");
            const layout = new mw.UIConstraintAnchors(UIConstraintHorizontal.Left, UIConstraintVertical.Bottom);
            txtVersion.visibility = mw.SlateVisibility.Visible;
            txtVersion.size = new Vector2(15, 25);
            txtVersion.position = new Vector2(0, UIService.canvas.size.y - 25);
            txtVersion.fontSize = 15;

            txtVersion.textHorizontalLayout = mw.UITextHorizontalLayout.NoClipping;
            txtVersion.textJustification = mw.TextJustify.Left;
            txtVersion.constraints = layout;
            txtVersion.textVerticalJustification = mw.TextVerticalJustify.Top;
            let title: string = "";
            let language = mw.LocaleUtil.getDefaultLocale().toString().toLowerCase();
            if (!!language.match("zh")) {
                title = "版本号:";
            }
            if (!!language.match("en")) {
                title = "Version:"
            }
            Player.asyncGetLocalPlayer().then((player) => {
                txtVersion.text = `${title}${SystemUtil.isPIE ? "PIE_1.0.0" : RouteService.getGameVersion()} userId:${player.userId}`;
            });
        }
    }
}