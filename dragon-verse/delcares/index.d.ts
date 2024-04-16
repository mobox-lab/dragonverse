

interface NumberConstructor {

    /**
     * -1
     */
    INVALID_INDEX: number
}

type FlagExcludedType<Base, Type> = { [Key in keyof Base]: Base[Key] extends Type ? never : Key };

type AllowedNames<Base, Type> = FlagExcludedType<Base, Type>[keyof Base];

type KeyPartial<T, K extends keyof T> = { [P in K]?: T[P] };

type OmitType<Base, Type> = KeyPartial<Base, AllowedNames<Base, Type>>;

type TConstructorType<T> = OmitType<T, Function>;

type AnyConstructor = new (...args: any[]) => {}

type AnyClass<T> = {
    new(...args: unknown[]): T
}

type EmptyConstructorClass<T> = {
    new(): T
}

type NonAbsInstantType<T extends new (...args: any) => any> = T extends new (...args: any) => infer R ? R : any;

type Constructor<T = unknown> = new (...rest: any[]) => T

type AbstractConstructor<T> = abstract new (...rest: any[]) => T


type ExtendsConstructor<T = unknown> = new (...rest: any[]) => Record<never, unknown>


type ElementType<T extends Array<any>> = T extends (infer U)[] ? U : never;


type AnyFunction = (...args: unknown[]) => unknown | Function
