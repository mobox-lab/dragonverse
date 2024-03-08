
export class CSCommUitls {

    static linearColorToHex(linearColor: LinearColor): string {
        const r = Math.floor(linearColor.r * 255).toString(16).padStart(2, '0');
        const g = Math.floor(linearColor.g * 255).toString(16).padStart(2, '0');
        const b = Math.floor(linearColor.b * 255).toString(16).padStart(2, '0');
        const a = Math.floor(linearColor.a * 255).toString(16).padStart(2, '0');
        return `#${r}${g}${b}${a}`;
    }

}

