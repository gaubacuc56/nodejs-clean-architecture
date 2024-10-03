/* eslint-disable @typescript-eslint/no-explicit-any */
export function Mapper<T>(source: Record<keyof T, any>): T {
    const target: any = {};
    for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key) && key in target) {
            target[key] = source[key];
        }
    }
    return target as T;
}
