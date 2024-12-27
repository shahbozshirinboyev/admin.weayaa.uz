import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>

      <menu className="container mt-4 flex justify-between items-center">
        <div className="flex gap-4">
            <NavLink to="/members" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>Members</NavLink>
            <NavLink to="/design" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>Design</NavLink>
            <NavLink to="/news" className={({ isActive }) => isActive ? "btn btn-sm bg-primary text-white" : "btn btn-sm border-0" }>News</NavLink>
        </div>
        <div className="flex gap-4">
            <button className="btn btn-sm">
                <i className="bi bi-arrow-clockwise"></i>
            </button>
        </div>
      </menu>

      <Outlet />

    </>
  );
}

export default RootLayout;
