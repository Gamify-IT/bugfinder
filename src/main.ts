import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

import BootstrapVue3 from 'bootstrap-vue-3';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css';

import VueHighlightJS from 'vue3-highlightjs';
import 'highlight.js/styles/solarized-light.css';
import { BASE_URL } from '@/app';

import codesJson from '@/dummy/codes.json';
import solutionJson from '@/dummy/solution.json';

const app = createApp(App);

app.use(BootstrapVue3);
app.use(VueHighlightJS);
app.use(store).mount('#app');

async function setupData() {
  const headers = new Headers({ 'content-type': 'application/json' });
  const configurationId = '35179eca-2149-11ed-861d-0242ac120002';
  await fetch(`${BASE_URL}/configuration`, {
    method: 'POST',
    body: JSON.stringify({ id: configurationId, codes: [] }),
    headers,
  });
  await Promise.all(
    codesJson.map(async (code) => {
      await fetch(`${BASE_URL}/configuration/${configurationId}/code`, {
        method: 'POST',
        body: JSON.stringify(code),
        headers,
      });
    })
  );
  await Promise.all(
    solutionJson.map(async (solution) => {
      await fetch(`${BASE_URL}/solution`, {
        method: 'POST',
        body: JSON.stringify(solution),
        headers,
      });
    })
  );
}
setupData();
