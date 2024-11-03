import { useContext, useEffect, useState ,useMemo} from "react";
import axios from 'axios'
import MainAccordian from '../../../components/MainAccordian'
import MainCategoryForm from '../../../components/MainCategoryForm'
import ProductForm from '../../../components/ProductForm'
import SubCategoryForm from '../../../components/SubCategoryForm'
import SuperCategoryForm from '../../../components/SuperCategoryForm'
import { BASE_URL, getConfig } from '../../../helper/config'
import { AuthContext } from '../../../context/authContext'
import SuperSubAccordian from "../../../components/SuperSubAccordian";
import ProductAccordian from "../../../components/ProductAccordian";


const AddProduct = () => {
  const {accessToken} =useContext(AuthContext);
  const [maincategory, setMaincategory] = useState([]);
  const [fetchSuperSubCategory,setFetchSuperSubCategory]=useState([]);
  const [fetchSubAndProductData,setFetchSubAndProductData]=useState([]);
  const [getSpecification, setGetSpecification] = useState([]);


  const handleSideBarMainCategory= async()=>{
    try {

      const response= await axios.get(`${BASE_URL}/get-main-super-category`,getConfig(accessToken));
      // console.log(response);
      if(response.data.data){
        setMaincategory(response.data.data);
      }
      
    } catch (error) {
      console.log(error);
    }
  }
  

  // Memoize maincategory data
  const memoizedMaincategory = useMemo(() => maincategory, [maincategory]);


  const gettingSuperSubCategory = async()=>{

    try {
      const response = await axios.get(`${BASE_URL}/get-super-sub-category`, getConfig(accessToken));
      setFetchSuperSubCategory(response.data.data);
    
      
    } catch (error) {
        console.log(error);
    }

  };

  const getSubAndProductListCategory=async() => {
  
    try {
      const response= await axios.get(`${BASE_URL}/get-sub-and-productlist-category`,getConfig(accessToken));
      setFetchSubAndProductData(response.data.data);
    
    } catch (error) {
      console.log(error);
    }
  }

  const gettingSpecificationFun = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-specifications`, getConfig(accessToken));
      setGetSpecification(response.data.data);

    } catch (error) {
     // toast.error('Failed to fetch specifications.');
      console.error(error);
    }
  };

   // Fetch categories when the component loads
   useEffect(() => {
    handleSideBarMainCategory();
    gettingSuperSubCategory();
    getSubAndProductListCategory();
    gettingSpecificationFun();
  }, []);

 
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

        <div className="tab-pane fade active show" id="bordered-justified-home" role="tabpanel" aria-labelledby="home-tab">
         
          <div className="row">
              <div className="col-4">  <MainAccordian maincategory={memoizedMaincategory } setMaincategory={setMaincategory} triggerhandleSideBarMainCategory ={handleSideBarMainCategory} triggerGettingSuperSubCategory={gettingSuperSubCategory} triggerSubAndProductListCategory={getSubAndProductListCategory}/></div>

              <div className="col-8"> 
                <div className="row">
                <div className="col-12"> <MainCategoryForm refreshCategories={handleSideBarMainCategory} /> </div>
                <div className="col-12 mt-4"> <SuperCategoryForm  maincategory={maincategory} setMaincategory={setMaincategory} triggerGettingSuperSubCategory={gettingSuperSubCategory} refreshCategories={handleSideBarMainCategory}/></div>
                </div>
                
               </div>
         </div>
   
        </div>

        <div className="tab-pane fade" id="bordered-justified-profile" role="tabpanel" aria-labelledby="profile-tab">
        <div className="row">
              <div className="col-4">  
                {/* <MainAccordian/> */}
                <SuperSubAccordian getSuperSubCategory={fetchSuperSubCategory} setfetchSuperSubCategory={setFetchSuperSubCategory}  />
                </div>

              <div className="col-8"> 
                <div className="row">
                <div className="col-12"><SubCategoryForm getSuperSubCategory={fetchSuperSubCategory} setfetchSuperSubCategory={setFetchSuperSubCategory }  refreshCategories={gettingSuperSubCategory} triggerSubAndProductListFunction={getSubAndProductListCategory} /> </div>
                <div className="col-12 mt-4"> </div>
                </div>
                
               </div>
         </div>
   
        </div>

        <div className="tab-pane fade " id="bordered-justified-contact" role="tabpanel" aria-labelledby="contact-tab">
        <div className="row">
              <div className="col-4"> 
               <ProductAccordian getSubAndProductData={fetchSubAndProductData} triggerSubAndProductListCategory={getSubAndProductListCategory}  triggerSuperSubCategory={gettingSuperSubCategory}/> 
                 </div>

              <div className="col-8"> 
                <div className="row">
                <div className="col-12"><ProductForm  getSubAndProductData={fetchSubAndProductData}  triggerSubAndProductListFunction={getSubAndProductListCategory} triggerSpecificationFun={gettingSpecificationFun} getSpecificationState={getSpecification}/> </div>
                <div className="col-12 mt-4"> </div>
                </div>
                
               </div>
         </div>
        </div>

      </div>

    </div>
  </div>
  )
}

export default AddProduct