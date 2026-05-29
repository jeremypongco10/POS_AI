<?php
namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class CreateTbltax extends Migration
{
    public function up()
    {
        $this->forge->addField([
            'taxid' => [
                'type' => 'INT',
                'constraint' => 11,
                'unsigned' => true,
                'auto_increment' => true,
            ],
            'name' => [
                'type' => 'VARCHAR',
                'constraint' => 100,
                'null' => false,
            ],
            'rate' => [
                'type' => 'DECIMAL',
                'constraint' => '5,2',
                'null' => false,
            ],
            'description' => [
                'type' => 'VARCHAR',
                'constraint' => 255,
                'null' => true,
            ],
            'inactive' => [
                'type' => 'TINYINT',
                'constraint' => 1,
                'default' => 0,
            ],
            'created_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
            'updated_at' => [
                'type' => 'DATETIME',
                'null' => true,
            ],
        ]);
        $this->forge->addKey('taxid', true);
        $this->forge->createTable('tbltax');
    }

    public function down()
    {
        $this->forge->dropTable('tbltax');
    }
}
