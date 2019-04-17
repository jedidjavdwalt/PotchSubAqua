import * as actions from '../actions/component.actions';

export const initialComponentState = {
    addPlayers: false,
    addInventory: false,
    addRentals: false
};

export function componentReducer(state = initialComponentState, action: actions.ComponentActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.ADD_PLAYERS:
            newState.addPlayers = true;
            newState.addRentals = false;
            newState.addInventory = false;
            return newState;

        case actions.ADD_PLAYERS_SUCCESS:
            newState.addPlayers = false;
            return newState;

        case actions.ADD_INVENTORY:
            newState.addInventory = true;
            newState.addPlayers = false;
            newState.addRentals = false;
            return newState;

        case actions.ADD_INVENTORY_SUCCESS:
            newState.addInventory = false;
            return newState;

        case actions.ADD_RENTALS:
            newState.addRentals = true;
            newState.addPlayers = false;
            newState.addInventory = false;
            return newState;

        case actions.ADD_RENTALS_SUCCESS:
            newState.addRentals = false;
            return newState;

        case actions.CLEAR_COMPONENT_STATE:
            newState.addInventory = null;
            return newState;

        default:
            return state;
    }
}
