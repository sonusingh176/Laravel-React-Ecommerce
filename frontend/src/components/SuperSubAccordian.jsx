import React, { useContext } from 'react'
import { Accordion, Card } from "react-bootstrap";
import { AuthContext } from '../context/authContext'
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

const SuperSubAccordian = ({getSuperSubCategory,setfetchSuperSubCategory}) => {
    const {accessToken}=useContext(AuthContext);

    const handleSuperCategoryDeletion=() => {

    }

    const handleSubCategoryDeletion=(id) => {

    }

  return (
    <Card style={{width:'25rem'}}>
    <Card.Body>
    <Accordion>
        {
          getSuperSubCategory.map((el,indx)=>(
            <Accordion.Item eventKey={indx} key={indx}>
        
                <Accordion.Header>
              
                  {el.sup_cname}
                  <span className="ms-auto">
                     <Button className="btn btn-sm btn-danger  mx-1"  onClick={()=>handleSuperCategoryDeletion(el.id)}><i className="bi bi-trash-fill"></i></Button>
                     <Button className="btn btn-sm btn-warning "><i className="bi bi-pencil-fill"></i></Button>
                  </span>
                </Accordion.Header>
              
               
                <Accordion.Body>
                  {
                    el.product_sub_categories.map((subCat,indx)=>(
                      <ListGroup  key={indx}>
                        <ListGroup.Item >
                      
                              {subCat.sub_cname}
                            <Button className="btn btn-sm btn-danger p-1 mx-2" onClick={()=>handleSubCategoryDeletion(subCat.id)}><i className="bi bi-trash-fill"></i></Button>
                            <Button className="btn btn-sm btn-dark p-1"><i className="bi bi-pencil-fill"></i></Button>
            
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

export default SuperSubAccordian