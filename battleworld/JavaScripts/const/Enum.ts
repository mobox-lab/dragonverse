
export enum EBagSkillEvents_C {
    /**回收武器限制条件 */
    bagSkill_putWeaponCond = "bagSkill_putWeaponCond",
}

export enum EAnalyticsEvents {

    /**第一次做某事 */
    firstDo = "firstDo",
    /**核心循环步骤开始 */
    coreStepStart = "coreStepStart",
    /**核心循环步骤 */
    coreStep = "coreStep",
    /**核心循环步骤结束 */
    coreStepEnd = "coreStepEnd",

    /**引导开始 */
    guide_start = "guide_start",
    /**引导步骤 */
    guide_step = "guide_step",
    /**引导结束 */
    guide_end = "guide_end",
}

export enum EAnalyticsEvents_S {
    /**第一次做某事 */
    firstDo_S = "firstDo_S",
}


export enum EBulletEvents_S {
    /**子弹格挡反弹 */
    bullet_define_s = "bullet_define_s",
}

export enum EBulletEvents_C {
    /**客户端npc释放子弹 */
    bullet_npc_fireBullet_c = "bullet_npc_fireBullet_c",
    /**子弹结束爆炸 */
    bullet_bomb_c = "bullet_bomb_c",
}

export enum EBuffEvent_S {
    /**清理所有buff */
    BuffEvent_RemoveAllBuff_S = "BuffEvent_RemoveAllBuff_S",
}

/**装备模块 */
export enum EEquipEvents_C {
    /**隐藏武器接口 */
    equip_visibleWeapon_c = "equip_visibleWeapon_c",
    /**播放武器动画 */
    equip_playWeaponTween = "equip_playWeaponTween",
}

export enum EEquipEvents_S {
    /**玩家背包移除装备 */
    equip_checkEquipRemove_s = "equip_checkEquipRemove_s",

}

export enum EWeaponEvent_C {
    /**将武器放到手中 */
    WeaponEvent_TakeWeaponToHand_C = "WeaponEvent_TakeWeaponToHand_C",
    /**玩家攻击结束将武器放到背部 */
    WeaponEvent_TakeWeaponToBack_C = "WeaponEvent_TakeWeaponToBack_C",

    /**玩家控制手部武器显示隐藏了 */
    WeaponEvent_HasVisibleHandleWeapon_C = "WeaponEvent_HasVisibleHandleWeapon_C",
}


export enum EWeaponEvent_S {
    /**玩家武器发生变化 */
    WeaponEvent_WeaponChange_S = "WeaponEvent_WeaponChange_S",
}

/**技能模块 */
export enum ESkillEvent_C {
    /**随机技能变化 */
    SkillEvent_RandomSkill_C = "SkillEvent_RandomSkill_C",
    /**打开技能选择面板 */
    SkillEvent_OpenSelectSkill_C = "SkillEvent_OpenSelectSkill_C",

    /**拾取技能球 */
    SkillEvent_PickUpSkillBall_C = "SkillEvent_PickUpSkillBall_C",

    /**增加玩家技能点 */
    SkillEvent_AddSkillPoint_C = "SkillEvent_AddSkillPoint_C",
}

/**技能模块 */
export enum ESkillEvent_S {
    /**拾取技能球 */
    SkillEvent_PickUpSkillBall_S = "SkillEvent_PickUpSkillBall_S",
}

export enum EAttributeEvents_C {
    /**设置玩家属性 */
    Attribute_SetAttribute_C = "Attribute_SetAttribute_C",
    /**玩家武器id同步 */
    Attribute_WeaponId_Change_C = "Attribute_WeaponId_Change_C",
    /**玩家当前随机的技能库id数组 */
    Attribute_RandomSkillLibIds_Change_C = "Attribute_RandomSkillLibIds_Change_C",
    /**玩家当前装备的技能库id数组 */
    Attribute_EquipSkillLibIds_Change_C = "Attribute_EquipSkillLibIds_Change_C",
    /**玩家技能点变化 */
    Attribute_SkillPoints_Change_C = "Attribute_SkillPoints_Change_C",
    /**玩家金币数量变化 */
    Attribute_Money_Change_C = "Attribute_Money_Change_C",
    /**属性变化 */
    Attribute_AttributeChange_C = "Attribute_AttributeChange_C",
    /**玩家杀戮值变化 */
    Attribute_MassacreValue_C = "Attribute_MassacreValue_C",
    /**玩家段位分变化 */
    Attribute_RankScore_Change_C = "Attribute_RankScore_Change_C",
    /**玩家段位是否显示 */
    Attribute_RankShow_C = "Attribute_RankShow_C",
    /**玩家显示隐藏状态 */
    Attribute_PlayerVisible_C = "Attribute_PlayerVisible_C",
    /**玩家怒气值 */
    Attribute_AngerValue_C = "Attribute_AngerValue_C",
    /**玩家爆气状态 */
    Attribute_gasExplosion_C = "Attribute_gasExplosion_C",
    // /**玩家体力变化 */
    // Attribute_Energy_Change_C = "Attribute_Energy_Change_C",
}

export enum EAttributeEvents_S {
    /**玩家属性变化 */
    attr_change_s = "attr_change_s",
    /**计算玩家属性 增加或减少 */
    AttrEvent_CalculateAttr_S = "AttrEvent_CalculateAttr_S",
}


export enum EMotionEvents_C {
    /**技能设置玩家移动 */
    motion_setMovement_c = "motion_setMovement_c",
    /**添加技能预缓存 */
    motion_addPrestore = "motion_addPrestore",
    /**技能预缓存 */
    motion_invokePrestore = "motion_invokePrestore",
    /**释放终极大招 */
    MotionEvent_ReleaseFinalSkill_C = "MotionEvent_ReleaseFinalSkill_C",
}

/**模块通信 */
export enum EModule_Events {

    /**玩家掉落最低点 */
    player_Bottom_z = "player_Bottom_z",

    /**玩家区域改变 */
    area_changeArea = "area_changeArea",

    /**技能发射子弹 */
    skill_fireBullet = "skill_fireBullet",

    /**停止当前播放 */
    motion_stop = "motion_stop",
    /**动效攻击 */
    motion_attack = "motion_attack",

    /**打开背包 */
    bag_open = "bag_open",

    /**背包丢弃 */
    bag_discard = "bag_discard",
    /**背包装备 */
    bag_equip = "bag_equip",
    /**刷新背包列表 */
    bag_refreshBagList = "bag_refreshBagList",
    /**刷新背包当前页itemdata  这个不会重新计算位置 */
    bag_refreshBagItemData = "bag_refreshBagItemData",
    /**拿出从快捷栏 */
    bag_takOut = "bag_takOut",
    /**背包数据发生变化 */
    bag_dataChange = "bag_dataChange",
    /**向背包添加物品 */
    bag_addItem = "bag_addItem",
    /**向背包批量添加物品 */
    bag_addItems = "bag_addItems",
    /**删除通过ID数组删除背包内数据 */
    bag_subItemByArr = "bag_subItemByArr",


    /**添加快捷栏 */
    prop_addQuick = "prop_addQuick",
    /**移除快捷栏 */
    prop_removeQuick = "prop_removeQuick",
    /**快捷栏选中 */
    prop_selectQuick = "prop_selectQuick",
    /**快捷栏选中id变化 */
    prop_change_propId = "prop_change_propId",
    /**刷新快捷栏 */
    prop_refreshQuick = "prop_refreshQuick",


    /**丢弃物品 */
    drop_discard = "drop_discard",
    /**拾取物品 */
    drop_pickUp = "drop_pickUp",
    /**捡取物品到 ui列表里 */
    drop_pickUp2View = "drop_pickUp2View",
    /**拾取物品 */
    drop_pickUpFromView = "drop_pickUpFromView",
    /**创建单端物品 */
    drop_createClientDrop = "drop_createClientDrop",

    /**控制背包full按钮显示或隐藏 */
    player_showOrHideBagFullBtn = "player_showOrHideBagFullBtn",

    /**控制主控界面 */
    ui_openMainView = "ui_openMainView",

    /**添加装备 */
    equip_addEquip = "equip_addEquip",
    /**移除装备 */
    equip_removeEquip = "equip_removeEquip",



    /**添加挂件 */
    equip_addPendant = "equip_addPendant",
    /**移除挂件 */
    equip_removePendant = "equip_removePendant",

    /**打开职业界面 */
    job_openJobView = "job_openJobView",


    /**控制玩家当前武器隐藏 */
    weapon_hide = "weapon_hide",
    /**控制玩家当前武器显示 */
    weapon_show = "weapon_show",


    weapon_showScale = "weapon_showScale",
    /**攻击后收刀 */
    weapon_hideScaleMotion = "weapon_hideScaleMotion",

    /**buff快捷栏选中修改 */
    buff_quickChange = "buff_quickChange",

    gm_HideShowUI = "gm_HideShowUI",

    /**打开momo引导界面 */
    open_momo_guide = "open_momo_guide",
    /**打开属性界面 */
    open_attribute = "open_attribute",

    /**显示或隐藏按钮红点 数量*/
    changeRedDotNum = "changeRedDotNum",
    /**显示或隐藏按钮红点 装态*/
    changeRedDotState = "changeRedDotState",

    /**选角改变 */
    ui_roleChange = "ui_roleChange",
    /**确定选角形象 */
    confirmRole = "confirmRole",
    /**选角界面touch移动 */
    ui_roleMoveTouch = "ui_roleMoveTouch",

    /**玩家修改了区域ID */
    player_ChangeAreaC = "player_ChangeAreaC",

    /**NPC闪现式修改位置 */
    Monster_Flash = "Monster_Flash",
    /**点击开始游戏 */
    ui_startGame = "ui_startGame",

    /**炼金启炉按钮 */
    alchemy_ShowBtn = "alchemy_ShowBtn",
    /**开始炼金 */
    alchemy_StartAlchemy = "alchemy_StartAlchemy",

    /**刷新职业技能按钮 */
    refreshJob = "refreshJob",

    /**切换引导NPC状态 */
    switchGuideNpcState = "switchGuideNpcState",
    /**加钱 */
    add_money = "add_money",
    /**减钱 */
    sub_money = "sub_money",
    /**炼金获取奖励 */
    alchemy_GetReward = "alchemy_GetReward",
    /**打开任务追踪 */
    openTaskTrack = "openTaskTrack",
    /**任务追踪 */
    taskTrackEvent = "taskTrackEvent",
    /**玩家接受任务 */
    player_acceptTask = "player_acceptTask",
    /**放弃任务 */
    player_abandonTask = "player_abandonTask",
    /**关闭任务主界面 */
    closeTaskMain = "closeTaskMain",
    /**关闭任务信息界面 */
    closeTaskMessage = "closeTaskMessage",
    /**客户端击中可破坏物 */
    hitMeshObj_C = "hieMeshObj_C",
    /**玩家扣血 */
    hurtPlayer = "hurtPlayer",
    /**打开炼金界面 */
    openAlchemyPanel = "openAlchemyPanel",
    /**获得星星 */
    getStar = "getStar",
    /**开启宝箱 */
    openBox = "openBox",
    /**玩家升级 */
    playerLevelUp = "playerLevelUp",
    /**玩家击中NPC */
    playerHitNpc = "playerHitNpc",
    /**玩家首次复活 */
    playerFirstResurgence = "playerFirstResurgence",
    /**开启玩家引导线 */
    startGuideArrow = "startGuideArrow",
    /**结束玩家引导线 */
    endGuideArrow = "endGuideArrow",
    /**重置玩家引导线 */
    resetGuideArrow = "resetGuideArrow",
    /**玩家金钱变化 */
    moneyChange = "moneyChange",
    /**玩家时间到了退出炼金 */
    alchemyTimeOverExit = "alchemyTimeOverExit",
    /**打开动作界面 */
    action_open = "action_open",
    /**播放动作 */
    playAction = "playAction",
    /**玩家移动 */
    player_move = "player_move",
    /**玩家点击签到Item */
    ui_SignClick = "ui_SignClick",
    /**签到奖励界面展示 */
    ui_SignShow = "ui_SignShow",
    /**签到奖励界面关闭 */
    ui_SignHide = "ui_SignHide",
    /**打开占卜 */
    openDivine = "openDivine",
    /**关闭对话 */
    ui_closeTalk = "ui_closeTalk",
    /**占卜完成 */
    completeDivine = "completeDivine",
    /**talkUI隐藏 */
    ui_hideTalk = "ui_hideTalk",
    /**占卜特效 */
    divine_playEffect = "divine_playEffect",
    /**占卜关闭 */
    divine_close = "divine_close",
    /**NPC攻击cd事件 */
    Monster_AtkCD = "Monster_AtkCD",
    /**点击任务主界面指南针 */
    clickCompass = "clickCompass",
    /**显示区域选择 */
    ui_showSecretAreaSeletUI = "ui_showSecretAreaSeletUI",
    /**玩家死亡 */
    player_Dead = "player_Dead",
    /**玩家复活 */
    player_Resurgence = "player_Resurgence",
    /**退出秘境 */
    exitSecretArea = "exitSecretArea",
    /**退出当前秘境 */
    exitCurSecretArea = "exitCurSecretArea",
    /**和NPC谈话 */
    talkToNpc = "talkToNpc",
    /**引导给NPC奖励 */
    guideRewardAlchemy = "guideRewardAlchemy",
    /**点击属性按钮 */
    clickAttributeItem = "clickAttributeItem",
    /**决斗场状态初始话*/
    Match_HeaderInit = "Match_HeaderInit",
    /**客户端创建宠物 */
    createPet = "createPet",
    /**客户端销毁宠物 */
    destroyPet = "destroyPet",


    /**打开通行证任务 */
    ui_openSeasonPass = "ui_openSeasonPass",
    /**打开悬赏令界面 */
    ui_openBounty = "ui_openBounty",
    /**修改玩家挂件状态 */
    playerChangeEquipState = "playerChangeEquipState",
    /**关闭当前任务 */
    closeCurTask = "closeCurTask",
    /**社团点击玩家列表 */
    clubOpenPlayerList = "clubOpenPlayerList",
    /**进入秘境触发器 */
    onEnterSecretTrigger = "onEnterSecretTrigger",
    /**玩家进入场景(老玩家点击开始按钮, 或新玩家点击选角) 新世界直接触发*/
    playerEnterScene = "playerEnterScene",
    /**向当前房间聊天框发送消息 */
    MGS_Room = "MGS_Room",
    /**向当前游戏的全部房间聊天框发送消息 */
    MGS_Game = "MGS_Game",
    /**新玩家第一次进入游戏引导结束 */
    guide_FirstStartGameFinish = "guide_FirstStartGameFinish",
    /**邮件界面展示 */
    ui_mailShow = "ui_mailShow",
    /**流星宝箱交互完成 */
    Meteor_InteractiveDone = "Meteor_InteractiveDone",

    /**邮件按钮展示 */
    ui_mailShowBtn = "ui_mailShowBtn",
    /**对话奖励事件 */
    talkReward = "talkReward",
    /**对话学习保存数据事件 */
    talkStudySaveData = "talkStudySaveData",
    /**停止系统引导 */
    stopSystemGuide = "stopSystemGuide",
    /**点击莫莫引导类型 */
    momoGuide = "momoGuide",
    /**是否使用职业卡外观 */
    switchUseJobCard = "switchUseJobCard",
    /**关闭momo引导主界面 */
    ui_closeMomoMain = "ui_closeMomoMain",
    /**关闭momo引导子界面 */
    ui_closeMomoChildPanel = "ui_closeMomoChildPanel",
    /**触发momo引导事件 */
    momoTriggerEvent = "momoTriggerEvent",
    /**停止momo引导事件 */
    stopMomoGuide = "stopMomoGuide",
    /**和任务NPC对话 */
    talkToTaskNpc = "talkToTaskNpc",
    /**全局属性变化 */
    global_attr_change_c = "global_attr_change_c",
    /**显示设置ui */
    SetingModuleC_showSetingUI = "SetingModuleC_showSetingUI",
    /**显示设置双指缩放 */
    SetingModuleC_cameratargetArmLength = "SetingModuleC_cameratargetArmLength",
    /**切换到玩家基础状态（走，跑，跳） */
    changetoBaseState = "changetoBaseState",
    /**切换到玩家状态 */
    changeState = "changeState",

    /**拾取回血 */
    land_pickUp = "land_pickUp",
    /**拾取到丹药 */
    land_pickUp_pill = "land_pickUp_pill",
    /**拾取一个丹药 */
    land_lose_pill = "land_lose_pill",
    /**拾取到装扮道具 */
    land_pickUp_dressUp = "land_pickUp_dressUp",
    /**变身倒计时 */
    land_dressUp_countdown = "land_dressUp_countdown",
    /** 商店屏蔽ui显隐 */
    shop_hideShowUI = "shop_hideShowUI",
}

/**模块通信 服务器使用*/
export enum EModule_Events_S {
    /**玩家区域改变 */
    area_changeArea = "area_changeArea",



    /**快捷栏选项改变 */
    prop_change_propId = "prop_change_propId",


    /**技能发射子弹 */
    skill_fireBullet = "skill_fireBullet",


    /**场景单位被攻击 */
    sceneUnit_beAttack = "sceneUnit_beAttack",

    /**玩家被攻击 */
    player_beAttack = "player_beAttack",
    /**增加玩家属性 */
    player_addAttribute = "player_addAttribute",
    /**增加玩家属性（适用经验这种....） */
    player_AddAttributeValue = "player_AddAttributeValue",

    /**显示或隐藏按钮红点 数量*/
    changeRedDotNum = "changeRedDotNum",
    /**显示或隐藏按钮红点 装态*/
    changeRedDotState = "changeRedDotState",


    /**服务端加钱 */
    add_Money_S = "add_Money_S",
    /**服务端击中可破坏物 */
    hitMeshObj_S = "hitMeshObj_S",


    /**玩家离开游戏 */
    player_LeftGame = "player_LeftGame",

    /**装扮道具失效 */
    pickUp_dressUp_timeout = "pickUp_dressUp_timeout",

}

export enum EBagSkillEvents {
    /**背包技能变化 */
    change_bagSkill = "change_bagSkill",

}

export enum EAreaEvent_C {
    /**返回安全区 */
    Area_BackSafe_C = "Area_BackSafe_C",
    /**传送到记录点 */
    area_transmit = "area_transmit",
    /**传送到指定区域 */
    area_transmitArea = "area_transmitArea",
    /**更新玩家区域id */
    area_updateAreaId_c = "area_updateAreaId_c",
    /**更新玩家区域id */
    area_updateAreaId_pvp_c = "area_updateAreaId_pvp_c",
    /**主动设置区域 */
    area_initiative_setPlayerAreaId_c = "area_initiative_setPlayerAreaId_c",
    /**进入新手引导区域 */
    AreaEvent_guidePos_C = "AreaEvent_guidePos_C",
}

export enum EAreaEvents_S {
    /**设置玩家为战斗区域 */
    Area_SetBattleAreaId = "Area_SetBattleAreaId",

    /**玩家加入游戏 */
    area_enterGame = "area_enterGame",
    /**设置玩家区域id */
    area_setPlayerAreaId_s = "area_setPlayerAreaId_s",

}



export enum EPlayerEvents_C {

    /**设置玩家移动状态*/
    player_setMovement_c = "player_setMovement_c",
    /**自动同步玩家名称*/
    player_syncPlayerName_c = "player_syncPlayerName_c",
    /**玩家当前血量*/
    attr_change = "attr_change",
    /**自动同步玩家id*/
    player_syncPlayerid_c = "player_syncPlayerid_c",
    /**玩家被单端npc攻击 */
    player_beAttack_clientNpc_c = "player_beAttack_clientNpc_c",
    /**自动同步玩家血条显示*/
    player_syncPlayerHPVisable_c = "player_syncPlayerHPVisable_c",
    /**设置玩家血条显示*/
    player_setPlayerHeadVisable_c = "player_setPlayerHeadVisable_c",
    /**玩加战斗状态检测 */
    player_figthState_checek = "player_figthState_checek",
    /**停止冲刺特效 */
    player_stop_sprintEffect = "player_stop_sprintEffect",
    /**玩家退出跑墙 */
    player_ExitRunWall = "player_ExitRunWall",
    /**玩家回城被打断*/
    player_back_brake = "player_back_brake",

    /**刷新技能点UI */
    Player_RefreshSkillPoints = "Player_RefreshSkillPoints",

    /**修改玩家状态 */
    Player_ChangePlayerState = "Player_ChangePlayerState",

    /**玩家死亡事件 */
    Player_ChangeDeadState_C = "Player_ChangeDeadState_C",

    /**玩家显示隐藏 */
    Player_Visible_C = "Player_Visible_C",

    /**GM显示玩家信息 */
    Player_GM_PlayerInfo_C = "Player_GM_PlayerInfo_C",
    /**重置所有技能cd */
    PlayerEvent_ResetSkilCD_C = "PlayerEvent_ResetSkilCD_C",
    /**重置摇杆 */
    PlayerEvent_ResetJoyStick_C = "PlayerEvent_ResetJoyStick_C"
}

export enum EPlayerEvents_S {
    /**增加删除职业卡计算属性加成 */
    player_Add_remove_Job = "player_Add_remove_Job",

    /**重新计算装备属性加成 */
    player_recalculateEquip = "player_recalculateEquip",
    /**重新计算属性加成 */
    player_recalculateAttr = "player_recalculateAttr",
    /**设置玩家移动状态 */
    player_setMovement_s = "player_setMovement_s",
    /**玩家死亡 */
    player_deadState_s = "player_deadState_s",
    /**销毁自生buff */
    player_RemoveCenterBuff = "player_destroySelfBuff",
    /**玩家第一次加入游戏 */
    player_frist_enterGame = "player_frist_enterGame",

    /**玩家增加金币 */
    PlayerEvent_AddGold_S = "PlayerEvent_AddGold_S",
    /**玩家减少金币 */
    PlayerEvent_SubGold_S = "PlayerEvent_SubGold_S",

    /**计算玩家属性 */
    PlayerEvent_CalculateAttr_S = "PlayerEvent_CalculateAttr_S",
    /**武器属性加成 */
    PlayerEvent_WeaponAdd_S = "PlayerEvent_WeaponAdd_S",
    /**计算技能库技能加成 */
    PlayerEvent_CalculateSkillLibAdd_S = "PlayerEvent_CalculateSkillLibAdd_S",

    /**俯冲表现 */
    PlayerEvent_DiveVisible_S = "PlayerEvent_DiveVisible_S",

    /**切换玩家状态 */
    PlayerEvent_ChangePlayerFSMState_S = "PlayerEvent_ChangePlayerFSMState_S",
    /**获取玩家名字,发段位公告 */
    PlayerEvent_GetPlayerName_S = "PlayerEvent_GetPlayerName_S",
}


/**场景单位模块事件 服务器端 */
export enum EUnitEvents_S {
    /**子弹攻击到npc */
    unit_bulletHit = "unit_bulletHit",
}


/**motin 事件回调 */
export enum EMotion_Events {
    /**玩家跳跃 */
    EventPlayerJump = "EventPlayerJump",
    /**montion调用motioini */
    MotionInvokeMotionId = "MotionInvokeMotionId",
    /**montion调用motioini */
    MotionInvokeMotion = "MotionInvokeMotion",
    /**防御按下 */
    onDefensePressed = "onDefensePressed",
    /**防御释放 */
    onDefenseRelease = "onDefenseRelease",
    /**冲刺 */
    sprint = "sprint",
    /**冲刺加速度 */
    sprintSpeed = "sprintSpeed",
    EventPlayerCanMove = "EventPlayerCanMove",
    EventPlayerCanNotMove = "EventPlayerCanNotMove",
}

/**提示模块 */
export enum ENotice_Events_C {
    /**击杀提示 */
    NoticeEvent_KillTip_C = "NoticeEvent_KillTip_C",
}

/**提示模块 */
export enum ENotice_Events_S {
    /**提示信息 */
    NoticeEvent_TipMsg_S = "NoticeEvent_TipMsg_S",
    /**击杀提示 */
    NoticeEvent_KillTip_S = "NoticeEvent_KillTip_S",
}

export enum EGuide_Event_C {
    /**开始引导 */
    GuideEvent_StartGuide_C = "GuideEvent_StartGuide_C",
}

export enum ELandCommon_Event_C {
    /**地块透明度信息*/
    LaneCommonEvent_Opcatity_C = "LaneCommonEvent_Opcatity_C",
}


/**道具增益方式 */
export enum EItemAddType {
    /**直接增加 */
    add = 1,
    /**按百分比增加 */
    per = 2,
}


/**日志名称 */
export enum ELogName {
    VAE = "VAE",
}

/**选角类型 */
export enum RoleType {
    /**男 */
    Boy = 1,
    /**女 */
    Gril = 2,
    /**平台形象 */
    Platform = 3,
}

export enum EAreaId {
    /**主城区 */
    Safe = 1,
    /**战斗区 */
    Battle = 2,
}
export enum EbackType {
    /**主动取消回城 */
    selfCancle = 1,
    /**被动打断回城 */
    break = 2,
}

/**防御类型 */
export enum EDefineType {
    none = 0,
    /**反弹 */
    parry = 1,
    /**防御 */
    define = 2,
}


/**玩家战斗状态 */
export enum EPlayerFightState {
    none = 0,
    /**受伤 */
    beHurt = 1,
    /**战斗 */
    fight = 2,
    /**正常状态 */
    normal = 3,
}



/**装备部位类型 */
export enum EEquipPartType {
    /**背部 */
    backOrnamental = 1,
    /**拖尾 */
    tail = 2,
    /**击杀特效 */
    killEff = 3,
    /**段位特效 */
    rankEff = 4,
    /**宠物 */
    pet = 5,
}


/**对话持久存储数据枚举 */
export enum TalkDataEnum {
    /**空舞 */
    Dancer = "1",
    /**等级觉醒（属性点上限250，玩家等级200） */
    UnlockLevel = "2",
    /**等级二次觉醒（属性点上限300，玩家等级220，职业卡精通等级220） */
    UnlockLevel2 = "3",
}


export enum ESkillTargetType {
    self = 0,
    /**除自己外其它 */
    exceptSelfOthers,
    /**队友包含自己 */
    teamAndSelf,
    /**队友不包含自己 */
    teamNoSelf,
    /**所有人 */
    all,
}



/**NPC动画状态 */
export enum EnumSceneUnitAnimationState {
    walk = 1,
    idle,
    injure,
    dead,
    levitate,
    float,
    repelDead,
    leaning,
    dizziness,
    chess, //追击动画
}



/**
 * 全局属性脚本类型
 */
export enum GlobalAttributeType {
    /**
     * 初始化
     */
    Init = 0,
}

/**
 * 换装资源类型
 */
export enum EDressUpType {
    /**v1 */
    v1 = 1,
    /**v2 */
    v2 = 2,
}

/**
 * 掉落物类型
 */
export enum EPickUpType {
    /**
     * 无类型
     */
    None = -1,
    /**
     * 技能
     */
    skill = 1,
    /**
     * 血条
     */
    hp = 2,
    /**
     * 金币
     */
    money = 3,
    /**
     * 属性丹药
     */
    attribute = 4,
    /**
     * 换装
     */
    dressUp = 5,
}

/**
 * 掉落物生成类型
 */
export enum EPickUpCreType {
    none = 0,
    /** 地形生成 */
    land = 1,
    /** npc受伤生成 */
    npc = 2,
}

/**
 *  地面buff类型
 */
export enum ELandBuffType {
    /**
     * 掉血
     */
    hpRepeat = 1,
    /**
     * 掉血
     */
    hpOnce = 2,
    /**
     * 减速
      */
    speed = 3,
    /**
     * 冲量跳跃
     */
    impulseJump = 4,
}
