import { useNavigate } from "react-router-dom";
function ErrorPage() {
  const navigate = useNavigate();
  return (
    <div className="container py-12 flex flex-col gap-4">
      <p className="px-1 font-medium">Error 404</p>
      <button onClick={() => navigate("/")} className="btn btn-sm w-[100px] text-white bg-primary hover:text-black hover:bg-white">
        <i className="bi bi-arrow-left"></i>
        <span>Home</span>
      </button>
    </div>
  );
}

export default ErrorPage;
