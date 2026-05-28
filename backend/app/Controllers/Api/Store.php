<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Store extends ResourceController
{
    protected $modelName = 'App\\Models\\StoreModel';
    protected $format    = 'json';

    public function index()
    {
        return $this->respond($this->model->findAll());
    }

    public function show($id = null)
    {
        $data = $this->model->find($id);
        if ($data) {
            return $this->respond($data);
        }
        return $this->failNotFound('Store not found');
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data)) {
            $data['storeid'] = $this->model->getInsertID();
            return $this->respond([
                'isSuccess' => true,
                'errormessage' => '',
                'data' => $data
            ], 201);
        }
        $errors = $this->model->errors();
        return $this->respond([
            'isSuccess' => false,
            'errormessage' => implode(' ', $errors),
            'messages' => $errors
        ], 400);
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        // Ensure storeid is present for is_unique validation
        $data['storeid'] = $id;
        if ($this->model->update($id, $data)) {
            return $this->respond([
                'isSuccess' => true,
                'errormessage' => '',
                'data' => $data
            ]);
        }
        $errors = $this->model->errors();
        return $this->respond([
            'isSuccess' => false,
            'errormessage' => implode(' ', $errors),
            'messages' => $errors
        ], 400);
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respond([
                'isSuccess' => true,
                'errormessage' => '',
                'id' => $id
            ]);
        }
        return $this->respond([
            'isSuccess' => false,
            'errormessage' => 'Store not found.'
        ], 404);
    }
}
