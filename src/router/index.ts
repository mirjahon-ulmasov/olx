import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/views/Main.vue"),
  },
  {
    path: "/inbox",
    name: "Inbox",
    component: () => import("@/views/Inbox.vue"),
  },
  {
    path: "/favorites",
    name: "Favorites",
    component: () => import("@/views/Favorites.vue"),
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile.vue"),
  },
  {
    path: "/post-ad",
    name: "Post",
    component: () => import("@/views/Post.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
