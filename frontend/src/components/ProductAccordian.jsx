
import React, { useContext } from 'react'
import { Accordion, Card } from "react-bootstrap";
import { AuthContext } from '../context/authContext'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import axios from 'axios';
import { BASE_URL, getConfig } from '../helper/config';
import { toast } from 'react-toastify';

const ProductAccordian = ({getSubAndProductData,triggerSubAndProductListCategory,triggerSuperSubCategory}) => {

    const {accessToken} =useContext(AuthContext);

    const handleSubCategoryDeletion = async(id) => {

            try {
                const response= await axios.delete(`${BASE_URL}/delete-sub-category/${id}`,getConfig(accessToken));
                console.log(response);
                triggerSubAndProductListCategory();
                triggerSuperSubCategory();
                toast.error(response.data.message);
            } catch (error) {
                console.log(error);
            }
    }


    const handleProductListDeletion =async(id) => {

        try {
            let response = await axios.delete(`${BASE_URL}/delete-product-list/${id}`,getConfig(accessToken));
           if(response.status === 200) {
            toast.error(response.data.message);
           }
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

  return (
    <Card style={{width:'25rem'}}>
    <Card.Body>
        <Accordion>
            {
            getSubAndProductData.map((el,indx)=>(
                <Accordion.Item eventKey={indx} key={indx}>
            
                    <Accordion.Header>
                
                    {el.sub_cname}
                    <span className="ms-auto">
                        <Button className="btn btn-sm btn-danger  mx-1"  onClick={()=>handleSubCategoryDeletion(el.id)}><i className="bi bi-trash-fill"></i></Button>
                        <Button className="btn btn-sm btn-warning"><i className="bi bi-pencil-fill"></i></Button>
                    </span>
                    </Accordion.Header>
                
                
                    <Accordion.Body>
                    {
                        el.product_listings.map((elem,indx)=>(
                        <ListGroup  key={indx}>
                            <ListGroup.Item >
                        
                                {elem.product_name}
                                <Button className="btn btn-sm btn-danger mx-1 p-1" onClick={()=>handleProductListDeletion(elem.id)}><i className="bi bi-trash-fill"></i></Button>
                                <Button className="btn btn-sm btn-dark p-1"><i className="bi bi-trash-fill"></i></Button>
                
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
  )
}

export default ProductAccordian