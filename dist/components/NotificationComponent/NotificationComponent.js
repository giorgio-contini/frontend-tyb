import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import './NotificationComponent.scss';
/**
 * Notification bar component for displaying customizable notifications
 * @param type type of notification can be ('success', 'error', 'info', 'warning')
 * @param text messages to display
 * @param className className customizable
 * @param show remove the hidden display
 * @param closable can be closable
 * @param children ReactNode
 * @param cbClose to close notification
 * @param noIcon not use icon
 * @constructor
 */
const NotificationComponent = ({ type, messages, className, show = true, closable, children, cbClose, noIcon }) => {
    if (typeof messages === 'string') {
        messages = [messages];
    }
    const classNames = {
        "NotificationComponent": ["NotificationComponent", "col mb-5 mb-md-0 h-100"],
        "NotificationComponent__notify": ["NotificationComponent__notify", "notification with-icon p-2 ps-3 ", className],
        "NotificationComponent__icon": ["fs-5 d-inline"]
    };
    if (type === "success") {
        classNames["NotificationComponent__icon"].push("bi bi-check-circle messages-success text-success");
    }
    else if (type === "warning") {
        classNames["NotificationComponent__icon"].push("bi bi-exclamation-octagon messages-warning text-warning");
    }
    else if (type === "error") {
        classNames["NotificationComponent__icon"].push("bi bi-x-circle messages-danger text-danger");
    }
    else if (type === "info") {
        classNames["NotificationComponent__icon"].push("bi bi bi-info-circle messages-primary text-primary");
    }
    if (show) {
        classNames["NotificationComponent__notify"].push("d-flex");
        classNames["NotificationComponent__notify"].push(type);
    }
    return (_jsx("div", { className: classNames["NotificationComponent"].join(" "), children: _jsxs("div", { className: classNames["NotificationComponent__notify"].join(" "), role: "alert", "aria-labelledby": "text_notify", id: "notify", children: [_jsxs("div", { id: "text_notify", className: "NotificationComponent__flex", children: [!noIcon ? _jsx("i", { className: classNames["NotificationComponent__icon"].join(" ") }) : null, _jsx("div", { className: "d-flex flex-column", children: messages.map((message, index) => {
                                return message ? _jsx("div", { className: "d-flex justify-content-center align-items-center w-100", children: _jsx("h6", { className: "m-0 ms-2 w-100 text-break", children: message }) }, "message" + index) : _jsx(_Fragment, {});
                            }) }), closable ? _jsx("button", { className: "btn ms-auto", onClick: cbClose, children: _jsx("i", { className: "bi bi-x-lg" }) }) : null] }), children] }) }));
};
export default NotificationComponent;
