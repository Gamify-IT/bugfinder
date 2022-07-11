export enum ChatParticipant {
  ME,
  OTHER,
}

export enum ChatColor {
  PRIMARY = 'bg-primary',
  SUCCESS = 'bg-success',
  INFO = 'bg-info',
  WARNING = 'bg-warning',
  LIGHT = 'bg-light',
}

export class ChatElement {
  from: ChatParticipant;
  message: string;
  color: ChatColor;

  public constructor(from: ChatParticipant, message: string, color: ChatColor) {
    this.from = from;
    this.message = message;
    this.color = color;
  }
}
