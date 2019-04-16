import * as actions from '../actions/stick.actions';

export const initialStickState = {
    allSticks: []
};

export function stickReducer(state = initialStickState, action: actions.StickActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_STICKS:
            newState.allSticks = [];
            return newState;

        case actions.GET_STICK_SUCCESS:
            const getStickSuccessAction = action as actions.GetStickSuccess;
            newState.allSticks = [...newState.allSticks, getStickSuccessAction.payload];
            return newState;

        case actions.CLEAR_STICK_STATE:
            newState.allSticks = [];
            return newState;

        default:
            return state;
    }
}
