/**
 * Recursively generate a tuple of strings representing the path to each
 * property in a nested object */
export type NestedPath<T> = T extends object
  ? T extends (...args: any[]) => any
    ? []
    : {
        [K in Extract<keyof T, string>]: [K, ...NestedPath<T[K]>]
      }[Extract<keyof T, string>]
  : []

/**
 * Join a string array with a delimiter
 */
export type Join<T extends any[], D extends string> = T extends []
  ? never
  : T extends [infer F]
    ? F
    : T extends [infer F, ...infer R]
      ? F extends string
        ? `${F}${D}${Join<R, D>}`
        : never
      : string

/**
 * Infer the type at the given path P in object T
 */
export type PathValue<
  T,
  P extends string,
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? Rest extends string
      ? PathValue<T[K], Rest>
      : never
    : never
  : P extends keyof T
    ? T[P]
    : never
