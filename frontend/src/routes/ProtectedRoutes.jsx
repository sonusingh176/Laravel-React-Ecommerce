import{useContext} from 'react'
import { AuthContext } from '../context/authContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {

    const {accessToken} =useContext(AuthContext);
   

    if(!accessToken){
        return <Navigate to="/" replace />;  // Redirect to login page if not authenticated
    }

    return children;
}

export default ProtectedRoutes

/**
 * ProtectedRoute component me children pass karne ka maqsad yeh hota hai ki aap kisi bhi route ko protect kar sakein,
 *  chahe wo route kisi bhi component ko render kar raha ho.
 * 
 * Jab aap ProtectedRoute component ko apne routes ke saath use karte hain, toh aap usko ek wrapper ki tarah istemal 
 * karte hain jo check karta hai ki user authenticated hai ya nahi. Agar user authenticated hai, toh wo children ke 
 * under jo bhi component diya gaya hai, use render kar deta hai. Agar user authenticated nahi hai, toh wo user ko 
 * login page ya kisi bhi aur specified page par redirect kar deta hai.
 * 
 */