import * as actions from '../actions/snorkel.actions';

export const initialSnorkelState = {
    allSnorkels: []
};

export function snorkelReducer(state = initialSnorkelState, action: actions.SnorkelActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_SNORKELS:
            newState.allSnorkels = [];
            return newState;

        case actions.GET_SNORKEL_SUCCESS:
            const getSnorkelSuccessAction = action as actions.GetSnorkelSuccess;
            newState.allSnorkels = [...newState.allSnorkels, getSnorkelSuccessAction.payload];
            return newState;

        case actions.CLEAR_SNORKEL_STATE:
            newState.allSnorkels = [];
            return newState;

        default:
            return state;
    }
}
