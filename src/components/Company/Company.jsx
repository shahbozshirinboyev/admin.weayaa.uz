import React, { useState } from "react";

function Company() {
    const [active, setActive] = useState(false);

  return (
    <section className="container py-4">
        <div className="flex justify-end gap-2 mb-4">
            { !active && <button onClick={()=>{setActive(true)}} className="btn btn-sm">
                <i className="bi bi-pencil"></i>
            </button>}
            { active && <button onClick={()=>{setActive()}} className="btn btn-sm bg-primary text-white hover:text-black">
                Save
            </button>}
        </div>
      <form className="grid grid-cols-2 gap-12">
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-4">
            <label className="flex flex-col">
              <span>Company logo: (black)</span>
              <img src="" alt="" />
              <input type="file" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
            </label>

            <label className="flex flex-col">
              <span>Company logo: (white)</span>
              <img src="" alt="" />
              <input type="file" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
            </label>
          </div>

          <label className="flex flex-col">
            <span>Company name:</span>
            <input type="text" value="WeaYaa" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Company slogan:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Company description:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Address:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Map link:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <span>Korean name:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Korean registration number:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Koreac CEO:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>English name:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Uzbekistan registration number:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Uzbekistan CEO:</span>
            <input type="text" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>
        </div>
      </form>
    </section>
  );
}

export default Company;
