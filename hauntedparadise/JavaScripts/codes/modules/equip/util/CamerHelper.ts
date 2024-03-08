
/** 球形检测半径 */
const CheckRadius: number = 2e3;

export class CameraUtilHelper {

	private constructor() { }

	/**
	 * 照一个像
	 * @param targetTags 要照相的目标的tag值数组
	 * @param newTag 这个对象的新标签，因为tag可能被占用了，可能是一个专门用于照相的tag
	 */
	public static takeAShot(targetTags: string[], newTag: string = "tag"): string[] {
		const trans = Camera.currentCamera.worldTransform;
		const startPos = trans.position.add(trans.getForwardVector().multiply(CheckRadius));
		let radius = CheckRadius;
		const hitRes = QueryUtil.sphereOverlap(startPos, radius);
		// 成功拍到的对象tag值列表
		const successList: string[] = [];
		hitRes.forEach(res => {
			if (res && !(res instanceof Trigger)) {
				if (targetTags.includes(res[newTag]) && this.judgeIsInFOV(res)) {
					successList.push(res[newTag]);
				}
			}
		});
		return successList;
	}

	/**
	 * 给obj从玩家头上打一条射线，看obj是否在视野范围之内
	 * @param obj 给这个对象发射线，看它是否在视线范围之内
	 * @returns 是否在视野之内
	 */
	public static judgeIsInFOV(obj: GameObject): boolean {
		const cameraTrans = Camera.currentCamera.worldTransform;
		const objTrans = obj.worldTransform;
		const betweenPos = Vector.subtract(objTrans.position, cameraTrans.position);

		//求两个向量的夹角,同时打射线
		const angel = this.calculateAngleBetweenVectors(Camera.currentCamera.worldTransform.getForwardVector(), betweenPos);
		// 如果在视野范围之外就直接过滤掉先了
		if (angel > Camera.currentCamera.fov / 2) { return false; }

		// 再发射线过滤可能被墙挡住的
		// 这个obj可能会被墙挡住，被挡住的话就不算了
		// 会多发几条射线，确保视野内被挡住不算太多也算拍到

		const playerTrans = Player.localPlayer.character.worldTransform;
		// 射线1
		let res1 = this.lineTrace(cameraTrans.position.add(this.zOff1), objTrans.position, obj);
		if (res1) { return true; }

		// 射线2
		let res2 = this.lineTrace(playerTrans.position, objTrans.position.add(this.zOff1), obj);
		if (res2) { return true; }

		// 射线3
		let res3 = this.lineTrace(playerTrans.position, objTrans.position, obj);
		if (res3) { return true; }

		// 射线4
		let res4 = this.lineTrace(cameraTrans.position.add(this.zOff1), objTrans.position.add(this.zOff1), obj);
		if (res4) { return true; }

		// 射线5
		let res5 = this.lineTrace(cameraTrans.position.add(this.xOff1), objTrans.position, obj);
		if (res5) { return true; }

		// 射线6
		let res6 = this.lineTrace(playerTrans.position.add(this.xOff2), objTrans.position, obj);
		if (res6) { return true; }

		// 射线5
		let res7 = this.lineTrace(playerTrans.position.add(this.xOff1), objTrans.position.add(this.xOff1), obj);
		if (res7) { return true; }

		// 射线6
		let res8 = this.lineTrace(playerTrans.position.add(this.xOff2), objTrans.position.add(this.xOff2), obj);
		if (res8) { return true; }

		return false;
	}

	private static xOff1: Vector = new Vector(60, 0, 0);

	private static xOff2: Vector = new Vector(-60, 0, 0);

	private static zOff1: Vector = new Vector(0, 0, 50);

	/**
	 * 射线检测找一个不被遮挡的物体
	 * @param startPos 起点
	 * @param endPos 终点
	 * @param targetObj 目标物体
	 * @returns 是否找到
	 */
	private static lineTrace(startPos: Vector, endPos: Vector, targetObj: GameObject) {
		if (!endPos) { return false; }
		let hitRes = QueryUtil.lineTrace(startPos, endPos, true)
		/** 遍历射线列表，过滤掉自己和触发器，如果遇到非obj其他模型就break */
		for (const res of hitRes) {
			if (res.gameObject) {
				if (res.gameObject instanceof Trigger) { continue; }
				if (res.gameObject instanceof Character && (res.gameObject as Character) === Player.localPlayer.character) { continue; }
				if (res.gameObject != targetObj) { break; }
				if (res.gameObject === targetObj) { return true; }
			}
		}
		return false
	}

	/**
	 * 计算两个向量的夹角
	 * @param vectorA 
	 * @param vectorB 
	 * @returns 
	 */
	public static calculateAngleBetweenVectors(vectorA, vectorB) {
		const dotProduct = vectorA.x * vectorB.x + vectorA.y * vectorB.y;
		const magnitudeA = Math.sqrt(vectorA.x ** 2 + vectorA.y ** 2);
		const magnitudeB = Math.sqrt(vectorB.x ** 2 + vectorB.y ** 2);

		// 计算余弦值
		const cosineTheta = dotProduct / (magnitudeA * magnitudeB);

		// 计算夹角（弧度）
		const angleInRadians = Math.acos(cosineTheta);

		return angleInRadians * (180 / Math.PI);
	}
}