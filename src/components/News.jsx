import { useEffect, useState } from "react";
import supabase from "../services/supabase";

function News() {
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);

  const getData = async () => {
    const { data, error } = await supabase.from("news").select("*");
    if (error) {
      console.error(error);
    } else {
      setNews(data);
      console.log(data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="container py-4 flex justify-between items-center">
        <button className="btn btn-sm"><i className="bi bi-house"></i></button>
        <button className="btn btn-sm"><i className="bi bi-node-plus"></i> Add News</button>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {news
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((news) => (
            <div key={news.id} className="border p-2 rounded-md">
              <div className="flex justify-between items-center pb-2">
                <button className="btn btn-sm"><i className="bi bi-pencil"></i></button>
                <button className="btn btn-sm"><i className="bi bi-trash"></i></button>
              </div>
              <div>
                
                  <div className={`border h-[110px] border-dashed rounded-md p-2 flex ${news.images.length === 1 ? "justify-center" : "justify-start"} items-center overflow-hidden overflow-x-auto gap-4`}>
                    {news.images.map((url, index)=>(
                      <img key={index} src={url} className="h-[80px] my-auto rounded-md" />
                    ))}
                  </div>
                
              </div>
              <div className="py-4">
              <p className="font-semibold">{news.title}</p>
              <div className="flex justify-between items-center">
                <p className="text-[12px]">Post on <span className="font-semibold">{new Date(news.created_at).toLocaleDateString('ru-RU')}</span> by <span className="font-semibold">{news.by}</span></p>
                <a href={news.link} target="_blank" className="text-[12px] font-semibold hover:text-sky-600"><i className="bi bi-link-45deg"></i> Read More</a>
              </div>
              </div>
              <div className="py-4">
                <p className="text-justify text-[13px] line-clamp-4">{news.description}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default News;
