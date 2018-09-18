import { User } from "./user.model";
import { Action, ActionCreator } from "redux";

export const SET_CURRENT_USER = '[User] Set Current'; // we’ll use to switch on in our reducer

// extends Action to add a user property. we use it to indicate which user we wanna make current
export interface SetCurrentUserAction extends Action {
  user: User;
}

// takes user as an argument and returns SetCurrentUserAction which we give to the reducer
export const setCurrentUser: ActionCreator<SetCurrentUserAction> =
  (user) => ({
    type: SET_CURRENT_USER,
    user: user
  });