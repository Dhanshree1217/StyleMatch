import { Navigate } from 'react-router-dom';
import { getSession } from '../utils/storage';

export default function ProtectedRoute({ children }) {
  const session = getSession();
  return session ? children : <Navigate to="/login" replace />;
}
