<?php
$routes->resource('api/currency', [
    'controller' => 'Api\Currency',
    'placeholder' => '(:num)'
]);
$routes->resource('api/tax', [
    'controller' => 'Api\Tax',
    'placeholder' => '(:num)'
]);
$routes->resource('api/branchstores', [
    'controller' => 'Api\BranchStore',
    'placeholder' => '(:num)'
]);
// --- Stores API Endpoints ---
$routes->resource('api/stores', [
    'controller' => 'Api\Store',
    'placeholder' => '(:num)'
]);

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api', ['filter' => 'cors'], static function (RouteCollection $routes): void {
    $routes->options('products', 'Api\Products::options');
    $routes->get('health', 'Api\Health::index');
    $routes->get('products', 'Api\Products::index');
    $routes->post('products', 'Api\Products::create');
});

// --- Roles API Endpoints ---
$routes->resource('api/roles', [
    'controller' => 'Api\Role',
    'placeholder' => '(:num)'
]);

// --- Users API Endpoints ---
$routes->resource('api/users', [
    'controller' => 'Api\User',
    'placeholder' => '(:num)'
]);

// --- Permissions API Endpoints ---
$routes->resource('api/permissions', [
    'controller' => 'Api\Permission',
    'placeholder' => '(:num)'
]);
