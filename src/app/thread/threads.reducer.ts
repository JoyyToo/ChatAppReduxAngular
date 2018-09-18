import { Thread } from "./thread.model";
import { Action } from "redux";
import { createSelector } from '@ngrx/store';
import * as ThreadActions from './thread.actions';
import { Message } from "../message/message.model";

export interface ThreadsEntities {
  [id: string]: Thread;
};

export interface ThreadsState {
  ids: string[];
  entities: ThreadsEntities;
  currentThreadId?: string;
};

const initialState: ThreadsState = {
  ids: [],
  currentThreadId: null,
  entities: {}
};

export const getThreadsState = (state): ThreadsState => state.threads;

export const getThreadsEntities = createSelector(
  getThreadsState,
  ( state: ThreadsState ) => state.entities );

export const getAllThreads = createSelector(
  getThreadsEntities,
  ( entities: ThreadsEntities ) => Object.keys(entities)
    .map((threadId) => entities[threadId]));

export const getCurrentThread = createSelector(
  getThreadsEntities,
  getThreadsState,
  ( entities: ThreadsEntities, state: ThreadsState ) =>
    entities[state.currentThreadId] );

export const getAllMessages = createSelector(
  getAllThreads,
    ( threads: Thread[] ) =>
      threads.reduce( // gather all messages
      (messages, thread) => [...messages, ...thread.messages],
        []).sort((m1, m2) => m1.sentAt - m2.sentAt)); // sort them by time

// selector to get number of unread messages
export const getUnreadMessagesCount = createSelector(
  getAllThreads,
  ( threads: Thread[] ) => threads.reduce(
    (unreadCount: number, thread: Thread) => {
      thread.messages.forEach((message: Message) => {
        if (!message.isRead) { ++unreadCount;
        } 
      });
      return unreadCount;
    },
    0));                        

export const ThreadsReducer =
  function(state: ThreadsState = initialState, action: Action): ThreadsState {
    switch (action.type) {
      // Adds a new Thread to the list of entities
      case ThreadActions.ADD_THREAD: {
        // we cast the action object back into a ThreadActions.AddThreadAction and then pull the Thread out
        const thread = (<ThreadActions.AddThreadAction>action).thread;

        if (state.ids.includes(thread.id)) {
          return state;
        }

        return {
          ids: [ ...state.ids, thread.id ], // adding our id to threads of ids
          currentThreadId: state.currentThreadId, // threadId doesnt change
          entities: Object.assign({}, state.entities, {
            [thread.id]: thread
          })
        };
    }

    case ThreadActions.ADD_MESSAGE: {
      const thread = (<ThreadActions.AddMessageAction>action).thread; // extracting thread
      const message = (<ThreadActions.AddMessageAction>action).message

      // special case: if the message being added is in the current thread, then // mark it as read
      const isRead = message.thread.id === state.currentThreadId ?true : message.isRead;
      const newMessage = Object.assign({}, message, { isRead: isRead });

      // grab the old thread from entities
      const oldThread = state.entities[thread.id];

      // create a new thread which has our newMessage
      const newThread = Object.assign({}, oldThread, {
        messages: [...oldThread.messages, newMessage]
      });

      return {
        ids: state.ids, // unchanged
        currentThreadId: state.currentThreadId, // unchanged
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
      };
    }

    case ThreadActions.SELECT_THREAD: {
      const thread = (<ThreadActions.SelectThreadAction>action).thread;
      const oldThread = state.entities[thread.id];

      // mark the messages as read
      const newMessages = oldThread.messages.map(
      (message) => Object.assign({}, message, { isRead: true }));

      // give them to this new thread
      const newThread = Object.assign({}, oldThread, {
        messages: newMessages
      });

      return {
        ids: state.ids,
        currentThreadId: thread.id,
        entities: Object.assign({}, state.entities, {
          [thread.id]: newThread
        })
        };
    }

    default:
       return state;
  }
}
