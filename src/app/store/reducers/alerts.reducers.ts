import * as actions from '../actions/alerts.actions';

export const initialAlertsState = {
    alerts: [],
}

export function alertsReducer(state = initialAlertsState, action: actions.AlertsActions) {
    const newState = { ...state };

    switch (action.type) {

        case actions.ADD_ALERT:
            const addAlertActon = action as actions.AddAlert;
            newState.alerts = [...newState.alerts, addAlertActon.payload];
            return newState;

        case actions.REMOVE_ALERT:
            const removeAlertAction = action as actions.RemoveAlert;
            newState.alerts = newState.alerts.splice(newState.alerts.indexOf(removeAlertAction.payload), 1);
            return newState;

        default:
            return state;
    }
}
