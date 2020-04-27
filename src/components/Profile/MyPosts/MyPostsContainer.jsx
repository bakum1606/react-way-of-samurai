import React from 'react';
import MyPosts from "./MyPosts";
import {connect} from "react-redux";
import {addPost, updateNewPost} from "../../../redux/profile-reducer";


    const mapStateToProps = (state) => {
        return {
            posts: state.profilePage.posts,
            newPostText: state.profilePage.newPostText
        }

    }

    const mapDispatchToProps = (dispatch) => {
        return {
            updateNewPostText: (text) => {
                let action = updateNewPost(text);
                dispatch(action);
            },

            addPost: () => {
                dispatch(addPost());
            }
        }

    }


    const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts);


    export default MyPostsContainer;