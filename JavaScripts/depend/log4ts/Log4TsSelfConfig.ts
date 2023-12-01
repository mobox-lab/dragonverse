// recommend to add this file in gitignore

import Log4Ts, { Log4TsConfig } from "./Log4Ts";

Log4Ts.setConfig(
    new Log4TsConfig()
        .addBlackList("IDontWantThis"),
);