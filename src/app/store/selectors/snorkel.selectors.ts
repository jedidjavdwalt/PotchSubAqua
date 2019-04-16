import { AppState } from '../app.state';

export const snorkelBase = (state: AppState) => state.snorkelState;

export const allSnorkels = (state: AppState) => snorkelBase(state).allSnorkels;
