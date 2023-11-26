import { IContext } from "./IContext";

export class CompanionContext implements IContext {



    /**
     * 主人位置
     */
    public ownerPosition: mw.Vector;

    /**
     * 主人的当前的移动向量
     */
    public ownerVelocity: mw.Vector;

}