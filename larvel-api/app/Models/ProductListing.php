<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductListing extends Model
{
   
    protected  $tablle ='product_listings';
    
    protected $fillable =[
        'product_code',
        'product_name',
        'plslug_name',
        'product_brand_name',
        'product_model',
        'cate_Map_id',
        'product_status',
        'product_desciption',
    ];


    public function product_sub_categories(){
        return $this->belongsToMany(ProductSubCategory::class, 'product_category_pivot','product_id', 'sub_category_id');
    }

    // Relationship with the pivot table for specifications
    public function specifications(){
        return $this->belongsToMany(Specification::class,'product_specification_pivot','product_id','spec_id')
                    ->withPivot('specification_value');
    }

    public function product_images(){
        return $this->hasMany(ProductImage::class,'product_listing_id','id');
    }

    public function product_brands(){
        return $this->hasOne(ProductBrand::class,'id','product_brands');
    }
}
