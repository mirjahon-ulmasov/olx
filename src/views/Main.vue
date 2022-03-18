<template>
  <loading-spinner v-if="loading" />
  <div class="main">
    <h1>Премиум объявления</h1>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product">
        <div
          :style="{ 'background-image': `url(${product.image})` }"
          class="product-img"
        />
        <h4 class="title">{{ product.title.substring(0, 24) }}</h4>
        <div class="price">
          <h3>${{ product.price }}</h3>
          <img
            :src="
              isFavorite(product)
                ? require('@/assets/icons/heart-black.svg')
                : require('@/assets/icons/heart-gray.svg')
            "
            alt="heart"
            @click="addFavorite(product)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { Product } from "@/store/types";
import { ProductActions } from "@/store/product/actions";
import { ProductGetter } from "@/store/product/getters";
import { computed, defineComponent, onMounted, ref } from "vue";
import { ProductMutations } from "@/store/product/mutations";

export default defineComponent({
  name: "MainPage",
  components: {},
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

    const isFavorite = (product: Product) => {
      return favorites.value.some((prod) => prod.id === product.id);
    };

    onMounted(() => {
      store
        .dispatch(ProductActions.FETCH_ALL_PRODUCTS)
        .then(() => (loading.value = false))
        .catch(() => (loading.value = false));
    });
    return {
      addFavorite,
      isFavorite,
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

    .product {
      position: relative;
      display: inline-block;
      margin: 0 1rem 1rem 0;
      background: #fff;
      border-radius: 5px;
      padding: 1rem;
      width: 250px;
      height: 320px;

      .product-img {
        width: 98%;
        height: 80%;
        background-position: center;
        background-repeat: no-repeat;
        background-size: contain;
      }

      h4 {
        margin-top: 0.7rem;
        text-align: left;
      }

      .price {
        position: absolute;
        bottom: 1rem;
        left: 1rem;
        width: 85%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
}
</style>
