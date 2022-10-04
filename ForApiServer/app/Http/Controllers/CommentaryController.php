<?php

namespace App\Http\Controllers;

use App\Models\Commentary;
use Illuminate\Http\Request;
use App\Models\Product;

class CommentaryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getCommentaries(Request $req)
    {
        $comment = Commentary::where('product_id', $req->id)->where('id', '!=', $req->Uid)->paginate($req->limit);
        $sortedComment = $comment->getCollection()->sortBy([fn ($a, $b) => $b['created_at'] <=> $a['created_at']]);
        $comment->setCollection($sortedComment);
        return response()->json([ 
           'comment' => $comment,
           'userComment' => Commentary::find($req->Uid),
        ]);
    }

    public function setCommentary(Request $req)
    {
        Commentary::create([
            'product_id' => $req->id,
            'user_login' => $req->login,
            'user_id' => $req->Uid,
            'body' => $req->body,
            'rating' => $req->rating,
        ]);
        $product = Product::find($req->id);
        $rating = $product->rating;
        $ratingEntries = $product->ratingEntries;
        $newRating = $rating * $ratingEntries + $req->rating;
        $newratingEntries = $ratingEntries + 1;
        $setNewRating = $newRating / $newratingEntries;
        Product::where('id', $req->id)->update([
            'rating' => $setNewRating,
            'ratingEntries' => $newratingEntries,
        ]);
    }

    public function changeCommentary(Request $req)
    {
        $comment = Commentary::find($req->id);
        $product = Product::find($comment->product_id);
        $rating = $product->rating;
        $ratingEntries = $product->ratingEntries;
        $newRating = ($rating * $ratingEntries - $comment->rating) + $req->rating;
        $setNewRating = $newRating / $ratingEntries;

        Commentary::where('id', $req->id)->update([
            'body' => $req->body,
            'rating' => $req->rating,
        ]);
        Product::where('id', $comment->product_id)->update([
            'rating' => $setNewRating,
            'ratingEntries' => $ratingEntries,
        ]);
    }

    public function changeLikes(Request $req)
    {
        if ($req->index == 'like') {
            Commentary::where('id', $req->id)->update([
                'likes' => $req->likeBody,
                'likedUsers' => $req->likeUsers,
            ]);
        } else {
            Commentary::where('id', $req->id)->update([
                'dislikes' => $req->dislikeBody,
                'dislikedUsers' => $req->dislikeUsers,
            ]);
        }
    }
}
