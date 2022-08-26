<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';
    public $timestamps = false;
    protected $fillable = ['name', 'price', 'description', 'image_url', 'discounts', 'reserved'];

    public function subcategory()
    {
        return $this->belongsTo(
            Subcategory::class,
            'subcategory_id',
            'id'
        );
    }

}
