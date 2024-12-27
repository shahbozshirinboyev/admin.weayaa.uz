import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import News from "./components/News/News";
import Members from "./components/Members/Members";
import Design from "./components/Design/Design";
import Company from "./components/Company/Company";
import SignIn from "./pages/SignIn";
import ErrorPage from "./pages/ErrorPage";

// Protected Route wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') && localStorage.getItem('timerEndTime');
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn');
      const timerEndTime = localStorage.getItem('timerEndTime');
      
      if (isLoggedIn && timerEndTime) {
        const now = new Date().getTime();
        if (now < parseInt(timerEndTime)) {
          setIsAuthenticated(true);
        } else {
          // Timer expired
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('timerEndTime');
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
    // Check auth status every minute
    const interval = setInterval(checkAuth, 60000);
    return () => clearInterval(interval);
  }, []);

  const routes = createBrowserRouter([
    {
      path: "/",
      element: isAuthenticated ? (
        <Navigate to="/members" replace />
      ) : (
        <SignIn setIsAuthenticated={setIsAuthenticated} />
      ),
      errorElement: <ErrorPage />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayout setIsAuthenticated={setIsAuthenticated} />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "members",
          element: <Members />,
        },
        {
          path: "design",
          element: <Design />,
        },
        {
          path: "news",
          element: <News />,
        },
        {
          path: "company",
          element: <Company />,
        },
      ],
    },
  ]);

  return <RouterProvider router={routes} />;
}
export default App;