import React from 'react';
import {addPostCreator, updateNewPostCreator} from "../../../redux/store";
import MyPosts from "./MyPosts";

const MyPostsContainer = (props)=> {

    let state = props.store.getState();
    let addPost = () => {
        props.store.dispatch( addPostCreator());
    }

    let onPostChange = (text) => {
        let action = updateNewPostCreator(text);
        props.store.dispatch(action);

    }

    return (
        <MyPosts updateNewPostText={onPostChange} addPost={addPost} posts={state.profilePage.posts}
                 newPostText={state.profilePage.newPostText}
        />
    )
}

export default MyPostsContainer