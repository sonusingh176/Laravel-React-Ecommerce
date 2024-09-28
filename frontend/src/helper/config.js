export const BASE_URL = 'http://127.0.0.1:8000/api'


export const getConfig = (token, isFormData = false) =>{
 
    /**
     *  i need to add  isFormData = false , because i have use this function
     *  in multiple placesplaces , where i need to upload image files. and the we know
     * when we deal in form data content type should -> "Content-type": "multipart/form-data"
     */

   
    const config ={
        headers:{
            "Content-type": isFormData ? "multipart/form-data" : "application/json",
            "Authorization":`Bearer ${token}`
        }
    }

    return config

}



