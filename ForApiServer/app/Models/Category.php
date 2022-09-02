<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasFactory;

    protected $table = 'categories';
    public $timestamps = false;
    protected $fillable = ['name', 'reserved',];

    public function subcategories()
    {
        return $this->hasMany(
            Subcategory::class,
            'category_id',
            'id'
        );
    }
}
