import Log4Ts from "../depend/log4ts/Log4Ts";

export class Utils {
    // 日志优化 上报
    public static logP12Info(name: string, args: any) {
        Log4Ts.log({name}, JSON.stringify(args) + " #P12");
    }
}