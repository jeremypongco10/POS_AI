<?php
namespace App\Models;

use CodeIgniter\Model;

class BranchStoreModel extends Model
{
    protected $table      = 'tblbranchstore';
    protected $primaryKey = 'branchstoreid';
    protected $allowedFields = ['storeid', 'branch_name', 'address', 'contact_number', 'email', 'inactive', 'created_at', 'updated_at'];
    protected $returnType = 'array';
    protected $useTimestamps = true;

    protected $validationRules = [
        'storeid' => 'required|integer',
        'branch_name' => 'required|min_length[2]|max_length[100]|is_unique[tblbranchstore.branch_name,branchstoreid,{branchstoreid}]',
        'address' => 'permit_empty|max_length[255]',
        'contact_number' => 'permit_empty|max_length[50]',
        'email' => 'permit_empty|valid_email|max_length[100]',
        'inactive' => 'in_list[0,1]',
        'branchstoreid' => 'permit_empty',
    ];

    protected $validationMessages = [
        'storeid' => [
            'required' => 'Store is required.',
            'integer' => 'Store ID must be an integer.'
        ],
        'branch_name' => [
            'required' => 'Branch name is required.',
            'min_length' => 'Branch name must be at least 2 characters.',
            'max_length' => 'Branch name must not exceed 100 characters.',
            'is_unique' => 'Branch name already exists.'
        ],
        'address' => [
            'max_length' => 'Address must not exceed 255 characters.'
        ],
        'contact_number' => [
            'max_length' => 'Contact number must not exceed 50 characters.'
        ],
        'email' => [
            'valid_email' => 'Please enter a valid email address.',
            'max_length' => 'Email must not exceed 100 characters.'
        ],
        'inactive' => [
            'in_list' => 'Status must be Active or Inactive.'
        ]
    ];
}
