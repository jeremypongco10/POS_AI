<?php

use CodeIgniter\Router\RouteCollection;

/** @var RouteCollection $routes */
$routes->get('/', 'Home::index');

$routes->group('api', ['filter' => 'cors'], static function (RouteCollection $routes): void {
    $routes->options('products', 'Api\Products::options');
    $routes->get('health', 'Api\Health::index');
    $routes->get('products', 'Api\Products::index');
    $routes->post('products', 'Api\Products::create');
});
