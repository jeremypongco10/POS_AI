<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;

class Role extends ResourceController
{
    protected $modelName = 'App\\Models\\RoleModel';
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
        return $this->failNotFound('Role not found');
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data)) {
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
        // Ensure rolesid is present for is_unique validation
        $data['rolesid'] = $id;
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
            'errormessage' => 'Role not found.'
        ], 404);
    }
}
