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
        Schema::create('product_super_categories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('main_category_id')->nullable();
            $table->foreign('main_category_id')->references('id')->on('product_main_categories')->onDelete('cascade');
            $table->string('sup_cname');
            $table->string('sup_cslug_name')->nullable();
            $table->string('sup_image')->nullable();
            $table->boolean('sup_cstatus')->default(true);
            $table->string('product_description')->nullable();
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
        Schema::dropIfExists('product_super_categories');
    }
};
