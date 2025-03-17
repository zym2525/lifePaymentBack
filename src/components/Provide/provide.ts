import type { InjectionKey } from 'vue';
import { inject } from 'vue';

export interface ProvideContext {
  config: AppConfig;
}

export const ProvideKey: InjectionKey<ProvideContext> = Symbol('provideKey');

export function useProvideContext() {
  const ctx = inject(ProvideKey);
  return ctx;
}
