import { ref } from 'vue';
import { ChatParticipant, ChatElement, ChatColor } from '@/models/chat';

export const chatHistory = ref(Array<ChatElement>());
const messageDelay = 1000;

/**
 * Sends the initial start message from the other chat participant.
 * Adds a greeting and a message asking for help with code bugs.
 */
export function sendStartMessgae() {
  chatHistory.value.push({ from: ChatParticipant.OTHER, message: 'Hey', color: ChatColor.LIGHT });
  chatHistory.value.push({
    from: ChatParticipant.OTHER,
    message: "I'm having big trouble with this code. Can you help me finding all bugs?",
    color: ChatColor.LIGHT,
  });
}

/**
 * Sends the message when a solution is submitted.
 * - The user's message ("I think I found the bug. Is the program now running?") is sent first.
 * - Depending on success, sends either a positive or negative response.
 * - If the game is not finished, asks for further help, otherwise thanks the user.
 *
 * @param success - Boolean indicating if the bug fix was successful.
 * @param gameFinished - Boolean indicating if the game has finished or if more bugs need to be found.
 */
export async function sendSubmitMessage(success: boolean, gameFinished: boolean) {
  sendMessage({
    from: ChatParticipant.ME,
    message: 'I think I found the bug. Is the program now running?',
    color: ChatColor.INFO,
  });
  if (success) {
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Yes it works! Thank you very much',
      color: ChatColor.SUCCESS,
    });
  } else {
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'No sadly not.',
      color: ChatColor.WARNING,
    });
  }
  if (!gameFinished) {
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Can you help me again with another bug?',
      color: ChatColor.LIGHT,
    });
  } else {
    await sendDelayedMessage({
      from: ChatParticipant.OTHER,
      message: 'Thank you a lot. You helped me fixing my code!',
      color: ChatColor.PRIMARY,
    });
  }
}

/**
 * Sends the next message when the user agrees to help with another bug.
 * - Sends an affirmative message from the user and then a delayed response from the other participant.
 */
export async function sendNextCode() {
  sendMessage({ from: ChatParticipant.ME, message: "Yes, I'm happy to help you", color: ChatColor.INFO });
  await sendDelayedMessage({ from: ChatParticipant.OTHER, message: 'That is very kind of you!', color: ChatColor.LIGHT });
}

/**
 * Adds a new message to the chat history.
 *
 * @param chatElement - The message to be added (containing sender, message text, and color).
 */
function sendMessage(chatElement: ChatElement) {
  chatHistory.value.push(chatElement);
}

/**
 * Removes the last message from the chat history.
 */
function removeLastMessage() {
  chatHistory.value.pop();
}

/**
 * Sends a delayed message, simulating a pause before sending the final message.
 * First, a placeholder message ('...') is added, then after a delay, the real message is sent.
 *
 * @param chatElement - The message to send after the delay.
 */
async function sendDelayedMessage(chatElement: ChatElement) {
  sendMessage({ from: chatElement.from, message: '...', color: ChatColor.LIGHT });
  await delay(messageDelay);
  removeLastMessage();
  sendMessage(chatElement);
}

/**
 * Creates a delay for a specified amount of time.
 *
 * @param ms - Time to delay in milliseconds.
 * @returns A promise that resolves after the delay.
 */
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
