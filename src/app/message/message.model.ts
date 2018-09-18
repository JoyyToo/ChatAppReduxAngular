import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';

// one message being sent in a thread
export interface Message {
  id?: string;
  sentAt?: Date;
  isRead?: boolean;
  thread?: Thread;
  author: User;
  text: string;

}