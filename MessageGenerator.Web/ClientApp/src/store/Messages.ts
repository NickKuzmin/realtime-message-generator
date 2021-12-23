import { Action, Reducer } from 'redux';
import { AppThunkAction } from './';

// -----------------
// STATE - This defines the type of data maintained in the Redux store.

export interface MessagesState {
    isLoading: boolean;
    startDateIndex?: number;
    messages: Message[];
}

export interface Message {
    uid: string;
    content: string;
}

// -----------------
// ACTIONS - These are serializable (hence replayable) descriptions of state transitions.
// They do not themselves have any side-effects; they just describe something that is going to happen.

interface RequestMessagesAction {
    type: 'REQUEST_MESSAGES';
    startDateIndex: number;
}

interface ReceiveMessagesAction {
    type: 'RECEIVE_MESSAGES';
    startDateIndex: number;
    messages: Message[];
}

// Declare a 'discriminated union' type. This guarantees that all references to 'type' properties contain one of the
// declared type strings (and not any other arbitrary string).
type KnownAction = RequestMessagesAction | ReceiveMessagesAction;

// ----------------
// ACTION CREATORS - These are functions exposed to UI components that will trigger a state transition.
// They don't directly mutate state, but they can have external side-effects (such as loading data).

export const actionCreators = {
    requestMessages: (startDateIndex: number): AppThunkAction<KnownAction> => (dispatch, getState) => {
        // Only load data if it's something we don't already have (and are not already loading)
        const appState = getState();
        if (appState && appState.messagesState && startDateIndex !== appState.messagesState.startDateIndex) {
            fetch(`message`)
                .then(response => response.json() as Promise<Message[]>)
                .then(data => {
                    dispatch({ type: 'RECEIVE_MESSAGES', startDateIndex: startDateIndex, messages: data });
                });

            dispatch({ type: 'REQUEST_MESSAGES', startDateIndex: startDateIndex });
        }
    }
};

// ----------------
// REDUCER - For a given state and action, returns the new state. To support time travel, this must not mutate the old state.

const unloadedState: MessagesState = { messages: [], isLoading: false };

export const reducer: Reducer<MessagesState> = (state: MessagesState | undefined, incomingAction: Action): MessagesState => {
    if (state === undefined) {
        return unloadedState;
    }

    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'REQUEST_MESSAGES':
            return {
                startDateIndex: action.startDateIndex,
                messages: state.messages,
                isLoading: true
            };
        case 'RECEIVE_MESSAGES':
            // Only accept the incoming data if it matches the most recent request. This ensures we correctly
            // handle out-of-order responses.
            if (action.startDateIndex === state.startDateIndex) {
                return {
                    startDateIndex: action.startDateIndex,
                    messages: action.messages,
                    isLoading: false
                };
            }
            break;
    }

    return state;
};
