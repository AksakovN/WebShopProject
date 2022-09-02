<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Api_users extends Model
{
    use \Backpack\CRUD\app\Models\Traits\CrudTrait;
    use HasApiTokens, HasFactory;

    protected $table = 'api_users';
    public $timestamps = false;
    protected $fillable = ['login', 'email', 'password', 'phone_number', 'fav_id', 'reserved'];
}
