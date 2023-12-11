/** 
 * @Author       : zewei.zhang
 * @Date         : 2023-12-10 13:26:42
 * @LastEditors  : zewei.zhang
 * @LastEditTime : 2023-12-11 15:55:47
 * @FilePath     : \dragonverse\JavaScripts\gameplay\water-dragon\CloudEffect.ts
 * @Description  : 云朵交互物
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

                element.getChildren().forEach(cloud => {

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


            if (distance < 50) {
                element.worldTransform.scale = new Vector(distance / 50, distance / 50, distance / 50);
            }

            if (distance > Math.abs(endPos - startPos) - 50) {
                element.worldTransform.scale = new Vector((pos - startPos) / 50, (pos - startPos) / 50, (pos - startPos) / 50);
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

    /** 
     * @description: 获取可以销毁的云朵锚点
     */
    public getCanDestroyClouds(): string {

        for (let i = 0; i < this.cloudsParents.length; i++) {
            if (this.cloudsParents[i]) {
                return this.cloudsParents[i].gameObjectId;
            }
        }
    }

    /** 
     * @description: 销毁锚点下的云朵
     * @param anchorGuid 锚点guid
     */
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