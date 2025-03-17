import { ToRefs } from 'vue';
import _ from 'lodash';

export function useVModel<P extends object, K extends keyof P>(
  props: P,
  key: K,
  emit: (name: string, ...args: any[]) => void
) {
  return computed({
    get() {
      return props[key];
    },
    set(v: any) {
      emit(`update:${key!.toString()}`, v);
    },
  });
}

export function useVModels<P extends object>(
  props: P,
  emit: (name: string, ...args: any[]) => void
): ToRefs<P> {
  const ret: any = {};

  for (const key in props) {
    ret[key] = useVModel(props, key, emit);
  }
  return ret;
}

export function useOmit<T extends object>(object: T, props: string[]) {
  return computed(() => _.omit(object, props));
}

export function useOmitProps<T extends object, P extends object>(props: T, restProps: P) {
  return useOmit(props, Object.keys(restProps));
}
