
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import routes from './routes/route';
import './App.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { BASE_URL, getConfig } from "./helper/config"
import {AuthContext} from "./context/authContext"


function App() {

  const router = createBrowserRouter(routes);
  const [accessToken, setAccessToken] =useState(JSON.parse(localStorage.getItem('current_token')));
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    
    const fetchCurrentLoggedUser =async() => {

      try {
        const response = await axios.get(`${BASE_URL}/user`,getConfig(accessToken))

        // console.log(response.data.user.name);
        setCurrentUser(response.data.user.name);
        
      } catch (error) {
        if(error?.response?.status === 401){
          localStorage.removeItem('current_token')
          setCurrentUser(null)
          setAccessToken('')
         
        }

      }
    };

    if(accessToken){
      fetchCurrentLoggedUser();
    }


  },[accessToken])






  return (
  <AuthContext.Provider value={{accessToken,setAccessToken,currentUser,setCurrentUser}}>
    <RouterProvider router={router} />
  </AuthContext.Provider>
 
  )
}

export default App
