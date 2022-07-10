import { mount, VueWrapper } from '@vue/test-utils';
import CodeBox from '@/components/CodeBox.vue';
import BootstrapVue3, { BButton, BModal } from 'bootstrap-vue-3';
import VueHighlightJS from 'vue3-highlightjs';
import { ICode, Code, Word, WordType, Bug, ErrorType, Solution } from '@/models/models';
import { CodeFeedback, WordFeedback } from '@/models/code-feedback';

function exampleCode(): Code {
  return new Code(1, [
    new Word(1, WordType.SPACE),
    new Word(2, 'prublic'),
    new Word(3, WordType.SPACE),
    new Word(4, 'void'),
    new Word(5, WordType.SPACE),
    new Word(6, 'sayHello()'),
    new Word(7, WordType.SPACE),
    new Word(8, '{'),
    new Word(9, WordType.NEWLINE),
    new Word(10, WordType.TAB),
    new Word(11, WordType.SPACE),
    new Word(12, 'System.out.println("HELLO THERE!")'),
    new Word(13, WordType.NEWLINE),
    new Word(14, WordType.SPACE),
    new Word(15, '}'),
  ]);
}

function exampleCode2(): Code {
  return new Code(1, [
    new Word(1, WordType.SPACE),
    new Word(2, 'prvte'),
    new Word(3, WordType.SPACE),
    new Word(4, 'void'),
    new Word(5, WordType.SPACE),
    new Word(6, 'sayBye()'),
    new Word(7, WordType.SPACE),
    new Word(8, '{'),
    new Word(9, WordType.NEWLINE),
    new Word(10, WordType.TAB),
    new Word(11, WordType.SPACE),
    new Word(12, 'System.out.println("BYE THERE!")'),
    new Word(13, WordType.NEWLINE),
    new Word(14, WordType.TAB),
    new Word(15, WordType.SPACE),
    new Word(16, 'System.out.println("REALLY BYE THERE!")'),
    new Word(17, WordType.NEWLINE),
    new Word(18, WordType.SPACE),
    new Word(19, '}'),
  ]);
}

describe('CodeBox.vue', () => {
  let wrapper: VueWrapper;
  let code: ICode;
  let codeFeedback: CodeFeedback;

  beforeEach(() => {
    code = exampleCode();
    codeFeedback = new CodeFeedback([]);
    wrapper = mount(CodeBox, {
      props: {
        code: code,
        codeFeedback: codeFeedback,
      },
      global: {
        plugins: [BootstrapVue3, VueHighlightJS],
      },
    });
  });
  test('CodeBox shows code correct', () => {
    const lines = wrapper.findAll('.code-line');
    expect(lines.length).toBe(code.words.filter((word) => word.word == WordType.NEWLINE).length + 1);

    const words = wrapper.findAll('.code-word');
    expect(words.length).toBe(code.words.filter((word) => word.word != WordType.TAB && word.word != WordType.NEWLINE).length);

    const spaces = wrapper.findAll('.code-space');
    expect(spaces.length).toBe(code.words.filter((word) => word.word == WordType.SPACE).length);
  });
  test('CodeBox shows code correct after new props rendered', async () => {
    const newCode = exampleCode2();
    await wrapper.setProps({ code: newCode });

    const lines = wrapper.findAll('.code-line');
    expect(lines.length).toBe(newCode.words.filter((word) => word.word == WordType.NEWLINE).length + 1);

    const words = wrapper.findAll('.code-word');
    expect(words.length).toBe(newCode.words.filter((word) => word.word != WordType.TAB && word.word != WordType.NEWLINE).length);

    const spaces = wrapper.findAll('.code-space');
    expect(spaces.length).toBe(newCode.words.filter((word) => word.word == WordType.SPACE).length);
  });
  test('CodeBox shows no feedback when there is none feedback provided', () => {
    const rightCodes = wrapper.findAll('.right-code');
    expect(rightCodes.length).toBe(0);

    const wrongCodes = wrapper.findAll('.wrong-code');
    expect(wrongCodes.length).toBe(0);
  });
  test('CodeBox shows feedback when there is feedback provided', async () => {
    const successWordFeedback = new WordFeedback(new Bug(2, ErrorType.LEXICAL, 'public'), true, true, true, true);
    const failedWordBeedback = new WordFeedback(
      new Bug(12, ErrorType.SYNTAX, 'System.out.println("HELLO THERE!");'),
      false,
      false,
      false,
      false
    );
    const newCodeFeedback = new CodeFeedback([successWordFeedback, failedWordBeedback]);
    await wrapper.setProps({ codeFeedback: newCodeFeedback })

    const rightCodes = wrapper.findAll('.right-code');
    expect(rightCodes.length).toBe(1);
    expect(rightCodes[0].element.id).toBe('word-2');

    const wrongCodes = wrapper.findAll('.wrong-code');
    expect(wrongCodes.length).toBe(1);
    expect(wrongCodes[0].element.id).toBe('word-12');
  });
  test('Submit solution', async () => {
    const submitButton = wrapper.find('.btn-success');
    expect(submitButton.text()).toBe("Submit");
    expect(submitButton.exists()).toBe(true);
    
    submitButton.trigger('click');
    expect(wrapper.emitted().submitSolution[0]).toEqual([new Solution(1, [])]);

    await wrapper.vm.$nextTick();

    expect(wrapper.find('.btn-success').exists()).toBe(false);
  })
  test('Select and remove code word', async () => {
    const selectedWord = 2;
    const targetWordButton = wrapper.find('#word-' + selectedWord);
    expect(targetWordButton.exists()).toBe(true);

    targetWordButton.trigger('click');
    await wrapper.vm.$nextTick();

    const modal = wrapper.getComponent(BModal);
    const buttons = modal.findAllComponents(BButton);
    const submitButton = buttons.find((button) => button.text() == "Ok");
    expect(submitButton != null).toBe(true);

    if (submitButton == null) {
      return;
    }

    submitButton.trigger('click');

    await wrapper.vm.$nextTick();

    let selectedCodes = wrapper.findAll('.selected-code');
    expect(selectedCodes.length).toBe(1);
    expect(selectedCodes[0].element.id).toBe('word-' + selectedWord);

    targetWordButton.trigger('click');
    await wrapper.vm.$nextTick();

    selectedCodes = wrapper.findAll('.selected-code');
    expect(selectedCodes.length).toBe(0);

  });
});
