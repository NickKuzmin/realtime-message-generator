import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

export interface MessagesState {
    isLoading: boolean;
    startDateIndex?: number;
    messages: Message[];
}

export interface Message {
    uid: string;
    createdDate: Date;
    content: string;
}

interface RequestMessagesAction {
    type: 'REQUEST_MESSAGES';
}

interface ReceiveMessagesAction {
    type: 'RECEIVE_MESSAGES';
    messages: Message[];
}

interface SignalRMessageReceived {
    type: 'SIGNALR_MESSAGE_RECEIVED';
    messages: Message[];
}

type KnownAction = RequestMessagesAction | ReceiveMessagesAction | SignalRMessageReceived;

export const actionCreators = {
    requestMessages: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.messagesState) {
            fetch(`message`)
                .then(response => response.json() as Promise<Message[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_MESSAGES', messages: data });
                });

            dispatch({ type: 'REQUEST_MESSAGES' });
        }
    },
    messageReceived: (messages: Message[]): AppThunkAction<KnownAction> => (dispatch, getState) => {
        dispatch({ type: 'SIGNALR_MESSAGE_RECEIVED', messages: messages });
    }
};

const unloadedState: MessagesState = { messages: [], isLoading: false };

export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MESSAGES':
            return {
                messages: state.messages,
                isLoading: true
            };
        case 'RECEIVE_MESSAGES':
            return {
                messages: action.messages,
                isLoading: false
            };
        case 'SIGNALR_MESSAGE_RECEIVED':
            if (action.messages) {
                return {
                    messages: [...action.messages, ...state.messages],
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
