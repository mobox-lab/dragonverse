
/**帧节点类型 */
export enum EFrameNodeType {
    MotionFrameNode_Animation = "MotionFrameNode_Animation",
    /**动画暂停 */
    MotionFrameNode_AnimPause = "MotionFrameNode_AnimPause",
    /**蓄力节点 */
    MotionFrameNode_Charge = "MotionFrameNode_Charge",
    /**蓄力motion */
    MotionFrameNode_ChargeMotion = "MotionFrameNode_ChargeMotion",
    MotionFrameNode_Effect = "MotionFrameNode_Effect",
    MotionFrameNode_3DSound = "MotionFrameNode_3DSound",
    MotionFrameNode_Sound = "MotionFrameNode_Sound",
    MotionFrameNode_Move = "MotionFrameNode_Move",
    /**物理冲量 */
    MotionFrameNode_impulse = "MotionFrameNode_impulse",
    /**浮空 */
    MotionFrameNode_Fly = "MotionFrameNode_Fly",
    /**生成资源 */
    MotionFrameNode_Equip = "MotionFrameNode_Equip",
    /**移除资源 */
    MotionFrameNode_RemoveEquip = "MotionFrameNode_RemoveEquip",
    MotionFrameNode_FlyEntity = "MotionFrameNode_FlyEntity",
    MotionFrameNode_Camera = "MotionFrameNode_Camera",
    MotionFrameNode_SkillRect = "MotionFrameNode_SkillRect",
    MotionFrameNode_BreakPoint = "MotionFrameNode_BreakPoint",
    MotionFrameNode_Event = "MotionFrameNode_Event",
    MotionFrameNode_TimeDilate = "MotionFrameNode_TimeDilate",
    MotionFrameNode_UI = "MotionFrameNode_UI",
    /**新motion执行 */
    MotionFrameNode_InvokeMotion = "MotionFrameNode_InvokeMotion",
    /**震屏节点 */
    MotionFrameNode_Shake = "MotionFrameNode_Shake",
    /**控制显示隐藏武器 */
    MotionFrameNode_VisibleWeapon = "MotionFrameNode_VisibleWeapon",
    /**播放武器动画 */
    MotionFrameNode_PlayWeaponAnim = "MotionFrameNode_PlayWeaponAnim",
    /**模型动画节点 */
    MotioniFrameNode_ModelAnim = "MotioniFrameNode_ModelAnim",
}

/**动效中断类型 */
export enum EMotionBreakType {
    /**不能被中断 */
    None = 0,
    /**能被打断，但会停止当前动效 */
    CanBreak_Stop = 1,
    /**能被打断，不会停止当前动效 */
    CanBreak_NoStop = 2,
}