import { useEventBus, EventBusKey, UseEventBusReturn } from '@vueuse/core';
import { InjectionKey, inject, provide, onUnmounted } from 'vue';

export type GlobalEvent = {
  'informationAuditList:audit': any;
};

export type GlobalEventListener<T extends keyof GlobalEvent> = (payload: GlobalEvent[T]) => any;

export const eventKey: EventBusKey<keyof GlobalEvent> = Symbol('eventKey');

export type GlobalEventContext = {
  bus: UseEventBusReturn<keyof GlobalEvent, any>;
};

export const globalEventContextKey: InjectionKey<GlobalEventContext> = Symbol('GlobalEventContext');

export function useGlobalEventProvide() {
  const bus = useEventBus(eventKey);
  provide(globalEventContextKey, { bus });
}

export function useGlobalEventContext() {
  const { bus } = inject(globalEventContextKey);
  const subscribes: Fn[] = [];

  function addEvent<T extends keyof GlobalEvent>(event: T, cb?: GlobalEventListener<T>) {
    const unsubscribe = bus.on((e, payload) => {
      if (e === event) {
        cb?.(payload);
      }
    });
    subscribes.push(unsubscribe);
  }

  function emit<T extends keyof GlobalEvent>(event: T, payload?: GlobalEvent[T]) {
    bus.emit(event, payload);
  }

  onUnmounted(() => {
    subscribes.forEach((sub) => {
      sub();
    });
  });

  return {
    addEvent,
    emit,
  };
}
