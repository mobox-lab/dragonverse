import { GeneralManager, } from '../../Modified027Editor/ModifiedStaticAPI';
import { ModifiedCameraSystem, CameraModifid, CameraSystemData, } from '../../Modified027Editor/ModifiedCamera';
import { CameraManger } from "../../tool/CameraManger";
import { EventManager } from "../../tool/EventManager";
import { Singleton } from "../../tool/FunctionUtil";
import MotionEditorWindow_Generate from "../../ui-generate/editor_motion/MotionEditorWindow_generate";
import { UIEvent_editMotion } from "./UIEvent_editMotion";

@Singleton()
export class MotionDisplay {
    public static instance: MotionDisplay = null;

    private camera: Camera;
    private playerChar: mw.Character;

    public moveCamera: boolean = false;
    private motionEditorWindow: MotionEditorWindow_Generate = null;

    /**相机切换缓存数据 */
    private _initCameraData: CameraSystemData = null;


    private touch: mw.TouchInput;
    private lastLoc: mw.Vector2;

    public init() {
        this.playerChar = Player.localPlayer.character;

        this.camera = Camera.currentCamera;

        InputUtil.onKeyPress(mw.Keys.W, () => {
            if (this.moveCamera == false) {
                return;
            }
            let loc = this.camera.worldTransform.clone().position;
            let addLoc = GeneralManager.modifyGetShootDir(this.playerChar, loc).normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.W, () => {
            if (this.moveCamera == false) {
                return;
            }
            let loc = this.camera.worldTransform.clone().position;
            let addLoc = GeneralManager.modifyGetShootDir(this.playerChar, loc).normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });
        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(mw.Keys.S, () => {
            if (this.moveCamera == false) {
                return;
            }
            let loc = this.camera.worldTransform.clone().position;
            let addLoc = GeneralManager.modifyGetShootDir(this.playerChar, loc).normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.S, () => {
            if (this.moveCamera == false) {
                return;
            }
            let loc = this.camera.worldTransform.clone().position;
            let addLoc = GeneralManager.modifyGetShootDir(this.playerChar, loc).normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(mw.Keys.A, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getRightVector().normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.A, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getRightVector().normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(mw.Keys.D, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getRightVector().normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.D, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getRightVector().normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });
        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(mw.Keys.Q, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getUpVector().normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.Q, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getUpVector().normalized.multiply(-20);
            this.cameraTranslate(addLoc)
        });
        // 拍照模式移动镜头位置
        InputUtil.onKeyPress(mw.Keys.E, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getUpVector().normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });
        InputUtil.onKeyDown(mw.Keys.E, () => {
            if (this.moveCamera == false) {
                return;
            }
            let addLoc = this.camera.worldTransform.getUpVector().normalized.multiply(20);
            this.cameraTranslate(addLoc)
        });

        this.motionEditorWindow = mw.UIService.getUI(MotionEditorWindow_Generate, false);


        this.motionEditorWindow.mcamera_StartBtn.onClicked.add(() => {

            this.listen_cameraMove(!this.moveCamera);
        });

        InputUtil.onKeyDown(mw.Keys.MouseScrollUp, () => {
            this.camera.springArm.length -= 30;
        })
        InputUtil.onKeyDown(mw.Keys.MouseScrollDown, () => {
            this.camera.springArm.length += 30;
        })



        this.touch = new mw.TouchInput();
        //this.touch.setPlayerController();
        this.touch.onTouchBegin.add(this.onTouchBegin.bind(this));
        this.touch.onTouchMove.add(this.onTouchMove.bind(this));


        this.refresh_camera();
    }

    private listen_cameraMove(move: boolean) {
        this.moveCamera = move;
        Player.localPlayer.character.movementEnabled
        this.refresh_camera();
    }

    onTouchMove(index: number, loc: mw.Vector2) {

        if (this.moveCamera == false) return;

        let vec = this.lastLoc.clone().subtract(loc);
        let trans = this.camera.worldTransform.clone().clone();
        trans.rotation.z -= vec.x * 0.1;
        trans.rotation.y += vec.y * 0.1;

        this.camera.worldTransform = trans;
        this.lastLoc = loc.clone();
    }

    onTouchBegin(index: number, loc: mw.Vector2) {

        if (this.moveCamera == false) return;

        this.lastLoc = loc;
    }



    private refresh_camera() {
        this.motionEditorWindow.mcamera_StartBtn.text = this.moveCamera ? "开启" : "关闭";

        if (this.moveCamera) {

            this._initCameraData = CameraManger.instance.saveCamera();

            let tran = this.camera.worldTransform.clone().clone();

            this.camera.springArm.collisionEnabled = false;
            // this.camera.positionMode = mw.CameraPositionMode.PositionFixed;
            this.camera.rotationMode = mw.CameraRotationMode.RotationFixed

            ModifiedCameraSystem.followTargetEnable = false;

            this.playerChar.movementEnabled = false;
            this.playerChar.jumpEnabled = false;
        } else {
            this.camera.springArm.collisionEnabled = true;

            // this.camera.positionMode = mw.CameraPositionMode.PositionFollow;
            this.camera.rotationMode = mw.CameraRotationMode.RotationControl

            ModifiedCameraSystem.followTargetEnable = true;

            if (this._initCameraData) {
                CameraManger.instance.resetCamera(this._initCameraData);
            }

            this.playerChar.movementEnabled = true;
            this.playerChar.jumpEnabled = true;
        }
    }

    //按键移动
    private cameraTranslate(dir: mw.Vector) {
        let trans = this.camera.worldTransform.clone();
        trans.position = trans.position.add(dir);
        this.camera.worldTransform = trans;
    }



}