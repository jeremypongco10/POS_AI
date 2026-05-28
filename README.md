# POS AI Full-Stack Starter

This project contains a local XAMPP-friendly full-stack app:

- `frontend/` - React + TypeScript app built with Vite.
- `backend/` - CodeIgniter 4 JSON API.
- `database/` - MySQL schema and seed data.

## Requirements

- XAMPP with Apache, MySQL, and PHP enabled.
- Composer.
- Node.js and npm.

On PowerShell, use `npm.cmd` if `npm` is blocked by script execution policy.

## Database Setup

1. Start Apache and MySQL from the XAMPP Control Panel.
2. Open phpMyAdmin at `http://localhost/phpmyadmin`.
3. Import `database/schema.sql`.

Alternatively, create an empty `pos_ai` database in phpMyAdmin and run the CodeIgniter migration/seed:

```powershell
cd C:\xampp\htdocs\POS_AI\backend
php spark migrate
php spark db:seed ProductSeeder
```

## Backend Setup

Create `backend/.env` from the example file:

```powershell
cd C:\xampp\htdocs\POS_AI\backend
copy .env.example .env
```

The example is configured for the default XAMPP MySQL user:

```ini
database.default.database = pos_ai
database.default.username = root
database.default.password =
```

Install or refresh PHP dependencies:

```powershell
cd C:\xampp\htdocs\POS_AI\backend
composer install --no-dev --optimize-autoloader
```

With the project in `C:\xampp\htdocs\POS_AI`, the API is available through Apache. If IIS is using port 80, XAMPP commonly runs Apache on port 8080:

```text
http://127.0.0.1:8080/POS_AI/backend/public/index.php/api/health
http://127.0.0.1:8080/POS_AI/backend/public/index.php/api/products
```

## Frontend Setup

Install JavaScript dependencies and start Vite:

```powershell
cd C:\xampp\htdocs\POS_AI\frontend
npm.cmd install
npm.cmd run dev
```

Open the Vite URL shown in the terminal, usually:

```text
http://localhost:5173
```

Create `frontend/.env.local` from the example file:

```powershell
cd C:\xampp\htdocs\POS_AI\frontend
copy .env.example .env.local
```

The frontend reads `frontend/.env.local`:

```ini
VITE_API_BASE_URL=http://127.0.0.1:8080/POS_AI/backend/public/index.php/api
```

Update that URL if you run the CodeIgniter backend from a virtual host or `php spark serve`.

## API Endpoints

- `GET /api/health` - returns API status.
- `GET /api/products` - returns products from MySQL.
- `POST /api/products` - creates a product.

Example POST body:

```json
{
  "name": "Cold Brew Bottle",
  "sku": "DRK-100",
  "price": 4.75,
  "stock": 24
}
```
