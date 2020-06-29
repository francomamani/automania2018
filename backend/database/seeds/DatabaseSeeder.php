<?php

use App\Administrador;
use App\Combustible;
use App\TipoVehiculo;
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
            "apellidos" => 'administrador',
            "carnet" => '7275047'
        ]);

        Administrador::create([
            'user_id' => $user->id
        ]);

        $tipo_vehiculos = [
            'VAGONETA',
            'CAMIONETA',
            'MINIBAN',
        ];

        foreach ($tipo_vehiculos as $tipo_vehiculo) {
            TipoVehiculo::create([
                'descripcion' => $tipo_vehiculo
            ]);
        }

        /*
         * Importe x litro
         * */
        $combustibles = [
            [
                'nombre' => 'GASOLINA',
                'importe' => 0.00
            ],
            [
                'nombre' => 'DIESEL',
                'importe' => 0.00
            ],
            [
                'nombre' => 'GAS',
                'importe' => 0.00
            ],
        ];

        foreach ($combustibles as $combustible) {
            Combustible::create($combustible);
        }

        // $this->call(UsersTableSeeder::class);
    }
}
