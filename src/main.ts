import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { createApi } from "@/Api";

createApp(App)
  .use(router)
  .use(createApi, {
    baseURL: process.env.VUE_APP_API_BASEURL,
    authBaseURL: process.env.VUE_APP_API_AUTH_BASEURL,
    publicBaseURL: process.env.VUE_APP_API_PUBLIC_BASEURL,
  })
  .mount("#app");
