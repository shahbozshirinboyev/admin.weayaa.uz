import { NavLink, Outlet } from "react-router-dom";
import { useState, useEffect } from "react";

function RootLayout() {
  const [rotate, setRotate] = useState(false);
  const [counter, setCounter] = useState(24);

  useEffect(() => {
    const interval = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);  // counterni 1 ga kamaytirish
      }
    }, 1000);

    return () => clearInterval(interval);  // Komponent unmonting bo'lganda intervalni to'xtatish
  }, [counter]);

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
          
        {/* <span className="countdown font-mono text-2xl">
          <span style={`{"--value":10}`}></span>:
          <span style={`{"--value":24}`}></span>:
          <span style={`{"--value":${counter}}`}></span>
        </span> */}

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
