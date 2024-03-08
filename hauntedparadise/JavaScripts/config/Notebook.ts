import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","desc","tab"],["","Language",""],[2001,"Notebook1_1",1],[2002,"Notebook1_2",1],[2003,"Notebook1_3",1],[2004,"Notebook1_4",1],[2005,"Notebook1_5",1],[2006,"Notebook1_6",1],[2007,"Notebook2_1",2],[2008,"Notebook2_2",2],[2009,"Notebook2_3",2],[2010,"Notebook2_4",2],[2011,"Notebook2_5",2],[2012,"Notebook2_6",2],[2013,"Notebook3_1",3],[2014,"Notebook3_2",3],[2015,"Notebook3_3",3],[2016,"Notebook3_4",3],[2017,"Notebook3_5",3],[2018,"Notebook3_6",3],[2019,"Notebook4_1",4],[2020,"Notebook4_2",4],[2021,"Notebook4_3",4],[2022,"Notebook4_4",4],[2023,"Notebook4_5",4],[2024,"Notebook4_6",4],[2025,"Notebook5_1",5],[2026,"Notebook5_2",5],[2027,"Notebook5_3",5],[2028,"Notebook5_4",5],[2029,"Notebook5_5",5],[2030,"Notebook5_6",5],[2031,"Notebook6_1",6],[2032,"Notebook6_2",6],[2033,"Notebook6_3",6],[2034,"Notebook6_4",6],[2035,"Notebook6_5",6],[2036,"Notebook6_6",6]];
export interface INotebookElement extends IElementBase{
 	/**ID*/
	id:number
	/**描述的多语言key*/
	desc:string
	/**页签*/
	tab:number
 } 
export class NotebookConfig extends ConfigBase<INotebookElement>{
	constructor(){
		super(EXCELDATA);
	}

}