import * as actions from '../actions/mask.actions';

export const initialMaskState = {
    allMasks: []
};

export function maskReducer(state = initialMaskState, action: actions.MaskActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.REQUEST_GET_ALL_MASKS:
            newState.allMasks = [];
            return newState;

        case actions.GET_MASK_SUCCESS:
            const getMaskSuccessAction = action as actions.GetMaskSuccess;
            newState.allMasks = [...newState.allMasks, getMaskSuccessAction.payload];
            return newState;

        case actions.CLEAR_MASK_STATE:
            newState.allMasks = [];
            return newState;

        default:
            return state;
    }
}
