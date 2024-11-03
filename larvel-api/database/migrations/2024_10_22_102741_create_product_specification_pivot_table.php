<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('product_specification_pivot', function (Blueprint $table) {
          

            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                  ->references('id')
                  ->on('product_listings')
                  ->onDelete('cascade');

            $table->unsignedBigInteger('spec_id');
            $table->foreign('spec_id')
                  ->references('id')
                  ->on('specifications')
                  ->onDelete('cascade');

            $table->string('specification_value')->nullable();;

            
            $table->primary(['product_id','spec_id']);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('product_specification_pivot');
    }
};
