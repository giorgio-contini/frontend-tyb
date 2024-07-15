import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import HeaderComponent from "../components/HeaderComponent/HeaderComponent";
import FooterComponent from "../components/FooterComponent/FooterComponent";
const RootLayout = () => {
    return _jsxs("div", Object.assign({ style: { backgroundColor: "lightgray", minHeight: "1100px" } }, { children: [_jsx(HeaderComponent, {}), _jsx("main", Object.assign({ className: "container rounded shadow mt-3 mb-5", style: { backgroundColor: "white", minHeight: "700px" } }, { children: _jsx(Outlet, {}) })), _jsx(FooterComponent, {})] }));
};
export default RootLayout;
