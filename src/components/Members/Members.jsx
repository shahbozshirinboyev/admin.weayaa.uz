import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import AddMember from "./AddMember";

function Members() {
  const [loading, setLoading] = useState(false);
  const [members, setMembers] = useState([]);

  const getData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("members").select("*");
    if (error) {
      console.error(error);
    } else {
      setMembers(data);
      console.log(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container py-4 flex justify-between">
        <button className="btn btn-sm">
          <i className="bi bi-house"></i>
        </button>
        <AddMember getData={getData} />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <span className="loading loading-spinner"></span>
          <span className="ml-2 font-semibold">Loading...</span>
        </div>
      )}

      <div>
        {!loading && members.length === 0 ? (
          <div className="flex justify-center items-center py-12">
            {" "}
            <i className="bi bi-database-fill-x mr-2"></i> <span>No data</span>
          </div>
        ) : (
          ""
        )}

      </div>
    </>
  );
}

export default Members;
