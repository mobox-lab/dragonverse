import { IItemElement } from "../../../../config/Item";
import { CommonUtils } from "../../../utils/CommonUtils";
import MusicMgr from "../../../utils/MusicMgr";
import { BoardHelper, BoardKeys } from "../../blackboard/BoardDefine";
// import { GhostBananeEvt } from "../../ghost/com/ClientGhostCheckCom";
import { registerItem, Item } from "./Item";

@registerItem
export class BananeItem extends Item {
    protected onHand(element: IItemElement): void {
    }
    protected onRemoveHand(element: IItemElement): void {
    }
    protected onUse(element: IItemElement): boolean {
        let degree = Number(BoardHelper.GetTargetKeyValue(BoardKeys.Degree));
        let res = CommonUtils.getViewCenterWorldHit()
        let loc = Vector.zero;
        if (res instanceof HitResult && res.impactNormal.z <= 0.2) {
            let res2 = QueryUtil.lineTrace(res.position, res.position.clone().add(Vector.down.multiply(300)), true, true);
            for (let index = 0; index < res2.length; index++) {
                const element = res2[index];
                if (element.gameObject instanceof Trigger || element.gameObject instanceof Character) {
                    continue;
                }
                loc.set(element.position.clone().add(res.impactNormal.clone().multiply(10)));
                break;
            }
        }
        else {
            loc.set(res instanceof HitResult ? res.position : res);
        }
        this.insDisItem(element.prefab, loc, element.useEffect[0][degree] == "1", element.id);

        return true;
    }

    public async insDisItem(assid: string, fallPos: Vector, isEffectChase: boolean, cfgId: number) {
        let go = await GameObject.asyncSpawn(assid, { replicates: false })
        let startLoc = Player.localPlayer.character.getSlotWorldPosition(HumanoidSlotType.Head);
        go.worldTransform.position = startLoc;
        let box = go.getBoundingBoxExtent(true, true);
        fallPos.z += box.z / 2;
        let model = go as Model;
        model.setCollision(CollisionStatus.Off, true);
        let preDt: number = 0;
        const gravity = 600;
        let loc = go.worldTransform.position.clone();
        const time = Vector.distance(loc, fallPos) / 1000;
        let force = CommonUtils.getHitForce(gravity, 1000, loc, fallPos);
        let tween = new mw.Tween({ x: 0 }).to({ x: 1 }, time * 1000).onUpdate(num => {
            let curtime = num.x * time;
            let dt = curtime - preDt;
            preDt = curtime;
            force.z -= dt * gravity;
            loc.add(force.clone().multiply(dt));
            go.worldTransform.position = loc;
        }).onComplete(() => {
            MusicMgr.instance.play(101);
            // Event.dispatchToLocal(GhostBananeEvt, go, isEffectChase, cfgId)
            setTimeout(() => {
                go.destroy();
            }, 2000);
        }).start();
    }

}