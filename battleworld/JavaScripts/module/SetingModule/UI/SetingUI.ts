import Setting_Main_Generate from "../../../ui-generate/Setting/Setting_Main_generate";
import { EModule_Events } from "../../../const/Enum";
import { EventManager } from "../../../tool/EventManager";
import { Globaldata } from "../../../const/Globaldata";
import { AnalyticsTool, EPageName } from "../../AnalyticsModule/AnalyticsTool";

/**设置*/
export default class SetingUI extends Setting_Main_Generate {

    private curShadow: boolean = false;


    onStart() {


        this.mScroll_CPU.currentValue = GraphicsSettings.getCPULevel();
        this.mScroll_GPU.currentValue = GraphicsSettings.getGPULevel();
        this.mScroll_BGM.currentValue = SoundService.BGMVolumeScale;
        this.mScroll_Voice.currentValue = SoundService.volumeScale;
        this.mScroll_InputScale.currentValue = this.getInputScale();
        this.mScroll_Saturation.currentValue = mw.PostProcess.saturation; //this.setingMoudleC.postProcess.globalSaturation;
        this.curShadow = mw.Lighting.castShadowsEnabled;

        this.changeSaturationUI();

        new ReturnItem(this.mScroll_CPU, this.mBtn_Return_CPU);
        new ReturnItem(this.mScroll_GPU, this.mBtn_Return_GPU);
        new ReturnItem(this.mScroll_InputScale, this.mBtn_Return_InputScale);
        new ReturnItem(this.mScroll_Saturation, this.mBtn_Return_Saturation);

        this.mScroll_CPU.sliderButtonReleaseDelegate.add(this.onCPUChanged.bind(this));
        this.mScroll_GPU.sliderButtonReleaseDelegate.add(this.onGPUChanged.bind(this));
        this.mScroll_InputScale.sliderButtonReleaseDelegate.add(this.onInputScaleChanged.bind(this));
        this.mScroll_Saturation.sliderButtonReleaseDelegate.add(this.onSaturationChanged.bind(this));
        this.mScroll_Voice.sliderButtonReleaseDelegate.add(this.onVoiceChanged.bind(this));
        this.mScroll_BGM.sliderButtonReleaseDelegate.add(this.onBGMChanged.bind(this));
        this.mBtn_Back.onClicked.add(this.onBack.bind(this));
        this.mBtn_Shadow.onClicked.add(this.onSaturationClicked.bind(this));
        this.mBtn_Lock.onClicked.add(this.onLockClicked.bind(this));

        EventManager.instance.add(EModule_Events.SetingModuleC_cameratargetArmLength, this.listen_cameraTargetArmLength.bind(this));

    }


    onShow() {
        this.mScroll_CPU.currentValue = GraphicsSettings.getCPULevel();
        this.mScroll_GPU.currentValue = GraphicsSettings.getGPULevel();
        this.mScroll_BGM.currentValue = SoundService.BGMVolumeScale;
        this.mScroll_Voice.currentValue = SoundService.volumeScale;
        this.mScroll_InputScale.currentValue = this.getInputScale();
        this.mScroll_Saturation.currentValue = mw.PostProcess.saturation;  //this.setingMoudleC.postProcess.globalSaturation;
        this.curShadow = mw.Lighting.castShadowsEnabled;
        this.changeSaturationUI();
        this.refresh_lockBtn();
        // 埋点
        AnalyticsTool.send_ts_page(EPageName.setting);
    }

    listen_cameraTargetArmLength(value: number) {
        this.mScroll_InputScale.currentValue = this.getInputScale();
    }

    getInputScale() {
        /**fix:at CameraSystem.get targetArmLength access a invalid object*/
        try {
            if (Camera.currentCamera == null) {
                return Globaldata.targetArmMinLen;
            }
            return (Camera.currentCamera.springArm.length - Globaldata.targetArmMinLen) / (Globaldata.targetArmMaxLen - Globaldata.targetArmMinLen);
        }
        catch (e) {

        }
    }

    onCPUChanged(value: number) {
        if (value == GraphicsSettings.getCPULevel()) return;
        GraphicsSettings.setGraphicsCPULevel(value);
    }

    onGPUChanged(value: number) {
        if (value == GraphicsSettings.getGPULevel()) return;
        GraphicsSettings.setGraphicsGPULevel(value);
    }

    onInputScaleChanged(value: number) {
        let target = value * (Globaldata.targetArmMaxLen - Globaldata.targetArmMinLen) + Globaldata.targetArmMinLen;
        Camera.currentCamera.springArm.length = target;
    }

    onSaturationChanged(value: number) {
        mw.PostProcess.saturation = (value);
        // this.setingMoudleC.postProcess.globalSaturation = value;
    }

    onVoiceChanged(value: number) {
        SoundService.volumeScale = value;
    }

    onBGMChanged(value: number) {
        SoundService.BGMVolumeScale = value;
    }

    onBack() {

        mw.UIService.hideUI(this);
    }

    onSaturationClicked() {
        this.curShadow = !this.curShadow;
        mw.Lighting.castShadowsEnabled = this.curShadow;
        this.changeSaturationUI();
    }

    changeSaturationUI() {
        this.mBtn_Shadow.text = !this.curShadow ? "ON" : "OFF";
    }

    onLockClicked() {
        Globaldata.isAutoLockEnemy = !Globaldata.isAutoLockEnemy;

        this.refresh_lockBtn();
    }

    private refresh_lockBtn() {
        this.mBtn_Lock.text = Globaldata.isAutoLockEnemy ? "ON" : "OFF";
    }


}

class ReturnItem {
    private baseNum: number = 0;
    private bar: mw.ProgressBar;
    private returnBtn: mw.Button;
    constructor(_bar: mw.ProgressBar, returnBtn: mw.Button) {
        this.bar = _bar;
        this.returnBtn = returnBtn;
        this.baseNum = this.bar.currentValue;
        this.returnBtn.onClicked.add(this.onReturn.bind(this));
        this.bar.onSliderValueChanged.add(this.onSliderValueChanged.bind(this));
    }

    onSliderValueChanged(value: number) {
        let visible = this.baseNum != value ? mw.SlateVisibility.Visible : mw.SlateVisibility.Collapsed;
        this.returnBtn.visibility = visible;
    }

    onReturn() {
        this.bar.currentValue = this.baseNum;
        this.returnBtn.visibility = mw.SlateVisibility.Collapsed;
        this.bar.sliderButtonReleaseDelegate.broadcast(this.bar.currentValue);
    }
}
