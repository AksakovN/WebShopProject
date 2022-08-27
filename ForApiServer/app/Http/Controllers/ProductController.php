<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Product::all();
    }

    public function getProduct(Request $req) 
    {
        $prod = Product::find($req->id);
        return $prod;
    }

    public function getByCategory(Request $req) 
    {
        $prod = Product::where('subcategory_id', $req->id)->get();
        return $prod;
    }
}
