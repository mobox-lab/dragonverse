export namespace updater {

    /**
     * 将函数注册到模块的onUpdate函数里
     * @param interval 
     * @param targetFunctionName 如果是指定函数名 ，这个函数要被update一直执行
     * @returns 
     */
    export const updateByFrameInterval = (interval: number, targetFunctionName?: string) => {
        return function (target: Object, prototypeKey: string | symbol, prototypeDescriptor: PropertyDescriptor) {

            // 注册interval变量
            let intervalVaryingName = `${prototypeKey.toString()}_current_interval`
            let targetIntervalVaryingName = `${prototypeKey.toString()}_target_interval`
            target[intervalVaryingName] = 0
            target[targetIntervalVaryingName] = interval
            // 将函数放到onUpdate里面
            let updateFunc = target[targetFunctionName || 'onUpdate']
            let targetFunc = prototypeDescriptor.value
            target[targetFunctionName || 'onUpdate'] = function (...args: any) {
                target[intervalVaryingName]++
                if (target[intervalVaryingName] >= target[targetIntervalVaryingName]) {
                    targetFunc.apply(this, args)
                    target[intervalVaryingName] = 0
                }
                updateFunc.apply(this, args)
            }
        }
    }
}