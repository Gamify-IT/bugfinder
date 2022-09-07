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
  let configurationId = '';
  configurationId = (
    await (
      await fetch(`${BASE_URL}/configuration`, {
        method: 'POST',
        body: JSON.stringify({ id: configurationId, codes: [] }),
        headers,
      })
    ).json()
  ).id;
  const codeIdMap = {};
  const wordIdMap = {};
  await Promise.all(
    codesJson.map(async (code) => {
      const initialWordIds = code.words.map((word) => word.id);
      const initialCodeId = code.id;
      code = await (
        await fetch(`${BASE_URL}/configuration/${configurationId}/code`, {
          method: 'POST',
          body: JSON.stringify(code),
          headers,
        })
      ).json();
      codeIdMap[initialCodeId] = code;
      initialWordIds.forEach((wordId, i) => {
        wordIdMap[wordId] = code.words[i].id;
      });
    })
  );
  console.log(codeIdMap);
  await Promise.all(
    solutionJson.map(async (solution: any) => {
      solution.bugs = solution.bugs.map((bug) => ({ ...bug, wordId: wordIdMap[bug.wordId] }));
      solution.bugs.forEach((bug) => {
        console.log(bug.id, wordIdMap[bug.id], bug);
      });
      solution.code = codeIdMap[solution.codeId];
      delete solution.codeId;
      solution.id = (
        await (
          await fetch(`${BASE_URL}/solution`, {
            method: 'POST',
            body: JSON.stringify(solution),
            headers,
          })
        ).json()
      ).id;
    })
  );
}
// setupData();
