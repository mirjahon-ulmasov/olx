<template>
  <loading-spinner v-if="loading" />
  <div class="main">
    <h1>Премиум объявления</h1>
    <div class="product-list">
      <Cart
        v-for="product in products"
        :key="product.id"
        :item="product"
        @add_favorite="addFavorite"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Product } from "@/store/types";
import Cart from "@/components/Cart.vue";
import { ProductActions } from "@/store/product/actions";
import { ProductGetter } from "@/store/product/getters";
import { computed, defineComponent, onMounted, ref } from "vue";
import { ProductMutations } from "@/store/product/mutations";

export default defineComponent({
  name: "MainPage",
  components: { Cart },
  setup() {
    const store = useStore();
    const loading = ref(true);

    const products = computed<Product[]>(
      () => store.getters[ProductGetter.GET_PRODUCT_LIST]
    );

    const favorites = computed<Product[]>(
      () => store.getters[ProductGetter.GET_FAVORITE_LIST]
    );

    const addFavorite = (product: Product) => {
      const isFavorite = favorites.value.some((prod) => prod.id === product.id);
      !isFavorite
        ? store.commit(ProductMutations.ADD_TO_FAVORITES, product)
        : store.commit(ProductMutations.REMOVE_FROM_FAVORITES, product);
    };

    onMounted(() => {
      store
        .dispatch(ProductActions.FETCH_ALL_PRODUCTS)
        .then(() => (loading.value = false))
        .catch(() => (loading.value = false));
    });
    return {
      addFavorite,
      products,
      loading,
    };
  },
});
</script>

<style lang="scss" scoped>
.main {
  background: #efefef;
  text-align: center;
  min-height: 90vh;
  padding: 3rem;

  .product-list {
    margin-top: 3rem;
  }
}
</style>
