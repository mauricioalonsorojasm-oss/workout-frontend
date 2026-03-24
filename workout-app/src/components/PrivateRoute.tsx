import { ReactNode } from "react";
import { useAuth } from "../context/AuthContext";
import LandingPage from "./LandingPage";

const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  if (!user) {
    return <LandingPage />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
