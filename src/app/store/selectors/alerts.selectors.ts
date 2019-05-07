import { AppState } from '../app.state';

export const alertsBase = (state: AppState) => state.alertsState;

export const alerts = (state: AppState) => alertsBase(state).alerts;
