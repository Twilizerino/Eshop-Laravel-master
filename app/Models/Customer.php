<?php

namespace App\Models

use Illuminate\Database\Eloquent\Model;

class Customer extends Models
{
    protected $fillable = [
       'discount', 'name', 'email', 'address', 'phoneNumber', 'in_stock'
    ];
}

