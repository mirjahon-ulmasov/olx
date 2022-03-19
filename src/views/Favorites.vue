<template>
  <div class="main">
    <h1>Избранные объявления</h1>
    <div v-if="favorites.length > 0" class="product-list">
      <Cart
        v-for="favorite in favorites"
        :key="favorite.id"
        :item="favorite"
        @add_favorite="removeFavorite"
      />
    </div>
    <div v-else class="no-data">
      <img src="@/assets/icons/no-data.svg" alt="no-data" />
      <h2>Нет избранных объявлений</h2>
      <p>
        Добавить в избранное можно со страницы объявления либо со страницы
        списка объявлений Теперь избранные объявления всегда доступны на любом
        компьютере, а также на мобильной версии сайта, после входа в Мои
        объявления
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ProductGetter } from "@/store/product/getters";
import { ProductMutations } from "@/store/product/mutations";
import { Product } from "@/store/types";
import Cart from "@/components/Cart.vue";
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "FavoritesPage",
  components: { Cart },
  setup() {
    const store = useStore();

    const favorites = computed<Product[]>(
      () => store.getters[ProductGetter.GET_FAVORITE_LIST]
    );

    const removeFavorite = (product: Product) => {
      store.commit(ProductMutations.REMOVE_FROM_FAVORITES, product);
    };

    return { favorites, removeFavorite };
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
  .no-data {
    text-align: center;
    img {
      width: 35rem;
    }
    p {
      width: 70%;
      color: #555;
      margin-top: 1rem;
      display: inline-block;
    }
  }
}
</style>
