export interface IState {

    clone(source?: IState): IState;

    equal(other: IState): boolean;
}