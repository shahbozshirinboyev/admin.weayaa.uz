import { useState, useEffect } from "react";
import supabase from "../../services/supabase";
import AddMember from "./AddMember";
import RemoveMember from "./RemoveMember";
import EditMember from "./EditMember";

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
      // console.log(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container py-4 flex justify-between">
        <button className="btn btn-sm invisible">
          <i className="bi bi-house"></i>
        </button>
        <AddMember getData={getData} />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-4">
          <span className="loading loading-spinner"></span>
          <span className="ml-2 font-semibold">Loading...</span>
        </div>
      )}

      <div>
        {!loading && members.length === 0 ? (
          <div className="flex justify-center items-center py-4">
            {" "}
            <i className="bi bi-database-fill-x mr-2"></i> <span>No data</span>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 pb-4">
        {members.map((member) => (
          <div
            key={member.id}
            className="border rounded-md flex justify-between gap-4 p-2"
          >
            <div className="flex gap-4">
              <div className="w-[120px] justify-center items-center">
                <img
                  src={member.image[0]}
                  className="w-[100px] h-[100px] object-cover border mx-auto rounded-full"
                />
              </div>

              <div className="flex flex-col justify-center font-semibold">
                <p>First Name: {member.first_name}</p>
                <p>Last Name: {member.last_name}</p>
                <p>Status: {member.status}</p>
              </div>
            </div>

            <div className="flex flex-col justify-between">
              <EditMember getData={getData} member={member} />
              <RemoveMember getData={getData} id={member.id} />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default Members;
