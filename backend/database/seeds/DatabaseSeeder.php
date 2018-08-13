<?php

use Illuminate\Database\Seeder;
use App\User;
class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = User::create([
            "cuenta" => 'admin',
            "password" => bcrypt("admin"),
            "nombres" => 'administrador',
            "apellidos"=> 'administrador',
            "carnet"=> '7275047'
        ]);

        \App\Administrador::create([
            'user_id' => $user->id
        ]);

        // $this->call(UsersTableSeeder::class);
    }
}
