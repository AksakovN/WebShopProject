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
    public function index(Request $req)
    {
        return Product::paginate($req->limit);
    }

    public function getProduct(Request $req) 
    {
        return Product::find($req->id);
    }

    public function getByCategory(Request $req) 
    {
        return  Product::where('subcategory_id', $req->id)->paginate($req->limit);
        
    }

    public function forMain() 
    {
        return Product::where('forMain', 0)->inRandomOrder()->limit(6)->get();
        
    }

    public function searchProducts(Request $req){
        $result = Product::where('name', 'like', '%'. $req->text. '%')->paginate($req->limit);
        if(count($result)){
            return Response()->json($result);
           }
           else
           {
           return response()->json(['Result' => '404'], 404);
         }
       }
}
