import { ArchiveData } from "./codes/modules/archive/ArchiveHelper";
import { DegreeType } from "./codes/modules/blackboard/BoardDefine";
export const getIsRefresh = (data: ArchiveData) => {
    return !data.isInitClues;
}
export const targetVersion = 1;

/** 策划可以配置的代码 */
export class GlobalDefine {

    /** 菜单默认显示的难度等级 */
    public static defaultDegree: DegreeType = DegreeType.Simple;

    /** 鬼现身的最低难度(需要大于或者等于这个难度才会出来) */
    public static minDegree: DegreeType = DegreeType.Simple;

    /** 标题前缀key前缀 现在都是用的这个前缀，最好别动，会丢数据 */
    public static TitlePrefix = "ScarySchool_";

    // TODO: 存取数据的主包游戏ID
    public static MainPackageGameID: string = "";

    /** 是否是第三人称 */
    public static isThirdPerson: boolean = false;
}