# 🍕 Pizza Delight – Full Stack MERN Application

> **Pizza Delight** is a full-stack MERN (MongoDB, Express, React, Node.js) pizza ordering system that allows users to browse pizzas, create custom pizzas, place orders, and enables admins to manage inventory, users, pizzas, and orders through a secure admin dashboard.

---

## 🚀 Live Preview

Frontend: http://localhost:5173  
Backend API: http://localhost:5000  

---

## 🧩 Project Structure

Pizza_Delight/
│
├── server/ # Backend (Node.js + Express + MongoDB)
│
├── client/ # Frontend (React + Vite + Tailwind)
│
└── README.md


---

## ✨ Features

### 👤 User Features
- User registration & login (JWT authentication)
- Email verification system
- Browse pizza menu
- **Create Custom Pizza**
  - Select size
  - Choose bases, sauces, cheeses & veggies
  - **Dynamic price calculation (₹ INR)**
- Add to cart & manage quantity
- Checkout & order placement
- View order history
- Edit profile

### 🛠️ Admin Features
- Admin login & registration
- Protected admin routes
- Admin dashboard
- Manage:
  - Users
  - Staff (Admins)
  - Pizzas
  - Orders
  - Inventory (bases, sauces, cheeses, veggies)
- Inventory stock tracking with thresholds

---

## 🧠 Tech Stack

### Frontend
- React (Vite)
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Icons

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- bcryptjs
- Nodemailer
- Razorpay (Test Mode)

---

## 💰 Currency
- Application uses **Indian Rupees (₹ INR)**
- Dynamic pricing for custom pizzas
- Prices calculated based on:
  - Pizza size
  - Selected ingredients

---

## ⚙️ Environment Variables

### Backend (`server/.env`)
```env
NODE_ENV=development
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_jwt_secret
SALT=10

SENDER_EMAIL=your_email
SENDER_PASSWORD=your_email_password
SUPERADMIN_EMAIL=admin_email

RAZORPAY_KEY_ID=your_key
RAZORPAY_KEY_SECRET=your_secret

Frontend (client/.env)
VITE_SERVER_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_key

Install Dependencies
# Backend
npm install

# Frontend
cd client
npm install
cd ..

Seed Database (Optional)
npm run data:import

Run Application
# Run both frontend & backend
npm run dev

# Backend only
npm run server

# Frontend only
npm run client

Authentication & Routing

JWT-based authentication

Role-based access (User / Admin)

Protected routes:

/profile
/checkout
/custom-pizza
/admin/dashboard

Auto redirection based on role

User Routes
/login
/register
/menu
/custom-pizza
/profile
/my-orders
/checkout

Admin Routes
/admin/login
/admin/register
/admin/dashboard

🧪 API Communication

Axios for HTTP requests
Redux async thunks
Centralized error handling
Secure headers with Bearer tokens

📌 Future Improvements

Image upload instead of image URL
Coupons & discounts
Real-time order tracking
Mobile-optimized admin panel
Deployment (Vercel + Render)

👨‍💻 Developer

Name: Zeel Sadariya
Degree: B.Tech – Computer Engineering
University: CHARUSAT University
Domain: Full Stack Web Development (MERN)

🤝 Contributing

Fork the repository
Create a new branch
Commit your changes
Push to your branch
Open a Pull Request

⭐ Support

If you like this project:

⭐ Star the repository
🍴 Fork it
📢 Share it
📄 License

Distributed under the MIT License.


---
