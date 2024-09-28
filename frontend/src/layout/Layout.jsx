import  { useState } from 'react'
import Nav from '../components/Nav'
import Sidebar from '../components/Sidebar'
import { Outlet } from 'react-router-dom';


const Layout = () => {

    const [toggle ,setToggle]=useState(true);

    const handleToggle  =() =>{
        setToggle(!toggle)
    }

  return (
   <div className='container-fluid min-vh-100'>
    <div className="row">
        {
            toggle &&   <div className="col-2 bg-white vh-100" style={{border:"1px solid red"}}> <Sidebar/> </div>
        }
      
        <div className={`${toggle ? 'col-10' :'col-12'}`} style={{border:"1px solid red"}}>
           <Nav Toggle={handleToggle}/>

           <main className="px-3">
                    <Outlet/>
           </main>
        </div>

      
    </div>

   </div>
  )
}

export default Layout