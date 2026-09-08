import { useOutletContext, Navigate } from "react-router-dom";
import Loader from "./Loader";

export default function PrivateRoute({ children }) {
  const { isLoggedIn, isAuthLoading } = useOutletContext();
  if (isAuthLoading) {
    return <Loader></Loader>;
  } else if (!isLoggedIn) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
}
