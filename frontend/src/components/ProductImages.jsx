import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';

import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { useRef, useState } from 'react';

function ProductImages({ onImageUpload }) {

  // State to store the selected image file
  const [avatarURL, setAvatarURL] = useState(null);

  // Create a ref for the file input element
  const fileUploadRef =useRef(null);

  // Function to trigger the file input click
  const handleFileInputClick = () => {
    fileUploadRef.current.click();
  };

  const handleImageChange =() => {
    const uploadedFile = fileUploadRef.current.files[0];
    const cachedURL = URL.createObjectURL(uploadedFile);

    setAvatarURL(cachedURL);
    onImageUpload(cachedURL);
  };

   // Clear the selected image
   const handleRemoveImage = () => {
    setAvatarURL(null);
  };

  return (
    <Container>
      <Row>
        <Col xs={6} md={4}>
          <Card className='mb-3' style={{width:'8rem'}}>
            <Card.Img variant="top"  src={avatarURL} className='m-auto' style={{width: '7rem', height:'9rem'}}/>
            <i className="bi bi-x-square fs-3 position-absolute top-0 end-0 text-muted del1" onClick={handleRemoveImage}></i>
            <Card.Body>
            <Button variant="primary" onClick={handleFileInputClick}>Select</Button>
            <Form.Control type="file" id="item_images"  ref={fileUploadRef} onChange={handleImageChange} hidden />
              
            </Card.Body>

          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductImages;


