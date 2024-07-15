var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useState } from 'react';
import './ProfilePage.scss';
import { AuthContext } from "../../AuthContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import { showDialogFailed, showDialogSuccess } from "../../utils/DialogUtils";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import { useNavigate } from "react-router-dom";
import ModalPortal from "../../components/ModalPortal/ModalPortal";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import PageSubtitle from "../../components/PageSubtitle/PageSubtitle";
import { useFormik } from "formik";
import * as Yup from "yup";
import PageDescription from "../../components/PageDescription/PageDescription";
const ProfilePage = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showModalChangePw, setShowModalChangePw] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const deleteUserFunction = () => {
        UserClient.deleteUserUsingDelete({
            username: user.username,
            password: formikDeleteProfile.values.password
        }).then(response => {
            var _a;
            if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.codice) === "OK") {
                showDialogSuccess("", response.data.descrizione || "", () => {
                    sessionStorage.clear();
                    setUser(undefined);
                    navigate("/", { replace: true });
                });
            }
            else {
                showDialogFailed(response.data.descrizione);
            }
        })
            .catch(error => {
            var _a;
            showDialogFailed(((_a = error === null || error === void 0 ? void 0 : error.response.data) === null || _a === void 0 ? void 0 : _a.esito.descrizione) || "");
        });
    };
    const initialValuesChangePw = { passwordAttuale: "", nuovaPassword: "", confermaPassword: "" };
    const initialValuesDelete = { password: "" };
    const formikChangePw = useFormik({
        initialValues: initialValuesChangePw,
        validationSchema: Yup.object().shape({
            passwordAttuale: Yup.string().required('Campo obbligatorio'),
            nuovaPassword: Yup.string().required('Campo obbligatorio'),
            confermaPassword: Yup.string()
                .oneOf([Yup.ref('nuovaPassword')], 'Le password non coincidono')
                .required('Campo obbligatorio')
        }), onSubmit: () => {
            changePWFunction();
        }
    });
    const formikDeleteProfile = useFormik({
        initialValues: initialValuesDelete,
        validationSchema: Yup.object().shape({
            password: Yup.string().required('Campo obbligatorio')
        }), onSubmit: () => {
            deleteUserFunction();
        }
    });
    const changePWFunction = () => {
        UserClient.changePasswordUsingPut({
            username: user.username,
            oldPassword: formikChangePw.values.passwordAttuale,
            newPassword: formikChangePw.values.nuovaPassword
        }).then(response => {
            var _a;
            if (((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.codice) === "OK") {
                showDialogSuccess("", response.data.descrizione || "", () => {
                    setShowModalChangePw(false);
                    resetFormPw();
                });
            }
            else {
                showDialogFailed(response.data.descrizione);
            }
        })
            .catch(error => {
            var _a;
            showDialogFailed(((_a = error === null || error === void 0 ? void 0 : error.response.data) === null || _a === void 0 ? void 0 : _a.esito.descrizione) || "");
        });
    };
    const resetFormPw = () => {
        const { values, errors } = formikChangePw, other = __rest(formikChangePw, ["values", "errors"]);
        formikChangePw.resetForm(Object.assign(Object.assign({}, other), { values: initialValuesChangePw, errors: initialValuesChangePw }));
    };
    const resetDelete = () => {
        const { values, errors } = formikDeleteProfile, other = __rest(formikDeleteProfile, ["values", "errors"]);
        formikDeleteProfile.resetForm(Object.assign(Object.assign({}, other), { values: initialValuesDelete, errors: initialValuesDelete }));
    };
    return (_jsxs("div", { children: [_jsx(PageTitle, { title: "Dettaglio Profilo" }), _jsx("div", { className: "d-flex justify-content-around mt-5 grid-row", children: _jsxs("div", { children: [_jsx(InputTextComponent, { name: "username", label: "Username", type: "text", value: user.username, disabled: true }), _jsx(InputTextComponent, { name: "name", label: "Nome", type: "text", value: user.name || "-", disabled: true }), _jsx(InputTextComponent, { name: "surname", label: "Cognome", type: "text", value: user.surname || "-", disabled: true }), _jsx(InputTextComponent, { name: "email", label: "Email", type: "text", value: user.email || "-", disabled: true }), _jsx(InputTextComponent, { name: "role", label: "Ruolo", type: "text", value: user.role === "A" ? "Admin" : "Studente", disabled: true }), _jsxs("div", { className: "d-flex", children: [_jsx("button", { className: "Button-style btn btn-primary b-0 me-auto", disabled: false, onClick: () => {
                                        setShowModalChangePw(true);
                                    }, children: "Cambia password" }), _jsx("button", { className: "Button-style btn btn-danger b-0", disabled: false, onClick: () => {
                                        setShowModalDeleteUser(true);
                                    }, children: "Elimina Profilo" })] })] }) }), _jsx(ModalPortal, { display: showModalChangePw, element: _jsxs("div", { children: [_jsx(PageSubtitle, { subtitle: "Inserisci la nuova password" }), _jsxs("div", { className: "mt-5", children: [_jsx(InputTextComponent, { name: "passwordAttuale", label: "Password attuale", type: "password", formik: formikChangePw }), _jsx(InputTextComponent, { name: "nuovaPassword", label: "Nuova password", type: "password", formik: formikChangePw }), _jsx(InputTextComponent, { name: "confermaPassword", label: "Conferma password", type: "password", formik: formikChangePw }), _jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx("button", { className: "Button-style btn btn-outline-danger", disabled: false, onClick: () => {
                                                setShowModalChangePw(false);
                                                resetFormPw();
                                            }, children: "Annulla" }), _jsx("button", { className: "Button-style btn btn-primary", disabled: false, onClick: () => {
                                                formikChangePw.handleSubmit();
                                            }, children: "Aggiorna Password" })] })] })] }) }), _jsx(ModalComponent, { display: showModalDeleteUser, element: _jsxs("div", { children: [_jsx(PageSubtitle, { subtitle: "Elimina il profilo" }), _jsx(PageDescription, { description: "Vuoi davvero eliminare il tuo account? Inserisci la password per" +
                                " confermare" }), _jsxs("div", { className: "mt-5", children: [_jsx(InputTextComponent, { name: "password", label: "Password", type: "password", formik: formikDeleteProfile }), _jsxs("div", { className: "d-flex justify-content-between mt-5", children: [_jsx("button", { className: "Button-style btn btn-outline-danger", disabled: false, onClick: () => {
                                                setShowModalDeleteUser(false);
                                                resetDelete();
                                            }, children: "Annulla" }), _jsx("button", { className: "Button-style btn btn-primary", disabled: false, onClick: () => {
                                                formikDeleteProfile.handleSubmit();
                                            }, children: "Conferma" })] })] })] }) })] }));
};
export default ProfilePage;
