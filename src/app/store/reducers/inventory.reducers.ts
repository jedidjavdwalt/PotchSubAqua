import * as actions from '../actions/inventory.actions';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const initialInventoryState = {
    inventoryItems: [],
    selectedInventoryItem: {} as InventoryItem,
};

export function inventoryReducer(state = initialInventoryState, action: actions.InventoryActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.REQUEST_GET_INVENTORY_ITEMS_BY_STATUS:
            newState.inventoryItems = [];
            return newState;

        case actions.REQUEST_GET_INVENTORY_ITEMS_BY_TYPE:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_INVENTORY_ITEM_SUCCESS:
            const getInventoryItemSuccessAction = action as actions.GetInventoryItemSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getInventoryItemSuccessAction.payload];
            return newState;

        case actions.GET_SELECTED_INVENTORY_ITEM_SUCCESS:
            const getSelectedInventoryItemAction = action as actions.GetSelectedInventoryItemSuccess;
            newState.selectedInventoryItem = getSelectedInventoryItemAction.payload;
            return newState;

        case actions.CLEAR_INVENTORY_STATE:
            newState.inventoryItems = [];
            newState.selectedInventoryItem = {} as InventoryItem;
            return newState;

        default:
            return state;
    }
}
