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
        Schema::create('product_listings', function (Blueprint $table) {
            $table->id();
            $table->string('product_code')->nullable();;
            $table->string('product_name')->nullable();
            $table->string('plslug_name')->nullable();
            $table->unsignedBigInteger('brand_id')->nullable();
            $table->foreign('brand_id')->references('id')->on('product_brands');
            $table->string('product_model')->nullable();
            $table->string('cate_Map_id')->nullable();
            $table->string('product_status')->nullable();
            $table->string('product_desciption')->nullable();
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
        Schema::dropIfExists('product_listings');
    }
};
