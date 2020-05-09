import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import {maxLength, required} from "../../../Utils/validates";
import {Textarea} from "../../common/formControls/FormControls";

const MyPosts = React.memo (props =>{
    console.log('Render')
    let postsElements =
        props.posts.map(p => <Post message={p.message} likesCount={p.likesCount}/>);

    let addNewPost = (values) => {
        props.addPost(values.newPostText);
    }

    return (
        <div className={s.postsBlock}>
            <h3>My posts</h3>
            <div>
                <AddNewPostRedux onSubmit={addNewPost}/>
            </div>
            <div className={s.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const maxLength10 = maxLength(10)
const AddNewPost = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field name='newPostText' component={Textarea} placeholder='Enter new post' validate={[required, maxLength10]}/>
            </div>
            <div>
                <button >Add post</button>
            </div>
        </form>
    )
}

const AddNewPostRedux = reduxForm({form: 'postForm'})(AddNewPost)

export default MyPosts;