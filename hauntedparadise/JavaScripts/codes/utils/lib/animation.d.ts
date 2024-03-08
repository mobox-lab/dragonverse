declare namespace mw {


    export namespace Events {


        type AnyFunction = (...args: unknown[]) => unknown;

        type Fn<T extends any[]> = (...args: T) => any

        type InferFnArgs<T> = T extends Fn<infer A> ? A : any

        export interface InferAction<T extends AnyFunction = AnyFunction> {


            add(thisArg: unknown, callBack: T, ...args: unknown[])

            broadCast(...args: InferFnArgs<T>)

            clear()

            remove(thisArg: unknown, call: T)


            removeByTarget(thisArg: unknown)

        }

    }

    export namespace Animator {

        interface AnimationEventArgs {

            events: string;

            position: number;

            customArgs: { [key: string]: any };
        }

        type OnAnimationEndDelegate = Events.InferAction<() => void>

        type EventNotifiedDelegate = Events.InferAction<(events: string, position: number, args?: AnimationEventArgs) => void>

        export interface IAnimator {

            /**
             * 当前该动画的播放位置 秒
             */
            position: number;

            /**
             * 当前动画的是否在播放
             */
            readonly isPlaying: boolean;

            /**
             * 当前动画的总长度 秒
             */
            readonly length: number;

            speed: number;

            /**
             * 当动画播放结束时触发
             */
            readonly onAnimationEnd: OnAnimationEndDelegate;

            /**
             * 当动画事件触发时触发
             */
            readonly onEventNotified: EventNotifiedDelegate;


            /**
             * 立即播放动画
             */
            play();

            stop();

            /**
             * 暂停动画
             */
            pause(): boolean

            /**
             * 恢复动画
             */
            resume(): boolean;

            /**
             * 调转到指定位置并播放
             * @param position 
             */
            gotoAndPlay(position: number);

            /**
             * 跳转到指定位置然后暂停
             * @param position 
             */
            gotoAndStop(position: number);

        }




        export interface IEasing {

            evaluate(t: number): number
        }

        /**
         * 缓动动画
         */
        export interface TweenAnimator<T> extends IAnimator {

            isBy: boolean;
        }


        export interface MeshAnimator extends IAnimator {

            /**
             * 设置动画循环次数
             */
            loopTime: number;
            /**
             * 设置播放器的插槽
             */
            slot: AnimSlot;

        }
    }

    export interface Character {
        //loadAnimator(animationGuid: string, isSync?: boolean): Promise<Animator.MeshAnimator>
    }

}