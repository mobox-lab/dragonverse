import { Attribute } from "../PlayerModule/sub_attribute/AttributeValueObject";

/**场景单位接口 */
export interface IUnitBase {

    getUnitId();
    getModel(): mw.GameObject;
    getModelLocaction();
    setModelLocation(pos: mw.Vector);
    getValue(type: Attribute.EnumAttributeType, isAdd: boolean);
    isDead();
    onHurt(value: number);
    addValue(type: Attribute.EnumAttributeType, value: number);
    reduceValue(type: Attribute.EnumAttributeType, value: number);

}