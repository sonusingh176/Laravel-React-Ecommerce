import axios from 'axios';
import Select from 'react-select';
import { useContext, useState, useEffect } from 'react';
import { Container, Card, Tabs, Tab, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { BASE_URL, getConfig } from '../helper/config';
import { AuthContext } from '../context/authContext';
import SpecificationModal from './SpecificationModal';
import ProductImages from './ProductImages';
import { toast } from 'react-toastify';
import SpecificationList from './SpecificationList';



const ErrorMessage =({error})=>{
  return error ? <span style={{ color: "red" }}>{error}</span> : null;
}

const ProductForm = ({triggerSubAndProductListFunction,getSubAndProductData,getSpecification,triggerSpecificationFun,getSpecificationState}) => {

     // Define state for each form field
     const initialFormState ={
      productCategory: '',
      productCode: '',
      productName: '',
      productBrand:'',
      productModelNo:'',
      productImage:null,
      attributes: []
    }
    
  const [formData, setFormData] = useState(initialFormState);
  
  const { accessToken } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  const [fetchSubCategory, setFetchSubCategory] = useState();
 
  const [selectedOption, setSelectedOption] = useState(null);
  const [fetchSpecification, setFetchSpecification] = useState(getSpecificationState);
  const [selectSpecification, setSelectSpecification] = useState([]);
  const [generatedInputs, setGeneratedInputs] = useState([]); // State to store generated input fields
  const [key, setKey] = useState('addproduct');
  const [validationErrors, setValidationErrors] = useState({});

  // Function to open/close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const gettingSubCategory = () => {
  
    try {
      setFetchSubCategory(getSubAndProductData.map((item) => ({ label: item.sub_cname, value: item.id }))); // Format data for react-select
    } catch (error) {
      toast.error('Failed to fetch sub-categories.');
      console.error(error);
    }
  };

 

  // Handling change in Specifications
  const handleSpecificationsChange = (options) => {
    setSelectSpecification(options);
  };

  const generateTable = () => {
    const newCreatedField = [];
    const duplicateInputField = []; // To hold any duplicates found

    // Create input fields based on the selected specifications
    selectSpecification.forEach((spec) => {
      const filterInputs = generatedInputs.filter((el) => el.label === spec.label);

      if (filterInputs.length > 0) {
        duplicateInputField.push(spec.label);
      } else {
        newCreatedField.push({ label: spec.label, value: spec.value });
      
      }

    });

    if (duplicateInputField.length > 0) {
      duplicateInputField.forEach((e) => toast.error(`${e} is already added`));
    } else {
      const allGeneratedFields = [...generatedInputs, ...newCreatedField];
      setGeneratedInputs(allGeneratedFields);
    }

  };

  const handleDeleteSpecification = (index) => {
    //this will delete generated fields
    const values = [...generatedInputs];
    values.splice(index, 1);
    setGeneratedInputs(values);

 // After generating a field, if the user enters data in the fields, it will be added to the attributes array of formData as an object. // Later, if the user wants to delete a field, the code below will remove the corresponding object from the attributes array in formData.
   const delAttributes = [...(formData.attributes || [] )];
 
   delAttributes.splice(index, 1);
    setFormData((prev) => ({
      ...prev,
      attributes: delAttributes,
    }));
  };

  const handleInputChange =(e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleAttributeChange= (e) => {
    const {id,name,value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      attributes :[
          // Ensure attributes array exists, filter out any existing attribute with the same ID
          ...(prevState.attributes || []).filter((attr) =>attr.id !== id),
           // Add or update the new attribute
          {id,values:value},
      ] 
    }));

    // setSpecificationValue({
    //   ...specificationValue,
    //   [name]: value, // Update value for the specific label (name)
    // });
  }

  const handleCategoryChange =(option)=>{
     
    setSelectedOption(option)
    setFormData({...formData, productCategory: String(option.value)})

  }

  const handleImageUpload =(imageFile) =>{
    setFormData({...formData, productImage: imageFile})
  }

  const validateForm = () =>{
    const errors={};

    /**
     * formData.productName : retrieves the value of the productName field from the formData object.
     *                       If the user hasn't entered anything, it will be an empty string ("").
     *  The .trim() method removes any whitespace from both ends of the string. So, if the user only enters spaces in the input field, .trim() will convert it into an empty string.
     * 
     * ! (Negation):
     * The ! operator negates the result.
     * If .trim() returns an empty string (""), it is considered a falsy value in JavaScript, and !"" will be true.
     * If .trim() returns any non-empty string, ! will be false. The ! operator negates the result.
     */
    if(!formData.productName.trim()){
      errors.productName="Name is required";
    }

    if (!formData.productCode.trim()) {
      errors.productCode = "Product ID is required";
    }

    if (!formData.productCategory.trim()) {
      errors.productCategory = "Select Category";
    }

    if (!formData.productModelNo.trim()) {
      errors.productModelNo = "Model is required";
    }

    if (!formData. productBrand.trim()) {
      errors. productBrand = "Brand is required";
    }

    if(formData.attributes.length ===0){
      errors.attributes ="Select atleast one Specification"
    }
   
   


    return errors;
  }


  const getSpecificationData =  () => {
    try {
      // const response = await axios.get(`${BASE_URL}/get-specifications`, getConfig(accessToken));
      setFetchSpecification(getSpecificationState.map((item) => ({ label: item.specification_name, value: item.id }))); // Format data for react-select
    } catch (error) {
      toast.error('Failed to fetch specifications.');
      console.error(error);
    }
  };

  const handleSubmit =async(e)=>{
     e.preventDefault();

    const errors =validateForm();
    if(Object.keys(errors).length>0){
      setValidationErrors(errors);
    }else{

      const SubmitedformData = new FormData();
   
        Object.keys(formData).forEach(key=>{
         
          if(key !== 'attributes'){
            if (key === 'productImage') {
              SubmitedformData.append(key, formData[key]); // Append the file
            } else {
              SubmitedformData.append(key, formData[key]);
            }
          }
        });

        SubmitedformData.append('attributes', JSON.stringify(formData.attributes));

      //  console.log("Form submitted successfully:", SubmitedformData);


      // Reset form and errors after successful submission
      // setFormData(initialFormState);
      // setValidationErrors({});
      // setGeneratedInputs([]);
      // // setSelectSpecification([]);
      // setSelectedOption(null)

      try {
        const response = await axios.post(`${BASE_URL}/save-productList`,SubmitedformData, getConfig(accessToken,true));
        triggerSubAndProductListFunction();
       
      } catch (error) {
        console.log(error);
      }
    }

  
  }

  useEffect(() => {
    gettingSubCategory();
    getSpecificationData();
  }, [getSubAndProductData,getSpecificationState]);


  return (
    <Container>
      <Card style={{backgroundColor:'white'}} >
        <Card.Header  style={{backgroundColor:'white'}}>
          <Tabs
            id="controlled-tab-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            className="mb-3"
          >

            {/* Product Listing Form */}

            <Tab eventKey="addproduct" title="ADD PRODUCT">
              <Form onSubmit={handleSubmit}>

                {/* Product Basic Details */}

                <Row className="mb-3">

                  <Col md={4}>
                    <Form.Group controlId="InputCategory">
                      <Form.Label>Product Category</Form.Label>
                      <Select
                        options={fetchSubCategory}
                        value={selectedOption}
                        onChange={handleCategoryChange}
                        isClearable
                      />


                      {/* {validationErrors.productCategory && (
                        <span style={{ color: "red" }}>{validationErrors.productCategory}</span>
                      )} */}

                      <ErrorMessage error={validationErrors.productCategory}/>

                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="productCode">
                      <Form.Label>Product Code</Form.Label>
                      <Form.Control
                          type="text"
                          name='productCode' 
                          value={formData.productCode}                       
                          onChange={handleInputChange}
                          placeholder='Enter Product ID'
                           />
                            {/* {validationErrors.productCode && (
                              <span style={{ color: "red" }}>{validationErrors.productCode}</span>
                            )} */}

                            
                      <ErrorMessage error={validationErrors.productCode}/>
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="ProductName">
                      <Form.Label>Product Name</Form.Label>
                      <Form.Control type="text"
                      name='productName'
                      value={formData.productName}
                      onChange={handleInputChange}
                      placeholder='Enter Product Name'
                       />

                      <ErrorMessage error={validationErrors.productName}/>
                      <br />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="ProductBrand">
                      <Form.Label>
                        Product Brand Name{' '}
                        <Button variant="success" size="sm">
                          <i className="bi bi-plus text-light" style={{ fontWeight: 'bold' }}></i>
                        </Button>
                      </Form.Label>
                      <Form.Control type="text"
                          name="productBrand"
                          value={formData.productBrand}
                          onChange={handleInputChange}
                          placeholder='Enter Brand'
                        />

                        <ErrorMessage error={validationErrors.productBrand}/>
                
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="ModelNumber">
                      <Form.Label>Model Number</Form.Label>
                      <Form.Control 
                          type="text"
                          name="productModelNo"
                          value={formData.productModelNo}
                          onChange={handleInputChange}
                          placeholder="Enter Model No"
                          />
                    
                          <ErrorMessage error={validationErrors.productModelNo}/>
                
                    </Form.Group>
                  </Col>


                </Row>

                {/* Product Specification  */}
                <Card className="mb-3">

                  <Card.Header>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="d-flex align-items-center">
                        <p className="fw-bold mx-2 mb-0">ADD SPECIFICATION</p>
                        <Button variant="primary" onClick={openModal} style={{ padding: '0px 3px' }}>
                          <i className="bi bi-plus text-light" style={{ fontWeight: 'bold' }}></i>
                        </Button>
                      </div>
                      <Button variant="primary" size="sm" onClick={generateTable}>
                        + Generate Table
                      </Button>
                    </div>
                  </Card.Header>

                  <Card.Body>

                    <div className="specificationGeneratedTable mb-3">
                      {generatedInputs.map((spec, index) => (
                        <InputGroup key={`${spec.label}-${spec.value}`} className="my-3">
                          <InputGroup.Text style={{ width: '30%' }}>{spec.label}</InputGroup.Text>
                          <Form.Control
                            required
                            type="text"
                            id={spec.value}
                            name={spec.label}
                            // value={specificationValue[spec.label] || ''}
                            placeholder={`Enter ${spec.label}`}
                            aria-label={spec.label}
                            onChange={handleAttributeChange}
                          />
                          <Button variant="danger" onClick={() => handleDeleteSpecification(index)}>
                            x
                          </Button>
                        </InputGroup>
                      ))}
                    </div>

                    <Select
                      options={fetchSpecification}
                      onChange={handleSpecificationsChange}
                      isMulti
                      
                    />

                    <ErrorMessage error={validationErrors.attributes}/>

                  </Card.Body>

                </Card>

                {/* Product Image */}
                <Card className="mb-3">
                  <Card.Header>
                    <p className="fw-bold mb-0">ADD IMAGES</p>
                  </Card.Header>
                  <Card.Body>
                     {/*  passing handleImageUpload and image state */}
                    <ProductImages onImageUpload={handleImageUpload} imagestate={formData.productImage}/>
                  </Card.Body>
                </Card>

                {/* Submit & Clear */}

                <div className="text-center">
                  <Button variant="danger" className="mx-2">
                    Clear
                  </Button>
                  <Button variant="success" type="submit" className="mx-2">
                    Submit
                  </Button>
                </div>

              </Form>
            </Tab>


            {/* Specification List */}

            <Tab eventKey="specification" title="SPECIFICATION">
              <SpecificationList getSpecificationState={getSpecificationState} triggerSpecificationFun={triggerSpecificationFun} />
            </Tab>

            {/* Brand List */}

            <Tab eventKey="brand" title="BRAND LIST">
              <p>Brand List Content...</p>
            </Tab>


          </Tabs>
        </Card.Header>

        {/* Render the SpecificationModal and pass the show and close handler */}
        <SpecificationModal show={showModal} handleClose={closeModal} triggerSpecificationFun={triggerSpecificationFun} />

      </Card>
    </Container>
  );
};

export default ProductForm;
