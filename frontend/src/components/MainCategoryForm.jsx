import axios from 'axios';
import  { useContext, useState } from 'react';
import { BASE_URL, getConfig } from '../helper/config';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const MainCategoryForm = () => {
  const { accessToken } = useContext(AuthContext);
  const [maincategories, setMainCategories] = useState([{name: '' ,image:null }]);

  // Function to add new input field
  const addCategoryField  = () => {
    setMainCategories([...maincategories,  { name: "", image: null }]);
  };

    // Function to remove an input field
    const removeCategoryField  = (index) => {
      const values =[...maincategories];
      values.splice(index, 1);
      setMainCategories(values);
    };
  

  const handleInputChange = (index, event) => {
    const values = [...maincategories];

   if (event.target.name === "name") {
      values[index].name = event.target.value;
    } else if (event.target.name === "image") {
      console.log(event.target.files);
      values[index].image = event.target.files[0];
    }
    setMainCategories(values);
  };

  // Function to clear all inputs
  const handleClearInputs = () => {
    const clearedList = maincategories.map((input) => ({ name:'', image: null }));
    setMainCategories(clearedList);
  };


  // Function to save input data
  const handleSubmit  = async (e) => {
    e.preventDefault(); // Prevent page reload
    const formData = new FormData();
   
    maincategories.forEach(category => {

      
      formData.append('main_category[]',  category.name );
    
      if (category.image) {
        formData.append('item_images[]', category.image);  // Directly appending the image
      }
    });
    


    try {
      const response = await axios.post(`${BASE_URL}/save-main-category`, formData, getConfig(accessToken,true));
      toast.success(response.data.message)
      // console.log('Response:', response.data);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    
  };

  return (
    <div className="container">

<div className="card">
    <div className="card-header">
    <h6>ADD MAIN CATEGORY</h6>
    </div>

      <form onSubmit={handleSubmit}>
      
        {maincategories.map((category, index) => (
          <div key={index} className="category-field m-2">
            <div className='row'>
              <div className="col"> 
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Enter Main Category..."
                    value={category.name}
                    onChange={(event) => handleInputChange(index, event)}
                   
                />
            </div>
              <div className="col">
                  <div className="d-flex">
                  <input
                  type="file"
                  name="image"
                  className="form-control"
                  accept='image/*'
                  onChange={(event) => handleInputChange(index, event)}
                />

            {index !== 0 && (
              <button
                type="button"
                onClick={() => removeCategoryField(index)}
                className="btn btn-danger"
              >
                X
              </button>
            )}
                  </div>
         
              </div>

            </div>

       
          </div>
        ))}

        <button type="button" onClick={addCategoryField} className="btn btn-sm btn-primary">
          + Add Category
        </button>

        <div className="form-actions card-footer mt-3 ">
          <button type="reset" className="btn btn-warning m-1" onClick={handleClearInputs}>Clear</button>
          <button type="submit" className="btn btn-success">Save Main Category</button>
        </div>
      </form>
</div>
    </div>
  );
};

export default MainCategoryForm;
