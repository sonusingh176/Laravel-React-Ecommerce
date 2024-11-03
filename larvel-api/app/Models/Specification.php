<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Specification extends Model
{
    protected $table='specifications';
    protected $fillable =[
        'specification_name',
        'specification_status'
    ];


    public function products()
{
    return $this->belongsToMany(ProductListing::class, 'product_specification_pivot', 'spec_id', 'product_id')
                ->withPivot('specification_value');
}
    // Relationship with the pivot table for products
}
