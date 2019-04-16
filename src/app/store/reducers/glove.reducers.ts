import * as actions from '../actions/glove.actions';

export const initialGloveState = {
    allGloves: []
};

export function gloveReducer(state = initialGloveState, action: actions.GloveActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_GLOVES:
            newState.allGloves = [];
            return newState;

        case actions.GET_GLOVE_SUCCESS:
            const getGloveSuccessAction = action as actions.GetGloveSuccess;
            newState.allGloves = [...newState.allGloves, getGloveSuccessAction.payload];
            return newState;

        case actions.CLEAR_GLOVE_STATE:
            newState.allGloves = [];
            return newState;

        default:
            return state;
    }
}
