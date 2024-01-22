import { BagDataBase } from "./BagDataBase";
import { petInfoNew } from "./PetBagModuleData";

export default class BagItemDataTest extends BagDataBase {
    key: string;
    /**ID */
    I: number
    /**petInfo */
    p: petInfoNew;
}