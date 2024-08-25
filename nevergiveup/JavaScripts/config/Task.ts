import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","taskName","taskInfo","taskCN","taskType","preconditions","rewards","taskSolveType","taskSolvetime"],["tag","Language","Language","","","","","",""],[1001,"Stage_stageName_1","Task_taskinfo_1","通关世界1·简单",1,null,[[1,100]],1,1001],[1002,"Stage_stageName_2","Task_taskinfo_1","通关世界1·普通",1,[1001],[[1,150]],1,1002],[1003,"Stage_stageName_3","Task_taskinfo_1","通关世界1·困难",1,[1002],[[1,200]],1,1003],[1004,"Stage_stageName_4","Task_taskinfo_1","通关世界2·简单",1,[1003],[[1,100]],1,2001],[1005,"Stage_stageName_5","Task_taskinfo_1","通关世界2·普通",1,[1004],[[1,100]],1,2002],[1006,"Stage_stageName_6","Task_taskinfo_1","通关世界2·困难",1,null,[[1,100]],1,2003],[1007,"Stage_stageName_7","Task_taskinfo_1","通关世界3·简单",1,null,[[1,100]],1,3001],[1008,"Stage_stageName_8","Task_taskinfo_1","通关世界3·普通",1,null,[[1,100]],1,3002],[1009,"Stage_stageName_9","Task_taskinfo_1","通关世界3·困难",1,null,[[1,100]],1,3003],[1010,"Stage_stageName_10","Task_taskinfo_1","通关世界4·简单",1,null,[[1,100]],1,4001],[1011,"Stage_stageName_11","Task_taskinfo_1","通关世界4·普通",1,null,[[1,100]],1,4002],[1012,"Stage_stageName_12","Task_taskinfo_1","通关世界4·困难",1,null,[[1,100]],1,4003],[1013,"Stage_stageName_13","Task_taskinfo_1","通关世界5·简单",1,null,[[1,100]],1,5001],[1014,"Stage_stageName_14","Task_taskinfo_1","通关世界5·普通",1,null,[[1,100]],1,5002],[1015,"Stage_stageName_15","Task_taskinfo_1","通关世界5·困难",1,null,[[1,100]],1,5003],[2001,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化1",1,[1001],[[1,10]],2,1001],[2002,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高1",1,[2001],[[1,10]],2,1004],[2003,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化2",1,[2002],[[1,10]],2,1011],[2004,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高2",1,[2003],[[1,10]],2,1014],[2005,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化3",1,[2004],[[1,15]],2,1021],[2006,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高3",1,[2005],[[1,15]],2,1024],[2007,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化4",1,[2006],[[1,15]],2,1031],[2008,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高4",1,[2007],[[1,15]],2,1034],[2009,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化5",1,[2008],[[1,20]],2,1041],[2010,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高5",1,[2009],[[1,20]],2,1044],[2011,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化6",1,[2010],[[1,20]],2,1051],[2012,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高6",1,[2011],[[1,20]],2,1054],[2013,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化7",1,[2012],[[1,25]],2,1061],[2014,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高7",1,[2013],[[1,25]],2,1064],[2015,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化8",1,[2014],[[1,25]],2,1071],[2016,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高8",1,[2015],[[1,25]],2,1074],[2017,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化9",1,[2016],[[1,30]],2,1081],[2018,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高9",1,[2017],[[1,30]],2,1084],[2019,"Task_taskName_1","Task_taskinfo_2","解锁科技树攻击强化10",1,[2018],[[1,30]],2,1091],[2020,"Task_taskName_1","Task_taskinfo_2","解锁科技树怪物受伤提高10",1,[2019],[[1,30]],2,1094],[3001,"Task_taskName_2","Task_taskinfo_3","解锁塔3个",1,[1001],[[2,50]],3,3],[3002,"Task_taskName_2","Task_taskinfo_3","解锁塔4个",1,[3001],[[2,50]],3,4],[3003,"Task_taskName_2","Task_taskinfo_3","解锁塔5个",1,[3002],[[2,50]],3,5],[3004,"Task_taskName_2","Task_taskinfo_3","解锁塔6个",1,[3003],[[2,100]],3,6],[3005,"Task_taskName_2","Task_taskinfo_3","解锁塔7个",1,[3004],[[2,100]],3,7],[3006,"Task_taskName_2","Task_taskinfo_3","解锁塔8个",1,[3005],[[2,150]],3,8],[3007,"Task_taskName_2","Task_taskinfo_3","解锁塔9个",1,[3006],[[2,150]],3,9],[5001,"Task_taskName_3","Task_taskinfo_4","游玩游戏2局",1,[1001],[[1,10]],5,2],[5002,"Task_taskName_3","Task_taskinfo_4","游玩游戏5局",1,[5001],[[1,20]],5,5],[5003,"Task_taskName_3","Task_taskinfo_4","游玩游戏10局",1,[5002],[[1,30]],5,10],[5004,"Task_taskName_3","Task_taskinfo_4","游玩游戏15局",1,[5003],[[1,40]],5,15],[5005,"Task_taskName_3","Task_taskinfo_4","游玩游戏20局",1,[5004],[[1,50]],5,20],[6001,"Task_taskName_4","Task_taskinfo_4","游玩游戏25局",1,[5005],[[1,60]],5,25],[6002,"Task_taskName_4","Task_taskinfo_4","游玩游戏30局",1,[5006],[[1,70]],5,30],[6003,"Task_taskName_4","Task_taskinfo_4","游玩游戏35局",1,[5007],[[1,80]],5,35],[6004,"Task_taskName_4","Task_taskinfo_4","游玩游戏40局",1,[5008],[[1,90]],5,40],[6005,"Task_taskName_4","Task_taskinfo_4","游玩游戏50局",1,[5009],[[1,100]],5,50],[7001,"Task_taskName_5","Task_taskinfo_5","击败怪物50个",1,[1001],[[1,10]],6,50],[7002,"Task_taskName_5","Task_taskinfo_5","击败怪物100个",1,[6001],[[1,20]],6,100],[7003,"Task_taskName_5","Task_taskinfo_5","击败怪物200个",1,[6002],[[1,30]],6,200],[7004,"Task_taskName_5","Task_taskinfo_5","击败怪物400个",1,[6003],[[1,40]],6,400],[7005,"Task_taskName_5","Task_taskinfo_5","击败怪物600个",1,[6004],[[1,50]],6,600],[8001,"Task_taskName_6","Task_taskinfo_5","击败怪物800个",1,[6005],[[1,60]],6,800],[8002,"Task_taskName_6","Task_taskinfo_5","击败怪物1000个",1,[6006],[[1,70]],6,1000],[8003,"Task_taskName_6","Task_taskinfo_5","击败怪物1250个",1,[6007],[[1,80]],6,1250],[8004,"Task_taskName_6","Task_taskinfo_5","击败怪物1500个",1,[6008],[[1,90]],6,1500],[8005,"Task_taskName_6","Task_taskinfo_5","击败怪物1750个",1,[6009],[[1,100]],6,1750],[9001,"Task_taskName_7","Task_taskinfo_5","击败怪物2000个",1,[6010],[[1,100]],6,2000],[9002,"Task_taskName_7","Task_taskinfo_5","击败怪物2250个",1,[6011],[[1,100]],6,2250],[9003,"Task_taskName_7","Task_taskinfo_5","击败怪物2500个",1,[6012],[[1,100]],6,2500],[9004,"Task_taskName_7","Task_taskinfo_5","击败怪物2750个",1,[6013],[[1,100]],6,2750],[9005,"Task_taskName_7","Task_taskinfo_5","击败怪物3000个",1,[6014],[[1,100]],6,3000],[10001,"Task_taskName_8","Task_taskinfo_5","击败怪物3250个",1,[6015],[[1,100]],6,3250],[10002,"Task_taskName_8","Task_taskinfo_5","击败怪物3500个",1,[6016],[[1,100]],6,3500],[10003,"Task_taskName_8","Task_taskinfo_5","击败怪物4000个",1,[6017],[[1,100]],6,4000],[10004,"Task_taskName_8","Task_taskinfo_5","击败怪物4500个",1,[6018],[[1,100]],6,4500],[10005,"Task_taskName_8","Task_taskinfo_5","击败怪物5000个",1,[6019],[[1,100]],6,5000],[101001,"Task_taskName_9","Task_taskinfo_4","游玩1局",2,[3],[[1,25],[3,5]],5,1],[101002,"Task_taskName_9","Task_taskinfo_4","游玩3局",2,[3],[[1,75],[3,10]],5,3],[101003,"Task_taskName_9","Task_taskinfo_4","游玩5局",2,[3],[[1,100],[3,15]],5,5],[102001,"Task_taskName_10","Task_taskinfo_5","击败怪物50个",2,[3],[[2,25],[3,5]],6,50],[102002,"Task_taskName_10","Task_taskinfo_5","击败怪物200个",2,[3],[[2,75],[3,10]],6,200],[102003,"Task_taskName_10","Task_taskinfo_5","击败怪物400个",2,[3],[[2,100],[3,15]],6,400]];
export interface ITaskElement extends IElementBase{
 	/**id*/
	id:number
	/**任务名称*/
	taskName:string
	/**任务描述*/
	taskInfo:string
	/**任务描述备注*/
	taskCN:string
	/**任务类型
1 主线 
2 日常*/
	taskType:number
	/**前置任务
第一列的id
每日任务跟等级挂钩*/
	preconditions:Array<number>
	/**任务奖励*/
	rewards:Array<Array<number>>
	/**任务类型
1.通过某关卡id
2.解锁科技树某id科技
3.解锁多少个塔
4.副本获得多少星星
5.游玩几局游戏
6.击败多少只怪物
7.完美通过某个关卡
8.完美游玩次数
9.部署光塔次数
10.部署暗塔次数
11.部署水塔次数
12.部署火塔次数
13.部署木塔次数
14.部署土塔次数
15.玩家级数
16.无尽模式的波次
17.升级lv3 次数
18.击败多少只复原力怪物
19.击败多少只狂暴怪物
20.击败多少只飞行怪物
21.击败多少只隐身怪物*/
	taskSolveType:number
	/**任务需要的量*/
	taskSolvetime:number
 } 
export class TaskConfig extends ConfigBase<ITaskElement>{
	constructor(){
		super(EXCELDATA);
	}

}