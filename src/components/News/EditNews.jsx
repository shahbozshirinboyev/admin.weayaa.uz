import supabase from "../../services/supabase";

function EditNews({ news, getData }) {
  return (
    <>
      <button className="btn btn-sm cursor-not-allowed">
        <i className="bi bi-pencil"></i>
      </button>
    </>
  );
}

export default EditNews;
