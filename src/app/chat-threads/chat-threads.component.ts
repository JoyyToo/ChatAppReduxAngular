import { Component, Inject } from '@angular/core';
import { Thread } from '../thread/thread.model';
import { AppStore } from '../app.store';
import { Store } from 'redux';
import { AppState, getCurrentThread, getAllThreads } from '../app.reducer';
import * as ThreadActions from '../thread/thread.actions';

@Component({
  selector: 'chat-threads',
  templateUrl: './chat-threads.component.html',
})
export class ChatThreadsComponent {
  threads: Thread[];
  currentThreadId: string;

  constructor(@Inject(AppStore) private store: Store<AppState>) {
    store.subscribe(() => this.updateState());
    this.updateState();
  }

  updateState() {
    const state = this.store.getState();

    // Store the threads list
    this.threads = getAllThreads(state);

    // We want to mark the current thread as selected, so we store the currentThreadId as a value
    this.currentThreadId = getCurrentThread(state).id;
  }

  handleThreadClicked(thread: Thread) {
    this.store.dispatch(ThreadActions.selectThread(thread));
  }

}
