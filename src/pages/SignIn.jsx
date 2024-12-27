import { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

// Login ma'lumotlarini xavfsizroq saqlash uchun
const CREDENTIALS = {
    username: btoa("shahboz"), // Base64 encoded
    password: btoa("shahboz.sh.b")     // Base64 encoded
};

function SignIn({ setIsAuthenticated }) {
    const [loading, setLoading] = useState(false);
    const [logInfo, setLogInfo] = useState({ username: "", password: "" });

    const inputHandle = (e) => {
        const { name, value } = e.target;
        setLogInfo((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const startSession = () => {
        // Set 20 minute timer
        const endTime = new Date().getTime() + 20 * 60 * 1000;
        localStorage.setItem('timerEndTime', endTime.toString());
        
        // Set login status
        localStorage.setItem('isLoggedIn', 'true');
        
        setIsAuthenticated(true);
    };

    const validateCredentials = (username, password) => {
        // Base64 encode input credentials for comparison
        const encodedUsername = btoa(username);
        const encodedPassword = btoa(password);
        
        return encodedUsername === CREDENTIALS.username && 
               encodedPassword === CREDENTIALS.password;
    };

    const Login = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            if (validateCredentials(logInfo.username, logInfo.password)) {
                startSession();
                toast.success('Successfully logged in!');
            } else {
                toast.error('Incorrect login or password!');
            }
        } catch (error) {
            toast.error('Something went wrong!');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full h-screen justify-center items-center">
          <Toaster /> 
            <div className="w-[350px] select-none">
                <form onSubmit={Login} className="flex flex-col gap-2">
                    <p className="text-center text-3xl font-bold">WeaYaa.Uz</p>
                    <p className="text-center text-[14px] font-bold mb-6">Control Panel</p>
                    <label className="input input-bordered flex items-center gap-2">
                        <i className="bi bi-person"></i>
                        <input
                            required
                            type="text"
                            name="username"
                            className="grow"
                            placeholder="Username"
                            value={logInfo.username}
                            onChange={inputHandle}
                            disabled={loading}
                            autoComplete="off"
                        />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <i className="bi bi-key"></i>
                        <input
                            required
                            type="password"
                            name="password"
                            className="grow"
                            placeholder="Password"
                            value={logInfo.password}
                            onChange={inputHandle}
                            disabled={loading}
                            autoComplete="off"
                        />
                    </label>
                    <button
                        className="btn w-full mt-6"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? (
                            <span className="loading loading-spinner loading-sm" />
                        ) : (
                            'Sing In'
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default SignIn;