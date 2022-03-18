import { Product } from "./../types";
import { ProductState } from ".";
import { ActionTree } from "vuex";
import { RootState } from "./../index";
import { ProductMutations } from "./mutations";
import axios from "axios";

export enum ProductActions {
  FETCH_ALL_PRODUCTS = "FETCH_ALL_PRODUCTS",
}

export const actions: ActionTree<ProductState, RootState> = {
  [ProductActions.FETCH_ALL_PRODUCTS]({ commit }) {
    return new Promise((resolve, reject) =>
      axios
        .get<Product[]>("https://fakestoreapi.com/products")
        .then((res) => res.data)
        .then((data) => {
          commit(ProductMutations.SET_PRODUCT_LIST, data);
          resolve(data);
        })
        .catch((err) => reject(err))
    );
  },
};
