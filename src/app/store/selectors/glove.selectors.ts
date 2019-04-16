import { AppState } from '../app.state';

export const gloveBase = (state: AppState) => state.gloveState;

export const allGloves = (state: AppState) => gloveBase(state).allGloves;
