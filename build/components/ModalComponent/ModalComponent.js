import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Libs
 */
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
/**
 * Locals
 */
import "./ModalComponent.scss";
/**
 * ModalPortal component
 *
 * @param {any} children
 * @returns ReactPortal
 */
const ModalComponent = ({ display, element, classCustom, styleCustom }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
        elRef.current.setAttribute("class", "ModalPortal");
    }
    /**
     * Handle mount of modal on portal load
     */
    useEffect(() => {
        const modalRootEl = document.getElementById("modal-root");
        // TYPE DEFF: if there is no div with id "modal-root", in the document, then return. Otherwise proceed.
        if (modalRootEl === null) {
            // SQ cries that we must return a value, but in defensive programming we don't want to return anything, as this effect should not pass.
            // I suggest we use `return undefined`, which is equal to `return`
            return undefined;
        }
        modalRootEl.appendChild(elRef.current);
        return () => {
            modalRootEl.removeChild(elRef.current);
        };
    }, []);
    return createPortal(_jsxs("div", Object.assign({ className: `ModalsPortal__wrapper ${display ? "open" : "closed"} ${classCustom}` }, { children: [_jsx("div", { className: "ModalsPortal__backdrop" }), _jsx("div", Object.assign({ className: "ModalsPortal__container container p-5", style: styleCustom }, { children: element }))] })), elRef.current);
};
/**
 * Default export
 */
export default ModalComponent;
