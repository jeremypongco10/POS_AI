<?php
namespace App\Models;

use CodeIgniter\Model;

class TaxModel extends Model
{
    protected $table = 'tbltax';
    protected $primaryKey = 'taxid';
    protected $allowedFields = ['name', 'rate', 'description', 'inactive', 'created_at', 'updated_at'];
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
        protected $validationRules = [
            'name' => 'required|max_length[100]|is_unique[tbltax.name,taxid,{taxid}]',
            'rate' => 'required|decimal',
            'description' => 'permit_empty|max_length[255]',
            'inactive' => 'in_list[0,1]',
            'taxid' => 'permit_empty', // Needed for update unique validation
        ];
        protected $validationMessages = [
            'name' => [
                'required' => 'Tax name is required.',
                'max_length' => 'Tax name must not exceed 100 characters.',
                'is_unique' => 'Tax name already exists.'
            ],
            'rate' => [
                'required' => 'Tax rate is required.',
                'decimal' => 'Tax rate must be a valid number.'
            ],
            'description' => [
                'max_length' => 'Description must not exceed 255 characters.'
            ],
            'inactive' => [
                'in_list' => 'Status must be Active or Inactive.'
            ]
        ];
}
