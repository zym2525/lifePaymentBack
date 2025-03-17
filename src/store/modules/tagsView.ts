import { defineStore, acceptHMRUpdate } from 'pinia';
// import { Route } from '@/router';
import { store } from '@/store';
import type { RouteLocationNormalizedLoaded } from 'vue-router';

type VisitedViewType = RouteLocationNormalizedLoaded & { title: string };

export interface TagsViewState {
  visitedViews: VisitedViewType[];
  cachedViews: string[];
}

export const useTagsViewStore = defineStore({
  id: 'tagsView',
  state: (): TagsViewState => ({
    visitedViews: [],
    cachedViews: [],
  }),
  actions: {
    addView(view: RouteLocationNormalizedLoaded) {
      this.addVisitedView(view);
      this.addCachedView(view);
    },
    addVisitedView(view: RouteLocationNormalizedLoaded) {
      if ((this.visitedViews as TagsViewState['visitedViews']).some((v) => v.path === view.path))
        return;
      (this.visitedViews as TagsViewState['visitedViews']).push(
        //@ts-ignore
        Object.assign({}, view, {
          title: view.meta.title || 'no-name',
        })
      );
    },
    addCachedView(view: RouteLocationNormalizedLoaded) {
      if (this.cachedViews.includes(view.name as string)) return;
      if (!view.meta.noCache) {
        this.cachedViews.push(view.name as string);
      }
    },
    delView(view: RouteLocationNormalizedLoaded) {
      return new Promise<TagsViewState>((resolve) => {
        this.delVisitedView(view);
        this.delCachedView(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delViewSync(view: RouteLocationNormalizedLoaded) {
      this.delVisitedViewSync(view);
      this.delCachedView(view);
      return {
        visitedViews: [...this.visitedViews],
        cachedViews: [...this.cachedViews],
      };
    },
    delVisitedView(view: RouteLocationNormalizedLoaded) {
      return new Promise<RouteLocationNormalizedLoaded[]>((resolve) => {
        for (const [i, v] of this.visitedViews.entries()) {
          if (v.path === view.path) {
            this.visitedViews.splice(i, 1);
            break;
          }
        }
        resolve([...(this as TagsViewState).visitedViews]);
      });
    },
    delVisitedViewSync(view: RouteLocationNormalizedLoaded) {
      for (const [i, v] of this.visitedViews.entries()) {
        if (v.path === view.path) {
          this.visitedViews.splice(i, 1);
          break;
        }
      }
      return [...(this as TagsViewState).visitedViews];
    },
    delCachedView(view: Partial<RouteLocationNormalizedLoaded>) {
      const index = this.cachedViews.indexOf(view.name as string);
      index > -1 && this.cachedViews.splice(index, 1);
      return [...this.cachedViews];
    },
    delOthersViews(view: RouteLocationNormalizedLoaded) {
      return new Promise<TagsViewState>((resolve) => {
        this.delOthersVisitedViews(view);
        this.delOthersCachedViews(view);
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delOthersVisitedViews(view: RouteLocationNormalizedLoaded) {
      return new Promise<RouteLocationNormalizedLoaded[]>((resolve) => {
        this.visitedViews = (this.visitedViews as TagsViewState['visitedViews']).filter((v) => {
          return v.meta!.affix || v.path === view.path;
        });
        resolve([...this.visitedViews]);
      });
    },
    delOthersCachedViews(view: RouteLocationNormalizedLoaded) {
      return new Promise<string[]>((resolve) => {
        const index = this.cachedViews.indexOf(view.name as string);
        if (index > -1) {
          this.cachedViews = (this.cachedViews as TagsViewState['cachedViews']).slice(
            index,
            index + 1
          );
        } else {
          // if index = -1, there is no cached tags
          this.cachedViews = [];
        }
        resolve([...this.cachedViews]);
      });
    },
    delAllViews() {
      return new Promise<TagsViewState>((resolve) => {
        this.delAllVisitedViews();
        this.delAllCachedViews();
        resolve({
          visitedViews: [...this.visitedViews],
          cachedViews: [...this.cachedViews],
        });
      });
    },
    delAllVisitedViews() {
      return new Promise<RouteLocationNormalizedLoaded[]>((resolve) => {
        const affixTags = (this.visitedViews as TagsViewState['visitedViews']).filter(
          (tag) => tag.meta!.affix
        );
        this.visitedViews = affixTags;
        resolve([...this.visitedViews]);
      });
    },
    delAllCachedViews() {
      return new Promise<string[]>((resolve) => {
        this.cachedViews = [];
        resolve([...this.cachedViews]);
      });
    },
    updateVisitedView(view: RouteLocationNormalizedLoaded) {
      for (let v of this.visitedViews as TagsViewState['visitedViews']) {
        if (v.path === view.path) {
          v = Object.assign(v, view);
          break;
        }
      }
    },
  },
});

export function useTagsViewStoreHook() {
  return useTagsViewStore(store);
}

if (import.meta.hot) {
  //@ts-ignore
  import.meta.hot.accept(acceptHMRUpdate(useTagsViewStore, import.meta.hot));
}
