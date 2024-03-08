import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","back","name","tag","viewWeight","imgGuid","unlockedImgGuid","unlockTips","typeDesc","weekDesc","backDesc"],["","","Language","","","","","Language","Language","Language","Language"],[1,"帕姆尼","ghostName_03","pamuni",0,"297004","296999","ghostUnlock_03","ghostType_03","ghostWeek_03","ghostBack_03"],[2,"阴暗爬行帕姆尼","ghostName_04","walkpamuni",0,"296996","296990","ghostUnlock_04","ghostType_04","ghostWeek_04","ghostBack_04"],[3,"羞羞帕姆尼","ghostName_05","starepamuni",0,"296983","296992","ghostUnlock_05","ghostType_05","ghostWeek_05","ghostBack_05"],[4,"闪灵帕姆尼","ghostName_06","sparkpamuni",0,"297005","296997","ghostUnlock_06","ghostType_06","ghostWeek_06","ghostBack_06"],[5,"护士帕姆尼","ghostName_02","nursepamuni",0,"296998","296984","ghostUnlock_02","ghostType_02","ghostWeek_02","ghostBack_02"],[6,"影人","ghostName_01","shadow",0,"296986","297001","ghostUnlock_01","ghostType_01","ghostWeek_01","ghostBack_01"],[7,"安娜","ghostName_07","anna",0,"296980","296976","ghostUnlock_07","ghostType_07","ghostWeek_07","ghostBack_07"],[8,"弗兰克","ghostName_08","franck",0,"297002","296973","ghostUnlock_08","ghostType_08","ghostWeek_08","ghostBack_08"],[9,"蒂奇","ghostName_09","teach",0,"297081","297088","ghostUnlock_09","ghostType_09","ghostWeek_09","ghostBack_09"],[10,"爱丽丝","ghostName_10","alice",0,"296975","296987","ghostUnlock_10","ghostType_10","ghostWeek_10","ghostBack_10"],[11,"杰克","ghostName_11","jack",0,"297078","296988","ghostUnlock_11","ghostType_11","ghostWeek_11","ghostBack_11"],[12,"凯莉","ghostName_12","kelly",0,"296981","296977","ghostUnlock_12","ghostType_12","ghostWeek_12","ghostBack_12"]];
export interface IGhostGraphElement extends IElementBase{
 	/**id*/
	id:number
	/**备注*/
	back:string
	/**名字*/
	name:string
	/**鬼怪的标志*/
	tag:string
	/**显示权重（现根据id排序，再把权重大的放在前面）*/
	viewWeight:number
	/**鬼怪的图资源id（未解锁）*/
	imgGuid:string
	/**鬼怪的图资源id（已解锁）*/
	unlockedImgGuid:string
	/**解锁的提示*/
	unlockTips:string
	/**类别*/
	typeDesc:string
	/**弱点*/
	weekDesc:string
	/**背景*/
	backDesc:string
 } 
export class GhostGraphConfig extends ConfigBase<IGhostGraphElement>{
	constructor(){
		super(EXCELDATA);
	}

}