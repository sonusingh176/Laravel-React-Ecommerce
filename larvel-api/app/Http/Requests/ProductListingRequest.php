<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ProductListingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        //these keys received from frontend request.
        return [   
            'productCode'  =>'required',
            'productName'  =>'required',
            'productBrand'  =>'required',
            'productModelNo' =>'required',
            'productImage' => 'required|mimes:jpeg,png,jpg,gif|max:2048'
            ];
    }
}
