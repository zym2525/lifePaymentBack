export function useSetReactive<S extends object>(source: S, ...args: any[]) {
  Object.assign(source, ...args);
}
