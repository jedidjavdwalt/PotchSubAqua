import { AppState } from '../app.state';

export const finsBase = (state: AppState) => state.finsState;

export const allFins = (state: AppState) => finsBase(state).allFins;
