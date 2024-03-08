import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";

export class DifficultItemCacheData {
    public collsionStat: CollisionStatus | PropertyStatus;
    public visiableStat: PropertyStatus;
}

export const DifficultItemKey = "difficultEnable";

@Component
export default class DifficultItem extends Script {
    @Property({ displayName: "难度等级", tooltip: "需要大于或者等于这个难度等级才会显示出来的东西" })
    public level: number = 0;

    private _cacheData: DifficultItemCacheData;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        Event.addLocalListener(BoardHelper.BoardValueChangeEvent, (key: string, value: string) => {
            if (key != BoardKeys.Degree) {
                return;
            }
            let degree = Number(value);
            this.gameObject[DifficultItemKey] = true;
            if (this.level > degree) {
                if (!this._cacheData) {
                    this._cacheData = new DifficultItemCacheData();
                    this._cacheData.collsionStat = this.gameObject.getCollision();
                    this._cacheData.visiableStat = this.gameObject.getVisibility() ? PropertyStatus.On : PropertyStatus.Off
                }
                this.gameObject.setCollision(CollisionStatus.Off, true);
                this.gameObject.setVisibility(PropertyStatus.Off);
                return;
            }
            if (!this._cacheData) {
                return;
            }
            this.gameObject.setCollision(CollisionStatus.On, true);
            this.gameObject.setVisibility(this._cacheData.visiableStat);
        })
    }
}