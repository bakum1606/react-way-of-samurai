import React from 'react'
import styles from './FormControls.module.css'
import {Field} from "redux-form";
import {required} from "../../../Utils/validates";


 const FormControl = ({input, meta: {touched, error}, child, ...props}) => {
    const hasError = touched && error;
    return (
        <div className={styles.formControl + " " +  (hasError ? styles.error : "")}>
            {props.children}
            {hasError && <span >{error}</span>}
        </div>
    )

}

export const Textarea = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><textarea{...input} {...restProps}/></FormControl>
}

export const Input = (props) => {
    const {input, meta, child, ...restProps} = props;
    return <FormControl {...props}><input{...input} {...restProps}/></FormControl>
}

export const createField = (placeholder, name, validate, component, props = {}, text = "") => (
    <div>
        <Field placeholder={placeholder}
               name={name}
               validate={validate}
               component={component}
               {...props}/>{text}
    </div>
)




