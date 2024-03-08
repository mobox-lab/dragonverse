/*
 * @Author       : sen.yu sen.yu@appshahe.com
 * @Date         : 2024-01-26 15:31:52
 * @LastEditors  : sen.yu sen.yu@appshahe.com
 * @LastEditTime : 2024-02-28 18:28:40
 * @FilePath     : \hauntedparadise\JavaScripts\codes\modules\guide\ExGuideModuleC.ts
 * @Description  : 
 */
import { AddGMCommand } from "module_gm";
import { GameConfig } from "../../../config/GameConfig";
import { MainUI } from "../../ui/MainUI";
import { GhostTraceHelper } from "../../utils/TraceHelper";
import { CameraCG } from "../cameraCG/CameraCG";
import ExGuideData from "./ExGuideData";
import ExGuideModuleS from "./ExGuideModuleS";
import UIGuidePop from "./ui/UIGuidePop";
import UIHallContent from "./ui/UIHallContent";
import UIHallPopUp from "./ui/UIHallPopUp";
import UISkip from "./ui/UISkip";
import UITarget from "./ui/UITarget";

AddGMCommand("测试引导CG", (player: mw.Player, val: string) => {
    ModuleService.getModule(ExGuideModuleC).testGuide()
}, null)

export type Message = {
    text: string
    deltaTime: number
}

const cameraJson1 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":5515.86,\"y\":-12427.92,\"z\":280.72},\"_rotation\":{\"x\":0,\"y\":-1.88,\"z\":-90.03},\"_fov\":90},{\"_time\":1.45,\"_location\":{\"x\":5632.96,\"y\":-12787.06,\"z\":280.72},\"_rotation\":{\"x\":0,\"y\":-14.42,\"z\":-200.13},\"_fov\":90},{\"_time\":2.85,\"_location\":{\"x\":5486.02,\"y\":-12880,\"z\":290.59},\"_rotation\":{\"x\":0,\"y\":-12.41,\"z\":-250},\"_fov\":90},{\"_time\":3.78,\"_location\":{\"x\":5391.96,\"y\":-12767.64,\"z\":266.04},\"_rotation\":{\"x\":0,\"y\":-15.68,\"z\":-304.1},\"_fov\":90},{\"_time\":6.2,\"_location\":{\"x\":5532.53,\"y\":-12645.72,\"z\":225.66},\"_rotation\":{\"x\":0,\"y\":0.44,\"z\":-269.82},\"_fov\":90},{\"_time\":6.71,\"_location\":{\"x\":5532.48,\"y\":-12626.56,\"z\":228.16},\"_rotation\":{\"x\":0,\"y\":0.44,\"z\":-269.82},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[]}"
const cameraJson2 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":5535.22,\"y\":-12633.62,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.51,\"z\":91.51},\"_fov\":90},{\"_time\":2.23,\"_location\":{\"x\":5534.82,\"y\":-12742.32,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90},{\"_time\":2.68,\"_location\":{\"x\":5532.83,\"y\":-12641.69,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90},{\"_time\":3.21,\"_location\":{\"x\":5532.95,\"y\":-12647.52,\"z\":227.78},\"_rotation\":{\"x\":0,\"y\":0.02,\"z\":91.14},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[{\"_time\":0,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"27BD6122\\\",\\\"visible\\\":false}\"},{\"_time\":0,\"_name\":\"CS.Visible\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"visible\\\":true}\"},{\"_time\":0.02,\"_name\":\"CS.Trans\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"position\\\":{\\\"x\\\":5533,\\\"y\\\":-12613.19,\\\"z\\\":229.7},\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":0.01,\\\"y\\\":0.01,\\\"z\\\":0.01}}\"},{\"_time\":2.83,\"_name\":\"CS.Trans\",\"_params\":\"{\\\"targetId\\\":\\\"193C51C2\\\",\\\"position\\\":{\\\"x\\\":5533,\\\"y\\\":-12613.19,\\\"z\\\":229.7},\\\"rotation\\\":{\\\"x\\\":0,\\\"y\\\":0,\\\"z\\\":0},\\\"scale\\\":{\\\"x\\\":1,\\\"y\\\":0.1,\\\"z\\\":1}}\"}]}"
const cameraJson3 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":10830.58,\"y\":-13894.37,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.91,\"z\":37.31},\"_fov\":90},{\"_time\":55.04,\"_location\":{\"x\":10844.82,\"y\":-13886.17,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-1282.69},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[]}"
const cameraJson4 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":10830.58,\"y\":-13894.37,\"z\":5378.85},\"_rotation\":{\"x\":0,\"y\":-89.91,\"z\":37.31},\"_fov\":90},{\"_time\":4.97,\"_location\":{\"x\":10844.82,\"y\":-13886.17,\"z\":52.2},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-482.69},\"_fov\":90},{\"_time\":6.8,\"_location\":{\"x\":10844.8,\"y\":-13886.18,\"z\":59.66},\"_rotation\":{\"x\":0,\"y\":-89.9,\"z\":-841.96},\"_fov\":90}],\"interpolation\":0,\"eventFrameInfos\":[]}"
const cameraJson5 = "{\"_frameInfos\":[{\"_time\":0,\"_location\":{\"x\":4252.54,\"y\":-6601.86,\"z\":2013},\"_rotation\":{\"x\":0,\"y\":19.57,\"z\":94.68},\"_fov\":90},{\"_time\":1.85,\"_location\":{\"x\":3211.72,\"y\":-3931.79,\"z\":2687.59},\"_rotation\":{\"x\":0,\"y\":-2.64,\"z\":113.26},\"_fov\":90},{\"_time\":3.5,\"_location\":{\"x\":2228.78,\"y\":-2475.55,\"z\":1460.45},\"_rotation\":{\"x\":0,\"y\":-29.4,\"z\":123.52},\"_fov\":90},{\"_time\":5.14,\"_location\":{\"x\":860.26,\"y\":-1848.24,\"z\":559.27},\"_rotation\":{\"x\":0,\"y\":-11.34,\"z\":141.22},\"_fov\":90},{\"_time\":7.81,\"_location\":{\"x\":-1169.36,\"y\":-703.5,\"z\":559.27},\"_rotation\":{\"x\":0,\"y\":-27.4,\"z\":32.16},\"_fov\":90},{\"_time\":10.05,\"_location\":{\"x\":-1175.17,\"y\":927.92,\"z\":557.23},\"_rotation\":{\"x\":0,\"y\":-19.24,\"z\":-24.91},\"_fov\":90},{\"_time\":12.23,\"_location\":{\"x\":240.71,\"y\":583.42,\"z\":306.21},\"_rotation\":{\"x\":0,\"y\":-8.63,\"z\":-16.73},\"_fov\":90},{\"_time\":13.87,\"_location\":{\"x\":1147.22,\"y\":949.43,\"z\":306.21},\"_rotation\":{\"x\":0,\"y\":-10.44,\"z\":122.7},\"_fov\":90},{\"_time\":14.69,\"_location\":{\"x\":1269.42,\"y\":1526.15,\"z\":304.27},\"_rotation\":{\"x\":0,\"y\":-6.2,\"z\":166.27},\"_fov\":90},{\"_time\":16.03,\"_location\":{\"x\":164.63,\"y\":1799.63,\"z\":304.27},\"_rotation\":{\"x\":0,\"y\":-12.44,\"z\":119.15},\"_fov\":90},{\"_time\":17.57,\"_location\":{\"x\":21.98,\"y\":2147.67,\"z\":304.17},\"_rotation\":{\"x\":0,\"y\":3.29,\"z\":90.29},\"_fov\":90},{\"_time\":20.02,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":20.45,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":20.88,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":21.18,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90},{\"_time\":22.46,\"_location\":{\"x\":-28.61,\"y\":1067.43,\"z\":706.34},\"_rotation\":{\"x\":0,\"y\":-10.14,\"z\":89.32},\"_fov\":90}],\"interpolation\":1,\"eventFrameInfos\":[]}"
export default class ExGuideModuleC extends ModuleC<ExGuideModuleS, ExGuideData> {
    private _dialogUI: UIHallPopUp;
    private _contentUI: UIHallContent
    private _camera: Camera;
    private _bornPoint: GameObject

    /** 是否跳过过 */
    private _isJumped: boolean = false;
    /** */
    private skipTraceArr: number[] = [1, 7, 9, 10]

    protected onAwake(): void {
        GameObject.asyncFindGameObjectById("27BD6122").then(obj => {
            AccountService.downloadData(obj as Character, () => {
                this._dialogUI = UIService.getUI(UIHallPopUp)
                this._contentUI = UIService.getUI(UIHallContent)
                this._contentUI.initMsgData(GameConfig.GuideTalk.getAllElement())
                this.checkGuide()
            })
        })

        GameObject.asyncFindGameObjectById("2964FB23").then(obj => {
            this._camera = obj as Camera
            GameObject.asyncFindGameObjectById("3198F16F").then(obj => {
                this._bornPoint = obj
            })
        })

    }

    private checkGuide() {
        UIService.hide(MainUI)
        if (this.data.guideStage == 3) {
            UIService.show(MainUI).applyHallPanel();
            return
        }
        switch (this.data.guideStage) {
            case 0:
                this.localPlayer.character.setVisibility(false, true);
                this.guideStage1()
                break
            case 1:
                this.guideStage2()
                break
            case 2:
                this.guideStage3()
                break
        }
    }

    public showContentUI() {
        this.traceAni(3);
        //显示被欺骗文本
        this._contentUI.showMessage(async () => {
            this.traceAni(4);
            await TimeUtil.delaySecond(2)
            //再次弹出对话框
            this._dialogUI.changeContent()
            UIService.showUI(this._dialogUI);
            await TimeUtil.delaySecond(3)
            this.traceAni(5);
            //显示准备好前往幸福生活
            this._contentUI.showMessage(async () => {
                await TimeUtil.delaySecond(1)
                UIService.hideUI(this._contentUI);

                this.traceAni(6);
                UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
                CameraCG.instance.play(cameraJson2, async () => {
                    UIService.hide(UISkip)
                    CameraCG.instance.play(cameraJson3, null, false)//播放第三段动画
                    await TimeUtil.delaySecond(1.5)

                    this.traceAni(7);
                    this._contentUI.showMessage(() => {
                        UIService.hideUI(this._contentUI);
                        CameraCG.instance.stop(true);
                        this.reqGuideComplete(1);//完成第一阶段引导
                        UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
                        this.traceAni(8);
                        CameraCG.instance.play(cameraJson4, () => {
                            UIService.hide(UISkip)
                            this.guideStage2()
                        }, false)
                    })
                }, false)
            })
        });
    }

    private guideStage1() {
        this.traceAni(0);
        UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
        CameraCG.instance.play(cameraJson1, async () => {
            await TimeUtil.delaySecond(2)
            UIService.hide(UISkip)
            this.traceAni(1);
            UIService.showUI(this._dialogUI);
        }, false)
    }

    private traceAni(aniId: number) {
        GhostTraceHelper.hallAniTrace(aniId, this.skipTraceArr.includes(aniId), this._isJumped);
        this._isJumped = false;
    }

    private async guideStage2() {
        Camera.switch(this._camera);
        this.localPlayer.character.setVisibility(true, true);
        this.localPlayer.character.worldTransform.position = this._bornPoint.worldTransform.position.clone().add(new Vector(0, 0, 300))
        await TimeUtil.delaySecond(2)
        this._bornPoint.setVisibility(false);
        UIService.show(UISkip, () => { this._isJumped = true; CameraCG.instance.stop(true) })
        //动画四
        CameraCG.instance.activeCGCamera()
        this.traceAni(9);
        CameraCG.instance.play(cameraJson5, () => {
            this.traceAni(10);
            UIService.hide(UISkip)
            UIService.show(UIGuidePop)
            this.reqGuideComplete(2);//完成第二阶段引导
        }, true)
    }

    public guideStage3() {
        CameraCG.instance.exitFreeCamera()
        UIService.show(MainUI).applyHallPanel();
        UIService.show(UITarget, new Vector(0, 2300, 150), () => {
            this.traceAni(11);
            this.reqGuideComplete(3);//完成第二阶段引导
        })
    }

    public reqGuideComplete(stage: number) {
        this.server.net_completeGuide(stage)
    }

    testGuide() {
        this.data.guideStage = 0
        this.checkGuide()
    }
}