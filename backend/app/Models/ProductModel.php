<?php

namespace App\Models;

use CodeIgniter\Model;

class ProductModel extends Model
{
    protected $table = 'products';
    protected $primaryKey = 'id';
    protected $returnType = 'array';
    protected $allowedFields = [
        'name',
        'sku',
        'price',
        'stock',
    ];

    protected $useTimestamps = true;
    protected $dateFormat = 'datetime';

    protected $validationRules = [
        'name'  => 'required|min_length[2]|max_length[120]',
        'sku'   => 'required|min_length[2]|max_length[60]|is_unique[products.sku]',
        'price' => 'required|numeric|greater_than_equal_to[0]',
        'stock' => 'required|is_natural',
    ];

    protected $validationMessages = [
        'sku' => [
            'is_unique' => 'That SKU already exists.',
        ],
    ];
}
