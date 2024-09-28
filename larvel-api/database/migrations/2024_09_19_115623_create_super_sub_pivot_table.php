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
        Schema::create('super_sub_pivot', function (Blueprint $table) {
           
            $table->unsignedBigInteger('super_category_id');
            $table->foreign('super_category_id')
                  ->references('id')
                  ->on('product_super_categories')
                  ->onDelete('cascade');
            
            $table->unsignedBigInteger('sub_category_id');
            $table->foreign('sub_category_id')
                  ->references('id')
                  ->on('product_sub_categories')
                  ->onDelete('cascade');

                  $table->primary(['super_category_id', 'sub_category_id']);
           
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
        Schema::dropIfExists('super_sub_pivot');
    }
};

/**
 * Why Use Composite Primary Key?
 * - to make Many-to-Many Relationship Representation
 */