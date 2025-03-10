<?php

namespace Ap\Models

use Illuminate\Database\Eloquent\Model;

class Customer extends Models
{
    protected $fillable = [
       'dsicound', 'name', 'email', 'address', 'phoneNumber', 'in_stock'
    ];
}

