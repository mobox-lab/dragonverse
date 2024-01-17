

/*
 * @Author: YuKun.Gao
 * @Date: 2022-07-26 10:36:40
 * @LastEditors: YuKun.Gao
 * @LastEditTime: 2022-07-26 10:39:05
 * @Description: file content
 * @FilePath: \JavaScripts\module\bullet\BulletSpawnScript.ts
 */

export class BulletSpawnScript {
    static instance: BulletSpawnScript = new BulletSpawnScript();

    private _spawnScriptFunc: (scriptClass: new (...args: unknown[]) => any, bInReplicates?: boolean) => Promise<any>;

    /**
     * 
     * @param _spawnScriptFunc 写 mw.MWScript.spawnScript
     */
    public init(_spawnScriptFunc: (scriptClass: new (...args: unknown[]) => any, bInReplicates?: boolean) => Promise<any>) {
        this._spawnScriptFunc = _spawnScriptFunc;
    }

    /**
     * 先调用 init
     * @returns mw.MWScript.spawnScript
     */
    public getSpawnFunc(): (scriptClass: new (...args: unknown[]) => any, bInReplicates?: boolean) => Promise<any> {
        return this._spawnScriptFunc;
    }

}