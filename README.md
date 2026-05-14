# 🛒 E-Commerce RESTful API

A full-featured Node.js E-Commerce REST API built with Express.js and MongoDB. Provides a complete backend solution for an online store including authentication, product management, cart, orders, payments, and more.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Authentication](#authentication)
- [Security](#security)

---

## ✨ Features

- **Authentication & Authorization** — JWT-based auth with role-based access control (User, Manager, Admin)
- **Product Management** — Full CRUD with categories, subcategories, brands, image uploads, ratings, and reviews
- **Shopping Cart** — Add/update/remove items, apply discount coupons
- **Wishlist** — Save and manage favorite products
- **Orders & Payments** — Cash on delivery + Stripe card payments with webhook support
- **User Profiles** — Multiple saved addresses, order history, profile images
- **Advanced Querying** — Search, filtering, sorting, and pagination on products
- **Email Notifications** — Password reset and account emails via Nodemailer

---

## 🛠 Tech Stack

| Category | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | JWT, Bcryptjs |
| Payment | Stripe |
| Image Processing | Sharp, Multer |
| Email | Nodemailer |
| Validation | Express-validator, Zod |
| Utilities | Slugify, UUID |
| Dev Tools | Nodemon, Morgan, ESLint, Prettier |

---

## 📁 Project Structure

```
├── config/             # Database configuration
├── controllers/        # Route handlers / business logic
├── models/             # Mongoose schemas
├── routes/             # API route definitions
├── middlewares/        # Custom middlewares (auth, error handling, etc.)
├── utils/              # Utility functions and validators
├── uploads/            # Uploaded images (gitignored)
└── server.js           # App entry point
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js v16.13.0 or higher
- MongoDB database (local or Atlas)
- Stripe account (for payment integration)
- SMTP email service (for Nodemailer)

---

## 📡 API Endpoints

All endpoints are prefixed with `/api/v1`.

### Auth — `/api/v1/auth`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| POST | `/signup` | Register a new user | Public |
| POST | `/login` | Login and get JWT | Public |
| POST | `/forgotPassword` | Request password reset email | Public |
| PUT | `/resetPassword/:token` | Reset password with token | Public |

### Users — `/api/v1/users`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all users | Admin |
| GET | `/:id` | Get single user | Admin |
| POST | `/` | Create user | Admin |
| PUT | `/:id` | Update user | Admin |
| DELETE | `/:id` | Delete user | Admin |
| GET | `/getMe` | Get my profile | User |
| PUT | `/updateMe` | Update my profile | User |
| PUT | `/changeMyPassword` | Change my password | User |

### Products — `/api/v1/products`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all products (filter, search, sort, paginate) | Public |
| GET | `/:id` | Get single product | Public |
| POST | `/` | Create product | Admin/Manager |
| PUT | `/:id` | Update product | Admin/Manager |
| DELETE | `/:id` | Delete product | Admin |

### Categories — `/api/v1/categories`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all categories | Public |
| GET | `/:id` | Get single category | Public |
| POST | `/` | Create category | Admin/Manager |
| PUT | `/:id` | Update category | Admin/Manager |
| DELETE | `/:id` | Delete category | Admin |

### Subcategories — `/api/v1/subcategories`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all subcategories | Public |
| GET | `/:id` | Get single subcategory | Public |
| POST | `/` | Create subcategory | Admin/Manager |
| PUT | `/:id` | Update subcategory | Admin/Manager |
| DELETE | `/:id` | Delete subcategory | Admin |

### Brands — `/api/v1/brands`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all brands | Public |
| GET | `/:id` | Get single brand | Public |
| POST | `/` | Create brand | Admin/Manager |
| PUT | `/:id` | Update brand | Admin/Manager |
| DELETE | `/:id` | Delete brand | Admin |

### Reviews — `/api/v1/reviews`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all reviews | Public |
| GET | `/:id` | Get single review | Public |
| POST | `/` | Create review | User |
| PUT | `/:id` | Update review | User (owner) |
| DELETE | `/:id` | Delete review | User (owner) / Admin |

### Cart — `/api/v1/cart`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get my cart | User |
| POST | `/` | Add item to cart | User |
| PUT | `/:itemId` | Update item quantity | User |
| DELETE | `/:itemId` | Remove item from cart | User |
| DELETE | `/` | Clear cart | User |
| POST | `/applyCoupon` | Apply discount coupon | User |

### Wishlist — `/api/v1/wishlist`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get my wishlist | User |
| POST | `/` | Add product to wishlist | User |
| DELETE | `/:productId` | Remove from wishlist | User |

### Orders — `/api/v1/orders`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all orders | Admin/Manager |
| GET | `/:id` | Get single order | User (owner) / Admin |
| POST | `/` | Create cash order | User |
| GET | `/checkout-session/:cartId` | Create Stripe checkout session | User |
| PUT | `/:id/pay` | Mark order as paid | Admin/Manager |
| PUT | `/:id/deliver` | Mark order as delivered | Admin/Manager |

### Coupons — `/api/v1/coupons`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get all coupons | Admin/Manager |
| GET | `/:id` | Get single coupon | Admin/Manager |
| POST | `/` | Create coupon | Admin/Manager |
| PUT | `/:id` | Update coupon | Admin/Manager |
| DELETE | `/:id` | Delete coupon | Admin/Manager |

### Addresses — `/api/v1/addresses`

| Method | Endpoint | Description | Access |
|---|---|---|---|
| GET | `/` | Get my addresses | User |
| POST | `/` | Add new address | User |
| DELETE | `/:addressId` | Remove address | User |

---

## 🔑 Authentication

Protected routes require a valid JWT in the `Authorization` header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained from `/api/v1/auth/login` or `/api/v1/auth/signup`. Tokens expire based on `JWT_EXPIRE_TIME` in your `.env`.

**Roles:**
- `user` — standard customer access
- `manager` — can manage products, categories, orders
- `admin` — full access including user management

---

## 🛡 Security

- **Rate Limiting** — 100 requests per 15 minutes per IP
- **CORS** — Cross-origin requests enabled
- **HPP Protection** — HTTP Parameter Pollution prevention
- **Password Hashing** — Bcrypt with salt rounds
- **Request Compression** — Gzip compression on responses
- **Input Validation** — Express-validator on all inputs
- **Environment Secrets** — All sensitive values in `.env`, never committed

---

## 📦 Response Format

All responses follow a consistent JSON structure:

**Success:**
```json
{
  "status": "success",
  "results": 10,
  "data": { }
}
```

**Error:**
```json
{
  "status": "fail",
  "message": "Error description here"
}
```

---

## 💳 Stripe Webhooks

For Stripe payment confirmation in production, configure a webhook endpoint in your Stripe dashboard pointing to:

```
POST /api/v1/orders/webhook-checkout
```

Set the `STRIPE_WEBHOOK_SECRET` in your `.env` to the signing secret provided by Stripe.
