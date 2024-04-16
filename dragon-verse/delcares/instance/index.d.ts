declare namespace lighter{

    

    export const timer:Omit<lighter.controller.SchedulerController,'clear'>

    export const event:Omit<lighter.controller.EventManager,'offAll'>

    export const asset:Omit<lighter.assets.AssetsManager,'clear'>

}