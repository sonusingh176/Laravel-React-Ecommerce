import { useContext, useEffect, useState } from "react";
import maincategoryData from "../data"; // Your updated data import
import axios from "axios";
import { BASE_URL, getConfig } from "../helper/config";
import { AuthContext } from "../context/authContext";
import { Accordion, Card } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { toast } from "react-toastify";


const MainAccordion = ({ maincategory ,setMaincategory ,triggerhandleSideBarMainCategory,triggerGettingSuperSubCategory,triggerSubAndProductListCategory}) => {
 const {accessToken} =useContext(AuthContext);

 // const [maincategory, setMaincategory] = useState([]);

  // const handleSideBarMainCategory= async()=>{
  //   try {

  //     const response= await axios.get(`${BASE_URL}/get-main-super-category`,getConfig(accessToken));
  //     // console.log(response);
  //     if(response.data.data){
  //       setMaincategory(response.data.data);

  //     }
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  // useEffect(() => {
  //    handleSideBarMainCategory();
  // },[])

  const handleMainCategoryDeletion = async(id)=>{

    try {
      const response = await axios.delete(`${BASE_URL}/delete-main-category/${id}`,getConfig(accessToken));

      console.log(response,"respone main del");
      console.log(maincategory,"staues");

      if(response.status === 200) {
        const delMainCate = maincategory.filter(item =>item.id !== id);

        console.log(delMainCate,"delMainCategory");

        setMaincategory(delMainCate);
        toast.error(response.data.data);
        triggerGettingSuperSubCategory();
        triggerSubAndProductListCategory();
      }
     
    } catch (error) {
      //optional chaining
      toast.error(error ?. response ?. statusText || error.message || "Something went wrong...");
    }
  }

  const handleSuperCategoryDeletion= async (id)=>{
    console.log(id);
    try {
      const response =await axios.delete(`${BASE_URL}/delete-super-category/${id}`,getConfig(accessToken));
      
    
      if(response.status === 200) {
        triggerhandleSideBarMainCategory();
        
        triggerGettingSuperSubCategory();
  
      }    
    } catch (error) {
      console.log(error);
    }
  }

  return (
  
     <Card style={{width:'25rem'}}>
      <Card.Body>
      <Accordion>
          {
            maincategory.map((el,indx)=>(
              <Accordion.Item eventKey={indx} key={indx}>
          
                  <Accordion.Header>
                
                    {el.main_cname}
                    <span className="ms-auto">
                       <Button className="btn btn-sm btn-danger  mx-1"  onClick={()=>handleMainCategoryDeletion(el.id)}><i className="bi bi-trash-fill"></i></Button>
                       <Button className="btn btn-sm btn-warning "><i className="bi bi-pencil-fill"></i></Button>
                    </span>
                  </Accordion.Header>
                
                  
                  <Accordion.Body>
                    {
                      el.product_super_categories.map((supCat,indx)=>(
                        <ListGroup  key={indx}>
                          <ListGroup.Item >
                        
                                {supCat.sup_cname}
                              <Button className="btn btn-sm btn-danger p-1" onClick={()=>handleSuperCategoryDeletion(supCat.id)}><i className="bi bi-trash-fill"></i></Button>
                              <Button className="btn btn-sm btn-success p-1"><i className="bi bi-trash-fill"></i></Button>
              
                          </ListGroup.Item>
                    
                        </ListGroup>
                      ))
                    }          
                  
                  </Accordion.Body>

              </Accordion.Item>
            ))
          }
    </Accordion>
      </Card.Body>

     </Card>
 
  );
};

export default MainAccordion;
