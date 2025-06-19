import React, { useState, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRouter";
import PropertyDetail from "./components/PropertyDetail";
import Header from "./components/Header";

const LoginPage = React.lazy(() => import("./pages/LoginPage"));
const RegisterPage = React.lazy(() => import("./pages/RegisterPage"));
const DashboardPage = React.lazy(() => import("./pages/DashboardPage"));
const MapViewPage = React.lazy(() => import("./pages/MapViewPage"));
const FavoriteManager = React.lazy(
  () => import("./components/FavoriteManager")
);
const ProfilePage = React.lazy(() => import("./pages/ProfilePage"));
const HomePage = React.lazy(() => import("./pages/HomePage"));

function AppContent() {
  const [showFavorites, setShowFavorites] = useState(false);
  const location = useLocation();

  const hideHeader =
    location.pathname === "/" || location.pathname === "/register";

  return (
    <>
      {!hideHeader && (
        <Header onToggleFavorites={() => setShowFavorites(!showFavorites)} />
      )}
      <Suspense
        fallback={
          <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="animate-pulse flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary-500"></div>
              <div className="mt-4 text-primary-600 dark:text-primary-400">
                Loading...
              </div>
            </div>
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage
                  showFavorites={showFavorites}
                  setShowFavorites={setShowFavorites}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/properties/:id"
            element={
              <ProtectedRoute>
                <PropertyDetail />
              </ProtectedRoute>
            }
          />
          <Route
            path="/map"
            element={
              <ProtectedRoute>
                <MapViewPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorite"
            element={
              <ProtectedRoute>
                <FavoriteManager />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
