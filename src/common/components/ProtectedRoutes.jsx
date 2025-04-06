import { useEffect, useState } from "react";
import { Outlet, Navigate } from "react-router-dom";
import PageLoading from "../../pages/loading/PageLoading";
import useAuth from "../../hooks/useAuth";

const ProtectedRoutes = () => {
  const { auth } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {

    const timer = setTimeout(() => {
      setIsLoading(false)

    },2000)

    return () => clearTimeout(timer)

  }, [auth])


  if (isLoading) {
    return <PageLoading />;
  } else {
    return auth.accessToken ? <Outlet /> : <Navigate to="/sign_in" />;
  }
};

export default ProtectedRoutes;
