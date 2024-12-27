import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <>

      <menu className="container mt-4 flex gap-4">
        <NavLink to="/news" className="btn btn-sm">News</NavLink>
        <NavLink to="/design" className="btn btn-sm">Design</NavLink>
        <NavLink to="/members" className="btn btn-sm">Members</NavLink>
      </menu>

      <Outlet />

    </>
  );
}

export default RootLayout;
