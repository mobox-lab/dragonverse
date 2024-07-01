import { JModuleC, JModuleData, JModuleS } from "../../depend/jibu-module/JModule";

export class PsP12ShopModuleData extends JModuleData {
}

export class P12ShopModuleC extends JModuleC<P12ShopModuleS, PsP12ShopModuleData> {
}

export class P12ShopModuleS extends JModuleS<P12ShopModuleC, PsP12ShopModuleData> {
}