import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function RootLayout() {
  const [rotate, setRotate] = useState(false);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(20);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else {
        if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          if (hours > 0) {
            setHours(hours - 1);
            setMinutes(59);
            setSeconds(59);
          } else {
            clearInterval(interval);
          }
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [seconds, minutes, hours]);

  const handleClickRefresh = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
    setTimeout(() => window.location.reload(), 1000);
  };
  return (
    <>
      <menu className="container mt-4 flex justify-between items-center">

        <div className="flex gap-4">
          <NavLink to="/members" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"}>Members</NavLink>
          <NavLink to="/design" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"}>Design</NavLink>
          <NavLink to="/news" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"}>News</NavLink>
          <NavLink to="/company" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0"}>Company</NavLink>
        </div>

        <div className="flex gap-4">

          <span className="countdown font-mono md:text-xl flex justify-center items-center">
            <span style={{ "--value": hours }}></span>:
            <span style={{ "--value": minutes }}></span>:
            <span style={{ "--value": seconds }}></span>
          </span>

          <button onClick={() => { handleClickRefresh(); }} className={`btn btn-sm ${rotate ? 'bg-primary text-white hover:text-white border-0 hover:bg-primary' : ''}`}>
            <i className={`bi bi-arrow-clockwise flex justify-center items-center ${rotate ? 'animate-spin' : ''}`}></i>
          </button>
        </div>

      </menu>

      <Outlet />

    </>
  );
}

export default RootLayout;
