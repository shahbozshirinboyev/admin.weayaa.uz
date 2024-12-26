import supabase from "../../services/supabase";
import { useState } from "react";

function RemoveCategory({ id, getData }) {
  const [loading, setLoading] = useState(false);

  async function deleteRowById(id) {
    setLoading(true);
    const { data, error } = await supabase.from("design").delete().eq("id", id);

    if (error) {
      console.error(error.message);
    } else {
      getData();
      setLoading(false);
      document.getElementById(`RemoveCategory${id}`).close();
      // console.log(data);
    }
  }

  return (
    <>
      <button
        onClick={() => { document.getElementById(`RemoveCategory${id}`).showModal(); }}
        className="btn btn-sm"
      >
        <i className="bi bi-trash"></i>
      </button>

      <dialog id={`RemoveCategory${id}`} className="modal">
        <div className="modal-box">
          <h6 className="pb-4 text-[16px] font-semibold">Delete Category?</h6>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                deleteRowById(id);
              }}
              className="btn btn-sm"
            >
              <span className={`${loading ? "hidden" : ""}`}>Delete</span>
              <div
                className={`flex justify-center items-center gap-3 ${
                  loading ? "" : "hidden"
                }`}
              >
                <span className="loading loading-spinner loading-xs"></span>
                Deleting...
              </div>
            </button>
            <button
              onClick={() => {
                document.getElementById(`RemoveCategory${id}`).close();
              }}
              className="btn btn-sm"
            >
              Close
            </button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default RemoveCategory;
