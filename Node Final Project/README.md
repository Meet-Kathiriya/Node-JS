# Employee Management System

A full-stack employee management system with role-based access control for Admin, Manager, and Employee roles.

## Features

### Admin Features
- ✅ Admin Registration & Login
- ✅ Profile Management
- ✅ Change Password
- ✅ Forgot Password
- ✅ Add Manager (with email notification)
- ✅ View All Managers
- ✅ Activate/Deactivate Managers
- ✅ View All Employees
- ✅ Activate/Deactivate Employees

### Manager Features
- ✅ Manager Login
- ✅ Profile Management
- ✅ Change Password
- ✅ Forgot Password
- ✅ Add Employee (with image upload and email notification)
- ✅ View All Employees

### Employee Features
- ✅ Employee Login
- ✅ Profile View
- ✅ Change Password
- ✅ Forgot Password

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT Authentication
- Bcrypt for password hashing
- Nodemailer for email notifications
- Multer for file uploads

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Axios

## Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the backend directory:
```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://localhost:27017/employee_management

JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM_NAME=Employee Management System

FRONTEND_URL=http://localhost:5173
```

4. Start the backend server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the frontend directory:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## Email Configuration

For email functionality (password reset, welcome emails), you need to configure SMTP settings:

### Gmail Setup
1. Enable 2-Step Verification on your Google account
2. Generate an App Password:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a password for "Mail"
3. Use this app password in `SMTP_PASS` in your `.env` file

## Project Structure

```
Node Final Project/
├── backend/
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── managerController.js
│   │   ├── employeeController.js
│   │   └── authController.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Admin.js
│   │   ├── Manager.js
│   │   └── Employee.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── managerRoutes.js
│   │   └── employeeRoutes.js
│   ├── utils/
│   │   ├── emailService.js
│   │   └── generateToken.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── pages/
    │   │   ├── Admin/
    │   │   ├── Manager/
    │   │   ├── Employee/
    │   │   ├── Home.jsx
    │   │   ├── ForgotPassword.jsx
    │   │   └── ResetPassword.jsx
    │   ├── utils/
    │   ├── App.jsx
    │   └── main.jsx
    └── package.json
```

## API Endpoints

### Admin Endpoints
- `POST /api/admin/register` - Register admin
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile (Protected)
- `PUT /api/admin/change-password` - Change password (Protected)
- `POST /api/admin/forgot-password` - Forgot password
- `POST /api/admin/add-manager` - Add manager (Protected)
- `GET /api/admin/managers` - Get all managers (Protected)
- `PUT /api/admin/managers/:id/status` - Toggle manager status (Protected)
- `GET /api/admin/employees` - Get all employees (Protected)
- `PUT /api/admin/employees/:id/status` - Toggle employee status (Protected)

### Manager Endpoints
- `POST /api/manager/login` - Manager login
- `GET /api/manager/profile` - Get manager profile (Protected)
- `PUT /api/manager/change-password` - Change password (Protected)
- `POST /api/manager/forgot-password` - Forgot password
- `POST /api/manager/add-employee` - Add employee (Protected)
- `GET /api/manager/employees` - Get all employees (Protected)

### Employee Endpoints
- `POST /api/employee/login` - Employee login
- `GET /api/employee/profile` - Get employee profile (Protected)
- `PUT /api/employee/change-password` - Change password (Protected)
- `POST /api/employee/forgot-password` - Forgot password

### Auth Endpoints
- `POST /api/reset-password` - Reset password with token

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Protected routes
- Token expiration
- Account activation/deactivation
- Secure file uploads

## Usage

1. Start MongoDB service
2. Start the backend server
3. Start the frontend development server
4. Navigate to `http://localhost:5173`
5. Register an admin account or login with existing credentials
6. Admin can add managers, managers can add employees
7. Each role has access to their respective features

## Notes

- Make sure MongoDB is running before starting the backend
- Image uploads are stored in `backend/uploads/` directory
- All passwords must be at least 6 characters
- Email functionality requires proper SMTP configuration
- Reset password tokens expire in 10 minutes

## License

ISC

