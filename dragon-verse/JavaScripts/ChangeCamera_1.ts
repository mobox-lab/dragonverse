@Component
export default class ChangeCamera extends Script {
    
    /** When a script is instanced, this function is called before the first frame is updated */
    protected onStart(): void {

        console.log("start");
        if (SystemUtil.isClient()) {
            this.initCamera();
        }
    }
    /**
     * Initialize the camera
     */
    private async initCamera() {

        //Get the camera in the scene
        let camera_1 = await GameObject.asyncFindGameObjectById("12FD161A") as Camera;
        let camera_2 = await GameObject.asyncFindGameObjectById("2B927FF5") as Camera;

        //Get the character's initial camera
        let camera_Default = Camera.currentCamera;

        //To add a button method, press the "1" key to switch to camera 1
        InputUtil.onKeyDown(Keys.One, () => {
            Camera.switch(camera_1, 1, CameraSwitchBlendFunction.EaseInOut,5)
        })

        //To add a button method, press the "2" key to switch to camera 2
        InputUtil.onKeyDown(Keys.Two, () => {
            Camera.switch(camera_2, 1, CameraSwitchBlendFunction.EaseInOut, 5)
        })

        //To add a button method, press the "3" key to switch to camera 3
        InputUtil.onKeyDown(Keys.Three, () => {
            Camera.switch(camera_Default,0)
        })
    }
}

