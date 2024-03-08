
export class Log {
    public static info(...text) {
        let outStr = "[CS]";
        for (const iterator of text) {
            outStr += " ";
            outStr += iterator;
        }
        console.log(outStr);
    }

    public static warn(...text) {
        let outStr = "[CS]";
        for (const iterator of text) {
            outStr += " ";
            outStr += iterator;
        }
        console.warn(outStr);
    }

    public static err(...text) {
        let outStr = "[CS]";
        for (const iterator of text) {
            outStr += " ";
            outStr += iterator;
        }
        console.error(outStr);
    }

}
