import { AppState } from '../app.state';

export const componentBase = (state: AppState) => state.componentState;

export const selectedType = (state: AppState) => componentBase(state).selectedType;
