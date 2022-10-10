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
        if ($req->idSub == null) {
            $place = 'reserved';
            $id = $req->id;
        } else {
            $place = 'subcategory_id';
            $id = $req->idSub;
        }
        return response()->json([
            'prod' => Product::where($place, $id)->paginate($req->limit),
            'cat' => $req->id,
            'subCat' => $req->idSub
        ]);
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
    
       public function favouriteProducts(Request $req){
        $prodArray = [];
        foreach ($req->array as $value) {
            $result = Product::where('id', 'like', $value['id'])->get();
            $prodArray[] = $result; 
        }
            return Response()->json($prodArray);
    }
}
