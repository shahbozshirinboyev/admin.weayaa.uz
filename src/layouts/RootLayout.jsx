import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";

function RootLayout() {
    const [rotate, setRotate] = useState(false);

  const handleClickRefresh = () => {
    setRotate(true);
    setTimeout(() => setRotate(false), 1000);
    setTimeout(() =>  window.location.reload(), 1000);
  };
  return (
    <>

      <menu className="container mt-4 flex justify-between items-center">
        <div className="flex gap-4">
            <NavLink to="/members" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>Members</NavLink>
            <NavLink to="/design" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>Design</NavLink>
            <NavLink to="/news" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>News</NavLink>
            <NavLink to="/company" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>Company</NavLink>
        </div>
        <div className="flex gap-4">
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
