<?php
namespace App\Models;

use CodeIgniter\Model;

class UserModel extends Model
{
    protected $table      = 'users';
    protected $primaryKey = 'id';
    protected $allowedFields = [
        'name', 'username', 'email', 'role', 'status', 'department', 'location', 'lastLogin', 'mfaEnabled'
    ];
    protected $useTimestamps = false;
}
