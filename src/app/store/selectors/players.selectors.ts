import { AppState } from '../app.state';

export const playersBase = (state: AppState) => state.playersState;

export const players = (state: AppState) => playersBase(state).players;
export const selectedPlayer = (state: AppState) => playersBase(state).selectedPlayer;

