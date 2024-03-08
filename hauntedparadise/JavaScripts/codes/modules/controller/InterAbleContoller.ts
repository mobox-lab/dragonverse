import { BoardHelper } from "../blackboard/BoardDefine";

@Component
export default class InterAbleContoller extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) { 
            return;
        }
        Event.addLocalListener("evt_changeInterAble", (goid: string,val: string) => { 
            if (goid != this.gameObject.gameObjectId) { 
                return;
            }
            if (val == "true") {
                this.setInter(true, this.gameObject);
                if(this.gameObject.getCollision() != CollisionStatus.QueryOnly && this.gameObject.getCollision() != CollisionStatus.On){
                    this.gameObject.setCollision(CollisionStatus.QueryOnly);
                }
            }
            else { 
                this.setInter(false, this.gameObject);
            }
            
        })
    }

    private setInter(isInter:boolean,go:GameObject) { 
        if (!isInter) {
            go.tag = "";
        }
        else { 
            go.tag = "interObj";
        }
        go.getChildren().forEach(e => { 
            this.setInter(isInter,e);
        })
    }
}