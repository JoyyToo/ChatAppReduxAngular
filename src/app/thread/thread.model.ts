import { Message } from '../message/message.model';

// a group of users exchanging messages
export interface Thread {
  id: string;
  name: string;
  avatarSrc: string;
  messages: Message[]
}