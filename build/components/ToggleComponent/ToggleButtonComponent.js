import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Locals
 */
import "./ToggleButtonComponent.scss";
/**
 * Toggle component
 *
 * @param {Props} params component props
 * @returns JSX
 */
const ToggleButtonComponent = ({ flag, setFlag, option1, option2, customStyle, inlineWithField, disabled, functionToReset }) => {
    /**
     * Handle change
     */
    const handleChangeToggleButton = () => {
        setFlag(!flag);
        if (functionToReset) {
            functionToReset();
        }
    };
    return (_jsx("div", Object.assign({ className: inlineWithField ? "ToggleButton col-6 disabled mb-2" : "ToggleButton mb-2", "data-testid": "ToggleButton" }, { children: _jsx("div", Object.assign({ className: !customStyle ? "flex col-12 " : customStyle }, { children: _jsx("div", Object.assign({ className: "choice-selector-container" }, { children: _jsxs("div", Object.assign({ className: "choice-selector-nav" }, { children: [_jsx("input", { type: "radio", name: "tab", id: "option1", checked: flag, onChange: handleChangeToggleButton, disabled: disabled ? disabled : false }), _jsx("input", { type: "radio", name: "tab", id: "option2", checked: !flag, onChange: handleChangeToggleButton, disabled: disabled ? disabled : false }), _jsx("label", Object.assign({ htmlFor: "option1", className: "option1" }, { children: _jsx("p", { children: option1 }) })), _jsx("label", Object.assign({ htmlFor: "option2", className: "option2" }, { children: _jsx("p", { children: option2 }) })), _jsx("div", { className: "tab" })] })) })) })) })));
};
export default ToggleButtonComponent;
