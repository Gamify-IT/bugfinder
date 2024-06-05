import { ref } from 'vue';
import { ChatParticipant, ChatElement, ChatColor } from '@/models/chat';

export const chatHistory = ref(Array<ChatElement>());
const messageDelay = 1000;

export function sendStartMessgae() {
  chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Hey', color: ChatColor.LIGHT });
  chatHistory.value.push({
    from: ChatParticipant.OTHER,
    message: "I'm having big trouble with this code. Can you help me finding all bugs?",
    color: ChatColor.LIGHT,
  });
}

export async function sendSubmitMessage(success: boolean, gameFinished: boolean) {
  sendMessage({
    from: ChatParticipant.ME,
    message: 'I think I found the bug. Is the program now running?',
    color: ChatColor.INFO,
  });
  if (success) {
    playSound("@/assets/music/success_sound.mp3");
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Yes it works! Thank you very much',
      color: ChatColor.SUCCESS,
    });
  } else {
    playSound("@/assets/music/error_sound.mp3");
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'No sadly not.',
      color: ChatColor.WARNING,
    });
  }
  if (!gameFinished) {
    playSound("@/assets/music/notification_sound.mp3");
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Can you help me again with another bug?',
      color: ChatColor.LIGHT,
    });
  } else {
    playSound("@/assets/music/notification_sound.mp3");
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Thank you a lot. You helped me fixing my code!',
      color: ChatColor.PRIMARY,
    });
  }
}

export async function sendNextCode() {
  sendMessage({ from: ChatParticipant.ME, message: "Yes, I'm happy to help you", color: ChatColor.INFO });
  await sendDelayedMessage({ from: ChatParticipant.OTHER, message: 'That is very kind of you!', color: ChatColor.LIGHT });
  playSound("@/assets/music/notification_sound.mp3");
}

function sendMessage(chatElement: ChatElement) {
  chatHistory.value.push(chatElement);
}

function removeLastMessage() {
  chatHistory.value.pop();
}

async function sendDelayedMessage(chatElement: ChatElement) {
  sendMessage({ from: chatElement.from, message: '...', color: ChatColor.LIGHT });
  await delay(messageDelay);
  removeLastMessage();
  sendMessage(chatElement);
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function playSound(pathToAudioSource: string){
  const sound = new Audio(pathToAudioSource);
  sound.play();
}