import { AppState } from '../app.state';

export const maskBase = (state: AppState) => state.maskState;

export const allMasks = (state: AppState) => maskBase(state).allMasks;
