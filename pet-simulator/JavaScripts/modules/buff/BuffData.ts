import { MapEx } from "odin";
import { GlobalEnum } from "../../const/Enum";

export class BuffData extends Subdata {
 
    protected initDefaultData(): void {
 
    }

    
    /**
     * 重写数据名
     */
    public get dataName(): string {
        return "BuffData";
    }
}