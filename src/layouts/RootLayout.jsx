import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import toast, { Toaster } from 'react-hot-toast';

function RootLayout({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const [rotate, setRotate] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(0);

  const logout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('timerEndTime');
    setIsAuthenticated(false);
    navigate('/', { replace: true });
  };

  useEffect(() => {
    const timerEndTime = localStorage.getItem('timerEndTime');
    
    if (!timerEndTime) {
      logout();
      return;
    }

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const endTime = parseInt(timerEndTime);
      const timeLeft = endTime - now;

      if (timeLeft <= 0) {
        clearInterval(interval);
        toast.error('Session expired. Please Sign In again.');
        logout();
        return;
      }

      // Calculate remaining time
      const hoursLeft = Math.floor(timeLeft / (1000 * 60 * 60));
      const minutesLeft = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const secondsLeft = Math.floor((timeLeft % (1000 * 60)) / 1000);

      // Show warning when 1 minute left
      if (hoursLeft === 0 && minutesLeft === 1 && secondsLeft === 0) {
        toast.promise('Warning! The session will expire in 1 minute.');
      }

      setHours(hoursLeft);
      setMinutes(minutesLeft);
      setSeconds(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [navigate]);

  const handleClickRefresh = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
    setTimeout(() => window.location.reload(), 1000);
  };

  return (
    <>
    <Toaster />
      <menu className="container mt-4 flex justify-between items-center">
        <div className="flex gap-4">
          <NavLink
            to="/members"
            className={({ isActive }) =>
              isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"
            }
          >
            Members
          </NavLink>
          <NavLink
            to="/design"
            className={({ isActive }) =>
              isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"
            }
          >
            Design
          </NavLink>
          <NavLink
            to="/news"
            className={({ isActive }) =>
              isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"
            }
          >
            News
          </NavLink>
          <NavLink
            to="/company"
            className={({ isActive }) =>
              isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"
            }
          >
            Company
          </NavLink>
        </div>

        <div className="flex gap-4 items-center text-red-700">
          <span className="countdown font-mono md:text-xl flex justify-center items-center">
            <span style={{ "--value": hours }}></span>:
            <span style={{ "--value": minutes }}></span>:
            <span style={{ "--value": seconds }}></span>
          </span>

          <button
            onClick={handleClickRefresh}
            className={`btn btn-sm ${
              rotate
                ? "bg-primary text-white hover:text-white border-0 hover:bg-primary"
                : ""
            }`}
          >
            <i
              className={`bi bi-arrow-clockwise flex justify-center items-center ${
                rotate ? "animate-spin" : ""
              }`}
            />
          </button>

          <button
            onClick={logout}
            className="btn btn-sm"
          >
            <i className="bi bi-box-arrow-right" />
          </button>
        </div>
      </menu>

      <Outlet />
    </>
  );
}

export default RootLayout;