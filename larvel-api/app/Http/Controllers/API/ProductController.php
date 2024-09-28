<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProductCategoryRequest;
use App\Http\Requests\ProductSuperCategoryRequest;
use App\Models\ProductMainCategory;
use App\Models\ProductSubCategory;
use App\Models\ProductSuperCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Js;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class ProductController extends Controller
{
   
    public function saveMainCategory(ProductCategoryRequest $request){


        $mainCategories = $request->main_category;
        $mainImages = $request->hasFile('item_images') ? $request->file('item_images') : [];

        foreach($mainCategories as $item=>$category){
         
           // Check if an image exists for the current category
           if(isset($mainImages[$item])){
            $image = $mainImages[$item]; // Get the corresponding image file
            $originalFileName = $image->getClientOriginalName(); // Get the original file name
            $path='upload_images/mainPoster';
            $image->move($path, $originalFileName); // Move the file to the specified path
           }
          
            ProductMainCategory::create([
                'main_cname'=>$category,
                'main_cslug_name'=>Str::slug($category),
                'main_image'=> $path . '/' . $originalFileName,
                'main_image_xp'=>null,
                'main_cstatus'=>1
                 
             ]);

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


        $superCategories = $request->super_category;
       $superImages = $request->hasFile('item_images') ? $request->file('item_images') : [];

        foreach($superCategories as $item=>$category){
         
           // Check if an image exists for the current category
           if(isset($superImages[$item])){
            $image = $superImages[$item]; // Get the corresponding image file
            $originalFileName = $image->getClientOriginalName(); // Get the original file name
            $path='upload_images/mainPoster';
            $image->move($path, $originalFileName); // Move the file to the specified path
           }
          
            ProductSuperCategory::create([
                'main_category_id' =>$request->main_category_id,
                'sup_cname'=>$category,
                'sup_cslug_name'=>Str::slug($category),
                'sup_image'=> $path . '/' . $originalFileName,
                'sup_cstatus'=>1,
                // 'product_description'=>'',
                 
             ]);
            }

        return response()->json([
            'message' =>'Saved Super Category successfully',
            'data' =>$request->all(),
        ]);
    }

    public function getSuperCategory(Request $request){

        $getdata = ProductSuperCategory::all();

        return response()->json([
            'data' => $getdata,
        ]);
    }

    public function subcategory(Request $request){

        $request->validate([
            'sub_category' =>'required',
            'super_category_id'=>'required'
        ]);

        $subCategories = $request->sub_category;
        $subImages = $request->hasFile('item_images') ? $request->file('item_images') : [];
        $SuprCategoriesId = $request->super_category_id;
     
        // return dd($SuprCategoriesId);
 
        foreach($subCategories as $item=>$category){

          
            // Check if an image exists for the current category
            if(isset($subImages[$item])){
             $image = $subImages[$item]; // Get the corresponding image file
             $originalFileName = $image->getClientOriginalName(); // Get the original file name
             $path='upload_images/mainPoster';
             $image->move($path, $originalFileName); // Move the file to the specified path
            }    
           
            $savesubcategory=ProductSubCategory::create([
                 'sub_cname'=>$category,
                 'sub_cslug_name'=>Str::slug($category),
                 'sub_image'=> $path . '/' . $originalFileName,
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

        return response()->json([
            'message' =>'add',
        ]);

    }
}
