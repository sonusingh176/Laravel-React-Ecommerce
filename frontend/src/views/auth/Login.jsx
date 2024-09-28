import axios from 'axios';
import { BASE_URL } from '../../helper/config';
import { useContext, useEffect, useState } from 'react';
import Spinner from '../../utils/spinner';
import {toast} from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import useValidation from '../../components/custom/useValidtion'
import { AuthContext } from '../../context/authContext';


const Login = () => {

  const [email,setEmail] =useState('');
  const [password,setPassword] = useState('');

  const [loading,setLoading] =useState('');
  const [errors,setErrors] = useState('');

  const navigate = useNavigate();

  const {accessToken, setAccessToken,currentUser,setCurrentUser} =useContext(AuthContext)

  
  useEffect(() => {
    if(accessToken) navigate('/dashboard')
  },[accessToken])



  const handleSubmit = async(event) => {
    event.preventDefault();

    setLoading(true);
    setErrors(null);

    const data ={email,password};

    try {
      const response = await axios.post(`${BASE_URL}/user/login`,data)

      // console.log(response);
      if(response.data.error){
          setLoading(false);
        
          toast.error(response.data.error);
          console.log(response);

      }else{
        localStorage.setItem('current_token',JSON.stringify(response.data.currentToken))
        setAccessToken(response.data.currentToken)
        setCurrentUser(response.data.user.name)

        setLoading(false);
        setEmail('')
        setPassword('')
        toast.success(response.data.message)
        navigate('/dashboard')

      }
      
    } catch (error) {
      console.log(error);
      setLoading(false)
      if(error?.response?.status === 422){

        setErrors(error.response.data.errors);
      }
    }

  }


  return (
    <div className='container'>

      <div className="card  mb-3 mt-5 m-auto" style={{width:"25rem"}}>
        <div className="card-body">
        <h5 className="card-title text-center">Login</h5>
        <form onSubmit={handleSubmit}>

            <div className="mb-3">
                <label htmlFor="Email Address" className="form-label">Email address</label>
                <input type="email" name="email" className="form-control" id="email" onChange={(e)=>setEmail(e.target.value)} />
                {useValidation(errors,'email')}
            </div>

            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" name="password" className="form-control" id="password" onChange={(e)=>setPassword(e.target.value)}/>
                {useValidation(errors,'password')}
            </div>
        
        {
          loading ? <Spinner/> :  <button type="submit" className="btn btn-primary">SignIn</button>
        }
          
        </form>
        </div>
       
      </div>
       
    </div>
  )
}

export default Login