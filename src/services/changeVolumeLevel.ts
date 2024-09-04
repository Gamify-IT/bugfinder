
import { BASE_URL } from '@/app';
import { ref } from 'vue';

let volumeLevel: number|null = 0;

const configurationId = window.location.pathname.split('/').pop();
const configuration = ref<any>(undefined);

export function fetchAndChangeVolumeLevel(pathToAudioFile: string) : HTMLAudioElement
{
const audio = new Audio(pathToAudioFile);

  fetch(`${BASE_URL}/configurations/${configurationId}/volume`)
.then((res) => {
  res
    .json()
    .then((json) => {
      configuration.value = json;
      volumeLevel = configuration.value.volumeLevel;
      audio.volume = volumeLevel !== null ? volumeLevel : 1;
    })
    .catch(() => {
      configuration.value = 'Invalid configuration id';
    });
})
.catch(() => {
  configuration.value = 'Server not reachable';
});
return audio;
}