<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Requests\ProductListing as RequestsProductListing;
use App\Http\Requests\ProductListingRequest;
use App\Http\Requests\ProductSuperCategoryRequest;
use App\Models\ProductImage;
use App\Models\ProductListing;
use App\Models\ProductMainCategory;
use App\Models\ProductSpecification;
use App\Models\ProductSubCategory;
use App\Models\ProductSuperCategory;
use App\Models\Specification;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
   
    public function saveMainCategory(ProductCategoryRequest $request){

        if($request->main_category){
            $mainCategories = $request->main_category;
            $mainImages = $request->hasFile('item_images') ? $request->file('item_images'): [];

            
            foreach($mainCategories as $item=>$category){
         
                $imagePath = null;
                // Check if an image exists for the current category
            
                if(isset($mainImages[$item]) && $mainImages[$item] !== null ){
                    $image = $mainImages[$item]; // Get the corresponding image file
                    $originalFileName = $image->getClientOriginalName(); // Get the original file name
                    $path='upload_images/mainPoster';
                    $image->move($path, $originalFileName); // Move the file to the specified path
                    $imagePath = $path . '/' . $originalFileName;
                }           
               
               $savemain = ProductMainCategory::create([
                    'main_cname'=>$category,
                    'main_cslug_name'=>Str::slug($category),
                    'main_image'=> $imagePath,
                    'main_image_xp'=>null,
                    'main_cstatus'=>1                   
                ]);
    
            }

        }

        return response()->json([
            'message' =>'Saved Main Category successfully',
        ]);
   
    }

    public function getMainCategory(Request $request){
        $getdata=ProductMainCategory::all();
       
        return response()->json([
            'data' => $getdata,
        ]);
    }

    public function saveSuperCategory(ProductSuperCategoryRequest $request){

        if($request->super_category){
            $superCategories = $request->super_category;
            $superImages = $request->hasFile('item_images') ? $request->file('item_images') : [];

            foreach($superCategories as $item=>$category){
         
                $imagePath=null;
                // Check if an image exists for the current category
                if(isset($superImages[$item]) && $superImages[$item] !==null){
                 $image = $superImages[$item]; // Get the corresponding image file
                 $originalFileName = $image->getClientOriginalName(); // Get the original file name
                 $path='upload_images/mainPoster';
                 $image->move($path, $originalFileName); // Move the file to the specified path
                 $imagePath = $path . '/' . $originalFileName;
                }
               
                 ProductSuperCategory::create([
                     'main_category_id' =>$request->main_category_id,
                     'sup_cname'=>$category,
                     'sup_cslug_name'=>Str::slug($category),
                     'sup_image'=> $imagePath,
                     'sup_cstatus'=>1,
                     // 'product_description'=>'',
                      
                  ]);
                 }
     
          
                 return response()->json([
                 'message' =>'Saved Super Category successfully',
                 'data' =>$request->all(),
             ]);
            
        }
      
     

     
    }

    public function getSuperCategory(Request $request){

        $getdata = ProductSuperCategory::all();

        return response()->json([
            'data' => $getdata,
        ]);
    }

    public function DeleteSuperCategory($id){
        if($id){
            $superCategory = ProductSuperCategory::find($id);

            if($superCategory){
                 $superCategory->delete();

                return response()->json([
                    'data' => $superCategory,
                ]);
            }



        }
    }

    public function subcategory(Request $request){

        $request->validate([
            'sub_category.*' =>'required', //this line checks sub_category which is array should not be empty.
            'super_category_id'=>'required'
        ],[
            'super_category_id.required' => 'Please select a category.',
            'sub_category.required' => 'Field is required.',
        ]);

        if($request->sub_category){

            $subCategories = $request->sub_category;
            $subImages = $request->hasFile('item_images') ? $request->file('item_images') : [];
            $SuprCategoriesId = $request->super_category_id;

            foreach($subCategories as $item=>$category){
                $imagePath = null;

                // Check if an image exists for the current category
                if(isset($subImages[$item]) && $subImages[$item] !== null){
                    $image = $subImages[$item]; // Get the corresponding image file
                    $originalFileName = $image->getClientOriginalName(); // Get the original file name
                    $path='upload_images/mainPoster';
                    $image->move($path, $originalFileName); // Move the file to the specified path
                    $imagePath = $path . '/' . $originalFileName;
                }    
                
                $savesubcategory=ProductSubCategory::create([
                        'sub_cname'=>$category,
                        'sub_cslug_name'=>Str::slug($category),
                        'sub_image'=> $imagePath,
                        'sub_cstatus'=>1,                  
                ]);
    
                if($savesubcategory){
                    $subId=$savesubcategory->id;
                    $productCat= ProductSubCategory::find($subId);
                    if($productCat){
                        $productCat->product_super_categories()->sync($SuprCategoriesId);
                    } 
                }
            } 
        }
     
        return response()->json([
            'message' =>'Category Added',
        ]);

    }

    public function getSubCategory(Request $request){
        $getdata=ProductSubCategory::all();

        return response()->json([
            'data' => $getdata,
        ]);
    }

    public function saveSpecification(Request $request){

        $validated = $request->validate([
            'name' => 'required'
        ]);

        if($validated){
            $spf_name = $request->name;

            // Check if the specification already exists
            $existingSpecification =Specification::where('specification_name',$spf_name)->first();

            if( $existingSpecification ){
                return response()->json([
                    'message' => 'Specification already exists'
                ], 400);
            }

            $newSpecification = Specification::create([
                'specification_name' =>  $spf_name,
            ]);
        }

        return response()->json([
            'data' =>$newSpecification,
            'message'=>'Specification added successfully'
        ]);
    }

    public function getSpecifications(){
        $getSpcf= Specification::all();

        return response()->json([
            'data' =>$getSpcf,
        ]);
    }

    public function SpecificationStatus(Request $request){

        $validated = $request->validate([
            'id' => 'required'
        ]);

        $specId='';
        $getSpec='';
        if($validated){
            $specId = $request->id;
             $getSpec=Specification::find($specId);
            if($getSpec){
                //Updating A Retrieved Model,  In  documentation this is mentioned in the
               $getSpec->specification_status = $request->status;
               $getSpec->save();
            }

        
        }

        return response()->json([
            'message' =>'status Changed',
        ]);

    }

    public function DeleteSpecification(Request $request){
        if($request->id){
                    $record = Specification::find($request->id);
                    if($record){
                        $record->delete();
                    }
                }

                return response()->json([
                    'message' => $record->specification_name.'Deleted',
                ]);
    }

    public function UpdateSpecification(Request $request,$id){
         $validated =$request->validate([
            'specification' =>'required',
       ]);

       if($validated){

            $findData = Specification::find($id);

            if($findData){
                $findData->specification_name= $request->specification;
                $findData->save();
            }
              
            return response()->json([
                'message' =>'specification Updated',
            ]);

       }

    }

    public function getMainSuperData(){

       $getMain = ProductMainCategory::with('product_super_categories')->where('main_cstatus',true)->get();
       return response()->json([
            'data' =>$getMain,
       ]);
    }


    public function getSuperSubData(){
        $getdata= ProductSuperCategory::with('product_sub_categories')->where('sup_cstatus',true)->get();

        return response()->json([
            'data'=>$getdata,
        ]);
    }

    public function saveProductList(ProductListingRequest $request){

      
      
        $saveProdlist = ProductListing::create([
            'product_code' =>$request->productCode,
            'product_name' =>$request->productName,
            'plslug_name'  =>Str::slug($request->productName),
            'brand_id'  =>$request->productBrand,     
            'product_model' =>$request->productModelNo,          
            // 'product_desciption'=>$request->productID,
        ]);

        if ($saveProdlist) {
             $saveProdlist->product_sub_categories()->sync($request->productCategory);
        }

        //productImage
        if($saveProdlist){
        
            //checks if a file input field named 'productImage' exists in the HTTP request.
            //and then Retrieve the uploaded file from the request using the file method
            $prodImg = $request->hasFile('productImage') ? $request->file('productImage') : [];

            if($prodImg){
                $originalFileName = $prodImg->getClientOriginalName();
                $path ='upload_images/productImage';
        
                $saveImage = ProductImage::create([
                        'product_listing_id' =>$saveProdlist->id,
                        'image_path'=>$path.'/' . $originalFileName,
                    ]);

                if($saveImage){
                    $prodImg->move($path,$originalFileName);
                }
        
            }       

        }
  
        if ($request->has('attributes')) {
            $attributes = json_decode($request->input('attributes'), true);
            // $responseData = [];
        
            foreach ($attributes  as $attr) {
                // Access id and values correctly
                $id = $attr['id'];
                $value = $attr['values'];
        
               $saveProdlist->specifications()->attach($id, [
                     'specification_value' => $value // Only include the specification value
                 ]);
            }
        
        }
        
    }

    public function DeleteProductList(Request $request,$id){

        if($id){

            $findPro = ProductListing::find($id);
            if($findPro){
                $findPro->delete();

                return response()->json([
                    'message' =>'Delete' . ' '.$findPro->product_name
                ]);
            }

        }

    }

    public function DeleteMainCategory(Request $request){

        if($request->id){
            $mainCategory  = ProductMainCategory::find(($request->id));
            if($mainCategory ){
                $mainCategory->product_super_categories()->each(function($superCategory){

                // Get all subcategories associated with this super category
                $subCategories = $superCategory->product_sub_categories;

                // Delete each subcategory & related products_list
                foreach ($subCategories as $subCategory) {
                    $subCategory->product_listings()->delete(); // Delete the actual subcategory
                    $subCategory->delete();
                }

                // Delete the super category itself
                $superCategory->delete();

                });
                $mainCategory ->delete();
            }
        }

        return response()->json([
            'data' => $mainCategory->main_cname.'Category Delete',
        ]);

    }

    
    public function DeleteSubCategory(Request $request,$id){
        
        if($id){
            // Find the subcategory record
            $subCategory = ProductSubCategory::find($id);

            if ($subCategory) {
                // Detach the association with ProductSuperCategory
                $subCategory->product_super_categories()->detach();
                $subCategory->product_listings()->detach();
                // Delete the subcategory itself
                $subCategory->delete();
                
                return response()->json([
                    'message' => 'Sub Category and Associations Deleted Successfully',
                ]);
            }

            return response()->json([
                'message' => 'Sub Category Not Found',
            ], 404);

        }
   
    }

    /**
     * $mainCategory ek instance hai ProductMainCategory model ka.
     * product_super_categories() ek Eloquent relationship method hai, jo ProductMainCategory aur ProductSuperCategory ke beech ke relationship
     * ko define karta hai. Yeh method un supercategories ko return karta hai jo is main category ke saath judi hui hain.
     * 
     * 
     * each method ek loop ki tarah kaam karta hai, jo har supercategory ko $superCategory variable mein store karta hai, aur aap uske andar jo bhi code likhenge, woh har supercategory ke liye chalega.
     * 
     */

    public function getSubAndProductListData(){
        $getSubCategory= ProductSubCategory::with('product_listings')->where('sub_cstatus',true)->get();

        return response()->json([
            'data'=>$getSubCategory
        ]);
    }
}
