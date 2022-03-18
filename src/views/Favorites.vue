<template>
  <div class="main">
    <h1>Избранные объявления</h1>
    <div v-if="favorites.length > 0" class="product-list">
      <div v-for="favorite in favorites" :key="favorite.id" class="product">
        <div
          :style="{ 'background-image': `url(${favorite.image})` }"
          class="product-img"
        />
        <h4 class="title">{{ favorite.title.substring(0, 24) }}</h4>
        <div class="price">
          <h3>${{ favorite.price }}</h3>
          <img
            :src="
              isFavorite(favorite)
                ? require('@/assets/icons/heart-black.svg')
                : require('@/assets/icons/heart-gray.svg')
            "
            alt="heart"
            @click="removeFavorite(favorite)"
          />
        </div>
      </div>
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
import { computed, defineComponent } from "vue";

export default defineComponent({
  name: "FavoritesPage",
  setup() {
    const store = useStore();

    const favorites = computed<Product[]>(
      () => store.getters[ProductGetter.GET_FAVORITE_LIST]
    );

    const removeFavorite = (product: Product) => {
      store.commit(ProductMutations.REMOVE_FROM_FAVORITES, product);
    };

    const isFavorite = (product: Product) => {
      return favorites.value.some((prod) => prod.id === product.id);
    };

    return { favorites, removeFavorite, isFavorite };
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
