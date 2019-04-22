import * as actions from '../actions/inventory.actions';
import { InventoryItem } from 'src/app/models/InventoryItem';

export const initialInventoryState = {
    inventoryItems: [],
    selectedInventoryItem: null,
    availableMasks: [],
    availableSnorkels: [],
    availableGloves: [],
    availableSticks: [],
    availableFins: [],
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
            const getSelectedInventoryItemSuccessAction = action as actions.GetSelectedInventoryItemSuccess;
            newState.selectedInventoryItem = getSelectedInventoryItemSuccessAction.payload;
            return newState;

        case actions.REQUEST_GET_AVAILABLE_MASKS:
            newState.availableMasks = [];
            return newState;

        case actions.GET_AVAILABLE_MASK_SUCCESS:
            const getAvailableMaskSuccessAction = action as actions.GetAvailableMaskSuccess;
            newState.availableMasks = [...newState.availableMasks, getAvailableMaskSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_AVAILABLE_SNORKELS:
            newState.availableSnorkels = [];
            return newState;

        case actions.GET_AVAILABLE_SNORKEL_SUCCESS:
            const getAvailableSnorkelsSuccessAction = action as actions.GetAvailableSnorkelSuccess;
            newState.availableSnorkels = [...newState.availableSnorkels, getAvailableSnorkelsSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_AVAILABLE_GLOVES:
            newState.availableGloves = [];
            return newState;

        case actions.GET_AVAILABLE_GLOVE_SUCCESS:
            const getAvailableGloveSuccessAction = action as actions.GetAvailableGloveSuccess;
            newState.availableGloves = [...newState.availableGloves, getAvailableGloveSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_AVAILABLE_STICKS:
            newState.availableSticks = [];
            return newState;

        case actions.GET_AVAILABLE_STICK_SUCCESS:
            const getAvailableStickSuccessAction = action as actions.GetAvailableStickSuccess;
            newState.availableSticks = [...newState.availableSticks, getAvailableStickSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_AVAILABLE_FINS:
            newState.availableFins = [];
            return newState;

        case actions.GET_AVAILABLE_MASK_SUCCESS:
            const getAvailableFinsSuccessAction = action as actions.GetAvailableFinsSuccess;
            newState.availableFins = [...newState.availableFins, getAvailableFinsSuccessAction.payload];
            return newState;

        case actions.CLEAR_INVENTORY_STATE:
            newState.inventoryItems = [];
            newState.selectedInventoryItem = null;
            newState.availableMasks = [];
            newState.availableSnorkels = [];
            newState.availableGloves = [];
            newState.availableSticks = [];
            newState.availableFins = [];
            return newState;

        default:
            return state;
    }
}
