<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $table = 'product_images';

    protected $fillable =[
       'product_listing_id',
       'image_path',
       'status'
    ];
}
