
@Component
export default class GraphicItem extends Script {
    @Property({ displayName: "生成的预制体" })
    public assetId: string = "";
    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        GameObject.asyncSpawn(this.assetId, { replicates: false }).then(go => { 
            go.parent = this.gameObject;
            go.worldTransform.scale = Vector.one;
            go.localTransform.position = Vector.zero;
            go.localTransform.rotation = Rotation.zero;
            //go.setCollision(PropertyStatus.Off);
            console.log("垃圾桶形象生成完毕")
            this.setGhostIgnore(go);
            setInterval(() => { 
                if (!Vector.equals(Vector.one, go.worldTransform.scale, 0.01)) { 
                    go.worldTransform.scale = Vector.one;
                }
            },2000)
        });
    }

    private setGhostIgnore(go: GameObject) { 
        go["ghostIgnore"] = true;
        let children = go.getChildren();
        children.forEach(e => { 
            this.setGhostIgnore(e)
        })

    }
}
