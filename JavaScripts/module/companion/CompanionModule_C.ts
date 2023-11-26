import { CompanionData } from "./CompanionData";
import { CompanionModule_S } from "./CompanionModule_S";


export class CompanionModule_C extends ModuleC<CompanionModule_S, CompanionData>{


    private _cachedCompanionIdList: string[] = [];

    private _isCacheCompanionIdListDirty: boolean = true;

    public getPlayerCompanionIdList(): string[] {

        if (this._cachedCompanionIdList.length > 0) {

            return this._cachedCompanionIdList;
        }

        let data = this.data.carriedCompanion;

        if (this._isCacheCompanionIdListDirty) {

            this._cachedCompanionIdList = data;
            this._isCacheCompanionIdListDirty = false;
        }

        return this._cachedCompanionIdList;
    }




}


