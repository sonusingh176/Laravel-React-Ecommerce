<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductMainCategory extends Model
{
    // use HasFactory;

    protected $table= 'product_main_categories';
    protected $fillable=[
        'main_cname',
        'main_cslug_name',
        'main_image',
        'main_image_xp',
        'main_cstatus'
         
    ];

    public function product_super_categories(){
        return $this->hasMany(ProductSuperCategory::class, 'main_category_id','id');
    }


}

/**
 * PHP provides access modifiers to control the access "properties" & "methods" inside a class.
 * There are three access modifiers: 1.)public, 2.)protected, 3.)protected
 * 
 *  public => the property or method can be accessed from everywhere. This is default
 *  protected=>  the property or method can be accessed within the class and by classes derived from that class. 
 *  protected=> the property or method can ONLY be accessed within the class
 */

 /**
  * In Laravel, $table is a property within an Eloquent model that specifies the name of the database table associated with that model.
  * In Laravel, $fillable is a property within an Eloquent model it tells which fields can be filled with data when saving to the database. 
  *
  */