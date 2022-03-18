import { ProductGetter } from "./product/getters";
import { ProductMutations } from "./product/mutations";
import { Product } from "./types";
import { InjectionKey } from "vue";
import { product } from "./product";
import { createStore, Store, useStore as baseUseStore } from "vuex";

export interface RootState {
  favorites: Product[];
}

export const key: InjectionKey<Store<RootState>> = Symbol();

export default createStore<RootState>({
  state: {
    favorites: [],
  },
  mutations: {
    [ProductMutations.ADD_TO_FAVORITES](state, payload: Product) {
      state.favorites.push(payload);
    },
    [ProductMutations.REMOVE_FROM_FAVORITES](state, payload: Product) {
      state.favorites = state.favorites.filter(
        (prod) => prod.id !== payload.id
      );
    },
  },
  getters: {
    [ProductGetter.GET_FAVORITE_LIST](state) {
      return state.favorites;
    },
    [ProductGetter.GET_FAVORITE_LIST_COUNT](state) {
      return state.favorites.length;
    },
  },

  modules: {
    product,
  },
});

export function useStore() {
  return baseUseStore(key);
}
