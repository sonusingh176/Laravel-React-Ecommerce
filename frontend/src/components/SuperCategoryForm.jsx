import axios from 'axios';
import  { useContext, useEffect, useState } from 'react';
import { BASE_URL, getConfig } from '../helper/config';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';

const MainCategoryForm = () => {
  const { accessToken } = useContext(AuthContext);
  const [maincategories, setMainCategories] = useState([{name: '' ,image:null }]);
  const [fetchMainCategory,setFetchMainCategory] = useState([]);
  const [selectedCategory, setSelectedCategory]=useState('');

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

    // Handle main category dropdown change
    const handleSelectChange = (event) => {
      setSelectedCategory(event.target.value);
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

      console.log(category);
      formData.append('super_category[]',  category.name );
    
      if (category.image) {
        formData.append('item_images[]', category.image);  // Directly appending the image
      }
    });

    formData.append('main_category_id', selectedCategory);
    


    try {
      const response = await axios.post(`${BASE_URL}/save-super-category`, formData, getConfig(accessToken,true));
      toast.success(response.data.message)
      // console.log('Response:', response.data);
    } catch (error) {
      toast.error(error.response?.data || error.message);
    }
    
  };

  //Fetch Main Category
  const gettingMainCategory = async()=>{
    try {
        //axios.get() returns a promise
        const response= await axios.get(`${BASE_URL}/get-main-category`, getConfig(accessToken));
       
        setFetchMainCategory(response.data.data);

    } catch (error) {
        console.log('Error:', error);
    }
  
  }

  useEffect(()=>{
    gettingMainCategory();
  },[]);

  return (
    <div className="container">

        <div className="card">
            <div className="card-header">
            <h6>ADD MAIN CATEGORY</h6>
            </div>

            <form onSubmit={handleSubmit}>

                <div className="row">

                    <div className="col-4">  
                      <select className="form-select" aria-label="Default select example" value={selectedCategory} onChange={handleSelectChange}>
                        <option>select Main Category</option>
                        {
                          fetchMainCategory.map((item)=>(
                            <option key={item.id} value={item.id} id={item.id}>{item.main_cname}</option>
                          ))
                        }
                       
                        
                      </select>                       
                   </div>

                    <div className="col-12">

                        {maincategories.map((category, index) => (
                    <div key={index} className="category-field m-2">
                        <div className='row'>
                        <div className="col"> 
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Enter Super Category..."
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
                    </div>

                </div>
               
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
