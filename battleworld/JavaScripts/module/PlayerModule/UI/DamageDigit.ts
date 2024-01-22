import { SpawnManager, SpawnInfo, } from '../../../Modified027Editor/ModifiedSpawn';
import { Globaldata } from "../../../const/Globaldata"
import { Tween } from "../../../tool/Tween"
import { WorldUIPool } from "../../../tool/UIPool"
import { util } from "../../../tool/Utils"



export enum EnumDamageAppearanceType {
    sceneUnit,
    player,
}

export class DamageDigit {
    private static pool: WorldUIPool<DamageDigitView>

    static showDamage(startPosition: mw.Vector, context: string, type?: EnumDamageAppearanceType, addHp: boolean = false) {
        this.checkPool()
        let view = this.pool.get()
        view.setInfo(startPosition, context, type, addHp)
    }

    static update() {
        if (!this.pool) return
        this.pool.eachVisibleItem(item => item.update())
    }

    private static checkPool() {
        if (DamageDigit.pool) return
        this.pool = new WorldUIPool<DamageDigitView>(() => new DamageDigitView())
    }

    static scaleEaseFunc(x: number): number {
        return Math.max(1, (-Math.pow(x, 3) + 1) * 1.5)
    }

    static opacityEaseFunc(x: number): number {
        return Math.max(0, -Math.pow(x, 3) * 0.4 + 1)
    }
}

class DamageDigitView {
    uiWidget: mw.UIWidget
    stage: boolean


    private txt_damage: mw.TextBlock;
    private txt_blood: mw.TextBlock;
    private txt_recover: mw.TextBlock;

    private startPosition: mw.Vector
    private readonly endPosition: mw.Vector
    private readonly currentScale: mw.Vector2

    private static WeightSize = new mw.Vector2(230, 80)

    private tween1: Tween<{ x: number }>
    private tween2: Tween<{ x: number }>
    private tween3: Tween<{ x: number }>

    constructor() {
        let uiWeight = SpawnManager.spawn({ guid: 'UIWidget', replicates: false }) as mw.UIWidget
        uiWeight.setUIbyID('F1EA19E64019ADCD57ED3993ABF84791')
        this.uiWidget = uiWeight
        this.uiWidget.widgetSpace = mw.WidgetSpaceMode.OverheadUI
        this.uiWidget.occlusionEnable = false
        this.uiWidget.drawSize = DamageDigitView.WeightSize;
        this.uiWidget.scaledByDistanceEnable = true;

        let uiRoot = this.uiWidget.getTargetUIWidget().rootContent;
        uiRoot.size = DamageDigitView.WeightSize


        this.txt_damage = uiRoot.findChildByPath("Damage_txt") as mw.TextBlock
        this.txt_blood = uiRoot.findChildByPath("Blood_txt") as mw.TextBlock
        this.txt_recover = uiRoot.findChildByPath("Recover_txt") as mw.TextBlock


        this.endPosition = new mw.Vector()
        this.currentScale = new mw.Vector2()

        this.tween3 = new Tween({ x: 1 }).to({ x: 0 }, 300).onUpdate(obj => {
            this.txt_damage.renderOpacity = obj.x;
            this.txt_blood.renderOpacity = obj.x
            this.txt_recover.renderOpacity = obj.x
        }).onComplete(() => {
            this.stage = false
            this.uiWidget.setVisibility(mw.PropertyStatus.Off)
        })
        this.tween2 = new Tween({ x: 0 }).to({ x: 1 }, 500).onUpdate(obj => {
            this.uiWidget.worldTransform.position = mw.Vector.lerp(this.startPosition, this.endPosition, obj.x)
        }).chain(this.tween3)
        this.tween1 = new Tween({ x: 0 }).to({ x: 1 }, 400).onUpdate(obj => {
            let s = util.lerp(4, 2, util.pingPong(obj.x))
            this.currentScale.x = s
            this.currentScale.y = s
            this.txt_damage.renderScale = this.currentScale;
            this.txt_blood.renderScale = this.currentScale;
            this.txt_recover.renderScale = this.currentScale;
        }).chain(this.tween2)
    }

    setInfo(startPosition: mw.Vector, context: string, type?: EnumDamageAppearanceType, addHp: boolean = false) {

        this.uiWidget.headUIMaxVisibleDistance = Globaldata.headUIMaxVisibleDistance;
        this.uiWidget.distanceScaleFactor = Globaldata.distanceScaleFactor;

        this.startPosition = startPosition
        this.endPosition.x = this.startPosition.x
        this.endPosition.y = this.startPosition.y
        this.endPosition.z = this.startPosition.z + 110
        this.uiWidget.worldTransform.position = startPosition


        this.txt_damage.visibility = mw.SlateVisibility.Collapsed;
        this.txt_blood.visibility = mw.SlateVisibility.Collapsed;
        this.txt_recover.visibility = mw.SlateVisibility.Collapsed;

        if (addHp) {

            this.txt_recover.visibility = mw.SlateVisibility.SelfHitTestInvisible;
            this.txt_recover.text = context;

            this.txt_recover.renderOpacity = 1

        } else {
            if (type && type == EnumDamageAppearanceType.player) {
                this.txt_blood.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.txt_blood.text = context;
                this.txt_blood.renderOpacity = 1
            }
            else {
                this.txt_damage.visibility = mw.SlateVisibility.SelfHitTestInvisible;
                this.txt_damage.text = context;
                this.txt_damage.renderOpacity = 1
            }
        }

        this.tween1.start()
    }

    update() {

    }
}