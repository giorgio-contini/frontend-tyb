import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useMemo, useState } from 'react';
import './SearchableSelect.scss';
/**
 * @description A custom searchable select component without the <select> HTML tag
 * @param name Name of the component (like an ID)
 * @param label Active label of the value being displayed
 * @param data Array with available options
 * @param value Value state for reset field when reset form
 * @param placeholder Placeholder to display
 * @param disabled Boolean, true if the component should be disabled
 * @param onSelectOption Callback for the select event
 * @param isRequired Boolean, true if the field is required
 * @param lengthDropDown Max height of the options window
 * @returns The SelectComponent JSX element
 *
 */
const SearchableSelect = ({ disabled, name, label, placeholder, data, valueToReset = "", onSelectOption, isRequired, error, lengthDropDown, formik }) => {
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
    const [state, setState] = useState({
        selectOption: {
            isSelected: false,
            selectedClass: "unSelected",
            lengthDropDown: "medium-dropDown"
        },
        selectedLabel: "",
    });
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [maxHighlightedIndex, setMaxHighlightedIndex] = useState(data.length);
    const handleOnChangeFormik = (name, value, upperCase = true) => {
        formik === null || formik === void 0 ? void 0 : formik.setFormikState((oldState) => {
            const newState = Object.assign({}, oldState);
            if (typeof value !== "number") {
                newState.values[name] = typeof value !== "number" ? value.toUpperCase() : value;
            }
            return newState;
        });
        formik === null || formik === void 0 ? void 0 : formik.setFieldError(name, "");
    };
    /**
     * @description Callback to updates the selected label when reset all form fields
     */
    useEffect(() => {
        let value = valueToReset;
        if (formik) {
            value = formik.values[name];
        }
        if (value === "" && state.selectedLabel !== "") {
            setState((oldState) => (Object.assign(Object.assign({}, oldState), { selectedLabel: "" })));
        }
    }, [formik, valueToReset]);
    /**
     * @description Calls the prop onSelectOption callback and updates the selected label
     * @param option the new option
     */
    const selectOption = (option) => {
        formik ? handleOnChangeFormik(name, option.value) : onSelectOption(name, option.value);
        setState((oldState) => (Object.assign(Object.assign({}, oldState), { selectedLabel: option.label })));
    };
    /**
     * @description Filter the option that contains the inputted letters from the input field
     * and scroll it into view
     * @param event HTML event
     * @returns void
     */
    const handleFilter = (event) => {
        const value = event.target.value;
        if (value === "") {
            formik ? handleOnChangeFormik(name, "") : onSelectOption(name, "");
        }
        setState((oldState) => {
            const newState = Object.assign({}, oldState);
            if (!newState.selectOption.isSelected) {
                openDropDown();
            }
            newState.selectedLabel = value;
            return newState;
        });
    };
    const classNameSelect = {
        "SearchableSelect__label": ["SearchableSelect__label"],
    };
    /**
     * @description Show the option of select component
     * @return void
     */
    const openDropDown = () => {
        setState((oldState) => (Object.assign(Object.assign({}, oldState), { selectOption: {
                isSelected: true, selectedClass: "selected",
            } })));
    };
    /**
     * @description Hide the option of select component
     * @return void
     */
    const closeDropDown = () => {
        setState((oldState) => (Object.assign(Object.assign({}, oldState), { selectOption: {
                isSelected: false, selectedClass: "unSelected",
            } })));
    };
    if (isRequired) {
        classNameSelect["SearchableSelect__label"].push("required");
    }
    const dataFilter = useMemo(() => {
        let dataToReturn = data.filter((item) => (item.label.toLowerCase().includes(state.selectedLabel.toLowerCase())));
        setMaxHighlightedIndex(dataToReturn.length - 1);
        return dataToReturn;
    }, [state.selectedLabel, data]);
    const keyboardControl = (event) => {
        if (highlightedIndex < 0 || highlightedIndex > maxHighlightedIndex) {
            setHighlightedIndex(0);
        }
        if (event.key === "ArrowUp") {
            if (highlightedIndex > 0) {
                setHighlightedIndex(highlightedIndex - 1);
            }
        }
        else if (event.key === "ArrowDown") {
            if (highlightedIndex < maxHighlightedIndex)
                setHighlightedIndex(highlightedIndex + 1);
        }
        else if (event.key === "Enter") {
            if (dataFilter[highlightedIndex]) {
                selectOption(dataFilter[highlightedIndex]);
                closeDropDown();
            }
        }
    };
    return (_jsxs("div", Object.assign({ className: "SearchableSelect" }, { children: [_jsx("label", Object.assign({ htmlFor: name, className: classNameSelect["SearchableSelect__label"].join(" ") }, { children: label })), _jsxs("div", Object.assign({ className: `SearchableSelect__container ${state.selectOption.selectedClass} ${disabled ? "disabled" : ""} ` + (fieldError ? " error" : ""), onClick: !disabled ? (state.selectOption.isSelected ? closeDropDown : openDropDown) : () => {
                } }, { children: [_jsx("input", { className: "SearchableSelect__select ", placeholder: placeholder ? placeholder : "Scegliere un'opzione", id: name, value: state.selectedLabel, disabled: disabled, onChange: handleFilter, onBlur: closeDropDown, autoComplete: "off", onKeyDown: keyboardControl }), _jsx("i", { className: `bi bi-chevron-down SearchableSelect__image` })] })), !state.selectOption.isSelected ? _jsx("div", Object.assign({ className: "Validation__errorMessage small p-0" }, { children: fieldError ? fieldError : "" })) : null, _jsx("ul", Object.assign({ className: state.selectOption.isSelected ? `SearchableSelect__ul  ${lengthDropDown}` : "d-none", role: "list" }, { children: dataFilter
                    .map((option, idx) => (_jsx("li", Object.assign({ className: `SelectComponent__select__optionsUl-li 
                        ${idx === highlightedIndex ? "SelectComponent__select-highlighted" : ""} 
                        ${idx === highlightedIndex ? "SelectComponent__select-selected" : ""} `, role: "option", onMouseDown: e => {
                        e.stopPropagation();
                        selectOption(option);
                    }, onMouseEnter: () => setHighlightedIndex(idx) }, { children: option.label }), `${name}-${option.value}-${idx}`))) }))] })));
};
export default SearchableSelect;
