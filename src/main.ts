import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store, { key } from "./store";
import LoadingSpinner from "./components/LoadingSpinner.vue";

import "./assets/css/main.css";

const app = createApp(App);

app.component("loading-spinner", LoadingSpinner);
app.use(store, key).use(router);
app.mount("#app");
