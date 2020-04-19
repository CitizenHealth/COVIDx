import React from 'react';
import CheckBox from "../../../components/@vuexy/checkbox/CheckboxesVuexy"
import Radio from "../../../components/@vuexy/radio/RadioVuexy"
import { Field } from 'formik';

const MyCheckBox = props => {
    return (
        <CheckBox onChange={
            () => props.form.setFieldValue(props.field.name, !props.field.value)}
            label={props.label} />
    )
}

const RadioGroup = props => {
    return (
        <div>
            {props.names_and_labels.map(x => (
                <Radio onChange={
                    () => {
                        props.form.setFieldValue(props.field.name, x.name);
                        if ("onChange" in x) {
                            x.onChange();
                        }
                    }}
                    checked={props.form.values[props.field.name] === x.name}
                    label={x.label} />))}
        </div>
    )
}

const CheckBoxGroup = props => {
    return (
        <div>
            {props.names_and_labels.map(x => (
                <Field
                    component={MyCheckBox}
                    type="checkbox"
                    label={x.label}
                    name={x.name}
                    checked={props.values[x.name]} />
            ))}
        </div>
    )
}

export { CheckBoxGroup, RadioGroup }