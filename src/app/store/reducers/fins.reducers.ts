import * as actions from '../actions/fins.actions';

export const initialFinsState = {
    allFins: []
};

export function finsReducer(state = initialFinsState, action: actions.FinsActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_FINS:
            newState.allFins = [];
            return newState;

        case actions.GET_FINS_SUCCESS:
            const getFinsSuccessAction = action as actions.GetFinsSuccess;
            newState.allFins = [...newState.allFins, getFinsSuccessAction.payload];
            return newState;

        case actions.CLEAR_FINS_STATE:
            newState.allFins = [];
            return newState;

        default:
            return state;
    }
}
