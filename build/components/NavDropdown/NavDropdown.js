import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Libs
 */
import { useState } from "react";
import { Link } from "react-router-dom";
/**
 * Locals
 */
import "./NavDropdown.scss";
/**
 * Class names object composite
 *
 * Contains nav dropdown button and menu wrapper
 * Default-Hover and Default-Visible respectivly
 */
const classNamesStates = {
    NavDropdownBtn: {
        Default: ["NavDropdown__btn"],
        Hover: ["NavDropdown__btn", "hover"]
    },
    NavDropdownMenuWrapper: {
        Default: ["NavDropdown__menu-wrapper"],
        Visible: ["NavDropdown__menu-wrapper", "visible"]
    }
};
/**
 * Navigation dropdown component
 *
 * @param label button label
 * @param routesArr array with routes options
 * @returns JSX
 */
const NavDropdown = ({ label, routesArr }) => {
    const [state, setState] = useState({
        classNames: {
            NavDropdownBtn: classNamesStates.NavDropdownBtn.Default,
            NavDropdownMenuWrapper: classNamesStates.NavDropdownMenuWrapper.Default
        }
    });
    /**
     * Set class names state
     *
     * @param value value
     */
    const setStateForClassNames = (value) => {
        let newClassName = null;
        let newClassName2 = null;
        if (value === true) {
            newClassName = classNamesStates.NavDropdownBtn.Hover;
            newClassName2 = classNamesStates.NavDropdownMenuWrapper.Visible;
        }
        else {
            newClassName = classNamesStates.NavDropdownBtn.Default;
            newClassName2 = classNamesStates.NavDropdownMenuWrapper.Default;
        }
        setState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.classNames.NavDropdownBtn = newClassName;
            newState.classNames.NavDropdownMenuWrapper = newClassName2;
            return newState;
        });
    };
    return (_jsxs("div", Object.assign({ className: "NavDropdown user-select-none", onMouseLeave: () => setStateForClassNames(false) }, { children: [_jsxs("div", Object.assign({ className: state.classNames.NavDropdownBtn.join(" "), onMouseEnter: () => setStateForClassNames(true) }, { children: [_jsx("span", { children: label }), _jsx("i", { className: "NavDropdown__btn-arrow bi bi-caret-down-fill" })] })), _jsxs("div", Object.assign({ className: state.classNames.NavDropdownMenuWrapper.join(" ") }, { children: [_jsx("div", { className: "NavDropdown__menu-underline" }), _jsx("div", Object.assign({ className: "NavDropdown__menu" }, { children: routesArr.map((route, idx) => {
                            return (_jsx("div", Object.assign({ className: "NavDropdown__menu-btn" }, { children: _jsx(Link, Object.assign({ to: route.path }, { children: route.label })) }), idx));
                        }) }))] }))] })));
};
export default NavDropdown;
