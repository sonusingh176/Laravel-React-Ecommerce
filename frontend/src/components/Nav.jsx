import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { BASE_URL, getConfig } from "../helper/config";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const Nav = ({Toggle}) => {

    const {accessToken, setAccessToken,currentUser,setCurrentUser} =useContext(AuthContext);
    const navigate= useNavigate();

    const logoutUser =async ()=>{
        try {
          const response = await axios.post(`${BASE_URL}/user/logout`,null,getConfig(accessToken))
          localStorage.removeItem('current_token')
          setAccessToken(null)
          setCurrentUser('')
          toast.success(response.data.message)
          navigate('/');

          
        } catch (error) {
         
          if(error?.response?.status === 401){
            localStorage.removeItem('current_token')
            setCurrentUser('')
            setAccessToken(null)
          }
          console.log(error);
          
        }
    
      }

  return (
    <header className="py-3 mb-3 border-bottom">
    <div className="container d-flex justify-content-between align-items-center">

    <button className="btn btn-light " onClick={Toggle} style={{background:"#ede7f6"}}>
          <i className="bi bi-list fs-5"></i>
        </button>

      <div className="d-flex ">
   
        <div className="flex-shrink-0 dropdown">
          <a href="#" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle"/>
          </a>
          <ul className="dropdown-menu text-small shadow">
         
            <li><a className="dropdown-item" href="#">{currentUser}</a></li>
            <li><a className="dropdown-item" href="#">Profile</a></li>
           
            <li className="nav-item">
                  <button className="dropdown-item btn btn-link" onClick={()=>logoutUser()}>
                    Sign Out
                  </button>
                </li>
          </ul>
        </div>
        
      </div>
      
    </div>
  </header>
  )
}

export default Nav