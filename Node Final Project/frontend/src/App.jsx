import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Home from './pages/Home';
import AdminLogin from './pages/Admin/AdminLogin';
import AdminRegister from './pages/Admin/AdminRegister';
import AdminDashboard from './pages/Admin/AdminDashboard';
import AdminProfile from './pages/Admin/AdminProfile';
import Managers from './pages/Admin/Managers';
import Employees from './pages/Admin/Employees';
import ManagerLogin from './pages/Manager/ManagerLogin';
import ManagerDashboard from './pages/Manager/ManagerDashboard';
import ManagerProfile from './pages/Manager/ManagerProfile';
import EmployeeLogin from './pages/Employee/EmployeeLogin';
import EmployeeProfile from './pages/Employee/EmployeeProfile';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/register" element={<AdminRegister />} />
          <Route path="/admin/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/profile"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <AdminProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/managers"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Managers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/employees"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Employees />
              </ProtectedRoute>
            }
          />

          {/* Manager Routes */}
          <Route path="/manager/login" element={<ManagerLogin />} />
          <Route path="/manager/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/manager/dashboard"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/manager/profile"
            element={
              <ProtectedRoute allowedRoles={['manager']}>
                <ManagerProfile />
              </ProtectedRoute>
            }
          />

          {/* Employee Routes */}
          <Route path="/employee/login" element={<EmployeeLogin />} />
          <Route path="/employee/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/employee/profile"
            element={
              <ProtectedRoute allowedRoles={['employee']}>
                <EmployeeProfile />
              </ProtectedRoute>
            }
          />

          {/* Password Reset */}
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
