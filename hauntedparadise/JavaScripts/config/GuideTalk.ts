import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","content","deltaTime"],["","",""],[1,["咦嘻嘻嘻嘻嘻，你被骗了！","咦嘻嘻嘻嘻嘻嘻嘻，啊哈哈哈哈哈哈！"],[50,50]],[2,["准备好前往你的幸福生活了吗？","咦嘻嘻嘻嘻嘻嘻嘻，啊哈哈哈哈哈哈！","3","2","1"],[50,50,1000,1000,1000]],[3,["咦嘻嘻嘻嘻嘻嘻嘻，啊哈哈哈哈哈哈？ ","想回去吗，来打败我啊~","想打败我吗，先见到我再说~","想见到我吗，多多通过大门的试炼我或许可以考虑一下~","咦嘻嘻嘻嘻嘻嘻嘻，啊哈哈哈哈哈哈！"],[50,50,50,50,50]]];
export interface IGuideTalkElement extends IElementBase{
 	/**id*/
	id:number
	/**对话内容*/
	content:Array<string>
	/**字符显示间隔*/
	deltaTime:Array<number>
 } 
export class GuideTalkConfig extends ConfigBase<IGuideTalkElement>{
	constructor(){
		super(EXCELDATA);
	}

}