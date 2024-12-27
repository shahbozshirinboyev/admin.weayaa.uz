import supabase from "../../services/supabase";
import { useState, useEffect } from "react";

function RemoveItem({ id, getData }) {
  const [loading, setLoading] = useState(false);

  const removeTypeByIdFromAllRows = async (typeIdToDelete) => {
    setLoading(true);
    try {
      // 1. Jadvaldagi barcha qatorlarni olish
      const { data: allData, error: fetchError } = await supabase
        .from("design") // jadval nomi
        .select("id, items"); // "id" va "types" ustunlari

      if (fetchError) {
        throw fetchError;
      }

      // 2. Har bir qatorni tekshirib, kerakli ID ni o'chirish
      for (const row of allData) {
        const { id, items } = row;

        // Agar types mavjud bo'lsa va ichida kerakli ID bo'lsa
        if (items && items.some((item) => item.id === typeIdToDelete)) {
          // ID bo'yicha filter qilib yangilangan types massivini yaratish
          const updatedTypes = items.filter(
            (item) => item.id !== typeIdToDelete
          );

          // 3. Yangilangan "types" ni saqlash
          const { error: updateError } = await supabase
            .from("design") // jadval nomi
            .update({ items: updatedTypes }) // yangilangan types
            .eq("id", id); // qatorning ID si

          if (updateError) {
            console.error(`Error updating row ${id}:`, updateError.message);
          } else {
            console.log(`Row ${id} updated successfully.`);
          }
        }
      }

      console.log("All rows checked and updated.");
    } catch (error) {
      console.error("Error:", error.message);
    }
    getData();
    setLoading(false);
  };
  return (
    <>
      <button
        onClick={() => {
          document.getElementById(`modal_${id}`).showModal();
        }}
        className="btn btn-sm"
      >
        <i className="bi bi-trash"></i>
      </button>

      <dialog id={`modal_${id}`} className="modal">
        <div className="modal-box font-semibold">
          <h6 className="pb-4 text-[16px]">Delete this item?</h6>
          <div className="flex justify-center gap-8">
            <button
              onClick={() => {
                removeTypeByIdFromAllRows(id);
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
                document.getElementById(`modal_${id}`).close();
              }}
              className="btn btn-sm"
            >
              Cancel
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

export default RemoveItem;
