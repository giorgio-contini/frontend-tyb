import Swal from "sweetalert2";
const SwalDUPopup = Swal.mixin({
    reverseButtons: true,
    confirmButtonColor: "#0066CC",
    cancelButtonColor: "#aeaeae"
});
const showDialogSuccess = (title, text, FunctionByConfirm) => {
    SwalDUPopup.fire({
        icon: "success",
        title: title,
        text: text,
    }).then((result) => {
        console.log("result", result);
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            if (FunctionByConfirm) {
                FunctionByConfirm();
            }
        }
    });
};
const showDialogFailed = (errorMsg, errorCode) => {
    //errorMsg = errorMsg && errorMsg.includes("Errore:") ? errorMsg.split("Errore: ")[1] : errorMsg;
    SwalDUPopup.fire({
        icon: "error",
        title: errorCode ? errorCode : "",
        html: "<span style='white-space: pre-line'>" + errorMsg + "</span>",
    });
};
const showDialogInfo = (titleInfo, infoMsg, FunctionByConfirm) => {
    SwalDUPopup.fire({
        icon: "info",
        title: titleInfo,
        html: infoMsg,
        allowOutsideClick: false,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            FunctionByConfirm(true);
        }
        else if (result.isDenied) {
            FunctionByConfirm(false);
        }
    });
};
const showDialogConfirmOperation = (title, msg, functionByConfirm) => {
    SwalDUPopup.fire({
        icon: "warning",
        showCancelButton: true,
        showConfirmButton: true,
        confirmButtonText: "Conferma",
        cancelButtonText: "Annulla",
        allowOutsideClick: false,
        title: title,
        html: msg,
        customClass: {
            confirmButton: "btn btn-primary m-1 ",
            cancelButton: "btn btn-outline-info m-1"
        },
        preConfirm(inputValue) {
            functionByConfirm(true);
        }
    });
};
export { showDialogFailed, showDialogSuccess, showDialogConfirmOperation, SwalDUPopup, showDialogInfo };
