import { PlayerManagerExtension } from "../../../Modified027Editor/ModifiedPlayer";
@Component
export default class RotateGhost extends Script {

    @mw.Property({ displayName: "目标模型", capture: true })
    public targetGuid: string = "";
    @mw.Property({ displayName: "特效资源" })
    public effectGuid: string = "";
    @mw.Property({ displayName: "特效插槽", enumType: HumanoidSlotType })
    public slot: HumanoidSlotType = HumanoidSlotType.Eyes;
    @mw.Property({ displayName: "特效相对位置" })
    public offset: Vector = new Vector(0, 0, 0);
    /**保存进入触发器的玩家ID */
    private enterPlayerId: number[] = [];
    /**AI空锚点节点 */
    private anchor: GameObject = null;
    /**AI初始旋转 */
    private startRotate: Map<string, Rotation> = new Map();
    protected onStart(): void {
        if (SystemUtil.isClient()) return;
        let trigger = this.gameObject as Trigger;
        trigger.onEnter.add((go) => {
            if (PlayerManagerExtension.isCharacter(go)) {
                //进入触发器的是玩家，将玩家ID添加至数组中，若玩家ID为数组的第0号玩家则将AI注视玩家
                if (!this.enterPlayerId.includes(go.player.playerId)) {
                    this.enterPlayerId.push(go.player.playerId);
                }
                if (this.enterPlayerId[0] == go.player.playerId) {
                    if (!this.anchor) {
                        this.anchor = GameObject.findGameObjectById(this.targetGuid);
                    }
                    this.anchor.getChildren().forEach((child) => {
                        if (!this.startRotate.has(child.gameObjectId)) {
                            this.startRotate.set(child.gameObjectId, child.worldTransform.rotation);
                        }
                        child.worldTransform.lookAt(go.worldTransform.position);
                        if (this.effectGuid) {
                            EffectService.playOnGameObject(this.effectGuid, child, { slotType: this.slot, loopCount: 0, position: this.offset })
                        }
                    })
                }
                this.useUpdate = true;
            }
        })
        trigger.onLeave.add((go) => {
            if (PlayerManagerExtension.isCharacter(go)) {
                //离开触发器触发器的是玩家，将玩家从数组中清除掉
                if (this.enterPlayerId.includes(go.player.playerId)) {
                    this.enterPlayerId.splice(this.enterPlayerId.indexOf(go.player.playerId), 1);
                    if (!this.anchor) {
                        this.anchor = GameObject.findGameObjectById(this.targetGuid);
                    }
                    if (this.enterPlayerId.length > 0) {
                        this.anchor.getChildren().forEach((child) => {
                            child.worldTransform.lookAt(Player.getPlayer(this.enterPlayerId[0]).character.worldTransform.position);
                        })
                    } else {
                        this.anchor.getChildren().forEach((child) => {
                            if (this.startRotate.has(child.gameObjectId)) {
                                child.worldTransform.rotation = this.startRotate.get(child.gameObjectId);
                            }
                            if (this.effectGuid) {
                                EffectService.stopEffectFromHost(this.effectGuid, child);
                            }
                        })
                    }
                }
            }
        })
        Player.onPlayerLeave.add((player: Player) => {
            if (this.enterPlayerId.includes(player.playerId)) {
                this.enterPlayerId.splice(this.enterPlayerId.indexOf(player.playerId), 1);
            }
        })
    }

    protected onUpdate(dt: number): void {
        if (this.enterPlayerId.length > 0) {
            if (this.anchor) {
                this.anchor.getChildren().forEach((child) => {
                    child.worldTransform.lookAt(Player.getPlayer(this.enterPlayerId[0]).character.worldTransform.position);
                })
            }
        } else {
            this.useUpdate = false;
        }
    }



}