import axios from 'axios';
import  { useContext, useEffect, useState } from 'react'
import { BASE_URL ,getConfig} from '../helper/config';
import { AuthContext } from '../context/authContext';
import { toast } from 'react-toastify';


const SubCategoryForm = ({getSuperSubCategory,setfetchSuperSubCategory,refreshCategories ,triggerSubAndProductListFunction}) => {
    const {accessToken}= useContext(AuthContext);

    const [subCategory,setSubCategory]=useState([{name: '' ,image:null }]);
    const [selectedCategory,setSelectedCategory]=useState('');

    const addCategoryField =()=>{
        setSubCategory([...subCategory,{name: '' ,image:null }])
    }

    const removeCategoryField=(index)=>{
       
        const values=[...subCategory]; //make a copy of subCategory
        values.splice(index,1)//remove one item from given index
        setSubCategory(values) //now set the updated array 
    }

    const handleInputChange = (index,event)=>{
        const values =[...subCategory];

        if(event.target.name === "name"){
            values[index].name = event.target.value;
        }else if(event.target.name === "image"){
            values[index].image = event.target.files[0];

        }

        setSubCategory(values);

     
    }

    // Handle super category dropdown change
    const handleSelectChange =(event) => {
        // console.log(event.target.value);
        
        setSelectedCategory(event.target.value);
    };
    
    const handleClearInputs =() => {
        const clearedList=subCategory.map((input)=>({ name:'', image: null }));
        setSubCategory(clearedList);
    };

    const handleSubmit =async(e)=>{

        // console.log(e);
        e.preventDefault();

        const formData = new FormData();

        subCategory.forEach(category => {
                formData.append('sub_category[]', category.name);

                if(category.image){
                    formData.append('item_images[]', category.image);
                }
        });

        formData.append('super_category_id', selectedCategory);

        try {
            const response = await axios.post(`${BASE_URL}/save-sub-category`, formData, getConfig(accessToken,true));
            toast.success(response.data.message)
            refreshCategories();      
            triggerSubAndProductListFunction();      
          } catch (error) {
           
           // toast.error(error.response?.data?.message ||error.status === 422 || error.message);
            toast.error(error.status === 422 ? 'Field is required' :'Unknown error');
          }
        

    }


  return (
    <div className="container">

    <div className="card">
        <div className="card-header">
        <h6>ADD SUB CATEGORY</h6>
        </div>

        <form onSubmit={handleSubmit}>


            <div className="row">

                <div className="col-4">  
                  <select className="form-select" aria-label="Default select example" value={selectedCategory} onChange={handleSelectChange}>
                    <option>select Super Category</option>
                    {
                      getSuperSubCategory.map((item)=>(
                        <option key={item.id} value={item.id} id={item.id}>{item.sup_cname}</option>
                      ))
                    }
                   
                    
                  </select>                       
               </div>

                <div className="col-12">

                    {subCategory.map((category, index) => (
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
            <button type="submit" className="btn btn-success">Save Sub Category</button>
            </div>

        </form>

    </div>

</div>
  )
}

export default SubCategoryForm