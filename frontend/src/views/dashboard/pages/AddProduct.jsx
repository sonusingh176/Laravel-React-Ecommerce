
import MainAccordian from '../../../components/MainAccordian'
import MainCategoryForm from '../../../components/MainCategoryForm'
import SubCategoryForm from '../../../components/SubCategoryForm'
import SuperCategoryForm from '../../../components/SuperCategoryForm'

const AddProduct = () => {
  return (
    <div className="card">
    <div className="card-body">
      <h5 className="card-title">Manage Products</h5>

     
      <ul className="nav nav-tabs nav-tabs-bordered d-flex" id="borderedTabJustified" role="tablist">
        <li className="nav-item flex-fill" role="presentation">
          <button className="nav-link w-100" id="home-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-home" type="button" role="tab" aria-controls="home" aria-selected="false" tabIndex="-1">Add Main Category</button>
        </li>
        <li className="nav-item flex-fill" role="presentation">
          <button className="nav-link w-100" id="profile-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-profile" type="button" role="tab" aria-controls="profile" aria-selected="false" tabIndex="-1">Profile</button>
        </li>
        <li className="nav-item flex-fill" role="presentation">
          <button className="nav-link w-100 active" id="contact-tab" data-bs-toggle="tab" data-bs-target="#bordered-justified-contact" type="button" role="tab" aria-controls="contact" aria-selected="true">Contact</button>
        </li>
      </ul>

      <div className="tab-content pt-2" id="borderedTabJustifiedContent">

        <div className="tab-pane fade" id="bordered-justified-home" role="tabpanel" aria-labelledby="home-tab">
         
          <div className="row">
              <div className="col-4">  <MainAccordian/></div>

              <div className="col-8"> 
                <div className="row">
                <div className="col-12"> <MainCategoryForm/> </div>
                <div className="col-12 mt-4"> <SuperCategoryForm/></div>
                </div>
                
               </div>
         </div>
   
        </div>

        <div className="tab-pane fade" id="bordered-justified-profile" role="tabpanel" aria-labelledby="profile-tab">
        <div className="row">
              <div className="col-4">  <MainAccordian/></div>

              <div className="col-8"> 
                <div className="row">
                <div className="col-12"><SubCategoryForm/> </div>
                <div className="col-12 mt-4"> </div>
                </div>
                
               </div>
         </div>
   
        </div>

        <div className="tab-pane fade active show" id="bordered-justified-contact" role="tabpanel" aria-labelledby="contact-tab">
sdfg
        </div>

      </div>

    </div>
  </div>
  )
}

export default AddProduct