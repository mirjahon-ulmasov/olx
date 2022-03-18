<template>
  <nav>
    <div class="left">
      <router-link to="/">
        <span class="olx__o" />
        <span class="olx__l" />
        <span class="olx__x"></span>
      </router-link>
    </div>
    <div class="right">
      <div class="lang-select">
        <span
          @click="setActiveLang('uz')"
          :class="{ active: isActiveLang('uz') }"
          >O'Z</span
        ><span>|</span
        ><span
          @click="setActiveLang('ru')"
          :class="{ active: isActiveLang('ru') }"
          >РУ</span
        >
      </div>
      <router-link :to="{ name: 'Inbox' }">
        <img src="@/assets/icons/chat.svg" alt="chat" />
        <p>Сообщения</p>
      </router-link>
      <router-link :to="{ name: 'Favorites' }">
        <div class="heart">
          <img src="@/assets/icons/heart.svg" alt="heart" />
          <span v-show="count > 0">{{ count }}</span>
        </div>
      </router-link>
      <router-link :to="{ name: 'Profile' }">
        <img src="@/assets/icons/profile.svg" alt="profile" />
        <p>Мой профиль</p>
      </router-link>
      <router-link :to="{ name: 'Post' }">
        <p>Подать объявление</p>
      </router-link>
    </div>
  </nav>
</template>

<script lang="ts">
import { useStore } from "@/store";
import { ProductGetter } from "@/store/product/getters";
import { computed, defineComponent, ref } from "vue";

export default defineComponent({
  name: "NavBar",
  setup() {
    const store = useStore();
    const lang = ref("uz");
    const isActiveLang = (value: string): boolean => lang.value === value;
    const setActiveLang = (value: string): void => {
      lang.value = value;
    };

    const count = computed<number>(
      () => store.getters[ProductGetter.GET_FAVORITE_LIST_COUNT]
    );

    return { lang, isActiveLang, setActiveLang, count };
  },
});
</script>

<style lang="scss" scoped>
nav {
  height: 71px;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 1rem;
  justify-content: space-between;
  background-color: #002f34;
  .left {
    a {
      position: absolute;
      top: 15px;
      left: 45px;
      width: 71px;
      height: 41px;
      display: block;
      .olx__o {
        position: absolute;
        left: 0;
        top: 0;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        transform: translate(12px, 15px);
        box-shadow: 0 0 0 12px #24e5db;
      }
      .olx__l {
        position: absolute;
        top: 0;
        bottom: 0;
        left: 37px;
        width: 10px;
        background: #23e5db;
      }
      .olx__x {
        width: 20px;
        height: 20px;
        overflow: hidden;
        position: absolute;
        left: 0;
        top: 0;
        transform: translate(51px, 10px);
        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 65%;
          height: 100%;
          background: #24e5db;
          transform: skewX(45deg) translate(-50%, 0);
        }
        &::after {
          content: "";
          position: absolute;
          top: 0;
          left: 50%;
          width: 65%;
          height: 100%;
          background: #24e5db;
          transform: skewX(-45deg) translate(-50%, 0);
        }
      }
    }
  }
  .right {
    width: 60%;
    display: flex;
    text-align: center;
    justify-content: space-between;

    .lang-select {
      width: 4rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;

      span {
        color: #ccc;
        font-size: 13px;
        font-weight: 100;
      }
      .active {
        color: #fff;
        font-weight: 300;
      }
    }
    a {
      color: #fff;
      font-size: 16px;
      display: flex;
      align-items: center;
      text-decoration: none;
      letter-spacing: 0.5px;

      &:hover {
        color: #ccc;
      }
      img {
        margin-right: 1rem;
      }
      .heart {
        position: relative;

        span {
          position: absolute;
          top: -5px;
          right: 1px;
          font-size: 12px;
          padding: 2px 6px;
          border-radius: 50%;
          background: #618bff;
        }
      }
      &:last-child {
        padding: 0.7rem 0.8rem;
        color: #002f34;
        background: #fff;
        border-radius: 5px;
        border: 2px solid #fff;
        transition: 0.2s ease-in;

        &:hover {
          background: #002f34;
          color: #fff;
        }
      }
    }
  }
}
</style>
