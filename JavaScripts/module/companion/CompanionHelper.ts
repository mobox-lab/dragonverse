import { GameConfig } from "../../config/GameConfig";

export module CompanionHelper {


    let _bagIdReflect: Map<number, number> = undefined;

    export function isDragon(bagId: number) {

        return !!queryDragonCharacterIdByBagId(bagId)


    }




    /**
     * 通过背包id查询 该背包id对应在GameConfig.CharacterfulDragon中的id
     * @param bagId 
     * @returns 
     */
    export function queryCharacterfulDragonIdByBagId(bagId: number) {
        return queryDragonCharacterIdByBagId(bagId);
    }

    /**
     * 通过背包id查询 该背包id对应GameConfig.CharacterfulDragon中的存储的dragonId
     * @param bagId 
     */
    export function queryDragonIdByBagId(bagId: number) {
        let characterId = queryDragonCharacterIdByBagId(bagId);
        let characterInfo = GameConfig.CharacterfulDragon.getElement(characterId);

        if (characterInfo) {
            return characterInfo.dragonId;
        }
        return undefined;
    }


    function queryDragonCharacterIdByBagId(bagId: number) {

        if (!_bagIdReflect) {
            _bagIdReflect = new Map();
            GameConfig.CharacterfulDragon.getAllElement().forEach((value) => {
                _bagIdReflect.set(value.bagId, value.id);
            })
        }

        return _bagIdReflect.get(bagId);
    }

    /**
     * 获取伙伴类型
     * @param companionId 
     * @returns 
     */
    export function getCompanionType(bagId: number) {
        let dragonId = queryDragonIdByBagId(bagId);
        if (dragonId) {
            let dragonInfo = GameConfig.Dragon.getElement(dragonId);
            if (dragonInfo) {
                return dragonInfo.elementalId;
            }
        }


        return null;
    }

    export enum DragonType {
        Fire = 1,
        Water = 2,
        Wood = 3,
        Earth = 4,
        Light = 5,
        Dark = 6,
    }
}