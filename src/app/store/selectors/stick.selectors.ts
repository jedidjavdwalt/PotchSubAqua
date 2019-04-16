import { AppState } from '../app.state';

export const stickBase = (state: AppState) => state.stickState;

export const allSticks = (state: AppState) => stickBase(state).allSticks;
