import { AppState } from '../app.state';

export const inventoryBase = (state: AppState) => state.inventoryState;

export const inventoryItems = (state: AppState) => inventoryBase(state).inventoryItems;
export const selectedInventoryItem = (state: AppState) => inventoryBase(state).selectedInventoryItem;
export const availableMasks = (state: AppState) => inventoryBase(state).availableMasks;
export const availableSnorkels = (state: AppState) => inventoryBase(state).availableSnorkels;
export const availableGloves = (state: AppState) => inventoryBase(state).availableGloves;
export const availableSticks = (state: AppState) => inventoryBase(state).availableSticks;
export const availableFins = (state: AppState) => inventoryBase(state).availableFins;

