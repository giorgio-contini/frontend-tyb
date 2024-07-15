import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import "./InputTextComponent.scss";
var TInputType;
(function (TInputType) {
    TInputType["file"] = "file";
    TInputType["text"] = "text";
})(TInputType || (TInputType = {}));
/**
 * InputTextComponent
 * @param {string} name the name of the input
 * @param {string} label the label of the input
 * @param {string} value the value of the input
 * @param {string} placeholder the placeholder of the input
 * @param {string} type the type of the input
 * @param {string} acceptFile the files accepted by the input
 * @param {boolean} disabled the disabled state of the input
 * @param {function} onChange the onChange callback function to call when the input value changes (name, value) => void
 * @param {function} register function of the "react-hook-form" library, for field validation
 * @param {any} error contains the display error for single input
 * @param {string} type contains the type input
 * @param {boolean} isRequired boolean, true if the field is required
 * @returns {JSX.Element}
 */
const InputTextComponent = ({ id, name, label, value, placeholder, type = "text", acceptFile = "*", disabled = false, onChange, maxLength, error, isRequired, formik }) => {
    //Gestione errori formik
    const [fieldError, setFieldError] = useState(error);
    const getFieldError = (form, fieldName) => {
        return form.errors[fieldName] || "";
    };
    useEffect(() => {
        if (formik) {
            setFieldError(getFieldError(formik, name));
        }
    }, [formik === null || formik === void 0 ? void 0 : formik.errors]);
    const handleOnChangeFormik = (name, value) => {
        formik === null || formik === void 0 ? void 0 : formik.setFormikState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.values[name] = value;
            return newState;
        });
        formik === null || formik === void 0 ? void 0 : formik.setFieldError(name, "");
    };
    const handleChange = (e) => {
        if (typeof onChange === "undefined" && !formik) {
            return;
        }
        let newValue;
        if (type === TInputType.file) {
            if (e.target.files) {
                newValue = e.target.files[0];
            }
        }
        else {
            newValue = e.currentTarget.value;
            if (type === "number" && maxLength) {
                newValue = newValue.substr(0, maxLength);
            }
        }
        if (formik) {
            handleOnChangeFormik(name, newValue);
        }
        else if (onChange) {
            onChange(name, newValue);
        }
    };
    const classNames = {
        "InputTextComponent__label": ["InputTextComponent__label"]
    };
    if (isRequired) {
        classNames["InputTextComponent__label"].push("required");
    }
    return (_jsxs("div", Object.assign({ className: "InputTextComponent mb-2" }, { children: [label &&
                _jsx("label", Object.assign({ htmlFor: id ? id : name, className: classNames["InputTextComponent__label"].join(" ") }, { children: label })), _jsx("input", { id: id ? id : name, value: formik ? formik.values[name] : value, placeholder: placeholder, type: type, accept: acceptFile, disabled: disabled, onChange: (e) => handleChange(e), maxLength: maxLength, className: fieldError ? "error" : "" }), _jsx("div", Object.assign({ className: "Validation__errorMessage small p-0" }, { children: fieldError ? fieldError : "" }))] })));
};
export default InputTextComponent;
