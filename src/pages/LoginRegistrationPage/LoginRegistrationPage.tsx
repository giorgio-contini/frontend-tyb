import React, {useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import ToggleButtonComponent from "../../components/ToggleComponent/ToggleButtonComponent";
import {AuthContext} from "../../AuthContext";
import {useFormik} from "formik";
import * as Yup from 'yup';
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import CheckboxComponent from "../../components/form-fields/CheckboxComponent/CheckboxComponent";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import {showDialogFailed, showDialogSuccess} from "../../utils/DialogUtils";
import {UserType} from "../../services/API/openapicode_tyb_user";
import "./LoginRegistrationPage.scss";
import CryptoJS from 'crypto-js';
import AuthClient from "../../services/API/openapicode_tyb_user/LoginClient";


const LoginRegistrationPage = () => {

    const {setUser} = useContext(AuthContext);
    const [isLogin, setLogin] = useState(true)
    const navigate = useNavigate();

    const initialFormState: UserType = {
        username: "", name: "", surname: "", email: "", password: "", role: ""
    }

    //metodo di gestione dei tab (log/reg)
    const handleTabChanges = () => {
        resetFormikForm();
        setIsAdmin(false)
        setLogin(!isLogin);
    }

    // Function to encrypt the password
    function encryptPassword(password:string):string {
        const secretKey = "ti-nascondo-la-passw0rd"; // Use a secure key and store it securely
        return CryptoJS.AES.encrypt(password, secretKey).toString();
    }

// Services
    function addUserFunction() {
        // Encrypt the password
        //const encryptedPassword = encryptPassword(formik.values.password);

        // Create user data object with encrypted password
        const userData = {
            ...formik.values,
            role: isAdmin ? "A" : "S"
        };

        UserClient.createUserUsingPOST(userData)
            .then(response => {
                showDialogSuccess("", response?.data.descrizione || "", () => {
                    handleTabChanges();
                });
            })
            .catch(error => {
                showDialogFailed(error?.response?.data?.esito.descrizione || "");
            });
    }

    function loginFunction() {
        AuthClient.login({
        username: formik.values.username, password: formik.values.password
        })
            .then(response => {
                //Posso gestire i dati recuperati
                if (response.data) {
                    sessionStorage.setItem("authToken", response?.data?.token || "");
                    if (response.data.userData) {
                        setUser(response?.data.userData);
                        navigate("/tyb/home", {replace: true})
                    }
                }
            })
            .catch((error) => {
                    showDialogFailed("Utente non trovato")
            })


    }

    const [isAdmin, setIsAdmin] = useState<boolean>(false)

    const validationSchema = Yup.object().shape({
        username: Yup.string().required('Campo obbligatorio'),
        password: Yup.string().required('Campo obbligatorio'),
        email: Yup.string().email('Email non valida').test(
            'email-required-if-admin',
            'Campo obbligatorio',
            function (value) {
                debugger
                if (isAdmin ) {
                    return !!value;
                }
                return true;
            }
        ),
    })

    const [pwHash, setPwHash] = useState("");
    const formik = useFormik({
        initialValues: initialFormState, validationSchema: validationSchema, onSubmit: () => {
            isLogin ? loginFunction() : addUserFunction()
        }
    });

    const resetFormikForm = () => {
        formik.setFormikState((oldState: any) => {
            const newState = {...oldState};
            newState.values = initialFormState;
            return newState;
        });

        formik.setErrors(initialFormState)
    };

    return (<div className="row">
        <div className="col-6 hide-on-sm mt-4">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                 className="img-fluid" alt="image"/>
        </div>
        <div className=" col-sm-12 col-md-12 col-lg-6 p-2 mt-4">
            <ToggleButtonComponent flag={isLogin} setFlag={setLogin} option1={"Accedi"} option2={"Registrati"}
                                   functionToReset={resetFormikForm}/>
            <div className="tab-content">
                <div className={"tab-pane fade show " + (isLogin ? "active" : "")}
                     id="pills-login" role="tabpanel" aria-labelledby="tab-login">
                    <div className="form p-5">
                        <InputTextComponent
                            label="Username"
                            name="username"
                            isRequired
                            formik={formik}/>
                        <InputTextComponent label="Password" type="password"
                                            name="password" formik={formik}
                                            isRequired/>
                        <div className="flex-row mb-4">
                            <div className="d-flex justify-content-center">
                                <a className="fa-underline" style={{cursor: "pointer"}}>Password dimenticata?</a>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-primary btn-block mb-4"
                                onClick={() => {
                                    formik.handleSubmit()
                                }}>Accedi
                        </button>

                        <div className="text-center mt-3">
                            <p>Non sei registrato? <a className="fa-underline" style={{cursor: "pointer"}}
                                                      onClick={handleTabChanges}>Registrati</a></p>
                        </div>
                    </div>
                </div>
                <div className={"tab-pane fade show " + (!isLogin ? "active" : "")}
                     id="pills-register" role="tabpanel" aria-labelledby="tab-register">
                    <div className="form p-5">
                        <div className="d-flex flex-row justify-content-around mb-3">
                            <CheckboxComponent name="typeP" label={"Admin"} checked={isAdmin} onChange={() => {
                                setIsAdmin(true)
                            }}/>
                            <CheckboxComponent name="typeS" label={"Studente"} checked={!isAdmin} onChange={() => {
                                setIsAdmin(false)
                            }}/>
                        </div>

                        <InputTextComponent id="username_reg" name="username" label="Username" type="text"
                                            formik={formik}
                                            isRequired/>
                        <InputTextComponent name="email" label="Email" type="email" isRequired={isAdmin}
                                            formik={formik}/>
                        <InputTextComponent name="name" label="Nome" type="text"
                                            formik={formik}/>
                        <InputTextComponent name="surname" label="Cognome" type="text"
                                            formik={formik}
                        />
                        <InputTextComponent id="password_reg" name="password" label="Password" type="password"
                                            isRequired formik={formik}
                        />
                        <button type="submit" onClick={() => formik.handleSubmit()}
                                className="btn btn-primary btn-block mb-3 mt-5">Conferma
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>)
}

export default LoginRegistrationPage;
