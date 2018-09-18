import { Component, Inject } from '@angular/core';
import { AppStore } from '../app.store';
import { Store } from 'redux';
import { AppState, getUnreadMessagesCount } from '../app.reducer';

@Component({
  selector: 'chat-navbar',
  templateUrl: './chat-navbar.component.html',
})
export class ChatNavbarComponent {
  unreadMessagesCount: number;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
    }

  updateState() {
    this.unreadMessagesCount = getUnreadMessagesCount(this.store.getState());
  }

}
