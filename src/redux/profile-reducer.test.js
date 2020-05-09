import React from 'react'
import ReactDOM from "react-dom";
import App from "../App";
import profileReducer, {addPost, deletePost} from "./profile-reducer";
import actions from "redux-form/lib/actions";

let state = {
    posts: [
        {id: 1, message: 'Hi, how are you?', likesCount: 12},
        {id: 2, message: 'It\'s my first post', likesCount: 11},
        {id: 3, message: 'Blabla', likesCount: 11},
        {id: 4, message: 'Dada', likesCount: 11}
    ]
}

it('length of posts should be incremented', () => {
    let action = addPost('newPost');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(5);
})

it('new posts should be corrected', () => {
    let action = addPost('newPost');
    let newState = profileReducer(state, action);
    expect(newState.posts[4].message).toBe('newPost');
})

it('post should be deleted', () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
})

it('post shouldn\'t be deleted if value is wrong', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(4);
})
