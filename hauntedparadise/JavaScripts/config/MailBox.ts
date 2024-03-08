import { ConfigBase, IElementBase } from "./ConfigBase";
const EXCELDATA:Array<Array<any>> = [["id","name","date","theme","content"],["","Language","","Language","Language"],[1,"mail_writter","2094|04|01","mail_title","mail_content"],[2,"mail_writter_02","2094|04|02","mail_title_02","mail_content_02"],[3,"mail_writter_03","2094|04|02","mail_title_03","mail_content_03"],[4,"mail_writter_04","2094|04|02","mail_title_04","mail_content_04"],[5,"mail_writter_05","2094|04|03","mail_title_05","mail_content_05"],[6,"mail_writter_06","2094|04|03","mail_title_06","mail_content_06"],[7,"mail_writter_07","2094|04|03","mail_title_07","mail_content_07"],[8,"mail_writter_08","2094|04|04","mail_title_08","mail_content_08"],[9,"mail_writter_09","2094|04|04","mail_title_09","mail_content_09"],[10,"mail_writter_10","2094|04|04","mail_title_10","mail_content_10"],[11,"mail_writter_11","2094|04|05","mail_title_11","mail_content_11"],[12,"mail_writter_12","2094|04|05","mail_title_12","mail_content_12"],[13,"mail_writter_13","2094|04|05","mail_title_13","mail_content_13"],[14,"mail_writter_14","2094|04|06","mail_title_14","mail_content_14"]];
export interface IMailBoxElement extends IElementBase{
 	/**id*/
	id:number
	/**发件人*/
	name:string
	/**发件日期*/
	date:string
	/**主题*/
	theme:string
	/**内容*/
	content:string
 } 
export class MailBoxConfig extends ConfigBase<IMailBoxElement>{
	constructor(){
		super(EXCELDATA);
	}

}