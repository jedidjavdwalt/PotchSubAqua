import { AppState } from '../app.state';

export const usersBase = (state: AppState) => state.usersState;

export const loggedInUser = (state: AppState) => usersBase(state).loggedInUser;

