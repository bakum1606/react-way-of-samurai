const ADD_MESSAGE = 'ADD-MESSAGE';
const UPDATE_NEW_MESSAGE = 'UPDATE-NEW-MESSAGE';


const dialogsReducer = (state, action) => {
    switch (action.type) {
        case  ADD_MESSAGE:
            let newMessage = {
                id: 5,
                message: state.newMessageText
            };
            state.messages.push(newMessage);
            state.newPostText = '';
            return  state;
        case UPDATE_NEW_MESSAGE:
            state.newMessageText = action.send;
            return  state;
        default:
            return state;

    }


}

export default dialogsReducer