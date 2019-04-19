import * as actions from '../actions/rentals.actions';

export const initialRentalsState = {
    rentals: [],
    selectedRental: null,
};

export function rentalsReducer(state = initialRentalsState, action: actions.RentalsActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.REQUEST_GET_RENTALS_BY_ACTION_REQUIRED:
            newState.rentals = [];
            return newState;

        case actions.REQUEST_GET_RENTALS_BY_TYPE:
            newState.rentals = [];
            return newState;

        case actions.GET_RENTAL_SUCCESS:
            const getRentalSuccessAction = action as actions.GetRentalSuccess;
            newState.rentals = [...newState.rentals, getRentalSuccessAction.payload];
            return newState;

        case actions.GET_SELECTED_RENTAL_SUCCESS:
            const getSelectedRentalSuccessAction = action as actions.GetSelectedRentalSuccess;
            newState.selectedRental = getSelectedRentalSuccessAction.payload;
            return newState;

        case actions.CLEAR_RENTALS_STATE:
            newState.rentals = [];
            newState.selectedRental = null;
            return newState;

        default:
            return state;
    }
}
