export namespace GlobalEnum {

    /**资源攻击阶段 */
    export enum ResourceAttackStage {
        /**刮痧 */
        GuaSha = 1,
        /**1/3阶段 */
        OneThird,
        /**破坏 */
        Destroy,
    }

    /**事件名称 */
    export enum EventName {
        /**攻击破化物 */
        AttackDestroy = "AttackDestroy",
        /**刮痧公告 */
        GuaShaNotice = "GuaShaNotice",
        /**
         * 控制宠物取消攻击
         */
        CancelPetAttack = "CancelPetAttack",
        /**
         * 控制宠物攻击
         */
        PetAttack = "PetAttack",
    }

    /**药水BUFF类型 */
    export enum BuffType {
        /**
         * 金币
         */
        Gold = 1,
        /**
         * 伤害
         */
        Damage = 2,
    }

    /**成就类型 */
    export enum AchievementType {
        /**开蛋次数 */
        OpenEggNum = 1,
        /**破坏金币数 */
        DestroyCoinNum = 2,
        /**破坏宝箱数 */
        DestroyBoxNum = 3,
        /**破坏礼物箱数 */
        DestroyGiftBoxNum = 4,
        /**破坏钻石数 */
        DestroyDiamondNum = 5,
        /**升级次数 */
        UpgradeNum = 6,
        /**爱心转化成功数 */
        HeartTransformNum = 7,
        /**彩虹转化成功数 */
        RainbowTransformNum = 8,
        /**融合成功数 */
        FusionNum = 9,
        /**爱心化失败数 */
        HeartTransformFailNum = 10,
        /**宠物附魔数 */
        PetEnchantNum = 11,
        /**区域开放数 */
        AreaOpenNum = 12,
        /**孵化出稀有宠物 */
        HatchRarePetNum = 13,
        /**孵化出史诗宠物 */
        HatchEpicPetNum = 14,
        /**孵化出传说宠物 */
        HatchLegendPetNum = 15,
        /**孵化出神话宠物 */
        HatchMythPetNum = 16,
        /**使用一只宠物合成黄金化成功 */
        UsePetToGoldSuccessNum = 17,
        /**使用一只传说宠物合成黄金化成功 */
        UseLegendPetToGoldSuccessNum = 18,
        /**使用五只宠物合成黄金化失败 */
        UsePetToGoldFailNum = 19,
        /**融合出了传奇宠物 */
        FusionLegendPetNum = 20,
        /**使用一只传奇宠物彩虹化成功 */
        UseLegendPetToRainbowSuccessNum = 21,
        /**宠物附魔独特的标签成功 */
        PetEnchantUniqueTagSuccessNum = 22,
        /**击破沙漠大宝箱 */
        DestroyDesertBigBoxNum = 23,
        /**击破天堂大宝箱 */
        DestroyHeavenBigBoxNum = 24,
        /**到达幻想世界 */
        ReachFantasyWorldNum = 25,
        // /**到达科技世界 */
        // ReachTechnologyWorldNum = 26,
    }
    /**成就奖励类型 */
    export enum AchievementReward {
        /**第一世界金币 */
        FirstWorldGold = 1,
        /**第二世界金币 */
        SecondWorldGold = 2,
        /**第三世界金币 */
        ThirdWorldGold = 3,
        /**钻石 */
        Diamond = 4,
        /**背包扩充 */
        BagExpand = 5,
        /**宠物扩充 */
        PetExpand = 6,
    }
    /**破坏物类型 */
    export enum DestructorType {
        /**钻石1 */
        Diamond1 = 1,
        /**钻石2 */
        Diamond2 = 2,
        /**金币1 */
        Gold1 = 3,
        /**金币2 */
        Gold2 = 4,
        /**金币3 */
        Gold3 = 5,
        /**金币4 */
        Gold4 = 6,
        /**金币5 */
        Gold5 = 7,
        /**金币6 */
        Gold6 = 8,
        /**沙漠大宝箱 */
        DesertBigBox = 9,
        /**天堂大宝箱 */
        HeavenBigBox = 17,
    }
    /**掉落物类型 */
    export enum DropResourceType {
        /** 第一世界金币 */
        Gold1 = 1,
        /**钻石 */
        Diamond = 2,
        /** 第一世界金币 */
        Gold2 = 3
    }
    /**宠物品质 */
    export enum PetQuality {
        /**普通 */
        Normal = 1,
        /**稀有 */
        Rare = 2,
        /**史诗 */
        Epic = 3,
        /**传说 */
        Legend = 4,
        /**神话 */
        Myth = 5,
    }
    /**宠物强化类型 */
    export enum PetDevType {
        /**普通 */
        Normal = 0,
        /**爱心化 */
        Love,
        /**彩虹化 */
        Rainbow,
    }
    /**宠物强化方式 */
    export enum StrengthenType {
        /**升级 */
        LevelUp = 1,
        /**爱心 */
        Love = 2,
        /**彩虹 */
        Rainbow = 3,
        /**附魔 */
        Enchant = 4,
    }
    // /**宠物获得方式 */
    // export enum PetGetType {
    //     /**合成 */
    //     Fusion = 1,
    //     /**爱心化 */
    //     Love = 2,
    //     /**彩虹化 */
    //     Rainbow = 3,
    //     /**孵蛋 */
    //     Egg = 4,
    // }

    export enum CoinType {
        /**第一世界金币 */
        FirstWorldGold = 1,
        /**第二世界金币 */
        SecondWorldGold = 2,
        /**第三世界金币 */
        ThirdWorldGold = 3,
        /**钻石 */
        Diamond = 4,
        /**夏日金币 */
        SummerGold = 5,
    }

    /**世界 */
    export enum World {
        /**第一世界 */
        First = 1,
        /**第二世界 */
        Second = 2,
        /**古代遗迹 */
        AncientRuins = 4,
        /**樱花庭院 */
        CherryBlossomCourtyard = 5,
        /**三世界 */
        Third = 6,
    }

    export enum TradingState {
        /** 拒绝所有交易 */
        Reject = 0,
        /** 可交易 */
        CanTrading = 1,
        /**冷却中 */
        Cooling = 3,
        /**交易中 */
        Trading = 4,
    }
    /**特殊扭蛋 */
    export enum SpecialEgg {
        Task = 1,
        DollMachine_1 = 2,
        DollMachine_2 = 3,
        DollMachine_3 = 5,
        PassEgg = 4,
    }

    /**宠物公告Tips */
    export enum PetNoticeTips {
        /**传说 */
        Legend = 1,
        /**神话 */
        Myth = 2,
        /**夏日 */
        Summer = 3,
        /**任务 */
        Task = 4,
        /**巨大化 */
        Huge = 5,
    }
    /**埋点货币 */
    export enum BuryingPointCoin {
        /**第一世界金币 */
        FirstWorldGold = 1,
        /**第二世界金币 */
        SecondWorldGold = 2,
        /**钻石 */
        Diamond = 3,
        /**星星 */
        Star = 5,
        /**三世界金币 */
        ThirdWorldGold = 4,
    }


    export enum VipTaskType {
        None = 0,
        /**在线奖励 */
        OnlineTime = 1,
        /**打破金币 */
        illRes,
        /**打开宠物蛋 */
        OpenEgg,
        /**宠物融合 */
        PetFusion,
        /**爱心化宠物 */
        LovePet,
        /**彩虹化宠物 */
        RainbowPet,
        /**宠物附魔 */
        PetEnchant,
        /**玩家交易 */
        PlayerTrading,
        /**传说宠物 */
        LegendPet,
        /**神话宠物 */
        MythPet,
        /**打破礼物 */
        GiftBox,
        /**打破宝箱 */
        Box,
        /**抓娃娃机 */
        DollMachine,
    }
    export enum PassLVRewardType {
        /**钻石 */
        Diamond = 1,
        /**一世界金币 */
        FirstWorldGold = 2,
        /**二世界金币 */
        SecondWorldGold = 3,
        /**夏日币 */
        SummerGold = 4,
        /**三倍攻击 */
        ThreeTimesAttack = 5,
        /**三倍金币 */
        ThreeTimesGold = 6,
        /**超级幸运药水 */
        SuperLuckyPotion = 7,
        /**通行证蛋 */
        PassEgg = 8,
        /**幸运药水 */
        LuckyPotion = 9,


    }

}