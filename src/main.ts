import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/solarized-light.css';

const app = createApp(App);

app.use(BootstrapVue3);
app.use(VueHighlightJS);
app.use(store).mount('#app');
