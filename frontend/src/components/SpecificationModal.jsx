
import { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import  Form  from 'react-bootstrap/Form';
import axios from 'axios';
import { BASE_URL, getConfig } from '../helper/config';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

function SpecificationModal({show,handleClose ,triggerSpecificationFun}) {

  const {accessToken} = useContext(AuthContext)
 
  const [name,setName] =useState('')// State for specification input

  const handleInputChange =(event) => {
    const value= event.target.value
    setName(value)

  }

  const handleSubmit = async(event) => {

    event.preventDefault();

    const formData={name:name};
    
    try {
      const response = await axios.post(`${BASE_URL}/save-specification`, formData, getConfig(accessToken));
      
      triggerSpecificationFun();
       toast.success(response.message);

    } catch (error) {
     
      toast.error(error.response?.data?.message || error.message || "An unknown error occurred");
    }
  
     handleClose();

  }

  useEffect(()=>{

  },[])
  
  return (
    <>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ADD SPECIFICATION</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
          
              <Form.Control 
                  type="text"
                  placeholder="Enter Specification"
                  value={name}
                 
                  onChange={handleInputChange} 
                  />
        
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button type="submit" variant="primary" onClick={handleSubmit}>
            Save 
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SpecificationModal;

