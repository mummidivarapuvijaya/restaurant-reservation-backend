# Restaurant Reservation Management System

A RESTful backend API for managing restaurant table reservations with role-based access control.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JWT (JSON Web Token)
- **Password Hashing:** bcryptjs

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Environment File
Create a `.env` file in the root folder:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/reservation_system
JWT_SECRET=your_secret_key_here
```

### 3. Seed Database
```bash
node seed/seedTables.js
node seed/seedAdmin.js
```

### 4. Start Server
```bash
npm start
```

## API Endpoints

### Authentication (`/api/auth`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/register` | Public | Register new user |
| POST | `/login` | Public | Login and get token |
| GET | `/profile` | User | Get own profile |

### Reservations (`/api/reservations`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/` | User | Create reservation |
| GET | `/my` | User | Get own reservations |
| DELETE | `/:id` | User | Cancel own reservation |
| GET | `/all` | Admin | Get all reservations |
| GET | `/by-date?date=YYYY-MM-DD` | Admin | Filter by date |
| PUT | `/:id` | Admin | Update reservation |
| DELETE | `/admin/:id` | Admin | Cancel any reservation |

### Tables (`/api/tables`)
| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/` | User | Get all tables |
| POST | `/` | Admin | Create table |
| PUT | `/:id` | Admin | Update table |
| DELETE | `/:id` | Admin | Delete table |

## Role-Based Access Control

### Roles
- **USER** - Regular customer
- **ADMIN** - Restaurant administrator

### How It Works
1. User registers/logs in and receives JWT token
2. Token must be sent in `Authorization: Bearer <token>` header
3. Routes check `role` in token to grant/deny access

### Access Matrix
| Feature | USER | ADMIN |
|---------|------|-------|
| Register/Login | ✅ | ✅ |
| Create reservation | ✅ | ✅ |
| View own reservations | ✅ | ✅ |
| Cancel own reservation | ✅ | ✅ |
| View all reservations | ❌ | ✅ |
| Update any reservation | ❌ | ✅ |
| Cancel any reservation | ❌ | ✅ |
| Manage tables | ❌ | ✅ |

## Reservation & Availability Logic

### Table Assignment
1. System finds all tables with `capacity >= guests`
2. Tables sorted by smallest capacity first (optimal seating)
3. For each table, check if already booked for same date + timeSlot
4. First available table is assigned
5. If no tables available, return error

### Conflict Prevention
A conflict exists when:
- Same table
- Same date
- Same time slot
- Status is "confirmed"

### Validation
- Guests must be >= 1
- Date, timeSlot, guests are required fields
- Tables must exist before booking

## Assumptions

1. Single restaurant location
2. Fixed tables seeded in database (5 tables)
3. Time slots are simple strings (e.g., "12:00 PM", "7:00 PM")
4. One table per reservation
5. Admin created via seed script

## Known Limitations

1. No email verification
2. No password reset functionality
3. No pagination for large datasets
4. Time slots not validated against operating hours
5. No waitlist feature

## Areas for Improvement

1. Email notifications for bookings
2. Operating hours validation
3. Pagination and filtering
4. Rate limiting
5. Unit and integration tests

## Default Admin Credentials

```
Email: admin@restaurant.com
Password: admin123
```

## Project Structure

```
├── config/
│   └── db.js
├── middleware/
│   ├── auth.js
│   └── role.js
├── models/
│   ├── reservation/
│   ├── table/
│   └── user/
├── routes/
│   └── index.js
├── seed/
│   ├── seedAdmin.js
│   └── seedTables.js
├── .env
├── .gitignore
├── package.json
├── README.md
└── server.js
```
