export class SyncAttribute<T extends Object> {
    private data:T
    private _dirty:boolean

    constructor(value:T) {
        this.value = value
        this._dirty = true
    }

    get dirty():boolean{
        return this._dirty
    }

    setDirty(){
        this._dirty = true
    }

    get value():T{
        return this.data
    }

    set value(val:T){
        this.data = val
        this._dirty = true
    }

    marshal():T{
        this._dirty = false
        return this.data
    }
}