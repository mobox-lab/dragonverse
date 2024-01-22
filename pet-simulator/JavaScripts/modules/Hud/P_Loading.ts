import Loading_Generate from "../../ui-generate/common/Loading_generate";

export class P_Loading extends Loading_Generate {

    private startPos1: Vector2 = new Vector2(280, -1680);
    private startPos2: Vector2 = new Vector2(-648, 408);
    private posDiff:number[] = [928, 2088];
    /**x增加和y减少的比值 */
    private ratio: number[] = [4, 9];
    /**移动速度 */
    private speed: number = 200;
    /**当前是否移动第一张图 */
    private isMove1: boolean = true;

    show(...param): void {
        super.show(...param);
        this.canUpdate = true;
    }

    onUpdate(dt: number): void {
        this.onLoading(dt);
    }

    /**两张图片轮询出现按照24的角度往上移动 */
    private onLoading(dt: number): void {
        let speed = this.speed * dt;
        let img1: mw.Image = this.isMove1 ? this.mPic_load : this.mPic_load_1;
        let img2: mw.Image = this.isMove1 ? this.mPic_load_1 : this.mPic_load;
        let pos1 = img1.position.clone();
        let pos2 = img2.position.clone();
        pos1.x += speed;
        pos1.y -= speed / this.ratio[0] * this.ratio[1];
        pos2.x += speed;
        pos2.y -= speed / this.ratio[0] * this.ratio[1];
        if(pos1.x > 648) {
            this.isMove1 = !this.isMove1;
            pos1.x = pos2.x - this.posDiff[0];
            pos1.y = pos2.y + this.posDiff[1];
        }
        img1.position = pos1;
        img2.position = pos2;
    }

}