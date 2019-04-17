import * as actions from '../actions/inventory.actions';

export const initialInventoryState = {
    inventoryItems: []
};

export function inventoryReducer(state = initialInventoryState, action: actions.InventoryActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_MASKS:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_MASK_SUCCESS:
            const getMaskSuccessAction = action as actions.GetMaskSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getMaskSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_ALL_SNORKELS:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_SNORKEL_SUCCESS:
            const getSnorkelSuccessAction = action as actions.GetSnorkelSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getSnorkelSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_ALL_GLOVES:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_GLOVE_SUCCESS:
            const getGloveSuccessAction = action as actions.GetGloveSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getGloveSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_ALL_STICKS:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_STICK_SUCCESS:
            const getStickSuccessAction = action as actions.GetStickSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getStickSuccessAction.payload];
            return newState;

        case actions.REQUEST_GET_ALL_FINS:
            newState.inventoryItems = [];
            return newState;

        case actions.GET_FINS_SUCCESS:
            const getFinsSuccessAction = action as actions.GetFinsSuccess;
            newState.inventoryItems = [...newState.inventoryItems, getFinsSuccessAction.payload];
            return newState;

        case actions.CLEAR_INVENTORY_STATE:
            newState.inventoryItems = [];
            return newState;

        default:
            return state;
    }
}
