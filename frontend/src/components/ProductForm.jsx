import axios from 'axios';
import Select from 'react-select';
import { useContext, useState, useEffect } from 'react';
import { Container, Card, Tabs, Tab, Button, Form, InputGroup, Row, Col } from 'react-bootstrap';
import { BASE_URL, getConfig } from '../helper/config';
import { AuthContext } from '../context/authContext';
import SpecificationModal from './SpecificationModal';
import ProductImages from './ProductImages';
import { toast } from 'react-toastify';

const ProductForm = () => {
  const { accessToken } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [fetchSubCategory, setFetchSubCategory] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [fetchSpecification, setFetchSpecification] = useState([]);
  const [selectSpecification, setSelectSpecification] = useState([]);
  const [generatedInputs, setGeneratedInputs] = useState([]); // State to store generated input fields
  const [key, setKey] = useState('addproduct');

   // Define state for each form field
   const [formData, setFormData] = useState({
    productName: '',
    productID: '',
    productCategory: '',
    productModelNo:'',
    productImage:'null',
  });

  console.log(formData);
  // Function to open/close the modal
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const gettingSubCategory = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-sub-category`, getConfig(accessToken));
      setFetchSubCategory(response.data.data.map((item) => ({ label: item.sub_cname, value: item.id }))); // Format data for react-select
    } catch (error) {
      toast.error('Failed to fetch sub-categories.');
      console.error(error);
    }
  };

  const gettingSpecification = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/get-specifications`, getConfig(accessToken));
      setFetchSpecification(response.data.data.map((item) => ({ label: item.attributes_name, value: item.id }))); // Format data for react-select
    } catch (error) {
      toast.error('Failed to fetch specifications.');
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
    const values = [...generatedInputs];
    values.splice(index, 1);
    setGeneratedInputs(values);
  };

  const handleInputChange =(e) => {
    const {name,value} = e.target;
    setFormData({...formData,[name]: value});
  };

  const handleCategoryChange =(option)=>{

    setSelectedOption(option)
    setFormData({...formData, productCategory: option})

  }

  const handleImageUpload =(imageFile) =>{
    setFormData({...formData, productImage: imageFile})
  }

  useEffect(() => {
    gettingSubCategory();
    gettingSpecification();
  }, []);



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
            <Tab eventKey="addproduct" title="ADD PRODUCT">
              <Form>
                <Row className="mb-3">

                  <Col md={4}>
                    <Form.Group controlId="InputCategory">
                      <Form.Label>Product Category</Form.Label>
                      <Select
                        options={fetchSubCategory}
                        value={selectedOption}
                        onChange={handleCategoryChange}
                      />
                    </Form.Group>
                  </Col>

                  <Col md={4}>
                    <Form.Group controlId="ProductID">
                      <Form.Label>Product ID</Form.Label>
                      <Form.Control
                          type="text"
                          name='productID' 
                          value={formData.productID}                       
                          onChange={handleInputChange}
                          placeholder='Enter Product ID'
                           />
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
                      <Form.Control type="text" />
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
                    </Form.Group>
                  </Col>


                </Row>

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
                            placeholder={`Enter ${spec.label}`}
                            aria-label={spec.label}
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
                      closeMenuOnSelect
                    />

                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Header>
                    <p className="fw-bold mb-0">ADD IMAGES</p>
                  </Card.Header>
                  <Card.Body>
                    <ProductImages onImageUpload={handleImageUpload} />
                  </Card.Body>
                </Card>

                <Card className="mb-3">
                  <Card.Header>
                    <p className="fw-bold mb-0">ADD POSTER</p>
                  </Card.Header>
                  <Card.Body>
                    {/* Add Poster Component here if available */}
                  </Card.Body>
                </Card>

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

            <Tab eventKey="specification" title="SPECIFICATION">
              <p>Specification Content...</p>
            </Tab>

            <Tab eventKey="brand" title="BRAND LIST">
              <p>Brand List Content...</p>
            </Tab>

          </Tabs>
        </Card.Header>

        {/* Render the SpecificationModal and pass the show and close handler */}
        <SpecificationModal show={showModal} handleClose={closeModal} />
      </Card>
    </Container>
  );
};

export default ProductForm;
