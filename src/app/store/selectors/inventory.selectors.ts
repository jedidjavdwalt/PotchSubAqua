import { AppState } from '../app.state';

export const inventoryBase = (state: AppState) => state.inventoryState;

export const inventoryItems = (state: AppState) => inventoryBase(state).inventoryItems;
