export interface IFsm<T> {
    onUpdate(dt: number);
    owner: T;
}