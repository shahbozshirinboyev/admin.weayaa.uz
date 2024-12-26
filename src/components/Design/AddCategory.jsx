import supabase from "../../services/supabase";
import { useState } from "react";

function AddCategory({getData}) {

    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState({ category: "", description: "", });
    const [photos, setPhotos] = useState({ urls: [], files: [] });
  
    const inputHandle = (e) => {
      const { name, value, type } = e.target;
      setCategory((prevData) => ({
        ...prevData,
        [name]: type === "radio" ? value === "true" : value,
      }));
    };
  
    const addCategory = async (e) => {
      e.preventDefault();
      setLoading(true);
  
      const { data, error } = await supabase.from("design").insert([
        {
          category: category.category,
          description: category.description,
          items: []
        },
      ]);
  
      if (error) {
        console.error(error.message);
      } else {
        getData();
        setLoading(false);
        document.getElementById("addCategory").close();
        setCategory({ category: "", description: "", });
      }
      setLoading(false);
    };

  return (
    <>
      <button
        onClick={() => document.getElementById("addCategory").showModal()}
        className="btn btn-sm"
      >
        <i className="bi bi-node-plus"></i>Add Category
      </button>

      <dialog id="addCategory" className="modal">
        <div className="modal-box max-w-xl">
          <>
            <form onSubmit={addCategory}>

              <label className="flex flex-col w-full mb-2">
                <span className="text-[15px]">Category name:</span>
                <input
                  type="text"
                  name="category"
                  placeholder="Category name..."
                  value={category.category}
                  onChange={inputHandle}
                  className="border px-2 py-1"
                />
              </label>

             

              <label className="flex flex-col w-full mb-2">
                <span className="text-[15px]">Category description:</span>
                <textarea
                  rows={3}
                  type="text"
                  name="description"
                  placeholder="Category description..."
                  value={category.description}
                  onChange={inputHandle}
                  className="border px-2 py-1"
                ></textarea>
              </label>

              <button type="submit" className="mt-3 btn btn-sm w-full">
                <span className={`${loading ? "hidden" : ""}`}>Add</span>
                <span
                  className={`justify-center items-center gap-3 ${
                    loading ? "flex" : "hidden"
                  }`}
                >
                  <span className="loading loading-spinner loading-sm"></span>
                  <span>Adding...</span>
                </span>
              </button>
            </form>
          </>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AddCategory;
