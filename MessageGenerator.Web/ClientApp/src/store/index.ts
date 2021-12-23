import * as Messages from './Messages';

export interface ApplicationState {
    messagesState: Messages.MessagesState | undefined;
}

export const reducers = {
    messagesState: Messages.reducer,
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
