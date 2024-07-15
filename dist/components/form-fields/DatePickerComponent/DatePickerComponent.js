import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DatePickerComponent.scss";
import { useEffect, useState } from "react";
/**
 * @description A date picker component based on the react-datepicker library
 * @param {string} name the name of the input
 * @param {string} label the label of the input
 * @param {string} dateFormat the date format to use
 * @param {Date} selected the selected date
 * @param {boolean} disabled a boolean, true if the component is disabled
 * @param {function} onChange the onChange callback functiion (name, value) => void
 * @param {boolean} isRequired boolean, true if the field is required
 * @param formik
 * @returns {JSX.Element} The component JSX Element
 */
const DatePickerComponent = ({ name, label, dateFormat, selected, disabled = false, onChange, isRequired, formik }) => {
    //Gestione errori formik
    const [fieldError, setFieldError] = useState("");
    const getFieldError = (form, fieldName) => {
        return form.errors[fieldName] || "";
    };
    useEffect(() => {
        if (formik) {
            setFieldError(getFieldError(formik, name));
        }
    }, [formik === null || formik === void 0 ? void 0 : formik.errors]);
    const handleOnChange = (name, value) => {
        if (formik) {
            formik === null || formik === void 0 ? void 0 : formik.setFormikState((oldState) => {
                const newState = Object.assign({}, oldState);
                newState.values[name] = value instanceof Date ? new Date(value) : value;
                return newState;
            });
            formik === null || formik === void 0 ? void 0 : formik.setFieldError(name, "");
        }
        else {
            if (onChange) {
                onChange(name, value);
            }
        }
    };
    const classNames = {
        "DatePickerComponent__label": ["DatePickerComponent__label"]
    };
    if (isRequired) {
        classNames["DatePickerComponent__label"].push("required");
    }
    return (_jsxs("div", { className: "DatePickerComponent", children: [_jsx("label", { className: classNames["DatePickerComponent__label"].join(" "), htmlFor: name, children: label }), _jsxs("label", { className: "DatePickerComponent__labelIconWrapper", onClick: e => e.preventDefault(), children: [_jsx(DatePicker, { dateFormat: dateFormat, selected: formik ? formik.values[name] : selected, id: name, onChange: (date) => {
                            // Note: this calculation fixates the date, not the time
                            if (date !== null) {
                                const diffAbs = Math.abs(date.getTimezoneOffset());
                                const newValue = date !== null ? new Date(date.getTime() + diffAbs * 60000) : date;
                                newValue.setHours(diffAbs / 60);
                                handleOnChange(name, newValue);
                            }
                            else {
                                const newValue = date;
                                handleOnChange(name, newValue);
                            }
                        }, disabled: disabled, shouldCloseOnSelect: true, className: fieldError ? " error " : "" }), _jsx("i", { className: "bi bi-calendar4" })] }), _jsx("div", { className: "Validation__errorMessage small p-0", children: fieldError ? fieldError : "" })] }));
};
export default DatePickerComponent;
