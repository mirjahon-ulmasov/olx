import { MutationTree } from "vuex";
import { ProductState } from ".";
import { Product } from "./../types";

export enum ProductMutations {
  SET_PRODUCT_LIST = "SET_PRODUCT_LIST",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
}

export const mutations: MutationTree<ProductState> = {
  [ProductMutations.SET_PRODUCT_LIST](state, payload: Product[]) {
    state.products = payload;
  },
};
