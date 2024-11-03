import {useContext, useEffect, useState} from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import SpecificationModal from './SpecificationModal';
import axios from 'axios';
import { toast } from 'react-toastify';
import { BASE_URL, getConfig } from '../helper/config';
import { AuthContext } from '../context/authContext';

const SpecificationList = ({getSpecificationState ,triggerSpecificationFun}) => {

    const {accessToken} = useContext(AuthContext)
    const [specificationList, setSpecificationList] = useState(getSpecificationState);
    const [editStatus, setEditStatus] = useState({}); // Object to track edit status for each item

    const [showModal, setShowModal] = useState(false); // State to control modal visibility
    const [inputValues, setInputValues] = useState({}); // Object to track input values

    // Function to open/close the modal
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);

  
    const handleEditSpecification = (id) =>{
     
        setEditStatus((prev)=>{
            const isEditing = prev[id]; // Check current edit status
            if(isEditing){
                 // If currently editing, reset the status (Cancel action)
                return {...prev,[id]:false}
            }else{
                   // If not editing, set the status to true (Edit action)
                return { ...prev, [id]: true };
            }
        });// Set edit status for the specific item
        
    }

    const handleUpdateSpecification =async(id)=>{

        const getVal = inputValues[id];
        const data={
            specification: getVal,    
        }

        try {
            let response = await axios.patch(`${BASE_URL}/specification-update/${id}`,data,getConfig(accessToken));
            if(response.status===200){
                toast.success(response.data.message);
                handleEditSpecification(id);
                triggerSpecificationFun();
            }
         
            // setEditStatus(())
            console.log(response);
          

        } catch (error) {
            console.log(error)
            toast.error(error ?.response ?. message || error.message || 'Unknown error');
        }
    }

    const handleInputChange =(id,value)=>{
        setInputValues((prev)=>({...prev, [id]:value}));
    }

    const handleDeleteSpecification = async(id) =>{
        
        try {
            const response = await axios.delete(`${BASE_URL}/specification-delete/${id}`, getConfig(accessToken));
            toast.error(response.data.message)
            triggerSpecificationFun();
        } catch (error) {
         console.log(error);   
        }
    }

    const handleToggleSpecification = async(id,checked) =>{

        const spec = {
            id: id,
            status: checked ? 1 : 0, // Send the new status value to the server
        };
    

        setSpecificationList((prevList) =>
            prevList.map(el=>
                el.id === id ? {...el,specification_status: checked ? 1 : 0 } : el
            )
        );

        try {
            const response = await axios.post(`${BASE_URL}/specification-status`, spec ,getConfig(accessToken));
            console.log(response);
            toast.success(response.data.message);
        } catch (error) {
            
        }
         // Optionally, send an API request to update status in the database
    }

    const getProductSpecification =async() => {

        try {
            // let response = await axios.get(`${BASE_URL}/get-specifications`, getConfig(accessToken));
            setSpecificationList(getSpecificationState);
            
            
        } catch (error) {
            console.log(error);
        }

    }

    useEffect(()=>{
        getProductSpecification();
    },[getSpecificationState])

  return (
    <>
    
    
    <Table striped  bordered hover responsive="sm" size="sm" variant="dark">

        <thead>
            <tr>
            <th>#</th>
            <th>Name</th>
            <th>Status</th>
            <th>Add More   &nbsp; 
                <Button variant="primary" onClick={openModal} style={{ padding: '0px 3px' }}>
                    <i className="bi bi-plus text-light" style={{ fontWeight: 'bold' }}></i>
                </Button>
            </th>

            </tr>
        </thead>

        <tbody>
            {
                specificationList.map((item,indx)=>(
                    <tr key={indx}>
                        <td>{indx}</td>
                  
                        <td>
                            <Form.Control 
                                type="text"
                                placeholder="Enter Specification"
                                value={editStatus[item.id] ? (inputValues[item.id] || item.specification_name) : item.specification_name} // Use local state or the original value
                                autoFocus
                                disabled  ={!editStatus[item.id]} // Enable input if editStatus is true for that item
                                onChange={(e)=>handleInputChange(item.id, e.target.value)}
                            />
            
                        </td>
                    
                        <td>   
                        
                            <Form.Check // prettier-ignore
                                type="switch"
                                id={item.id}
                                label={ item.specification_status == 1 ?  "ON" : "OFF"}
                                checked={item.specification_status === 1}
                                // onChange={(e)=>{setToggleSpecification(!toggleSpecification)}}
                                onChange={(e)=>handleToggleSpecification(item.id, e.target.checked)}
                            />
                        </td>
            
                        <td>
                            <ButtonGroup aria-label="Basic example" size="sm">
                                {
                                    editStatus[item.id] ? (
                                        <>
                                        <Button variant="success" onClick={()=>handleUpdateSpecification(item.id)}>Save</Button>
                                        <Button variant="light" onClick={()=>handleEditSpecification(item.id)}>Cancel</Button> 
                                        </>
                                    ) :(
                                        <>
                                        
                                        <Button variant="warning" onClick={()=>handleEditSpecification(item.id)}>Edit</Button>
                                        <Button variant="danger" onClick={()=>handleDeleteSpecification(item.id)}>Delete</Button>
                                        </>   
                                        
                                    )
                                }
                                        
                            </ButtonGroup>
                        </td>

                    </tr>
                ))
            }

        </tbody>

    </Table>

  {/* Render the SpecificationModal and pass the show and close handler */}
  <SpecificationModal show={showModal} handleClose={closeModal} triggerSpecificationFun={triggerSpecificationFun}/>
    
    </>
   
  )
}

export default SpecificationList