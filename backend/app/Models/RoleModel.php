<?php
namespace App\Models;

use CodeIgniter\Model;

class RoleModel extends Model
{
    protected $table      = 'tblroles';
    protected $primaryKey = 'rolesid';
    protected $allowedFields = ['name', 'description', 'inactive', 'created_at', 'updated_at'];
    protected $returnType = 'array';
    protected $useTimestamps = true;

    protected $validationRules = [
        'name' => 'required|min_length[2]|max_length[100]|is_unique[tblroles.name,rolesid,{rolesid}]',
        'description' => 'permit_empty|max_length[255]',
        'inactive' => 'in_list[0,1]',
        'rolesid' => 'permit_empty', // Needed for update unique validation
    ];

    protected $validationMessages = [
        'name' => [
            'required' => 'Role name is required.',
            'min_length' => 'Role name must be at least 2 characters.',
            'max_length' => 'Role name must not exceed 100 characters.',
            'is_unique' => 'Role name already exists.'
        ],
        'description' => [
            'max_length' => 'Description must not exceed 255 characters.'
        ],
        'inactive' => [
            'in_list' => 'Status must be Active or Inactive.'
        ]
    ];
}
