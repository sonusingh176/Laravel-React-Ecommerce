<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSubCategory extends Model
{
   protected $table = 'product_sub_categories';
   protected $fillable =[
                            'id',
                            'sub_cname',
                            'sub_cslug_name',
                            'sub_cstatus',
                            'sub_image',                             
   ];

   public function product_super_categories(){
    return $this->belongsToMany(ProductSuperCategory::class,'super_sub_pivot','sub_category_id','super_category_id');
   }


}
