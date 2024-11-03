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
        Schema::create('product_category_pivot', function (Blueprint $table) {
            $table->unsignedBigInteger('product_id');
            $table->foreign('product_id')
                ->references('id')
                ->on('product_listings')
                ->onDelete('cascade');
          
            $table->unsignedBigInteger('sub_category_id');
            $table->foreign('sub_category_id')
                ->references('id')
                ->on('product_sub_categories')
                ->onDelete('cascade');
            
                $table->primary(['product_id', 'sub_category_id']);

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
        Schema::dropIfExists('product_category_pivot');
    }
};
