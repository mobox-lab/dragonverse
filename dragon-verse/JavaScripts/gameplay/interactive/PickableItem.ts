import i18n from "../../language/i18n";
import { ProximityPrompts } from "../../ui/common/ProximityPrompts";
import GToolkit from "gtoolkit";
import { InitializeCheckerScript } from "../archtype/base/InitializeCheckScript";
import { KeyItem } from "./KeyItemPuzzel";
import { IPickerController } from "./PickerController";
import UnifiedRoleController from "../../module/role/UnifiedRoleController";
import Log4Ts from "mw-log4ts";
import MainPanel from "../../ui/main/MainPanel";
import GameServiceConfig from "../../const/GameServiceConfig";

const tempUseVector = new mw.Vector();

export abstract class PickableItem extends InitializeCheckerScript implements KeyItem {

    @mw.Property({displayName: "放置物类型"})
    type: number = 0;

    public storage: string = "";

    @mw.Property({displayName: "初始位置"})
    public initializePosition: mw.Vector = new mw.Vector();

    public detectionCollisionWhenPutdown = true;

    public size: mw.Vector = mw.Vector.zero;

    private _trigger: mw.Trigger;

    private _beenPicked: boolean = false;

    private _candidates: IPickerController[] = [];

    public onBeenPutInStorage: mw.Action1<PickableItem> = new mw.Action1();

    protected holder: IPickerController;

    public set pickStatus(value: boolean) {

        if (this._beenPicked === value) {
            return;
        }
        this._beenPicked = value;
        this.onPickStatusChanged();
    }

    public get pickStatus() {
        return this._beenPicked;
    }

    protected onStart(): void {
        this.initializePosition = this.gameObject.worldTransform.position;
        super.onStart();
    }

    protected onInitialize(): void {
        this._trigger = this.gameObject.getChildByName("trigger") as mw.Trigger;
        this.size = this.gameObject.getBoundingBoxExtent(true, false, this.size);
        this.onPickStatusChanged();
    }

    private onPickStatusChanged() {

        if (!this._beenPicked) {
            this._trigger.onEnter.add(this.onTriggerIn);
            this._trigger.onLeave.add(this.onTriggerOut);
            if (this.holder) {
                this.addCandidate(this.holder);
            }
            this.onBeenLand();
        } else {

            this._trigger.onEnter.remove(this.onTriggerIn);
            this._trigger.onLeave.remove(this.onTriggerOut);
            this.removeCandidate();
            this.onBeenPicked();

            // ProximityPrompts.show([{
            //     keyBoard: "Z",
            //     text: i18n.lan("TinyGameLanKey0002"),
            //     enabled: true,
            //     onSelected: () => {
            //         this.holder.putdown();
            //     },
            // }]);
            mw.UIService.getUI(MainPanel)?.enableCustom({
                name: i18n.resolves.TinyGameLanKey0002(),
                icon: GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_CUSTOM,
                onTrigger: () => this.holder.putdown(),
            });
        }
    }

    protected removeCandidate(target?: IPickerController) {

        if (!target) {

            this._candidates.length > 0 && mw.UIService.getUI(MainPanel)?.disableCustom();
            this._candidates.length = 0;

            return;
        }

        for (let i = this._candidates.length; i >= 0; i--) {
            let candidate = this._candidates[i];
            if (target === candidate) {

                this._candidates.splice(i, 1);
                // ProximityPrompts.close();
                mw.UIService.getUI(MainPanel)?.disableCustom();
            }
        }
    }

    protected addCandidate(target: IPickerController) {

        if (this._candidates.indexOf(target) !== -1) {
            return;
        }
        this._candidates.push(target);
        // ProximityPrompts.show([{
        //     keyBoard: "F",
        //     text: i18n.lan("TinyGameLanKey0001"),
        //     enabled: true,
        //     onSelected: () => {
        //         this.controllerTryPickupSelf(target);
        //     },
        // }]);
        mw.UIService.getUI(MainPanel)?.enableCustom({
            name: i18n.resolves.TinyGameLanKey0001(),
            icon: GameServiceConfig.MAIN_PANEL_INTERACTION_ICON_GUID_CUSTOM,
            onTrigger: () => this.controllerTryPickupSelf(target),
        });
    }

    private onTriggerOut = (go: mw.GameObject) => {
        if (!GToolkit.isSelfCharacter(go)) return;
        const picker = (go as Character)?.player?.getPlayerState(UnifiedRoleController)?.pickController ?? null;
        if (!picker) {
            Log4Ts.log(PickableItem, `picker not found in player URC.`);
            return;
        }

        if (this._candidates.indexOf(picker) === -1) return;

        this.removeCandidate(picker);

    };

    private onTriggerIn = (go: mw.GameObject) => {
        if (!GToolkit.isSelfCharacter(go)) return;
        const picker = (go as Character)?.player?.getPlayerState(UnifiedRoleController)?.pickController ?? null;
        if (!picker) {
            Log4Ts.log(PickableItem, `picker not found in player URC.`);
            return;
        }
        if (!picker.canPick) return;

        this.addCandidate(picker);
    };

    protected resetGameObject(position?: mw.Vector) {
        if (!position) {
            position = this.initializePosition;
        }
        this.gameObject.parent = null;
        this.gameObject.worldTransform.position = position;
        (this.gameObject as mw.Model).setCollision(mw.PropertyStatus.On);
    }

    /**
     * 尝试被捡起
     * @param candidate
     * @returns
     */
    protected async controllerTryPickupSelf(candidate: IPickerController) {
        if (this.pickStatus) {
            return;
        }

        if (candidate.pickType && candidate.pickType.indexOf(this.type) === -1) {
            return;
        }
        if (!await candidate.pick(this)) {
            return false;
        }
        this.holder = candidate;
        this.pickStatus = true;
    }

    /**
     * 被放下
     * @returns
     */
    async putdown(): Promise<boolean> {

        if (this.detectionCollisionWhenPutdown) {

            let position = this.findValidPutdownPosition();

            this.resetGameObject(position);
        }
        this.pickStatus = false;
        this.holder = null;
        return true;

    }

    protected findValidPutdownPosition() {

        let handlerTransform = this.holder.gameObject.worldTransform;
        let nowPosition = this.gameObject.worldTransform.position;
        let radius = this.size.z / 2;
        let dirs = [
            handlerTransform.getForwardVector(),
            handlerTransform.getForwardVector().multiply(-1),
            handlerTransform.getRightVector(),
            handlerTransform.getRightVector().multiply(-1),
        ];

        const ignore = [this.holder.gameObject.gameObjectId, this.gameObject.gameObjectId, this._trigger.gameObjectId];
        for (const dir of dirs) {

            let origin = nowPosition.clone().add(dir.multiply(radius * 2));

            let end = origin.clone();
            end.z -= 300;
            origin.z += 300;
            let traceResult = mw.QueryUtil.sphereTrace(origin, end, radius, false, false, ignore);

            if (traceResult.length > 0) {

                let closest = traceResult[0];
                let distance = closest.distance;
                if (distance >= radius) {
                    if (closest.gameObject instanceof mw.Trigger) {
                        closest.gameObject.getBoundingBoxExtent(false, false, tempUseVector);

                        closest.position.z -= tempUseVector.z / 2;
                    }

                    closest.position.z -= radius;
                    return closest.position;
                }
            }
        }

        return null;
    }

    protected onDestroy(): void {
        super.onDestroy();
        this.holder = null;
        this.removeCandidate();
        this._candidates.length = 0;
    }

    /** 交互物被拾起 */
    protected onBeenPicked() {

    }

    /** 交互物被放下 */
    protected onBeenLand() {

    }
}