import * as actions from '../actions/component.actions';

export const initialComponentState = {
    selectedType: null
};

export function componentReducer(state = initialComponentState, action: actions.ComponentActions) {
    const newState = { ...state };

    switch (action.type) {
        case actions.SELECT_TYPE:
            const selectTypeAction = action as actions.SelectType;
            newState.selectedType = selectTypeAction.payload;
            return newState;

        case actions.CLEAR_COMPONENT_STATE:
            newState.selectedType = null;
            return newState;

        default:
            return state;
    }
}
