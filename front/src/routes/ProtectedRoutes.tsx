/* eslint-disable @typescript-eslint/no-explicit-any */
// In ProtectedRoutes.js
import { Navigate, Outlet } from "react-router-dom";
const ProtectedRoutes = ({ auth }: any) => {
  return auth === true ? <Outlet /> : <Navigate to="/" replace />;
};
export default ProtectedRoutes;
