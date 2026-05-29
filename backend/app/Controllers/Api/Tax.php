<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Tax extends ResourceController
{
    protected $modelName = 'App\\Models\\TaxModel';
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
        return $this->failNotFound('Tax not found');
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data)) {
            $data['taxid'] = $this->model->getInsertID();
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
        $data['taxid'] = $id;
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
            'errormessage' => 'Tax not found.'
        ], 404);
    }
}
