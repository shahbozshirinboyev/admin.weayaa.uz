import { useState } from "react";

function SignIn({ login, setLogin }) {
    const [loading, setLoading] = useState(false);
    const [logInfo, setLogInfo] = useState({ username: "", password: "" })

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setLogInfo((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

  const Login = (e) => {
    setLoading(true);
    e.preventDefault();
    setTimeout(() => {
        if(logInfo.username === "Jahongir" && logInfo.password === '12345'){
            localStorage.setItem('login', 'true');
            setLogin('true');
        }else{
            alert('Неправильный логин или пароль!')
        }
        setLoading(false);
      }, 1000); 
      
  };

  return (
    <>
    { !login === true && <div className="flex w-full h-screen justify-center items-center">
      <div className="w-[350px] select-none">
        <form onSubmit={Login} className="flex flex-col gap-2">
            <p className="text-center text-3xl font-bold">WeaYaa.Uz</p>
            <p className="text-center text-[14px] font-bold mb-6">Control Panel</p>
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-person"></i>
            <input required type="text" name="username" className="grow" placeholder="Username" value={logInfo.username} onChange={inputHandle} />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <i className="bi bi-key"></i>
            <input required type="password" name="password" className="grow" placeholder="Password" value={logInfo.password} onChange={inputHandle} />
          </label>
          <button className="btn w-full mt-6" type="submit">
            <span className={`loading loading-spinner loading-sm ${loading ? "" : "hidden"}`}>Loading...</span>
            <span className={`${loading ? "hidden" : ""}`}>Enter</span>
         </button>
        </form>
      </div>
      </div>}
    </>
  );
}

export default SignIn;