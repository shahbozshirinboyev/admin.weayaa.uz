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
        <button className="btn btn-sm">Home</button>
        <button className="btn btn-sm">+ Add News</button>
      </div>

      <div className="container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {news
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((news) => (
            <div key={news.id} className="border p-2">
                <div className="flex justify-between items-center">
                    <button className="btn btn-sm">Edit</button>
                    <button className="btn btn-sm">Delete</button>
                </div>
              <p>{news.title}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default News;
