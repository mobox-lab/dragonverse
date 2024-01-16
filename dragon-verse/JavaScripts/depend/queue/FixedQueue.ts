/**
 * Fixed capacity queue.
 *
 * 当给定元素多于队列时 将抛弃以插入点为始的末尾元素.
 *
 * ⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠐⠒⠒⠒⠒⠚⠛⣿⡟
 * ⠄⠄⢠⠄⠄⠄⡄⠄⠄⣠⡶⠶⣶⠶⠶⠂⣠⣶⣶⠂⠄⣸⡿⠄
 * ⠄⢀⣿⠇⠄⣰⡿⣠⡾⠋⠄⣼⡟⠄⣠⡾⠋⣾⠏⠄⢰⣿⠁⠄
 * ⠄⣾⡏⠄⠠⠿⠿⠋⠠⠶⠶⠿⠶⠾⠋⠄⠽⠟⠄⠄⠄⠃⠄⠄
 * ⣼⣿⣤⡤⠤⠤⠤⠤⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄⠄
 * @author LviatYi
 * @font JetBrainsMono Nerd Font Mono https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/JetBrainsMono.zip
 * @fallbackFont Sarasa Mono SC https://github.com/be5invis/Sarasa-Gothic/releases/download/v0.41.6/sarasa-gothic-ttf-0.41.6.7z
 * @version 1.0.5
 */
export default class FixedQueue<T> {
    protected _q: Array<T> = [];

    constructor(capacity: number = Number.MAX_SAFE_INTEGER) {
        this._capacity = capacity;
    }

    protected _capacity: number;

    public get capacity(): number {
        return this._capacity;
    }

    public set capacity(value: number) {
        this._capacity = value;
        this._q.splice(0, this._q.length - this.capacity);
    }

    public get length(): number {
        return this._q.length;
    }

    public set length(val: number) {
        if (this._q.length > val) {
            this._q.length = val;
        }
    }

    public get(index: number): T | null {
        return this._q[index] ?? null;
    }

    public set(index: number, val: T) {
        this._q[index] = val;
    }

    public empty(): boolean {
        return this._q.length === 0;
    }

    public full(): boolean {
        return this._q.length === this.capacity;
    }

    public front(): T | null {
        if (this._q.length === 0) return null;
        return this.get(0);
    }

    public back(): T | null {
        if (this._q.length === 0) return null;
        return this.get(this._q.length - 1);
    }

    public push(val: T): number {
        this._q.push(val);
        while (this._q.length > this.capacity) {
            this._q.shift();
        }
        return this._q.length;
    }

    public unshift(val: T): number {
        this._q.unshift(val);
        while (this._q.length > this.capacity) {
            this._q.pop();
        }
        return this._q.length;
    }

    public pop(): T {
        return this._q.pop();
    }

    public popAll(pred: Predicate<T>) {
        while (!this.empty() && pred(this.back())) {
            this.pop();
        }
    }

    public shift(): T {
        return this._q.shift();
    }

    public shiftAll(pred: Predicate<T>): number {
        let count = 0;
        while (!this.empty() && pred(this.front())) {
            ++count;
            this.shift();
        }
        return count;
    }

    /**
     * return self.
     */
    public toArray(): T[] {
        return this._q;
    }

    public [Symbol.iterator]() {
        let index = 0;
        return {
            next: (): IteratorResult<T> => {
                if (index < this._q.length) {
                    return {
                        value: this._q[index++],
                        done: false,
                    };
                } else {
                    return {
                        value: undefined,
                        done: true,
                    };
                }
            },
        };
    }
}

/**
 * A function taking one argument and returning a boolean result.
 * TArg void default.
 */
type Predicate<TArg = void> = (arg: TArg) => boolean;