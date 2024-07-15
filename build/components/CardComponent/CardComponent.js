import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
/**
 * Libs
 */
import { useContext, useRef } from "react";
/**
 * Core
 */
import "./CardComponent.scss";
import { generateRandomRGB } from "../PlotComponent/PlotComponent";
import { AuthContext } from "../../AuthContext";
import QuizClient from "../../services/API/openapicode_tyb_user/QuizClient";
import { showDialogConfirmOperation, showDialogFailed } from "../../utils/DialogUtils";
import { useNavigate } from "react-router-dom";
/**
 * CardComponent

 * @returns JSX
 * @param key
 * @param config
 */
const CardComponent = ({ config }) => {
    const button1Ref = useRef(null);
    const navigate = useNavigate();
    const { isInRole } = useContext(AuthContext);
    const showHideFunction = () => {
        QuizClient.showHideQuizUsingPut(config.id).then(res => {
            //showDialogSuccess(res?.data?.esito || "", res.data.descrizione);
            if (config.onHidden) {
                config.onHidden();
            }
        }).catch(error => {
            var _a, _b, _c;
            showDialogFailed(((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.esito) === null || _c === void 0 ? void 0 : _c.descrizione) || "");
        });
    };
    const deleteFunction = () => {
        QuizClient.deleteQuizUsingDelete(config.id).then(res => {
            //showDialogSuccess(res?.data?.esito || "", res.data.descrizione);
            if (config.onDelete) {
                config.onDelete();
            }
        }).catch(error => {
            var _a, _b, _c;
            showDialogFailed(((_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.esito) === null || _c === void 0 ? void 0 : _c.descrizione) || "");
        });
    };
    return (_jsx("div", Object.assign({ className: "CardComponent " }, { children: _jsxs("article", Object.assign({ className: "Card " + config.status }, { children: [_jsx("header", Object.assign({ className: "cardHeader" }, { children: _jsx("div", Object.assign({ style: { width: '100%', height: '100%', position: 'relative' } }, { children: config.image ? (_jsx("img", { src: config.image, alt: "Card Image", style: {
                                width: '100%', height: '100%', objectFit: 'cover',
                                objectPosition: 'center'
                            } })) : (_jsx("div", { style: { backgroundColor: generateRandomRGB(), width: '100%', height: '100%' } })) })) })), _jsxs("footer", Object.assign({ className: "cardFooter" }, { children: [_jsxs("div", Object.assign({ className: "cardText" }, { children: [_jsx("h3", Object.assign({ className: "cardTitle" }, { children: config.title })), _jsx("p", Object.assign({ className: "cardSubtitle" }, { children: config.description }))] })), (config === null || config === void 0 ? void 0 : config.button1) ?
                            _jsxs("div", Object.assign({ className: "d-flex justify-content-between gap-1" }, { children: [_jsx("button", Object.assign({ ref: button1Ref, className: "Button-style btn btn-primary b-0", disabled: config.isHidden, onClick: () => {
                                            if (config.button1) {
                                                config.button1.onClick();
                                            }
                                        } }, { children: _jsx("span", Object.assign({ className: "Label-button-style" }, { children: config.button1.label ? config.button1.label : "Procedi" })) }), "button1_" + (config === null || config === void 0 ? void 0 : config.id)), isInRole("A") ?
                                        _jsxs(_Fragment, { children: [_jsx("button", Object.assign({ className: "btn btn-outline-secondary px-2 ", disabled: false, onClick: () => {
                                                        //hide-show
                                                        showHideFunction();
                                                    }, title: config.isHidden ? "Mostra quiz" : "Nascondi quiz" }, { children: _jsx("span", Object.assign({ className: "Label-button-style" }, { children: _jsx("i", { className: config.isHidden ? "bi bi-eye-fill" : "bi bi-eye-slash-fill" }) })) }), "hide_1_" + (config === null || config === void 0 ? void 0 : config.id)), _jsx("button", Object.assign({ className: "btn btn-danger px-2", disabled: false, onClick: () => {
                                                        // delete
                                                        showDialogConfirmOperation("Attenzione", "Confermi di voler eliminare il quiz?", deleteFunction);
                                                    }, title: "Elimina quiz" }, { children: _jsx("span", Object.assign({ className: "Label-button-style" }, { children: _jsx("i", { className: "bi bi-trash" }) })) }), "delete_1_" + (config === null || config === void 0 ? void 0 : config.id))] }) : _jsx(_Fragment, {})] }))
                            :
                                null] }))] })) }), config.id));
};
export default CardComponent;
