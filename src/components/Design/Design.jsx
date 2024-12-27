import supabase from "../../services/supabase";
import AddCategory from "./AddCategory";
import { useState, useEffect } from "react";
import RemoveCategory from "./RemoveCategory";
import AddItem from "./AddItem";
import EditItem from "./EditItem";
import RemoveItem from "./RemoveItem";

function Design() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  // console.log(category);

  const getData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("design").select("*");
    if (error) {
      console.error(error);
    } else {
      setCategory(data);
      // console.log(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container py-4 flex justify-between items-center">
        <button className="btn btn-sm invisible">
          <i className="bi bi-house"></i>
        </button>
        <AddCategory getData={getData} />
      </div>

      <div className="container">

      {loading && (
        <div className="flex justify-center items-center py-4">
          <span className="loading loading-spinner"></span>
          <span className="ml-2 font-semibold">Loading...</span>
        </div>
      )}

      <div>
        {!loading && category.length === 0 ? (
          <div className="flex justify-center items-center py-4">
            {" "}
            <i className="bi bi-database-fill-x mr-2"></i> <span>No data</span>
          </div>
        ) : (
          ""
        )}
      </div>

        {category
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((category) => (
            <div key={category.id}>
              <div className="border my-4 px-4 transition-all duration-300 hover:border-sky-500">
                <div className="border my-2 p-2">
                  <div className="text-xl md:text-2xl lg:text-3xl font-bold flex gap-4 justify-between items-center">
                    <div className="flex justify-start items-center gap-4">
                      <h1 className="text-[20px]">{category?.category}</h1>
                    </div>

                    <div className="flex gap-2">
                      <AddItem category={category} getData={getData} />

                      <button className="btn btn-sm cursor-not-allowed">
                        <i className="bi bi-pencil"></i>
                      </button>

                      <RemoveCategory id={category.id} getData={getData} />
                    </div>
                  </div>

                  <div className="flex py-2">
                    <p className="text-[14px] w-full text-justify">
                      {category?.description}
                    </p>
                  </div>
                </div>

                {/* Furniture type END */}
                {category.items.length === 0 ? (
                  <div className="text-center my-8 flex justify-center items-center gap-2">
                    <i className="bi bi-database"></i>
                    <span>No Data</span>
                  </div>
                ) : (
                  ""
                )}

                {category?.items && (
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 pb-4">
                    {category.items.map((item) => (
                      <div
                        className="border hover:border-green-500 p-4 group transition-all duration-300 ease-in-out transform hover:scale-100 flex flex-col justify-between"
                        key={item.id}
                      >
                        <div className="flex justify-start items-start">
                          <div className="w-full">
                            <h1 className="font-semibold">{item.name}</h1>
                            <span className="font-bold opacity-40 text-[14px]">
                              {item.price}
                            </span>
                          </div>

                          <div className="flex justify-center items-center gap-2">
                            <EditItem />
                            <RemoveItem id={item.id} getData={getData} />
                          </div>
                        </div>
                        <div
                          className="py-6 flex justify-center items-end mt-2 cursor-pointer"
                        >
                          <img
                            src={item.thumb}
                            className="mx-auto h-[50px] transition-all duration-300 ease-in-out transform"
                            alt=""
                          />
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-4">
                          {item.images.map((image, index) => (
                            <img
                              key={index}
                              src={image}
                              className="mx-auto h-[50px] transition-all duration-300 ease-in-out transform"
                              alt=""
                            />
                          ))}
                        </div>
                        <div className="text-justify text-[12px] mt-4">
                          {item.description}
                        </div>
                      </div>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Design;
