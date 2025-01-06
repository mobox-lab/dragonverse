import { ConsumeId, P12ItemResId } from "../../Modules/auth/AuthModule";

export enum TokenNameEnum {
    MDBL = "MDBL"
}

export type P12ShopItem = {
    resId: P12ItemResId; // 物品 id
    consumeId: ConsumeId; // 后端购买 id
    name: string; // 多语言 名称
    value: bigint; // 商品价值
    icon: string; // 道具 icon guid
    description: string; // 多语言 描述
    tokenName: TokenNameEnum; // 使用的 cryptocurrency
    effect: number; // 使用效果
}

export const P12ShopConfig: P12ShopItem[] = [
    {
        resId: P12ItemResId.StaminaPotion, // 体力药水(仙豆)
        consumeId: ConsumeId.StaminaPotion,
        name: "Online_shop001",
        value: 1690000000000000000000n,
        icon: "373504",
        description: "Online_shop002",
        tokenName: TokenNameEnum.MDBL,
        effect: 0.3,
    },
    {
        resId: P12ItemResId.CaptureBall, // 精灵球
        consumeId: ConsumeId.CaptureBall,
        name: "Online_shop003",
        value: 210000000000000000000n,
        icon: "373564",
        description: "Online_shop004",
        tokenName: TokenNameEnum.MDBL,
        effect: 1,
    },
    {
        resId: P12ItemResId.SweepToken, // 扫荡券
        consumeId: ConsumeId.SweepToken,
        name: "Online_shop016",
        value: 169000000000000000000n,
        icon: "480798",
        description: "Online_shop017",
        tokenName: TokenNameEnum.MDBL,
        effect: 1,
    },
];