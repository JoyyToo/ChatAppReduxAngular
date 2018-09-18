import { Component, Inject, ElementRef } from '@angular/core';
import { User } from '../user/user.model';
import { Thread } from '../thread/thread.model';
import { AppState, getCurrentThread, getCurrentUser } from '../app.reducer';
import { AppStore } from '../app.store';
import { Store } from 'redux';
import * as ThreadActions from '../thread/thread.actions'

@Component({
  selector: 'chat-window',
  templateUrl: './chat-window.component.html',
})
export class ChatWindowComponent {
  currentThread: Thread;
  draftMessage: { text: string };
  currentUser: User;

  constructor(@Inject(AppStore) private store: Store<AppState>,
              private el: ElementRef) { 
                store.subscribe(() => this.updateState() );
                this.updateState();
                this.draftMessage = { text: '' };
              }

  updateState() {
    const state = this.store.getState();
    this.currentThread = getCurrentThread(state);
    this.currentUser = getCurrentUser(state);
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    const scrollPane: any = this.el
      .nativeElement.querySelector('.msg-container-base');
    if (scrollPane) {
      setTimeout(() => scrollPane.scrollTop = scrollPane.scrollHeight);
    }
  }

  sendMessage(): void {
    this.store.dispatch(ThreadActions.addMessage(
      this.currentThread,
      {
        author: this.currentUser,
        isRead: true,
        text: this.draftMessage.text
      } 
    ));
    this.draftMessage = { text: '' }; 
  }

  onEnter(event: any): void {
    this.sendMessage();
    event.preventDefault();
  }
    
}
