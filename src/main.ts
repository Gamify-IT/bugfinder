import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/solarized-light.css';

const app = createApp(App);

app.use(VueHighlightJS);
app.use(store).mount('#app');
