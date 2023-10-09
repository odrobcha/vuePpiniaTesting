import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faAngleUp, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {createPinia} from 'pinia';

import "@/index.css";
import router from './router';  //could add index.js if not specify node and vite will automatically look for index.js inside router folder
import App from "@/App.vue";

library.add(faSearch, faAngleUp, faAngleDown);
const pinia = createPinia();

createApp(App)
  .use(pinia)
  .use(router)
  .component("font-awesome-icon", FontAwesomeIcon)
  .mount("#app");
