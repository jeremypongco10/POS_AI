<?php
namespace App\Models;

use CodeIgniter\Model;

class CurrencyModel extends Model
{
    protected $table = 'tblcurrency';
    protected $primaryKey = 'currencyid';
    protected $allowedFields = ['code', 'name', 'symbol', 'is_default', 'inactive'];
    protected $returnType = 'array';
    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
        protected $validationRules = [
            'code' => 'required|max_length[10]|is_unique[tblcurrency.code,currencyid,{currencyid}]',
            'name' => 'required|max_length[50]|is_unique[tblcurrency.name,currencyid,{currencyid}]',
            'symbol' => 'permit_empty|max_length[10]',
            'is_default' => 'permit_empty|in_list[0,1]',
            'inactive' => 'permit_empty|in_list[0,1]',
            'currencyid' => 'permit_empty', // Needed for update unique validation
        ];
        protected $validationMessages = [
            'code' => [
                'required' => 'Currency code is required.',
                'max_length' => 'Currency code must not exceed 10 characters.',
                'is_unique' => 'Currency code already exists.'
            ],
            'name' => [
                'required' => 'Currency name is required.',
                'max_length' => 'Currency name must not exceed 50 characters.',
                'is_unique' => 'Currency name already exists.'
            ],
            'symbol' => [
                'max_length' => 'Symbol must not exceed 10 characters.'
            ]
        ];
}
