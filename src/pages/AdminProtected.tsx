import { Navigate } from 'react-router-dom';
import AdminPage from './Admin';
import { isAdminAuthenticated } from '@/lib/adminAuth';

export default function AdminProtected() {
  const authed = isAdminAuthenticated();

  if (!authed) {
    return <Navigate to="/admin-login" replace />;
  }

  return <AdminPage />;
}


