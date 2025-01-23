<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run()
    {
        // Check if admin exists
        $adminExists = User::where('role', 'ADMIN')->exists();
        
        if (!$adminExists) {
            User::create([
                'name' => 'Zafar Iqbal',
                'phone_no' => '00000000000',
                'password' => Hash::make('NbtHub123!@#27'),
                'role' => 'ADMIN'
            ]);
            
            echo "Admin User created successfully\n";
        }

        // Check if shop manager exists
        $shopManagerExists = User::where('role', 'USER')->exists();
        
        if (!$shopManagerExists) {
            User::create([
                'name' => 'Shop Manager',
                'phone_no' => '03278784988',
                'password' => Hash::make('123456789'),
                'role' => 'USER'
            ]);
            
            echo "Shop Manager User created successfully\n";
        }
    }
}
