<?php

namespace App\Providers;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // TESTING API ENDPOINT 
        // Remove during production
        VerifyCsrfToken::except([
            '*',
        ]);
    }
    public function map()
    {
        $this->mapApiRoutes();

        $this->mapWebRoutes();
    }

    protected function mapApiRoutes()
    {
        Route::prefix('api')
             ->middleware('api')
             ->namespace($this->app->getNamespace().'Http\Controllers\Api\V1')
             ->group(base_path('routes/api.php'));
    }

    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->namespace($this->app->getNamespace().'Http\Controllers')
             ->group(base_path('routes/web.php'));
    }
}
