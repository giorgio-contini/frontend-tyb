import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import "react-icons/fa";
import AppContextProvider from "./AppContext";
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import RootLayout from "./root/RootLayout";
import LoginRegistrationPage from "./pages/LoginRegistrationPage/LoginRegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import AuthContextProvider from "./AuthContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./root/ProtectedRoute";
import QuizPage from "./pages/QuizPage/QuizPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import AddQuizPage from "./pages/AddQuizPage/AddQuizPage";
import AddAdminPage from "./pages/AddAdminPage/AddAdminPage";
//                 <Route path="profile" Component={ProfilePage}/>
export const routes = createBrowserRouter(createRoutesFromElements(_jsx(Route, { children: _jsxs(Route, { path: "/", Component: RootLayout, children: [_jsx(Route, { path: "", Component: WelcomePage }), _jsx(Route, { path: "login", Component: LoginRegistrationPage }), _jsx(Route, { path: "home", element: _jsx(ProtectedRoute, { allowedRoles: ["A", "S"], children: _jsx(HomePage, {}) }) }), _jsx(Route, { path: "welcome/:username", Component: WelcomePage }), _jsx(Route, { path: "quiz", element: _jsx(ProtectedRoute, { allowedRoles: ["A", "S"], children: _jsx(QuizPage, {}) }) }), _jsx(Route, { path: "statistics", element: _jsx(ProtectedRoute, { allowedRoles: ["A", "S"], children: _jsx(StatisticsPage, {}) }) }), _jsx(Route, { path: "add-quiz", element: _jsx(ProtectedRoute, { allowedRoles: ["A"], children: _jsx(AddQuizPage, {}) }) }), _jsx(Route, { path: "add-admin", element: _jsx(ProtectedRoute, { allowedRoles: ["A"], children: _jsx(AddAdminPage, {}) }) }), _jsx(Route, { path: "profile", element: _jsx(ProtectedRoute, { allowedRoles: ["A", "S"], children: _jsx(ProfilePage, {}) }) }), _jsx(Route, { path: "*", element: _jsx(Navigate, { to: "/", replace: true }) })] }) })));
const App = () => {
    return (_jsx("div", { className: "App", children: _jsx(AuthContextProvider, { children: _jsx(AppContextProvider, { children: _jsx(RouterProvider, { router: routes }) }) }) }));
};
export default App;
