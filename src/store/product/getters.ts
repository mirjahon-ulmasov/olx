import { GetterTree } from "vuex";
import { ProductState } from ".";
import { RootState } from "./../index";

export enum ProductGetter {
  GET_PRODUCT_LIST = "GET_PRODUCT_LIST",
  GET_FAVORITE_LIST = "GET_FAVORITE_LIST",
  GET_FAVORITE_LIST_COUNT = "GET_FAVORITE_LIST_COUNT",
}

export const getters: GetterTree<ProductState, RootState> = {
  [ProductGetter.GET_PRODUCT_LIST](state) {
    return state.products;
  },
};
