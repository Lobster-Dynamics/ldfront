import { ErrorAlert } from "@/lib/alerts/alerts";
import { AxiosError } from "axios";

export interface RequestResponse {
    msg: string;
}


export const errorHandler = (error: AxiosError<RequestResponse>) => {
    
    if(!(error instanceof AxiosError)){
       ErrorAlert("Error",(error as any)) 
    }

    //Primero los tipos de errores
    if(error?.code === "ERR_NETWORK"){
        ErrorAlert("Error de conexión","Hay problemas con tu conexión de internet")
    }
if(error?.code === "ERR_BAD_REQUEST"){
        ErrorAlert("Mala peticion","No se pudo procesar la peticion")
    }

    if(error?.code === "ERR_CONNECTION_REFUSED"){
        ErrorAlert("Conexión Rechazada","No se pudo conectar con el servidor")
    }

    if(error?.code === "ERR_BAD_RESPONSE"){
        ErrorAlert("Mala petición","No se pudo procesar la peticion") 
    }

    if(error?.code === "ERR_TIMEOUT"){
        ErrorAlert("Tiempo de espera agotado","Se agoto el tiempo de espera")
    }
    
    if (error?.code === "ECONNRESET") {
        ErrorAlert("Conexión cerrada","Se perdio la conexion con el servidor")
          }

   //Errores de HTTP 
 
    switch(error?.response?.status ?? error?.status){
        
        case 400:
            ErrorAlert("Petición incorrecta", error?.response?.data?.msg ?? "No se pudo procesar la peticion")
        
        case 401:
            ErrorAlert("No autorizado", error?.response?.data?.msg ?? "No sos admin","warning")

        case 403: 
            ErrorAlert("Sin permiso", error?.response?.data?.msg ?? "No tienes permiso para acceder a este recurso ","warning")

        case 404:
            ErrorAlert("No encontrado", error?.response?.data?.msg ?? "No se encontro el recurso solicitado ","warning")

        case 500:
            ErrorAlert("Error interno", error?.response?.data?.msg ?? "Ocurrio un error interno")

        case 503:
            ErrorAlert("Servidor no disponible", error?.response?.data?.msg ?? "El servidor no se encuentra disponible")
        break

        default:
            ErrorAlert("Favor de reportar el siguiente error", JSON.stringify(error))

    }

}
