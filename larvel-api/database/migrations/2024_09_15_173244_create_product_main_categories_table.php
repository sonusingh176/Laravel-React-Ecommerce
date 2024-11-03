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
        Schema::create('product_main_categories', function (Blueprint $table) {
            $table->id();
            $table->string('main_cname');
            $table->string('main_cslug_name');
            $table->string('main_image')->nullable();
            $table->string('main_image_xp')->nullable();
            $table->string('main_cstatus')->nullable();
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
        Schema::dropIfExists('product_main_categories');
    }
};
