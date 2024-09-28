
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="d-flex flex-column flex-shrink-0 p-3 bg-light" style={{width: "230px"}}>
    <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
      <span className="fs-4">Sidebar</span>
    </a>
    <hr/>
    <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <Link to="/view-user" className="nav-link active" aria-current="page">
         USER
        </Link>
      </li>
      <li>
        <Link to="/dashboard/add-product" className="nav-link link-dark">
          Add Product
        </Link>
      </li>
      <li>
        <Link to="/product-status" className="nav-link link-dark">
          PRODUCT STATUS
        </Link>
      </li>
      <li>
        <Link to="/enquiry-data" className="nav-link link-dark">
         ENQUIRY DATA
        </Link>
      </li>
     
    </ul>
    <hr/>
   
  </div>
  )
}

export default Sidebar