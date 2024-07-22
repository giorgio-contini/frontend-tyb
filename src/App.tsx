import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import "react-icons/fa";
import React, {useContext} from 'react';
import AppContextProvider from "./AppContext";
import {createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider} from "react-router-dom";
import RootLayout from "./root/RootLayout";
import LoginRegistrationPage from "./pages/LoginRegistrationPage/LoginRegistrationPage";
import HomePage from "./pages/HomePage/HomePage";
import WelcomePage from "./pages/WelcomePage/WelcomePage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import AuthContextProvider, {AuthContext} from "./AuthContext";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ProtectedRoute from "./root/ProtectedRoute";
import QuizPage from "./pages/QuizPage/QuizPage";
import StatisticsPage from "./pages/StatisticsPage/StatisticsPage";
import AddQuizPage from "./pages/AddQuizPage/AddQuizPage";
import AddAdminPage from "./pages/AddAdminPage/AddAdminPage";

//                 <Route path="profile" Component={ProfilePage}/>

export const routes = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/tyb" Component={RootLayout} >
                <Route path="" Component={WelcomePage}/>
                <Route path="/tyb/login" Component={LoginRegistrationPage}/>
                <Route path="/tyb/home" element={<ProtectedRoute allowedRoles={["A", "S"]}><HomePage/></ProtectedRoute>}/>
                <Route path="/tyb/welcome" Component={WelcomePage}/>
                <Route path="/tyb/quiz" element={<ProtectedRoute allowedRoles={["A", "S"]}><QuizPage/></ProtectedRoute>}/>
                <Route path="/tyb/statistics" element={<ProtectedRoute allowedRoles={["A", "S"]}><StatisticsPage/></ProtectedRoute>}/>
                <Route path="/tyb/add-quiz" element={<ProtectedRoute allowedRoles={["A"]}><AddQuizPage/></ProtectedRoute>}/>
                <Route path="/tyb/add-admin" element={<ProtectedRoute allowedRoles={["A"]}><AddAdminPage/></ProtectedRoute>}/>
                <Route path="/tyb/profile" element={<ProtectedRoute allowedRoles={["A", "S"]}><ProfilePage/></ProtectedRoute>}/>
                <Route path="*" element={<Navigate to="/tyb" replace />} />

            </Route>
        </Route>
    ))


const App = () => {

    return (
        <div className="App">
            <AuthContextProvider>
                <AppContextProvider>
                    <RouterProvider router={routes}/>
                </AppContextProvider>
            </AuthContextProvider>
        </div>

    );
}

export default App;
