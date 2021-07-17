import { createApp } from "vue";
import App from "./App.vue";

import { IonicVue } from "@ionic/vue";
import createStore from "./store";

/* Core CSS required for Ionic components to work properly */
import "@ionic/vue/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/vue/css/normalize.css";
import "@ionic/vue/css/structure.css";
import "@ionic/vue/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/vue/css/padding.css";
import "@ionic/vue/css/float-elements.css";
import "@ionic/vue/css/text-alignment.css";
import "@ionic/vue/css/text-transformation.css";
import "@ionic/vue/css/flex-utils.css";
import "@ionic/vue/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Hack to consolidate logs */
const logCache = [];
const oldLog = console.debug;
console.debug = function() {
  logCache.push(arguments);
};
setInterval(() => {
  oldLog(logCache.length);
  const request = new Request("/log", {
    method: "POST",
    body: JSON.stringify(logCache)
  });
  fetch(request);
}, 5000);

/* Libp2p2 debug config */
let debug = require("debug");
debug.log = console.debug.bind(console);
debug.enable("libp2p:gossipsub*");

const app = createApp(App)
  .use(IonicVue)
  .use(createStore());

app.mount("#app");
