<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProductSpecification extends Model
{
    
    protected $table='specifications';
    protected $fillable =[
        'attributes_name',
        'attributes_status'
    ];

    
}
