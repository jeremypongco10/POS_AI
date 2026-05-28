<?php

namespace App\Database\Seeds;

use CodeIgniter\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $this->db->table('products')->insertBatch([
            [
                'name'  => 'House Blend Coffee',
                'sku'   => 'COF-001',
                'price' => 12.99,
                'stock' => 42,
            ],
            [
                'name'  => 'Ceramic Mug',
                'sku'   => 'MUG-014',
                'price' => 8.50,
                'stock' => 18,
            ],
            [
                'name'  => 'Receipt Paper Roll',
                'sku'   => 'SUP-220',
                'price' => 3.25,
                'stock' => 7,
            ],
        ]);
    }
}
