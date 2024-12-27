import React, { useState, useEffect } from "react";
import supabase from "../../services/supabase";

function Company() {
    const [active, setActive] = useState(false);
    const [loading, setLoading] = useState(false);
    const [companyInfo, setCompanyInfo] = useState([]);

    const getData = async () => {
        setLoading(true);
        const { data, error } = await supabase.from("company_info").select("*").single();
        if (error) { console.error(error); } else { setCompanyInfo(data); }
        setLoading(false);
      };
      useEffect(() => { getData(); }, []);

      const inputHandle = (e) => {
        const { name, value } = e.target;
        setCompanyInfo((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      };

      console.log(companyInfo);

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
      <form className="grid grid-cols-1 md:grid-cols-2 gap-12">
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
            <input type="text" value={companyInfo?.name} onChange={inputHandle} name="name" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Company slogan:</span>
            <input type="text" value={companyInfo?.slogan} onChange={inputHandle} name="slogan" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Company description:</span>
            <textarea rows={5} type="text" value={companyInfo?.description} onChange={inputHandle} name="description" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Address:</span>
            <input type="text" value={companyInfo?.address} onChange={inputHandle} name="address" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Map link:</span>
            <input type="text" value={companyInfo?.map_link} onChange={inputHandle} name="map_link"  className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>
        </div>

        <div className="flex flex-col gap-2">
          <label className="flex flex-col">
            <span>Korean name:</span>
            <input type="text" value={companyInfo?.korean_name} onChange={inputHandle} name="korean_name" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Korean registration number:</span>
            <input type="text" value={companyInfo?.registration_number_kr} onChange={inputHandle} name="registration_number_kr" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Koreac CEO:</span>
            <input type="text" value={companyInfo?.ceo_korean} onChange={inputHandle} name="ceo_korean" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>English name:</span>
            <input type="text" value={companyInfo?.english_name} onChange={inputHandle} name="english_name" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Uzbekistan registration number:</span>
            <input type="text" value={companyInfo?.registration_number_uzb} onChange={inputHandle} name="registration_number_uzb" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>

          <label className="flex flex-col">
            <span>Uzbekistan CEO:</span>
            <input type="text" value={companyInfo?.ceo_uzb} onChange={inputHandle} name="ceo_uzb" className={`border rounded-lg px-2 py-1 ${ active ? "" : "border-0"}`} disabled={!active} />
          </label>
        </div>
      </form>
    </section>
  );
}

export default Company;
