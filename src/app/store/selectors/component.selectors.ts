import { AppState } from '../app.state';

export const componentBase = (state: AppState) => state.componentState;

export const addPlayers = (state: AppState) => componentBase(state).addPlayers;
export const addInventory = (state: AppState) => componentBase(state).addInventory;
export const addRentals = (state: AppState) => componentBase(state).addRentals;
