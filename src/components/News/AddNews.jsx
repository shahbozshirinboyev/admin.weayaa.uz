import supabase from "../../services/supabase";
import { useState } from "react";

function AddNews({ getData }) {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState({
    title: "",
    by: "",
    link: "",
    description: "",
  });
  const [photos, setPhotos] = useState({ urls: [], files: [] });

  const inputHandle = (e) => {
    const { name, value, type } = e.target;
    setNews((prevData) => ({
      ...prevData,
      [name]: type === "radio" ? value === "true" : value,
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
    const bucketName = "news";
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

  const [desImg, setDesImg] = useState({ file: "", url: "" });

  const handleDesImg = (e) => {
    if (e.target.files[0]) {
      setDesImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const addNews = async (e) => {
    e.preventDefault();
    setLoading(true);

    let images_news;
    if (photos.files.length !== 0) {
      images_news = await uploadImagesAndGetUrls(photos.files);
    } else {
      images_news = [
        "https://static.vecteezy.com/system/resources/thumbnails/008/695/917/small_2x/no-image-available-icon-simple-two-colors-template-for-no-image-or-picture-coming-soon-and-placeholder-illustration-isolated-on-white-background-vector.jpg",
      ];
    }

    const { data, error } = await supabase.from("news").insert([
      {
        title: news.title,
        by: news.by,
        link: news.link,
        description: news.description,
        images: images_news,
      },
    ]);

    if (error) {
      console.error("Xatolik:", error.message);
    } else {
      getData();
      setLoading(false);
      document.getElementById("addNews").close();
      setPhotos({ urls: [], files: [] });
      setNews({
        title: "",
        by: "",
        link: "",
        description: "",
      });
    }

    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => document.getElementById("addNews").showModal()}
        className="btn btn-sm"
      >
        <i className="bi bi-node-plus"></i>Add News
      </button>

      <dialog id="addNews" className="modal">
        <div className="modal-box max-w-2xl">
          <>
            <form onSubmit={addNews}>
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
                    Add a photo
                  </span>
                  <span
                    className={`${
                      photos.urls.length === 0 ? "" : "hidden"
                    } text-[12px] md:text-[14px]`}
                  >
                    Drag here or{" "}
                    <span className="text-sky-600">select from computer</span>
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

              <label className="flex flex-col w-full mb-2">
                <span className="text-[15px]">Title:</span>
                <input
                  type="text"
                  name="title"
                  placeholder="News title"
                  value={news.title}
                  onChange={inputHandle}
                  className="border px-2 py-1"
                />
              </label>

              <div className="grid grid-cols-2 gap-4">
                <label className="flex flex-col w-full mb-2">
                  <span className="text-[15px]">by:</span>
                  <input
                    type="text"
                    name="by"
                    placeholder="by WeaYaa"
                    value={news.by}
                    onChange={inputHandle}
                    className="border px-2 py-1"
                  />
                </label>
                <label className="flex flex-col w-full mb-2">
                  <span className="text-[15px]">Link:</span>
                  <input
                    type="text"
                    name="link"
                    placeholder="https://weayaa.uz/news/4.html"
                    value={news.link}
                    onChange={inputHandle}
                    className="border px-2 py-1"
                  />
                </label>
              </div>

              <label className="flex flex-col w-full mb-2">
                <span className="text-[15px]">Description:</span>
                <textarea
                  rows={5}
                  type="text"
                  name="description"
                  placeholder="Description of News"
                  value={news.description}
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

export default AddNews;
