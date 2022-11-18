<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\View;
use Prologue\Alerts\Facades\Alert;



class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $req)
    {
        // Alert::add('info', 'New order!');
       
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
            if (isset($req->prodId) == 1) {
                return Product::where($place, $id)->where('id', '!=', $req->prodId)->get();
            }
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

    public function searchProducts(Request $req)
    {
        $result = Product::where('name', 'like', '%' . $req->text . '%')->paginate($req->limit);
        if (count($result)) {
            return Response()->json($result);
        } else {
            return response()->json(['Result' => '404'], 404);
        }
    }

    public function favouriteProducts(Request $req)
    {
        $prodArray = [];
        foreach ($req->array as $value) {
            $result = Product::where('id', 'like', $value['id'])->get();
            $prodArray[] = $result;
        }
        return Response()->json($prodArray);
    }
}
