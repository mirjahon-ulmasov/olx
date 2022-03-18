import { actions } from "./actions";
import { mutations } from "./mutations";
import { getters } from "./getters";
import { Module } from "vuex";
import { Product } from "../types";
import { RootState } from "../index";

export interface ProductState {
  products: Product[];
}

const state: ProductState = {
  products: [],
};

export const product: Module<ProductState, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
