import SignUpPage from "./pages/sign_up/SignUpPage.jsx";
import SignInPage from "./pages/sign_in/SignInPage.jsx";
import SignInProcess from "./pages/sign_in/SignInProcess.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AlertProvider } from "@tdtarbo/react-alert";
import ProtectedRoutes from "./common/components/ProtectedRoutes.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import PersistLogin from "./common/components/PersistLogin.jsx";
import DashboardPage from "./pages/dashboard/DashboardPage.jsx";
import NotFound from "./pages/404/NotFound.jsx";

const App = () => {
  return (
    <div>
      <AlertProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/sign_up" element={<SignUpPage />} />
              <Route path="/sign_in" element={<SignInPage />} />
              <Route
                path="/sign_in_process/:token"
                element={<SignInProcess />}
              />

              {/* Protected Routes */}
              <Route element={<PersistLogin/>}>
                <Route element={<ProtectedRoutes />}>
                  <Route path="/*" element={<DashboardPage />} />
                </Route>
              </Route>

              <Route path="/not_found" element={<NotFound/>} />

            </Routes>
          </Router>
        </AuthProvider>
      </AlertProvider>
    </div>
  );
};

export default App;
