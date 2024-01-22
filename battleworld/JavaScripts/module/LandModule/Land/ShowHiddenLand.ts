import { GameConfig } from "../../../config/GameConfig";
import { ELandCommon_Event_C } from "../../../const/Enum";
import { Globaldata } from "../../../const/Globaldata";
import { EventManager } from "../../../tool/EventManager";
import { LandManagerS } from "./LandManagerS";

/**
 * 显示隐藏地形
 */
@Component
export default class ShowHiddenLand extends Script {

    /**所有地形ids*/
    public static landIds: number[] = [];


    /**地形guid*/
    @mw.Property({ replicated: true, onChanged: "onChange_landid" })
    public landid: number = -1;

    /**绑定地形子节点 */
    private landChild: GameObject = null;

    /**绑定地形 */
    private land: GameObject = null;


    /**材质 */
    private mis: Array<mw.MaterialInstance> = null;

    /**绑定物体id缓存*/
    private landidCatch: number = -1;

    /**延迟 */
    private timeKey: number = null;

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {

    }

    private preLandId: number = -1;


    private async onChange_landid() {


        if (this.preLandId == this.landid) {
            return;
        }
        this.preLandId = this.landid;


        if (this.landid == -1) {
            this.backMaterial();
            return;
        }

        let cfg = GameConfig.LandParcel.getElement(this.landid);
        this.land = await mw.GameObject.asyncFindGameObjectById(cfg.Guid);
        let modle = this.land as mw.Model;
        let chidren = modle.getChildren();
        if (chidren.length > 0) {
            this.landChild = chidren[0];
            (this.landChild as Model).setMaterial(Globaldata.land_replaceMaterial);
        }
        modle.setMaterial(Globaldata.land_replaceMaterial);
        ShowHiddenLand.landIds.push(this.landid);
        this.landidCatch = this.landid;

        //延迟执行 不然会有问题
        this.timeKey = setTimeout(() => {
            this.timeKey = null;
            //编辑器BG 2个材质替换setMaterial就会有问题 ?
            //modle.createMateriaInstance(0);
            this.mis = modle.getMaterialInstance();

            // 监听透明度变化
            let include = EventManager.instance.includes(ELandCommon_Event_C.LaneCommonEvent_Opcatity_C, this.listen_landOpacity, this);
            if (include == false) {
                EventManager.instance.add(ELandCommon_Event_C.LaneCommonEvent_Opcatity_C, this.listen_landOpacity, this);
            }
        }, 500);
    }


    private listen_landOpacity(opacity: number) {
        this.setOpacity(opacity);
    }

    /**切换回之前的材质 */
    private backMaterial() {
        // 移除监听透明度变化
        EventManager.instance.remove(ELandCommon_Event_C.LaneCommonEvent_Opcatity_C, this.listen_landOpacity, this);

        this.clear_delay();

        // 设置为不透明要不会闪一下
        this.setOpacity(1);
        this.mis = null;

        if (this.land) {
            let modle = this.land as mw.Model;
            modle.setMaterial(Globaldata.land_material);
        }
        this.land = null;
        if (this.landChild) {
            (this.landChild as Model).setMaterial(Globaldata.land_childMaterial);
        }
        this.landChild = null;
        if (this.landidCatch != -1) {
            const index = ShowHiddenLand.landIds.findIndex((value) => { return value == this.landidCatch });
            if (index != -1) {
                ShowHiddenLand.landIds.splice(index, 1);
            }
        }
        this.landidCatch = -1;


    }

    private clear_delay() {
        if (this.timeKey != null) {
            clearTimeout(this.timeKey);
            this.timeKey = null;
        }
    }

    /**
     * 设置透明度
     */
    private setOpacity(value: number) {
        if (this.mis == null) {
            return;
        }
        this.mis.forEach(mi => {
            // 获取当前材质的浮点参数
            let aspns = mi.getAllScalarParameterName();
            aspns.forEach(aspn => {
                // 设置当前材质的浮点参数
                // console.log("ShowHiddenLand aspn",aspn,value);
                if (aspn == "Main_Opacity_Max") {
                    mi.setScalarParameterValue(aspn, value);
                }
            });
        });
    }

    /**--------------------------------服务器--------------------------------- */



    /**
     * 创建
     */
    public async creat(landid: number) {
        this.landid = landid;

        let cfg = GameConfig.LandParcel.getElement(this.landid);
        this.land = await mw.GameObject.asyncFindGameObjectById(cfg.Guid);

        LandManagerS.instance.addShowHiddenLand(this);
        LandManagerS.instance.startShowHideLand();
    }


    public getLand() {
        return this.land;
    }

    /**
     * 回收
     */
    public recycle() {

        LandManagerS.instance.stopShowHideLand();

        if (this.land) {
            this.land.setCollision(mw.PropertyStatus.On);
        }

        this.landid = -1;
    }



}