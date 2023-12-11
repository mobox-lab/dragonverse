/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-10 13:26:42
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-11 09:56:05
 * @FilePath     : \dragonverse\JavaScripts\gameplay\water-dragon\CloudEffect.ts
 * @Description  : 修改描述
 */

@Component
export default class CloudEffect extends mw.Script {
    clouds: GameObject[] = [];
    cloudsParents: GameObject[] = [];
    startPoint: GameObject;
    endPoint: GameObject;

    protected onStart(): void {

        this.gameObject.getChildren().forEach(element => {
            if (element.name === "clouds") {
                this.cloudsParents.push(element);
                let gameObjects = element.getChildren();
                element.getChildren().forEach(cloud => {
                    // let model = cloud as Model;
                    // model.setMaterial("CFC315E4411B5BBB4143F492D0140620");
                    this.clouds.push(cloud);

                });

            }
        });
        this.startPoint = this.gameObject.getChildByName("startPoint");
        this.endPoint = this.gameObject.getChildByName("endPoint");

        this.useUpdate = true;
        InputUtil.onKeyDown(Keys.Q, () => {
            this.destroyClouds(this.getCanDestroyClouds());
        });
    }


    protected onUpdate(dt: number): void {
        this.clouds.forEach(element => {
            let pos = element.localTransform.position.x;
            let endPos = this.endPoint.localTransform.position.x;
            let startPos = this.startPoint.localTransform.position.x;
            let distance = endPos - pos;
            // let model = element as Model;

            if (distance < 50) {
                // console.log("在两边")
                // if (val) {
                //     console.log("transparent");
                //     model.setMaterial("D7138AC14D2C2DA72116BC872EC00DCF");
                //     this.clouds.set(key, false);
                // }
                // model.getMaterialInstance()[0].setScalarParameterValue("Global_Opacity", distance / 50);
                element.worldTransform.scale = new Vector(distance / 50, distance / 50, distance / 50);
            }

            if (distance > Math.abs(endPos - startPos) - 50) {
                // model.getMaterialInstance()[0].setScalarParameterValue("Global_Opacity", (pos - startPos) / 50);
                element.worldTransform.scale = new Vector((pos - startPos) / 50, (pos - startPos) / 50, (pos - startPos) / 50);
            }
            //改变材质
            if (distance >= 50 && distance <= Math.abs(endPos - startPos) - 50) {
                // console.log("在中间", val)
                // if (!val) {
                //     console.log("normal");
                //     model.setMaterial("CFC315E4411B5BBB4143F492D0140620");
                //     this.clouds.set(key, true);
                // }

            }

            //改变位置
            if (distance < 1) {
                element.localTransform.position = new Vector(startPos, element.localTransform.position.y, element.localTransform.position.z);
            } else {

                let speed = 1;
                element.localTransform.position = new Vector(pos + speed, element.localTransform.position.y, element.localTransform.position.z);
            }
        });
    }

    public getCanDestroyClouds(): string {

        for (let i = 0; i < this.cloudsParents.length; i++) {
            if (this.cloudsParents[i]) {
                return this.cloudsParents[i].gameObjectId;
            }
        }
    }

    public destroyClouds(anchorGuid: string) {

        let cloudsParent = this.cloudsParents.find(element => element.gameObjectId === anchorGuid);

        if (cloudsParent) {
            cloudsParent.getChildren().forEach(element => {
                EffectService.playAtPosition("89589", element.worldTransform.position, { duration: 3, scale: new Vector(2, 2, 2) });

            });

            cloudsParent.getChildren().forEach(element => {
                new mw.Tween(element.worldTransform.scale.clone()).to(new Vector(0, 0, 0), 500).onUpdate((value) => {
                    element.worldTransform.scale = value;
                }).onComplete(() => {
                    this.clouds.splice(this.clouds.indexOf(element), 1);
                    element.destroy();
                    if (this.clouds.length === 0 && this.cloudsParents.length === 0) {
                        //全部销毁
                        this.gameObject.destroy();
                    }
                }).start();
            });
            this.cloudsParents.splice(this.cloudsParents.indexOf(cloudsParent), 1);
        }
    }
}