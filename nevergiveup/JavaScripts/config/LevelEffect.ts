import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","effectGuid","slot","nameCN","circulate","location"],["","","","","",""],[1,"E718B09E4408CE5534779780E5365B64",10,"炫酷的特效",true,[10,10,100]],[2,"E141AC6246FA01BC41E98BB4D9423F80",23,null,true,[0,0,100]],[3,"E0D79BB64C2DCD08AEC54388C11A6AE7",23,null,true,[0,0,100]],[4,"1D729A16497C24D2C4B6A9A247F09AE9",23,null,true,[0,0,100]],[5,"C030E576410EBE92DF5FAB83FAFD859A",23,null,true,[-60,0,70]],[6,"1D729A16497C24D2C4B6A9A247F09AE9",23,null,true,[0,0,0]],[7,"7769FA77488F5E75A8D3B19B260CB297",23,null,true,[-90,0,93]],[8,"32DA891F44CC6CE6F3F09E91FB08D87C",23,null,true,[0,0,-70]],[9,"5C036F804C66CAC8064CCAAC1DCF6F49",23,null,true,[0,0,180]],[10,"AC7D76B94E521E9A022F869AD65192C7",23,null,true,[0,0,60]],[11,"59CDB7A54052A7FB5BA4C3A3245415DB",23,null,true,[-30,0,100]],[12,"EEBAD0B541B4F7294F82EC8D69634024",23,null,true,[0,0,70]],[13,"0992CA8B43AB93BB11354E8519E10987",23,null,true,[0,0,70]],[14,"4E9ADF05445E637C58B05D9F12203537",23,null,true,[-50,0,100]],[15,"BBCB36B64C8A204A09CFFEA294D1B099",23,null,true,[0,0,30]],[16,"1C29B9D94B65461433D3B889663D9CD4",23,null,true,[0,0,0]],[17,"2954B0C346525118F420E78A380529FA",23,null,true,[0,0,0]]];
export interface ILevelEffectElement extends IElementBase{
 	/**特效id*/
	id:number
	/**特效对应预制体guid*/
	effectGuid:string
	/**挂载节点*/
	slot:number
	/**名字备注*/
	nameCN:string
	/**如果预制体内存在特效，是否循环播放*/
	circulate:boolean
	/**特效相对于挂载节点位置*/
	location:Array<number>
 } 
export class LevelEffectConfig extends ConfigBase<ILevelEffectElement>{
	constructor(){
		super(EXCELDATA);
	}

}