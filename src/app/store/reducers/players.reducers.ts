import * as actions from '../actions/players.actions';

export const initialPlayersState = {
    players: [],
    selectedPlayer: null,
};

export function playersReducer(state = initialPlayersState, action: actions.PlayersActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.REQUEST_GET_PLAYERS_BY_GENDER:
            newState.players = [];
            return newState;

        case actions.REQUEST_GET_PLAYERS_BY_AGE_GROUP:
            newState.players = [];
            return newState;

        case actions.GET_PLAYER_SUCCESS:
            const getPlayerSuccessAction = action as actions.GetPlayerSuccess;
            newState.players = [...newState.players, getPlayerSuccessAction.payload];
            return newState;

        case actions.GET_SELECTED_PLAYER_SUCCESS:
            const getSelectedPlayerSuccessAction = action as actions.GetSelectedPlayerSuccess;
            newState.selectedPlayer = getSelectedPlayerSuccessAction.payload;
            return newState;

        case actions.CLEAR_PLAYERS_STATE:
            newState.players = [];
            newState.selectedPlayer = null;
            return newState;

        default:
            return state;
    }
}
