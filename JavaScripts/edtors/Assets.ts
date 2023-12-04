export default abstract class Asset extends mw.Script {

    @mw.Property({ readonly: true })
    public readonly uuid: string = generateUUID()

}


/**
 * 生成uuid
 * @returns 
 */
function generateUUID(): string {
    let d = new Date().getTime();

    const uuid = 'xyx-xxy'.replace(/[xy]/g, function (c) {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}