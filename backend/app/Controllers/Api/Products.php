<?php

namespace App\Controllers\Api;

use App\Controllers\BaseController;
use App\Models\ProductModel;
use CodeIgniter\HTTP\ResponseInterface;

class Products extends BaseController
{
    public function index(): ResponseInterface
    {
        $products = model(ProductModel::class)
            ->orderBy('name', 'ASC')
            ->findAll();

        return $this->response->setJSON(['data' => $products]);
    }

    public function create(): ResponseInterface
    {
        $input = $this->request->getJSON(true) ?? $this->request->getPost();

        $payload = [
            'name'  => trim((string) ($input['name'] ?? '')),
            'sku'   => strtoupper(trim((string) ($input['sku'] ?? ''))),
            'price' => $input['price'] ?? null,
            'stock' => $input['stock'] ?? null,
        ];

        $model = model(ProductModel::class);
        $id = $model->insert($payload);

        if ($id === false) {
            return $this->response
                ->setStatusCode(422)
                ->setJSON([
                    'message' => 'Validation failed',
                    'errors'  => $model->errors(),
                ]);
        }

        return $this->response
            ->setStatusCode(201)
            ->setJSON(['data' => $model->find($id)]);
    }

    public function options(): ResponseInterface
    {
        return $this->response->setStatusCode(204);
    }
}
