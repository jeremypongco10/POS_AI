<?php
namespace App\Controllers\Api;

use CodeIgniter\RESTful\ResourceController;
use App\Models\CurrencyModel;

class Currency extends ResourceController
{
    protected $modelName = CurrencyModel::class;
    protected $format = 'json';

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
        return $this->failNotFound('Currency not found');
    }

    public function create()
    {
        $data = $this->request->getJSON(true);
        if ($this->model->insert($data, false)) {
            return $this->respondCreated(['isSuccess' => true, 'id' => $this->model->getInsertID()]);
        }
        return $this->failValidationErrors($this->model->errors());
    }

    public function update($id = null)
    {
        $data = $this->request->getJSON(true);
        if ($this->model->update($id, $data)) {
            return $this->respond(['isSuccess' => true]);
        }
        return $this->failValidationErrors($this->model->errors());
    }

    public function delete($id = null)
    {
        if ($this->model->delete($id)) {
            return $this->respondDeleted(['isSuccess' => true]);
        }
        return $this->failNotFound('Currency not found');
    }
}
