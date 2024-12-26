import supabase from "../../services/supabase";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";

function AddItem({category, getData}) {
  const [loading, setLoading] = useState(false);

  const [photos, setPhotos] = useState({ urls: [], files: [] });

  const [thumb, setThumb] = useState({ file: "", url: "" });
  const handleThumb = (e) => {
    if (e.target.files[0]) {
      setThumb({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };
  const [item, setItem] = useState({
    id: uuidv4(),
    name: "",
  });
  const inputHandle = (e) => {
    const { name, value } = e.target;
    setItem((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const uploadImageAndGetUrl = async (file) => {
    const bucketName = "design";
    const filePath = `${Date.now()}_${file.name}`;

    // Rasmni yuklash
    const { error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file);

    if (error) {
      console.error(error.message);
      return null;
    }
    // URL olish
    const { data } = supabase.storage.from(bucketName).getPublicUrl(filePath);
    return data.publicUrl;
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
    const bucketName = "design";
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

  const addItem = async (e) => {
    e.preventDefault();
    setLoading(true);

    let thumb2;
    if (thumb.file !== "") {
      thumb2 = await uploadImageAndGetUrl(thumb.file);
    } else {
      thumb2 = "https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg";
    }
    let images;
    if (photos.files.length !== 0) {
      images = await uploadImagesAndGetUrls(photos.files);
    } else {
      images = [ "https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg", ];
    }
    const { data, error } = await supabase
      .from("design")
      .update({
        items: [
          ...(category.items || []),
          { ...item, thumb: thumb2, created_at: new Date().toISOString(), images: images },
        ],
      })
      .eq("id", category.id);

    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Data updated:", data);
      document.getElementById("addItem").close();
      setItem({
        id: uuidv4(),
        name: "",
      })
      setThumb({ file: "", url: "" });
      setPhotos({ urls: [], files: [] });
      getData();
    }
    setLoading(false);
  };

  return (
    <>
      <button onClick={() => document.getElementById("addItem").showModal()} className="btn btn-sm">
        <i className="bi bi-plus-lg"></i>
      </button>

      <dialog id="addItem" className="modal font-normal text-[14px]">
        <div className="modal-box max-w-2xl">
          <>
            <form onSubmit={addItem}>
              <div className="flex justify-start items-center">
                <div className="border-black border border-dotted w-[140px] h-[140px] flex-shrink-0 flex flex-col justify-center items-center">
                  <img
                    src={thumb.url}
                    alt=""
                    className={`${
                      thumb.url ? "" : "hidden"
                    } w-auto h-[90px] object-cover mb-1`}
                  />
                  <p className={`text-[11px] py-1 ${thumb.url ? "hidden" : ""}`}>
                  Выбрать только PNG/JPG
                  </p>
                  <label
                    className={`text-[12px] btn btn-xs ${thumb.url ? "" : ""}`}
                    htmlFor="selectpng"
                  >
                    Выбрать PNG/JPG
                  </label>
                  <input
                    className="hidden"
                    accept=".jpg, .jpeg, .png"
                    type="file"
                    id="selectpng"
                    onChange={handleThumb}
                  />
                </div>
                <div className="flex flex-col px-6 w-full">
                  <label htmlFor="" className="flex flex-col">
                    <span>Названия:</span>
                    <input
                      name="name"
                      value={item.name}
                      onChange={inputHandle}
                      className="border px-2 py-1"
                      placeholder="Угловые диваны"
                      type="text"
                    />
                  </label>
                 
                </div>
              </div>
              <label
                htmlFor="selectPhotos"
                className="mb-3 flex flex-col border border-dashed rounded-xl justify-start p-4 cursor-pointer select-none"
              >
                <div className="flex flex-col items-center">
                  <span
                    className={`text-[14px] md:text-[16px] font-medium ${
                      photos.urls.length === 0 ? "" : "hidden"
                    }`}
                  >
                    Добавьте фото
                  </span>
                  <span
                    className={`${
                      photos.urls.length === 0 ? "" : "hidden"
                    } text-[12px] md:text-[14px]`}
                  >
                    Перетащите сюда или{" "}
                    <span className="text-sky-600">выберите на компьютере</span>
                  </span>
                </div>
                <div className="flex flex-wrap justify-start items-center gap-4">
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
                        className="w-[70px] h-[70px] border border-red-100"
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
             
              <button className="btn btn-sm mt-3 w-full">
                <span className={`${loading ? "hidden" : ""}`}>Добавить</span>
                <div
                  className={`flex justify-center items-center gap-3 ${
                    loading ? "" : "hidden"
                  }`}
                >
                  <span className="loading loading-spinner loading-xs"></span>
                  Добавляется...
                </div>
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

export default AddItem;
