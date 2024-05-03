import Swal from "sweetalert2";

type SwalIcons = "success" | "error" | "warning" | "info" | "question";


export const ErrorAlert = async (title:string,message:string,type: SwalIcons = "error") => {
    await Swal.fire({
        icon: type,
        title: title,
        text: message,
      });
}

//Alerta que namas pide al ususario que acepte algo
export const AceptAlert = async (message:string,type: SwalIcons = "success") => {
    await Swal.fire({
        icon: type,
        title: message,
      });
}

//Modal de confirmacion, se  puede usar para aceptar o rechazar algo

export const ConfirmAlert = async (message:string, confirmText:string = "Si", cancelText:string = "No", type: SwalIcons = "question") => {
    const {isConfirmed} = await Swal.fire({
        icon: type,
        title: message,
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
      });

      return isConfirmed
}


//Alerta que pide un input y realiza una accion dependiendo de eso

export const InputAlert = async (title:string, preConfirmCallback: (...args: any[]) => Promise<any>, confirmMessage:string = "Se realizo correctamente", confirmTitle:string = "Exito",confirmText:string = "Si", cancelText:string = "No", type: SwalIcons = "question",) => {
   
    await Swal.fire({
        title: title,
        input:'text',
        inputAttributes: {
            autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: confirmText,
        cancelButtonText: cancelText,
        confirmButtonColor: "#8700BF",
        cancelButtonColor: "#E55E86",
        showLoaderOnConfirm: true,
        preConfirm: preConfirmCallback, 
        allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                icon: type,
                title: confirmTitle,
                text: confirmMessage, 
            })
        }
    })
}


