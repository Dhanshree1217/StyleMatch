import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import MyWardrobe from './pages/MyWardrobe';
import MyStyle from './pages/MyStyle';
import MyColorProfile from './pages/MyColorProfile';
import CategoryPage from './pages/CategoryPage';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/"                element={<Home />} />
          <Route path="/signup"          element={<Signup />} />
          <Route path="/login"           element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password"  element={<ResetPassword />} />
          <Route path="/dashboard"       element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/wardrobe"        element={<ProtectedRoute><MyWardrobe /></ProtectedRoute>} />
          <Route path="/style"           element={<ProtectedRoute><MyStyle /></ProtectedRoute>} />
          <Route path="/color-profile"   element={<ProtectedRoute><MyColorProfile /></ProtectedRoute>} />
          <Route path="/category/:categoryId" element={<ProtectedRoute><CategoryPage /></ProtectedRoute>} />
          <Route path="*"                element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
