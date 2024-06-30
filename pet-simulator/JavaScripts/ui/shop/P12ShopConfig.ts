export type P12ShopItem = {
    id: number;
    name: string;
    value: string;
    icon: string;
    description: string;
    count: number;
}
export const P12ShopConfig: P12ShopItem[] = [
    {
        id: 1,
        name: "仙豆",
        value: "1000",
        icon: "",
        description: "在游戏中使用可获得60%体力",
        count: 0,
    },
    {
        id: 2,
        name: "精灵球",
        value: "1000",
        icon: "",
        description: "在奖励地图中捕获龙娘时使用",
        count: 0,
    },
];