
@Component
export default class PrintArr extends Script {

    /** 当脚本被实例后，会在第一帧更新前调用此函数 */
    protected onStart(): void {
        if (SystemUtil.isServer()) {
            return;
        }
        let childs = this.gameObject.getChildren();
        let res: Vector[] = [];
        let res2: Rotation[] = [];
        let res3: string[] = [];
        for (let index = 0; index < childs.length; index++) {
            const element = childs[index];
            this.add2Arr(element, res);
            this.add2Arr2(element, res2);
            this.add2Arr3(element, res3);
        }
        let str = "";
        let str2 = "";
        let json = { dataArr: [], rotArr: [], guid: this.gameObject.gameObjectId };
        for (let index = 0; index < res.length; index++) {
            const element = res[index];
            const element2 = res2[index]
            if (index != 0) {
                str += "||";
                str2 += "||";
            }
            str += element.x + "|" + element.y + "|" + element.z;
            str2 += element2.x + "|" + element2.y + "|" + element2.z;
            json.dataArr.push({ vec: element, rot: element2, name: res3[index] })
        }
        console.log(this.gameObject.gameObjectId + "printArr:" + str);
        console.log(str2)
        console.log(JSON.stringify(json));
    }

    private add2Arr(go: GameObject, arr: Vector[]) {
        arr.push(go.worldTransform.position);
        let childs = go.getChildren();
        childs.forEach(e => {
            this.add2Arr(e, arr);
        })
    }

    private add2Arr2(go: GameObject, arr: Rotation[]) {
        arr.push(go.worldTransform.rotation);
        let childs = go.getChildren();
        childs.forEach(e => {
            this.add2Arr2(e, arr);
        })
    }

    private add2Arr3(go: GameObject, arr: string[]) {
        arr.push(go.name);
        let childs = go.getChildren();
        childs.forEach(e => {
            this.add2Arr3(e, arr);
        })
    }
}