export enum WordType {
  TAB = ' ',
  NEWLINE = '\n',
}

export interface ICode {
  bugWordId: number;
  words: IWord[];
}

export interface IWord {
  id: number;
  word: string | WordType;
}

export class Word implements IWord {
  id: number;
  word: string | WordType;

  public constructor(id: number, word: string | WordType) {
    this.id = id;
    this.word = word;
  }
}

export enum ChatParticipant {
  ME,
  OTHER,
}

export class ChatElement {
  from: ChatParticipant;
  message: string;

  public constructor(from: ChatParticipant, message: string) {
    this.from = from;
    this.message = message;
  }
}

export class Code implements ICode {
  bugWordId = 0;
  words: IWord[] = [];

  public constructor(bugWordId: number, words: IWord[]) {
    this.bugWordId = bugWordId;
    this.words = words;
  }
}
