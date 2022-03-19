<template>
  <div class="product">
    <div
      :style="{ 'background-image': `url(${item.image})` }"
      class="product-img"
    />
    <h4 class="title">{{ item.title.substring(0, 24) }}</h4>
    <div class="price">
      <h3>${{ item.price }}</h3>
      <img
        :src="
          isFavorite(item)
            ? require('@/assets/icons/heart-black.svg')
            : require('@/assets/icons/heart-gray.svg')
        "
        alt="heart"
        @click="addFavorite(item)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ProductGetter } from "@/store/product/getters";
import { Product } from "@/store/types";
import { computed, defineComponent, PropType } from "vue";

export default defineComponent({
  name: "CartComponent",
  props: {
    item: {
      type: Object as PropType<Product>,
      required: true,
    },
  },
  setup(_, context) {
    const store = useStore();

    const favorites = computed<Product[]>(
      () => store.getters[ProductGetter.GET_FAVORITE_LIST]
    );

    const isFavorite = (item: Product) => {
      return favorites.value.some((prod) => prod.id === item.id);
    };

    const addFavorite = (item: Product) => {
      context.emit("add_favorite", item);
    };

    return { isFavorite, addFavorite };
  },
});
</script>

<style lang="scss" scoped>
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
</style>
