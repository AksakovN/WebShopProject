<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subcategory extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    protected $table = 'subcategories';
    public $timestamps = false;
    protected $fillable = ['name', 'category_id', 'reserved',];

    public function category()
    {
        return $this->belongsTo(
            Category::class,
            'category_id',
            'id'
        );
    }

    public function products()
    {
        return $this->hasMany(
            Product::class,
            'subcategory_id',
            'id'
        );
    }
}
