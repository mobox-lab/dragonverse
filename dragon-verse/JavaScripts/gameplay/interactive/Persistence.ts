import { InitializeCheckerScript } from "../archtype/base/InitializeCheckScript";






export abstract class Persistence extends InitializeCheckerScript {





    public subKey: string = undefined;



    @mw.Property({ displayName: "同类型合并存储" })
    mergeSameType: boolean = true;


    isAuth: boolean = false;


    protected onStart(): void {

        super.onStart();
    }



}