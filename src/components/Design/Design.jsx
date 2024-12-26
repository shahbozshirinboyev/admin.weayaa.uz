import supabase from "../../services/supabase";
import AddCategory from "./AddCategory";
import { useState, useEffect } from "react";
import RemoveCategory from "./RemoveCategory";

function Design() {
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);

  console.log(category);

  const getData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("design").select("*");
    if (error) {
      console.error(error);
    } else {
      setCategory(data);
      console.log(data);
    }
    setLoading(false);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container py-4 flex justify-between items-center">
        <button className="btn btn-sm">
          <i className="bi bi-house"></i>
        </button>
        <AddCategory getData={getData} />
      </div>

      <div className="container">
        {category
          .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))
          .map((category) => (
            <div key={category.id} >
              <div className="border my-4 px-4 transition-all duration-300 hover:border-sky-500">

                <div className="border my-2 p-2">

                  <div className="text-xl md:text-2xl lg:text-3xl font-bold flex gap-4 justify-between items-center">

                    <div className="flex justify-start items-center gap-4">
                      <h1 className="text-[20px]">{category?.category}</h1>
                    </div>

                    <div className="flex gap-2">
                    <button className="btn btn-sm cursor-not-allowed">
                      <i class="bi bi-pencil"></i>
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

                {/* 
                <div className="border px-2 py-1 mb-3 flex justify-start items-center">

                  <p className="font-semibold w-full flex justify-start items-center">
                    <span>Количество типов продуктов:</span>&nbsp;
                    <span className="text-red-700">{item?.types}</span>
                  </p>

                  <button
                    className="btn btn-sm"
                    onClick={() => {
                      document.getElementById("AddProductType").showModal();
                      setSelectMenuInfo({
                        menu_id: item.id,
                        types: item.types,
                      });
                    }}
                  >
                    <i className="bi bi-plus-lg"></i>
                    Добавить
                  </button>

                </div>
                 */}

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
                  <ul className="grid grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
                    {category.items.map((product, index) => (
                      <div
                        className="border hover:border-green-500 p-4 group transition-all duration-300 ease-in-out transform hover:scale-100 flex flex-col justify-between"
                        key={index}
                      >
                        <div className="flex justify-start items-start">
                          <div className="w-full">
                            <h1 className="font-semibold">{product.name}</h1>
                            <span className="font-bold opacity-40 text-[14px]">
                              {product.price}
                            </span>
                          </div>

                          {/* <div className="flex justify-center items-center gap-4">
                            <EditProductType productType={product} getData={getData} />
                            <RemoveProductType id={product.id} getData={getData} />
                          </div> */}
                        </div>
                        <div
                          //   onClick={() => {
                          //     setActiveType(false);
                          //     setActiveProducts(product.products);
                          //   }}
                          className="py-6 flex justify-center items-end mt-2 cursor-pointer"
                        >
                          <i className="bi bi-chevron-right opacity-0 group-hover:opacity-100 transition-opacity duration-300"></i>
                          <img
                            src={product.image}
                            className="mx-auto h-[50px] transition-all duration-300 ease-in-out transform group-hover:scale-110"
                            alt=""
                          />
                        </div>
                        <div className="text-justify text-[12px]">
                          {product.description}
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
