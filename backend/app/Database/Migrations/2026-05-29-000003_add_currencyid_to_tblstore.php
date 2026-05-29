<?php
namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class AddCurrencyidToTblstore extends Migration
{
    public function up()
    {
        $this->forge->addColumn('tblstore', [
            'currencyid' => [
                'type' => 'INT',
                'null' => false,
                'after' => 'email',
            ],
        ]);
        $this->db->query('ALTER TABLE tblstore ADD CONSTRAINT fk_store_currency FOREIGN KEY (currencyid) REFERENCES tblcurrency(currencyid)');
    }

    public function down()
    {
        $this->forge->dropForeignKey('tblstore', 'fk_store_currency');
        $this->forge->dropColumn('tblstore', 'currencyid');
    }
}
