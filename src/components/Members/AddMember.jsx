import { useState } from "react";
import supabase from "../../services/supabase";

function AddMember({ getData }) {
  const [loading, setLoading] = useState(false);
  const [member, setMember] = useState({
    first_name: "",
    last_name: "",
    status: "",
  });
  const [photos, setPhotos] = useState({ urls: [], files: [] });

  const inputHandle = (e) => {
    const { name, value } = e.target;
    setMember((prevData) => ({
      ...prevData,
      [name]:  value,
    }));
  };

  const handlePhotos = (e) => {
    const files = Array.from(e.target.files);
    const urls = files.map((file) => URL.createObjectURL(file));
    setPhotos({ files, urls });
  };

  const removePhoto = (index) => {
    setPhotos((prevState) => {
      const updatedUrls = [...prevState.urls];
      const updatedFiles = [...prevState.files];
      updatedUrls.splice(index, 1);
      updatedFiles.splice(index, 1);
      return { urls: updatedUrls, files: updatedFiles };
    });
  };

  const uploadImagesAndGetUrls = async (files) => {
    const bucketName = "members";
    // Har bir faylni yuklash va URLni olish
    const uploadPromises = files.map(async (file) => {
      const filePath = `${Date.now()}_${file.name}`;
      // Rasmni yuklash
      const { error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file);
      if (error) {
        console.error("Rasm yuklashda xatolik:", error.message);
        return null; // Agar yuklashda xatolik bo'lsa, null qaytaramiz
      }
      // URL olish
      const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
      return data.publicUrl;
    });
    // Barcha va'dalarni bajarilishini kutamiz
    const urls = await Promise.all(uploadPromises);
    // URL-larni qaytaramiz
    return urls.filter((url) => url !== null); // null qiymatlarni olib tashlaymiz
  };



  const addMember = async (e) => {
    e.preventDefault();
    setLoading(true);
    let image;
    if (photos.files.length !== 0) {
      image = await uploadImagesAndGetUrls(photos.files);
    } else {
      image = ["https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg",];
    }

    const { data, error } = await supabase.from("members").insert([
      {
        first_name: member.first_name,
        last_name: member.last_name,
        status: member.status,
        image: image,
      },
    ]);

    if (error) {
      console.error(error.message);
    } else {
      getData();
      setLoading(false);
      document.getElementById("addMember").close();
      setPhotos({ urls: [], files: [] });
      setMember({
        first_name: "",
        last_name: "",
        status: "",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => document.getElementById("addMember").showModal()}
        className="btn btn-sm"
      >
        <i className="bi bi-node-plus"></i>Add Member
      </button>

      <dialog id="addMember" className="modal">
        <div className="modal-box max-w-2xl">
          <>
            <form onSubmit={addMember}>
              <div className="flex gap-4">
                <label
                  htmlFor="selectPhotos"
                  className="flex-shrink-0 w-[120px] h-[120px] flex flex-col border border-dashed rounded-xl justify-center p-4 cursor-pointer select-none"
                >
                  <div className="flex flex-col items-center">
                    <span
                      className={`${photos.urls.length === 0 ? "" : "hidden"}`}
                    >
                      <i className="bi bi-person-bounding-box text-[45px] opacity-50"></i>
                    </span>
                  </div>
                  <div className="flex flex-wrap justify-center items-center gap-4">
                    {photos.urls.map((photo, index) => (
                      <div key={index} className="relative">
                        <span
                          onClick={(e) => {
                            e.preventDefault();
                            removePhoto(index);
                          }}
                          className="absolute -right-2 -top-2 bg-white hover:bg-red-100 w-[25px] h-[25px] border border-red-100 rounded-full p-1 flex justify-center items-center text-[10px]"
                        >
                          ❌
                        </span>
                        <img
                          src={photo}
                          className="w-[100px] h-[100px] object-cover border border-red-100"
                        />
                      </div>
                    ))}
                  </div>
                  <input
                    id="selectPhotos"
                    className="hidden"
                    type="file"
                    name="photos"
                    multiple
                    onChange={handlePhotos}
                  />
                </label>

                <div className="w-full">
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex flex-col w-full mb-2">
                      <span className="text-[15px]">First Name:</span>
                      <input
                        type="text"
                        name="first_name"
                        placeholder="First Name"
                        value={member.first_name}
                        onChange={inputHandle}
                        className="border px-2 py-1"
                      />
                    </label>
                    <label className="flex flex-col w-full mb-2">
                      <span className="text-[15px]">Last Name:</span>
                      <input
                        type="text"
                        name="last_name"
                        placeholder="Last Name"
                        value={member.last_name}
                        onChange={inputHandle}
                        className="border px-2 py-1"
                      />
                    </label>
                  </div>

                  <label className="flex flex-col w-full mb-2">
                    <span className="text-[15px]">Status:</span>
                    <input
                      type="text"
                      name="status"
                      placeholder="CEO | Designer | Coder"
                      value={member.status}
                      onChange={inputHandle}
                      className="border px-2 py-1"
                    />
                  </label>
                </div>
              </div>

              

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

export default AddMember;
