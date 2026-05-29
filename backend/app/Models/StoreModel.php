<?php
namespace App\Models;

use CodeIgniter\Model;

class StoreModel extends Model
{
    protected $table      = 'tblstore';
    protected $primaryKey = 'storeid';
    protected $allowedFields = ['name', 'address', 'contact_number', 'email', 'currencyid', 'taxid', 'inactive', 'created_at', 'updated_at'];
    protected $returnType = 'array';
    protected $useTimestamps = true;

    protected $validationRules = [
        'name' => 'required|min_length[2]|max_length[100]|is_unique[tblstore.name,storeid,{storeid}]',
        'address' => 'permit_empty|max_length[255]',
        'contact_number' => 'permit_empty|max_length[50]',
        'email' => 'permit_empty|valid_email|max_length[100]',
        'currencyid' => 'required|is_natural_no_zero|is_not_unique[tblcurrency.currencyid]',
        'taxid' => 'required|is_natural_no_zero|is_not_unique[tbltax.taxid]',
        'inactive' => 'in_list[0,1]',
        'storeid' => 'permit_empty', // Needed for update unique validation
    ];

    protected $validationMessages = [
        'name' => [
            'required' => 'Store name is required.',
            'min_length' => 'Store name must be at least 2 characters.',
            'max_length' => 'Store name must not exceed 100 characters.',
            'is_unique' => 'Store name already exists.'
        ],
        'email' => [
            'valid_email' => 'Please enter a valid email address.',
            'max_length' => 'Email must not exceed 100 characters.'
        ],
        'contact_number' => [
            'max_length' => 'Contact number must not exceed 50 characters.'
        ],
        'address' => [
            'max_length' => 'Address must not exceed 255 characters.'
        ],
        'currencyid' => [
            'required' => 'Currency is required.',
            'is_natural_no_zero' => 'Please select a valid currency.',
            'is_not_unique' => 'Selected currency does not exist.'
        ],
        'taxid' => [
            'required' => 'Tax is required.',
            'is_natural_no_zero' => 'Please select a valid tax.',
            'is_not_unique' => 'Selected tax does not exist.'
        ],
        'inactive' => [
            'in_list' => 'Status must be Active or Inactive.'
        ]
    ];
}
