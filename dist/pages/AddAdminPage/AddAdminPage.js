import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext, useEffect, useState } from 'react';
import './AddAdminPage.scss';
import { AuthContext } from "../../AuthContext";
import PageTitle from "../../components/PageTitle/PageTitle";
import InputTextComponent from "../../components/form-fields/InputTextComponent/InputTextComponent";
import { useNavigate } from "react-router-dom";
import PageDescription from "../../components/PageDescription/PageDescription";
import ReactTable from "../../components/ReactTable/ReactTable";
import PageSubtitle from "../../components/PageSubtitle/PageSubtitle";
import UserClient from "../../services/API/openapicode_tyb_user/UserClient";
import { showDialogFailed, showDialogSuccess } from "../../utils/DialogUtils";
const AddAdminPage = () => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [emailToAdd, setEmailToAdd] = useState("");
    const columns = [{
            Header: "Email",
            accessor: "email"
        }, {
            Header: "Username",
            accessor: "username"
        }, {
            Header: "Data Nomina",
            accessor: "dataNomina"
        }, {
            Header: "Nominante",
            accessor: "nominante"
        }];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [data, setData] = useState([]);
    function addAdminFunction() {
        UserClient.addAdminUsingPost({ email: emailToAdd, nominante: user.username })
            .then(response => {
            showDialogSuccess("", response.data.descrizione || "", () => {
                getAddminsFunction();
            });
        })
            .catch(error => {
            var _a;
            showDialogFailed(((_a = error === null || error === void 0 ? void 0 : error.response.data) === null || _a === void 0 ? void 0 : _a.esito.descrizione) || "");
        });
    }
    function getAddminsFunction() {
        UserClient.getAdminsUsingGet()
            .then(response => {
            var _a;
            setData(((_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.result) || []);
        })
            .catch(error => {
            //showDialogFailed(error?.response.data?.esito.descrizione || "");
        });
    }
    useEffect(() => {
        getAddminsFunction();
    }, []);
    return (_jsxs("div", { children: [_jsx(PageTitle, { title: "Nomina profilo Admin" }), _jsx(PageDescription, { description: "Di seguito puoi indicare una mail per un nuovo profilo admin" }), _jsxs("div", { className: "row d-flex align-items-center mt-4", children: [_jsx("div", { className: "col-auto", children: _jsx(InputTextComponent, { name: "email", label: "Email", type: "email", value: emailToAdd, isRequired: true, onChange: (name, value) => {
                                setEmailToAdd(value);
                            } }) }), _jsx("div", { className: "col-auto", children: _jsx("button", { className: "Button-style btn btn-primary b-0 me-auto", disabled: !emailRegex.test(emailToAdd), onClick: () => {
                                addAdminFunction();
                            }, children: "Aggiungi Admin" }) })] }), _jsxs("div", { className: "mt-4", children: [_jsx(PageSubtitle, { subtitle: "Admin presenti" }), _jsx(ReactTable, { columns: columns, data: data, hasPagination: true, initialState: { pageSize: 5, pageIndex: 0 }, border: true, hasSorting: true })] })] }));
};
export default AddAdminPage;
