# 🍽️ Restaurant Reservation Management System

This project is a **full-stack Restaurant Reservation Management System** built using **React (Frontend)** and **Node.js + Express + MongoDB (Backend)**.

It allows:
- Customers to book and manage reservations
- Administrators to manage all reservations with role-based access

---

## 🚀 Tech Stack

### Frontend
- React
- React Router DOM
- Axios
- React Toastify
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (JSON Web Token)
- bcryptjs
- dotenv

---

## 🔐 Authentication & Authorization

- JWT-based authentication
- Token stored in browser localStorage
- Axios interceptor automatically attaches token
- Role-based access:
  - USER → User Dashboard
  - ADMIN → Admin Dashboard

---

## 👤 User Features

- Register and login
- Book a reservation
- View own reservations
- Cancel reservations
- Toast notifications for actions

---

## 🛠️ Admin Features

- View all reservations
- Filter reservations by date
- Update reservation date and time slot
- Cancel any reservation
- View table information
- Role-protected admin routes

---

## 📅 Reservation Logic

- Tables are assigned automatically based on:
  - Seating capacity
  - Availability
  - Date & time slot
- Prevents overlapping reservations
- Returns clear error messages if no table is available

---

## 🌱 Seeding Tables (IMPORTANT)

Tables must exist before booking reservations.

Run this command inside **Backend** folder:

```bash
node seed/seedTables.js
