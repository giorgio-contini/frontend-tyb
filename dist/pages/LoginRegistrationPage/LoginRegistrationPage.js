import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import { AuthContext } from "../../AuthContext";
import { useFormik } from "formik";
import * as Yup from 'yup';
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import CheckboxComponent from "../../components/form-fields/CheckboxComponent/CheckboxComponent";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import { showDialogFailed, showDialogSuccess } from "../../utils/DialogUtils";
import "./LoginRegistrationPage.scss";
import CryptoJS from 'crypto-js';
import AuthClient from "../../services/API/openapicode_tyb_user/LoginClient";
const LoginRegistrationPage = () => {
    const { setUser } = useContext(AuthContext);
    const [isLogin, setLogin] = useState(true);
    const navigate = useNavigate();
    const initialFormState = {
        username: "", name: "", surname: "", email: "", password: "", role: ""
    };
    //metodo di gestione dei tab (log/reg)
    const handleTabChanges = () => {
        resetFormikForm();
        setLogin(!isLogin);
    };
    // Function to encrypt the password
    function encryptPassword(password) {
        const secretKey = "ti-nascondo-la-passw0rd"; // Use a secure key and store it securely
        return CryptoJS.AES.encrypt(password, secretKey).toString();
    }
    // Services
    function addUserFunction() {
        // Encrypt the password
        //const encryptedPassword = encryptPassword(formik.values.password);
        // Create user data object with encrypted password
        const userData = Object.assign(Object.assign({}, formik.values), { role: isAdmin ? "A" : "S" });
        UserClient.createUserUsingPOST(userData)
            .then(response => {
            showDialogSuccess("", (response === null || response === void 0 ? void 0 : response.data.descrizione) || "", () => {
                handleTabChanges();
            });
        })
            .catch(error => {
            var _a, _b;
            showDialogFailed(((_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.esito.descrizione) || "");
        });
    }
    function loginFunction() {
        AuthClient.login({
            username: formik.values.username, password: formik.values.password
        })
            .then(response => {
            var _a;
            //Posso gestire i dati recuperati
            if (response.data) {
                sessionStorage.setItem("authToken", ((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.token) || "");
                if (response.data.userData) {
                    setUser(response === null || response === void 0 ? void 0 : response.data.userData);
                    navigate("/home", { replace: true });
                }
            }
        })
            .catch((error) => {
            showDialogFailed("Utente non trovato");
        });
    }
    const [isAdmin, setIsAdmin] = useState(false);
    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Campo obbligatorio'),
        password: Yup.string().required('Campo obbligatorio'),
        email: Yup.string().email('Email non valida').test('email-required-if-admin', 'Campo obbligatorio', function (value) {
            if (isAdmin) {
                return !!value;
            }
            return true;
        }),
    });
    const [pwHash, setPwHash] = useState("");
    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            isLogin ? loginFunction() : addUserFunction();
        }
    });
    const resetFormikForm = () => {
        formik.setFormikState((oldState) => {
            const newState = Object.assign({}, oldState);
            newState.values = initialFormState;
            return newState;
        });
        formik.setErrors(initialFormState);
    };
    return (_jsxs("div", { className: "row", children: [_jsx("div", { className: "col-6 hide-on-sm mt-4", children: _jsx("img", { src: "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp", className: "img-fluid", alt: "image" }) }), _jsxs("div", { className: " col-sm-12 col-md-12 col-lg-6 p-2 mt-4", children: [_jsx(ToggleButtonComponent, { flag: isLogin, setFlag: setLogin, option1: "Accedi", option2: "Registrati", functionToReset: resetFormikForm }), _jsxs("div", { className: "tab-content", children: [_jsx("div", { className: "tab-pane fade show " + (isLogin ? "active" : ""), id: "pills-login", role: "tabpanel", "aria-labelledby": "tab-login", children: _jsxs("div", { className: "form p-5", children: [_jsx(InputTextComponent, { label: "Username", name: "username", isRequired: true, formik: formik }), _jsx(InputTextComponent, { label: "Password", type: "password", name: "password", formik: formik, isRequired: true }), _jsx("div", { className: "flex-row mb-4", children: _jsx("div", { className: "d-flex justify-content-center", children: _jsx("a", { className: "fa-underline", style: { cursor: "pointer" }, children: "Password dimenticata?" }) }) }), _jsx("button", { type: "submit", className: "btn btn-primary btn-block mb-4", onClick: () => {
                                                formik.handleSubmit();
                                            }, children: "Accedi" }), _jsx("div", { className: "text-center mt-3", children: _jsxs("p", { children: ["Non sei registrato? ", _jsx("a", { className: "fa-underline", style: { cursor: "pointer" }, onClick: handleTabChanges, children: "Registrati" })] }) })] }) }), _jsx("div", { className: "tab-pane fade show " + (!isLogin ? "active" : ""), id: "pills-register", role: "tabpanel", "aria-labelledby": "tab-register", children: _jsxs("div", { className: "form p-5", children: [_jsxs("div", { className: "d-flex flex-row justify-content-around mb-3", children: [_jsx(CheckboxComponent, { name: "typeP", label: "Admin", checked: isAdmin, onChange: () => {
                                                        setIsAdmin(true);
                                                    } }), _jsx(CheckboxComponent, { name: "typeS", label: "Studente", checked: !isAdmin, onChange: () => {
                                                        setIsAdmin(false);
                                                    } })] }), _jsx(InputTextComponent, { id: "username_reg", name: "username", label: "Username", type: "text", formik: formik, isRequired: true }), _jsx(InputTextComponent, { name: "email", label: "Email", type: "email", isRequired: isAdmin, formik: formik }), _jsx(InputTextComponent, { name: "name", label: "Nome", type: "text", formik: formik }), _jsx(InputTextComponent, { name: "surname", label: "Cognome", type: "text", formik: formik }), _jsx(InputTextComponent, { id: "password_reg", name: "password", label: "Password", type: "password", isRequired: true, formik: formik }), _jsx("button", { type: "submit", onClick: () => formik.handleSubmit(), className: "btn btn-primary btn-block mb-3 mt-5", children: "Conferma" })] }) })] })] })] }));
};
export default LoginRegistrationPage;
