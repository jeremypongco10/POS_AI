<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use CodeIgniter\HTTP\ResponseInterface;

class Health extends BaseController
{
    public function index(): ResponseInterface
    {
        return $this->response->setJSON([
            'service' => 'POS AI API',
            'status'  => 'ok',
        ]);
    }
}
