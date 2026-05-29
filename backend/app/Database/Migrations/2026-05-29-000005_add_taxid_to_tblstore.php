<?php
namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddTaxidToTblstore extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tblstore', [
            'taxid' => [
                'type' => 'INT',
                'null' => false,
                'after' => 'currencyid',
            ],
        ]);
        $this->db->query('ALTER TABLE tblstore ADD CONSTRAINT fk_store_tax FOREIGN KEY (taxid) REFERENCES tbltax(taxid)');
    }

    public function down()
    {
        $this->forge->dropForeignKey('tblstore', 'fk_store_tax');
        $this->forge->dropColumn('tblstore', 'taxid');
    }
}
