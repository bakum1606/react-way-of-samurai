const ADD_MESSAGE = 'dialog/samurai/ADD-MESSAGE';

let initialState = {
    dialogs: [
        {id: 1, name: 'Dimych'},
        {id: 2, name: 'Andrew'},
        {id: 3, name: 'Sveta'},
        {id: 4, name: 'Sasha'},
        {id: 5, name: 'Viktor'},
        {id: 6, name: 'Valera'}
    ],
    messages: [
        {id: 1, message: 'Hi'},
        {id: 2, message: 'How is your it-kamasutra?'},
        {id: 3, message: 'Yo'},
        {id: 4, message: 'Yo'},
        {id: 5, message: 'Yo'}
    ],
    newMessageText: 'I\'m dumb security'
}

const dialogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case  ADD_MESSAGE:
            let newMessage = {
                id: 5,
                message: action.newMessageText
            };

            return {
                ...state,
                messages: [...state.messages, newMessage],
                newMessageText: ''

            }




        default:
            return state;

        }


    }

export const addMessageCreator = (newMessageText) => {
    return {
        type: ADD_MESSAGE,
        newMessageText
    }
}


    export default dialogsReducer