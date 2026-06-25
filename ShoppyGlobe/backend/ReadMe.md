# ShoppyGlobe Backend API

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## Features Implemented

- User Registration
- User Login
- Fetch All Products
- Fetch Single Product by ID
- Add Product to Cart
- Update Cart Item Quantity
- Delete Cart Item from Cart
- Protected Cart Routes using JWT

## API Routes

### Auth Routes

- POST /api/auth/register
- POST /api/auth/login

### Product Routes

- GET /api/products
- GET /api/products/:id

### Cart Routes

- GET /api/cart
- POST /api/cart
- PUT /api/cart/:id
- DELETE /api/cart/:id

## How to Run

1. Open terminal in backend folder
2. Run `npm install`
3. Add your MongoDB connection string in `.env`
4. Run `npm run dev`

## Testing

All APIs were tested using Thunder Client / Postman.
Screenshots are included in the submission.
