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

      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {members.map((member)=>(
            <div key={member.id} className="border border-red-700 flex gap-4">

                <div className="border w-full justify-center">
                    <img src={member.image[0]} className="w-[120px] h-[120px] object-cover border mx-auto rounded-full"/>
                </div>
                <div className="flex flex-col items-center justify-center">
                    
                <div className="flex gap-2 justify-center items-center text-[20px] font-semibold]">
                    <p>{member.first_name}</p>
                    <p>{member.last_name}</p>
                </div>
                <div className="">
                    <p className="">{member.status}</p>
                </div>
                </div>

            </div>
        ))}
      </div>
    </>
  );
}

export default Members;
