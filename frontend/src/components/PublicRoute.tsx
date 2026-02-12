import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) {
    return <Navigate to="/typing" replace />;
  }
  return <>{children}</>;
};
